import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Authentication from "./components/Authentication/Authentication";
import Login from "./components/Login/Login";
import Join from "./components/Join/Join";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Login} />
        <Route path='/signup' component={Authentication} />
        <Route path='/join' component={Join} />
        <Route path="/chat" component={Chat} />
      </Router>
    </div>
  );
}

export default App;
