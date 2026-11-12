import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Guest Layout
import PublicLayout from './guest/layouts/PublicLayout';

// Admin Layout
import AdminLayout from './admin/layouts/AdminLayout';

// Guest Pages
import Home         from './guest/pages/Home';
import Categories   from './guest/pages/Categories';
import Report       from './guest/pages/Report';
import Success      from './guest/pages/Success';
import Track        from './guest/pages/Track';
import Services     from './guest/pages/Services';
import Information  from './guest/pages/Information';
import Contact      from './guest/pages/Contact';
import Organization from './guest/pages/Organization';
import NotFound     from './guest/pages/NotFound';
import Products     from './guest/pages/Products';
import ProductDetail from './guest/pages/Products/Detail';

// Admin Pages
import AdminLogin     from './admin/pages/Login';
import AdminDashboard from './admin/pages/Dashboard';
import AdminDetail    from './admin/pages/Detail';

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publik */}
        <Route element={<PublicLayout />}>
          <Route path="/"          element={<Home />} />
          <Route path="/layanan"   element={<Services />} />
          <Route path="/informasi" element={<Information />} />
          <Route path="/kontak"    element={<Contact />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/report"    element={<Report />} />
          <Route path="/success"   element={<Success />} />
          <Route path="/track"     element={<Track />} />
          <Route path="/produk"    element={<Products />} />
          <Route path="/produk/:id" element={<ProductDetail />} />
          <Route path="/struktur"  element={<Organization />} />
          <Route path="*"          element={<NotFound />} />
        </Route>

        {/* Rute Login Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Rute Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index                element={<AdminDashboard />} />
          <Route path="report/:id"    element={<AdminDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
