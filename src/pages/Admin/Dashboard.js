import React, { useState, useRef, useEffect } from 'react';
import Logo from '../../components/Logo/Logo';
import './Dashboard.css';

/* ── Helpers ── */
const ADMIN_EMAIL = 'admin@guzmaningenieria.com';

function thumbCss(url) {
  return url
    ? { backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: 'repeating-linear-gradient(125deg,#e6e6e6 0 14px,#efefef 14px 28px)' };
}

function estadoBadge(estado) {
  if (estado === 'Nueva') return { background: '#C70100', color: '#fff' };
  if (estado === 'Contactado') return { background: '#1a1a1a', color: '#fff' };
  return { background: '#e7e7e5', color: '#777' };
}

/* ── Iconos SVG ── */
const Icon = ({ paths, size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size, display: 'block', flexShrink: 0 }}>
    {paths.map((d, i) => <path key={i} d={d} />)}
  </svg>
);

const ICONS = {
  resumen:     ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
  proyectos:   ['M3 21h18', 'M5 21V8l7-5 7 5v13', 'M9 21v-6h6v6'],
  testimonios: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
  solicitudes: ['M22 12h-6l-2 3h-4l-2-3H2', 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z'],
  plus:        ['M12 5v14', 'M5 12h14'],
  trash:       ['M3 6h18', 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', 'M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6'],
  external:    ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14L21 3'],
  logout:      ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'M16 17l5-5-5-5', 'M21 12H9'],
  upload:      ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'],
  video:       ['M23 7 16 12 23 17 23 7', 'M1 5h15v14H1z'],
  download:    ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
  eye:         ['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'],
  close:       ['M18 6L6 18', 'M6 6l12 12'],
};

/* LogoH reemplazado por componente <Logo /> */

/* ── Modal Proyecto ── */
function ModalProyecto({ onClose, onSave }) {
  const [draft, setDraft] = useState({ nombre: '', categoria: 'Residencial', anio: '2026', ubicacion: '', descripcion: '', fotos: [], videoName: '', destacado: false });
  const [dragZone, setDragZone] = useState(null);
  const fotosRef = useRef();
  const videoRef = useRef();

  const set = (k) => (e) => setDraft((d) => ({ ...d, [k]: e.target.value }));

  const readImages = (fileList, cb) => {
    Array.from(fileList || []).forEach((file) => {
      if (!file.type || !file.type.includes('image')) return;
      const fr = new FileReader();
      fr.onload = (e) => cb(e.target.result);
      fr.readAsDataURL(file);
    });
  };

  const addFotos = (files) => readImages(files, (url) => setDraft((d) => ({ ...d, fotos: [...d.fotos, url] })));
  const removeFoto = (i) => setDraft((d) => ({ ...d, fotos: d.fotos.filter((_, j) => j !== i) }));
  const setVideo = (file) => { if (file) setDraft((d) => ({ ...d, videoName: file.name })); };

  const inputStyle = { width: '100%', padding: '13px 15px', border: '1px solid #e1e1e1', background: '#fafafa', fontSize: '14.5px', fontWeight: 500, fontFamily: 'inherit', outline: 'none', color: '#1a1a1a' };
  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: 8 };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...draft, id: Date.now() });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form className="modal-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Nuevo proyecto</h2>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="modal-field">
            <label style={labelStyle}>Nombre del proyecto *</label>
            <input type="text" required value={draft.nombre} onChange={set('nombre')} placeholder="Ej. Casa Las Lomas" style={inputStyle} />
          </div>

          <div className="modal-row">
            <div className="modal-field" style={{ flex: '1 1 180px' }}>
              <label style={labelStyle}>Categoría</label>
              <select value={draft.categoria} onChange={set('categoria')} style={inputStyle}>
                <option>Residencial</option><option>Comercial</option><option>Remodelación</option>
              </select>
            </div>
            <div className="modal-field" style={{ flex: '1 1 120px' }}>
              <label style={labelStyle}>Año</label>
              <input type="text" value={draft.anio} onChange={set('anio')} placeholder="2026" style={inputStyle} />
            </div>
          </div>

          <div className="modal-field">
            <label style={labelStyle}>Ubicación</label>
            <input type="text" value={draft.ubicacion} onChange={set('ubicacion')} placeholder="Ciudad / zona" style={inputStyle} />
          </div>

          <div className="modal-field">
            <label style={labelStyle}>Descripción</label>
            <textarea rows={3} value={draft.descripcion} onChange={set('descripcion')} placeholder="Breve descripción de la obra…" style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} />
          </div>

          {/* Fotos dropzone */}
          <div className="modal-field">
            <label style={labelStyle}>Galería de fotos</label>
            <label
              className={`dropzone${dragZone === 'fotos' ? ' dropzone--active' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragZone('fotos'); }}
              onDragLeave={() => setDragZone(null)}
              onDrop={(e) => { e.preventDefault(); setDragZone(null); addFotos(e.dataTransfer.files); }}
            >
              <input ref={fotosRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={(e) => { addFotos(e.target.files); e.target.value = ''; }} />
              <Icon paths={ICONS.upload} size={30} />
              <span className="dropzone__main">Arrastra fotos aquí o haz clic para subir</span>
              <span className="dropzone__sub">JPG, PNG · varias a la vez</span>
            </label>
            {draft.fotos.length > 0 && (
              <div className="foto-thumbs">
                {draft.fotos.map((url, i) => (
                  <div key={i} className="foto-thumb" style={{ backgroundImage: `url(${url})` }}>
                    <button type="button" className="foto-thumb__remove" onClick={() => removeFoto(i)}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Video dropzone */}
          <div className="modal-field">
            <label style={labelStyle}>Video del proyecto</label>
            <label
              className={`dropzone dropzone--video${dragZone === 'video' ? ' dropzone--active' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragZone('video'); }}
              onDragLeave={() => setDragZone(null)}
              onDrop={(e) => { e.preventDefault(); setDragZone(null); setVideo((e.dataTransfer.files || [])[0]); }}
            >
              <input ref={videoRef} type="file" accept="video/*" style={{ display: 'none' }} onChange={(e) => { setVideo(e.target.files[0]); e.target.value = ''; }} />
              {draft.videoName ? (
                <span className="dropzone__video-name">
                  <span style={{ color: '#C70100' }}>▶</span>
                  {draft.videoName}
                  <span className="dropzone__video-clear" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDraft((d) => ({ ...d, videoName: '' })); }}>· quitar</span>
                </span>
              ) : (
                <span className="dropzone__video-placeholder">
                  <Icon paths={ICONS.video} size={20} />
                  Arrastra o selecciona un video (MP4)
                </span>
              )}
            </label>
          </div>

          {/* Toggle destacado */}
          <label className={`toggle-row${draft.destacado ? ' toggle-row--active' : ''}`}>
            <span className="toggle-switch" onClick={(e) => { e.preventDefault(); setDraft((d) => ({ ...d, destacado: !d.destacado })); }}>
              <span className={`toggle-knob${draft.destacado ? ' toggle-knob--on' : ''}`} />
            </span>
            <span className="toggle-text">
              <span className="toggle-text__main">Marcar como destacado</span>
              <span className="toggle-text__sub">Aparecerá en el carrusel principal del sitio</span>
            </span>
            <span style={{ color: '#C70100', fontSize: 18 }}>★</span>
          </label>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button type="button" className="modal-btn modal-btn--cancel" onClick={onClose}>Cancelar</button>
          <button type="submit" className="modal-btn modal-btn--save">Guardar proyecto</button>
        </div>
      </form>
    </div>
  );
}

/* ── Modal Testimonio ── */
function ModalTestimonio({ onClose, onSave }) {
  const [draft, setDraft] = useState({ nombre: '', tipo: '', rating: 5, comentario: '', foto: '' });
  const [dragZone, setDragZone] = useState(null);

  const set = (k) => (e) => setDraft((d) => ({ ...d, [k]: e.target.value }));
  const readImage = (files) => {
    const file = (files || [])[0];
    if (!file) return;
    const fr = new FileReader();
    fr.onload = (e) => setDraft((d) => ({ ...d, foto: e.target.result }));
    fr.readAsDataURL(file);
  };

  const inputStyle = { width: '100%', padding: '13px 15px', border: '1px solid #e1e1e1', background: '#fafafa', fontSize: '14.5px', fontWeight: 500, fontFamily: 'inherit', outline: 'none', color: '#1a1a1a' };
  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: 8 };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...draft, id: Date.now() });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form className="modal-form" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="modal-header">
          <h2 className="modal-title">Nuevo testimonio</h2>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="modal-row" style={{ alignItems: 'flex-start' }}>
            {/* Avatar dropzone circular */}
            <div className="modal-field" style={{ flexShrink: 0 }}>
              <label style={labelStyle}>Foto</label>
              <label
                className="avatar-dropzone"
                style={draft.foto ? { backgroundImage: `url(${draft.foto})`, backgroundSize: 'cover', backgroundPosition: 'center', borderColor: '#C70100' } : {}}
                onDragOver={(e) => { e.preventDefault(); setDragZone('foto'); }}
                onDragLeave={() => setDragZone(null)}
                onDrop={(e) => { e.preventDefault(); setDragZone(null); readImage(e.dataTransfer.files); }}
              >
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { readImage(e.target.files); e.target.value = ''; }} />
                {!draft.foto && <span className="avatar-dropzone__text">SUBIR<br />FOTO</span>}
              </label>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="modal-field">
                <label style={labelStyle}>Nombre del cliente *</label>
                <input type="text" required value={draft.nombre} onChange={set('nombre')} placeholder="Ej. María & Jorge R." style={inputStyle} />
              </div>
              <div className="modal-field">
                <label style={labelStyle}>Tipo de proyecto</label>
                <input type="text" value={draft.tipo} onChange={set('tipo')} placeholder="Ej. Casa unifamiliar" style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Estrellas */}
          <div className="modal-field">
            <label style={labelStyle}>Calificación</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {[1,2,3,4,5].map((i) => (
                <button key={i} type="button" onClick={() => setDraft((d) => ({ ...d, rating: i }))}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 28, lineHeight: 1, padding: 0, color: i <= draft.rating ? '#C70100' : '#dcdcdc' }}>★</button>
              ))}
            </div>
          </div>

          <div className="modal-field">
            <label style={labelStyle}>Comentario / testimonio *</label>
            <textarea rows={4} required value={draft.comentario} onChange={set('comentario')} placeholder="Lo que el cliente opina del trabajo…" style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} />
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="modal-btn modal-btn--cancel" onClick={onClose}>Cancelar</button>
          <button type="submit" className="modal-btn modal-btn--save">Publicar testimonio</button>
        </div>
      </form>
    </div>
  );
}

/* ── Helpers archivos ── */
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function fileIcon(name) {
  const ext = name.split('.').pop().toLowerCase();
  if (['jpg','jpeg','png','gif','webp'].includes(ext)) return '🖼️';
  if (['pdf'].includes(ext)) return '📄';
  if (['xls','xlsx','csv'].includes(ext)) return '📊';
  if (['doc','docx'].includes(ext)) return '📝';
  if (['dwg','dxf'].includes(ext)) return '📐';
  if (['zip','rar','7z'].includes(ext)) return '🗜️';
  return '📎';
}

function downloadFile(file) {
  /* Crea un link temporal y dispara la descarga */
  const link = document.createElement('a');
  link.href = file.data;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ── Modal Detalle de Solicitud ── */
function ModalSolicitud({ solicitud, onClose, onChangeEstado }) {
  if (!solicitud) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-form modal-form--solicitud" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Detalle de solicitud</h2>
            <div className="modal-subtitle">{solicitud.fecha}</div>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>
        </div>

        {/* Body */}
        <div className="modal-body sol-modal__body">
          {/* Cliente */}
          <div className="sol-modal__cliente">
            <div className="sol-modal__avatar">{solicitud.nombre.charAt(0)}</div>
            <div className="sol-modal__cliente-info">
              <div className="sol-modal__cliente-nombre">{solicitud.nombre}</div>
              <a className="sol-modal__cliente-contact" href={`tel:${(solicitud.telefono || '').replace(/\s/g,'')}`}>☎ {solicitud.telefono || 'Sin teléfono'}</a>
              <a className="sol-modal__cliente-contact" href={`mailto:${solicitud.emailUser}@${solicitud.emailDomain}`}>✉ {solicitud.emailUser}@{solicitud.emailDomain}</a>
            </div>
            <select
              value={solicitud.estado}
              onChange={(e) => onChangeEstado(solicitud.id, e.target.value)}
              className="sol-modal__estado"
              style={estadoBadge(solicitud.estado)}
            >
              <option value="Nueva">Nueva</option>
              <option value="Contactado">Contactado</option>
              <option value="Cerrada">Cerrada</option>
            </select>
          </div>

          {/* Título */}
          {solicitud.titulo && (
            <div className="sol-modal__seccion">
              <div className="sol-modal__seccion-label">Título</div>
              <div className="sol-modal__titulo">{solicitud.titulo}</div>
            </div>
          )}

          {/* Tipo de proyecto */}
          <div className="sol-modal__seccion">
            <div className="sol-modal__seccion-label">Tipo de proyecto</div>
            <span className="sol-modal__tipo-chip">{solicitud.tipo}</span>
          </div>

          {/* Descripción completa */}
          <div className="sol-modal__seccion">
            <div className="sol-modal__seccion-label">Descripción del proyecto</div>
            <p className="sol-modal__descripcion">{solicitud.mensaje || '(sin descripción)'}</p>
          </div>

          {/* Archivos adjuntos */}
          {solicitud.archivos && solicitud.archivos.length > 0 && (
            <div className="sol-modal__seccion">
              <div className="sol-modal__seccion-label">
                Archivos adjuntos ({solicitud.archivos.length})
              </div>
              <ul className="sol-modal__files">
                {solicitud.archivos.map((f, i) => (
                  <li key={i} className="sol-modal__file">
                    <span className="sol-modal__file-icon">{fileIcon(f.name)}</span>
                    <div className="sol-modal__file-info">
                      <div className="sol-modal__file-name" title={f.name}>{f.name}</div>
                      <div className="sol-modal__file-size">{formatSize(f.size)}</div>
                    </div>
                    <button
                      type="button"
                      className="sol-modal__file-download"
                      onClick={() => downloadFile(f)}
                      title="Descargar"
                    >
                      <Icon paths={ICONS.download} size={16} />
                      <span>Descargar</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button type="button" className="modal-btn modal-btn--cancel" onClick={onClose}>Cerrar</button>
          <a
            href={`mailto:${solicitud.emailUser}@${solicitud.emailDomain}?subject=Tu%20solicitud%20de%20cotización%20-%20Guzman%20Ingeniería`}
            className="modal-btn modal-btn--save"
          >
            Responder por email
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── DASHBOARD PRINCIPAL ── */
const INIT_PROJECTS = [
  { id: 1, nombre: 'Casa Las Lomas', categoria: 'Residencial', ubicacion: 'Zona Norte', anio: '2025', descripcion: '', fotos: [], videoName: '', destacado: true },
  { id: 2, nombre: 'Edificio Central', categoria: 'Comercial', ubicacion: 'Centro', anio: '2024', descripcion: '', fotos: [], videoName: '', destacado: true },
  { id: 3, nombre: 'Remodelación Vista Verde', categoria: 'Remodelación', ubicacion: 'Las Colinas', anio: '2025', descripcion: '', fotos: [], videoName: '', destacado: false },
  { id: 4, nombre: 'Residencia El Mirador', categoria: 'Residencial', ubicacion: 'Alto Mirador', anio: '2023', descripcion: '', fotos: [], videoName: '', destacado: false },
];

const INIT_TESTIMONIOS = [
  { id: 1, nombre: 'María & Jorge R.', tipo: 'Casa unifamiliar', rating: 5, comentario: 'Construyeron la casa de nuestros sueños tal cual la imaginamos. Cumplieron los plazos sin sorpresas.', foto: '' },
  { id: 2, nombre: 'Carolina M.', tipo: 'Remodelación integral', rating: 5, comentario: 'Profesionales, ordenados y muy limpios en el trabajo. Recomiendo Guzman a cualquiera.', foto: '' },
  { id: 3, nombre: 'Grupo Andinos S.A.', tipo: 'Proyecto comercial', rating: 4, comentario: 'El cálculo estructural y la supervisión nos dieron total seguridad. Un equipo técnico serio.', foto: '' },
];

const INIT_SOLICITUDES = [
  { id: 1, nombre: 'Andrea Fuentes', emailUser: 'andrea.fuentes', emailDomain: 'gmail.com', telefono: '+1 (555) 102-3344', titulo: 'Casa 2 pisos zona norte', tipo: 'Construcción de casa', fecha: '12 Jun 2026', estado: 'Nueva', mensaje: 'Quiero construir una casa de dos pisos en un terreno de 200m².', archivos: [] },
  { id: 2, nombre: 'Roberto Salas', emailUser: 'rsalas', emailDomain: 'outlook.com', telefono: '+1 (555) 887-1200', titulo: 'Ampliación cocina + cuarto', tipo: 'Remodelación / ampliación', fecha: '11 Jun 2026', estado: 'Nueva', mensaje: 'Necesito ampliar la cocina y agregar un cuarto.', archivos: [] },
  { id: 3, nombre: 'Inversiones del Valle', emailUser: 'contacto', emailDomain: 'delvalle.com', telefono: '+1 (555) 440-9981', titulo: 'Cálculo estructural local comercial', tipo: 'Ingeniería estructural', fecha: '9 Jun 2026', estado: 'Contactado', mensaje: 'Solicitamos cálculo estructural para un local comercial.', archivos: [] },
  { id: 4, nombre: 'Familia Pérez', emailUser: 'perez.hogar', emailDomain: 'gmail.com', telefono: '+1 (555) 332-7788', titulo: 'Remodelación dos baños', tipo: 'Remodelación / ampliación', fecha: '5 Jun 2026', estado: 'Cerrada', mensaje: 'Remodelación de dos baños completos.', archivos: [] },
];

const NAV_DEFS = [
  { key: 'resumen',     label: 'Resumen',     paths: ICONS.resumen },
  { key: 'proyectos',   label: 'Proyectos',   paths: ICONS.proyectos },
  { key: 'testimonios', label: 'Testimonios', paths: ICONS.testimonios },
  { key: 'solicitudes', label: 'Solicitudes', paths: ICONS.solicitudes },
];

const SECTION_TITLES = {
  resumen:     ['Resumen', 'Vista general de tu actividad reciente'],
  proyectos:   ['Proyectos', 'Sube fotos y videos de tus obras'],
  testimonios: ['Testimonios', 'Opiniones de tus clientes'],
  solicitudes: ['Solicitudes', 'Cotizaciones recibidas desde el sitio'],
};

export default function Dashboard({ onSignOut }) {
  const [section, setSection] = useState('resumen');
  const [projects, setProjects] = useState(INIT_PROJECTS);
  const [testimonios, setTestimonios] = useState(INIT_TESTIMONIOS);
  const [solicitudes, setSolicitudes] = useState(INIT_SOLICITUDES);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [modal, setModal] = useState(null);
  const [estadoFilter, setEstadoFilter] = useState('Todas');
  const [sidebarWide, setSidebarWide] = useState(true);

  /* Cargar solicitudes nuevas del localStorage (las que crea el formulario público)
     y mergear con las iniciales mostrándolas arriba */
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('solicitudes') || '[]');
      if (stored.length > 0) {
        setSolicitudes((prev) => {
          /* Evitar duplicados por id */
          const existingIds = new Set(prev.map((p) => p.id));
          const news = stored.filter((s) => !existingIds.has(s.id));
          return [...news, ...prev];
        });
      }
    } catch (err) {
      console.error('Error leyendo solicitudes:', err);
    }
  }, []);

  const nuevas = solicitudes.filter((s) => s.estado === 'Nueva').length;
  const [title, subtitle] = SECTION_TITLES[section];

  const deleteProject = (id) => setProjects((p) => p.filter((x) => x.id !== id));
  const toggleDestacado = (id) => setProjects((p) => p.map((x) => x.id === id ? { ...x, destacado: !x.destacado } : x));
  const addProject = (p) => setProjects((prev) => [p, ...prev]);

  const deleteTestimonio = (id) => setTestimonios((t) => t.filter((x) => x.id !== id));
  const addTestimonio = (t) => setTestimonios((prev) => [t, ...prev]);

  const setEstado = (id, v) => setSolicitudes((s) => s.map((x) => x.id === id ? { ...x, estado: v } : x));

  const filteredSolicitudes = estadoFilter === 'Todas' ? solicitudes : solicitudes.filter((s) => s.estado === estadoFilter);

  return (
    <div className="dashboard">
      {/* ── SIDEBAR ── */}
      <aside className={`sidebar${sidebarWide ? ' sidebar--wide' : ' sidebar--narrow'}`}>
        <div className="sidebar__logo" onClick={() => setSidebarWide((w) => !w)} title="Colapsar sidebar">
          {sidebarWide
            ? <Logo variant="horizontal" theme="dark" height={28} />
            : <Logo variant="iso" theme="dark" height={30} />
          }
        </div>

        <nav className="sidebar__nav">
          {NAV_DEFS.map((n) => {
            const active = section === n.key;
            return (
              <button
                key={n.key}
                type="button"
                className={`sidebar__nav-item${active ? ' sidebar__nav-item--active' : ''}`}
                onClick={() => setSection(n.key)}
                title={n.label}
                style={{ justifyContent: sidebarWide ? 'space-between' : 'center', padding: sidebarWide ? '13px 15px' : '13px 0' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                  <Icon paths={n.paths} size={20} />
                  {sidebarWide && <span className="sidebar__nav-label">{n.label}</span>}
                </span>
                {n.key === 'solicitudes' && nuevas > 0 && sidebarWide && (
                  <span className="sidebar__badge" style={{ background: active ? 'rgba(255,255,255,0.25)' : '#C70100' }}>{nuevas}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__user-avatar">A</div>
            {sidebarWide && (
              <div className="sidebar__user-info">
                <div className="sidebar__user-name">Administrador</div>
                <div className="sidebar__user-email">{ADMIN_EMAIL}</div>
              </div>
            )}
          </div>
          <button type="button" className="sidebar__logout" onClick={onSignOut} title="Cerrar sesión"
            style={{ justifyContent: sidebarWide ? 'flex-start' : 'center' }}>
            <Icon paths={ICONS.logout} size={18} />
            {sidebarWide && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="dashboard__main">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar__left">
            <div className="topbar__title-row">
              <span className="topbar__accent" />
              <h1 className="topbar__title">{title}</h1>
            </div>
            <p className="topbar__subtitle">{subtitle}</p>
          </div>
          <a href="/" className="topbar__ver-sitio">
            <Icon paths={ICONS.external} size={16} />
            <span>Ver sitio</span>
          </a>
        </header>

        <div className="dashboard__content">

          {/* ══ RESUMEN ══ */}
          {section === 'resumen' && (
            <>
              {/* Stats */}
              <div className="stats-grid">
                {[
                  { label: 'Proyectos',        value: projects.length,                            color: '#0a0a0a', bar: '#0a0a0a' },
                  { label: 'Destacados',        value: projects.filter((p) => p.destacado).length, color: '#C70100', bar: '#C70100' },
                  { label: 'Testimonios',       value: testimonios.length,                         color: '#0a0a0a', bar: '#0a0a0a' },
                  { label: 'Solicitudes nuevas',value: nuevas,                                     color: '#C70100', bar: '#C70100' },
                ].map((s) => (
                  <div key={s.label} className="stat-card">
                    <div className="stat-card__bar" style={{ background: s.bar }} />
                    <div className="stat-card__label">{s.label}</div>
                    <div className="stat-card__value" style={{ color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Recientes */}
              <div className="recientes-grid">
                <div className="recientes-card">
                  <div className="recientes-card__header">
                    <h2 className="recientes-card__title">Solicitudes recientes</h2>
                    <button type="button" className="recientes-card__link" onClick={() => setSection('solicitudes')}>Ver todas →</button>
                  </div>
                  {solicitudes.slice(0, 3).map((r) => (
                    <div key={r.id} className="recientes-sol-row">
                      <div className="recientes-sol-avatar">{r.nombre.charAt(0)}</div>
                      <div className="recientes-sol-info">
                        <div className="recientes-sol-nombre">{r.nombre}</div>
                        <div className="recientes-sol-tipo">{r.tipo}</div>
                      </div>
                      <span className="recientes-sol-badge" style={estadoBadge(r.estado)}>{r.estado}</span>
                    </div>
                  ))}
                </div>

                <div className="recientes-card">
                  <div className="recientes-card__header">
                    <h2 className="recientes-card__title">Proyectos recientes</h2>
                    <button type="button" className="recientes-card__link" onClick={() => setSection('proyectos')}>Gestionar →</button>
                  </div>
                  <div className="recientes-proj-grid">
                    {projects.slice(0, 4).map((p) => (
                      <div key={p.id} className="recientes-proj-thumb">
                        <div className="recientes-proj-thumb__bg" style={thumbCss(p.fotos[0])} />
                        <div className="recientes-proj-thumb__gradient" />
                        <span className="recientes-proj-thumb__name">{p.nombre}</span>
                        {p.destacado && <span className="recientes-proj-thumb__star">★</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ══ PROYECTOS ══ */}
          {section === 'proyectos' && (
            <>
              <div className="section-bar">
                <span className="section-bar__count">{projects.length} proyectos · {projects.filter((p) => p.destacado).length} destacados en el carrusel</span>
                <button type="button" className="btn-red" onClick={() => setModal('proyecto')}>
                  <Icon paths={ICONS.plus} size={16} />
                  Nuevo proyecto
                </button>
              </div>

              <div className="proj-grid">
                {projects.map((p) => (
                  <article key={p.id} className="proj-card">
                    <div className="proj-card__thumb">
                      <div className="proj-card__thumb-bg" style={thumbCss(p.fotos[0])} />
                      {p.fotos.length === 0 && <span className="proj-card__sin-foto">SIN FOTO</span>}
                      <span className="proj-card__cat">{p.categoria}</span>
                      {p.destacado && <span className="proj-card__destacado-badge"><span style={{ color: '#ffd23f' }}>★</span>DESTACADO</span>}
                      {p.fotos.length > 0 && <span className="proj-card__foto-count">{p.fotos.length} ▦</span>}
                      {p.videoName && <span className="proj-card__video-badge">▶ VIDEO</span>}
                    </div>
                    <div className="proj-card__body">
                      <h3 className="proj-card__nombre">{p.nombre}</h3>
                      <p className="proj-card__meta">{[p.ubicacion, p.anio].filter(Boolean).join(' · ') || '—'}</p>
                      <div className="proj-card__actions">
                        <button type="button"
                          className="proj-card__destacar"
                          style={{ background: p.destacado ? '#0a0a0a' : '#fff', color: p.destacado ? '#fff' : '#555', border: p.destacado ? 'none' : '1.5px solid #ececea' }}
                          onClick={() => toggleDestacado(p.id)}>
                          {p.destacado ? '★ Destacado' : 'Destacar'}
                        </button>
                        <button type="button" className="proj-card__delete" onClick={() => deleteProject(p.id)} title="Eliminar">
                          <Icon paths={ICONS.trash} size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}

                {/* Tarjeta "Agregar" */}
                <button type="button" className="proj-card--add" onClick={() => setModal('proyecto')}>
                  <Icon paths={ICONS.plus} size={34} />
                  <span>Agregar proyecto</span>
                </button>
              </div>
            </>
          )}

          {/* ══ TESTIMONIOS ══ */}
          {section === 'testimonios' && (
            <>
              <div className="section-bar">
                <span className="section-bar__count">{testimonios.length} testimonios publicados</span>
                <button type="button" className="btn-red" onClick={() => setModal('testimonio')}>
                  <Icon paths={ICONS.plus} size={16} />
                  Nuevo testimonio
                </button>
              </div>

              <div className="test-grid">
                {testimonios.map((t) => (
                  <article key={t.id} className="test-card">
                    <div className="test-card__top">
                      <div className="test-card__avatar" style={t.foto ? { backgroundImage: `url(${t.foto})`, backgroundSize: 'cover' } : {}}>
                        {!t.foto && t.nombre.charAt(0)}
                      </div>
                      <div className="test-card__info">
                        <div className="test-card__nombre">{t.nombre}</div>
                        <div className="test-card__tipo">{t.tipo}</div>
                      </div>
                      <button type="button" className="test-card__delete" onClick={() => deleteTestimonio(t.id)} title="Eliminar">
                        <Icon paths={ICONS.trash} size={17} />
                      </button>
                    </div>
                    <div className="test-card__stars">
                      {[1,2,3,4,5].map((i) => <span key={i} style={{ color: i <= t.rating ? '#C70100' : '#dcdcdc', fontSize: 15 }}>★</span>)}
                    </div>
                    <p className="test-card__comentario">{t.comentario}</p>
                  </article>
                ))}
              </div>
            </>
          )}

          {/* ══ SOLICITUDES ══ */}
          {section === 'solicitudes' && (
            <>
              <div className="chips-row">
                {['Todas','Nueva','Contactado','Cerrada'].map((e) => (
                  <button key={e} type="button"
                    className={`filter-chip${estadoFilter === e ? ' filter-chip--active' : ''}`}
                    onClick={() => setEstadoFilter(e)}>{e}</button>
                ))}
              </div>

              {/* TABLA — desktop (visible >1024px) */}
              <div className="sol-table-wrap">
                <table className="sol-table">
                  <thead>
                    <tr>
                      {['Cliente','Contacto','Proyecto','Fecha','Estado'].map((h) => (
                        <th key={h} className="sol-table__th">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSolicitudes.map((r) => (
                      <tr key={r.id} className="sol-table__row sol-table__row--clickable" onClick={() => setSelectedSolicitud(r)}>
                        <td className="sol-table__td">
                          <div className="sol-td-nombre">{r.nombre}</div>
                          <div className="sol-td-mensaje">{r.titulo || r.mensaje}</div>
                          {r.archivos && r.archivos.length > 0 && (
                            <div className="sol-td-files">📎 {r.archivos.length} archivo{r.archivos.length !== 1 ? 's' : ''}</div>
                          )}
                        </td>
                        <td className="sol-table__td">
                          <div className="sol-td-tel">{r.telefono}</div>
                          <div className="sol-td-email">{r.emailUser}@{r.emailDomain}</div>
                        </td>
                        <td className="sol-table__td">
                          <span className="sol-td-tipo">{r.tipo}</span>
                        </td>
                        <td className="sol-table__td sol-td-fecha">{r.fecha}</td>
                        <td className="sol-table__td" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={r.estado}
                            onChange={(e) => setEstado(r.id, e.target.value)}
                            style={{ ...estadoBadge(r.estado), border: 'none', padding: '7px 12px', fontFamily: 'inherit', cursor: 'pointer', fontWeight: 700, fontSize: 12.5, appearance: 'none', WebkitAppearance: 'none' }}
                          >
                            <option value="Nueva">Nueva</option>
                            <option value="Contactado">Contactado</option>
                            <option value="Cerrada">Cerrada</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CARDS — mobile + tablet (visible ≤1024px) */}
              <div className="sol-cards">
                {filteredSolicitudes.map((r) => (
                  <article key={r.id} className="sol-card" onClick={() => setSelectedSolicitud(r)}>
                    <div className="sol-card__head">
                      <div className="sol-card__avatar">{r.nombre.charAt(0)}</div>
                      <div className="sol-card__head-info">
                        <div className="sol-card__nombre">{r.nombre}</div>
                        <div className="sol-card__fecha">{r.fecha}</div>
                      </div>
                      <select
                        value={r.estado}
                        onChange={(e) => setEstado(r.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="sol-card__estado-select"
                        style={{ ...estadoBadge(r.estado) }}
                      >
                        <option value="Nueva">Nueva</option>
                        <option value="Contactado">Contactado</option>
                        <option value="Cerrada">Cerrada</option>
                      </select>
                    </div>

                    {r.titulo && <div className="sol-card__titulo">{r.titulo}</div>}
                    <p className="sol-card__mensaje">{r.mensaje}</p>

                    <div className="sol-card__contacto">
                      <a href={`tel:${r.telefono.replace(/\s/g,'')}`} className="sol-card__contacto-row" onClick={(e) => e.stopPropagation()}>
                        <Icon paths={['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z']} size={14} />
                        <span>{r.telefono}</span>
                      </a>
                      <a href={`mailto:${r.emailUser}@${r.emailDomain}`} className="sol-card__contacto-row" onClick={(e) => e.stopPropagation()}>
                        <Icon paths={['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z','M22 6l-10 7L2 6']} size={14} />
                        <span>{r.emailUser}@{r.emailDomain}</span>
                      </a>
                    </div>

                    <div className="sol-card__footer">
                      <span className="sol-card__tipo">{r.tipo}</span>
                      {r.archivos && r.archivos.length > 0 && (
                        <span className="sol-card__files-badge">📎 {r.archivos.length}</span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

        </div>
      </main>

      {/* ── Modales ── */}
      {modal === 'proyecto' && <ModalProyecto onClose={() => setModal(null)} onSave={addProject} />}
      {modal === 'testimonio' && <ModalTestimonio onClose={() => setModal(null)} onSave={addTestimonio} />}
      {selectedSolicitud && (
        <ModalSolicitud
          solicitud={selectedSolicitud}
          onClose={() => setSelectedSolicitud(null)}
          onChangeEstado={(id, v) => {
            setEstado(id, v);
            setSelectedSolicitud((s) => s && s.id === id ? { ...s, estado: v } : s);
          }}
        />
      )}

      {/* ── BOTTOM NAV MOBILE ──
          Solo visible en pantallas <=768px, controlado por CSS */}
      <nav className="bottom-nav">
        {NAV_DEFS.map((n) => {
          const active = section === n.key;
          const isSolicitudes = n.key === 'solicitudes';
          return (
            <button
              key={n.key}
              type="button"
              className={`bottom-nav__item${active ? ' bottom-nav__item--active' : ''}`}
              onClick={() => setSection(n.key)}
              aria-label={n.label}
            >
              <div className="bottom-nav__icon-wrap">
                <Icon paths={n.paths} size={20} />
                {isSolicitudes && nuevas > 0 && (
                  <span className="bottom-nav__badge">{nuevas}</span>
                )}
              </div>
              <span className="bottom-nav__label">{n.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
