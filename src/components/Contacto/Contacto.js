import React, { useState, useRef } from 'react';
import './Contacto.css';

const INITIAL = {
  nombre: '',
  email: '',
  telefono: '',
  titulo: '',
  tipo: 'Construcción de casa',
  mensaje: '',
  archivos: [], // [{ name, size, type, data (base64) }]
};

/* Formatea bytes a KB / MB */
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/* Icono por extensión */
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

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB por archivo
const MAX_FILES     = 8;

export default function Contacto() {
  const [form, setForm]           = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver]   = useState(false);
  const [error, setError]         = useState('');
  const [filesOpen, setFilesOpen] = useState(false);
  const fileInputRef              = useRef(null);

  const mk = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  /* ── Procesar archivos: convertir a base64 para que el dashboard
        pueda mostrarlos y permitir su descarga ── */
  const processFiles = (fileList) => {
    setError('');
    const files = Array.from(fileList || []);

    if (form.archivos.length + files.length > MAX_FILES) {
      setError(`Máximo ${MAX_FILES} archivos por solicitud.`);
      return;
    }

    files.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        setError(`"${file.name}" supera los 10 MB.`);
        return;
      }
      const fr = new FileReader();
      fr.onload = (e) => {
        setForm((f) => ({
          ...f,
          archivos: [
            ...f.archivos,
            { name: file.name, size: file.size, type: file.type, data: e.target.result },
          ],
        }));
      };
      fr.readAsDataURL(file);
    });
  };

  const removeFile = (idx) => {
    setForm((f) => ({ ...f, archivos: f.archivos.filter((_, i) => i !== idx) }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    /* Guardamos la solicitud en localStorage para que el dashboard la lea.
       Cuando exista backend real, aquí iría el POST a la API. */
    const nueva = {
      id: Date.now(),
      nombre: form.nombre,
      emailUser: form.email.split('@')[0] || form.email,
      emailDomain: form.email.split('@')[1] || '',
      telefono: form.telefono,
      titulo: form.titulo || '(sin título)',
      tipo: form.tipo,
      fecha: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
      estado: 'Nueva',
      mensaje: form.mensaje,
      archivos: form.archivos,
    };

    try {
      const prev = JSON.parse(localStorage.getItem('solicitudes') || '[]');
      localStorage.setItem('solicitudes', JSON.stringify([nueva, ...prev]));
    } catch (err) {
      console.error('Error guardando solicitud:', err);
    }

    setSubmitted(true);
  };

  const resetForm = () => { setForm(INITIAL); setSubmitted(false); setError(''); };

  return (
    <section className="contacto" id="contacto">
      <div className="contacto__triangle" />

      <div className="contacto__inner">
        {/* ── Col info ── */}
        <div className="contacto__info">
          <div className="contacto__eyebrow">
            <span className="contacto__eyebrow-dash" />
            <span className="contacto__eyebrow-text">Contacto</span>
          </div>
          <h2 className="contacto__title">Cuéntanos sobre tu proyecto</h2>
          <p className="contacto__desc">
            Cuéntanos qué quieres construir o remodelar y te preparamos una cotización
            sin compromiso. Respondemos en menos de 24 horas hábiles.
          </p>

          <div className="contacto__datos">
            <div className="contacto__dato">
              <span className="contacto__dato-sq" />
              <div>
                <div className="contacto__dato-label">Teléfono</div>
                <div className="contacto__dato-val">+1 (000) 000-0000</div>
              </div>
            </div>
            <div className="contacto__dato">
              <span className="contacto__dato-sq" />
              <div>
                <div className="contacto__dato-label">Email</div>
                <div className="contacto__dato-val">contacto@guzmaningenieria.com</div>
              </div>
            </div>
            <div className="contacto__dato">
              <span className="contacto__dato-sq" />
              <div>
                <div className="contacto__dato-label">Horario</div>
                <div className="contacto__dato-val">Lun – Sáb · 8:00 – 18:00</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Col formulario ── */}
        <div className="contacto__form-wrap">
          {submitted ? (
            <div className="contacto__success">
              <div className="contacto__success-header">
                <span className="contacto__success-check">✓</span>
                <span className="contacto__success-label">Solicitud enviada</span>
              </div>
              <h3 className="contacto__success-title">¡Gracias! Te contactaremos pronto.</h3>
              <p className="contacto__success-desc">
                Hemos recibido tu solicitud de cotización. Nuestro equipo la revisará
                y se pondrá en contacto contigo en menos de 24 horas hábiles.
              </p>
              <button type="button" className="contacto__reset-btn" onClick={resetForm}>
                Enviar otra solicitud
              </button>
            </div>
          ) : (
            <form className="contacto__form" onSubmit={onSubmit}>
              <div className="contacto__field">
                <label className="contacto__label">Nombre completo</label>
                <input
                  type="text" required
                  value={form.nombre} onChange={mk('nombre')}
                  placeholder="Tu nombre"
                  className="contacto__input"
                />
              </div>

              <div className="contacto__row">
                <div className="contacto__field">
                  <label className="contacto__label">Email</label>
                  <input
                    type="email" required
                    value={form.email} onChange={mk('email')}
                    placeholder="tu@email.com"
                    className="contacto__input"
                  />
                </div>
                <div className="contacto__field">
                  <label className="contacto__label">Teléfono</label>
                  <input
                    type="tel"
                    value={form.telefono} onChange={mk('telefono')}
                    placeholder="+1 000 000 0000"
                    className="contacto__input"
                  />
                </div>
              </div>

              <div className="contacto__field">
                <label className="contacto__label">Tipo de proyecto</label>
                <select className="contacto__input contacto__select" value={form.tipo} onChange={mk('tipo')}>
                  <option>Construcción de casa</option>
                  <option>Remodelación / ampliación</option>
                  <option>Ingeniería estructural</option>
                  <option>Otro</option>
                </select>
              </div>

              <div className="contacto__field">
                <label className="contacto__label">Título de la solicitud</label>
                <input
                  type="text" required
                  value={form.titulo} onChange={mk('titulo')}
                  placeholder="Ej. Construcción casa 2 pisos en zona norte"
                  className="contacto__input"
                  maxLength={120}
                />
              </div>

              <div className="contacto__field">
                <label className="contacto__label">Cuéntanos tu idea</label>
                <textarea
                  rows={5}
                  required
                  value={form.mensaje} onChange={mk('mensaje')}
                  placeholder="Describe con detalle tu proyecto: superficie, ubicación, plazos, presupuesto estimado..."
                  className="contacto__input contacto__textarea"
                />
              </div>

              {/* NUEVO: Adjuntar archivos — acordeón */}
              <div className="contacto__field">
                <button
                  type="button"
                  className={`contacto__accordion-head${filesOpen ? ' contacto__accordion-head--open' : ''}`}
                  onClick={() => setFilesOpen((v) => !v)}
                  aria-expanded={filesOpen}
                >
                  <span className="contacto__accordion-icon">📎</span>
                  <span className="contacto__accordion-label">
                    Adjuntar archivos
                    {form.archivos.length > 0 && (
                      <span className="contacto__accordion-count">{form.archivos.length}</span>
                    )}
                  </span>
                  <span className="contacto__accordion-hint">opcional</span>
                  <span className="contacto__accordion-chevron">{filesOpen ? '−' : '+'}</span>
                </button>

                {filesOpen && (
                  <div className="contacto__accordion-body">
                    <label
                      className={`contacto__dropzone${dragOver ? ' contacto__dropzone--active' : ''}`}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => { e.preventDefault(); setDragOver(false); processFiles(e.dataTransfer.files); }}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.webp,.xls,.xlsx,.csv,.doc,.docx,.dwg,.dxf,.zip"
                        onChange={(e) => { processFiles(e.target.files); e.target.value = ''; }}
                        style={{ display: 'none' }}
                      />
                      <span className="contacto__dropzone-icon">📎</span>
                      <span className="contacto__dropzone-text">
                        <strong>Haz clic o arrastra</strong> planos, fotos, PDFs o Excel
                      </span>
                      <span className="contacto__dropzone-formats">
                        PDF · JPG · PNG · XLSX · DOCX · DWG · ZIP
                      </span>
                      <span className="contacto__dropzone-limit">Máx 10 MB c/u · hasta 8 archivos</span>
                    </label>

                    {error && <div className="contacto__file-error">{error}</div>}

                    {form.archivos.length > 0 && (
                      <ul className="contacto__file-list">
                        {form.archivos.map((f, i) => (
                          <li key={i} className="contacto__file-item">
                            <span className="contacto__file-icon">{fileIcon(f.name)}</span>
                            <span className="contacto__file-name" title={f.name}>{f.name}</span>
                            <span className="contacto__file-size">{formatSize(f.size)}</span>
                            <button type="button" className="contacto__file-remove" onClick={() => removeFile(i)} aria-label="Quitar">
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <button type="submit" className="contacto__submit">
                Solicitar cotización gratis
                <span className="contacto__submit-sq" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
