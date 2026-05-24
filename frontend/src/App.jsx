import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Docs from './pages/Docs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RemoveBG from './pages/RemoveBG';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Help from './pages/Help';
import RefundPolicy from './pages/RefundPolicy';
import PlatformStatus from './pages/PlatformStatus';
import GeneralTerms from './pages/GeneralTerms';
import ScrollToTop from './components/ScrollToTop';

import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
          {/* Subtle background noise and gradients can be added here if desired */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full mix-blend-multiply opacity-70"></div>
            <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full mix-blend-multiply opacity-70"></div>
          </div>
          
          <Navbar />
          <main className="flex-grow z-10 flex flex-col pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<Help />} />
              <Route path="/refund" element={<RefundPolicy />} />
              <Route path="/status" element={<PlatformStatus />} />
              <Route path="/general-terms" element={<GeneralTerms />} />
              <Route path="/remove-bg" element={<RemoveBG />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
