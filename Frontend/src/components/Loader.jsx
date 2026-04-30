import { motion } from 'framer-motion';

const Loader = ({ isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-obsidian-900/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div className="flex flex-col items-center gap-4">
        {/* Animated Logo */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-glow to-purple-glow flex items-center justify-center"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-obsidian-900 font-bold text-2xl"
          >
            AV
          </motion.span>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-cyan-glow font-mono text-sm tracking-widest">
            Initializing AetherVault
          </p>
          <motion.div
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-0.5 mt-3 bg-gradient-to-r from-cyan-glow to-purple-glow rounded-full"
          />
        </motion.div>

        {/* Orbiting Particles */}
        <div className="relative w-20 h-20 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
              className="absolute inset-0"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-glow rounded-full" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
