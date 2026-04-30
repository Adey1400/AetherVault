import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';
import SetupVaultPage from './pages/SetupVaultPage';
import DashboardPage from './pages/DashboardPage';
import { DashboardLayout } from './components';

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
            <DashboardLayout>
              <PageWrapper>
                <DashboardPage />
              </PageWrapper>
            </DashboardLayout>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
