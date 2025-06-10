import React from "react";

const AboutMe = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg overflow-hidden">
            <div className="row g-0">
              <div className="col-md-4 bg-primary d-flex align-items-center justify-content-center p-4">
                <div className="text-center text-white">
                  <i className="fas fa-user-circle fa-7x mb-3"></i>
                  <h3 className="fw-bold">Franco Sosa</h3>
                </div>
              </div>
              
              <div className="col-md-8">
                <div className="card-body p-4 p-lg-5">
                  <h2 className="card-title display-5 fw-bold mb-4 text-primary">
                    <i className="fas fa-code me-3"></i>
                    ¡Hola! Soy Franco Sosa
                  </h2>
                  
                  <p className="lead mb-4">
                    Apasionado por crear experiencias digitales increíbles y siempre aprendiendo nuevas tecnologías.
                  </p>
                  
                  <div className="mb-4">
                    <h5 className="fw-bold mb-3">
                      <i className="fas fa-cogs me-2 text-primary"></i>
                      Mis habilidades
                    </h5>
                    <div className="d-flex flex-wrap gap-2">
                      <span className="badge bg-primary bg-opacity-10 text-primary fs-6 p-2">
                        <i className="fab fa-react me-1"></i> React
                      </span>
                      <span className="badge bg-primary bg-opacity-10 text-primary fs-6 p-2">
                        <i className="fab fa-js me-1"></i> JavaScript
                      </span>
                      <span className="badge bg-primary bg-opacity-10 text-primary fs-6 p-2">
                        <i className="fab fa-html5 me-1"></i> HTML5
                      </span>
                      <span className="badge bg-primary bg-opacity-10 text-primary fs-6 p-2">
                        <i className="fab fa-css3-alt me-1"></i> CSS3
                      </span>
                      <span className="badge bg-primary bg-opacity-10 text-primary fs-6 p-2">
                        <i className="fab fa-bootstrap me-1"></i> Bootstrap
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="fw-bold mb-3">
                      <i className="fas fa-rocket me-2 text-primary"></i>
                      Mi filosofía
                    </h5>
                    <p className="mb-0">
                      Creo en el código limpio, diseño responsivo y experiencias de usuario excepcionales. 
                      Siempre buscando superar expectativas y crear soluciones innovadoras.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;