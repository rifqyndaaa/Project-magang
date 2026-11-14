import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import DocumentTitle from './components/DocumentTitle';

// Guest Pages
import Home               from './pages/guest/Home';
import Categories         from './pages/guest/Categories';
import Report             from './pages/guest/Report';
import Success            from './pages/guest/Success';
import Track              from './pages/guest/Track';
import Services           from './pages/guest/Services';
import Information        from './pages/guest/Information';
import Contact            from './pages/guest/Contact';
import Organization       from './pages/guest/Organization';
import OrganizationDetail from './pages/guest/Organization/Detail';
import RegionsPage        from './pages/guest/Regions';
import RegionStructure    from './pages/guest/Regions/RegionStructure';
import Activities         from './pages/guest/Activities';
import ProgramKerja       from './pages/guest/Activities/ProgramKerja';
import Agenda             from './pages/guest/Activities/Agenda';
import GaleriFoto         from './pages/guest/Activities/Galeri';
import Merchandise        from './pages/guest/Merchandise';
import PernakPernik       from './pages/guest/Merchandise/PernakPernik';
import Cenderamata        from './pages/guest/Merchandise/Cenderamata';
import Products           from './pages/guest/Products';
import ProductDetail      from './pages/guest/Products/Detail';
import NotFound           from './pages/guest/NotFound';

// Admin Pages
import AdminLogin     from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminDetail    from './pages/admin/Detail';

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <DocumentTitle />
      <Routes>
        {/* Rute Publik */}
        <Route element={<PublicLayout />}>
          <Route path="/"              element={<Home />} />
          <Route path="/layanan"       element={<Services />} />
          <Route path="/informasi"     element={<Information />} />
          <Route path="/kontak"        element={<Contact />} />
          <Route path="/categories"    element={<Categories />} />
          <Route path="/report"        element={<Report />} />
          <Route path="/success"       element={<Success />} />
          <Route path="/track"         element={<Track />} />
          <Route path="/produk"        element={<Products />} />
          <Route path="/produk/:id"    element={<ProductDetail />} />
          <Route path="/struktur"      element={<Organization />} />
          <Route path="/struktur/:id"  element={<OrganizationDetail />} />
          <Route path="/wilayah"       element={<RegionsPage />} />
          <Route path="/wilayah/:id"   element={<RegionStructure />} />
          <Route path="/kegiatan"               element={<Activities />} />
          <Route path="/kegiatan/program-kerja" element={<ProgramKerja />} />
          <Route path="/kegiatan/agenda"        element={<Agenda />} />
          <Route path="/kegiatan/galeri"        element={<GaleriFoto />} />
          <Route path="/merchandise"                 element={<Merchandise />} />
          <Route path="/merchandise/pernak-pernik"   element={<PernakPernik />} />
          <Route path="/merchandise/cenderamata"     element={<Cenderamata />} />
          <Route path="*"              element={<NotFound />} />
        </Route>

        {/* Rute Login Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Rute Admin Panel Berproteksi */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index             element={<AdminDashboard />} />
          <Route path="report/:id" element={<AdminDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
