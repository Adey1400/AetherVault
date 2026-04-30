import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useVault } from '../context/VaultContext';
import { FiAlertTriangle, FiLock, FiKey } from 'react-icons/fi';

const SetupVaultPage = () => {
  const [password, setPassword] = useState('');
  const [isDeriving, setIsDeriving] = useState(false);
  const { setMasterKey } = useVault();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) return;

    setIsDeriving(true);

    // Simulate key derivation process (e.g., PBKDF2 / Argon2 in a real app)
    setTimeout(() => {
      setMasterKey(password); // Save to global state, never to localStorage
      navigate('/dashboard');
    }, 2500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505] text-white p-4 relative overflow-hidden">
      {/* Subtle deep background lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        <AnimatePresence mode="wait">
          {!isDeriving ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              transition={{ duration: 0.4 }}
              className="bg-[#0f0f13]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Top accent highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-500/50 to-transparent" />

              <div className="flex flex-col items-center mb-8">
                <div className="p-4 bg-black/40 rounded-full mb-4 border border-white/5 shadow-inner">
                  <FiLock className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                </div>
                <h1 className="text-2xl font-bold text-gray-100 tracking-wide text-center">
                  Secure Your Vault
                </h1>
                <p className="text-gray-400 mt-2 text-sm text-center">
                  Create or enter your Master Password to proceed.
                </p>
              </div>

              {/* Severe Warning Box */}
              <div className="flex items-start gap-3 bg-red-950/30 border border-red-900/60 p-4 rounded-xl mb-8 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 shadow-[0_0_10px_#dc2626]" />
                <FiAlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm leading-relaxed">
                  <strong className="block text-red-500 mb-1 tracking-wide text-xs uppercase">Critical Warning</strong>
                  This key never leaves your device. If lost, your vault is unrecoverable.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="masterPassword" className="text-xs font-semibold text-gray-500 uppercase tracking-widest pl-1">
                    Master Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiKey className="text-gray-500" />
                    </div>
                    <input
                      id="masterPassword"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-black/60 border border-white/10 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder-gray-600 shadow-inner"
                      placeholder="••••••••••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98]"
                >
                  Unlock Vault
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="deriving"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <div className="relative w-20 h-20 mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-white/10 border-t-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border border-white/5 border-b-cyan-500"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 m-auto w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee]"
                />
              </div>

              <motion.h2
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-cyan-400 font-mono tracking-[0.2em] text-lg uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
              >
                Deriving Key
              </motion.h2>
              <p className="text-gray-500 text-sm mt-3 font-mono tracking-wider">
                Cryptographic hashing in progress...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SetupVaultPage;
