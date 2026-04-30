import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useVault } from '../context/VaultContext';
import { fetchUserSecrets, saveUserSecret } from '../services/api';
import { encryptSecret, decryptSecret } from '../utils/crypto';
import { FiPlus, FiLogOut, FiEye, FiEyeOff, FiLock, FiShield, FiX } from 'react-icons/fi';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { masterKey, setMasterKey } = useVault();
  const [secrets, setSecrets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // 1. On mount, verify if masterKey exists. If not, redirect.
  useEffect(() => {
    if (!masterKey) {
      navigate('/setup-vault', { replace: true });
      return;
    }
    loadSecrets();
  }, [masterKey, navigate]);

  // 2. Fetch and decrypt secrets
  const loadSecrets = async () => {
    try {
      setIsLoading(true);
      const data = await fetchUserSecrets();
      // Ensure data is an array
      const secretsArray = Array.isArray(data) ? data : [];
      
      const decryptedData = secretsArray.map((secret) => {
        // Map over returned secrets and decrypt
        const plainText = decryptSecret(secret.encryptedBlob, masterKey);
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

  // 3. Encrypt and save new secret
  const handleAddSecret = async (e) => {
    e.preventDefault();
    if (!newTitle || !newPassword) return;

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
      loadSecrets();
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

  // 4. Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('aether_jwt');
    setMasterKey(null);
    navigate('/');
  };

  if (!masterKey) return null; // Avoid rendering before redirect

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-mono relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <FiShield className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-widest text-gray-100 uppercase">Secure Vault</h1>
            <p className="text-cyan-400/60 text-sm tracking-widest mt-1">Encrypted & Isolated</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 px-5 py-2.5 rounded-lg transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
          >
            <FiPlus /> <span className="uppercase text-xs tracking-widest font-semibold">Add Secret</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 hover:border-red-400 px-5 py-2.5 rounded-lg transition-all duration-300"
          >
            <FiLogOut /> <span className="uppercase text-xs tracking-widest font-semibold">Disconnect</span>
          </button>
        </div>
      </header>

      {/* Main Content: Sleek Grid */}
      <main className="relative z-10">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-2 border-transparent border-t-cyan-400 border-r-cyan-400 rounded-full"
            />
          </div>
        ) : secrets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <FiLock className="w-12 h-12 mb-4 opacity-50" />
            <p className="tracking-widest uppercase text-sm">Vault is empty</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {secrets.map((secret, i) => (
              <motion.div
                key={secret.id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-500/50 rounded-xl p-6 transition-all duration-300 group shadow-lg"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-gray-200 font-semibold text-lg tracking-wide">{secret.title}</h3>
                  <div className="p-2 bg-black/40 rounded-lg text-gray-400 border border-white/5">
                    <FiLock className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="bg-black/50 border border-white/5 rounded-lg p-4 flex justify-between items-center relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors" />
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={visiblePasswords[secret.id || i] ? 'visible' : 'hidden'}
                      initial={{ opacity: 0, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(4px)' }}
                      transition={{ duration: 0.2 }}
                      className="font-mono text-cyan-300 tracking-wider pl-2"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
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
