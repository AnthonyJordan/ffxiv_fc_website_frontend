import { useEffect, useState } from "react";
import CharacterDisplay from "./CharacterDisplay";
import CharacterGallery from "./CharacterGallery";
import CharactersList from "./CharactersList";

function CharactersPage({ user }) {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetch("/characters").then((r) => {
      if (r.ok) {
        r.json().then((characters) => setCharacters(characters));
      }
    });
  }, []);
  const [character, setCharacter] = useState([]);
  return (
    <div className="characterspage">
      <CharactersList characters={characters} onCharacterClick={setCharacter} />
      <CharacterDisplay character={character} />
      <CharacterGallery />
    </div>
  );
}

export default CharactersPage;
