import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiArrowRight, FiShield } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCurrentUser } from '../services/api';

const TopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('aether_jwt') || sessionStorage.getItem('aether_jwt');

  useEffect(() => {
    if (token) {
      const loadUser = async () => {
        try {
          const userData = await fetchCurrentUser();
          setUser(userData);
        } catch (err) {
          console.error("Failed to load user in navbar", err);
        }
      };
      loadUser();
    }
  }, [token]);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'The Protocol', path: '/protocol' },
    { label: 'Features', path: '/features' },
    { label: 'Contact', path: '/public-contact' },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 glass glow-border-cyan backdrop-blur-lg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-glow to-purple-glow flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-shadow"
          >
            <span className="text-obsidian-900 font-bold text-sm">AV</span>
          </motion.div>
          <span className="font-mono font-bold text-cyan-glow hidden sm:inline group-hover:text-white transition-colors">
            AetherVault
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-gray-300 hover:text-cyan-glow transition-colors duration-300 font-mono text-[10px] font-bold relative group uppercase tracking-[0.2em]"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-glow to-transparent group-hover:w-full transition-all duration-300" />
            </Link>
          ))}

          <div className="h-4 w-px bg-white/10 mx-2" />

          {token ? (
            <Link 
              to="/dashboard" 
              className="flex items-center gap-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 px-4 py-2 rounded-full transition-all group"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                <FiUser className="w-3 h-3 text-cyan-400" />
              </div>
              <span className="text-[10px] font-bold text-gray-200 uppercase tracking-widest">
                {user?.name || user?.email?.split('@')[0] || 'Dashboard'}
              </span>
              <FiArrowRight className="w-3 h-3 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/auth" className="text-gray-400 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors">
                Login
              </Link>
              <Link to="/auth" className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:scale-105 active:scale-95">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg glass glow-border-cyan"
        >
          {isOpen ? <FiX className="w-6 h-6 text-cyan-glow" /> : <FiMenu className="w-6 h-6 text-cyan-glow" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl"
          >
            <div className="px-6 py-10 space-y-8">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-cyan-glow transition-colors duration-300 font-mono text-xs uppercase tracking-[0.3em] font-bold"
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-px bg-white/10 w-full" />
              {token ? (
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-xl text-cyan-400 font-bold uppercase tracking-widest text-xs"
                >
                  <span>View Vault</span>
                  <FiShield />
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/auth" onClick={() => setIsOpen(false)} className="flex items-center justify-center p-4 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400">
                    Login
                  </Link>
                  <Link to="/auth" onClick={() => setIsOpen(false)} className="flex items-center justify-center p-4 bg-cyan-500 rounded-xl text-xs font-bold uppercase tracking-widest text-black">
                    Start
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default TopNavbar;
