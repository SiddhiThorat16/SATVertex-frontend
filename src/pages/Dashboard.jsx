// SATVertex/SATVertex-frontend/src/pages/Dashboard.jsx

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/apiClient'

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    skills: 0,
    testimonials: 0,
    services: 0,
    messages: 0,
  })

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))

    const fetchStats = async () => {
      try {
        // later: implement GET /api/admin/stats in backend
        // const { data } = await api.get('/admin/stats')
        // setStats(data)
      } catch (e) {
        console.error('Failed to load stats', e)
      }
    }

    fetchStats()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const goTo = (path) => navigate(path)

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-900 border-r border-slate-800 flex-col p-6">
        <h2 className="text-xl font-semibold mb-8">SATVertex CMS</h2>

        <nav className="space-y-2 text-sm">
          <button className="w-full text-left px-3 py-2 rounded-lg bg-slate-800">
            Dashboard
          </button>
          <button
            onClick={() => goTo('/admin/about')}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            About
          </button>
          <button
            onClick={() => goTo('/admin/skills')}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            Skills
          </button>
          <button
            onClick={() => goTo('/admin/projects')}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            Projects
          </button>
          <button
            onClick={() => goTo('/admin/blogs')}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            Blogs
          </button>
          <button
            onClick={() => goTo('/admin/experience')}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            Experience
          </button>
          <button
            onClick={() => goTo('/admin/testimonials')}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            Testimonials
          </button>
          <button
            onClick={() => goTo('/admin/services')}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            Services
          </button>
          <button
            onClick={() => goTo('/admin/messages')}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            Messages
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 px-4 md:px-6 flex items-center justify-between bg-slate-900/80">
          <div>
            <h1 className="text-lg md:text-xl font-semibold">Admin Dashboard</h1>
            <p className="text-xs text-slate-400">
              Overview of portfolio content and CMS activity
            </p>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <div className="text-right">
                <p className="text-sm font-medium">{user.name || 'Admin'}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs rounded-lg bg-red-600 hover:bg-red-500"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <section className="p-4 md:p-6 space-y-6">
          {/* Top stats row */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard label="Projects" value={stats.projects} />
            <StatCard label="Blogs" value={stats.blogs} />
            <StatCard label="Skills" value={stats.skills} />
            <StatCard label="Testimonials" value={stats.testimonials} />
            <StatCard label="Services" value={stats.services} />
            <StatCard label="Messages" value={stats.messages} />
          </div>

          {/* Quick actions + notes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h2 className="text-base font-semibold mb-3">
                Quick CMS Actions
              </h2>
              <div className="flex flex-wrap gap-3">
                <QuickAction label="Edit About" onClick={() => goTo('/admin/about')} />
                <QuickAction label="Add Skill" onClick={() => goTo('/admin/skills')} />
                <QuickAction label="Add Project" onClick={() => goTo('/admin/projects')} />
                <QuickAction label="Write Blog" onClick={() => goTo('/admin/blogs')} />
                <QuickAction label="View Messages" onClick={() => goTo('/admin/messages')} />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h2 className="text-base font-semibold mb-3">Project Status</h2>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>✔ Backend CMS and models in progress</li>
                <li>✔ Admin auth and dashboard shell ready</li>
                <li>⬜ CRUD screens for content types</li>
                <li>⬜ Portfolio frontend integration</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  )
}

function QuickAction({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 text-xs rounded-lg bg-slate-800 hover:bg-slate-700"
    >
      {label}
    </button>
  )
}

export default Dashboard
