import React from 'react';
import './SearchStudent.css';

const SearchStudent = ({ searchTerm, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by ID or Name..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      {searchTerm && (
        <button onClick={() => onSearch('')}>Clear</button>
      )}
    </div>
  );
};

export default SearchStudent;
