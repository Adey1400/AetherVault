import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';
import SetupVaultPage from './pages/SetupVaultPage';
import DashboardPage from './pages/DashboardPage';
import { DashboardLayout } from './components';

// Imported New Pages
import SecureChannelPage from './pages/SecurePanelPage'; // Note: check your filename here!
import SecurityIntelPage from './pages/SecurityIntelPage';
import SystemQueriesPage from './pages/SystemQueriesPage';
import ProtocolPage from './pages/ProtocolPage';
import FeaturesPage from './pages/FeaturesPage';
import ContactPage from './pages/ContactPage';

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

// Basic Protected Route Check (Redirects to login if no token exists)
// If you already have this imported from elsewhere, you can delete this block!
const ProtectedRoute = ({ children }) => {
const token = localStorage.getItem('aether_jwt') || sessionStorage.getItem('aether_jwt'); 
  if (!token) return <Navigate to="/auth" />;
  return children;
};

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* ALL Routes must be inside this block */}
      <Routes location={location} key={location.pathname}>
        
        {/* Public Routes */}
        <Route 
          path="/" 
          element={<PageWrapper><LandingPage /></PageWrapper>} 
        />
        <Route 
          path="/auth" 
          element={<AuthWrapper><AuthPage /></AuthWrapper>} 
        />
        <Route 
          path="/features" 
          element={<PageWrapper><FeaturesPage /></PageWrapper>} 
        />
        <Route 
          path="/public-contact" 
          element={<PageWrapper><ContactPage /></PageWrapper>} 
        />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        
        {/* Vault Setup */}
        <Route path="/setup-vault" element={<SetupVaultPage />} />
        
        {/* Secure Dashboard Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <PageWrapper>
                  <DashboardPage />
                </PageWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/protocol" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <PageWrapper>
                  <ProtocolPage />
                </PageWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/queries" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <PageWrapper>
                  <SystemQueriesPage />
                </PageWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/intel" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <PageWrapper>
                  <SecurityIntelPage />
                </PageWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/contact" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <PageWrapper>
                  <SecureChannelPage />
                </PageWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />

      </Routes>
    </AnimatePresence>
  );
}

export default App;