import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function SignUpPage({ onLogin, user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        password_confirmation: passwordConfirmation,
        inviteCode,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  if (user) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="signUpPage">
      <form onSubmit={handleSubmit}>
        <div>
          <div>Email</div>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <div>Password</div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <div>Confirm Password</div>
          <input
            type="password"
            id="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          ></input>
        </div>
        <div>
          <div>FC Invite Code</div>
          <input
            type="text"
            id="inviteCode"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
          ></input>
        </div>
        <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
        <div>{errors}</div>
      </form>
    </div>
  );
}
export default SignUpPage;
