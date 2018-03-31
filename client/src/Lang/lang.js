import React, {Component} from 'react';
import gank from '../images/gank.jpg';

class Lang extends Component{
    constructor(){
        super();
        this.state = {};
    }

    render(){
        return(
            <div>
                <h1>Starting LoL terminology page!</h1>
                <h1>GANK</h1>
                <p> When a team is able to catch their opponent off guard with a surprise attack </p>
                <img width='800px' height='400px' src={gank} />
            </div>
        )
    }
}

export default Lang;