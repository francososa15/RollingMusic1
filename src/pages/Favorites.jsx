import { useState, useEffect } from 'react';
import SongCard from '../components/SongCard';
import ManualSongCard from '../components/ManualSongCard';
import SongDetails from '../components/SongDetails';
import ManualSongCardDetails from '../components/ManualSongCardDetails';
import { useAuth } from '../context/AuthContext';

const Favorites = () => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [manualSongs, setManualSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  const loadFavoritesAndManualSongs = () => {
    const storedFavorites = JSON.parse(localStorage.getItem(currentUser.email + '_favorites') || '[]');
    const storedManualSongs = JSON.parse(localStorage.getItem('manualSongs') || '[]');

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
      localStorage.setItem(currentUser.email + '_favorites', JSON.stringify(updatedFavorites));
    }

    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    loadFavoritesAndManualSongs();
  }, [currentUser.email]);

  useEffect(() => {
    const handleStorageChange = () => {
      loadFavoritesAndManualSongs();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [currentUser.email]);

  const removeFavorite = (songToRemove) => {
    const updatedFavorites = favorites.filter(song => song.trackId !== songToRemove.trackId);
    setFavorites(updatedFavorites);
    localStorage.setItem(currentUser.email + '_favorites', JSON.stringify(updatedFavorites));
  };

  const isApiSong = (song) => {
    return song.hasOwnProperty('artworkUrl100') && song.hasOwnProperty('previewUrl');
  };

  const handleCloseModal = () => setSelectedSong(null);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-0">
            <i className="fas fa-heart text-danger me-2"></i>
            Mis Favoritos
          </h1>
          <p className="text-muted mb-0">@{currentUser.email.split('@')[0]}</p>
        </div>
        <span className="badge bg-danger rounded-pill fs-6 px-3 py-2">
          {favorites.length} {favorites.length === 1 ? 'Canción' : 'Canciones'}
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-5 my-5 bg-light rounded-3">
          <i className="fas fa-heart-broken fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">Aún no tienes favoritos</h4>
          <p className="text-muted">Agrega canciones a tus favoritos para verlas aquí</p>
        </div>
      ) : (
        <div className="row g-4">
          {favorites.map((song) => (
            <div key={song.trackId} className="col-12">
              {isApiSong(song) ? (
                <SongCard
                  song={song}
                  showLike={true}
                  onLike={() => removeFavorite(song)}
                  isFavorite={true}
                  onClick={setSelectedSong}
                />
              ) : (
                <ManualSongCard
                  song={song}
                  onToggleFavorite={removeFavorite}
                  isFavorite={true}
                  showLike={true}
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

export default Favorites;