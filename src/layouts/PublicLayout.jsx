import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PublicLayout() {
  return (
    <div className="public-shell">
      <a href="#main-content" className="gov-skip-link">
        Langsung ke konten utama
      </a>

      <Header />

      <main id="main-content" className="public-shell__main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
