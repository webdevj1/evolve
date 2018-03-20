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
    render(){
        const {champs} = this.state;
        return(
            <div>
                <div id="simulator">
                    <div className="choices" >
                        <div className="goodWith">
                            <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />
                            <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />
                            <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />
                            <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />
                            <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />
                        </div>
                    </div>
                    <div id="champs">
                        {champs.map((champ, key)=>(
                            <img className="choose" src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${champ}.png`} alt={champ} key={key} />
                        ))}
                    </div>
                    <div className="choices">
                        <div className="counter">
                            <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />
                            <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />
                            <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />
                            <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />
                            <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' className='champ-choice' />
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Hi;