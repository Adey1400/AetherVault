import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiMapPin, FiMessageSquare, FiArrowLeft, FiGithub, FiTwitter } from 'react-icons/fi';
import LandingLayout from '../components/LandingLayout';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <LandingLayout>
      <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Info */}
          <div className="space-y-12">
            <div>
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-purple-glow font-mono text-sm tracking-[0.3em] uppercase mb-4"
              >
                Secure Channel
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-7xl font-bold font-mono tracking-tighter mb-8"
              >
                Get in <span className="bg-gradient-to-r from-cyan-glow to-purple-glow bg-clip-text text-transparent text-glow">Touch</span>
              </motion.h1>
              <p className="text-gray-400 text-lg font-mono leading-relaxed max-w-md">
                Have questions about our zero-knowledge architecture? Our security operatives are ready to establish a secure line.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-cyan-glow/10 border border-cyan-glow/30 flex items-center justify-center text-xl text-cyan-glow">
                  <FiMail />
                </div>
                <div>
                  <h4 className="text-gray-200 font-bold font-mono uppercase tracking-widest text-sm mb-1">Encrypted Email</h4>
                  <p className="text-gray-500 font-mono text-sm">support@aethervault.io</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-purple-glow/10 border border-purple-glow/30 flex items-center justify-center text-xl text-purple-glow">
                  <FiMessageSquare />
                </div>
                <div>
                  <h4 className="text-gray-200 font-bold font-mono uppercase tracking-widest text-sm mb-1">Live Comms</h4>
                  <p className="text-gray-500 font-mono text-sm">Active 24/7 for Enterprise Agents</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-8 flex gap-6">
               <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-glow hover:border-cyan-glow transition-all">
                 <FiGithub />
               </a>
               <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-purple-glow hover:border-purple-glow transition-all">
                 <FiTwitter />
               </a>
            </div>
          </div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-lg glow-border-cyan p-8 md:p-12 rounded-[2rem] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-glow to-purple-glow" />
            
            <form className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest ml-1">Alias</label>
                  <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-cyan-glow outline-none transition-all placeholder-gray-700" placeholder="Agent Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest ml-1">Comm-Link</label>
                  <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-cyan-glow outline-none transition-all placeholder-gray-700" placeholder="email@secure.net" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest ml-1">Transmission Subject</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-gray-400 focus:border-cyan-glow outline-none transition-all appearance-none">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Enterprise Licensing</option>
                  <option>Security Vulnerability</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest ml-1">Payload Details</label>
                <textarea rows="5" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-cyan-glow outline-none transition-all placeholder-gray-700 resize-none" placeholder="Enter your message..."></textarea>
              </div>

              <button type="button" className="w-full bg-cyan-glow text-black font-black font-mono uppercase tracking-[0.2em] py-5 rounded-xl hover:bg-white transition-all shadow-[0_0_30px_rgba(0,212,255,0.3)] flex items-center justify-center gap-3 active:scale-95">
                Transmit Message <FiSend />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default ContactPage;
