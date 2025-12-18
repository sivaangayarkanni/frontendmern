import { useState } from 'react'

export default function SimpleAuth() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`${isLogin ? 'Login' : 'Registration'} submitted!`)
    console.log('Form data:', formData)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Mini CRM Auth</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setIsLogin(true)}
          style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
            background: isLogin ? 'green' : 'gray',
            color: 'white',
            border: 'none'
          }}
        >
          Login
        </button>
        <button 
          onClick={() => setIsLogin(false)}
          style={{ 
            padding: '10px 20px',
            background: !isLogin ? 'green' : 'gray',
            color: 'white',
            border: 'none'
          }}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div style={{ marginBottom: '10px' }}>
            <label>Name:</label><br/>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        )}

        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br/>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label><br/>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {!isLogin && (
          <div style={{ marginBottom: '10px' }}>
            <label>Confirm Password:</label><br/>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        )}

        <button 
          type="submit"
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: 'blue', 
            color: 'white', 
            border: 'none' 
          }}
        >
          {isLogin ? 'Login' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}