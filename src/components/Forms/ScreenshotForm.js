import React, { useState } from "react";

function ScreenshotForm({ characters, onNewScreenshot }) {
  const [characterSelection, setCharacterSelection] = useState(0);
  const [errors, setErrors] = useState([]);
  const options = characters.map((character) => (
    <option key={character.id} value={character.id}>
      {character.first_name + " " + character.last_name}
    </option>
  ));

  function handleFormChange(e) {
    setCharacterSelection(e.target.value);
  }
  function handleScreenShotSubmit(e) {
    e.preventDefault();
    if (characterSelection === 0) {
      return;
    }
    const data = new FormData();
    data.append("image", e.target.image.files[0]);
    data.append("character_id", characterSelection);
    sendPictureToApi(data);
  }

  function sendPictureToApi(data) {
    fetch(`/characters/${characterSelection}/screenshots`, {
      method: "POST",
      body: data,
    }).then((r) => {
      if (r.ok) {
        r.json().then(() => onNewScreenshot(characterSelection));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  return (
    <div className="screenshotBox">
      <div>Upload Screenshot</div>
      <div>10 maximum images</div>
      <div className="character-select">
        <select name="character_id" onChange={(e) => handleFormChange(e)}>
          <option value="0">Select Character:</option>
          {options}
        </select>
      </div>
      <div className="screenshotForm">
        <form onSubmit={(e) => handleScreenShotSubmit(e)}>
          <input type="file" name="image" />
          <button type="submit">Upload image</button>
        </form>
      </div>
      {errors}
    </div>
  );
}

export default ScreenshotForm;
