import React from 'react';

/*
  Logo SVG — transcripción EXACTA de Logo.dc.html

  El ícono SVG usa height:'1em', width:'auto' → hereda font-size del padre.
  En horizontal: el div padre tiene font-size:46px → ícono = 46px alto.
  En stacked:    el div padre tiene font-size:62px → ícono = 62px alto.
  En iso:        el div padre tiene font-size:56px → ícono = 56px alto.

  El navbar aplica scale(0.84) externamente al logo completo.
  Nosotros lo replicamos pasando el font-size ya escalado.

  Props:
    variant  "horizontal" | "stacked" | "iso"
    theme    "light" | "dark"
    color    override de color
    scale    factor de escala (default 1.0 — el navbar pasa 0.84)
*/

/* El SVG exacto del diseño: height/width vía font-size del padre */
const Mark = ({ color }) => (
  <svg
    viewBox="0 0 128 118"
    style={{ display: 'block', height: '1em', width: 'auto', overflow: 'visible' }}
    aria-hidden="true"
  >
    <g fill="none" stroke={color} strokeWidth={15}
       strokeLinejoin="miter" strokeLinecap="square">
      <path d="M64 13 L18 51 L18 105 L110 105 L110 61 L77 61" />
      <path d="M64 13 L97 40" />
      <path d="M91 35 L91 17 L105 17 L105 49" />
    </g>
    <rect x={78} y={67} width={30} height={34} fill="#C70100" />
  </svg>
);

export default function Logo({
  variant = 'horizontal',
  theme   = 'light',
  color,
  scale   = 1,
}) {
  const c = color ?? (theme === 'dark' ? '#ffffff' : '#0a0a0a');

  if (variant === 'horizontal') {
    /* font-size:46px ícono, gap:13px, GUZMAN:30px, sub:8.2px, subMt:4px */
    return (
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 13 * scale,
        fontFamily: 'Montserrat, system-ui, sans-serif',
        lineHeight: 1,
        color: c,
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: scale !== 1 ? 'left center' : undefined,
      }}>
        {/* Ícono: font-size controla height:'1em' del SVG */}
        <div style={{ fontSize: 46 * scale }}>
          <Mark color={c} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontSize: 30 * scale,
            fontWeight: 800,
            letterSpacing: '-0.012em',
            lineHeight: 1,
          }}>GUZMAN</div>
          <div style={{
            fontSize: 8.2 * scale,
            fontWeight: 700,
            letterSpacing: '0.135em',
            marginTop: 4 * scale,
            lineHeight: 1,
          }}>INGENIERÍA Y CONSTRUCCIÓN</div>
        </div>
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Montserrat, system-ui, sans-serif',
        lineHeight: 1,
        color: c,
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: scale !== 1 ? 'center center' : undefined,
      }}>
        <div style={{ fontSize: 62 * scale, marginBottom: 13 * scale }}>
          <Mark color={c} />
        </div>
        <div style={{ fontSize: 50 * scale, fontWeight: 800, letterSpacing: '-0.012em' }}>
          GUZMAN
        </div>
        <div style={{ fontSize: 13 * scale, fontWeight: 700, letterSpacing: '0.17em', marginTop: 5 * scale }}>
          INGENIERÍA Y CONSTRUCCIÓN
        </div>
      </div>
    );
  }

  if (variant === 'iso') {
    return (
      <div style={{
        display: 'inline-flex',
        fontFamily: 'Montserrat, system-ui, sans-serif',
        lineHeight: 1,
        color: c,
        fontSize: 56 * scale,
      }}>
        <Mark color={c} />
      </div>
    );
  }

  return null;
}
