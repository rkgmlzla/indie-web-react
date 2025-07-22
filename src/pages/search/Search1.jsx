import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Searchbar from '../../components/ui/searchbar';
import './Search1.css';

function Search1() {
  const navigate = useNavigate();
  const [recent, setRecent] = useState([]);

  const handleSearch = (keyword) => {
    const updated = [keyword, ...recent.filter((w) => w !== keyword)];
    setRecent(updated.slice(0, 10));
    navigate(`/search1/result?keyword=${keyword}`);
  };

  const handleDelete = (target) => {
    setRecent((prev) => prev.filter((word) => word !== target));
  };

  return (
    <div className="search-page">
      <Searchbar onSearch={handleSearch} />

      <div className="recent">
        <h4>최근 검색어</h4>
        <div className="recent-list">
          {recent.map((word, idx) => (
            <div key={idx} className="recent-chip">
              {word}
              <button onClick={() => handleDelete(word)} className="close-btn">
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search1;
