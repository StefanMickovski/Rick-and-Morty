import React from 'react';

function FilterStatus({ status, setStatus }) {
  return (
    <label>
      Status:
      <select onChange={(e) => setStatus(e.target.value)} value={status}>
        <option value="">All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
    </label>
  );
}

export default FilterStatus;
