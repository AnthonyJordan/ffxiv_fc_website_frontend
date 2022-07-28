import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/Home";
import CharactersPage from "./components/CharacterPages/CharactersPage";
import LoginSignUp from "./components/Profile/LoginSignUp";
import Gallery from "./components/Gallery/Gallery";
import Profile from "./components/Profile/Profile";
import React, { useState, useEffect } from "react";
import PasswordResetRequest from "./components/Forms/PasswordResetRequest";
import NewPasswordForm from "./components/Forms/NewPasswordForm";

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch("/users/sign_in").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function logout() {
    setUser(null);
    history.push("/");
  }

  return (
    <div className="main">
      <NavBar user={user} onLogout={logout} />
      <div className="display">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/members">
            <CharactersPage user={user} />
          </Route>
          <Route exact path="/gallery">
            <Gallery user={user} />
          </Route>
          <Route exact path="/login">
            <LoginSignUp onLogin={setUser} user={user} />
          </Route>
          <Route exact path="/profile">
            <Profile user={user} onUserUpdate={setUser} />
          </Route>
          <Route exact path="/forgot_password">
            <PasswordResetRequest />
          </Route>
          <Route exact path="/reset_password">
            <NewPasswordForm />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
