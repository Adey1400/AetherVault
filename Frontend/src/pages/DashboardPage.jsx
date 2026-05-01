import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchUserSecrets, saveUserSecret, deleteUserSecret } from '../services/api';
import { encryptSecret, decryptSecret } from '../utils/crypto';
import { FiPlus, FiEye, FiEyeOff, FiLock, FiShield, FiX, FiTrash2, FiKey, FiCopy, FiCheck } from 'react-icons/fi';
import { useVault } from '../context/VaultContext';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [secrets, setSecrets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [copiedId, setCopiedId] = useState(null);
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
      setIsLocked(true);
      setIsLoading(false);
      return;
    }
    
    setMasterKey(savedKey);
    setIsLocked(false);
    loadSecrets(savedKey);
  }, [masterKey, setMasterKey]);

  const handleUnlock = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUnlockError('');

    try {
      const data = await fetchUserSecrets();
      const verifySecret = data.find(s => s.title === 'AETHER_VERIFY');

      if (verifySecret) {
        const decrypted = decryptSecret(verifySecret.encryptedBlob, unlockInput);
        if (decrypted !== 'Vault_Unlocked') throw new Error("Invalid Key");
      }

      setMasterKey(unlockInput);
      sessionStorage.setItem('masterKey', unlockInput);
      setIsLocked(false);
      
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

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleVisibility = (id) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, scale: 0.9, y: 20 }, visible: { opacity: 1, scale: 1, y: 0 } };

  if (isLocked) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center relative py-20 px-4">
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
            <div className="relative group">
              <FiKey size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500/50 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="password"
                required
                value={unlockInput}
                onChange={(e) => setUnlockInput(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg !pl-16 pr-4 py-3 text-cyan-300 font-mono focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-700 tracking-widest"
                placeholder="AETH-XXXX-XXXX-XXXX-XXXX"
              />
            </div>

            {unlockError && (
              <motion.div initial={{ x: -10 }} animate={{ x: [-10, 10, -10, 10, 0] }} className="text-red-400 text-[10px] font-mono bg-red-500/10 border border-red-500/20 p-3 rounded text-center uppercase tracking-widest">
                {unlockError}
              </motion.div>
            )}

            <button
              type="submit" disabled={isLoading}
              className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500 text-cyan-300 font-bold tracking-widest uppercase py-4 rounded-lg transition-all active:scale-[0.98]"
            >
              {isLoading ? "Decrypting..." : "Unlock Vault"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-full text-white font-mono relative pb-20">
      <header className="relative z-20 flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8 border-b border-white/5 pb-12">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-cyan-400/10 rounded-2xl border border-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <FiShield className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-gray-100 uppercase leading-none mb-2">Secure Vault</h1>
            <p className="text-cyan-400/60 text-[10px] font-bold tracking-[0.3em] uppercase">Status: Isolated & Encrypted</p>
          </div>
        </div>
        
        {secrets.length > 0 && (
          <button onClick={() => setIsModalOpen(true)} className="w-full md:w-auto flex items-center justify-center gap-3 bg-cyan-400 text-black px-8 py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] active:scale-95">
            <FiPlus className="w-4 h-4" /> Add New Secret
          </button>
        )}
      </header>

      <main className="relative z-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-white/10 border-t-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.2)]" />
            <p className="text-[10px] font-bold tracking-[0.4em] text-cyan-400/50 uppercase animate-pulse">Decrypting Blobs...</p>
          </div>
        ) : secrets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="p-8 rounded-full bg-white/5 border border-white/10 mb-8 relative">
               <FiLock className="w-16 h-16 text-cyan-400/20" />
               <div className="absolute inset-0 border border-cyan-400/30 rounded-full animate-ping opacity-20"></div>
            </div>
            <h2 className="text-2xl font-black tracking-widest uppercase mb-4 text-gray-200">The Vault is Pristine</h2>
            <p className="text-gray-500 max-w-sm mb-12 text-sm leading-relaxed font-mono">No encrypted secrets found. Start building your secure database now.</p>
            <button onClick={() => setIsModalOpen(true)} className="bg-cyan-500/10 border border-cyan-500 text-cyan-400 font-bold uppercase tracking-[0.2em] py-5 px-10 rounded-2xl hover:bg-cyan-500 hover:text-black transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
              <FiPlus /> Initialize First Entry
            </button>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-10"
          >
            {secrets.map((secret, i) => (
              <motion.div 
                key={secret.id || i} 
                variants={itemVariants} 
                className="bg-[#0a0a0e] border border-white/10 hover:border-cyan-500/50 rounded-[2rem] p-8 transition-all duration-500 group shadow-2xl flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent group-hover:via-cyan-500 transition-all"></div>
                
                <div className="flex justify-between items-start mb-10">
                  <div className="space-y-1 overflow-hidden">
                    <p className="text-[10px] font-bold text-cyan-400/40 uppercase tracking-widest">Secret Alias</p>
                    <h3 className="text-gray-100 font-bold text-lg tracking-tight break-words group-hover:text-cyan-400 transition-colors">{secret.title}</h3>
                  </div>
                  <button onClick={() => handleDeleteSecret(secret.id)} className="p-3 bg-red-500/5 hover:bg-red-500/20 rounded-xl text-red-500/40 hover:text-red-400 border border-white/5 hover:border-red-500/30 transition-all">
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="mt-auto space-y-4">
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-5 flex justify-between items-center relative overflow-hidden group/pass">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={visiblePasswords[secret.id || i] ? 'visible' : 'hidden'} 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: 10 }} 
                        className="font-mono text-cyan-300 text-sm tracking-widest truncate flex-1"
                      >
                        {visiblePasswords[secret.id || i] ? secret.plainText : '••••••••••••'}
                      </motion.div>
                    </AnimatePresence>
                    <button onClick={() => toggleVisibility(secret.id || i)} className="text-gray-600 hover:text-cyan-400 transition-colors ml-4">
                      {visiblePasswords[secret.id || i] ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                     <button 
                      onClick={() => handleCopy(secret.plainText, secret.id || i)}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold uppercase tracking-widest text-[10px] transition-all
                        ${copiedId === (secret.id || i) ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                     >
                       {copiedId === (secret.id || i) ? <FiCheck /> : <FiCopy />}
                       <span>{copiedId === (secret.id || i) ? 'Copied' : 'Copy'}</span>
                     </button>
                     <div className="flex items-center justify-center bg-black/20 border border-white/5 rounded-xl text-cyan-500/30 text-[10px] font-bold uppercase tracking-widest">
                       SECURE_AES
                     </div>
                  </div>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 30 }} className="relative w-full max-w-md bg-[#0a0a0e] border border-cyan-500/30 rounded-[2.5rem] p-10 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors p-2"><FiX className="w-6 h-6" /></button>
              <div className="mb-10">
                <h2 className="text-2xl font-black mb-2 uppercase tracking-widest text-gray-100">Establish Entry</h2>
                <p className="text-xs font-mono text-cyan-400/50 uppercase tracking-widest">Vault Layer: AES-GCM-256</p>
              </div>
              <form onSubmit={handleAddSecret} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Secret Identifier</label>
                  <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-cyan-500 outline-none transition-all" placeholder="e.g. GITHUB_ACCESS" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Encrypted Payload</label>
                  <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-cyan-500 outline-none transition-all" placeholder="••••••••••••" />
                </div>
                <button type="submit" className="w-full mt-4 bg-cyan-500 text-black font-black uppercase tracking-[0.3em] py-5 rounded-2xl hover:bg-white transition-all shadow-[0_0_25px_rgba(34,211,238,0.4)] active:scale-95">
                  Secure Entry
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