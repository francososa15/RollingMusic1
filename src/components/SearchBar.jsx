import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-100 mb-5">
      <div className="input-group input-group-lg shadow-sm">
        <span className="input-group-text bg-white border-end-0">
          <i className="fas fa-search text-muted"></i>
        </span>
        <input
          type="text"
          className="form-control border-start-0 py-3"
          placeholder="Buscar canción, artista o álbum..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={{ outline: 'none', boxShadow: 'none' }}
        />
        <button 
          className="btn btn-primary px-4" 
          type="submit"
          style={{ whiteSpace: 'nowrap' }}
        >
          <i className="fas fa-search me-2 d-none d-sm-inline"></i>
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;