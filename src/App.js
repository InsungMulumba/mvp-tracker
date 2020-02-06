import React, { Component } from 'react';
import NavBar from './mvp-tracker/NavBar/NavBar';
import Players from './mvp-tracker/Players/Players';
import Player from './mvp-tracker/Player/Player';
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