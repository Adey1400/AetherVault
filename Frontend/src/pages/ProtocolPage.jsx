import React from 'react';
import { motion } from 'framer-motion';
import { FiKey, FiLock, FiCloud, FiShield, FiCpu, FiTerminal, FiDatabase } from 'react-icons/fi';

const ProtocolPage = () => {
  const steps = [
    { icon: <FiKey className="w-8 h-8 text-cyan-400" />, title: "1. Key Generation", desc: "Browser-side entropy collection generates a unique, 256-bit cryptographic Master Key (AETH-XXXX). This key is never transmitted and resides only in secure session memory." },
    { icon: <FiLock className="w-8 h-8 text-purple-400" />, title: "2. Client-Side Encryption", desc: "Plaintext data is processed using AES-256-GCM with a unique initialization vector (IV) per entry. Encryption occurs entirely within the client runtime." },
    { icon: <FiCloud className="w-8 h-8 text-emerald-400" />, title: "3. Zero-Knowledge Sync", desc: "Encrypted ciphertexts (blobs) are synchronized with the AetherVault cloud. Without the client-side Master Key, the data remains mathematically indistinguishable from noise." }
  ];

  const specs = [
    { parameter: "Algorithm", value: "AES-256-GCM", status: "Active" },
    { parameter: "Key Derivation", value: "PBKDF2-SHA256", status: "Optimized" },
    { parameter: "Encryption Layer", value: "WebCrypto API", status: "Hardware Accelerated" },
    { parameter: "Transmission", value: "TLS 1.3 / HTTPS", status: "Secure" },
    { parameter: "Data Format", value: "JSON-Encapsulated Blobs", status: "Structured" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-20 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-12">
        <div className="w-full">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-100 uppercase mb-3">The Protocol</h1>
          <p className="text-cyan-400/60 font-mono text-xs md:text-sm tracking-widest uppercase flex flex-wrap items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            System Architecture & Cryptographic Standards
          </p>
        </div>
        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-gray-400 tracking-widest uppercase whitespace-nowrap">
          Version 2.4.0-Stable
        </div>
      </div>
      
      {/* 3-Step Process */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-purple-500/0" />
        {steps.map((step, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.1 }} 
            className="relative bg-black/40 border border-white/10 p-8 rounded-2xl backdrop-blur-md hover:border-cyan-500/30 transition-all duration-500 group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="w-16 h-16 rounded-full bg-[#0a0a0e] border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all">
              {step.icon}
            </div>
            <h3 className="text-center text-lg font-bold tracking-wider text-gray-200 mb-4 uppercase">{step.title}</h3>
            <p className="text-center text-gray-500 text-sm leading-relaxed font-mono">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Deep Dive Section */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Technical Specs Table */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FiCpu className="w-24 h-24 text-cyan-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-100 mb-8 flex items-center gap-3">
            <FiDatabase className="text-cyan-400" /> Technical Specifications
          </h2>
          <div className="space-y-4">
            {specs.map((spec, i) => (
              <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-white/5 last:border-0 group gap-2">
                <span className="text-gray-400 font-mono text-xs md:text-sm group-hover:text-cyan-400 transition-colors uppercase tracking-widest">{spec.parameter}</span>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-gray-200 font-bold text-xs md:text-sm tracking-wide">{spec.value}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">{spec.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Code Snippet / Terminal Area */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#0a0a0e] border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">crypto_engine.js</span>
          </div>
          <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed">
            <div className="flex gap-4">
              <span className="text-gray-600 select-none">01</span>
              <p><span className="text-purple-400">async function</span> <span className="text-cyan-400">encryptVault</span>(data, masterKey) &#123;</p>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 select-none">02</span>
              <p className="pl-4"><span className="text-purple-400">const</span> iv = crypto.<span className="text-yellow-400">getRandomValues</span>(<span className="text-purple-400">new</span> <span className="text-cyan-400">Uint8Array</span>(12));</p>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 select-none">03</span>
              <p className="pl-4"><span className="text-purple-400">const</span> encoded = <span className="text-purple-400">new</span> <span className="text-cyan-400">TextEncoder</span>().<span className="text-yellow-400">encode</span>(data);</p>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 select-none">04</span>
              <p className="pl-4 text-gray-500">// AES-256-GCM implementation</p>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 select-none">05</span>
              <p className="pl-4"><span className="text-purple-400">const</span> encrypted = <span className="text-purple-400">await</span> crypto.subtle.<span className="text-yellow-400">encrypt</span>(&#123;</p>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 select-none">06</span>
              <p className="pl-8">name: <span className="text-emerald-400">"AES-GCM"</span>,</p>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 select-none">07</span>
              <p className="pl-8">iv: iv</p>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 select-none">08</span>
              <p className="pl-4">, key, encoded);</p>
            </div>
            <div className="flex gap-4 mt-4">
              <span className="text-gray-600 select-none">09</span>
              <p className="text-gray-400 italic"> // Transmission via TLS encrypted channel</p>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 select-none">10</span>
              <p><span className="text-purple-400">return</span> &#123; blob: encrypted, iv: iv &#125;;</p>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 select-none">11</span>
              <p>&#125;</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Security Banner */}
      <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-white/10 rounded-2xl p-12 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <FiShield className="w-16 h-16 text-cyan-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
        <h2 className="text-2xl font-black text-gray-100 uppercase tracking-widest mb-4">Total Isolation Guaranteed</h2>
        <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm leading-relaxed">
          The AetherVault protocol ensures that even in the event of a total server compromise, your data remains secure. Without your local Master Key, decryption is computationally impossible within the lifetime of the universe.
        </p>
      </div>
    </div>
  );
};

export default ProtocolPage;