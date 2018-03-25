import React, {Component} from 'react';
import axios from 'axios';

class Hi extends Component{
    constructor(){
        super();
        this.state = {champs:[]};
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

    render(){
        const {champs} = this.state;
        return(
            <div>
                <h1>Pick Your Champion!</h1>
                <div id="simulator">
                    <div className="choices" >
                        <div className="goodWith">
                            <div className="info">    
                                <p><img onDragOver={this.handleOver} onDrop={this.handleDrop} src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />{''}</p>
                            </div>
                            <div className="info">
                                <p><img onDragOver={this.handleOver} onDrop={this.handleDrop} src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />{''}</p>
                            </div>
                            <div className="info">    
                                <p><img onDragOver={this.handleOver} onDrop={this.handleDrop} src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />{''}</p>
                            </div>
                            <div className="info">    
                                <p><img onDragOver={this.handleOver} onDrop={this.handleDrop} src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />{''}</p>
                            </div>
                            <div className="info">    
                                <p><img onDragOver={this.handleOver} onDrop={this.handleDrop} src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />{''}</p>
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
                            <img onDragOver={this.handleOver} onDrop={this.handleDrop} src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />
                            <img onDragOver={this.handleOver} onDrop={this.handleDrop} src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />
                            <img onDragOver={this.handleOver} onDrop={this.handleDrop} src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />
                            <img onDragOver={this.handleOver} onDrop={this.handleDrop} src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />
                            <img onDragOver={this.handleOver} onDrop={this.handleDrop} src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Hi;