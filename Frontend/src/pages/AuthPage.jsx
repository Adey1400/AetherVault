import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiKey, FiEye, FiEyeOff, FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showMasterPassword, setShowMasterPassword] = useState(false);
  const [shake, setShake] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    masterPassword: ''
  });



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!formData.email || !formData.password || (!isLogin && !formData.masterPassword)) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    
    // Process form
    console.log('Form submitted:', formData);
  };

  const handleGoogleLogin = () => {
    // Redirect to backend OAuth2 endpoint
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
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
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-cyan-glow transition-colors font-mono z-20"
      >
        <FiArrowLeft /> Back
      </button>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-glow/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-glow/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-md z-10 relative"
      >
        <motion.div 
          animate={shake ? "shake" : ""} 
          variants={shakeVariants}
          className="glass-lg glow-border-cyan p-8 md:p-10 relative overflow-hidden backdrop-blur-3xl"
        >
          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-glow to-purple-glow bg-clip-text text-transparent mb-2">
              {isLogin ? 'Welcome Back' : 'Initialize Vault'}
            </h2>
            <p className="text-gray-400 font-mono text-sm">
              {isLogin ? 'Authenticate to access your secure data' : 'Create your zero-knowledge account'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1 uppercase tracking-wider">Email</label>
              <div className="relative group">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-glow transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:border-cyan-glow focus:ring-1 focus:ring-cyan-glow/50 text-white placeholder-gray-600 transition-all font-mono"
                  placeholder="agent@aethervault.io"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1 uppercase tracking-wider">Password</label>
              <div className="relative group">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-glow transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 bg-black/20 border border-white/10 rounded-lg focus:border-cyan-glow focus:ring-1 focus:ring-cyan-glow/50 text-white placeholder-gray-600 transition-all font-mono"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2">
                    <label className="block text-xs font-mono text-cyan-glow mb-1 uppercase tracking-wider flex items-center gap-1">
                      <FiKey /> Master Password
                    </label>
                    <div className="relative group">
                      <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-glow/50 group-focus-within:text-cyan-glow transition-colors" />
                      <input
                        type={showMasterPassword ? "text" : "password"}
                        name="masterPassword"
                        value={formData.masterPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-3 bg-cyan-glow/5 border border-cyan-glow/30 rounded-lg focus:border-cyan-glow focus:ring-1 focus:ring-cyan-glow text-white placeholder-cyan-glow/40 transition-all font-mono"
                        placeholder="Your ultimate encryption key"
                      />
                      <button
                        type="button"
                        onClick={() => setShowMasterPassword(!showMasterPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-glow/50 hover:text-cyan-glow transition-colors"
                      >
                        {showMasterPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-200 flex items-start gap-2 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                    >
                      <FiAlertTriangle className="text-red-500 mt-0.5 flex-shrink-0 text-base" />
                      <p>
                        <strong className="text-red-400">WARNING:</strong> We never store this. If you lose it, your data is gone forever.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full btn-cyber btn-cyber-primary py-3 mt-6"
            >
              {isLogin ? 'Authenticate' : 'Initialize'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4 relative z-10">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs font-mono text-gray-500 uppercase">Or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full btn-metallic py-3 px-4 rounded-lg flex items-center justify-center gap-3 relative z-10 group"
          >
            <FcGoogle className="text-xl group-hover:scale-110 transition-transform" />
            <span className="font-mono text-sm tracking-wide">Continue with Google</span>
          </button>

          <div className="mt-8 text-center relative z-10">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-mono text-gray-400 hover:text-cyan-glow transition-colors"
            >
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
