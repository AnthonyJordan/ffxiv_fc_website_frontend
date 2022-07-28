import { useState } from "react";

function PasswordResetRequest() {
  const [email, setEmail] = useState("");
  function handleChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/users/forgot_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    })
      .then((r) => r.json())
      .then((r) => alert(r.alert))
      .catch((e) => alert(e.errors));
  }

  return (
    <div className="loginSignUp">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>Reset Password</div>
        <div>Email</div>
        <div>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PasswordResetRequest;
