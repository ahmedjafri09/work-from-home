import React, { useState } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import tokenService from "./services/token.service";
import "./App.css";
import Profile from "./components/Profile";

function App() {
  const [token, setToken] = useState();

  if (token) {
    tokenService(token);
  } else {
    const oldToken = localStorage.getItem("token");
    if (oldToken) setToken(oldToken);
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login setToken={setToken} />
          </Route>
          <Route path="/profile">
            <Profile token={token} />
          </Route>
          <Route exact path="/">
            <Blogs token={token} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
