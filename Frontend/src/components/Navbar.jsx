import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiShield, FiSettings, FiLogOut, FiChevronRight } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { id: 1, label: 'Dashboard', icon: MdDashboard, href: '/' },
    { id: 2, label: 'Vault', icon: FiShield, href: '/vault' },
    { id: 3, label: 'Security', icon: FiHome, href: '/security' },
    { id: 4, label: 'Settings', icon: FiSettings, href: '/settings' },
  ];

  const sidebarVariants = {
    hidden: {
      x: -300,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      x: -300,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const menuItemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: (index) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    }),
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 10 },
  };

  const chevronVariants = {
    rest: { x: 0, opacity: 0 },
    hover: { x: 4, opacity: 1 },
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-lg glass glow-border-cyan hover:shadow-glow-cyan"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <FiX className="w-6 h-6 text-cyan-glow" />
          ) : (
            <FiMenu className="w-6 h-6 text-cyan-glow" />
          )}
        </motion.button>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-0 top-0 h-screen w-64 glass-lg glow-border-cyan z-40 md:hidden overflow-y-auto"
          >
            <div className="p-6 pt-20 space-y-8">
              {/* Branding */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-glow to-purple-glow flex items-center justify-center">
                    <FiShield className="w-6 h-6 text-obsidian-900 font-bold" />
                  </div>
                  <div>
                    <h1 className="text-lg font-mono font-bold text-cyan-glow">AetherVault</h1>
                    <p className="text-xs text-gray-400">Security Suite</p>
                  </div>
                </div>
              </motion.div>

              {/* Menu Items */}
              <div className="space-y-3">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-between px-4 py-3 rounded-lg glass hover:glow-border-cyan transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        variants={iconVariants}
                        initial="rest"
                        animate={hoveredItem === item.id ? 'hover' : 'rest'}
                      >
                        <item.icon className="w-5 h-5 text-cyan-glow" />
                      </motion.div>
                      <span className="font-mono text-sm font-medium text-gray-200">
                        {item.label}
                      </span>
                    </div>
                    <motion.div
                      variants={chevronVariants}
                      initial="rest"
                      animate={hoveredItem === item.id ? 'hover' : 'rest'}
                    >
                      <FiChevronRight className="w-4 h-4 text-cyan-glow" />
                    </motion.div>
                  </motion.a>
                ))}
              </div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="h-px bg-gradient-to-r from-transparent via-cyan-glow/30 to-transparent"
              />

              {/* Logout Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => setIsOpen(false)}
                className="w-full btn-cyber btn-cyber-secondary"
              >
                <FiLogOut className="w-4 h-4 inline mr-2" />
                Logout
              </motion.button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar - Always Visible */}
      <motion.nav
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.1 }}
        className="hidden md:flex fixed left-0 top-0 h-screen w-80 glass-lg glow-border-cyan z-40 overflow-y-auto flex-col"
      >
        <div className="p-8 space-y-8 flex flex-col h-full">
          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-glow to-purple-glow flex items-center justify-center"
              >
                <FiShield className="w-7 h-7 text-obsidian-900 font-bold" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-mono font-bold bg-gradient-to-r from-cyan-glow to-purple-glow bg-clip-text text-transparent">
                  AetherVault
                </h1>
                <p className="text-xs text-gray-400 font-mono tracking-widest">SECURITY VAULT</p>
              </div>
            </div>
          </motion.div>

          {/* Menu Items */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                className="group relative flex items-center justify-between px-4 py-3 rounded-lg glass hover:glow-border-cyan transition-all duration-300"
              >
                {/* Animated background for hover */}
                {hoveredItem === item.id && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 bg-cyan-glow/5 rounded-lg"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="relative flex items-center gap-4 z-10">
                  <motion.div
                    variants={iconVariants}
                    initial="rest"
                    animate={hoveredItem === item.id ? 'hover' : 'rest'}
                  >
                    <item.icon className="w-5 h-5 text-cyan-glow" />
                  </motion.div>
                  <span className="font-mono text-sm font-medium text-gray-200">
                    {item.label}
                  </span>
                </div>

                <motion.div
                  variants={chevronVariants}
                  initial="rest"
                  animate={hoveredItem === item.id ? 'hover' : 'rest'}
                  className="z-10"
                >
                  <FiChevronRight className="w-4 h-4 text-cyan-glow" />
                </motion.div>
              </motion.a>
            ))}
          </nav>

          {/* Footer Section */}
          <div className="space-y-4">
            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-px bg-gradient-to-r from-transparent via-cyan-glow/30 to-transparent"
            />

            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg glass"
            >
              <div className="status-online" />
              <div>
                <p className="text-xs font-mono font-semibold text-gray-300">System Status</p>
                <p className="text-xs text-cyan-glow">All Systems Operational</p>
              </div>
            </motion.div>

            {/* Logout Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-full btn-cyber btn-cyber-secondary flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
