import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
// IMPORT YOUR API CALLS
import { loginUser, registerUser, fetchCurrentUser } from '../services/api';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.email || !formData.password) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsLoading(true);

    try {
      let data;
      // 1. Call the appropriate backend endpoint
      if (isLogin) {
        data = await loginUser(formData.email, formData.password);
      } else {
        data = await registerUser(formData.email, formData.password);
      }

      // 2. Save the JWT
      localStorage.setItem('aether_jwt', data.token);

      // 3. Fetch user profile to check vault status
      const user = await fetchCurrentUser();

      // 4. Zero-Knowledge Routing!
      if (user.vaultInitialized) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/setup-vault', { replace: true });
      }

    } catch (error) {
      console.error('Auth Error:', error);
      setErrorMsg(error.response?.data?.error || 'Authentication failed. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
   const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  window.location.href = `${baseUrl}/oauth2/authorization/google`;
  };

  const shakeVariants = {
    shake: { x: [-10, 10, -10, 10, -5, 5, 0], transition: { duration: 0.4 } }
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <button onClick={() => navigate('/')} className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-cyan-glow transition-colors font-mono z-20">
        <FiArrowLeft /> Back
      </button>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-glow/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-glow/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-md z-10 relative">
        <motion.div animate={shake ? "shake" : ""} variants={shakeVariants} className="glass-lg glow-border-cyan p-8 md:p-10 relative overflow-hidden backdrop-blur-3xl">
          
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-glow to-purple-glow bg-clip-text text-transparent mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-400 font-mono text-sm">
              {isLogin ? 'Authenticate to access your secure data' : 'Initialize your zero-knowledge vault'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1 uppercase tracking-wider">Email</label>
              <div className="relative group">
                <FiMail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-glow transition-colors" />
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange} required
                  className="w-full !pl-12 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:border-cyan-glow focus:ring-1 focus:ring-cyan-glow/50 text-white placeholder-gray-600 transition-all font-mono"
                  placeholder="agent@aethervault.io"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1 uppercase tracking-wider">Password</label>
              <div className="relative group">
                <FiLock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-glow transition-colors" />
                <input
                  type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required
                  className="w-full !pl-12 pr-12 py-3 bg-black/20 border border-white/10 rounded-lg focus:border-cyan-glow focus:ring-1 focus:ring-cyan-glow/50 text-white placeholder-gray-600 transition-all font-mono"
                  placeholder="••••••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {errorMsg && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs font-mono bg-red-500/10 border border-red-500/20 p-3 rounded text-center mt-2">
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" disabled={isLoading} className="w-full btn-cyber btn-cyber-primary py-3 mt-6">
              {isLoading ? 'Processing...' : (isLogin ? 'Authenticate' : 'Initialize')}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4 relative z-10">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs font-mono text-gray-500 uppercase">Or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <button onClick={handleGoogleLogin} type="button" className="w-full btn-metallic py-3 px-4 rounded-lg flex items-center justify-center gap-3 relative z-10 group">
            <FcGoogle className="text-xl group-hover:scale-110 transition-transform" />
            <span className="font-mono text-sm tracking-wide">Continue with Google</span>
          </button>

          <div className="mt-8 text-center relative z-10">
            <button onClick={() => setIsLogin(!isLogin)} type="button" className="text-sm font-mono text-gray-400 hover:text-cyan-glow transition-colors">
              {isLogin ? "Don't have a vault? " : "Already have a vault? "}
              <span className="text-cyan-glow underline decoration-cyan-glow/30 underline-offset-4">
                {isLogin ? 'Create one' : 'Access it'}
              </span>
            </button>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;