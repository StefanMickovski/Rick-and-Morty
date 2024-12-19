import React from 'react';

function CharacterList({ characters }) {
  return (
    <div className="character-list">
      {characters.map((character) => (
        <div key={character.id} className="character-card">
          <h2>{character.name}</h2>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
        </div>
      ))}
    </div>
  );
}

export default CharacterList;
