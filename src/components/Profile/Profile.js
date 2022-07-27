import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import CharacterDisplay from "../CharacterPages/CharacterDisplay";
import AddCharacterForm from "../Forms/AddCharacterForm";
import CharacterPictureForm from "../Forms/CharacterPictureForm";
import DeleteCharacterForm from "../Forms/DeleteCharacterForm";
import EditCharacterForm from "../Forms/EditCharacterForm";
import ScreenshotForm from "../Forms/ScreenshotForm";
import Gallery from "../Gallery/Gallery";

function Profile({ user }) {
  const [characters, setCharacters] = useState([]);

  const characterDisplays = characters.map((character) => (
    <CharacterDisplay key={character.id} character={character} />
  ));

  const characterGalleries = characters.map((character) => (
    <div key={character.id} className="profileGallery">
      {character.first_name + " " + character.last_name}
      <Gallery character={character} user={user} />
    </div>
  ));

  useEffect(() => {
    if (user) {
      fetch(`/user/${user.id}/characters`).then((r) => {
        if (r.ok) {
          r.json().then((characters) => setCharacters(characters));
        }
      });
    }
  }, [user]);

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

  function handleDeleteCharacter(id) {
    const updatedCharacters = characters.filter(
      (character) => character.id != id
    );
    setCharacters(updatedCharacters);
  }

  function handleNewScreenshot(characterId) {
    const character = characters.find(
      (character) => character.id == characterId
    );
    const clone = structuredClone(character);
    handleCharaterUpdate(clone);
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="profile">
      <div className="charactersOnProfile">{characterDisplays}</div>
      <div>
        <CharacterPictureForm
          characters={characters}
          onCharacterUpdate={handleCharaterUpdate}
        />
        <ScreenshotForm
          characters={characters}
          onNewScreenshot={handleNewScreenshot}
        />
      </div>
      <div>{characterGalleries}</div>
      <div className="characterForms">
        <AddCharacterForm user={user} onAddCharacter={handleAddCharacter} />
        <EditCharacterForm
          user={user}
          characters={characters}
          onCharacterUpdate={handleCharaterUpdate}
        />
        <DeleteCharacterForm
          characters={characters}
          onCharacterDelete={handleDeleteCharacter}
        />
      </div>
    </div>
  );
}

export default Profile;
