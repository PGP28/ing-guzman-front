import React from 'react';
import './Hero.css';

export default function Hero() {
  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section className="hero" id="inicio">
      {/* Textura diagonal de fondo */}
      <div className="hero__texture" />
      {/* Gradiente overlay */}
      <div className="hero__overlay" />
      {/* Triángulo rojo esquina superior derecha */}
      <div className="hero__triangle-red" />
      {/* Bloque negro con borde rojo a la izquierda del triángulo */}
      <div className="hero__corner-block" />
      {/* Label placeholder inferior derecha */}
      <div className="hero__media-label">[ REEMPLAZAR · FOTO / VIDEO DE OBRA ]</div>

      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dash" />
          <span className="hero__eyebrow-text">Empresa familiar · Ingeniería y Construcción</span>
        </div>

        <h1 className="hero__title">
          Construimos la casa de tus{' '}
          <span className="hero__red">sueños</span>.
        </h1>

        <p className="hero__desc">
          Somos una empresa familiar que resuelve tus problemas a la hora de
          construir, remodelar o calcular la estructura que siempre imaginaste.
          Calidad, confianza y compromiso en cada proyecto.
        </p>

        <div className="hero__actions">
          <a href="#contacto" className="hero__btn hero__btn--red" onClick={(e) => scrollTo(e, '#contacto')}>
            Cotiza tu proyecto
            <span className="hero__btn-sq" />
          </a>
          <a href="#proyectos" className="hero__btn hero__btn--outline" onClick={(e) => scrollTo(e, '#proyectos')}>
            Ver proyectos
          </a>
        </div>
      </div>
    </section>
  );
}
