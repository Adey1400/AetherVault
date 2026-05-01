import { motion } from 'framer-motion';
import { FiArrowRight, FiLock, FiDatabase, FiUnlock, FiShield } from 'react-icons/fi';
import LandingLayout from '../components/LandingLayout';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('aether_jwt') || sessionStorage.getItem('aether_jwt');
    setIsLoggedIn(!!token);
  }, []);

  // Text reveal animation for hero
  const textRevealVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.8,
      },
    }),
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: '100%',
      transition: {
        delay: 0.2,
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  // Card reveal animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + i * 0.2,
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      },
    }),
  };

  const howItWorksData = [
    {
      icon: FiLock,
      step: '01',
      title: 'Client-Side Encryption',
      description:
        'Your data is encrypted on your device before transmission. Only you hold the encryption keys, ensuring complete privacy and security.',
      color: 'cyan',
    },
    {
      icon: FiDatabase,
      step: '02',
      title: 'Blind Storage',
      description:
        'We store your encrypted data without any ability to access it. Our servers never see your decryption keys or plaintext data.',
      color: 'purple',
    },
    {
      icon: FiUnlock,
      step: '03',
      title: 'Secure Retrieval',
      description:
        'Access your data anytime with full control. Only you can decrypt and retrieve your information with your private keys.',
      color: 'cyan',
    },
  ];

  // CTA Button glow animation
  const ctaButtonVariants = {
    rest: {
      boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
    },
    hover: {
      boxShadow: [
        '0 0 20px rgba(0, 212, 255, 0.3)',
        '0 0 40px rgba(0, 212, 255, 0.6)',
        '0 0 60px rgba(0, 212, 255, 0.8)',
      ],
      transition: {
        duration: 0.6,
        repeat: Infinity,
      },
    },
  };

  return (
    <LandingLayout>
      {/* ========== HERO SECTION ========== */}
      <section
        id="home"
        className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 relative pt-20"
      >
        <div className="max-w-7xl mx-auto text-center space-y-8 z-10 mb-16">
          {/* Animated Line Above Text */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-glow to-transparent"
          />

          {/* Hero Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-cyan-glow font-mono text-sm md:text-base tracking-widest uppercase"
          >
            Zero-Knowledge Security
          </motion.p>

          {/* Main Hero Text (Single Line) */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-mono tracking-tight"
            >
              <span className="inline-block bg-gradient-to-r from-cyan-glow via-purple-glow to-cyan-glow bg-clip-text text-transparent ">
                Your Data. Your Key. Zero Knowledge.
              </span>
            </motion.h1>
          </div>
        </div>

        {/* ========== VISUAL SHOWCASE (Now between Heading and Subtitle) ========== */}
        <div className="max-w-7xl mx-auto w-full relative h-[00px] md:h-[700px] flex items-center justify-center perspective-[2500px] z-20 mb-30 px-4">
          {/* Main Image Base (image.png) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative z-10 w-full max-w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] bg-[#050505]"
          >
            <img 
              src="/image.png" 
              alt="AetherVault Interface" 
              className="w-full h-auto rounded-[2.8rem]"
            />
          </motion.div>

          {/* Cuboid Dashboard (demo.png) */}
          <motion.div
            initial={{ opacity: 0, x: 100, y: 100, rotateY: -30 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotateY: -25, rotateX: 5 }}
            whileHover={{ rotateY: -15, rotateX: 2, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute -right-4 md:-right-12 -bottom-10 md:-bottom-20 z-30 w-[45%] md:w-[40%] max-w-[450px] aspect-video rounded-[2rem] overflow-hidden border border-cyan-400/50 shadow-[0_40px_80px_rgba(34,211,238,0.2)] bg-black"
          >
            <div className="w-full h-full p-1">
              <img 
                src="/demo.png" 
                alt="Dashboard Cuboid" 
                className="w-full h-full object-cover rounded-[1.8rem]"
              />
            </div>
            {/* 3D Edge highlights */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-cyan-400/30 to-transparent" />
          </motion.div>

          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-cyan-glow/5 rounded-full blur-[150px] pointer-events-none" />
        </div>

        {/* ========== SUBTITLE & CTA SECTION (Now below Picture) ========== */}
        <div className="max-w-5xl mx-auto text-center space-y-8 z-10 pb-20">
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-300 font-mono text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Enterprise-grade encryption vault. Your data stays yours. Military-grade security
            with absolute privacy.
          </motion.p>

          {/* CTA Button with Neon Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="pt-4"
          >
            <motion.button
              variants={ctaButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(isLoggedIn ? '/dashboard' : '/auth')}
              className="btn-cyber btn-cyber-primary px-8 md:px-12 py-4 text-lg font-semibold flex items-center justify-center gap-3 mx-auto"
            >
              {isLoggedIn ? 'Access Your Vault' : 'Get Started Free'}
              <FiArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="pt-8 flex flex-wrap justify-center gap-6 text-xs md:text-sm text-gray-400 font-mono"
          >
            {['No Ads', 'Open Source', '256-bit AES'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-glow rounded-full" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== HOW IT WORKS SECTION ========== */}
      <section
        id="how-it-works"
        className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20 relative"
      >
        <div className="max-w-6xl w-full z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-cyan-glow font-mono text-sm tracking-widest uppercase mb-4"
            >
              How It Works
            </motion.p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono mb-6">
              <span className="bg-gradient-to-r from-cyan-glow to-purple-glow bg-clip-text text-transparent">
                Three-Step Security
              </span>
            </h2>
          </motion.div>

          {/* Vertical Scrolling Cards */}
          <div className="space-y-8 md:space-y-16">
            {howItWorksData.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="relative group"
              >
                <div className={`glass glow-border-${item.color} rounded-2xl p-8 md:p-12 overflow-hidden`}>
                  {/* Animated background line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-glow to-transparent origin-left"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Step Number and Icon */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="md:col-span-3 flex items-center gap-4"
                    >
                      <div className="text-5xl md:text-6xl font-mono font-bold text-transparent bg-gradient-to-r from-cyan-glow to-purple-glow bg-clip-text">
                        {item.step}
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className={`w-16 h-16 rounded-xl bg-${item.color}-glow/10 flex items-center justify-center border border-${item.color}-glow`}
                      >
                        <item.icon className={`w-8 h-8 text-${item.color}-glow`} />
                      </motion.div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="md:col-span-9"
                    >
                      <h3 className="text-2xl md:text-3xl font-mono font-bold text-gray-100 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed font-light text-base md:text-lg">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Connecting Line (except last item) */}
                {index < howItWorksData.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ delay: 0.8 + index * 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="h-16 w-0.5 bg-gradient-to-b from-cyan-glow to-purple-glow mx-auto my-4 origin-top opacity-50"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA SECTION (Duplicate check) ========== */}
      <section className="py-32 px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-lg glow-border-cyan rounded-[3rem] p-12 md:p-24 max-w-5xl mx-auto text-center z-10 relative bg-black/60 backdrop-blur-3xl overflow-hidden"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6">Ready to Secure Your Data?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of individuals and enterprises trusting AetherVault with their most sensitive information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate(isLoggedIn ? '/dashboard' : '/auth')}
              className="btn-cyber btn-cyber-primary px-8 py-3 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              {isLoggedIn ? 'Launch Vault' : 'Start Free Trial'}
              <FiArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-lg relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="text-center text-gray-400 text-sm font-mono">
            <p>© 2026 AetherVault. All rights reserved. | Zero-Knowledge. Zero Compromise.</p>
          </div>
        </div>
      </footer>
    </LandingLayout>
  );
};

export default LandingPage;
