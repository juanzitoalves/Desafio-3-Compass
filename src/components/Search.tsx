import React, { useState } from 'react';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    alert(`Procurando por: ${query}`);
  };

  return (
    <div>
      <h2>Pesquisa</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite sua pesquisa"
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default Search;
