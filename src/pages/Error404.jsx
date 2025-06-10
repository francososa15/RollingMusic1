import React from 'react';

export default function Error404() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white text-center">
      <i className="fas fa-face-frown text-primary" style={{ fontSize: '5rem', animation: 'shake 1s infinite alternate' }}></i>
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="text-secondary mb-3">Página no encontrada</h2>
      <p className="text-muted mb-4">
        Lo sentimos, no pudimos encontrar lo que buscás.
      </p>
      <a href="/" className="btn btn-primary">Volver al inicio</a>

      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          100% { transform: translateX(-5px); }
        }
      `}</style>
    </div>
  );
}
