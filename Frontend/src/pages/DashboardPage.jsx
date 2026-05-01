import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchUserSecrets, saveUserSecret, deleteUserSecret } from '../services/api';
import { encryptSecret, decryptSecret } from '../utils/crypto';
import { FiPlus, FiEye, FiEyeOff, FiLock, FiShield, FiX, FiTrash2, FiKey } from 'react-icons/fi';
import { useVault } from '../context/VaultContext';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [secrets, setSecrets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Lock Screen State
  const [isLocked, setIsLocked] = useState(true); 
  const [unlockInput, setUnlockInput] = useState('');
  const [unlockError, setUnlockError] = useState('');

  const { masterKey, setMasterKey } = useVault();

  useEffect(() => {
    if (masterKey) {
      setIsLocked(false);
      loadSecrets(masterKey);
      return;
    }

    const savedKey = sessionStorage.getItem('masterKey');
    if (!savedKey || savedKey === 'undefined' || savedKey === 'null')  {
      // INSTEAD OF REDIRECTING, SHOW THE LOCK SCREEN
      setIsLocked(true);
      setIsLoading(false);
      return;
    }
    
    setMasterKey(savedKey);
    setIsLocked(false);
    loadSecrets(savedKey);
  }, [masterKey, setMasterKey]);

  // Unlock Logic: Verifies the key against the AETHER_VERIFY lock
  const handleUnlock = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUnlockError('');

    try {
      const data = await fetchUserSecrets();
      const verifySecret = data.find(s => s.title === 'AETHER_VERIFY');

      if (verifySecret) {
        // Try to decrypt the verification lock
        const decrypted = decryptSecret(verifySecret.encryptedBlob, unlockInput);
        if (decrypted !== 'Vault_Unlocked') throw new Error("Invalid Key");
      }

      // If we got here, the key is perfect!
      setMasterKey(unlockInput);
      sessionStorage.setItem('masterKey', unlockInput);
      setIsLocked(false);
      
      // Load the rest of the secrets using the now-verified key
      const secretsArray = Array.isArray(data) ? data : [];
      const decryptedData = secretsArray
        .filter(s => s.title !== 'AETHER_VERIFY') 
        .map((secret) => ({
          ...secret,
          plainText: decryptSecret(secret.encryptedBlob, unlockInput)
        }));
      setSecrets(decryptedData);

    } catch (err) {
      setUnlockError("Invalid Master Key. Access Denied.");
      setUnlockInput('');
    } finally {
      setIsLoading(false);
    }
  };

  const loadSecrets = async (keyToUse) => {
    try {
      setIsLoading(true);
      const data = await fetchUserSecrets();
      const secretsArray = Array.isArray(data) ? data : [];
      const decryptedData = secretsArray
        .filter(s => s.title !== 'AETHER_VERIFY')
        .map((secret) => {
          return {
            ...secret,
            plainText: decryptSecret(secret.encryptedBlob, keyToUse)
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
      setIsLoading(true);
      const encryptedBlob = encryptSecret(newPassword, masterKey);
      await saveUserSecret({ title: newTitle, encryptedBlob: encryptedBlob });
      setNewTitle('');
      setNewPassword('');
      setIsModalOpen(false);
      await loadSecrets(masterKey);
    } catch (error) {
      console.error("Failed to save secret:", error);
      setIsLoading(false);
    }
  };

  const handleDeleteSecret = async (id) => {
    if (!window.confirm("Are you sure you want to delete this secret? This action is permanent.")) return;
    try {
      setIsLoading(true);
      await deleteUserSecret(id);
      await loadSecrets(masterKey);
    } catch (error) {
      console.error("Failed to delete secret:", error);
      setIsLoading(false);
    }
  };

  const toggleVisibility = (id) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } } };

  // ==========================================
  // RENDER: LOCK SCREEN
  // ==========================================
  if (isLocked) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center relative py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-[0_0_40px_rgba(34,211,238,0.1)] relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-black/50 rounded-full border border-cyan-500/30 flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <FiLock className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold tracking-widest text-gray-100 uppercase">Vault Locked</h2>
            <p className="text-cyan-400/60 text-xs tracking-widest uppercase mt-2">Enter Master Key to Decrypt</p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-6">
            <div className="relative">
              <FiKey className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500/50" />
              <input
                type="password"
                required
                value={unlockInput}
                onChange={(e) => setUnlockInput(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-cyan-300 font-mono focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-700 tracking-widest"
                placeholder="AETH-XXXX-XXXX-XXXX-XXXX"
              />
            </div>

            {unlockError && (
              <motion.div initial={{ x: -10 }} animate={{ x: [-10, 10, -10, 10, 0] }} className="text-red-400 text-xs font-mono bg-red-500/10 border border-red-500/20 p-3 rounded text-center">
                {unlockError}
              </motion.div>
            )}

            <button
              type="submit" disabled={isLoading}
              className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500 text-cyan-300 font-bold tracking-widest uppercase py-3 rounded-lg transition-all"
            >
              {isLoading ? "Decrypting..." : "Unlock Vault"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // RENDER: DASHBOARD (UNLOCKED)
  // ==========================================
  return (
    <div className="w-full h-full text-white font-mono relative">
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
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 px-5 py-2.5 rounded-lg transition-all">
            <FiPlus /> <span className="uppercase text-xs tracking-widest font-semibold">Add Secret</span>
          </button>
        )}
      </header>

      <main className="relative z-10 w-full min-h-[50vh]">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-2 border-transparent border-t-cyan-400 border-r-cyan-400 rounded-full" />
          </div>
        ) : secrets.length === 0 ? (
          <div className="relative flex flex-col items-center justify-center py-32 h-[60vh] w-full">
            <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-[20%] top-[10%] w-32 h-32 bg-cyan-500/10 rounded-full blur-xl border border-cyan-400/20" />
            <motion.div animate={{ y: [0, -25, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute right-[25%] top-[5%] w-24 h-24 bg-purple-500/10 rounded-full blur-xl border border-purple-400/20" />
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="z-10 flex flex-col items-center">
              <div className="p-6 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                <FiLock className="w-12 h-12 text-cyan-400/50" />
              </div>
              <h2 className="text-2xl font-bold tracking-widest uppercase mb-4 text-gray-200">Vault is Empty</h2>
              <p className="text-gray-500 max-w-md text-center mb-10 text-sm leading-relaxed">Your secure encrypted space is ready.</p>
              
              <button onClick={() => setIsModalOpen(true)} className="bg-[#050505]/50 border-2 border-cyan-400 text-cyan-300 font-bold uppercase tracking-widest py-4 px-8 rounded-full hover:bg-cyan-400/10 transition-colors flex items-center gap-3">
                <FiPlus className="w-5 h-5" /> Add Your First Secret
              </button>
            </motion.div>
          </div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secrets.map((secret, i) => (
              <motion.div key={secret.id || i} variants={itemVariants} className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-500/50 rounded-xl p-6 transition-colors duration-300 group shadow-lg flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-gray-200 font-semibold text-lg tracking-wide">{secret.title}</h3>
                  <div className="flex gap-2">
                    <button onClick={() => handleDeleteSecret(secret.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 border border-red-500/20"><FiTrash2 className="w-4 h-4" /></button>
                    <div className="p-2 bg-black/40 rounded-lg text-gray-400 border border-white/5"><FiLock className="w-4 h-4" /></div>
                  </div>
                </div>
                
                <div className="mt-auto bg-black/50 border border-white/5 rounded-lg p-4 flex justify-between items-center relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors" />
                  <AnimatePresence mode="wait">
                    <motion.div key={visiblePasswords[secret.id || i] ? 'visible' : 'hidden'} initial={{ opacity: 0, filter: 'blur(4px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, filter: 'blur(4px)' }} transition={{ duration: 0.2 }} className="font-mono text-cyan-300 tracking-wider pl-2 truncate flex-1 mr-4">
                      {visiblePasswords[secret.id || i] ? secret.plainText : '••••••••••••'}
                    </motion.div>
                  </AnimatePresence>
                  <button onClick={() => toggleVisibility(secret.id || i)} className="text-gray-500 hover:text-cyan-400 transition-colors p-2">
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-md bg-[#0a0a0e] border border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(34,211,238,0.15)]">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"><FiX className="w-6 h-6" /></button>
              <h2 className="text-2xl font-bold mb-2 uppercase tracking-widest text-gray-100">Store Secret</h2>
              <form onSubmit={handleAddSecret} className="space-y-6 mt-6">
                <div>
                  <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Title</label>
                  <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none" placeholder="e.g. ProtonMail" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 tracking-widest uppercase mb-2">Password</label>
                  <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none" placeholder="••••••••••••" />
                </div>
                <button type="submit" className="w-full mt-4 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500 text-cyan-300 font-bold tracking-widest uppercase py-3.5 rounded-lg transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]">
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