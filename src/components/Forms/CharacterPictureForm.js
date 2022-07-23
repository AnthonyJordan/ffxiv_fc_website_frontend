import React, { useState } from "react";

function CharacterPictureForm({ characters, onCharacterUpdate }) {
  const [characterSelection, setCharacterSelection] = useState(0);
  const options = characters.map((character) => (
    <option key={character.id} value={character.id}>
      {character.first_name + " " + character.last_name}
    </option>
  ));

  function handleFormChange(e) {
    setCharacterSelection(e.target.value);
  }
  function handleCharacterPicSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("character_picture", e.target.character_picture.files[0]);
    data.append("id", characterSelection);
    sendPictureToApi(data);
  }

  function sendPictureToApi(data) {
    fetch(`/characters/${characterSelection}`, {
      method: "PATCH",
      body: data,
    })
      .then((res) => res.json())
      .then((character) => onCharacterUpdate(character));
  }
  return (
    <div className="characterPictureBox">
      <div className="character-select">
        <select name="character_id" onChange={(e) => handleFormChange(e)}>
          <option value="0">Select Character:</option>
          {options}
        </select>
      </div>
      <div className="characterPictureForm">
        <form onSubmit={(e) => handleCharacterPicSubmit(e)}>
          <input type="file" name="character_picture" />
          <button type="submit">Upload Character Picture</button>
        </form>
      </div>
    </div>
  );
}

export default CharacterPictureForm;
