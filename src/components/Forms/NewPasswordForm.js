import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function NewPasswordForm() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    password_reset_token: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function createCharacter(e) {
    e.preventDefault();
    sendNewPassword(formData);
  }

  function sendNewPassword(data) {
    fetch(`/users/reset_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((r) => {
        alert(r.alert);
        history.push("/");
      });
  }

  return (
    <div className="loginSignUp">
      <form onSubmit={(e) => createCharacter(e)}>
        <div>Reset Password</div>
        <div>
          <div>Email</div>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <div>New Password</div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <div>Confirm Password</div>
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
          />
        </div>
        <div>
          <div>Password Reset Token</div>
          <input
            type="text"
            name="password_reset_token"
            value={formData.password_reset_token}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
        <div>* = required</div>
      </form>
    </div>
  );
}

export default NewPasswordForm;
