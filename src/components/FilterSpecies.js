import React from 'react';

function FilterSpecies({ species, setSpecies }) {
  return (
    <label>
      Species:
      <select onChange={(e) => setSpecies(e.target.value)} value={species}>
        <option value="">All</option>
        <option value="Human">Human</option>
        <option value="Alien">Alien</option>
        <option value="Robot">Robot</option>
      </select>
    </label>
  );
}

export default FilterSpecies;
