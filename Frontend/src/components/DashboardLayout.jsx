import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import TopNavbar from './TopNavbar';
import { FiLogOut, FiUser } from 'react-icons/fi';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Passwords', path: '/dashboard/passwords' },
    { name: 'Secure Notes', path: '/dashboard/notes' },
    { name: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-white font-mono overflow-hidden">
      {/* Permanent Left Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="w-64 h-full flex flex-col relative z-[60] border-r border-white/10 shadow-[4px_0_24px_rgba(0,0,0,0.5)]"
        style={{
           backgroundColor: '#050505',
        }}
      >
        {/* Glassmorphic overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl pointer-events-none"></div>
        
        {/* Logo area */}
        <div className="p-6 relative z-10 border-b border-white/10">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-shadow duration-300">
              <span className="text-[#050505] font-bold text-lg">AV</span>
            </div>
            <span className="font-mono font-bold text-cyan-400 text-xl group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
              AetherVault
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 relative z-10 overflow-y-auto">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.05 }}
              className="block"
            >
              <Link
                to={link.path}
                className="block px-4 py-3 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 font-medium"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Profile & Logout Section */}
        <div className="p-4 border-t border-white/10 relative z-10 bg-black/20">
          <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-600">
                <FiUser className="w-5 h-5 text-gray-400" />
              </div>
              {/* Glowing Green Online Dot */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#050505] shadow-[0_0_8px_rgba(34,197,94,1)]"></div>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-gray-200 truncate">Operative</p>
              <p className="text-xs text-green-400 font-medium truncate drop-shadow-[0_0_2px_rgba(34,197,94,0.8)]">Online</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 border border-red-500/30 font-medium"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Lock Vault / Logout</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#050505]">
        {/* We wrap the main content such that TopNavbar appears here.
            Note: TopNavbar uses fixed positioning. We might need to ensure
            it doesn't overlap inappropriately if unmodified. */}
        <div className="relative z-40">
          <TopNavbar />
        </div>
        
        {/* Content Wrapper */}
        {/* Pt-24 to account for the TopNavbar which is usually ~70-80px tall */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 pt-24 relative z-10 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-purple-900/10 pointer-events-none"></div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
