import { useState, useEffect } from "react";
import ManualSongCard from "../components/ManualSongCard";

const AdminPage = () => {
  const [songData, setSongData] = useState({
    trackName: "",
    artistName: "",
    artworkUrl: "",
    previewUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [manualSongs, setManualSongs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedManualSongs = JSON.parse(localStorage.getItem("manualSongs") || "[]");
    setManualSongs(storedManualSongs);
  }, []);

  const handleChange = (e) => {
    setSongData({
      ...songData,
      [e.target.name]: e.target.value,
    });
  };

  // Validaciones
  const validate = (data) => {
    const newErrors = {};
    const textRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ .,'-]{2,50}$/;
    const urlRegex = /^(https?:\/\/)[^\s]+$/;
    const imageRegex = /^(https?:\/\/)[^\s]+\.(jpg|jpeg|png|gif|webp)$/i;

    // trackName
    if (!data.trackName.trim()) {
      newErrors.trackName = "El nombre es obligatorio.";
    } else if (data.trackName.length < 2 || data.trackName.length > 50) {
      newErrors.trackName = "Debe tener entre 2 y 50 caracteres.";
    } else if (!textRegex.test(data.trackName)) {
      newErrors.trackName = "Solo letras, números y caracteres válidos. Sin <, >, /, etc.";
    }

    // artistName
    if (!data.artistName.trim()) {
      newErrors.artistName = "El artista es obligatorio.";
    } else if (data.artistName.length < 2 || data.artistName.length > 50) {
      newErrors.artistName = "Debe tener entre 2 y 50 caracteres.";
    } else if (!textRegex.test(data.artistName)) {
      newErrors.artistName = "Solo letras, números y caracteres válidos. Sin <, >, /, etc.";
    }

    // artworkUrl
    if (!data.artworkUrl.trim()) {
      newErrors.artworkUrl = "La URL de la portada es obligatoria.";
    } else if (!imageRegex.test(data.artworkUrl)) {
      newErrors.artworkUrl = "Debe ser una URL de imagen válida (.jpg, .png, .jpeg, .gif, .webp).";
    }

    // previewUrl
    if (!data.previewUrl.trim()) {
      newErrors.previewUrl = "La URL de la canción es obligatoria.";
    } else if (!urlRegex.test(data.previewUrl)) {
      newErrors.previewUrl = "Debe ser una URL válida (http o https).";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(songData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      if (isEditing) {
        const updatedManualSongs = manualSongs.map((song) =>
          song.trackId === songData.trackId ? songData : song
        );
        setManualSongs(updatedManualSongs);
        localStorage.setItem("manualSongs", JSON.stringify(updatedManualSongs));
        setIsEditing(false);
      } else {
        const newSong = { ...songData, trackId: Date.now() };
        const updatedSongs = [...manualSongs, newSong];
        setManualSongs(updatedSongs);
        localStorage.setItem("manualSongs", JSON.stringify(updatedSongs));
      }
      setSongData({
        trackName: "",
        artistName: "",
        artworkUrl: "",
        previewUrl: "",
      });
      setErrors({});
    }
  };

  const handleDelete = (trackId) => {
    const updatedSongs = manualSongs.filter((song) => song.trackId !== trackId);
    setManualSongs(updatedSongs);
    localStorage.setItem("manualSongs", JSON.stringify(updatedSongs));
  };

  const handleEdit = (song) => {
    setSongData(song);
    setIsEditing(true);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">
          <i className="fas fa-cog me-2 text-primary"></i>
          Panel de Administración
        </h1>
        <span className="badge bg-primary">
          {manualSongs.length} {manualSongs.length === 1 ? 'Canción' : 'Canciones'}
        </span>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-0 pt-3">
              <h4 className="fw-bold">
                <i className={`fas ${isEditing ? 'fa-edit' : 'fa-plus-circle'} me-2 text-primary`}></i>
                {isEditing ? 'Editar Canción' : 'Agregar Nueva Canción'}
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="trackName" className="form-label fw-semibold">
                    <i className="fas fa-music me-2 text-primary"></i>
                    Nombre de la Canción
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg${errors.trackName ? ' is-invalid' : ''}`}
                    id="trackName"
                    name="trackName"
                    value={songData.trackName}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={50}
                    required
                  />
                  {errors.trackName && <div className="invalid-feedback">{errors.trackName}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="artistName" className="form-label fw-semibold">
                    <i className="fas fa-user me-2 text-primary"></i>
                    Artista
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg${errors.artistName ? ' is-invalid' : ''}`}
                    id="artistName"
                    name="artistName"
                    value={songData.artistName}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={50}
                    required
                  />
                  {errors.artistName && <div className="invalid-feedback">{errors.artistName}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="artworkUrl" className="form-label fw-semibold">
                    <i className="fas fa-image me-2 text-primary"></i>
                    URL de la Portada
                  </label>
                  <input
                    type="url"
                    className={`form-control form-control-lg${errors.artworkUrl ? ' is-invalid' : ''}`}
                    id="artworkUrl"
                    name="artworkUrl"
                    value={songData.artworkUrl}
                    onChange={handleChange}
                    required
                  />
                  {errors.artworkUrl && <div className="invalid-feedback">{errors.artworkUrl}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="previewUrl" className="form-label fw-semibold">
                    <i className="fas fa-link me-2 text-primary"></i>
                    URL de la Canción
                  </label>
                  <input
                    type="url"
                    className={`form-control form-control-lg${errors.previewUrl ? ' is-invalid' : ''}`}
                    id="previewUrl"
                    name="previewUrl"
                    value={songData.previewUrl}
                    onChange={handleChange}
                    required
                  />
                  {errors.previewUrl && <div className="invalid-feedback">{errors.previewUrl}</div>}
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  {isEditing && (
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary me-md-2"
                      onClick={() => {
                        setIsEditing(false);
                        setSongData({
                          trackName: "",
                          artistName: "",
                          artworkUrl: "",
                          previewUrl: "",
                        });
                      }}
                    >
                      <i className="fas fa-times me-1"></i> Cancelar
                    </button>
                  )}
                  <button type="submit" className="btn btn-primary px-4">
                    <i className={`fas ${isEditing ? 'fa-save' : 'fa-plus'} me-1`}></i>
                    {isEditing ? 'Guardar Cambios' : 'Agregar Canción'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white border-0 pt-3">
              <h4 className="fw-bold">
                <i className="fas fa-list me-2 text-primary"></i>
                Lista de Canciones
              </h4>
            </div>
            <div className="card-body p-0">
              {manualSongs.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-music fa-3x text-muted mb-3"></i>
                  <p className="text-muted">No hay canciones agregadas</p>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {manualSongs.map((song) => (
                    <div key={song.trackId} className="list-group-item list-group-item-action">
                      <div className="d-flex align-items-center">
                        <img
                          src={song.artworkUrl}
                          alt={song.trackName}
                          className="rounded me-3"
                          style={{ width: "60px", height: "60px", objectFit: "cover" }}
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-0 fw-bold">{song.trackName}</h6>
                          <small className="text-muted">{song.artistName}</small>
                        </div>
                        <div className="btn-group">
                          <button
                            className="btn btn-sm btn-outline-warning"
                            onClick={() => handleEdit(song)}
                            title="Editar"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(song.trackId)}
                            title="Eliminar"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="fw-bold mb-4">
          <i className="fas fa-eye me-2 text-primary"></i>
          Vista Previa
        </h4>
        <div className="row g-4">
          {manualSongs.length === 0 ? (
            <div className="col-12 text-center py-4 bg-light rounded">
              <i className="fas fa-info-circle fa-2x text-muted mb-3"></i>
              <p className="text-muted">Agrega canciones para ver la vista previa</p>
            </div>
          ) : (
            manualSongs.map((song) => (
              <div key={song.trackId} className="col-md-6 col-lg-4">
                <ManualSongCard
                  song={song}
                  isFavorite={false}
                  showLike={false}
                  onToggleFavorite={() => {}}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;