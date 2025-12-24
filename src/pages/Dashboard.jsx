// SATVertex/SATVertex-frontend/src/pages/Dashboard.jsx

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/apiClient'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

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
    <div className="min-h-screen bg-slate-950 text-white">
      <Container className="py-8">
        <div className="flex items-start gap-6">
          {/* Sidebar (collapsible in future) */}
          <aside className="hidden lg:block w-64">
            <nav className="space-y-3">
              <div className="text-lg font-bold">SATVertex CMS</div>
              <div className="mt-4 space-y-1">
                <SidebarButton active>Dashboard</SidebarButton>
                <SidebarButton onClick={() => goTo('/admin/about')}>About</SidebarButton>
                <SidebarButton onClick={() => goTo('/admin/skills')}>Skills</SidebarButton>
                <SidebarButton onClick={() => goTo('/admin/projects')}>Projects</SidebarButton>
                <SidebarButton onClick={() => goTo('/admin/blogs')}>Blogs</SidebarButton>
              </div>
            </nav>
          </aside>

          <main className="flex-1">
            <header className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
                <p className="text-sm text-slate-400">Overview of portfolio content and CMS activity</p>
              </div>
              <div className="flex items-center gap-4">
                {user && (
                  <div className="text-right">
                    <p className="text-sm font-medium">{user.name || 'Admin'}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                )}
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
              </div>
            </header>

            <section className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <StatCard label="Projects" value={stats.projects} />
                <StatCard label="Blogs" value={stats.blogs} />
                <StatCard label="Skills" value={stats.skills} />
                <StatCard label="Testimonials" value={stats.testimonials} />
                <StatCard label="Services" value={stats.services} />
                <StatCard label="Messages" value={stats.messages} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-semibold">Quick CMS Actions</h2>
                    <p className="text-xs text-slate-400">Today</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <QuickAction label="Edit About" onClick={() => goTo('/admin/about')} />
                    <QuickAction label="Add Skill" onClick={() => goTo('/admin/skills')} />
                    <QuickAction label="Add Project" onClick={() => goTo('/admin/projects')} />
                    <QuickAction label="Write Blog" onClick={() => goTo('/admin/blogs')} />
                    <QuickAction label="View Messages" onClick={() => goTo('/admin/messages')} />
                  </div>
                </Card>

                <Card>
                  <h2 className="text-base font-semibold mb-3">Project Status</h2>
                  <ul className="text-sm text-slate-400 space-y-2">
                    <li>✔ Backend CMS and models in progress</li>
                    <li>✔ Admin auth and dashboard shell ready</li>
                    <li>⬜ CRUD screens for content types</li>
                    <li>⬜ Portfolio frontend integration</li>
                  </ul>
                </Card>
              </div>
            </section>
          </main>
        </div>
      </Container>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  )
}

function QuickAction({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 text-xs rounded-lg bg-indigo-600 hover:bg-indigo-500"
    >
      {label}
    </button>
  )
}

function SidebarButton({ children, active, ...props }) {
  return (
    <button
      {...props}
      className={`w-full text-left px-3 py-2 rounded-lg ${active ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-200'}`}
    >
      {children}
    </button>
  )
}

export default Dashboard
