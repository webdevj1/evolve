import React, {Component} from 'react';
import axios from 'axios';
import evolve from "../images/Evolve.png"
import top from "../images/Roles/Top_icon.png"
import mid from "../images/Roles/Mid_icon.png"
import bottom from "../images/Roles/Bottom_icon.png"
import jungle from "../images/Roles/Jungle_icon.png"
import allChamps from "../images/Roles/Fill_Icon.png"
import support from "../images/Roles/Support_Icon.png"

class Hi extends Component{
    constructor(){
        super();
        this.state = {
            champsData: {},
            champs:[]
        };
    }

    componentDidMount(){
        axios.get('http://localhost:8000')
    .then(res=>{
        this.setState({champs: Object.keys(res.data.data)})
    })
    .catch(err=>console.log(err))
    }

    handleDrag = e =>{
        localStorage.setItem('drop', e.target.src);
        localStorage.setItem('champ', e.target.alt);
    }
    handleDrop = e =>{
        e.preventDefault();
        e.target.src = localStorage.getItem('drop');
        e.target.parentNode.childNodes[1].nodeValue = localStorage.getItem('champ')
    }
    handleOver = e =>{
        e.preventDefault();
    }

    handleRoles = e =>{
        localStorage.setItem('role', e.target.name)
        axios.get('http://localhost:8000/roles')
        .then(res=>{
            this.setState({champs: res.data[localStorage.getItem('role')]});
        });
    }

    render(){
        const {champs} = this.state;
       
        return(
            <div>
               <img alt="" src={evolve} className="Logo"/>
                
                <input width="500px" placeholder="Enter your Summoner name"/>
                <h2>Pick Your Champion!</h2>
                <img onClick={this.handleRoles} name="fighter" className='roles' src={allChamps} alt="" />
                <img onClick={this.handleRoles} name="tank" className='roles' src={top} />
                <img onClick={this.handleRoles} name="mage" className='roles' src={mid} />
                <img onClick={this.handleRoles} name="support" className='roles' src={support} />
                <img onClick={this.handleRoles} name="marksman" className='roles' src={bottom} />
                <img onClick={this.handleRoles} name="marksman" className='roles' src={jungle} />

                <div id="simulator">
                    <div className="choices" >
                        <div className="goodWith">
                            <div className="info">    
                                <p style={{fontSize: '20px'}}><img onDragOver={this.handleOver} onDrop={this.handleDrop} src= 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png' alt='champ' className='champ-choice' />{''}</p>
                            </div>
                        </div>
                    </div>
                    <div id="champs">
                        {champs.map((champ, key)=>(
                            <img draggable={true} onDrag={this.handleDrag} onDragEnd={this.handleEnd} className="choose" src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${champ}.png`} alt={champ} key={key} />
                        ))}
                    </div>
                    <div className="choices">
                        <div className="counter">
                            <p style={{fontSize: '20px'}} ><img onDragOver={this.handleOver} onDrop={this.handleDrop} src= 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png' alt='champ' className='champ-choice1' />{''}</p>
    
                        </div>
                    </div>
                </div>
                <h1>MORE INFO</h1>
            </div>
        );
    };
};

export default Hi;