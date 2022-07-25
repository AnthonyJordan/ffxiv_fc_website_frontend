import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

function LoginSignUp({ onLogin, user }) {
  const [loginBool, setLoginBool] = useState(true);
  return (
    <div className="LoginSignUp">
      <button onClick={() => setLoginBool(!loginBool)}>
        {loginBool ? "Sign Up" : "Login"}{" "}
      </button>
      {loginBool ? (
        <LoginPage onLogin={onLogin} user={user} />
      ) : (
        <SignUpPage onLogin={onLogin} user={user} />
      )}
    </div>
  );
}
export default LoginSignUp;
