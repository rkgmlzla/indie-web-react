import './tab.css';
import React from 'react';

function Tab({ options, activeTab, onChange }) {
  return (
    <div className="tabs">
      {options.map((tab) => (
        <button
          key={tab}
          className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
          onClick={() => onChange(tab)}>
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Tab;
