import { useEffect, useState } from "react";
import CharacterDisplay from "./CharacterDisplay";
import Gallery from "../Gallery/Gallery";
import CharactersList from "./CharactersList";

function CharactersPage({ user }) {
  const [characters, setCharacters] = useState([]);
  const [character, setCharacter] = useState([]);
  const selectionDiv = character.first_name ? (
    <div>
      <CharacterDisplay character={character} />
      <Gallery character={character} user={user} />
    </div>
  ) : null;
  useEffect(() => {
    fetch("/characters").then((r) => {
      if (r.ok) {
        r.json().then((characters) => setCharacters(characters));
      }
    });
  }, []);

  return (
    <div className="characterspage">
      <CharactersList characters={characters} onCharacterClick={setCharacter} />
      {selectionDiv}
    </div>
  );
}

export default CharactersPage;
