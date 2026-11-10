import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/Home';
import Categories from './pages/Categories';
import Report from './pages/Report';
import Success from './pages/Success';
import Track from './pages/Track';
import Services from './pages/Services';
import Information from './pages/Information';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Products from './pages/Products';
import ProductDetail from './pages/Products/Detail';

// Admin Pages
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminDetail from './pages/Admin/Detail';

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publik Terpadu */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/layanan" element={<Services />} />
          <Route path="/informasi" element={<Information />} />
          <Route path="/kontak" element={<Contact />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/report" element={<Report />} />
          <Route path="/success" element={<Success />} />
          <Route path="/track" element={<Track />} />
          <Route path="/produk" element={<Products />} />
          <Route path="/produk/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Rute Login Admin Prototype */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Rute Admin Panel Berproteksi */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="report/:id" element={<AdminDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
