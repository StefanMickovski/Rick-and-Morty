import React from 'react';

function Sort({ sortBy, setSortBy }) {
  return (
    <label>
      Sort By:
      <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
        <option value="name">Name</option>
        <option value="origin">Origin</option>
      </select>
    </label>
  );
}

export default Sort;
