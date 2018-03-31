import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import './App.css';
import Sim from './simulator/sim.js';
import './simulator/sim.css';
import evolve from "./images/Evolve.png";
import Lang from './Lang/lang.js';
import './Lang/lang.css'


class App extends Component {
  
  render() {
    return (
      <div>
        <Link to="/"><img alt="" src={evolve} className="Logo"/></Link>
        <Link to='/language' > LoL Terminology </Link>
        <Switch>
          <Route exact path='/' component={Sim} />
          <Route path='/language' component={Lang} />
        </Switch>
      </div>
    );
  }
}

export default App;