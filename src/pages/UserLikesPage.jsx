import { useEffect, useState } from "react";
import SongCard from "../components/SongCard";
import ManualSongCard from "../components/ManualSongCard";
import SongDetails from "../components/SongDetails";
import ManualSongCardDetails from "../components/ManualSongCardDetails";

const UserLikesPage = () => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [manualSongs, setManualSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const userEmail = "usuario@gmail.com";

  const loadFavoritesAndManualSongs = () => {
    const storedFavorites = JSON.parse(localStorage.getItem(userEmail + "_favorites") || "[]");
    const storedManualSongs = JSON.parse(localStorage.getItem("manualSongs") || "[]");

    setManualSongs(storedManualSongs);

    const updatedFavorites = storedFavorites.map((favorite) => {
      if (isApiSong(favorite)) {
        return favorite;
      } else {
        const updatedManualSong = storedManualSongs.find(
          (manualSong) => manualSong.trackId === favorite.trackId
        );
        return updatedManualSong || null;
      }
    }).filter(Boolean);

    if (JSON.stringify(updatedFavorites) !== JSON.stringify(storedFavorites)) {
      localStorage.setItem(userEmail + "_favorites", JSON.stringify(updatedFavorites));
    }

    setFavoriteSongs(updatedFavorites);
  };

  useEffect(() => {
    loadFavoritesAndManualSongs();
  }, [userEmail]);

  useEffect(() => {
    const handleStorageChange = () => {
      loadFavoritesAndManualSongs();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [userEmail]);

  const isApiSong = (song) => {
    return song.hasOwnProperty("artworkUrl100") && song.hasOwnProperty("previewUrl");
  };

  const handleCloseModal = () => setSelectedSong(null);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-0">
            <i className="fas fa-heart text-danger me-2"></i>
            Favoritos de Usuarios
          </h1>
          <p className="text-muted mb-0">Canciones más populares entre los usuarios</p>
        </div>
        <span className="badge bg-danger rounded-pill fs-6 px-3 py-2">
          {favoriteSongs.length} {favoriteSongs.length === 1 ? 'Canción' : 'Canciones'}
        </span>
      </div>
      {favoriteSongs.length === 0 ? (
        <div className="text-center py-5 my-5 bg-light rounded-3">
          <i className="fas fa-heart-broken fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">Aún no hay favoritos</h4>
          <p className="text-muted">Los usuarios no han marcado canciones como favoritas</p>
        </div>
      ) : (
        <div className="row g-4">
          {favoriteSongs.map((song) => (
            <div key={song.trackId} className="col-12">
              {isApiSong(song) ? (
                <SongCard
                  song={song}
                  showLike={false}
                  onLike={() => {}}
                  onClick={setSelectedSong}
                />
              ) : (
                <ManualSongCard
                  song={song}
                  onToggleFavorite={() => {}}
                  isFavorite={true}
                  showLike={false}
                  onClick={() => setSelectedSong(song)}
                />
              )}
            </div>
          ))}
        </div>
      )}
      {selectedSong && (
        isApiSong(selectedSong) ? (
          <SongDetails song={selectedSong} onClose={handleCloseModal} />
        ) : (
          <ManualSongCardDetails song={selectedSong} onClose={handleCloseModal} />
        )
      )}
    </div>
  );
};

export default UserLikesPage;