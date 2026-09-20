import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { IntroProvider } from './context/IntroContext';
import { ToastProvider } from './components/ui/Toast';

// Layout & Global Visuals
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import ScrollProgress from './components/atmosphere/ScrollProgress';
import GrainOverlay from './components/atmosphere/GrainOverlay';
import TrailLine from './components/atmosphere/TrailLine';
import PageTransition from './components/atmosphere/PageTransition';

// Pages
import Home from './pages/public/Home';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import DestinationsExplorer from './pages/public/DestinationsExplorer';
import GeneratorPage from './pages/user/GeneratorPage';
import ItineraryResult from './pages/user/ItineraryResult';
import UserDashboard from './pages/user/UserDashboard';
import MyItineraries from './pages/user/MyItineraries';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/public/NotFound';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
        <Route path="/destinations" element={<PageTransition><DestinationsExplorer /></PageTransition>} />
        <Route path="/generator" element={<PageTransition><GeneratorPage /></PageTransition>} />
        <Route path="/itinerary-result" element={<PageTransition><ItineraryResult /></PageTransition>} />

        {/* Protected Traveler Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PageTransition><UserDashboard /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-itineraries"
          element={
            <ProtectedRoute>
              <PageTransition><MyItineraries /></PageTransition>
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <PageTransition><AdminDashboard /></PageTransition>
            </ProtectedRoute>
          }
        />

        {/* Custom 404 Route */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <IntroProvider>
        <ToastProvider>
          <BrowserRouter>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
              <ScrollProgress />
              <GrainOverlay />
              <TrailLine />
              <Navbar />
              <main style={{ flex: 1 }}>
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </ToastProvider>
      </IntroProvider>
    </AuthProvider>
  );
}
