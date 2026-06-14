import React from 'react';
import './Testimonios.css';

const TESTIMONIOS = [
  {
    nombre: 'María & Jorge R.',
    tipo: 'Casa unifamiliar',
    texto: 'Construyeron la casa de nuestros sueños tal cual la imaginamos. El trato fue cercano y siempre supimos en qué etapa iba la obra. Cumplieron los plazos sin sorpresas.',
  },
  {
    nombre: 'Carolina M.',
    tipo: 'Remodelación integral',
    texto: 'Remodelamos toda la cocina y un baño. Profesionales, ordenados y muy limpios en el trabajo. Recomiendo Guzman a cualquiera que quiera tranquilidad durante la obra.',
  },
  {
    nombre: 'Grupo Andinos S.A.',
    tipo: 'Proyecto comercial',
    texto: 'El cálculo estructural y la supervisión nos dieron total seguridad para nuestro proyecto comercial. Un equipo técnico serio que responde y explica todo con claridad.',
  },
];

export default function Testimonios() {
  return (
    <section className="testimonios" id="testimonios">
      <div className="testimonios__inner">
        {/* Eyebrow centrado con línea a cada lado */}
        <div className="testimonios__eyebrow">
          <span className="testimonios__eyebrow-line" />
          <span className="testimonios__eyebrow-text">Testimonios</span>
          <span className="testimonios__eyebrow-line" />
        </div>

        <h2 className="testimonios__title">Lo que dicen nuestras familias</h2>

        <div className="testimonios__grid">
          {TESTIMONIOS.map((t) => (
            <article className="testimonios__card" key={t.nombre}>
              {/* Comilla Georgia 60px */}
              <div className="testimonios__quote">"</div>
              <p className="testimonios__text">{t.texto}</p>
              <div className="testimonios__author">
                {/* Avatar circular con textura */}
                <div className="testimonios__avatar" />
                <div>
                  <div className="testimonios__name">{t.nombre}</div>
                  <div className="testimonios__tipo">{t.tipo}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
