// SATVertex/SATVertex-frontend/src/pages/ProjectsPage.jsx

import { useEffect, useState } from 'react'
import api from '../lib/apiClient'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    thumbnailUrl: '',
    featured: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects')
      setProjects(data || [])
    } catch (err) {
      console.error(err)
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const payload = {
        ...form,
        techStack: form.techStack
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      }
      await api.post('/projects', payload)
      setForm({
        title: '',
        slug: '',
        description: '',
        techStack: '',
        githubUrl: '',
        liveUrl: '',
        thumbnailUrl: '',
        featured: false,
      })
      fetchProjects()
    } catch (err) {
      console.error(err)
      setError('Failed to create project')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      await api.delete(`/projects/${id}`)
      setProjects((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete project')
    }
  }

  return (
    <Container className="py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-slate-400">Showcase your best work — recruiters will love it.</p>
        </div>

        {error && (
          <p className="mb-3 text-sm text-red-400 bg-red-900/40 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
              <Input label="Slug" name="slug" value={form.slug} onChange={handleChange} required />
              <div className="md:col-span-2">
                <label className="text-xs text-slate-300 mb-1 block">Description</label>
                <textarea name="description" rows={2} className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm" value={form.description} onChange={handleChange} required />
              </div>
              <Input label="Tech Stack (comma separated)" name="techStack" value={form.techStack} onChange={handleChange} />
            </div>

            <div className="space-y-3">
              <Input label="GitHub URL" name="githubUrl" value={form.githubUrl} onChange={handleChange} />
              <Input label="Live URL" name="liveUrl" value={form.liveUrl} onChange={handleChange} />
              <Input label="Thumbnail URL" name="thumbnailUrl" value={form.thumbnailUrl} onChange={handleChange} />

              <label className="inline-flex items-center gap-2 text-xs text-slate-300">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                Featured
              </label>

              <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Add Project'}</Button>
            </div>
          </form>
        </Card>

        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-sm text-slate-400">No projects yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Card key={project._id} className="overflow-hidden">
                <div className="h-40 bg-slate-800 rounded-md overflow-hidden mb-3">
                  {project.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">No image</div>
                  )}
                </div>
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-md font-semibold">{project.title}</h3>
                      <p className="text-xs text-slate-400">{project.slug}</p>
                    </div>
                    <div className="text-right">
                      {project.featured && <span className="chip">Featured</span>}
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-slate-300 line-clamp-3">{project.description}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {(project.techStack || []).slice(0, 6).map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-white">GitHub</a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-white">Live</a>
                      )}
                    </div>
                    <div>
                      <button onClick={() => handleDelete(project._id)} className="text-xs text-red-400 hover:text-red-300">Delete</button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}

export default ProjectsPage
