import React, { useState } from "react";

function Profile({ user }) {
  const [formData, setFormData] = useState(
    user ? user : { first_name: "", last_name: "", role: "", bio: "" }
  );

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleProfilePicSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("user[profile_picture]", e.target.profile_picture.files[0]);
    data.append("user[id]", user.id);
    sendToApi(data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendToApi(formData);
  }

  function sendToApi(data) {
    fetch(`http://localhost:4000/users`, {
      headers: {
        "X-User-Email": user.email,
        "X-User-Token": user.authentication_token,
      },
      method: "PATCH",
      body: data,
    })
      .then((res) => res.json)
      .then((data) => console.log(data));
  }

  return (
    <div className="profile">
      {console.log(user)}
      <form onSubmit={(e) => handleProfilePicSubmit(e)}>
        <label>Profile Picture</label>
        <input type="file" name="profile_picture" />
        <button type="submit">Upload Profile Picture</button>
      </form>

      <form onSubmit={(e) => handleSubmit(e)}>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.first_name}
          onChange={handleChange}
        />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
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
