import React from 'react';
import './Nosotros.css';

export default function Nosotros() {
  return (
    <section className="nosotros" id="nosotros">
      <div className="nosotros__inner">

        {/* Columna imagen — position:relative en el div flex directamente */}
        <div className="nosotros__img-col">
          {/* Bloque rojo: absolute left:-18px bottom:-18px width:64% height:62% */}
          <div className="nosotros__red-block" />
          {/* Marco negro: absolute right:-14px top:-14px 96x96px border:4px */}
          <div className="nosotros__black-frame" />
          {/* Foto: z-index:1 sobre el bloque rojo */}
          <div className="nosotros__img-placeholder">
            <span>[ FOTO · EQUIPO / FAMILIA<br />GUZMAN ]</span>
          </div>
        </div>

        {/* Columna texto */}
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
            En Guzman Ingeniería y Construcción cada proyecto es personal.
            Nacimos como una empresa familiar con un objetivo claro:
            acompañarte de principio a fin para que construir o remodelar tu
            hogar deje de ser un problema y se convierta en una experiencia
            tranquila.
          </p>
          <p className="nosotros__p">
            Unimos la calidez de un trato cercano con el rigor técnico de la
            ingeniería: planificación honesta, materiales de calidad y
            supervisión en cada etapa de la obra.
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
