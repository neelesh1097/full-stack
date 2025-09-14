import React, { useState } from 'react'
import axios from 'axios'

const Login = ({ setToken }) => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:4000/api/user/admin-login', form)
      if (res.data.success && res.data.token) {
        localStorage.setItem('adminToken', res.data.token)
        setToken(res.data.token)
      } else {
        setError(res.data.message || 'Invalid credentials')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center pt-16'>
      <form onSubmit={handleSubmit} className='w-full max-w-sm flex flex-col gap-4 p-6 border rounded-md'>
        <h1 className='text-2xl font-semibold text-center'>Admin Login</h1>
        <input
          type='email'
          name='email'
          value={form.email}
          onChange={handleChange}
          className='border border-gray-300 rounded py-2 px-3 w-full'
          placeholder='Email'
          required
        />
        <input
          type='password'
          name='password'
          value={form.password}
          onChange={handleChange}
          className='border border-gray-300 rounded py-2 px-3 w-full'
          placeholder='Password'
          required
        />
        {error && <p className='text-red-600 text-sm text-center'>{error}</p>}
        <button type='submit' disabled={loading} className='bg-black text-white py-2 rounded w-full'>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login