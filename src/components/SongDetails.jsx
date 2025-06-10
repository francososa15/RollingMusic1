// src/components/SongDetails.jsx
const SongDetails = ({ song, onClose }) => {
    if (!song) return null;
  
    return (
      <div className="modal d-block fade show" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header bg-dark text-white">
              <div className="d-flex align-items-center">
                <i className="fas fa-music me-3 fs-4 text-warning"></i>
                <h4 className="modal-title mb-0 fw-bold">{song.trackName}</h4>
              </div>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            
            <div className="modal-body p-4">
              <div className="row">

                <div className="col-md-4 text-center mb-4 mb-md-0">
                  <img 
                    src={song.artworkUrl100.replace('100x100', '300x300')} 
                    alt={song.trackName} 
                    className="img-fluid rounded shadow album-cover"
                    style={{ width: "100%", maxWidth: "300px" }}
                  />
                  <div className="mt-3">
                    <button className="btn btn-warning btn-lg rounded-pill px-4">
                      <i className="fas fa-play me-2"></i>
                      Reproducir
                    </button>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4">
                      <h5 className="fw-bold text-primary mb-3">
                        <i className="fas fa-user-alt me-2"></i>
                        Información del Artista
                      </h5>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent">
                          <span className="fw-semibold">Artista:</span>
                          <span className="badge bg-primary rounded-pill">{song.artistName}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent">
                          <span className="fw-semibold">Álbum:</span>
                          <span>{song.collectionName}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent">
                          <span className="fw-semibold">Género:</span>
                          <span className="badge bg-success rounded-pill">{song.primaryGenreName}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <h5 className="fw-bold text-primary mb-3">
                        <i className="fas fa-headphones me-2"></i>
                        Vista Previa
                      </h5>
                      <div className="bg-light p-3 rounded">
                        <audio 
                          controls 
                          src={song.previewUrl} 
                          className="w-100"
                          style={{ minWidth: "250px" }}
                        >
                          Tu navegador no soporta el elemento de audio.
                        </audio>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer bg-light">
              <button 
                className="btn btn-outline-dark rounded-pill"
                onClick={onClose}
              >
                <i className="fas fa-times me-2"></i>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SongDetails;