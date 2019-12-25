import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Players from './Players/Players';
import Player from './Player/Player';
import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/' component={Players}/>
        <Route exact path='/player/:playerId' component={Player}/>
      </div>
    );
  }
}

export default App;