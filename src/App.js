import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar        from './components/NavBar/NavBar';
import Hero          from './components/Hero/Hero';
import Nosotros      from './components/Nosotros/Nosotros';
import Servicios     from './components/Servicios/Servicios';
import Proyectos     from './components/Proyectos/Proyectos';
import Testimonios   from './components/Testimonios/Testimonios';
import Contacto      from './components/Contacto/Contacto';
import Footer        from './components/Footer/Footer';

import AdminPage       from './pages/Admin/AdminPage';
import ProyectoDetalle from './pages/ProyectoDetalle/ProyectoDetalle';

/* ── Home page ── */
function Home() {
  useEffect(() => {
    // Si venimos de otra página con destino guardado, hacer scroll
    const target = sessionStorage.getItem('scrollTo');
    if (target) {
      sessionStorage.removeItem('scrollTo');
      // Pequeño delay para que el DOM esté listo
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Hero />
      <Nosotros />
      <Servicios />
      <Proyectos />
      <Testimonios />
      <Contacto />
      <Footer />
    </div>
  );
}

/* ── Router simple ── */
function App() {
  const path = window.location.pathname;

  if (path.startsWith('/admin')) {
    return <AdminPage />;
  }

  if (path.startsWith('/proyecto')) {
    const slug = path.replace(/^\/proyecto\/?/, '') || null;
    return <ProyectoDetalle slug={slug} />;
  }

  return <Home />;
}

export default App;
