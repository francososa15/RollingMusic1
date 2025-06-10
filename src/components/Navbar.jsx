
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="fas fa-rocket me-2"></i>
          <span>Mi App</span>
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
              <Link className="nav-link d-flex align-items-center" to="/about">
                <i className="fas fa-user me-2"></i>
                <span>About Me</span>
              </Link>
            </li>
            
            {currentUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center" to="/favoritos">
                    <i className="fas fa-heart me-2"></i>
                    <span>Favoritos</span>
                  </Link>
                </li>
                
                {currentUser.role === "admin" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link d-flex align-items-center" to="/admin">
                        <i className="fas fa-lock me-2"></i>
                        <span>Admin</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link d-flex align-items-center" to="/likes">
                        <i className="fas fa-thumbs-up me-2"></i>
                        <span>Likes de Usuarios</span>
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
                      <button className="dropdown-item" onClick={logout}>
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
                      onClick={logout}
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
                <Link className="nav-link d-flex align-items-center" to="/login">
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