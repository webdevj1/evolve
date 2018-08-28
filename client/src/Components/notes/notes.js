import React, {Component} from 'react';
import {database} from "../../firebase.js";
import _ from 'lodash';

export default class Notes extends Component {
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
    };

    componentDidMount(){
        /* Function to check the firebase database for the rendered notes. */
        database.on('value', snapshot =>{
            this.setState({notes: snapshot.val()});
            //Store all, if any, notes to state.
        });
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

    render(){
        return(
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
        )
    }
}