import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiActivity, FiCpu, FiFileText, FiLogOut, FiShield, FiTerminal, FiUser, FiChevronLeft, FiMenu } from 'react-icons/fi';
import { fetchCurrentUser } from '../services/api'; 

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [agentName, setAgentName] = useState('OPERATIVE');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const user = await fetchCurrentUser();
        if (user) {
          if (user.name) setAgentName(user.name);
          else if (user.email) setAgentName(user.email.split('@')[0]);
        }
      } catch (error) {
        console.error("Failed to load user profile", error);
      }
    };
    loadUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiShield /> },
    { name: 'The Protocol', path: '/protocol', icon: <FiCpu /> },
    { name: 'Security Intel', path: '/intel', icon: <FiFileText /> },
    { name: 'System Queries', path: '/queries', icon: <FiTerminal /> },
    { name: 'Secure Channel', path: '/contact', icon: <FiActivity /> },
  ];

  const sidebarVariants = {
    expanded: { width: 260 },
    collapsed: { width: 80 }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white font-mono overflow-hidden">
      
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-[100] p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 backdrop-blur-md"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        className={`h-full flex flex-col relative z-[60] border-r border-white/10 shadow-[4px_0_24px_rgba(0,0,0,0.5)] bg-[#050505] transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'} 
          fixed lg:relative`}
      >
        {/* Glassmorphic overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl pointer-events-none"></div>
        
        {/* Collapse Toggle (Desktop) */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-12 w-6 h-6 bg-cyan-500 rounded-full items-center justify-center z-[70] shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:scale-110 transition-transform"
        >
          <FiChevronLeft className={`w-4 h-4 text-black transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>

        {/* Logo area */}
        <div className={`p-6 relative z-10 border-b border-white/10 overflow-hidden ${isCollapsed ? 'flex justify-center' : ''}`}>
          <Link to="/" className="flex items-center gap-3 group whitespace-nowrap">
            <div className="min-w-[40px] w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-shadow duration-300">
              <span className="text-[#050505] font-bold text-lg">AV</span>
            </div>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="font-mono font-bold text-cyan-400 text-xl group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"
              >
                AetherVault
              </motion.span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 relative z-10 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <motion.div key={link.name} whileHover={{ scale: isCollapsed ? 1.1 : 1.02 }} className="block">
                <Link
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center rounded-xl transition-all duration-300 font-bold tracking-wide group whitespace-nowrap
                    ${isCollapsed ? 'justify-center p-3' : 'px-4 py-4'}
                    ${isActive ? 'bg-cyan-400/20 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'text-gray-400 hover:text-cyan-300 hover:bg-white/5'}`}
                >
                  <span className={`text-xl transition-transform duration-300 ${isCollapsed ? '' : 'mr-4'} ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {link.icon}
                  </span>
                  {!isCollapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest">
                      {link.name}
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Profile & Logout Section */}
        <div className={`p-4 border-t border-white/10 relative z-10 bg-black/20 ${isCollapsed ? 'flex flex-col items-center gap-4' : ''}`}>
          
          {/* Operative Profile Badge */}
          <div className={`flex items-center rounded-xl bg-black/40 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.05)] transition-all duration-300 hover:border-emerald-500/30 
            ${isCollapsed ? 'p-2' : 'gap-4 p-3 mb-4 w-full'}`}>
            <div className="relative min-w-[40px]">
              <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center overflow-hidden border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                <FiUser className="w-5 h-5 text-emerald-400/70" />
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-[#050505] shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              </div>
            </div>

            {!isCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-hidden flex flex-col justify-center">
                <p className="text-[10px] font-bold tracking-widest text-gray-200 uppercase leading-none mb-1.5 truncate">
                  {agentName}
                </p>
                <p className="text-[9px] font-mono tracking-widest text-emerald-400/80 uppercase leading-none truncate">
                  Online
                </p>
              </motion.div>
            )}
          </div>
          
          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className={`flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 border border-red-500/30 font-bold tracking-widest uppercase
              ${isCollapsed ? 'w-10 h-10 p-0' : 'w-full py-3 px-4 gap-3 text-[10px]'}`}
            title="Disconnect"
          >
            <FiLogOut className="w-4 h-4" />
            {!isCollapsed && <span>Disconnect</span>}
          </motion.button>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
          />
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#050505]">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 lg:pt-12 relative z-10 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-purple-900/10 pointer-events-none"></div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;