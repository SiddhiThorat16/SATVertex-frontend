// SATVertex/SATVertex-frontend/src/pages/AboutPage.jsx

import { useEffect, useState } from 'react'
import api from '../lib/apiClient'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

function AboutPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [about, setAbout] = useState({
    _id: '',
    heading: '',
    subheading: '',
    description: '',
    avatarUrl: '',
    highlightPoints: '',
  })

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const { data } = await api.get('/about')
        if (data) {
          setAbout({
            _id: data._id,
            heading: data.heading || '',
            subheading: data.subheading || '',
            description: data.description || '',
            avatarUrl: data.avatarUrl || '',
            highlightPoints: (data.highlightPoints || []).join('\n'),
          })
        }
      } catch (err) {
        console.error(err)
        setError('Failed to load About content')
      } finally {
        setLoading(false)
      }
    }
    fetchAbout()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setAbout((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)

    try {
      const payload = {
        heading: about.heading,
        subheading: about.subheading,
        description: about.description,
        avatarUrl: about.avatarUrl,
        highlightPoints: about.highlightPoints
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
      }

      if (about._id) {
        await api.put(`/about/${about._id}`, payload)
      } else {
        const { data } = await api.post('/about', payload)
        setAbout((prev) => ({ ...prev, _id: data._id }))
      }

      setSuccess('About content saved successfully')
    } catch (err) {
      console.error(err)
      setError('Failed to save About content')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-6 text-white">Loading About...</div>
  }

  return (
    <Container className="py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">About Content</h1>

        {error && (
          <p className="mb-3 text-sm text-red-400 bg-red-900/40 px-3 py-2 rounded">
            {error}
          </p>
        )}
        {success && (
          <p className="mb-3 text-sm text-emerald-400 bg-emerald-900/30 px-3 py-2 rounded">
            {success}
          </p>
        )}

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Heading" name="heading" value={about.heading} onChange={handleChange} required />

            <Input label="Subheading" name="subheading" value={about.subheading} onChange={handleChange} />

            <div>
              <label className="block text-sm text-slate-300 mb-1">Description</label>
              <textarea
                name="description"
                rows={5}
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
                value={about.description}
                onChange={handleChange}
                required
              />
            </div>

            <Input label="Avatar URL" name="avatarUrl" value={about.avatarUrl} onChange={handleChange} />

            <div>
              <label className="block text-sm text-slate-300 mb-1">Highlight Points (one per line)</label>
              <textarea
                name="highlightPoints"
                rows={4}
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
                value={about.highlightPoints}
                onChange={handleChange}
              />
              <p className="text-xs text-slate-400 mt-1">Tip: Use short bullet points to highlight achievements.</p>
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save About'}</Button>
              {about.avatarUrl && (
                <img src={about.avatarUrl} alt="avatar preview" className="w-14 h-14 rounded-full object-cover border border-slate-700" />
              )}
            </div>
          </form>
        </Card>
      </div>
    </Container>
  )
}

export default AboutPage
