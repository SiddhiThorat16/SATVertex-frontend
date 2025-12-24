// SATVertex/SATVertex-frontend/src/pages/SkillsPage.jsx

import { useEffect, useState } from 'react'
import api from '../lib/apiClient'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

function SkillsPage() {
  const [skills, setSkills] = useState([])
  const [form, setForm] = useState({
    name: '',
    level: 'Intermediate',
    category: '',
    icon: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fetchSkills = async () => {
    try {
      const { data } = await api.get('/skills')
      setSkills(data || [])
    } catch (err) {
      console.error(err)
      setError('Failed to load skills')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      await api.post('/skills', form)
      setForm({ name: '', level: 'Intermediate', category: '', icon: '' })
      fetchSkills()
    } catch (err) {
      console.error(err)
      setError('Failed to create skill')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return
    try {
      await api.delete(`/skills/${id}`)
      setSkills((prev) => prev.filter((s) => s._id !== id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete skill')
    }
  }

  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Skills</h1>
          <p className="text-sm text-slate-400">Organize skills by level and category</p>
        </div>

        {error && (
          <p className="mb-3 text-sm text-red-400 bg-red-900/40 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
            <div>
              <label className="text-xs text-slate-300 mb-1 block">Level</label>
              <select name="level" value={form.level} onChange={handleChange} className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm w-full">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <Input label="Category" name="category" value={form.category} onChange={handleChange} />
            <div className="flex gap-2">
              <Input label="Icon" name="icon" value={form.icon} onChange={handleChange} />
              <Button type="submit" disabled={saving}>{saving ? 'Adding...' : 'Add'}</Button>
            </div>
          </form>
        </Card>

        {loading ? (
          <p>Loading skills...</p>
        ) : skills.length === 0 ? (
          <p className="text-sm text-slate-400">No skills yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <Card key={skill._id} className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{skill.name}</h3>
                    <p className="text-xs text-slate-400">{skill.category}</p>
                  </div>
                  <div className="text-xs text-slate-300">{skill.level}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-400">{skill.icon}</div>
                  <button onClick={() => handleDelete(skill._id)} className="text-xs text-red-400 hover:text-red-300">Delete</button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}

export default SkillsPage
