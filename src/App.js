import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import MembersPage from "./components/MembersPage";
import LoginSignUp from "./components/LoginSignUp";
import Gallery from "./components/Gallery";
import React, { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   // auto-login
  //   fetch("http://localhost:4000/users/sign_in").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);
  return (
    <div className="App">
      <NavBar user={user} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/members">
          <MembersPage />
        </Route>
        <Route exact path="/gallery">
          <Gallery />
        </Route>
        <Route exact path="/login">
          <LoginSignUp onLogin={setUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
