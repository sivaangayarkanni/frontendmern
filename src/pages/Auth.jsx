import { useState } from 'react'
import { User, Shield, Mail, Lock, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate, Link } from 'react-router-dom'
import { validatePasswordStrength, validateEmail } from '../utils/auth'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  })
  const [passwordStrength, setPasswordStrength] = useState(null)
  const [emailValid, setEmailValid] = useState(null)
  const { login, signup, isLoading, error, clearError } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearError()
    
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        return
      }
      if (!passwordStrength?.isValid) {
        return
      }
      if (!emailValid) {
        return
      }
    }
    
    const result = isLogin 
      ? await login({ email: formData.email, password: formData.password })
      : await signup(formData)
    
    if (result.success) {
      navigate('/dashboard')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    if (name === 'password') {
      setPasswordStrength(validatePasswordStrength(value))
    }
    if (name === 'email') {
      setEmailValid(value ? validateEmail(value) : null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-orange-300 to-green-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-green-700/30 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-green-700/40 to-orange-200/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-200/25 to-green-700/25 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-green-700/30 to-orange-200/30 rounded-full"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border-2 border-white/30">
          {/* Back Button */}
          <Link 
            to="/"
            className="flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            ← Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-700 to-orange-200 flex items-center justify-center">
              <span className="text-white font-black text-2xl">M</span>
            </div>
            <h1 className="text-3xl font-black text-white mb-2">Mini CRM</h1>
            <p className="text-white/80">
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </p>
          </div>

          {/* Auth Toggle */}
          <div className="flex mb-6 bg-white/10 rounded-2xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                isLogin 
                  ? 'bg-white text-slate-800 shadow-lg' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <LogIn className="w-4 h-4 inline mr-2" />
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                !isLogin 
                  ? 'bg-white text-slate-800 shadow-lg' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4 inline mr-2" />
              Sign Up
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-100 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-white/80 text-sm font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-white/80 text-sm font-semibold mb-2">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Enter your email"
                />
                {!isLogin && emailValid === false && (
                  <p className="text-red-300 text-xs mt-1">Please enter a valid email address</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {!isLogin && passwordStrength && !passwordStrength.isValid && (
                <div className="text-red-300 text-xs mt-1">
                  <p>Password must have:</p>
                  <ul className="list-disc list-inside ml-2">
                    {passwordStrength.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {!isLogin && (
              <>
                <div>
                  <label className="block text-white/80 text-sm font-semibold mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Confirm your password"
                    />
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-300 text-xs mt-1">Passwords do not match</p>
                  )}
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-semibold mb-2">Role</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, role: 'user'})}
                      className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                        formData.role === 'user'
                          ? 'bg-white/20 border-white text-white'
                          : 'border-white/30 text-white/70 hover:border-white/50'
                      }`}
                    >
                      <User className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-sm font-semibold">User</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, role: 'admin'})}
                      className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                        formData.role === 'admin'
                          ? 'bg-white/20 border-white text-white'
                          : 'border-white/30 text-white/70 hover:border-white/50'
                      }`}
                    >
                      <Shield className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-sm font-semibold">Admin</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading || (!isLogin && (!passwordStrength?.isValid || formData.password !== formData.confirmPassword || !emailValid))}
              className="w-full py-3 px-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-white/10 rounded-xl">
            <div className="flex items-center mb-2">
              <Shield className="w-4 h-4 text-green-300 mr-2" />
              <p className="text-white/80 text-sm font-semibold">Secure Authentication</p>
            </div>
            <div className="text-xs text-white/70 space-y-1">
              <p>• End-to-end encryption</p>
              <p>• Secure password hashing</p>
              <p>• JWT token authentication</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}