// SATVertex/SATVertex-frontend/src/pages/ServicesPage.jsx

import { useEffect, useState } from 'react'
import api from '../lib/apiClient'

function ServicesPage() {
  const [services, setServices] = useState([])
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    icon: '',
    featured: false
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const { data } = await api.get('/services')
      setServices(data || [])
    } catch (err) {
      setError('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      await api.post('/services', form)
      setForm({ title: '', slug: '', description: '', icon: '', featured: false })
      fetchServices()
    } catch (err) {
      setError('Failed to create service')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this service?')) {
      try {
        await api.delete(`/services/${id}`)
        fetchServices()
      } catch (err) {
        alert('Failed to delete')
      }
    }
  }

  if (loading) return <div className="p-6 text-white">Loading...</div>

  return (
    <div className="p-6 text-white max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Services</h1>

      {error && (
        <p className="mb-4 p-3 bg-red-900/40 text-red-400 rounded-lg">
          {error}
        </p>
      )}

      {/* Create Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8 grid md:grid-cols-2 gap-4">
        <input
          name="title"
          placeholder="Service Title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white"
          required
        />
        <input
          name="slug"
          placeholder="slug (e.g. full-stack-development)"
          value={form.slug}
          onChange={handleChange}
          className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white"
          required
        />
        <input
          name="icon"
          placeholder="Icon class (e.g. mdi:code-braces)"
          value={form.icon}
          onChange={handleChange}
          className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white md:col-span-2"
        />
        <textarea
          name="description"
          placeholder="Service Description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white md:col-span-2"
          required
        />
        <label className="flex items-center gap-2 md:col-span-2">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          <span className="text-sm text-slate-300">Featured Service</span>
        </label>
        <button
          type="submit"
          disabled={saving}
          className="md:col-span-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 rounded-lg text-sm font-medium"
        >
          {saving ? 'Saving...' : 'Add Service'}
        </button>
      </form>

      {/* List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service._id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 group hover:border-slate-700 transition">
            {service.icon && (
              <div className="text-2xl mb-3 opacity-75">{service.icon}</div>
            )}
            <h3 className="font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-slate-400 mb-3 line-clamp-3">{service.description}</p>
            {service.featured && (
              <span className="px-2 py-1 bg-amber-600/20 text-amber-300 text-xs rounded border border-amber-600/40">
                Featured
              </span>
            )}
            <button
              onClick={() => handleDelete(service._id)}
              className="mt-3 text-red-400 hover:text-red-300 text-sm absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServicesPage
