import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiCpu, FiGlobe, FiLock, FiTerminal, FiZap, FiEyeOff, FiServer } from 'react-icons/fi';
import TopNavbar from '../components/TopNavbar';
import LandingLayout from '../components/LandingLayout';

const FeaturesPage = () => {
  const features = [
    {
      icon: <FiShield />,
      title: "Zero-Knowledge Architecture",
      desc: "Your data is encrypted locally using your Master Key before it ever leaves your browser. We have zero access to your plaintext information.",
      color: "cyan"
    },
    {
      icon: <FiCpu />,
      title: "AES-256-GCM Encryption",
      desc: "Utilizing the gold standard of encryption. Every secret is protected by a 256-bit key with an additional integrity check via Galois/Counter Mode.",
      color: "purple"
    },
    {
      icon: <FiZap />,
      title: "Hardware Acceleration",
      desc: "Optimized performance using the WebCrypto API, leveraging your device's hardware for near-instant cryptographic operations.",
      color: "cyan"
    },
    {
      icon: <FiGlobe />,
      title: "Global Synchronization",
      desc: "Seamlessly sync your encrypted blobs across all your devices. Your data is available wherever you are, without compromising security.",
      color: "purple"
    },
    {
      icon: <FiEyeOff />,
      title: "No Metadata Tracking",
      desc: "We don't just protect your passwords; we protect your privacy. AetherVault does not track usage patterns, locations, or identity data.",
      color: "cyan"
    },
    {
      icon: <FiServer />,
      title: "Isolated Storage",
      desc: "Our servers act as a blind relay. Even if our infrastructure is breached, the data stored is mathematically useless to an attacker.",
      color: "purple"
    }
  ];

  return (
    <LandingLayout>
      <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-cyan-glow font-mono text-sm tracking-[0.3em] uppercase mb-4"
          >
            Capabilities
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold font-mono tracking-tighter mb-6 bg-gradient-to-r from-white via-cyan-glow to-purple-glow bg-clip-text text-transparent"
          >
            System Features
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg font-mono leading-relaxed"
          >
            Explore the advanced cryptographic technologies and architecture that make AetherVault the most secure place for your digital life.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-lg glow-border-${f.color} p-8 rounded-3xl hover:scale-[1.02] transition-all duration-300 group`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-${f.color}-glow/10 border border-${f.color}-glow/30 flex items-center justify-center text-2xl text-${f.color}-glow mb-6 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-4 font-mono tracking-tight">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Technical Stack Banner */}
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          className="mt-32 p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-glow to-transparent" />
          <h2 className="text-2xl font-bold text-gray-200 mb-8 uppercase tracking-widest font-mono">Infrastructure Stack</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             {['React 18', 'Spring Boot 3.2', 'PostgreSQL', 'AES-GCM', 'OIDC', 'TLS 1.3'].map((stack) => (
               <span key={stack} className="text-sm font-mono tracking-[0.2em]">{stack}</span>
             ))}
          </div>
        </motion.div>
      </div>
    </LandingLayout>
  );
};

export default FeaturesPage;
