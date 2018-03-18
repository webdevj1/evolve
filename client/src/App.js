import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
let src = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/';

class App extends Component {
  
  state = {champs: {}};

  componentDidMount(){
    axios.get('http://localhost:8000', {method: 'cors'})
    .then(res=>{this.setState({champs: res.data.data})})
    .catch(err=>console.log(err))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {Object.keys(this.state.champs).map(champ=>(
          <div>
             <br/>
            <p>{champ}</p>
            <img style={{borderRadius: '50%'}} src={`${src}${champ}.png`} />
          </div>
          
        ))}
      </div>
    );
  }
}

export default App;
