import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Ocurrió un error al iniciar sesión' + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light bg-gradient">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '450px' }}>
        <div className="card-body p-sm-4">
          <div className="text-center mb-4">
            <i className="fas fa-music fa-3x text-primary mb-3"></i>
            <h2 className="fw-bold text-dark">Bienvenido de vuelta</h2>
            <p className="text-muted">Ingresa a tu cuenta</p>
          </div>

          {error && (
            <div className="alert alert-danger d-flex align-items-center">
              <i className="fas fa-exclamation-circle me-2"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                <i className="fas fa-envelope me-2 text-primary"></i>
                Email
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="fas fa-user text-muted"></i>
                </span>
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg border-start-0"
                  placeholder="tucorreo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold">
                <i className="fas fa-lock me-2 text-primary"></i>
                Contraseña
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="fas fa-key text-muted"></i>
                </span>
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg border-start-0"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-end mt-2">
                <Link to="/no-existe" className="text-decoration-none small text-muted">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <button
              className="btn btn-primary btn-lg w-100 py-3 fw-bold shadow-sm"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Ingresando...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Ingresar
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-4 pt-3 border-top">
            <p className="text-muted mb-0">
              ¿No tienes una cuenta?{' '}
              <Link to="/no-existe" className="text-primary fw-bold text-decoration-none">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
