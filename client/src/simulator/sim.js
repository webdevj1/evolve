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
            counter: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png',
            counterName: '',
            counterItems: []
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

    handleInput = e =>{
        let name = e.target.value
        const {champs} = this.state;
        axios
        .get('http://localhost:8000/roles') //getting list of champs according to lanes
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

    render(){
        const {champs, pick, pickName, counter, counterName, pickItems, counterItems, userInputChamp} = this.state;
        let hide = !pickName?'none':'';
        return(
            <div>

                <input onChange={this.handleInput} width="500px" className="summonername" placeholder="Search for a user or champion"/>
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
                        <div> <p className="itemname">Selected Champion</p> </div>
                            <div id="pick">    
                                <p style={{fontSize: '20px'}}><img src={pick} alt='champ' className='champ-choice1' />{''}</p>
                                <p className="pickname">{pickName}</p>
                            </div>
                        </div>
                        {pickItems.length > 0 ? <p className="itemname">Suggested Item Build</p> : ''} {/* Conditional to check if any champ was clicked */}
                        {pickItems.map(item=>{
                            if(!isNaN(Number(item))){ //items list includes the word item... Just making sure to ignore it and just focus on the actual item numbers
                                return(
                                    <img className='items' onMouseOver={this.it} src={`http://ddragon.leagueoflegends.com/cdn/8.6.1/img/item/${item}.png`} alt={item} />
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

                <h1>Item Build</h1>
                <div style={{display: hide}} id="simulator">
                    <div className="choices">
                        {pickItems.length > 0 ? <p style={{fontSize: '20px'}}>Suggested Item Build</p> : ''} {/* Conditional to check if any champ was clicked */}
                        {pickItems.map(item=>{
                            if(!isNaN(Number(item))){ //items list includes the word item... Just making sure to ignore it and just focus on the actual item numbers
                                return(
                                    <img className='items' onMouseOver={this.it} src={`http://ddragon.leagueoflegends.com/cdn/8.6.1/img/item/${item}.png`} alt={item} />
                                )
                            }
                        })}
                    </div>
                    <div id="champs">   
                    {counterItems.length > 0 ? <p style={{fontSize: '20px'}}>Suggested Item Build</p> : ''}
                        {counterItems.map(item=>{
                            if(!isNaN(Number(item))){
                                return(
                                    <img className='items' src={`http://ddragon.leagueoflegends.com/cdn/8.6.1/img/item/${item}.png`} alt={item} />
                                )
                            }
                        })}
                    </div>
                    <div className="choices">
                      
                        {counterItems.length > 0 ? <p style={{fontSize: '20px'}}>Suggested Item Build</p> : ''}
                        {counterItems.map(item=>{
                            if(!isNaN(Number(item))){
                                return(
                                    <img className='items' src={`http://ddragon.leagueoflegends.com/cdn/8.6.1/img/item/${item}.png`} alt={item} />
                                )
                            }
                        })}
                    </div>
                </div>

                <h1>Share This Site</h1>

                <div id="simulator">
                    
                    <div id="champs2">   
                    
                                             

                        <a href="https://bufferapp.com/add?url=https://simplesharebuttons.com&amp;text=Simple Share Buttons" target="_blank">

                        <img src="https://simplesharebuttons.com/images/somacro/buffer.png" alt="Buffer" />

                        </a>





                        <a href="http://www.digg.com/submit?url=https://simplesharebuttons.com" target="_blank">

                        <img src="https://simplesharebuttons.com/images/somacro/diggit.png" alt="Digg" />

                        </a>





                        <a href="mailto:?Subject=Simple Share Buttons&amp;Body=I%20saw%20this%20and%20thought%20of%20you!%20 https://simplesharebuttons.com">

                        <img src="https://simplesharebuttons.com/images/somacro/email.png" alt="Email" />

                        </a>





                        <a href="http://www.facebook.com/sharer.php?u=https://simplesharebuttons.com" target="_blank">

                        <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />

                        </a>





                        <a href="https://plus.google.com/share?url=https://simplesharebuttons.com" target="_blank">

                        <img src="https://simplesharebuttons.com/images/somacro/google.png" alt="Google" />

                        </a>





                        <a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://simplesharebuttons.com" target="_blank">

                        <img src="https://simplesharebuttons.com/images/somacro/linkedin.png" alt="LinkedIn" />

                        </a>





                        <a href="javascript:void((function()%7Bvar%20e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','http://assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)%7D)());">

                        <img src="https://simplesharebuttons.com/images/somacro/pinterest.png" alt="Pinterest" />

                        </a>





                        <a href="javascript:;" onclick="window.print()">

                        <img src="https://simplesharebuttons.com/images/somacro/print.png" alt="Print" />

                        </a>





                        <a href="http://reddit.com/submit?url=https://simplesharebuttons.com&amp;title=Simple Share Buttons" target="_blank">

                        <img src="https://simplesharebuttons.com/images/somacro/reddit.png" alt="Reddit" />

                        </a>





                        <a href="http://www.stumbleupon.com/submit?url=https://simplesharebuttons.com&amp;title=Simple Share Buttons" target="_blank">

                        <img src="https://simplesharebuttons.com/images/somacro/stumbleupon.png" alt="StumbleUpon" />

                        </a>





                        <a href="http://www.tumblr.com/share/link?url=https://simplesharebuttons.com&amp;title=Simple Share Buttons" target="_blank">

                        <img src="https://simplesharebuttons.com/images/somacro/tumblr.png" alt="Tumblr" />

                        </a>





                        <a href="https://twitter.com/share?url=https://simplesharebuttons.com&amp;text=Simple%20Share%20Buttons&amp;hashtags=simplesharebuttons" target="_blank">

                        <img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" />

                        </a>





                        <a href="http://vkontakte.ru/share.php?url=https://simplesharebuttons.com" target="_blank">

                        <img src="https://simplesharebuttons.com/images/somacro/vk.png" alt="VK" />

                        </a>





                        <a href="http://www.yummly.com/urb/verify?url=https://simplesharebuttons.com&amp;title=Simple Share Buttons" target="_blank">

                        <img src="https://simplesharebuttons.com/images/somacro/yummly.png" alt="Yummly" />

                        </a>

                    </div>
                   
                </div>
                            <br/>
                <h1>SAVE YOUR PROGRESS</h1>

                <button>Create Profile</button>
                            <br/>
                            <p></p>
            </div>
    );
  };
};

export default Sim;