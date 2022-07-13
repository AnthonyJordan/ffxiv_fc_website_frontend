import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

function LoginSignUp({ onLogin }) {
  const [loginBool, setLoginBool] = useState(true);
  return (
    <div className="LoginSignUp">
      <button onClick={() => setLoginBool(!loginBool)}>
        {loginBool ? "Login" : "Sign Up"}{" "}
      </button>
      {loginBool ? (
        <LoginPage onLogin={onLogin} />
      ) : (
        <SignUpPage onLogin={onLogin} />
      )}
    </div>
  );
}
export default LoginSignUp;
