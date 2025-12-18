import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate, Link } from 'react-router-dom'

export default function AuthSimple() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  })
  
  const { login, signup, isLoading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    const result = isLogin 
      ? await login({ email: formData.email, password: formData.password })
      : await signup(formData)
    
    if (result.success) {
      navigate('/dashboard')
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: '20px', background: 'linear-gradient(135deg, #15803d, #fed7aa)' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', background: 'white', padding: '30px', borderRadius: '10px' }}>
        <Link to="/" style={{ color: '#666', textDecoration: 'none' }}>← Back to Home</Link>
        
        <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Mini CRM</h1>
        
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <button 
            onClick={() => setIsLogin(true)}
            style={{ 
              flex: 1, 
              padding: '10px', 
              background: isLogin ? '#15803d' : '#f5f5f5',
              color: isLogin ? 'white' : '#666',
              border: 'none',
              borderRadius: '5px 0 0 5px'
            }}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            style={{ 
              flex: 1, 
              padding: '10px', 
              background: !isLogin ? '#15803d' : '#f5f5f5',
              color: !isLogin ? 'white' : '#666',
              border: 'none',
              borderRadius: '0 5px 5px 0'
            }}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div style={{ background: '#fee', color: '#c00', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '15px' }}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', marginTop: '5px' }}
              />
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', marginTop: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', marginTop: '5px' }}
            />
          </div>

          {!isLogin && (
            <>
              <div style={{ marginBottom: '15px' }}>
                <label>Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', marginTop: '5px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label>Role:</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', marginTop: '5px' }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: '#15803d', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
          </button>
        </form>
      </div>
    </div>
  )
}