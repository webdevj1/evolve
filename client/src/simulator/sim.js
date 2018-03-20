import React from 'react';
import axios from 'axios';

let champs = function(){
    let all = [];
    axios.get('http://localhost:8000')
    .then(res=>{ all = res.data.data})
    .catch(err=>console.log(err))
    return all;
}();
console.log(champs);

let hi = () =>(
    <div id="sim-page">
        <div className="choices" >
            <div className="goodWith">
                <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' class='champ-choice' />
                <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' class='champ-choice' />
                <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' class='champ-choice' />
                <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' class='champ-choice' />
                <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' class='champ-choice' />
            </div>
        </div>
        <div id='sim'>
            
        </div>
        <div className="choices">
            <div className="counter">
                <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' class='champ-choice' />
                <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' class='champ-choice' />
                <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' class='champ-choice' />
                <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' class='champ-choice' />
                <img src= 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png' alt='champ' class='champ-choice' />
            </div>
        </div>
    </div>
);

export default hi;