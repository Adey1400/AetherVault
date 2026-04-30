import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchUserSecrets, saveUserSecret } from '../services/api';
import { encryptSecret, decryptSecret } from '../utils/crypto';
import { FiPlus, FiEye, FiEyeOff, FiLock, FiShield, FiX } from 'react-icons/fi';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [secrets, setSecrets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [masterKey, setMasterKey] = useState(null);

  useEffect(() => {
    // 1. On mount, check if masterKey exists. If not, redirect.
    const key = sessionStorage.getItem('masterKey');
    if (!key || key === 'undefined' || key === 'null')  {
      console.error("No Master Key found. Vault locked."); 
      navigate('/setup-vault', { replace: true });
      return;
    }
    setMasterKey(key);
    loadSecrets(key);
  }, [navigate]);
  if (!key || key === 'undefined' || key === 'null') return null;
  // 2. Fetch and decrypt secrets
  const loadSecrets = async (keyToUse) => {
    try {
      setIsLoading(true);
      const data = await fetchUserSecrets();
      // Ensure data is an array
      const secretsArray = Array.isArray(data) ? data : [];
      
      const decryptedData = secretsArray
        .filter(s => s.title !== 'AETHER_VERIFY') // Hide the verification lock from grid
        .map((secret) => {
          // Decrypt the blob to get plain text
          const plainText = decryptSecret(secret.encryptedBlob, sessionStorage.getItem('masterKey'));
          return {
            ...secret,
            plainText
          };
      });
      setSecrets(decryptedData);
    } catch (error) {
      console.error("Failed to load secrets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSecret = async (e) => {
    e.preventDefault();
    if (!newTitle || !newPassword || !masterKey) return;

    try {
      const encryptedBlob = encryptSecret(newPassword, masterKey);
      await saveUserSecret({
        title: newTitle,
        encryptedBlob: encryptedBlob
      });
      setNewTitle('');
      setNewPassword('');
      setIsModalOpen(false);
      // Refresh list
      loadSecrets(masterKey);
    } catch (error) {
      console.error("Failed to save secret:", error);
    }
  };

  const toggleVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!masterKey) return null; // Avoid rendering before redirect

  // Framer motion variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="w-full h-full text-white font-mono relative">
      {/* Header */}
      <header className="relative z-20 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <FiShield className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-widest text-gray-100 uppercase">Secure Vault</h1>
            <p className="text-cyan-400/60 text-sm tracking-widest mt-1">Encrypted & Isolated</p>
          </div>
        </div>
        
        {secrets.length > 0 && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 px-5 py-2.5 rounded-lg transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              <FiPlus /> <span className="uppercase text-xs tracking-widest font-semibold">Add Secret</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full min-h-[50vh]">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-2 border-transparent border-t-cyan-400 border-r-cyan-400 rounded-full"
            />
          </div>
        ) : secrets.length === 0 ? (
          // --- ANTI-GRAVITY EMPTY STATE ---
          <div className="relative flex flex-col items-center justify-center py-32 h-[60vh] w-full">
            {/* 3 Floating Glassmorphic Orbs/Nodes */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-[20%] top-[10%] w-32 h-32 bg-cyan-500/10 rounded-full blur-xl border border-cyan-400/20 shadow-[0_0_50px_rgba(34,211,238,0.2)]"
            />
            <motion.div 
              animate={{ y: [0, -25, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute right-[25%] top-[5%] w-24 h-24 bg-purple-500/10 rounded-full blur-xl border border-purple-400/20 shadow-[0_0_40px_rgba(168,85,247,0.2)]"
            />
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute left-[40%] bottom-[10%] w-20 h-20 bg-blue-500/10 rounded-full blur-xl border border-blue-400/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
            />

            {/* Empty State Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="z-10 flex flex-col items-center"
            >
              <div className="p-6 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                <FiLock className="w-12 h-12 text-cyan-400/50" />
              </div>
              <h2 className="text-2xl font-bold tracking-widest uppercase mb-4 text-gray-200">Vault is Empty</h2>
              <p className="text-gray-500 max-w-md text-center mb-10 text-sm leading-relaxed">
                Your secure encrypted space is ready. Add your first secret to initialize the grid.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: ['0 0 10px rgba(34,211,238,0.3)', '0 0 30px rgba(34,211,238,0.7)', '0 0 10px rgba(34,211,238,0.3)'] }}
                transition={{ boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
                onClick={() => setIsModalOpen(true)}
                className="bg-[#050505]/50 border-2 border-cyan-400 text-cyan-300 font-bold uppercase tracking-widest py-4 px-8 rounded-full hover:bg-cyan-400/10 transition-colors flex items-center gap-3 backdrop-blur-sm"
              >
                <FiPlus className="w-5 h-5" /> Add Your First Secret
              </motion.button>
            </motion.div>
          </div>
        ) : (
          // --- THE GRID STATE ---
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {secrets.map((secret, i) => (
              <motion.div
                key={secret.id || i}
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-500/50 rounded-xl p-6 transition-colors duration-300 group shadow-lg flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-gray-200 font-semibold text-lg tracking-wide">{secret.title}</h3>
                  <div className="p-2 bg-black/40 rounded-lg text-gray-400 border border-white/5">
                    <FiLock className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="mt-auto bg-black/50 border border-white/5 rounded-lg p-4 flex justify-between items-center relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors" />
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={visiblePasswords[secret.id || i] ? 'visible' : 'hidden'}
                      initial={{ opacity: 0, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(4px)' }}
                      transition={{ duration: 0.2 }}
                      className="font-mono text-cyan-300 tracking-wider pl-2 truncate flex-1 mr-4"
                    >
                      {visiblePasswords[secret.id || i] ? secret.plainText : '••••••••••••'}
                    </motion.div>
                  </AnimatePresence>

                  <button
                    onClick={() => toggleVisibility(secret.id || i)}
                    className="text-gray-500 hover:text-cyan-400 transition-colors p-2"
                  >
                    {visiblePasswords[secret.id || i] ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Add Secret Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a0e] border border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold mb-2 uppercase tracking-widest text-gray-100">Store Secret</h2>
              <p className="text-xs text-cyan-400/60 mb-8 tracking-widest uppercase">AES-256 Client-Side Encryption</p>

              <form onSubmit={handleAddSecret} className="space-y-6">
                <div>
                  <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Title / Identifier</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-700"
                    placeholder="e.g. ProtonMail Account"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Secret Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-700"
                    placeholder="••••••••••••"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full mt-4 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500 text-cyan-300 font-bold tracking-widest uppercase py-3.5 rounded-lg transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                >
                  Encrypt & Save
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
