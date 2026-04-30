import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Adjust these imports based on how you set up your files!
import { fetchUserSecrets, saveUserSecret } from '../services/api';
import { encryptSecret, decryptSecret } from '../utils/crypto';

const SetupVaultPage = () => {
  const [masterKey, setMasterKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUnlock = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Fetch all secrets from Spring Boot
      const secrets = await fetchUserSecrets();
      
      // 2. Look for our special Verification Lock
      const verificationSecret = secrets.find(s => s.title === 'AETHER_VERIFY');

      if (verificationSecret) {
        // --- RETURNING USER ---
        const decrypted = decryptSecret(verificationSecret.encryptedBlob, masterKey);
        
        if (decrypted === 'Vault_Unlocked') {
          // Success! The key is right. (In a real app, save this to React Context)
          sessionStorage.setItem('temp_master_key', masterKey); 
          sessionStorage.setItem('masterKey', masterKey);
          navigate('/dashboard');

        } else {
          // Failure! The key is wrong.
          setError('Invalid credentials');
        }
      } else {
        // --- NEW USER ---
        // Create the lock for the first time
        const newEncryptedBlob = encryptSecret('Vault_Unlocked', masterKey);
        await saveUserSecret({
          title: 'AETHER_VERIFY',
          encryptedBlob: newEncryptedBlob
        });
        
        // Save to state/session and proceed
        sessionStorage.setItem('temp_master_key', masterKey);
        sessionStorage.setItem('masterKey', masterKey);
        navigate('/dashboard');

      }
    } catch (err) {
      console.error(err);
      setError('Connection to AetherVault failed.');
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
          <h1 className="text-3xl font-bold text-white tracking-wider mb-2">AETHER VAULT</h1>
          <p className="text-cyan-400 text-sm font-mono tracking-widest uppercase">System Lock Active</p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-6">
          <div>
            <label className="block text-white/60 text-xs font-mono mb-2 uppercase">Enter Master Key</label>
            {/* HERE IS YOUR INPUT FIELD */}
            <input 
              type="password" 
              value={masterKey}
              onChange={(e) => setMasterKey(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
              placeholder="••••••••••••"
              required
            />
          </div>

          {/* Framer Motion Shake Effect for Errors */}
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

          <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg">
            <p className="text-orange-400 text-xs text-center font-mono leading-relaxed">
              WARNING: Your Master Key never leaves this device. If lost, your data cannot be recovered by the server.
            </p>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center font-mono disabled:opacity-50"
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              "DECRYPT VAULT"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SetupVaultPage;