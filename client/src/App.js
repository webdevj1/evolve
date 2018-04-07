import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import './App.css';
import Sim from './simulator/sim.js';
import './simulator/sim.css';
import evolve from "./images/Evolve.png";
import MoreInfo from './champInfo/champInfo.js';



class App extends Component {
  
  render() {
    return (
      <div>
        <Link to="/"><img alt="EVOLVE" src={evolve} className="Logo"/></Link>

        <Switch>
          <Route exact path='/' component={Sim} />
          <Route path='/champions'  component={MoreInfo} />
        </Switch>
      </div>
    );
  }
}

export default App;