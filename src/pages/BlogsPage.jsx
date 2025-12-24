// SATVertex/SATVertex-frontend/src/pages/BlogsPage.jsx

import { useEffect, useState } from "react";
import api from "../lib/apiClient";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImageUrl: "",
    tags: "",
    published: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get("/blogs");
      setBlogs(data || []);
    } catch (err) {
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      await api.post("/blogs", payload);
      setForm({ title: "", slug: "", excerpt: "", content: "", coverImageUrl: "", tags: "", published: false });
      fetchBlogs();
    } catch (err) {
      setError("Failed to create blog");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this blog?")) {
      try {
        await api.delete(`/blogs/${id}`);
        fetchBlogs();
      } catch (err) {
        alert("Failed to delete");
      }
    }
  };

  if (loading) return <div className="p-6 text-white">Loading...</div>;

  return (
    <Container className="py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Blogs</h1>
          <p className="text-sm text-slate-400">Write articles to showcase expertise and attract recruiters.</p>
        </div>

        {error && <p className="mb-4 p-3 bg-red-900/40 text-red-400 rounded">{error}</p>}

        <Card className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Title" name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              <Input label="Slug" name="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
            </div>

            <Input label="Excerpt" name="excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />

            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Cover Image URL" name="coverImageUrl" value={form.coverImageUrl} onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })} />
              <Input label="Tags (comma separated)" name="tags" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Content (markdown supported)</label>
              <textarea name="content" rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm" required />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" name="published" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                <span>Published</span>
              </label>

              <Button type="submit" disabled={saving}>{saving ? 'Adding...' : 'Add Blog'}</Button>
            </div>
          </form>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          {blogs.length === 0 ? (
            <p className="text-sm text-slate-400">No blogs yet.</p>
          ) : (
            blogs.map((blog) => (
              <Card key={blog._id} className="flex gap-4 items-start">
                <div className="w-32 h-20 bg-slate-800 rounded overflow-hidden">
                  {blog.coverImageUrl ? (
                    <img src={blog.coverImageUrl} alt={blog.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">No image</div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{blog.title}</h3>
                      <p className="text-sm text-slate-400">{blog.excerpt?.substring(0, 140)}{blog.excerpt?.length > 140 ? '...' : ''}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(blog.tags || []).map((t) => (
                          <span key={t} className="chip">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right">
                      {blog.published && <span className="px-2 py-1 rounded text-xs bg-emerald-600/20 text-emerald-300">Published</span>}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-slate-400">{new Date(blog.createdAt || Date.now()).toLocaleDateString()}</div>
                    <div className="flex items-center gap-2">
                      <Button variant="danger" onClick={() => handleDelete(blog._id)} className="px-3 py-1 text-sm">Delete</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </Container>
  );
}

export default BlogsPage;
