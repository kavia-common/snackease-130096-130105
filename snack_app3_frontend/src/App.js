import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import './index.css';
import './assets/index.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import SnackDetailPage from './pages/SnackDetailPage';
import CartPage from './pages/CartPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

// Simple top bar for web context
function TopBar() {
  const location = useLocation();
  const titleMap = {
    '/': 'Home',
    '/cart': 'Order details',
    '/orders': 'Order History',
    '/auth': 'Sign in / Sign up'
  };
  const title = titleMap[location.pathname] || 'SnackEase';
  return (
    <div className="topbar">
      <Link to="/" aria-label="Home" className="icon-button grid-button" style={{ background: 'var(--color-f5f5f5)', borderRadius: 'var(--radius-15)', width: 40, height: 40, position: 'relative' }}>
        <span className="dot"></span><span className="dot"></span><span className="dot"></span><span className="dot"></span>
      </Link>
      <div className="title">{title}</div>
      <Link to="/orders" aria-label="Orders" className="icon-button profile" />
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  return children;
}

// PUBLIC_INTERFACE
function App() {
  /** Root app with Providers and Routes */
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="app-shell">
            <TopBar />
            <main className="app-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/snack/:id" element={<SnackDetailPage />} />
                <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
