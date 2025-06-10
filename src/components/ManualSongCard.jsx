import React from "react";

const ManualSongCard = ({ song, onToggleFavorite, isFavorite, showLike, onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(song);
  };

  return (
    <div 
      className="card mb-4 song-card shadow-sm hover-effect" 
      onClick={() => onClick(song)} 
      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
    >
      <div className="row g-0 align-items-center">
        {/* Album Art */}
        <div className="col-md-1 col-3">
          <div className="position-relative">
            <img
              src={song.artworkUrl || 'https://via.placeholder.com/300x300?text=No+Image'}
              alt={song.trackName}
              className="img-fluid rounded-start album-cover"
              style={{ height: "60px", width: "60px", objectFit: "cover" }}
            />
            <div className="album-overlay">
              <i className="fas fa-music text-white"></i>
            </div>
          </div>
        </div>

        <div className="col-md-8 col-6">
          <div className="card-body py-2">
            <h5 className="card-title text-truncate mb-1">{song.trackName}</h5>
            <p className="card-text text-muted small mb-0">{song.artistName}</p>
            {song.genre && (
              <span className="badge bg-secondary mt-1">{song.genre}</span>
            )}
          </div>
        </div>

        {showLike && (
          <div className="col-md-3 col-3 text-end pe-3">
            <button
              className={`btn btn-sm like-btn ${isFavorite ? "btn-favorite" : "btn-outline-favorite"}`}
              onClick={handleClick}
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

export default ManualSongCard;