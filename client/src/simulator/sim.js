import React, {Component} from 'react';
import axios from 'axios';
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
            pickItems: [],
            pickSplash: '',
            counter: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png',
            counterName: '',
            counterItems: [],
            counterSplash: ''
        };
    }

  componentDidMount() {
    axios.get('http://localhost:8000')
    .then(res => {
        this.setState({
            champsData: res.data.data, // Importing the champ data
            champs: Object.keys(res.data.data) //Grabs the champs names for their images
        });
    })
    .catch(err => console.log(err));
  }

    handleClick = e =>{
        const {champsData} = this.state;
        let alt = e.target.alt; //champ's name
        this.setState({
            pick: e.target.src, //changing the empty square with the champ user clicked
            pickName: alt, //renders the clicked champ's name under the picture
            counter: `http://ddragon.leagueoflegends.com/cdn/8.6.1/img/champion/${champsData[alt].counters[0].champion}.png`, //gives the image of the counter champ on the right
            counterName: champsData[alt].counters[0].champion, //renders the counter champ's name under the picture on the right
            counterSplash: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champsData[alt].counters[0].champion}_0.jpg`
        });

        axios.get('http://localhost:8000/itemsbuild')
        .then(res=>{
            res.data.map(build=>{
                let items = build.hashes.finalitemshashfixed.highestWinrate.hash.replace(/-/g, ' ').split(' '); // gets all the items to complete build
                if(Number(champsData[alt].key) === build.championId){ // looking for the clicked champ's items
                    this.setState({
                        pickItems: items //storing it in the state
                    });
                };
                if(Number(champsData[champsData[alt].counters[0].champion].key) === build.championId){ //Looking for the counter champ's items
                    this.setState({
                        counterItems: items
                    });
                };
            });
        })
        .catch(err=>console.log(err));
    }

    handleRoles = e => {
        let lanes = e.target.name; //getting the name of the lanes for the lanes images
        axios
        .get('http://localhost:8000/roles') //getting list of champs according to lanes
        .then(res => {
            this.setState({
            champs: res.data[lanes] // filters the champs available according to the lanes clicked on
            });
        })
    };

    render(){
        const {champs, pick, pickName, counter, counterName, pickItems, counterItems, pickSplash, counterSplash} = this.state;
        return(
            <div>
                <input width="500px" className="summonername" placeholder="Search for a user or champions"/>
                <br/>
                <br/>
                <div className="allroles">
                <img onClick={this.handleRoles} name="all" className='roles' src={allChamps} alt="" />
                <img onClick={this.handleRoles} name="top" className='roles' src={top} />
                <img onClick={this.handleRoles} name="mid" className='roles' src={mid} />       {/*  All of the lanes available  */}
                <img onClick={this.handleRoles} name="support" className='roles' src={support} />
                <img onClick={this.handleRoles} name="bot" className='roles' src={bottom} />
                <img onClick={this.handleRoles} name="jungle" className='roles' src={jungle} /> {" "}
                </div>
          
        
                <div id="simulator">
                    <div className="choices">
                        <div className="goodWith">
                        <div> <p className="itemname">Your champion</p> </div>
                            <div id="pick" className="info">    
                                <p style={{fontSize: '20px'}}><img src={pick} alt='champ' className='champ-choice1' />{''}</p>
                                <p className="pickname">{pickName}</p>
                            </div>
                        </div>
                        {pickItems.length > 0 ? <p className="itemname">Suggested Item Build</p> : ''} {/* Conditional to check if any champ was clicked */}
                        {pickItems.map(item=>{
                            if(!isNaN(Number(item))){ //items list includes the word item... Just making sure to ignore it and just focus on the actual item numbers
                                return(
                                    <img className='items' src={`http://ddragon.leagueoflegends.com/cdn/8.6.1/img/item/${item}.png`} alt={item} />
                                )
                            }
                        })}
                    </div>
                    <div id="champs">
                   
                        {champs.map((champ, key)=>(
                            <img onClick={this.handleClick} className="choose grow" src={`http://ddragon.leagueoflegends.com/cdn/8.6.1/img/champion/${champ}.png`} alt={champ} key={key} />
                        ))}       
                    </div>
                    <div className="choices">
                        <div className="counter">
                            <div> <p className="itemname">Counter champion</p> </div>
                            <p style={{fontSize: '20px'}} ><img onDragOver={this.handleOver} onDrop={this.handleDrop} src={counter} alt='champ' className='champ-choice1' /> </p>
                            <p className="pickname">{counterName}</p>
                        </div>
                        {counterItems.length > 0 ? <p className="itemname">Suggested Item Build</p> : ''}
                        {counterItems.map(item=>{
                            if(!isNaN(Number(item))){
                                return(
                                    <img className='items' src={`http://ddragon.leagueoflegends.com/cdn/8.6.1/img/item/${item}.png`} alt={item} />
                                )
                            }
                        })}
                    </div>
                </div>
                <h1>MORE INFO</h1>
            </div>
    );
  };
};

export default Sim;