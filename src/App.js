import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/Home";
import CharactersPage from "./components/CharactersPage";
import LoginSignUp from "./components/LoginSignUp";
import Gallery from "./components/Gallery";
import Profile from "./components/Profile";
import React, { useState, useEffect } from "react";

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
          <Route exact path="/members">
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
        </Switch>
      </div>
    </div>
  );
}

export default App;
