import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import CharacterDisplay from "./CharacterDisplay";
import AddCharacterForm from "./Forms/AddCharacterForm";
import CharacterPictureForm from "./Forms/CharacterPictureForm";

function Profile({ user, onUserUpdate }) {
  const [characters, setCharacters] = useState([]);

  const characterDisplays = characters.map((character) => (
    <CharacterDisplay key={character.id} character={character} />
  ));

  useEffect(() => {
    if (user) {
      fetch(`/user/${user.id}/characters`).then((r) => {
        if (r.ok) {
          r.json().then((characters) => setCharacters(characters));
        }
      });
    }
  }, []);

  function handleAddCharacter(character) {
    const updatedCharacters = [...characters, character];
    setCharacters(updatedCharacters);
  }
  function handleCharaterUpdate(updatedCharacter) {
    const updatedCharacters = characters.map((character) => {
      if (character.id === updatedCharacter.id) {
        return updatedCharacter;
      } else {
        return character;
      }
    });
    setCharacters(updatedCharacters);
  }

  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <div className="profile">
      {characterDisplays}
      <CharacterPictureForm
        characters={characters}
        onCharacterUpdate={handleCharaterUpdate}
      />
      <div>
        <AddCharacterForm user={user} onAddCharacter={handleAddCharacter} />
      </div>
    </div>
  );
}

export default Profile;
