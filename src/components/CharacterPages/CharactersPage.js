import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import CharactersList from "./CharactersList";
import CharacterDisplay from "./CharacterDisplay";
import Gallery from "../Gallery/Gallery";

function CharactersPage({ user }) {
  const [characters, setCharacters] = useState([]);
  const [character, setCharacter] = useState([]);

  useEffect(() => {
    fetch("/characters").then((r) => {
      if (r.ok) {
        r.json().then((characters) => setCharacters(characters));
      }
    });
  }, []);

  return (
    <div className="charactersPage">
      <Route path={"/members"}>
        <CharactersList
          characters={characters}
          onCharacterClick={setCharacter}
        />
        <div>
          <Route
            exact
            path={`/members/${character.first_name + character.last_name}`}
          >
            <CharacterDisplay character={character} />
            <Gallery character={character} user={user} />
          </Route>
        </div>
      </Route>
    </div>
  );
}

export default CharactersPage;
