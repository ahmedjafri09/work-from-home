import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Authentication from './app/Authentication';
import Home from './app/Home';
import './App.css';

function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Authentication} />
          <Route path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
