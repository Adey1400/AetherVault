import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Grab the token from the URL search parameters
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      // Save token to localStorage
      localStorage.setItem('aether_jwt', token);

      // Immediately strip the token from the URL for security
      const cleanUrl = window.location.pathname;
      window.history.replaceState(null, '', cleanUrl);

      // Redirect to /setup-vault (with a slight delay to show the animation)
      setTimeout(() => {
        navigate('/setup-vault');
      }, 1500);
    } else {
      // If no token is found, safely redirect back to home
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] overflow-hidden relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-900/20 blur-[100px] rounded-full" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Sleek Framer Motion loading animation */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-cyan-500/30 border-t-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner counter-rotating elements */}
          <motion.div
            className="absolute inset-3 rounded-full border border-cyan-400/20 border-b-cyan-300"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Center pulsating core */}
          <motion.div
            className="w-8 h-8 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8] 
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col items-center gap-2">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-cyan-400 font-mono tracking-[0.2em] text-lg uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          >
            Authenticating
          </motion.h2>
          
          <motion.p
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-cyan-200/60 font-mono text-sm tracking-widest"
          >
            Securing connection...
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default OAuth2RedirectHandler;
