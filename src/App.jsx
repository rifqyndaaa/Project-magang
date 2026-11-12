import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/guest/Home';
import Categories from './pages/guest/Categories';
import Report from './pages/guest/Report';
import Success from './pages/guest/Success';
import Track from './pages/guest/Track';
import Services from './pages/guest/Services';
import Information from './pages/guest/Information';
import Contact from './pages/guest/Contact';
import Organization from './pages/guest/Organization';
import NotFound from './pages/guest/NotFound';
import Products from './pages/guest/Products';
import ProductDetail from './pages/guest/Products/Detail';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminDetail from './pages/admin/Detail';

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
          <Route path="/struktur" element={<Organization />} />
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
