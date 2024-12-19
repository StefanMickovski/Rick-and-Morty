import React from 'react';

function Filter({ status, setStatus, species, setSpecies }) {
  return (
    <div className="filters">
      <label>
        Status:
        <select onChange={(e) => setStatus(e.target.value)} value={status}>
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </label>

      <label>
        Species:
        <select onChange={(e) => setSpecies(e.target.value)} value={species}>
          <option value="">All</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Robot">Robot</option>
        </select>
      </label>
    </div>
  );
}

export default Filter;
