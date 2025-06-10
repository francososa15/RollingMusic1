import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import SongCard from "../components/SongCard";
import ManualSongCard from "../components/ManualSongCard";
import SongDetails from "../components/SongDetails";
import ManualSongCardDetails from "../components/ManualSongCardDetails";
import { searchSongs } from "../services/itunesService";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();
  const [songs, setSongs] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem(currentUser.email + "_favorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [manualSongs, setManualSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    const storedManualSongs = localStorage.getItem("manualSongs");
    if (storedManualSongs) {
      setManualSongs(JSON.parse(storedManualSongs));
    }
  }, []);

  const handleSearch = async (term) => {
    try {
      const results = await searchSongs(term);
      setSongs(results);
    } catch (error) {
      console.error("Error al buscar canciones:", error);
    }
  };

  const handleToggleFavorite = (song) => {
    const isFav = favorites.some((fav) => fav.trackId === song.trackId);
    let updatedFavorites = isFav
      ? favorites.filter((fav) => fav.trackId !== song.trackId)
      : [...favorites, song];

    setFavorites(updatedFavorites);
    localStorage.setItem(
      currentUser.email + "_favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  const handleCloseModal = () => setSelectedSong(null);

  const isApiSong = (song) => {
    return song.hasOwnProperty("artworkUrl100") && song.hasOwnProperty("previewUrl");
  };

  return (
    <div className="home-container">
      <div className="hero-section bg-primary text-white py-5 mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-4 fw-bold">
                <i className="fas fa-music me-3"></i>
                Bienvenido, {currentUser.email.split('@')[0]}
              </h1>
              <p className="lead">Descubre tu próxima canción favorita</p>
            </div>
            <div className="col-md-4 text-end d-none d-md-block">
              <i className="fas fa-headphones fa-4x opacity-25"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="search-container mb-5">
          <SearchBar onSearch={handleSearch} />
        </div>

        {songs.length > 0 && (
          <div className="mb-5">
            <h3 className="mb-4 d-flex align-items-center">
              <i className="fas fa-search me-3 text-secondary"></i>
              Resultados de búsqueda
            </h3>
            <div className="row g-4">
              {songs.map((song) => (
                <div key={song.trackId} className="col-12">
                  <SongCard
                    song={song}
                    onLike={handleToggleFavorite}
                    showLike={true}
                    isFavorite={favorites.some((fav) => fav.trackId === song.trackId)}
                    onClick={setSelectedSong}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {manualSongs.length > 0 && (
          <div className="manual-songs-section">
            <h3 className="mb-4 d-flex align-items-center">
              <i className="fas fa-star me-3 text-warning"></i>
              Selección exclusiva del Admin
            </h3>
            <div className="row g-4">
              {manualSongs.map((song) => (
                <div key={song.trackId} className="col-12 col-md-6 col-lg-4">
                  <ManualSongCard
                    song={song}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.some((fav) => fav.trackId === song.trackId)}
                    showLike={true}
                    onClick={() => setSelectedSong(song)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {songs.length === 0 && manualSongs.length === 0 && (
          <div className="empty-state text-center py-5">
            <i className="fas fa-music fa-4x text-muted mb-4"></i>
            <h4 className="text-muted">No hay canciones para mostrar</h4>
            <p className="text-muted">Busca algo en la barra de búsqueda o espera a que el admin agregue canciones</p>
          </div>
        )}

        {selectedSong &&
          (isApiSong(selectedSong) ? (
            <SongDetails song={selectedSong} onClose={handleCloseModal} />
          ) : (
            <ManualSongCardDetails song={selectedSong} onClose={handleCloseModal} />
          ))}
      </div>
    </div>
  );
};

export default Home;