import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/apiClient'
import Container from '../components/ui/Container'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import illu from '../assets/logo1.jpg'

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
    <div className="min-h-screen flex items-center py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:flex flex-col gap-4">
            <h1 className="text-3xl font-bold">SATVertex CMS</h1>
            <p className="text-slate-400">Admin panel to manage your portfolio content. Clean, fast, and secure.</p>

            <div className="mt-4">
              <img src={illu} alt="Admin illustration" className="w-full max-w-sm opacity-90" />
            </div>
          </div>

          <Card className="mx-auto w-full max-w-md">
            <h2 className="text-xl font-semibold mb-3">Welcome back</h2>

            {error && (
              <p className="mb-4 text-sm text-red-400 bg-red-900/40 px-3 py-2 rounded">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-400">Forgot password? Ask repo owner</div>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </form>

            <p className="mt-4 text-xs text-slate-400 text-center">
              Default admin: admin@satvertex.dev / Admin@12345
            </p>
          </Card>
        </div>
      </Container>
    </div>
  )
}

export default Login
