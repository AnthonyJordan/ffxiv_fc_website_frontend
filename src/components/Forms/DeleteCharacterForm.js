import React, { useState } from "react";
function DeleteCharacterForm({ characters, onCharacterDelete }) {
  const [characterSelection, setCharacterSelection] = useState(0);
  const [confirmation, setConfirmation] = useState(false);
  const options = characters.map((character) => (
    <option key={character.id} value={character.id}>
      {character.first_name + " " + character.last_name}
    </option>
  ));
  function handleFormChange(e) {
    setCharacterSelection(e.target.value);
  }
  function handleDeleteClick() {
    if (confirmation) {
      fetch(`/characters/${characterSelection}`, {
        method: "DELETE",
      }).then(() => onCharacterDelete(characterSelection));
    }
  }

  function handleConfirmCheckbox() {
    setConfirmation(!confirmation);
  }

  return (
    <div className="deletecharacter forms">
      <div>Delete Character</div>
      <div className="character-select">
        <select name="character_id" onChange={(e) => handleFormChange(e)}>
          <option value="0">Select Character:</option>
          {options}
        </select>
      </div>
      <input
        type="checkbox"
        name="confirmation"
        onClick={() => handleConfirmCheckbox()}
      />
      <label>Confirm?</label>
      <div>
        <button onClick={() => handleDeleteClick()}>Delete Character</button>
      </div>
    </div>
  );
}

export default DeleteCharacterForm;
