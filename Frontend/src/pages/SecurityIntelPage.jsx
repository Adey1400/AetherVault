import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShield, FiAlertTriangle, FiCheckCircle, FiActivity } from 'react-icons/fi';

const SecurityIntelPage = () => {
  const blogs = [
    { tag: "Cryptography", title: "Why AES-256 is the Gold Standard", date: "May 01, 2026", readTime: "4 min read", desc: "A deep dive into the mathematical complexity that makes AES-256 the choice for federal governments." },
    { tag: "Architecture", title: "The Death of the Traditional Password Manager", date: "Apr 28, 2026", readTime: "6 min read", desc: "How cloud-first architectures are failing users and why local encryption is the only path forward." },
    { tag: "Updates", title: "AetherVault v2.0: Radar Pulse UI", date: "Apr 15, 2026", readTime: "3 min read", desc: "Exploring the new visual language designed to make security intuitive and interactive." },
    { tag: "Protocols", title: "Implementing TLS 1.3 for Zero-Knowledge", date: "Apr 02, 2026", readTime: "5 min read", desc: "Why we upgraded our transmission layer to the latest standard for maximum secrecy." },
    { tag: "Hardware", title: "Securing the Random Number Generator", date: "Mar 22, 2026", readTime: "7 min read", desc: "The importance of high-entropy entropy sources in generating unguessable Master Keys." },
    { tag: "Privacy", title: "The Ethics of Zero-Knowledge Storage", date: "Mar 10, 2026", readTime: "4 min read", desc: "Why AetherVault will never collect telemetry or user metadata, by design." }
  ];

  const securityLogs = [
    { time: "17:04:12", event: "ENCRYPTION_ENGINE_BOOT", status: "SUCCESS", origin: "LOCAL_HOST" },
    { time: "17:04:15", event: "HANDSHAKE_INITIATED", status: "PENDING", origin: "TLS_LAYER" },
    { time: "17:04:16", event: "CIPHER_BLOCK_VALIDATED", status: "SUCCESS", origin: "VAULT_API" },
    { time: "17:05:01", event: "HEARTBEAT_PULSE", status: "STABLE", origin: "SYSTEM_CORE" },
    { time: "17:08:44", event: "ENTROPY_COLLECTION", status: "HIGH", origin: "BROWSER_ENV" },
    { time: "17:10:22", event: "SESSION_KEY_ROTATION", status: "COMPLETED", origin: "AUTH_DAEMON" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-gray-100 uppercase mb-3">Security Intel</h1>
          <p className="text-cyan-400/60 font-mono text-sm tracking-widest uppercase flex items-center gap-2">
            <FiShield className="animate-pulse" /> Latest Dispatches from the AetherVault Network
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Network Status</p>
            <p className="text-emerald-400 font-mono text-xs font-bold uppercase">Operational</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
            <FiCheckCircle className="text-emerald-400" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-xl font-bold text-gray-100 flex items-center gap-3 mb-8 uppercase tracking-widest">
            <FiActivity className="text-cyan-400" /> Dispatch Archives
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {blogs.map((blog, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }} 
                key={i} 
                className="group cursor-pointer bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300 shadow-xl flex flex-col h-full"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">{blog.tag}</span>
                  <span className="text-[10px] text-gray-600 font-mono uppercase tracking-tighter">{blog.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-200 mb-4 group-hover:text-cyan-400 transition-colors leading-tight">{blog.title}</h3>
                <p className="text-gray-500 text-sm font-mono leading-relaxed mb-8 flex-1">{blog.desc}</p>
                <div className="flex justify-between items-center text-xs font-mono pt-6 border-t border-white/5">
                  <span className="text-gray-600 uppercase tracking-widest">{blog.readTime}</span>
                  <div className="flex items-center gap-2 text-cyan-400 font-bold group-hover:translate-x-2 transition-transform">
                    READ LOG <FiArrowRight />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar: System Logs */}
        <div className="space-y-8">
          <h2 className="text-xl font-bold text-gray-100 flex items-center gap-3 mb-8 uppercase tracking-widest">
            <FiAlertTriangle className="text-yellow-400" /> Real-time Intel
          </h2>
          <div className="bg-[#0a0a0e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Live Security Feed</span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            </div>
            <div className="p-6 space-y-6">
              {securityLogs.map((log, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <span className="text-[10px] font-mono text-cyan-500/50 mt-1 whitespace-nowrap">{log.time}</span>
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-gray-300 group-hover:text-white transition-colors">{log.event}</p>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-mono ${log.status === 'SUCCESS' || log.status === 'STABLE' || log.status === 'COMPLETED' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                        [{log.status}]
                      </span>
                      <span className="text-[10px] font-mono text-gray-600 uppercase tracking-tighter">via {log.origin}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-6 border-t border-white/5">
                <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em] hover:bg-white/10 transition-colors">
                  View Full Audit Log
                </button>
              </div>
            </div>
          </div>

          {/* Threat Map Placeholder */}
          <div className="bg-gradient-to-br from-cyan-900/10 to-transparent border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-sm font-bold text-gray-200 mb-2 uppercase tracking-widest">Global Vault Traffic</h4>
              <p className="text-xs text-gray-500 font-mono mb-6 leading-relaxed">Active encrypted synchronizations across 14 server nodes.</p>
              <div className="flex items-center gap-4">
                <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                    className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                  ></motion.div>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">65% LOAD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityIntelPage;