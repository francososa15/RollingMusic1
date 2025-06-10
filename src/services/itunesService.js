// src/services/itunesService.js
export const searchSongs = async (term) => {
    const formattedTerm = encodeURIComponent(term);
    const response = await fetch(`https://itunes.apple.com/search?term=${formattedTerm}&entity=song&limit=20`);
    const data = await response.json();
    return data.results;
  };
  