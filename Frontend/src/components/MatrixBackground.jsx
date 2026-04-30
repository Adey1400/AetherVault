import { motion } from 'framer-motion';

const MatrixBackground = () => {
  const generateParticles = () => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 2,
      });
    }
    return particles;
  };

  const particles = generateParticles();

  const particleVariants = {
    animate: (custom) => ({
      y: [0, -30, 0],
      opacity: [0, 0.4, 0],
      transition: {
        duration: custom.duration,
        repeat: Infinity,
        delay: custom.delay,
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          custom={particle}
          variants={particleVariants}
          animate="animate"
          className="absolute w-1 h-1 bg-cyan-glow rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            boxShadow: '0 0 10px rgba(0, 212, 255, 0.6)',
          }}
        />
      ))}

      {/* Gradient Orbs */}
      <motion.div
        animate={{ x: [-100, 100, -100], y: [-100, 100, -100] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-20 left-10 w-96 h-96 bg-cyan-glow opacity-5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [100, -100, 100], y: [100, -100, 100] }}
        transition={{ duration: 25, repeat: Infinity, delay: 2 }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-glow opacity-5 rounded-full blur-3xl"
      />
    </div>
  );
};

export default MatrixBackground;
