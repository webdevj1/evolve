import React, { Component } from 'react';

import './App.css';
// import axios from 'axios';
// import {Link, Route, Switch} from 'react-router-dom';
import Sim from './simulator/sim.js';
import './simulator/sim.css';
// let src = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/';


class App extends Component {
  
  constructor(){
    super();
    this.state = {};
  }

  // componentDidMount(){
  //   axios.get('http://localhost:8000', {method: 'cors'})
  //   .then(res=>{this.setState({champs: res.data.data})})
  //   .catch(err=>console.log(err))
  // }


  // {Object.keys(this.state.champs).map(champ=>(
  //   <div>
  //      <br/>
  //     <p>{champ}</p>
  //     <img style={{borderRadius: '50%'}} src={`${src}${champ}.png`} />
  //   </div>
    
  // ))}

  render() {
    return (
      <div>
        <Sim />
      </div>
    );
  }
}

export default App;