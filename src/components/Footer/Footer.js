import React from 'react';
import Logo from '../Logo/Logo';
import './Footer.css';

export default function Footer() {
  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">

      {/* ── Bloque principal ── */}
      <div className="footer__main">

        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo-wrap">
            <Logo variant="horizontal" theme="dark" height={34} />
          </div>
          <p className="footer__brand-desc">
            Empresa familiar de ingeniería y construcción. Construimos, remodelamos y calculamos la estructura de la casa de tus sueños.
          </p>
        </div>

        {/* Navegación */}
        <div className="footer__col">
          <div className="footer__col-title">Navegación</div>
          <div className="footer__links">
            <a href="#nosotros"    className="footer__link" onClick={(e) => scrollTo(e, '#nosotros')}>Nosotros</a>
            <a href="#servicios"   className="footer__link" onClick={(e) => scrollTo(e, '#servicios')}>Servicios</a>
            <a href="#proyectos"   className="footer__link" onClick={(e) => scrollTo(e, '#proyectos')}>Proyectos</a>
            <a href="#contacto"    className="footer__link" onClick={(e) => scrollTo(e, '#contacto')}>Contacto</a>
          </div>
        </div>

        {/* Contacto */}
        <div className="footer__col">
          <div className="footer__col-title">Contacto</div>
          <div className="footer__contact">
            <span>+1 (000) 000-0000</span>
            <span>contacto@guzmaningenieria.com</span>
            <span>Lun – Sáb · 8:00 – 18:00</span>
          </div>
        </div>

      </div>

      {/* ── Barra inferior ── */}
      <div className="footer__bar">
        <div className="footer__bar-inner">

          <div className="footer__bar-left">
            <span className="footer__copy">
              © 2026 Guzman Ingeniería y Construcción. Todos los derechos reservados.
            </span>
            <a href="/admin" className="footer__admin">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Acceso administrador
            </a>
          </div>

          <div className="footer__socials">
            <span className="footer__social">IG</span>
            <span className="footer__social">FB</span>
            <span className="footer__social">in</span>
          </div>

        </div>
      </div>

    </footer>
  );
}
