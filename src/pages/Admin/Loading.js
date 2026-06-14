import React from 'react';
import './Loading.css';

export default function Loading({ adminEmail }) {
  return (
    <div className="loading-page">
      <div className="loading-spinner" />
      <div className="loading-text">
        <div className="loading-text__main">Verificando acceso de administrador…</div>
        <div className="loading-text__email">{adminEmail}</div>
      </div>
    </div>
  );
}
