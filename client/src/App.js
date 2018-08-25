import React, { Component } from 'react';
import './App.css';
import Sim from './Components/simulator/sim.js';
import Notes from './Components/notes/notes';



class App extends Component {
  render() {
    return (
      <div>
        <Sim />
        <Notes />
      </div>
    );
  }
}

export default App;