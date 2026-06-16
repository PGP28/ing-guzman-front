import React from 'react';
import './Servicios.css';

const SERVICIOS = [
  {
    num: '01',
    title: 'Construcción de casas',
    desc: 'Diseñamos y edificamos tu hogar desde los cimientos, con planificación clara de plazos y costos, materiales certificados y acabados a tu medida.',
  },
  {
    num: '02',
    title: 'Remodelación y ampliación',
    desc: 'Renovamos cocinas, baños y espacios completos, o ampliamos tu casa con un plan ordenado que respeta tu rutina y tu presupuesto.',
  },
  {
    num: '03',
    title: 'Ingeniería estructural',
    desc: 'Cálculo y diseño estructural, planos de ingeniería y supervisión técnica para que tu construcción sea segura, sólida y normativa.',
  },
];

export default function Servicios() {
  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.querySelector('#contacto');
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section className="servicios" id="servicios">
      <div className="servicios__inner">
        <div className="servicios__header">
          <div className="servicios__eyebrow">
            <span className="servicios__eyebrow-dash" />
            <span className="servicios__eyebrow-text">Servicios</span>
          </div>
          <h2 className="servicios__title">Soluciones completas para tu obra</h2>
          <p className="servicios__subtitle">
            Desde los cimientos hasta el último detalle. Te acompañamos en cada tipo de
            proyecto con un equipo técnico propio.
          </p>
        </div>

        <div className="servicios__grid">
          {SERVICIOS.map((s) => (
            <article className="servicios__card" key={s.num}>
              <div className="servicios__card-top">
                <span className="servicios__card-num">{s.num}</span>
                <span className="servicios__card-dot" />
              </div>
              <h3 className="servicios__card-title">{s.title}</h3>
              <p className="servicios__card-desc">{s.desc}</p>
              <a href="#contacto" className="servicios__card-link" onClick={scrollToContact}>
                Solicitar cotización
                <span className="servicios__card-sq" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
