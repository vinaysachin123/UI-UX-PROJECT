import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Layout as LayoutIcon, Mail, Lock, UserPlus, LogIn, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = isLogin ? await login(email, password) : await signup(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="landing-page flex min-h-screen">
      {/* Left side: Branding/Vibe Rendering */}
      <div className="hidden lg:flex w-2/3 bg-gray-900 text-white items-center justify-center p-12 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="vibe-bg-glow absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 blur-3xl rounded-full translate-x-[-20%] translate-y-[-20%]"></div>
        </div>
        <div className="relative z-10 text-center">
            <LayoutIcon size={120} className="text-indigo-400 mx-auto mb-8 animate-pulse" />
            <h1 className="text-6xl font-bold mb-4">Express Your <span className="text-indigo-400">Vibe.</span></h1>
            <p className="text-xl opacity-80 max-w-lg mx-auto">
              Build stunning, responsive personal mini-sites in seconds. Theme focused, performance driven, and built for the modern web.
            </p>
        </div>
      </div>

      {/* Right side: Login/Signup Form */}
      <div className="w-full lg:w-1/3 flex items-center justify-center p-8 bg-white dark:bg-gray-950">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
            <p className="opacity-70 mt-2">{isLogin ? 'Login to continue building your vibes.' : 'Get started with VibeKit Studio today.'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-red-100 text-red-600 text-sm rounded-lg mb-4">{error}</div>}
            
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="input pl-10" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input 
                type="password" 
                placeholder="Password" 
                className="input pl-10" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary w-full py-3 mt-4 text-lg">
              {isLogin ? (
                <>
                  <LogIn size={20} className="mr-2" /> Login <ChevronRight size={18} className="ml-1" />
                </>
              ) : (
                <>
                  <UserPlus size={20} className="mr-2" /> Get Started <ChevronRight size={18} className="ml-1" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm opacity-70">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="ml-2 font-bold text-primary hover:underline"
            >
              {isLogin ? 'Create Account' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
