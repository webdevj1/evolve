import React, {Component} from 'react';
import axios from 'axios';
import top from "../images/Roles/Top_icon.png"
import mid from "../images/Roles/Mid_icon.png"
import bottom from "../images/Roles/Bottom_icon.png"
import jungle from "../images/Roles/Jungle_icon.png"
import allChamps from "../images/Roles/Fill_Icon.png"
import support from "../images/Roles/Support_Icon.png"
import {database} from "../firebase.js"
import _ from 'lodash';


class Sim extends Component{
    constructor(props){
        super(props);
        this.state = {
            champsData: {},
            champs:[],
            items: [],
            pick: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png',
            pickName: '',
            pickItems: [],
            counters: [],
            counter: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png',
            counterName: '',
            counterItems: [],
            title: '',
            body: '',
            notes: ''
        };
        //bind handler 
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.renderNotes = this.renderNotes.bind(this);
    }
    // handle chang for usernotes
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
            
        })
        console.log(e.target.value)
    }

    // handle submit
    handleSubmit(e){
        e.preventDefault()
        console.log('submit clicked');
        const note ={
            title:this.state.title,
            body:this.state.body
        }
        database.push(note);
        this.setState({
            title:'',
            body:''
            
        })
    }
    //lifeCycle
  componentDidMount() {
   
        axios.get('https://obscure-thicket-24605.herokuapp.com/')
        .then(res => {
            this.setState({
                champsData: res.data.data, // Importing the champ data
                champs: Object.keys(res.data.data) //Grabs the champs names for their images
            });
        })
        .catch(err => console.log(err));

        database.on('value', snapshot =>{
            //go to database listen on value and get snapshot of data
            this.setState({notes: snapshot.val()});
            });
            
    axios.get('http://localhost:8000/items')
    .then(res =>{
        this.setState({
            items: res.data.data
        });
    });
  }

    handleClick = e =>{
        const {champsData} = this.state;
        let alt = e.target.alt; //champ's name
        
        this.setState({
            pick: e.target.src, //changing the empty square with the champ user clicked
            pickName: alt, //renders the clicked champ's name under the picture
            counters: champsData[alt].counters,
            counter: `http://ddragon.leagueoflegends.com/cdn/8.6.1/img/champion/${champsData[alt].counters[0].champion}.png`, //gives the image of the counter champ on the right
            counterName: champsData[alt].counters[0].champion, //renders the counter champ's name under the picture on the right
        
        });

        axios.get('https://obscure-thicket-24605.herokuapp.com/itemsbuild')
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
        .get('https://obscure-thicket-24605.herokuapp.com/roles') //getting list of champs according to lanes
        .then(res => {
            this.setState({
            champs: res.data[lanes] // filters the champs available according to the lanes clicked on
            });
        })
    };

    handleInput = e =>{
        let name = e.target.value
        const {champs} = this.state;
        axios
        .get('https://obscure-thicket-24605.herokuapp.com/roles') //getting list of champs according to lanes
        .then(res => {
            let champions = res.data.all
            let newChamps = champions.filter(champ=>{
                if(champ.toLowerCase().startsWith(name.toLowerCase())){
                    return champ;
                }
            });
            if(newChamps.length !== 0){
                this.setState({champs: newChamps})
            }
        })
        
      }

      //render usernotes from database
      renderNotes(){
                //_lodash.map(collection, callbackfunction(note, key))
        return _.map(this.state.notes, (note, key)=>{
                return(
                    
                    <div key={key} className="champs1" > 
                        <h3>{note.title}</h3>
                        <p>{note.body}</p>
                    </div>
                )
        });
      }

    handleItems = (e) =>{
        const {items} = this.state;
        let key = e.target.alt
        let popup = document.getElementById(key);
        popup.innerHTML = `${items[key].name} <br/> <br/> ${items[key].description}`;
        popup.classList.toggle('show');
    }

    render(){
        const {champsData, champs, items, pick, pickName, counter, counters, counterName, pickItems, counterItems, userInputChamp} = this.state;
        let hide = !pickName?'none':'';
        
        let pickImage = !pickName? `url("http://apollo-na-uploads.s3.amazonaws.com/1427669031664/SRBackground.png")` : `url('http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${pickName}_0.jpg')`;
        let counterImage = !counterName? `url("http://apollo-na-uploads.s3.amazonaws.com/1427669031664/SRBackground.png")` : `url('http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${counterName}_0.jpg')`;
        return(
            <div>

                <input onChange={this.handleInput} className="summonername" placeholder="Search for a champion"/>
                <br/>
                <br/>
                <div className="allroles">
                    <img onClick={this.handleRoles} name="all" className='roles' src={allChamps} alt="all" />
                    <img onClick={this.handleRoles} name="top" className='roles' src={top} alt="top"/>
                    <img onClick={this.handleRoles} name="mid" className='roles' src={mid} alt="mid"/>       {/*  All of the lanes available  */}
                    <img onClick={this.handleRoles} name="support" className='roles' src={support} alt="support"/>
                    <img onClick={this.handleRoles} name="bot" className='roles' src={bottom} alt="bot"/>
                    <img onClick={this.handleRoles} name="jungle" className='roles' src={jungle} alt="jungle"/> {" "}
                </div>
          
      
                <div id="simulator">
                    <div style={{backgroundImage: pickImage}} id="choice1" className={["choices"].join(' ')}>
                        <div className="goodWith">
                        <div style={{border: pickName? 'none': ''}} className="enemypick">{!pickName ? "Click to reveal a champion counter":"" }</div>
                            <div id="pick" className="info">    
                                {pickName? <p className="pickname">{champsData[pickName].name}</p> : ''}
                            </div>
                        </div>
                        {pickItems.length > 0 ? <p className="itemname">Suggested Item Build </p> : ''}
                        {pickItems.map((item, key)=>{

                            if(!isNaN(Number(item))){ //items list includes the word item... Just making sure to ignore it and just focus on the actual item numbers
                                return(
                                    <div className='items_container' >
                                        <div className='popup'>
                                            <span className="popuptext" id={item}>
                                            </span>
                                            <img onMouseOver={this.handleItems} onMouseOut={this.handleItems} className={['items'].join(' ')} src={`http://ddragon.leagueoflegends.com/cdn/8.6.1/img/item/${item}.png`} alt={item} />
                                        </div>
                                    </div>
                                )
                            }
                        })} 
                    </div>
                    <div id="champs">   
                        {champs.map((champ, key)=>(
                            <img onClick={this.handleClick} className="choose grow" src={`http://ddragon.leagueoflegends.com/cdn/8.6.1/img/champion/${champ}.png`} alt={champ} key={key} />
                        ))}       
                    </div>
                    <div style={{backgroundImage: counterImage}} id="choice2" className="choices">
                        <div className="counter">
                        <div style={{border: pickName? 'none': ''}} className="enemypick">{!pickName? !pickName ? "Counter Pick":"" : ''}</div>
                           {counterName? <p className="counterpick">{champsData[counterName].name}</p> : "" }
                        </div>
                        {counterItems.length > 0 ? <p className="itemname">Suggested Item Build</p> : ''}
                        {counterItems.map(item=>{
                            if(!isNaN(Number(item))){ //items list includes the word item... Just making sure to ignore it and just focus on the actual item numbers
                                return(
                                    <div className='items_container' >
                                        <div className='popup'>
                                            <span className="popuptext" id={item}>
                                            </span>
                                            <img onMouseOver={this.handleItems} onMouseOut={this.handleItems} className={['items'].join(' ')} src={`http://ddragon.leagueoflegends.com/cdn/8.6.1/img/item/${item}.png`} alt={item} />
                                        </div>
                                    </div>
                                )
                            }
                        })} */}
                    </div>
                </div>
                <p className="morecounters" style={{display: hide}}>Additional Counters</p>
                <div style={{display: hide}} id="art_container">                   
                        {counters.slice(1).map(champ=>(
                            <div className="more_counters">
                                <p>{champsData[champ.champion].name}</p>
                                <div style={{backgroundImage: `url('http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.champion}_0.jpg')`}} className="more_choices grow">
                                    
                                    
                                </div>
                            </div>
                        ))}        
                </div>
               
                    
                    <div id="champs2">     
                        <a href="http://www.facebook.com/sharer.php?u=https://simplesharebuttons.com" target="_blank">

                      <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />

                        </a>

                        <a href="https://twitter.com/share?url=https://simplesharebuttons.com&amp;text=Simple%20Share%20Buttons&amp;hashtags=simplesharebuttons" target="_blank">

                        <img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" />

                        </a>
                </div>

                <br/>

<div className="container-fluid">

    <div className="row">

        <div className="col-sm-6 col-sm-offset-3">

            <form onSubmit={this.handleSubmit}>

            <div className="form-group">

                    <input

                    onChange={this.handleChange} 

                    value={this.state.title}

                    type="text" 

                    name="title" 

                    className="form-control no-border" 

                    placeholder="TITLE of EVOLVE Player Note..."

                    required

                    />

                </div>

                <div className="form-group">

                    <textarea 

                    onChange={this.handleChange}

                    value={this.state.body}

                    type="text" 

                    name="body" 

                    className="form-control no-border" 

                    placeholder="What did you learn so far for your next match..."

                    required

                    />

                </div>

                <div className="form-group">

                    <button className="btn btn-primary col-sm-12">

                        save

                    </button>

                    <button>Create Profile</button>

                </div>

            </form>

            <div className="notes">

            {this.renderNotes()}

            </div>

        </div>

        <br/>

    </div>

</div>

            </div>
    );
  };
};

export default Sim;