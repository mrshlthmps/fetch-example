import { Fragment, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getCharacters, getCharacterQuotes } from './lib/charactersApi';
import DetailModal from './components/detailModal';

function App() {

  const [characters, setCharacters] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [quotes, setQuotes] = useState(null);

  useEffect(() => {
    getCharacters().then(data => {
      setCharacters(data.docs);
    });
  }, []);  // Runs once

  const handleSelection = async (c) => {
    // Retrieves data for the selected character to show on the modal
    const characterQuotes = await getCharacterQuotes(c._id);
    setQuotes(characterQuotes.docs);
    setSelectedCharacter(c);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {characters && characters.map(character => (
            <Fragment key={character._id}>
              <button className="btn" onClick={() => handleSelection(character)}>
                <h2>{character.name}</h2>
              </button>
              <br />
            </Fragment>
          ))}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {selectedCharacter !== null &&
        <DetailModal
          selectedCharacter={selectedCharacter}
          setSelectedCharacter={setSelectedCharacter}
          quotes={quotes}
        />
      }
    </div>
  );
}

export default App;
