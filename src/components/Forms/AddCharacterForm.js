import React, { useState } from "react";

function AddCharacterForm({ user, onAddCharacter }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    house_location: "",
    role: "",
    bio: "",
    user_id: user ? user.id : null,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      .then((character) => {
        onAddCharacter(character);
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

  return (
    <div className="characterCreateForm forms">
      <form onSubmit={(e) => createCharacter(e)}>
        <div>Add New Character</div>
        <div>
          <div>First Name *</div>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <div>Last Name *</div>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <div>FC Role</div>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </div>
        <div>
          <div>Personal House Location</div>
          <input
            type="text"
            name="house_location"
            value={formData.house_location}
            onChange={handleChange}
          />
        </div>
        <div>
          <div>Bio</div>
          <textarea
            className="formTextArea"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
        <div>* = required</div>
      </form>
    </div>
  );
}

export default AddCharacterForm;
