import React, { useState, useEffect } from 'react';
import Logo from '../../components/Logo/Logo';
import './ProyectoDetalle.css';

/* ══════════════════════════════════════════════
   BASE DE DATOS LOCAL DE PROYECTOS
   (en producción esto vendrá de la API)
══════════════════════════════════════════════ */
const PROYECTOS_DB = {
  'casa-las-lomas': {
    categoria: 'Residencial',
    titulo: 'Casa Las Lomas',
    ubicacion: 'Zona Norte',
    anio: '2025',
    intro: 'Vivienda unifamiliar construida desde los cimientos: una casa pensada para una familia que quería espacios amplios, luz natural y una estructura sólida que durara generaciones.',
    subtitulo: 'Del terreno baldío a un hogar llave en mano',
    parrafos: [
      'El proyecto comenzó con un terreno de 240 m² y una idea clara de la familia: una casa de dos pisos, luminosa y con espacios sociales integrados. Acompañamos a los propietarios desde el diseño y el cálculo estructural hasta la entrega final.',
      'El principal desafío fue optimizar la distribución para aprovechar la luz natural sin comprometer la privacidad. Resolvimos con grandes ventanales orientados estratégicamente y un doble altura en la zona social.',
      'Entregamos la obra en el plazo acordado, con acabados a medida y supervisión técnica en cada etapa. El resultado: un hogar sólido, eficiente y exactamente como la familia lo imaginó.',
    ],
    highlights: [
      { value: '240 m²', label: 'Superficie construida' },
      { value: '8',      label: 'Meses de obra' },
      { value: '100%',   label: 'Entregado a tiempo' },
    ],
    ficha: [
      { k: 'Categoría',  v: 'Residencial' },
      { k: 'Ubicación',  v: 'Zona Norte' },
      { k: 'Año',        v: '2025' },
      { k: 'Superficie', v: '240 m²' },
      { k: 'Duración',   v: '8 meses' },
      { k: 'Estado',     v: 'Entregado' },
    ],
    media: [
      { label: 'Fachada principal', tone: '#cfcfcf', video: false },
      { label: 'Sala / comedor',    tone: '#d8d8d8', video: false },
      { label: 'Cocina',            tone: '#cccccc', video: false },
      { label: 'Vista exterior',    tone: '#d2d2d2', video: false },
      { label: 'Recorrido en video',tone: '#1d1d1d', video: true  },
    ],
  },
  'edificio-central': {
    categoria: 'Comercial',
    titulo: 'Edificio Central',
    ubicacion: 'Centro',
    anio: '2024',
    intro: 'Proyecto de uso mixto de cuatro niveles con cálculo estructural propio, terminaciones premium y supervisión técnica en cada etapa de la obra.',
    subtitulo: 'Ingeniería al servicio del comercio',
    parrafos: [
      'El encargo llegó con un programa ambicioso: cuatro niveles de uso mixto (comercial y oficinas) en un lote de esquina de 320 m². El reto estructural fue diseñar una planta libre que permitiera la máxima flexibilidad comercial.',
      'Realizamos el cálculo estructural completo, la dirección de obra y la coordinación de subcontratistas especializados. La estructura de hormigón armado fue ejecutada en dos etapas para no interrumpir la operación del entorno.',
      'El resultado es un edificio sólido, bien terminado y entregado dentro del plazo y presupuesto acordados con el cliente.',
    ],
    highlights: [
      { value: '320 m²', label: 'Superficie por planta' },
      { value: '4',      label: 'Niveles construidos' },
      { value: '14',     label: 'Meses de obra' },
    ],
    ficha: [
      { k: 'Categoría',  v: 'Comercial' },
      { k: 'Ubicación',  v: 'Centro' },
      { k: 'Año',        v: '2024' },
      { k: 'Superficie', v: '1.280 m² totales' },
      { k: 'Duración',   v: '14 meses' },
      { k: 'Estado',     v: 'Entregado' },
    ],
    media: [
      { label: 'Fachada exterior',   tone: '#c8c8c8', video: false },
      { label: 'Lobby principal',    tone: '#d0d0d0', video: false },
      { label: 'Planta tipo',        tone: '#cbcbcb', video: false },
      { label: 'Terraza nivel 4',    tone: '#d5d5d5', video: false },
      { label: 'Recorrido en video', tone: '#1d1d1d', video: true  },
    ],
  },
  'remodelacion-vista-verde': {
    categoria: 'Remodelación',
    titulo: 'Remodelación Vista Verde',
    ubicacion: 'Las Colinas',
    anio: '2025',
    intro: 'Renovación integral de cocina, baños y áreas sociales ejecutada con orden, limpieza y respeto total por la rutina de la familia durante la obra.',
    subtitulo: 'Una casa nueva sin mudarse',
    parrafos: [
      'Los propietarios llevaban años postergando la remodelación por miedo a la incomodidad. Nuestro desafío fue demostrar que era posible trabajar de forma ordenada, por etapas, sin interrumpir la vida cotidiana de la familia.',
      'Intervinimos cocina abierta, dos baños completos y el área de estar. Coordinamos cada especialidad (gasfitería, electricidad, terminaciones) con un cronograma estricto que minimizó los tiempos muertos.',
      'El resultado fue una transformación total del espacio, terminada antes del plazo estimado y con cero sorpresas en el presupuesto final.',
    ],
    highlights: [
      { value: '3',    label: 'Espacios renovados' },
      { value: '6',    label: 'Semanas de trabajo' },
      { value: '100%', label: 'Sin obras en pausa' },
    ],
    ficha: [
      { k: 'Categoría',  v: 'Remodelación' },
      { k: 'Ubicación',  v: 'Las Colinas' },
      { k: 'Año',        v: '2025' },
      { k: 'Área',       v: 'Cocina + 2 baños' },
      { k: 'Duración',   v: '6 semanas' },
      { k: 'Estado',     v: 'Entregado' },
    ],
    media: [
      { label: 'Cocina nueva',       tone: '#d4d4d4', video: false },
      { label: 'Baño principal',     tone: '#cdcdcd', video: false },
      { label: 'Baño visitas',       tone: '#d8d8d8', video: false },
      { label: 'Área de estar',      tone: '#cacaca', video: false },
      { label: 'Recorrido en video', tone: '#1d1d1d', video: true  },
    ],
  },
  'residencia-el-mirador': {
    categoria: 'Residencial',
    titulo: 'Residencia El Mirador',
    ubicacion: 'Alto Mirador',
    anio: '2023',
    intro: 'Casa contemporánea en altura, con grandes ventanales de doble vista, estructura sísmica reforzada y terminaciones de autor.',
    subtitulo: 'Vivir en altura con seguridad estructural',
    parrafos: [
      'La familia buscaba una vivienda que aprovechara al máximo las vistas del cerro sin resignar seguridad. El terreno en pendiente presentaba desafíos geotécnicos que resolvimos con una fundación especial y muros de contención integrados al diseño.',
      'La estructura fue diseñada con un nivel adicional de refuerzo sísmico, superando los requisitos normativos. Los grandes ventanales de doble altura en la zona de estar son el resultado de una solución estructural que libera las fachadas de pilares.',
      'La obra fue entregada en tiempo récord para la complejidad del proyecto, con un resultado que combina fortaleza técnica y calidad estética.',
    ],
    highlights: [
      { value: '280 m²', label: 'Superficie construida' },
      { value: '10',     label: 'Meses de obra' },
      { value: '+30%',   label: 'Refuerzo sísmico extra' },
    ],
    ficha: [
      { k: 'Categoría',  v: 'Residencial' },
      { k: 'Ubicación',  v: 'Alto Mirador' },
      { k: 'Año',        v: '2023' },
      { k: 'Superficie', v: '280 m²' },
      { k: 'Duración',   v: '10 meses' },
      { k: 'Estado',     v: 'Entregado' },
    ],
    media: [
      { label: 'Fachada principal',  tone: '#cdcdcd', video: false },
      { label: 'Ventanal doble vista',tone: '#d6d6d6', video: false },
      { label: 'Cocina integrada',   tone: '#cacaca', video: false },
      { label: 'Terraza mirador',    tone: '#d2d2d2', video: false },
      { label: 'Recorrido en video', tone: '#1d1d1d', video: true  },
    ],
  },
};

/* Proyectos relacionados (sin el actual) */
const OTROS_BASE = [
  { titulo: 'Casa Las Lomas',          categoria: 'Residencial',  tone: '#cfcfcf', slug: 'casa-las-lomas' },
  { titulo: 'Edificio Central',        categoria: 'Comercial',    tone: '#c8c8c8', slug: 'edificio-central' },
  { titulo: 'Remodelación Vista Verde',categoria: 'Remodelación', tone: '#d4d4d4', slug: 'remodelacion-vista-verde' },
  { titulo: 'Residencia El Mirador',   categoria: 'Residencial',  tone: '#cdcdcd', slug: 'residencia-el-mirador' },
];

/* ── Helpers de textura ── */
function lighten(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((n >> 16) & 255) + 12);
  const g = Math.min(255, ((n >> 8)  & 255) + 12);
  const b = Math.min(255, ( n        & 255) + 12);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function toneBg(tone, video) {
  if (video) return { background: 'repeating-linear-gradient(125deg,#161616 0 22px,#1f1f1f 22px 44px)' };
  return { background: `repeating-linear-gradient(125deg,${tone} 0 20px,${lighten(tone)} 20px 40px)` };
}

/* ── Íconos SVG ── */
function ArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
    </svg>
  );
}

function PlayIcon({ size = 32 }) {
  return (
    <svg viewBox="0 0 24 24" fill="#fff" width={size} height={size} style={{ marginLeft: size * 0.15 }}>
      <polygon points="6 4 20 12 6 20 6 4"/>
    </svg>
  );
}

/* Logo reemplazado por componente centralizado <Logo /> */

/* ══════════════════════════════
   COMPONENTE PRINCIPAL
══════════════════════════════ */
export default function ProyectoDetalle({ slug }) {
  const [active, setActive] = useState(0);

  /* Resolver datos según slug; fallback al primero si slug no existe */
  const proyecto = PROYECTOS_DB[slug] || PROYECTOS_DB['casa-las-lomas'];

  /* Resetear slide al cambiar de proyecto */
  useEffect(() => { setActive(0); }, [slug]);

  /* Quitar padding-top heredado del body (el navbar global no existe aquí) */
  useEffect(() => {
    const prev = document.body.style.paddingTop;
    document.body.style.paddingTop = '0';
    return () => { document.body.style.paddingTop = prev; };
  }, []);

  /* Scroll al tope al montar */
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  const m       = proyecto.media[active];
  const counter = `${active + 1} / ${proyecto.media.length}`;

  /* Proyectos relacionados: excluir el actual, mostrar 3 */
  const otros = OTROS_BASE.filter((o) => o.slug !== slug).slice(0, 3);

  const goBack = (e) => {
    e.preventDefault();
    window.history.length > 1 ? window.history.back() : (window.location.href = '/');
  };

  const goToHome = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  const goToContact = (e) => {
    e.preventDefault();
    sessionStorage.setItem('scrollTo', 'contacto');
    window.location.href = '/';
  };

  const goToProjects = (e) => {
    e.preventDefault();
    sessionStorage.setItem('scrollTo', 'proyectos');
    window.location.href = '/';
  };

  return (
    <div className="pd-page">

      {/* ══ HEADER ══ */}
      <header className="pd-header">
        <div className="pd-header__inner">
          <a href="/" className="pd-header__logo-link" onClick={goToHome}>
            <Logo variant="horizontal" theme="light" height={34} />
          </a>
          <a href="/#contacto" className="pd-header__cta" onClick={goToContact}>
            Cotizar <span className="pd-header__cta-sq" />
          </a>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section className="pd-hero">
        <div className="pd-hero__texture" />
        <div className="pd-hero__triangle" />
        <div className="pd-hero__inner">
          <a href="/#proyectos" className="pd-hero__back" onClick={goToProjects}>
            <ArrowLeft />
            Volver a proyectos
          </a>
          <div className="pd-hero__body">
            <div className="pd-hero__left">
              <span className="pd-hero__chip">{proyecto.categoria}</span>
              <h1 className="pd-hero__title">{proyecto.titulo}</h1>
              <p className="pd-hero__intro">{proyecto.intro}</p>
            </div>
            <div className="pd-hero__meta">
              <div>
                <div className="pd-hero__meta-label">Ubicación</div>
                <div className="pd-hero__meta-val">{proyecto.ubicacion}</div>
              </div>
              <div>
                <div className="pd-hero__meta-label">Año</div>
                <div className="pd-hero__meta-val">{proyecto.anio}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ GALERÍA ══ */}
      <section className="pd-gallery">
        <div className="pd-gallery__inner">
          {/* Visor principal 16:9 */}
          <div className="pd-gallery__visor">
            <div className="pd-gallery__visor-bg" style={toneBg(m.tone, m.video)} />
            <div className="pd-gallery__visor-gradient" />
            {m.video && (
              <div className="pd-gallery__play-overlay">
                <span className="pd-gallery__play-btn">
                  <PlayIcon size={32} />
                </span>
              </div>
            )}
            <span className="pd-gallery__placeholder">
              [ FOTO · {m.label.toUpperCase()} ]
            </span>
            <span className="pd-gallery__counter">{counter}</span>
          </div>

          {/* Miniaturas */}
          <div className="pd-gallery__thumbs">
            {proyecto.media.map((item, i) => (
              <button
                key={i}
                type="button"
                className={`pd-gallery__thumb${i === active ? ' pd-gallery__thumb--active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={item.label}
              >
                <div className="pd-gallery__thumb-bg" style={toneBg(item.tone, item.video)} />
                {item.video && (
                  <div className="pd-gallery__thumb-play">
                    <span className="pd-gallery__thumb-play-btn">
                      <PlayIcon size={13} />
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DESCRIPCIÓN + FICHA ══ */}
      <section className="pd-desc">
        <div className="pd-desc__inner">
          {/* Col izquierda */}
          <div className="pd-desc__left">
            <div className="pd-desc__eyebrow">
              <span className="pd-desc__eyebrow-dash" />
              <span className="pd-desc__eyebrow-text">Sobre el proyecto</span>
            </div>
            <h2 className="pd-desc__subtitle">{proyecto.subtitulo}</h2>
            {proyecto.parrafos.map((p, i) => (
              <p key={i} className="pd-desc__p">{p}</p>
            ))}
            <div className="pd-highlights">
              {proyecto.highlights.map((hl) => (
                <div key={hl.label} className="pd-highlights__item">
                  <div className="pd-highlights__value">{hl.value}</div>
                  <div className="pd-highlights__label">{hl.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Col derecha: ficha + CTA */}
          <aside className="pd-aside">
            <div className="pd-ficha">
              <h3 className="pd-ficha__title">Ficha técnica</h3>
              {proyecto.ficha.map((row) => (
                <div key={row.k} className="pd-ficha__row">
                  <span className="pd-ficha__key">{row.k}</span>
                  <span className="pd-ficha__val">{row.v}</span>
                </div>
              ))}
              <div className="pd-ficha__cta">
                <div className="pd-ficha__cta-title">¿Quieres algo similar?</div>
                <p className="pd-ficha__cta-desc">
                  Cuéntanos tu idea y te preparamos una cotización sin compromiso.
                </p>
                <a href="/#contacto" className="pd-ficha__cta-btn" onClick={goToContact}>
                  Cotizar proyecto <span className="pd-ficha__cta-sq" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ══ VIDEO BAND ══ */}
      <section className="pd-video">
        <div className="pd-video__inner">
          <div className="pd-video__eyebrow">
            <span className="pd-video__eyebrow-dash" />
            <span className="pd-video__eyebrow-text">Recorrido en video</span>
          </div>
          <div className="pd-video__player">
            <div className="pd-video__player-overlay" />
            <div className="pd-video__player-content">
              <span className="pd-video__play-btn">
                <PlayIcon size={34} />
              </span>
              <span className="pd-video__placeholder">[ REEMPLAZAR · VIDEO DEL PROYECTO ]</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ OTROS PROYECTOS ══ */}
      <section className="pd-otros">
        <div className="pd-otros__inner">
          <div className="pd-otros__header">
            <h2 className="pd-otros__title">Otros proyectos</h2>
            <a href="/#proyectos" className="pd-otros__ver-todos" onClick={(e) => { e.preventDefault(); window.location.href = '/#proyectos'; }}>
              Ver todos →
            </a>
          </div>
          <div className="pd-otros__grid">
            {otros.map((o) => (
              <a
                key={o.slug}
                href={`/proyecto/${o.slug}`}
                className="pd-otros__card"
                onClick={(e) => { e.preventDefault(); window.location.href = `/proyecto/${o.slug}`; }}
              >
                <div className="pd-otros__card-bg" style={toneBg(o.tone, false)} />
                <div className="pd-otros__card-gradient" />
                <div className="pd-otros__card-info">
                  <span className="pd-otros__card-chip">{o.categoria}</span>
                  <div className="pd-otros__card-title">{o.titulo}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="pd-footer">
        <div className="pd-footer__main">
          <div className="pd-footer__brand">
            <div className="pd-footer__logo-wrap">
            <Logo variant="horizontal" theme="dark" height={32} />
            </div>
            <p className="pd-footer__desc">
              Empresa familiar de ingeniería y construcción. Construimos, remodelamos y calculamos
              la estructura de la casa de tus sueños.
            </p>
          </div>
          <div className="pd-footer__contact-col">
            <div className="pd-footer__col-title">Contacto</div>
            <div className="pd-footer__contact">
              <span>+1 (000) 000-0000</span>
              <span>contacto@guzmaningenieria.com</span>
              <span>Lun – Sáb · 8:00 – 18:00</span>
            </div>
          </div>
        </div>
        <div className="pd-footer__bottom-wrap">
          <div className="pd-footer__bottom">
            <span className="pd-footer__copy">
              © 2026 Guzman Ingeniería y Construcción. Todos los derechos reservados.
            </span>
            <a href="/" className="pd-footer__back-link" onClick={goToHome}>
              ← Volver al inicio
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
