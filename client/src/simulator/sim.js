import React, {Component} from 'react';
import axios from 'axios';
import evolve from "../images/Evolve.png"
import top from "../images/Roles/Top_icon.png"
import mid from "../images/Roles/Mid_icon.png"
import bottom from "../images/Roles/Bottom_icon.png"
import jungle from "../images/Roles/Jungle_icon.png"
import allChamps from "../images/Roles/Fill_Icon.png"
import support from "../images/Roles/Support_Icon.png"

class Sim extends Component{
    constructor(){
        super();
        this.state = {
            champsData: {},
            champs:[],
            pick: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png',
            pickName: '',
            counter: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png',
            hold:'',
            counterName: ''
        };
    }

    componentDidMount(){
        axios.get('http://localhost:8000')
    .then(res=>{
        this.setState({
            champsData: res.data.data, 
            champs: Object.keys(res.data.data)
        })

    })
    .catch(err=>console.log(err))
    }

    handleClick = e =>{
        const {champsData} = this.state;
        let alt = e.target.alt;
        this.setState({
            pick: e.target.src, 
            pickName: alt,
            counter: `http://ddragon.leagueoflegends.com/cdn/8.6.1/img/champion/${champsData[alt].counters[0].champion}.png`,
            counterName: champsData[alt].counters[0].champion
        });
    }

    handleRoles = e =>{
        localStorage.setItem('role', e.target.name)
        axios.get('http://localhost:8000/roles')
        .then(res=>{
            this.setState({champs: res.data[localStorage.getItem('role')]});
        });
    };

    render(){
        const {champs, pick, pickName, counter, counterName} = this.state;
        return(
            <div>
                <a href="/"><img alt="" src={evolve} className="Logo"/></a>
                <input width="500px" placeholder="Enter your Summoner name"/>
                <h2>Pick Your Champion!</h2>
                <img onClick={this.handleRoles} name="all" className='roles' src={allChamps} alt="" />
                <img onClick={this.handleRoles} name="top" className='roles' src={top} />
                <img onClick={this.handleRoles} name="mid" className='roles' src={mid} />
                <img onClick={this.handleRoles} name="support" className='roles' src={support} />
                <img onClick={this.handleRoles} name="bot" className='roles' src={bottom} />
                <img onClick={this.handleRoles} name="jungle" className='roles' src={jungle} />

                <div id="simulator">
                    <div className="choices" >
                        <div className="goodWith">
                            <div id="pick" className="info">    
                                <p style={{fontSize: '20px'}}><img onDragOver={this.handleOver} onDrop={this.handleDrop} src={pick} alt='champ' className='champ-choice1' />{pickName}</p>
                            </div>
                        </div>
                    </div>
                    <div id="champs">
                        {champs.map((champ, key)=>(
                            <img onClick={this.handleClick} onDragStart={this.handleDragStart} draggable={true} onDrag={this.handleDrag} onDragEnd={this.handleEnd} className="choose" src={`http://ddragon.leagueoflegends.com/cdn/8.6.1/img/champion/${champ}.png`} alt={champ} key={key} />
                        ))}
                    </div>
                    <div className="choices">
                        <div className="counter">
                            <div> <p>Counter</p> </div>
                            <p style={{fontSize: '20px'}} ><img onDragOver={this.handleOver} onDrop={this.handleDrop} src={counter} alt='champ' className='champ-choice1' />{counterName}</p>
                            <p id="counter">{''}</p>
                        </div>
                    </div>
                </div>
                <h1>MORE INFO</h1>
            </div>
        );
    };
};

export default Sim;