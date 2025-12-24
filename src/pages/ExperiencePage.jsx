// SATVertex/SATVertex-frontend/src/pages/ExperiencePage.jsx

import { useEffect, useState } from 'react'
import api from '../lib/apiClient'

function ExperiencePage() {
  const [experiences, setExperiences] = useState([])
  const [form, setForm] = useState({
    role: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    highlights: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const { data } = await api.get('/experience')
      setExperiences(data || [])
    } catch (err) {
      setError('Failed to load experiences')
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
      const payload = {
        ...form,
        startDate: new Date(form.startDate),
        endDate: form.current ? null : form.endDate ? new Date(form.endDate) : null,
        highlights: form.highlights
          .split('\n')
          .map(h => h.trim())
          .filter(Boolean)
      }
      
      await api.post('/experience', payload)
      setForm({
        role: '', company: '', location: '', startDate: '', endDate: '',
        current: false, description: '', highlights: ''
      })
      fetchExperiences()
    } catch (err) {
      setError('Failed to create experience')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this experience?')) {
      try {
        await api.delete(`/experience/${id}`)
        fetchExperiences()
      } catch (err) {
        alert('Failed to delete')
      }
    }
  }

  if (loading) return <div className="p-6 text-white">Loading...</div>

  return (
    <div className="p-6 text-white max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Experience</h1>

      {error && (
        <p className="mb-4 p-3 bg-red-900/40 text-red-400 rounded-lg">
          {error}
        </p>
      )}

      {/* Create Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="role"
            placeholder="Role/Position"
            value={form.role}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white"
            required
          />
          <input
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white"
            required
          />
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white"
          />
          <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white"
            required
          />
          <input
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
            disabled={form.current}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white disabled:opacity-50"
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="current"
            checked={form.current}
            onChange={handleChange}
          />
          <span className="text-sm text-slate-300">Current position</span>
        </label>

        <textarea
          name="description"
          placeholder="Description"
          rows={3}
          value={form.description}
          onChange={handleChange}
          className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white"
        />

        <textarea
          name="highlights"
          placeholder="Highlights (one per line)"
          rows={4}
          value={form.highlights}
          onChange={handleChange}
          className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white"
        />

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 rounded-lg text-sm font-medium"
        >
          {saving ? 'Saving...' : 'Add Experience'}
        </button>
      </form>

      {/* List */}
      <div className="space-y-3">
        {experiences.map((exp) => (
          <div key={exp._id} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
              <div>
                <h3 className="text-lg font-semibold">{exp.role}</h3>
                <p className="text-sm text-slate-400">{exp.company}</p>
                <p className="text-xs text-slate-500">{exp.location}</p>
              </div>
              <div className="text-sm text-right md:text-left">
                <p>{new Date(exp.startDate).toLocaleDateString()} - {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'N/A'}</p>
                {exp.current && <span className="text-emerald-400 text-xs">Current</span>}
              </div>
            </div>
            <p className="text-slate-300 mb-3">{exp.description}</p>
            {exp.highlights?.length > 0 && (
              <ul className="text-sm space-y-1 mb-4">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => handleDelete(exp._id)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExperiencePage
