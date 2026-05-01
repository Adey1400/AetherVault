import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { initializeVaultStatus } from '../services/api'; 
// 1. Import your Context Hook
import { useVault } from '../context/VaultContext';

// Helper function to generate a mathematically secure, readable key
const generateSecureKey = () => {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  const hex = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  // Creates a clean format: AETH-XXXX-XXXX-XXXX-XXXX
  return `AETH-${hex.slice(0,4).toUpperCase()}-${hex.slice(4,8).toUpperCase()}-${hex.slice(8,12).toUpperCase()}-${hex.slice(12,16).toUpperCase()}`;
};

const SetupVaultPage = () => {
  const [masterKey, setMasterKey] = useState('');
  const [copied, setCopied] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 2. Grab the setter from your global Context and rename it to avoid collision
  const { setMasterKey: setGlobalMasterKey } = useVault();

  // Generate the key the moment the page loads
  useEffect(() => {
    setMasterKey(generateSecureKey());
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(masterKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInitialize = async (e) => {
    e.preventDefault();
    if (!acknowledged) {
      setError('You must acknowledge that you have saved your key.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Tell Spring Boot to set is_vault_initialized = true
      await initializeVaultStatus(); 
      
      // 2. Save the key in temporary memory (survives refreshes)
      sessionStorage.setItem('masterKey', masterKey);

      // 3. SECURE STATE SYNC: Tell React's global Context about the key!
      setGlobalMasterKey(masterKey);
      //Creating a verification lock
      const verifyBlob = encryptSecret('Vault_Unlocked', masterKey);
      await saveUserSecret({ title: 'AETHER_VERIFY', encryptedBlob: verifyBlob });
      // 4. Send them to the vault!
      navigate('/dashboard');

    } catch (err) {
      console.error(err);
      setError('Failed to initialize vault. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-wider mb-2">VAULT INITIALIZATION</h1>
          <p className="text-cyan-400 text-sm font-mono tracking-widest uppercase">Generate Master Key</p>
        </div>

        <div className="space-y-6">
          {/* Key Display Area */}
          <div className="bg-black/50 border border-white/10 rounded-lg p-6 text-center relative group">
             <label className="block text-white/60 text-xs font-mono mb-4 uppercase">Your Unique Key</label>
             <p className="text-2xl text-cyan-300 font-mono tracking-widest break-all">
                {masterKey}
             </p>
             
             <button 
                onClick={handleCopy}
                className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded font-mono text-sm transition-colors w-full flex items-center justify-center gap-2"
             >
                {copied ? '✓ COPIED TO CLIPBOARD' : '📋 COPY KEY'}
             </button>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg">
            <p className="text-orange-400 text-xs text-center font-mono leading-relaxed">
              WARNING: This key never leaves this device. We cannot recover it. If you lose this key, your vault is permanently locked.
            </p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center mt-1">
              <input 
                type="checkbox" 
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="peer sr-only"
              />
              <div className="w-5 h-5 border-2 border-white/30 rounded peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-colors"></div>
              <svg className="absolute w-5 h-5 text-white scale-0 peer-checked:scale-100 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm text-white/70 font-mono select-none group-hover:text-white transition-colors">
              I have securely copied and saved my Master Key offline or in a secure location.
            </span>
          </label>

          {/* Error Shake */}
          {error && (
            <motion.div 
              initial={{ x: -10 }} 
              animate={{ x: [-10, 10, -10, 10, 0] }} 
              transition={{ duration: 0.4 }}
              className="text-red-500 text-xs font-mono bg-red-500/10 border border-red-500/20 p-3 rounded"
            >
              {error}
            </motion.div>
          )}

          <button 
            onClick={handleInitialize}
            disabled={loading || !acknowledged}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center font-mono disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              "INITIALIZE VAULT"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SetupVaultPage;