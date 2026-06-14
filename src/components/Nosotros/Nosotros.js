import React from 'react';
import './Nosotros.css';

export default function Nosotros() {
  return (
    <section className="nosotros" id="nosotros">
      <div className="nosotros__inner">

        {/* ── Columna imagen ── */}
        <div className="nosotros__img-col">
          <div className="nosotros__img-stack">
            {/* Bloque rojo abajo-izquierda — 64% ancho x 62% alto de la foto */}
            <div className="nosotros__red-block" />
            {/* Marco negro esquina superior derecha */}
            <div className="nosotros__black-frame" />
            {/* Foto placeholder */}
            <div className="nosotros__img-placeholder">
              <span>[ FOTO · EQUIPO / FAMILIA<br />GUZMAN ]</span>
            </div>
          </div>
        </div>

        {/* ── Columna texto ── */}
        <div className="nosotros__text-col">
          <div className="nosotros__eyebrow">
            <span className="nosotros__eyebrow-dash" />
            <span className="nosotros__eyebrow-text">Quiénes somos</span>
          </div>
          <h2 className="nosotros__title">
            Una empresa familiar que construye{' '}
            <span className="nosotros__red">confianza</span>.
          </h2>
          <p className="nosotros__p">
            En Guzman Ingeniería y Construcción cada proyecto es personal. Nacimos como
            una empresa familiar con un objetivo claro: acompañarte de principio a fin
            para que construir o remodelar tu hogar deje de ser un problema y se convierta
            en una experiencia tranquila.
          </p>
          <p className="nosotros__p">
            Unimos la calidez de un trato cercano con el rigor técnico de la ingeniería:
            planificación honesta, materiales de calidad y supervisión en cada etapa de la obra.
          </p>

          <div className="nosotros__stats">
            <div className="nosotros__stat">
              <div className="nosotros__stat-val">+15</div>
              <div className="nosotros__stat-label">Años construyendo</div>
            </div>
            <div className="nosotros__stat">
              <div className="nosotros__stat-val">+200</div>
              <div className="nosotros__stat-label">Proyectos entregados</div>
            </div>
            <div className="nosotros__stat">
              <div className="nosotros__stat-val nosotros__stat-val--red">100%</div>
              <div className="nosotros__stat-label">Compromiso familiar</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
