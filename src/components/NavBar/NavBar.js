import React, { useState } from 'react';
import Logo from '../Logo/Logo';
import './NavBar.css';

const NAV_LINKS = [
  { label: 'Nosotros',    href: '#nosotros' },
  { label: 'Servicios',   href: '#servicios' },
  { label: 'Proyectos',   href: '#proyectos' },
  { label: 'Testimonios', href: '#testimonios' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const handleLink = (e, href) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar-inner">

        {/* Logo con scale(0.84) exacto del diseño.
            El logo base mide hint-size="220px,52px".
            Con scale(0.84): visual = 185px × 44px.
            El DOM sigue reservando 220px, compensamos con
            margin-right negativo = -(220 - 185) = -35px */}
        <a href="#inicio" className="navbar-logo"
          onClick={(e) => handleLink(e, '#inicio')}>
          <div className="navbar-logo__scale">
            <Logo variant="horizontal" theme="light" />
          </div>
        </a>

        {/* Desktop nav */}
        <div className="navbar-nav">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="navbar-link"
              onClick={(e) => handleLink(e, l.href)}>
              {l.label}
            </a>
          ))}
          <a href="#contacto" className="navbar-cta"
            onClick={(e) => handleLink(e, '#contacto')}>
            Cotizar <span className="navbar-cta__sq" />
          </a>
        </div>

        {/* Hamburger: fondo negro, 3 líneas, la del medio roja */}
        <button className="navbar-burger" type="button"
          onClick={() => setOpen((v) => !v)} aria-label="Menú">
          <span className="navbar-burger__w" />
          <span className="navbar-burger__r" />
          <span className="navbar-burger__w" />
        </button>

      </div>

      {/* Mobile menu */}
      {open && (
        <div className="navbar-mobile">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="navbar-mobile__link"
              onClick={(e) => handleLink(e, l.href)}>
              {l.label}
            </a>
          ))}
          <a href="#contacto" className="navbar-mobile__cta"
            onClick={(e) => handleLink(e, '#contacto')}>
            Cotizar proyecto
          </a>
        </div>
      )}
    </header>
  );
}
