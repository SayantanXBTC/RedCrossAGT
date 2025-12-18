import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Relief from './pages/Relief';
import Medical from './pages/Medical';
import Outreach from './pages/Outreach';
import Volunteers from './pages/Volunteers';
import Unity from './pages/Unity';
import Training from './pages/Training';
import Join from './pages/Join';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import Blog from './pages/Blog';
import ThankYou from './pages/ThankYou';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Registrations from './pages/Registrations';
import ProtectedRoute from './components/common/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/relief" element={<Relief />} />
      <Route path="/medical" element={<Medical />} />
      <Route path="/outreach" element={<Outreach />} />
      <Route path="/volunteers" element={<Volunteers />} />
      <Route path="/unity" element={<Unity />} />
      <Route path="/training" element={<Training />} />
      <Route path="/join" element={<Join />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blog/:slug" element={<Blog />} />
      
      {/* Admin Login (Public) */}
      <Route path="/admin/login" element={<AdminLogin />} />
      
      {/* Protected Admin Routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/registrations" 
        element={
          <ProtectedRoute>
            <Registrations />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/registrations" 
        element={
          <ProtectedRoute>
            <Registrations />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default AppRoutes;
