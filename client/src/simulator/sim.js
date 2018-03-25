import React, {Component} from 'react';
import axios from 'axios';

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
                <h1>Pick Your Champion!</h1>
                <img onClick={this.handleRoles} name="fighter" className='roles' src="https://vignette.wikia.nocookie.net/leagueoflegends/images/7/7b/Fighter_Large.png/revision/latest/scale-to-width-down/354?cb=20161211222158" />
                <img onClick={this.handleRoles} name="tank" className='roles' src="https://vignette.wikia.nocookie.net/leagueoflegends/images/e/ee/%C4%90%E1%BB%A1_%C4%91%C3%B2n_L%E1%BB%9Bn.png/revision/latest?cb=20160317142630&path-prefix=vi" />
                <img onClick={this.handleRoles} name="mage" className='roles' src="https://rankedboost.com/wp-content/plugins/league/assets/roles/Mage.png" />
                <img onClick={this.handleRoles} name="assassin" className='roles' src="https://vignette.wikia.nocookie.net/leagueoflegends/images/e/e5/Assassin_Role.png/revision/latest?cb=20141008223656&path-prefix=es" />
                <img onClick={this.handleRoles} name="support" className='roles' src="http://vignette1.wikia.nocookie.net/suggestion/images/8/89/Enchanter_Large.png" />
                <img onClick={this.handleRoles} name="marksman" className='roles' src='https://rankedboost.com/wp-content/plugins/league/assets/roles/Marksman.png' />
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
                            <p style={{fontSize: '20px'}} ><img onDragOver={this.handleOver} onDrop={this.handleDrop} src= 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png' alt='champ' className='champ-choice' />{''}</p>
                        </div>
                    </div>
                </div>
                <h1>MORE INFO</h1>
            </div>
        );
    };
};

export default Hi;