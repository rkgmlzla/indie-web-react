//Search4.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Searchbar from '../../components/ui/searchbar';
import Tab from '../../components/ui/tab';
import './Search4.css';

function Search4({ keyword: initialKeyword = '' }) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [tab, setTab] = useState('자유게시판');
  const navigate = useNavigate();

  const tabOptions = ['공연/공연장', '아티스트', '자유게시판'];

  const handleTabChange = (newTab) => {
    setTab(newTab);
    if (newTab === '공연/공연장') {
      navigate(`/search1/result?keyword=${keyword}`);
    } else if (newTab === '아티스트') {
      navigate(`/search3?keyword=${keyword}`);
    }
  };

  return (
    <div className="search4-page">
      <Searchbar onSearch={setKeyword} defaultValue={keyword} />
      <Tab options={tabOptions} activeTab={tab} onChange={handleTabChange} />
    </div>
  );
}

export default Search4;
