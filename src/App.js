import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from './queries'; 
import { translations } from './translations'; 
import Filter from './components/Filter';
import Sort from './components/Sort';
import './App.css';

function App() {
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allCharacters, setAllCharacters] = useState([]);
  const [language, setLanguage] = useState('en');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page: currentPage, status, species },
    notifyOnNetworkStatusChange: true, 
  });

  const lastCharacterElementRef = useRef();

  const getStatusTranslation = (status) => {
    if (status === 'Alive') return translations[language].alive;
    if (status === 'Dead') return translations[language].dead;
    return translations[language].unknown; 
  };

  const sortedCharacters = (characters) => {
    const charactersClone = [...characters];
    if (sortBy === 'name') {
      return charactersClone.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'origin') {
      return charactersClone.sort((a, b) => a.origin.name.localeCompare(b.origin.name));
    }
    return charactersClone;
  };

  useEffect(() => {
    if (loadingMore || !data) return;

    const handleScroll = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setLoadingMore(true);
        setCurrentPage((prev) => prev + 1);
      }
    };

    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observerInstance = new IntersectionObserver(handleScroll, options);
    if (lastCharacterElementRef.current) {
      observerInstance.observe(lastCharacterElementRef.current);
    }

    return () => observerInstance.disconnect();
  }, [data, loadingMore]);

  useEffect(() => {
    if (loadingMore) {
      fetchMore({
        variables: {
          page: currentPage,
          status,
          species,
        },
      }).then(({ data: newData }) => {
        setLoadingMore(false);
        if (newData && newData.characters && newData.characters.results) {
          setAllCharacters((prevCharacters) => [
            ...prevCharacters,
            ...newData.characters.results,
          ]);
        }
      });
    }
  }, [currentPage, fetchMore, loadingMore, status, species]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  useEffect(() => {
    setAllCharacters([]); 
    setCurrentPage(1); 
  }, [status, species, sortBy]);

  if (loading && currentPage === 1) return <p>{translations[language].loading}</p>;
  if (error) return <p>Error: {error.message}</p>;

  const characters = allCharacters || [];

  return (
    <div className="App">
      <h1>{translations[language].title}</h1>

      <div className="filters">
        <Filter status={status} setStatus={setStatus} species={species} setSpecies={setSpecies} />
        <Sort sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <div className="character-list">
        {sortedCharacters(characters).map((character) => (
          <div key={character.id} className="character-card">
            <h2>{character.name}</h2>
            <p>
              <strong>{translations[language].status}:</strong> {getStatusTranslation(character.status)}
            </p>
            <p>
              <strong>{translations[language].species}:</strong> {character.species}
            </p>
            <p>
              <strong>{translations[language].gender}:</strong> {character.gender}
            </p>
            <p>
              <strong>{translations[language].origin}:</strong> {character.origin.name}
            </p>
          </div>
        ))}
      </div>

      {loadingMore && <p>{translations[language].loadingMore}</p>}

      <div ref={lastCharacterElementRef} />

      <footer>
        <button className="language-button" onClick={toggleDropdown}>
          {translations[language].language}
        </button>
        {dropdownOpen && (
          <ul className="language-dropdown">
            <li onClick={() => changeLanguage('en')}>English</li>
            <li onClick={() => changeLanguage('mk')}>Macedonian</li>
            <li onClick={() => changeLanguage('de')}>German</li>
          </ul>
        )}
      </footer>
    </div>
  );
}

export default App;
