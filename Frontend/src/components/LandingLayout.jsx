import { motion } from 'framer-motion';
import TopNavbar from './TopNavbar';
import MatrixBackground from './MatrixBackground';

const LandingLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-obsidian-900 relative overflow-hidden">
      {/* Matrix Background */}
      <MatrixBackground />

      {/* Top Navbar */}
      <TopNavbar />

      {/* Content */}
      <main className="relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default LandingLayout;
