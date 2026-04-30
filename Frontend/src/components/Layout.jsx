import { motion } from 'framer-motion';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const pageTransitionVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-obsidian-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="md:ml-80 pt-20 md:pt-8">
        <motion.div
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen"
        >
          {/* Content Wrapper with Premium Spacing */}
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            {children}
          </div>
        </motion.div>
      </main>

      {/* Animated Accent Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating particles effect */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-glow opacity-5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-glow opacity-5 rounded-full blur-3xl animate-float" />
      </div>
    </div>
  );
};

export default Layout;
