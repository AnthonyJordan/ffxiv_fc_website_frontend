import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

function LoginSignUp({ onLogin, user }) {
  const [loginBool, setLoginBool] = useState(true);
  const button = loginBool ? (
    <div>
      <span>Login or </span>
      <button onClick={() => setLoginBool(!loginBool)}>Sign Up</button>
    </div>
  ) : (
    <div>
      <span>Sign Up or </span>
      <button onClick={() => setLoginBool(!loginBool)}>Login</button>
    </div>
  );
  return (
    <div className="LoginSignUp">
      {button}
      {loginBool ? (
        <LoginPage onLogin={onLogin} user={user} />
      ) : (
        <SignUpPage onLogin={onLogin} user={user} />
      )}
    </div>
  );
}
export default LoginSignUp;