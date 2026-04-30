import { useEffect, useRef } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasProcessed = useRef(false); // This stops the double-render bug!

  useEffect(() => {
    // If we already ran this, exit immediately
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (token) {
      console.log("Token caught securely!");
      // 1. Save the token
      localStorage.setItem('aether_jwt', token);
      
      // 2. Clean the URL for security
      window.history.replaceState({}, document.title, '/setup-vault');
      
      // 3. Send them to the Vault Setup
      navigate('/setup-vault', { replace: true });
    } else {
      console.log("No token found, returning to landing.");
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

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
