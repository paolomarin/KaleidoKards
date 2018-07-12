import React, { Component } from 'react';
import './Launch.scss';
require("babel-polyfill");

let STATUS = "";
let READY = "Ready";

class Launch extends Component {

    constructor(props) {
        super(props);
        this.state={
            apiKey: ''
        };
    }

    goToDashboard() {
        if (STATUS === READY) {
            this.props.history.push('/app');
        }
    }
    
    clickLaunchBtn() {
        window.fetch("/launch", {
            body: JSON.stringify({apiKey: this.state.apiKey}),
            method: "POST",
            headers: {
                'content-type': 'application/json'
            }
        }).then(results => {
            return results.json();
        }).then(async (resultBody) => {
            if (resultBody.error) {
                throw new Error(resultBody.error.toString())
            }
            // TODO: show video here
            // Successful response means that the backend is launching Kaleido Platform
            // and deploying smart contract for Kards
            let count = 0; // counter to prevent infinite loop
            while (count < 30 && STATUS !== READY) {
                await this.pollLaunchStatus().then(async (response) => {
                    if (response.status) {
                        // TODO: check if status changed and show/update something on ui
                        STATUS = response.status;
                        if (STATUS === READY) {
                            return;
                        }
                        await new Promise((resolve) => setTimeout(resolve, 3000));
                    }
                }).catch((error) => {
                    //TODO: handle error here
                    console.log("Error while polling");
                    console.log("error: ", error);
                });

                count++;
            }
            // TODO: make this a function to call after video and/or on a button
            this.goToDashboard();

        }).catch((error) => {
            console.log(error);
            alert(error.message);
        });

    }

    async pollLaunchStatus() {
        return await window.fetch("/launch/status", {
            method: "GET"
        }).then(async (results) => {
            return await results.json();
        })
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