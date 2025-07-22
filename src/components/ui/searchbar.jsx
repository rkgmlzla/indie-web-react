import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './searchbar.css';

function SearchBar({ onSearch, defaultValue = '' }) {
  const [keyword, setKeyword] = useState(defaultValue);
  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (!trimmed) return;

    onSearch(trimmed); // 상위로 검색어 전달
    // setKeyword('');
  };
  return (
    <div className="search-bar">
      <div className="search-bar__input">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Search className="search" onClick={handleSearch} />
      </div>
    </div>
  );
}

export default SearchBar;
