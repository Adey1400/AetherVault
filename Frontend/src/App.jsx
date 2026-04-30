import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Loader from './components/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');

  // Simulate page transition with loading
  const handlePageTransition = (page) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 800);
  };

  return (
    <>
      <Loader isVisible={isLoading} />
      <AnimatePresence mode="wait">
        {currentPage === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <LandingPage onPageChange={handlePageTransition} />
          </motion.div>
        )}
        {currentPage === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AuthPage onPageChange={handlePageTransition} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
