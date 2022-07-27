import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function LoginPage({ onLogin, user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/users/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
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
    <div className="loginPage">
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
        <button type="submit">{isLoading ? "Loading..." : "Login"}</button>

        <div>{errors}</div>
      </form>
    </div>
  );
}
export default LoginPage;
