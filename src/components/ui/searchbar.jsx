import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './searchbar.css';

function SearchBar({ value, onChange, onSearch }) {
  const handleSearch = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    onSearch(trimmed);
  };

  return (
    <div className="search-bar">
      <div className="search-bar__input">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={value} // ⬅️ 부모로부터 전달된 상태
          onChange={onChange} // ⬅️ 부모에서 setKeyword
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Search className="search" onClick={handleSearch} />
      </div>
    </div>
  );
}

export default SearchBar;
