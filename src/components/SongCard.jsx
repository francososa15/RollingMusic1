// src/components/SongCard.jsx
const SongCard = ({ song, onLike, showLike, isFavorite, onClick }) => {
  return (
    <div 
      className="card mb-4 song-card shadow-sm hover-effect" 
      onClick={() => onClick(song)} 
      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
    >
      <div className="row g-0 align-items-center">
        <div className="col-md-1 col-3">
          <div className="position-relative">
            <img
              src={song.artworkUrl100.replace('100x100', '300x300')}
              alt={song.trackName}
              className="img-fluid rounded-start album-cover"
            />
            <div className="album-overlay">
              <i className="fas fa-play text-white"></i>
            </div>
          </div>
        </div>
        <div className="col-md-8 col-6">
          <div className="card-body py-2">
            <h5 className="card-title text-truncate mb-1">{song.trackName}</h5>
            <p className="card-text text-muted small mb-2">{song.artistName}</p>
            <div className="audio-player">
              <audio controls src={song.previewUrl} className="w-100">
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>
          </div>
        </div>
        {showLike && (
          <div
            className="col-md-3 col-3 text-end pe-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`btn btn-sm like-btn ${isFavorite ? "btn-favorite" : "btn-outline-favorite"}`}
              onClick={() => onLike(song)}
              aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              <i className={`${isFavorite ? "fas" : "far"} fa-heart me-2`}></i>
              <span className="d-none d-md-inline">
                {isFavorite ? "Quitar favorito" : "Favorito"}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongCard;