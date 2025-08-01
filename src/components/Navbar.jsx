// src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="fas fa-rocket me-2"></i>
          <span>RollingMusic</span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link d-flex align-items-center${location.pathname === "/about" ? " active" : ""}`} to="/about">
                <i className="fas fa-user me-2"></i>
                <span>Sobre mí</span>
              </Link>
            </li>
            
            {currentUser ? (
              <>
                <li className="nav-item">
                  <Link className={`nav-link d-flex align-items-center${location.pathname === "/favoritos" ? " active" : ""}`} to="/favoritos">
                    <i className="fas fa-heart me-2"></i>
                    <span>Favoritos</span>
                  </Link>
                </li>
                
                {currentUser.role === "admin" && (
                  <>
                    <li className="nav-item">
                      <Link className={`nav-link d-flex align-items-center${location.pathname === "/admin" ? " active" : ""}`} to="/admin">
                        <i className="fas fa-lock me-2"></i>
                        <span>Administrador</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link d-flex align-items-center${location.pathname === "/likes" ? " active" : ""}`} to="/likes">
                        <i className="fas fa-thumbs-up me-2"></i>
                        <span>Likes de usuarios</span>
                      </Link>
                    </li>
                  </>
                )}
                
                <li className="nav-item dropdown d-lg-none">
                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fas fa-user-circle me-2"></i>
                    {currentUser.email}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="userDropdown">
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </li>
                
                <li className="nav-item d-none d-lg-block">
                  <div className="d-flex align-items-center">
                    <span className="navbar-text me-3">
                      <i className="fas fa-user-circle me-2"></i>
                      {currentUser.email}
                    </span>
                    <button 
                      className="btn btn-outline-light" 
                      onClick={handleLogout}
                      title="Cerrar sesión"
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      <span className="d-none d-md-inline ms-2">Salir</span>
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className={`nav-link d-flex align-items-center${location.pathname === "/login" ? " active" : ""}`} to="/login">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  <span>Iniciar sesión</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;