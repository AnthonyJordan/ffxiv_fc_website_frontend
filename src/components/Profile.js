import React, { useState, useEffect } from "react";
import CharacterDisplay from "./CharacterDisplay";

function Profile({ user, onUserUpdate }) {
  const [characters, setCharacters] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    house_location: "",
    role: "",
    bio: "",
    user_id: user ? user.id : null,
  });
  const characterDisplays = characters.map((character) => (
    <CharacterDisplay character={character}></CharacterDisplay>
  ));

  useEffect(() => {
    fetch(`/user/${user.id}/characters`).then((r) => {
      if (r.ok) {
        r.json().then((characters) => setCharacters(characters));
      }
    });
  }, []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleProfilePicSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("profile_picture", e.target.profile_picture.files[0]);
    data.append("id", user.id);
    sendPictureToApi(data);
  }

  function sendPictureToApi(data) {
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      body: data,
    })
      .then((res) => res.json())
      .then((user) => onUserUpdate(user));
  }

  function createCharacter(e) {
    e.preventDefault();
    sendCharacterToApi(formData);
  }

  function sendCharacterToApi(data) {
    fetch(`/characters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((character) => setCharacters([...characters, character]));
  }

  return (
    <div className="profile">
      {console.log(characters)}
      {characterDisplays}
      <form onSubmit={(e) => handleProfilePicSubmit(e)}>
        <label>Profile Picture</label>
        <input type="file" name="profile_picture" />
        <button type="submit">Upload Profile Picture</button>
      </form>

      <form onSubmit={(e) => createCharacter(e)}>
        <label>First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <label>Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <label>Role</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
        <label>Bio</label>
        <input
          type="text"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Profile;
