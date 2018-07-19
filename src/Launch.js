import React, { Component } from 'react';
import './Launch.scss';
import LaunchDesign from './components/launch/LaunchDesign';
import Region from './components/regions/Region.js';
import IntroVideo from "./components/video/IntroVideo";
require("babel-polyfill");

let STATUS = "";
let READY = "Ready";
let ContractAddress = "";

class Launch extends Component {

    constructor(props) {
        super(props);
        this.state={
            showIntroVideo: false,
        };
        this.apiKey = "";
    }

    // Called with boolean value
    // true = show, false = hide
    showVideo(status) {
        this.setState({showIntroVideo: status});
    }

    goToDashboard() {
        if (STATUS === READY && !this.state.showIntroVideo) {
            this.props.history.push({
                pathname:'/app',
                state: {ContractAddress : ContractAddress}
            });
        }
    }
    
    clickLaunchBtn() {
        window.fetch("/launch", {
            body: JSON.stringify({apiKey: this.apiKey}),
            method: "POST",
            headers: {
                'content-type': 'application/json'
            }
        }).then(results => {
            return results.json();
        }).then(async (resultBody) => {
            if (resultBody.error) {
                throw new Error(resultBody.error.toString())
            } else if (resultBody.status && resultBody.status === READY) {
                STATUS = READY;
                ContractAddress = resultBody.contractAddress;
                // If the first call returns a status of ready then the background has
                // already ran before and has a platform and contract. So we don't
                // need to automatically show the video
                this.goToDashboard();
                return;
            }
            this.showVideo(true);
            // Successful response means that the backend is launching Kaleido Platform
            // and deploying smart contract for Kards
            let count = 0; // counter to prevent infinite loop
            while (count < 60 && STATUS !== READY) {
                await this.pollLaunchStatus().then(async (response) => {
                    if (response.status) {
                        // TODO: check if status changed and show/update something on ui
                        STATUS = response.status;
                        ContractAddress = response.contractAdress;
                        if (STATUS === READY) {
                            return;
                        }
                        await new Promise((resolve) => setTimeout(resolve, 3000));
                    }
                }).catch((error) => {
                    //TODO: handle error here?
                    console.log("Error while polling status");
                    console.log("error: ", error);
                });
                count++;
            }
            // TODO: make this on a button
            this.goToDashboard();

        }).catch((error) => {
            this.showVideo(false);
            console.log(error);
            alert(error.message);
        });

    }

    async pollLaunchStatus() {
        return await window.fetch("/launch/status", {
            method: "GET"
        }).then(async (results) => {
            if (!results.ok) {
                //TODO: handle error
                console.log("Error while polling");
            }
            return await results.json();
        })
    }

    updateApiKey(e) {
       this.apiKey = e.target.value;
    }

    
    render() {
        return (
            <div className='launch-wrapper'>
                <IntroVideo visible={this.state.showIntroVideo} setVisibility={this.showVideo.bind(this)} afterVideo={this.goToDashboard.bind(this)}/>
                <LaunchDesign/>
                <div className="launch-container">
                    <label className="launch-button-form">
                        <input className="api-key" onChange={this.updateApiKey.bind(this)} type="text" required="" placeholder="Paste Api Key Here"/>
                        <button className="launch-button" onClick={this.clickLaunchBtn.bind(this)}>Launch</button>
                    </label>
                    <Region/>
                </div>
            </div>
        );
    }
}

export default Launch;