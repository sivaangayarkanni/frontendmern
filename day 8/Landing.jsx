import { useState } from 'react';
import { User, Shield, ArrowRight, Users, Target, BarChart3 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    const userData = role === 'admin' 
      ? { id: 1, name: 'Admin', email: 'admin@company.com', role: 'admin' }
      : { id: 2, name: 'User', email: 'user@company.com', role: 'user' };
    
    login(userData);
    navigate('/');
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{background: 'linear-gradient(135deg, #034C53, #007074, #F38C79, #FFC1B4)'}}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-green-300 rounded-full opacity-25 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-red-300 rounded-full opacity-20 animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-indigo-400 rounded-full opacity-30 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-white mb-6 animate-float">
            Welcome to Mini CRM
          </h1>
          <p className="text-2xl text-white/90 font-semibold">
            Choose your role to get started
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-16">
          {/* Admin Card */}
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 animate-float">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #034C53, #007074)'}}>
                <Shield className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Administrator</h3>
              <p className="text-white/80 mb-6 text-lg">
                Full access to manage users, settings, and all CRM features
              </p>
              <ul className="text-white/70 mb-8 space-y-2">
                <li>• User Management</li>
                <li>• System Settings</li>
                <li>• Advanced Analytics</li>
                <li>• Full Data Access</li>
              </ul>
              <button
                onClick={() => handleLogin('admin')}
                className="btn-primary w-full flex items-center justify-center"
              >
                Login as Admin <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>

          {/* User Card */}
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 animate-pulse-slow">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #F38C79, #FFC1B4)'}}>
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">User</h3>
              <p className="text-white/80 mb-6 text-lg">
                Access to core CRM features for daily business operations
              </p>
              <ul className="text-white/70 mb-8 space-y-2">
                <li>• Lead Management</li>
                <li>• Contact Management</li>
                <li>• Task Tracking</li>
                <li>• Basic Reports</li>
              </ul>
              <button
                onClick={() => handleLogin('user')}
                className="btn-secondary w-full flex items-center justify-center"
              >
                Login as User <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-8">Why Choose Mini CRM?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Users className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Team Collaboration</h3>
              <p className="text-white/80">Work seamlessly with your team</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Target className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Goal Tracking</h3>
              <p className="text-white/80">Monitor and achieve your targets</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <BarChart3 className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Advanced Analytics</h3>
              <p className="text-white/80">Data-driven business insights</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-white/60 text-lg">
            New to Mini CRM? Contact your administrator for account setup.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;