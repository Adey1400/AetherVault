import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';
import SetupVaultPage from './pages/SetupVaultPage';

// Wrapper for page transitions
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
);

const AuthWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageWrapper>
              <LandingPage />
            </PageWrapper>
          } 
        />
        <Route 
          path="/auth" 
          element={
            <AuthWrapper>
              <AuthPage />
            </AuthWrapper>
          } 
        />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="/setup-vault" element={<SetupVaultPage />} />
        <Route 
          path="/dashboard" 
          element={
            <PageWrapper>
              <div className="min-h-screen bg-[#050505] text-cyan-400 font-mono flex items-center justify-center text-2xl uppercase tracking-widest drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                Secure Dashboard
              </div>
            </PageWrapper>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
