import React, { Component } from 'react';
import './Launch.scss';
import { Link } from 'react-router-dom';

class Launch extends Component {

    constructor(props) {
        super(props)
        this.state={
            apikey: ''
        };
    }
    
    clickLaunchBtn() {
        //console.log(KaleidoKards);
        window.fetch("/launch", {
            body: JSON.stringify({apiKey: this.state.apikey}), 
            method: "POST",
            headers: {
                'content-type': 'application/json'
            }
        }).then(results => {
            
            return results.json();
        
        }).then(resultBody => {
            console.log(this.state.apikey);
        // }).then(getKards => {

        //     window.fetch( userGetKards , {
        //         method: "GET",
        //         headers: {
        //             'content-type': 'application/json'
        //         }
        //         }).then(results => {
        //             return results.json();
        //             // this.setState({cards: results.json()});
                    
        //         }).then(resultBody => {
        //             this.setState({userCards: resultBody});
        //             console.log('this state', this.state.userCards);
        //             this.props.updateParent(this.state.userCards);
                   
        //         })
            
    })
    }

    updateApiKey(e) {
       let value= e.target.value;
        this.setState({apikey: value})
    }

    
    render() {
        return(
        <div className= 'launch-wrapper'>
           <div className="launch-container">
                <span className="input">
                    <input onChange= {this.updateApiKey.bind(this)} type="text" placeholder="Paste Api key here"/>
                        <span></span>
                </span>
                <button className="launch-button" onClick={this.clickLaunchBtn.bind(this)}> 
                <Link className=" launch"to="/app">Launch </Link>
                </button>

           </div>
        </div>
        )
    }
}

export default Launch;