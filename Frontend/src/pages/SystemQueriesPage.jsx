import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiSearch, FiCode, FiTerminal, FiBookOpen, FiGlobe, FiCpu } from 'react-icons/fi';

const SystemQueriesPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    { q: "What happens if I lose my Master Key?", a: "Because AetherVault uses Zero-Knowledge Architecture, we do not have a copy of your key. If you lose it, your vault cannot be recovered. Always store your AETH key in a safe, offline location." },
    { q: "Is the code open-source?", a: "The core cryptographic libraries and client-side encryption protocols are open for audit. Trust is earned through transparency. We believe security should never be based on obscurity." },
    { q: "Can AetherVault see my passwords?", a: "No. Your data is encrypted locally on your machine before being sent to our servers. We only store mathematical blobs of ciphertext (base64 encoded)." },
    { q: "Which encryption algorithms are used?", a: "We utilize AES-256-GCM for data encryption and PBKDF2 with HMAC-SHA256 for key derivation. This ensures both data confidentiality and integrity." },
    { q: "Does AetherVault support 2FA?", a: "Yes. In addition to your Master Key, you can enable OIDC-based authentication (Google OAuth2) for an extra layer of identity verification." },
    { q: "How are the Master Keys generated?", a: "Master Keys are generated using the browser's cryptographically strong random number generator (CSPRNG) within the WebCrypto API." },
    { q: "What is Zero-Knowledge Architecture?", a: "It means the service provider has zero knowledge of the data stored on its servers. We cannot reset your password, view your secrets, or decrypt your data." },
    { q: "Can I export my data?", a: "Yes, you can export your decrypted secrets at any time through the 'Secure Channel' interface as a portable JSON file." }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-20">
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-white/5 pb-12">
        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-100 uppercase mb-3">System Queries</h1>
          <p className="text-purple-400/60 font-mono text-xs md:text-sm tracking-widest uppercase flex items-center gap-2">
            <FiBookOpen className="animate-pulse" /> Knowledge Base & API Reference
          </p>
        </div>
        <div className="w-full md:w-96 relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search system documentation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm text-gray-200 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all placeholder-gray-600 font-mono"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* FAQ Section */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-100 flex items-center gap-3 mb-8 uppercase tracking-widest">
            <FiCpu className="text-purple-400" /> General Inquiries
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-4">
            {filteredFaqs.map((faq, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: i * 0.05 }} 
                key={i} 
                className="border border-white/10 rounded-2xl bg-black/40 overflow-hidden shadow-lg group hover:border-purple-500/30 transition-all"
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)} 
                  className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold tracking-wide text-gray-200 group-hover:text-purple-400 transition-colors">{faq.q}</span>
                  <FiChevronDown className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} 
                      className="px-8 pb-8 text-gray-500 text-sm font-mono leading-relaxed border-t border-white/5 pt-6 bg-white/[0.02]"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Developer Side Panel */}
        <div className="space-y-12">
          {/* API Quick Start */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-100 flex items-center gap-3 uppercase tracking-widest">
              <FiCode className="text-cyan-400" /> Developer API
            </h2>
            <div className="bg-[#0a0a0e] border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">vault_request.curl</span>
                <FiTerminal className="text-cyan-400/50" />
              </div>
              <div className="p-6 font-mono text-[11px] leading-relaxed text-gray-400">
                <p className="text-emerald-400">$ curl -X POST https://api.aethervault.io/v1/sync</p>
                <p className="pl-4 mt-2">-H <span className="text-purple-400">"Authorization: Bearer JWT_TOKEN"</span></p>
                <p className="pl-4">-H <span className="text-purple-400">"Content-Type: application/json"</span></p>
                <p className="pl-4 mt-2">-d '&#123;</p>
                <p className="pl-8">"title": <span className="text-yellow-400">"Encrypted_Payload"</span>,</p>
                <p className="pl-8">"blob": <span className="text-yellow-400">"U2FsdGVkX1+..."</span></p>
                <p className="pl-4">&#125;'</p>
                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-[10px] text-gray-600 uppercase mb-3">Response:</p>
                  <p className="text-emerald-400/70">&#123; "status": "201_CREATED" &#125;</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-gradient-to-br from-purple-900/10 to-transparent border border-white/10 rounded-2xl p-8 space-y-6">
            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-widest flex items-center gap-2">
              <FiGlobe className="text-purple-400" /> Global Resources
            </h4>
            <div className="space-y-4">
              <a href="#" className="flex items-center justify-between text-xs font-mono text-gray-500 hover:text-purple-400 transition-colors group">
                <span>Security Whitepaper</span>
                <FiChevronDown className="-rotate-90 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#" className="flex items-center justify-between text-xs font-mono text-gray-500 hover:text-purple-400 transition-colors group">
                <span>GDPR Compliance Audit</span>
                <FiChevronDown className="-rotate-90 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#" className="flex items-center justify-between text-xs font-mono text-gray-500 hover:text-purple-400 transition-colors group">
                <span>Uptime History (99.99%)</span>
                <FiChevronDown className="-rotate-90 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Help Badge */}
          <div className="bg-white/5 border border-dashed border-white/20 rounded-2xl p-8 text-center">
            <p className="text-xs text-gray-500 font-mono mb-4 italic">Still have questions?</p>
            <button className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-[0.2em]">
              CONTACT SYSTEM ADMIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemQueriesPage;