import React, {Component} from 'react';
import './sim.css';
import './responsive-sim.css';
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
            pickImage: `url("http://apollo-na-uploads.s3.amazonaws.com/1427669031664/SRBackground.png")`,
            pickName: '',
            pickItems: [],
            counters: [],
            counterImage: `url("http://apollo-na-uploads.s3.amazonaws.com/1427669031664/SRBackground.png")`,
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

    /* Load Champions, Items, & Notes after the component has been rendered */
    componentDidMount() {
        axios.get('http://localhost:8000')
        .then(res => {
            this.setState({
                champsData: res.data.data, // Importing the champ data.
                champs: Object.keys(res.data.data) //Grabs the names of the champs to be later used for their images.
            });
        })
        .catch(err => console.log(err));

        /* Function to check the firebase database for the rendered notes. */
        database.on('value', snapshot =>{
            this.setState({notes: snapshot.val()});
            //Store all, if any, notes to state.
        });
        
        /* Getting all of the items to show along with the champions. */
        axios.get('http://localhost:8000/items')
        .then(res =>{
            this.setState({items: res.data.data});
        });
    }

    /* Handles the input field for the search bar. */
    handleInput = e =>{
        let name = e.target.value
        
        axios.get('http://localhost:8000/lanes') //Getting list of champion names
        .then(res => {
            let champions = res.data.all
            let newChamps = champions.filter(champ=>champ.toLowerCase().startsWith(name.toLowerCase()));
            if(newChamps.length !== 0){
                this.setState({champs: newChamps})
            }
        })
    }

    /* Handles the current input for adding a note. */
    handleChange = (e) => { this.setState({ [e.target.name]: e.target.value })};

    /* Handles the submission of adding a new note to the database */
    handleSubmit(e){
        e.preventDefault();
        
        const note = {
            title: this.state.title,
            body: this.state.body
        };

        /* database.push() is the function used to add to the firebase database. */
        database.push(note);

        /* Clears the current input fields after submission. */
        this.setState({
            title:'',
            body:''    
        });
    }


    handleClick = e =>{
        const {champsData} = this.state;
        /* 
        Champ's name was stored in the alt of the
        element. Storing it now in the variable "alt".
        */
        let champName = e.target.name;
        
        this.setState({
            pickImage: `url('http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg')`, //Changing the background images of the empty squares with the image of the champion selected.
            pickName: champName, //renders the clicked champ's name above their picture
            counters: champsData[champName].counters, //Targeting the selected champ's counter opponents and storing them in state.
            counterImage: `url('http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champsData[champName].counters[0].champion}_0.jpg')`, //Grabbing the image of the top counter. Hence the reason for the zero index.
            counterName: champsData[champName].counters[0].champion, //Grabbing the name of the top counter and storing it in state.
        });

        axios.get('http://localhost:8000/itemsbuild')
        .then(res=>{
            res.data.forEach(build=>{
                let items = build.hashes.finalitemshashfixed.highestWinrate.hash.replace(/-/g, ' ').split(' '); //Coverting the string containing all the item numbers into an array. Also getting rid of all dashes and spaces.
                if(Number(champsData[champName].key) === build.championId){ //Checking to see if current item build champion id matches the selected champion.
                    this.setState({pickItems: items}); //Storing current champion's item build in state.
                };
                if(Number(champsData[champsData[champName].counters[0].champion].key) === build.championId){ //Looking for the counter champ's items
                    this.setState({counterItems: items});
                };
            });
        })
        .catch(err=>console.log('Something went wrong: ',err));
    }

    handleRoles = e => {
        let lane = e.target.name; //Getting the name of the lane for the lanes images.
        axios
        .get('http://localhost:8000/lanes') //Getting list of champs according to lanes.
        .then(res => {
            this.setState({
            champs: res.data[lane] //Filters the champs available according to the lane clicked on.
            });
        })
    };

    //Renders the user notes stored in state from the database.
    renderNotes(){
        return _.map(this.state.notes, (note, key)=>{
            return(        
                <div key={key} className="champs1"> 
                    <h3>{note.title}</h3>
                    <p>{note.body}</p>
                </div>
            )
        });
    };

    handleItems = (e) =>{
        const {items} = this.state;
        let key = e.target.alt; /* Targeting the alt property that holds the item id/key. */
        let popup = e.target.previousSibling; /* Targeting the span element that holds the popup. */
        popup.innerHTML = `${items[key].name} <br/> <br/> ${items[key].description}`;
        popup.classList.toggle('show');
    }

    render(){
        const {champsData, champs, pickImage, pickName, counterImage, counters, counterName, pickItems, counterItems} = this.state;
        let hide = !pickName?'none':'';
        return(
            <div className="sim-container">
                <input onChange={this.handleInput} className="champion-search" placeholder="Search for a champion"/> {/* Input field at the top of the page that allows you to search for a specific champion. */}
                <br/>
                <br/>
                <div className="allroles">
                    <img onClick={this.handleRoles} name="all" className='lanes' src={allChamps} alt="all" />
                    <img onClick={this.handleRoles} name="top" className='lanes' src={top} alt="top"/>
                    <img onClick={this.handleRoles} name="mid" className='lanes' src={mid} alt="mid"/>       {/*  All of the lanes available  */}
                    <img onClick={this.handleRoles} name="support" className='lanes' src={support} alt="support"/>   {/*  All lane images are downloaded and imported at the top.  */}
                    <img onClick={this.handleRoles} name="bot" className='lanes' src={bottom} alt="bot"/>
                    <img onClick={this.handleRoles} name="jungle" className='lanes' src={jungle} alt="jungle"/> {" "}
                </div>

                <div id="simulator">
                    <div style={{backgroundImage: pickImage}} className={"choices"}>
                        <div className="pick">
                            <div style={{border: pickName? 'none': ''}} className="champion">{!pickName ? "Click to reveal a champion and its counter":"" }</div>{/* Displayed before any champion is clicked on. Hidden after. */}
                            <div>    
                                {pickName? <p className="pickname">{champsData[pickName].name}</p> : ''}
                                {/* Shows to selected champion's name. */}
                            </div>
                        </div>
                        {pickItems.length ? <p className="item-title">Suggested Item Build </p> : ''}
                        {pickItems.filter(item=>Number(item)).map((item, key)=>( /*Grabbing just the items numbers so they can be rendered.*/
                            <div key={key} className='items_container' >
                                <div className='popup'>
                                    <span className="popuptext">
                                        
                                    </span>
                                    <img onMouseOver={this.handleItems} onMouseOut={this.handleItems} className='items' src={`http://ddragon.leagueoflegends.com/cdn/8.6.1/img/item/${item}.png`} alt={item} />
                                </div>
                            </div>
                        ))} 
                    </div>
                    <div id="champs">   
                        {champs.map((champ, key)=>(
                            <img className="choose grow" 
                            onClick={this.handleClick} 
                            src={`http://ddragon.leagueoflegends.com/cdn/8.6.1/img/champion/${champ}.png`} 
                            name={champ} 
                            key={key} 
                            alt={key}
                            />
                        ))}       
                    </div>
                    <div style={{backgroundImage: counterImage}} className="choices">
                        <div className="counter">
                            <div style={{border: pickName? 'none': ''}} className="champion">{!pickName ? "Counter Pick":""}</div>
                           {counterName ? <p className="counterpick">{champsData[counterName].name}</p> : "" }
                        </div>
                        {counterItems.length ? <p className="item-title">Suggested Item Build</p> : ""}
                        {counterItems.filter(item=>Number(item)).map((item, key)=>(
                            <div key={key} className='items_container' >
                                <div className='popup'>
                                    <span className="popuptext">
                                    </span>
                                    <img onMouseOver={this.handleItems} onMouseOut={this.handleItems} className='items' src={`http://ddragon.leagueoflegends.com/cdn/8.6.1/img/item/${item}.png`} alt={item} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="morecounters" style={{display: hide}}>Additional Counters</p>
                <div style={{display: hide}} id="art_container">                   
                        {counters.slice(1).map((champ, key)=>(
                            <div key={key} className="more_counters">
                                <p>{champsData[champ.champion].name}</p>
                                <img
                                src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.champion}_0.jpg`}
                                className="more_choices grow"
                                onClick={this.handleClick}
                                name={champ.champion} 
                                alt={key}/>
                            </div>
                        ))}        
                </div>
               
                    
                <div id="champs2">     
                    <a href="http://www.facebook.com/sharer.php?u=https://simplesharebuttons.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />
                    </a>
                    <a href="https://twitter.com/share?url=https://simplesharebuttons.com&amp;text=Simple%20Share%20Buttons&amp;hashtags=simplesharebuttons" target="_blank" rel="noopener noreferrer">
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
                                    <button className="btn btn-primary col-sm-12">Save</button>
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