import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/apiClient'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data } = await api.post('/auth/login', {
        email: form.email,
        password: form.password,
      })
      // backend must return: { token, user: { ... } }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/admin')
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Login failed. Check your credentials.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-md bg-slate-800/90 border border-slate-700 rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          SATVertex Admin Login
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-400 bg-red-900/40 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white py-2 text-sm font-medium transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-400 text-center">
          Default admin: admin@satvertex.dev / Admin@12345
        </p>
      </div>
    </div>
  )
}

export default Login
