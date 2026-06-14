import React, { useState } from 'react';
import './Contacto.css';

const INITIAL = { nombre: '', email: '', telefono: '', tipo: 'Construcción de casa', mensaje: '' };

export default function Contacto() {
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const mk = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const onSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  const resetForm = () => setForm(INITIAL) || setSubmitted(false);

  return (
    <section className="contacto" id="contacto">
      {/* Triángulo rojo abajo-izquierda usando clip-path igual al diseño */}
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
            /* Estado de éxito */
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
            /* Formulario */
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
                <label className="contacto__label">Cuéntanos tu idea</label>
                <textarea
                  rows={4}
                  value={form.mensaje} onChange={mk('mensaje')}
                  placeholder="Describe brevemente tu proyecto..."
                  className="contacto__input contacto__textarea"
                />
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
