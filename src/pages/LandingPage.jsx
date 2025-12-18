import { useState, useEffect } from 'react'
import { ArrowRight, Users, TrendingUp, Shield, Zap, Globe, Star, Play, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-700 to-orange-200 flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg">M</span>
              </div>
              <span className="ml-3 text-2xl font-black bg-gradient-to-r from-green-700 to-orange-300 bg-clip-text text-transparent">
                Mini CRM
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-green-700 font-medium transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-green-700 font-medium transition-colors">Testimonials</a>
              <Link to="/auth" className="btn-primary">
                Get Started
              </Link>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-green-600 font-medium">Features</a>
              <a href="#testimonials" className="block text-gray-600 hover:text-green-600 font-medium">Testimonials</a>
              <Link to="/auth" className="btn-primary block text-center w-full">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-orange-100"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-green-700 to-green-600 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full blur-3xl animate-bounce-slow"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-6 animate-slideIn">
              <span className="bg-gradient-to-r from-green-700 via-orange-300 to-green-800 bg-clip-text text-transparent">
                The Future of
              </span>
              <br />
              <span className="text-gray-900">Customer Relations</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slideIn" style={{animationDelay: '0.2s'}}>
              Revolutionize your business with AI-powered CRM that adapts, learns, and grows with your team. 
              Experience the next generation of customer relationship management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideIn" style={{animationDelay: '0.4s'}}>
              <Link 
                to="/auth"
                className="btn-primary btn-lg flex items-center justify-center"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <button className="btn-secondary btn-lg flex items-center justify-center">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage customers, close deals, and grow your business in one intelligent platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'Smart Contact Management', description: 'AI-powered contact organization with intelligent tagging.' },
              { icon: TrendingUp, title: 'Advanced Analytics', description: 'Real-time insights with predictive analytics and dashboards.' },
              { icon: Shield, title: 'Enterprise Security', description: 'Bank-level encryption with role-based access control.' },
              { icon: Zap, title: 'Automation Engine', description: 'Workflow automation that saves time and eliminates tasks.' },
              { icon: Globe, title: 'Global Integration', description: 'Connect with 500+ apps through our robust API ecosystem.' },
              { icon: Star, title: 'AI Assistant', description: 'Intelligent recommendations and automated lead scoring.' }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div 
                  key={feature.title} 
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-slideIn"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${index % 2 === 0 ? 'from-green-700 to-orange-200' : 'from-orange-200 to-green-700'} flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-green-700 via-orange-300 to-green-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-200 rounded-full blur-3xl animate-float"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join the CRM revolution. Start your free trial today and experience the difference intelligent customer management makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/auth"
              className="bg-white text-green-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center shadow-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-700 transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-600 to-orange-400 flex items-center justify-center">
                  <span className="text-white font-black text-lg">M</span>
                </div>
                <span className="ml-3 text-2xl font-black">Mini CRM</span>
              </div>
              <p className="text-gray-400">The future of customer relationship management.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Mini CRM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}