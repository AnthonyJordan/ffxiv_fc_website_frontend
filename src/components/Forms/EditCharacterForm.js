import React, { useState } from "react";
function EditCharacterForm({ user, characters, onCharacterUpdate }) {
  const [characterSelection, setCharacterSelection] = useState(0);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    house_location: "",
    role: "",
    bio: "",
    user_id: user ? user.id : null,
  });

  const options = characters.map((character) => (
    <option key={character.id} value={character.id}>
      {character.first_name + " " + character.last_name}
    </option>
  ));
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function editCharacter(e) {
    e.preventDefault();
    if (characterSelection === 0) {
      return;
    }
    sendCharacterToApi(formData);
  }

  function sendCharacterToApi(data) {
    fetch(`/characters/${characterSelection}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((character) => {
        onCharacterUpdate(character);
        setFormData({
          first_name: "",
          last_name: "",
          house_location: "",
          role: "",
          bio: "",
          user_id: user ? user.id : null,
        });
      });
  }

  function handleCharacterSelect(e) {
    const characterChoice = characters.find(
      (character) => character.id == e.target.value
    );
    const newFormData = {
      first_name: characterChoice.first_name,
      last_name: characterChoice.last_name,
      house_location: characterChoice.house_location,
      role: characterChoice.role,
      bio: characterChoice.bio,
      user_id: user ? user.id : null,
    };
    setCharacterSelection(e.target.value);
    setFormData(newFormData);
  }
  return (
    <div className="characterEditForm forms">
      <form onSubmit={(e) => editCharacter(e)}>
        <div>Edit Character</div>
        <div className="character-select">
          <select
            name="character_id"
            onChange={(e) => handleCharacterSelect(e)}
          >
            <option value="0">Select Character:</option>
            {options}
          </select>
        </div>
        <div>
          <label>First Name: </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <label> *</label>
        </div>
        <div>
          <label>Last Name: </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <label> *</label>
        </div>
        <div>
          <label>FC Role: </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Personal House Location: </label>
          <input
            type="text"
            name="house_location"
            value={formData.house_location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bio: </label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
        <div>* = required</div>
      </form>
    </div>
  );
}

export default EditCharacterForm;
