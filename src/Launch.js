import React, { Component } from 'react';
import './Launch.scss';
import App from 'App';

class Launch extends Component {

    constructor(props) {
        super(props);
        this.state={
            apiKey: ''
        };
    }
    
    clickLaunchBtn() {
        // TODO: play video while launch is happening
        window.fetch("/launch", {
            body: JSON.stringify({apiKey: this.state.apiKey}),
            method: "POST",
            headers: {
                'content-type': 'application/json'
            }
        }).then(results => {
            return results.json();
        }).then(resultBody => {
            // right now launch only returns the contract address if the
            // env creation and deploy were successful
            if (resultBody.contractAddress && resultBody.contractAddress !== "") {
                this.props.history.push('/app');
                console.log(resultBody.contractAddress);
            } else {
                // contract address is empty so we need to do something here

            }
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
            
    }).catch((error) => {
        console.log("errorMESSAGE");
        console.log(error);
        });
    }

    updateApiKey(e) {
       let value= e.target.value;
        this.setState({apiKey: value});
    }

    
    render() {
        return (
            <div className='launch-wrapper'>
                <div className="launch-container">
                    <span className="input">
                        <input onChange={this.updateApiKey.bind(this)} type="text" placeholder="Paste Api key here"/>
                    </span>
                    <button className="launch-button" onClick={this.clickLaunchBtn.bind(this)}>Launch</button>
                </div>
            </div>
        );
    }
}

export default Launch;