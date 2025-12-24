// SATVertex/SATVertex-frontend/src/pages/TestimonialsPage.jsx

import { useEffect, useState } from "react";
import api from "../lib/apiClient";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    avatarUrl: "",
    quote: "",
    rating: 5,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data } = await api.get("/testimonials");
      setTestimonials(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/testimonials", form);
      setForm({ name: "", role: "", company: "", avatarUrl: "", quote: "", rating: 5 });
      fetchTestimonials();
    } catch (err) {
      alert("Failed to add testimonial");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete testimonial?")) {
      await api.delete(`/testimonials/${id}`);
      fetchTestimonials();
    }
  };

  if (loading) return <div className="p-6 text-white">Loading...</div>;

  return (
    <Container className="py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Testimonials</h1>
          <p className="text-sm text-slate-400">Collect feedback that builds recruiter confidence.</p>
        </div>

        <Card className="mb-8">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <Input label="Name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input label="Role" name="role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            <Input label="Company" name="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            <Input label="Avatar URL" name="avatarUrl" value={form.avatarUrl} onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })} />

            <div className="md:col-span-2">
              <label className="block text-sm text-slate-300 mb-1">Quote</label>
              <textarea
                name="quote"
                rows={4}
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
                required
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="text-sm text-slate-300">Rating: {form.rating}/5</label>
                  <input
                    type="range"
                    name="rating"
                    min="1"
                    max="5"
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-700 rounded-lg mt-2"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button type="submit" disabled={saving}>{saving ? 'Adding...' : 'Add Testimonial'}</Button>
                </div>
              </div>
            </div>
          </form>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.length === 0 ? (
            <p className="text-sm text-slate-400">No testimonials yet.</p>
          ) : (
            testimonials.map((t) => (
              <Card key={t._id} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-3 mb-2">
                    {t.avatarUrl ? (
                      <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">{t.name?.charAt(0) || '?'}</div>
                    )}

                    <div>
                      <h4 className="font-semibold">{t.name}</h4>
                      <p className="text-sm text-slate-400">{t.role}{t.company ? ` at ${t.company}` : ''}</p>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-3">“{t.quote}”</p>

                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < t.rating ? 'text-yellow-400' : 'text-slate-600'}`}>★</span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex justify-end">
                  <Button variant="danger" onClick={() => handleDelete(t._id)} className="px-3 py-1 text-sm">Delete</Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </Container>
  );
}

export default TestimonialsPage;
