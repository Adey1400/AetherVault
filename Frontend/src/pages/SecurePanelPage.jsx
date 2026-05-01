import React from 'react';
import { motion } from 'framer-motion';

const SecureChannelPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-widest text-gray-100 uppercase mb-2">Secure Channel</h1>
        <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">Establish an encrypted connection with command</p>
      </div>

      <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-black/50 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="space-y-6 relative z-10">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">Alias / Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors" placeholder="Agent 47" />
            </div>
            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">Comm Link (Email)</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors" placeholder="agent@network.io" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">Transmission Details</label>
            <textarea rows="5" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors resize-none" placeholder="Enter encrypted payload here..."></textarea>
          </div>
          <button type="button" className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 font-bold tracking-widest uppercase py-4 rounded-lg transition-all flex justify-center items-center gap-2">
            Transmit Payload
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default SecureChannelPage;