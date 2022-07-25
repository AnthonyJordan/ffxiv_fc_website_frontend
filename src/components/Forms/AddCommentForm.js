import React, { useState, useEffect } from "react";
function AddCommentForm({ user, screenshot, onAddComment }) {
  const [comment, setComment] = useState("");
  const [characterSelection, setCharacterSelection] = useState(0);
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    if (user) {
      fetch(`/user/${user.id}/characters`).then((r) => {
        if (r.ok) {
          r.json().then((characters) => setCharacters(characters));
        }
      });
    }
  }, [user]);

  function handleChange(e) {
    setComment(e.target.value);
  }
  function handleCharacterSelect(e) {
    setCharacterSelection(e.target.value);
  }
  function addComment(e) {
    e.preventDefault();
    if (characterSelection === 0) {
      return;
    }
    fetch(`/characters/${characterSelection}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment_text: comment,
        screenshot_id: screenshot.id,
      }),
    })
      .then((res) => res.json())
      .then((comment) => onAddComment(comment));
  }
  const options = characters.map((character) => (
    <option key={character.id} value={character.id}>
      {character.first_name + " " + character.last_name}
    </option>
  ));
  return (
    <div className="addCommentForm">
      <div onSubmit={(e) => addComment(e)}>
        <form>
          <label>Add Comment: </label>
          <div className="character-select">
            <select
              name="character_id"
              onChange={(e) => handleCharacterSelect(e)}
            >
              <option value="0">Select Character:</option>
              {options}
            </select>
          </div>
          <input name="comment" value={comment} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddCommentForm;
