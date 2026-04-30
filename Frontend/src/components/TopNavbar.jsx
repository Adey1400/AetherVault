import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const TopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Contact', href: '#contact' },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 glass glow-border-cyan backdrop-blur-lg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-glow to-purple-glow flex items-center justify-center">
            <span className="text-obsidian-900 font-bold text-sm">AV</span>
          </div>
          <span className="font-mono font-bold text-cyan-glow hidden sm:inline">
            AetherVault
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex items-center gap-8"
        >
          {menuItems.map((item, index) => (
            <motion.a
              key={index}
              variants={itemVariants}
              href={item.href}
              className="text-gray-300 hover:text-cyan-glow transition-colors duration-300 font-mono text-sm font-medium relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-glow to-transparent group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg glass glow-border-cyan"
        >
          {isOpen ? (
            <FiX className="w-6 h-6 text-cyan-glow" />
          ) : (
            <FiMenu className="w-6 h-6 text-cyan-glow" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-white/10 bg-black/50 backdrop-blur-lg"
        >
          <div className="px-4 py-4 space-y-3">
            {menuItems.map((item, index) => (
              <motion.a
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-300 hover:text-cyan-glow transition-colors duration-300 font-mono text-sm py-2"
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default TopNavbar;
