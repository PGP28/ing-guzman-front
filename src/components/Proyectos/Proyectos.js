import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Proyectos.css';

const DESTACADOS = [
  { n: '01', titulo: 'Casa Las Lomas',         cat: 'Residencial',  slug: 'casa-las-lomas',         desc: 'Vivienda unifamiliar construida desde los cimientos, con planificación llave en mano y acabados premium a medida de la familia.',     tag: '[ FOTO DESTACADA · CASA LAS LOMAS ]' },
  { n: '02', titulo: 'Edificio Central',        cat: 'Comercial',    slug: 'edificio-central',        desc: 'Proyecto comercial de varios niveles con cálculo estructural propio y supervisión técnica en cada etapa de la obra.',                tag: '[ FOTO DESTACADA · EDIFICIO CENTRAL ]' },
  { n: '03', titulo: 'Remodelación Vista Verde', cat: 'Remodelación', slug: 'remodelacion-vista-verde', desc: 'Renovación integral de cocina, baños y áreas sociales, ejecutada con orden y respetando los tiempos del hogar.',                   tag: '[ FOTO DESTACADA · VISTA VERDE ]' },
  { n: '04', titulo: 'Residencia El Mirador',   cat: 'Residencial',  slug: 'residencia-el-mirador',   desc: 'Diseño y construcción de una casa contemporánea con grandes ventanales y una estructura sólida y eficiente.',                       tag: '[ FOTO DESTACADA · EL MIRADOR ]' },
];

const ALL_PROJECTS = [
  { titulo: 'Casa Las Lomas',          cat: 'Residencial',  slug: 'casa-las-lomas',          tag: '[ FOTO · RESIDENCIAL ]' },
  { titulo: 'Edificio Central',        cat: 'Comercial',    slug: 'edificio-central',         tag: '[ FOTO · COMERCIAL ]' },
  { titulo: 'Remodelación Cocina',     cat: 'Remodelación', slug: 'remodelacion-cocina',      tag: '[ FOTO · REMODELACIÓN ]' },
  { titulo: 'Residencia Vista Verde',  cat: 'Residencial',  slug: 'residencia-vista-verde',   tag: '[ FOTO · RESIDENCIAL ]' },
  { titulo: 'Local Comercial Norte',   cat: 'Comercial',    slug: 'local-comercial-norte',    tag: '[ FOTO · COMERCIAL ]' },
  { titulo: 'Ampliación Familiar',     cat: 'Remodelación', slug: 'ampliacion-familiar',      tag: '[ FOTO · REMODELACIÓN ]' },
];

const CATS = ['Todos', 'Residencial', 'Comercial', 'Remodelación'];
const INTERVAL = 6000;

const goToProject = (slug) => {
  window.location.href = `/proyecto/${slug}`;
};

export default function Proyectos() {
  const [slide, setSlide]   = useState(0);
  const [filter, setFilter] = useState('Todos');
  const timerRef = useRef(null);
  const total    = DESTACADOS.length;

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSlide((s) => (s + 1) % total), INTERVAL);
  }, [total]);

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, [startTimer]);

  const goTo      = (i) => { setSlide(i); startTimer(); };
  const prevSlide = () => goTo(((slide - 1) + total) % total);
  const nextSlide = () => goTo((slide + 1) % total);

  const current  = DESTACADOS[slide];
  const projects = filter === 'Todos' ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.cat === filter);
  const slideNum    = String(slide + 1).padStart(2, '0');
  const totalSlides = String(total).padStart(2, '0');

  return (
    <section className="proyectos" id="proyectos">
      <div className="proyectos__inner">

        {/* ── Header ── */}
        <div className="proyectos__header">
          <div className="proyectos__eyebrow">
            <span className="proyectos__eyebrow-dash" />
            <span className="proyectos__eyebrow-text">Proyectos</span>
          </div>
          <h2 className="proyectos__title">Obras que hablan por nosotros</h2>
          <p className="proyectos__subtitle">
            Una muestra de los proyectos que hemos hecho realidad junto a nuestras familias y clientes.
          </p>
        </div>

        {/* ── CARRUSEL ── */}
        <div className="carrusel">
          <div className="carrusel__visor">
            <div className="carrusel__bg" />
            <div className="carrusel__num-bg">{current.n}</div>
            <span className="carrusel__tag">{current.tag}</span>
            <div className="carrusel__gradient" />

            {/* Info — esquina inferior izquierda */}
            <div className="carrusel__info">
              <span className="carrusel__chip">{current.cat}</span>
              <h3 className="carrusel__titulo">{current.titulo}</h3>
              <p className="carrusel__desc">{current.desc}</p>
              {/* ✅ Navega a la página de detalle */}
              <a
                href={`/proyecto/${current.slug}`}
                className="carrusel__ver-btn"
                onClick={(e) => { e.preventDefault(); goToProject(current.slug); }}
              >
                Ver proyecto
                <span className="carrusel__ver-sq" />
              </a>
            </div>

            {/* Dots + counter — esquina inferior derecha */}
            <div className="carrusel__bottom-right">
              <div className="carrusel__dots">
                {DESTACADOS.map((_, i) => (
                  <button
                    key={i}
                    className={`carrusel__dot${i === slide ? ' carrusel__dot--active' : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Ir a ${i + 1}`}
                  />
                ))}
              </div>
              <span className="carrusel__counter">
                {slideNum}
                <span className="carrusel__counter-total"> / {totalSlides}</span>
              </span>
            </div>

            <button className="carrusel__arrow carrusel__arrow--l" onClick={prevSlide} aria-label="Anterior">‹</button>
            <button className="carrusel__arrow carrusel__arrow--r" onClick={nextSlide} aria-label="Siguiente">›</button>
          </div>
        </div>

        {/* ── GALERÍA FILTRABLE ── */}
        <div className="galeria">
          <div className="galeria__header">
            <h3 className="galeria__titulo-label">Explora todos los proyectos</h3>
            <div className="galeria__chips">
              {CATS.map((c) => (
                <button
                  key={c}
                  className={`galeria__chip${filter === c ? ' galeria__chip--active' : ''}`}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="galeria__grid">
            {projects.map((p, i) => (
              /* ✅ Cada card navega al detalle de su proyecto */
              <a
                key={i}
                href={`/proyecto/${p.slug}`}
                className="galeria__card"
                onClick={(e) => { e.preventDefault(); goToProject(p.slug); }}
              >
                <div className="galeria__card-bg" />
                <span className="galeria__card-tag">{p.tag}</span>
                <div className="galeria__card-gradient" />
                <div className="galeria__card-info">
                  <span className="galeria__card-chip">{p.cat}</span>
                  <h3 className="galeria__card-title">{p.titulo}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
