import React, { Component } from 'react';
import './Launch.scss';
import LaunchDesign from './components/launch/LaunchDesign';
import Region from './components/regions/Region.js';
import IntroVideo from "./components/video/IntroVideo";
import LaunchStatus from "./components/launchStatus/launchStatus";
require("babel-polyfill");

let READY = "Ready";
let contractAddress = "";

// Map between flag codes and api endpoints
const regionMap = {"us": "", "de": "eu", "kr": "ko", "au": "ap"};

class Launch extends Component {

    constructor(props) {
        super(props);
        this.state={
            showIntroVideo: false,
            status: "",
            locale: "",
        };
        this.apiKey = "";
    }

    // Called with boolean value
    // true = show, false = hide
    showVideo(status) {
        this.setState({showIntroVideo: status}, this.goToDashboard);
    }

    goToDashboard() {
        if (this.state.status === READY && !this.state.showIntroVideo) {
            this.props.history.push({
                pathname:'/app',
                state: {ContractAddress : contractAddress}
            });
        }
    }
    
    clickLaunchBtn() {
        let locale = regionMap[this.state.locale];

        window.fetch("/launch", {
            body: JSON.stringify({apiKey: this.apiKey, locale: locale}),
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
                this.setState({status: READY});
                contractAddress = resultBody.contractAddress;
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
            while (count < 60 && this.state.status !== READY) {
                await this.pollLaunchStatus().then(async (response) => {
                    if (response.status && response.status !== this.state.status) {
                        // Only update the state when the status changes
                        this.setState({status: response.status});
                        contractAddress = response.contractAddress;
                        if (this.state.status === READY) {
                            return;
                        }
                    }
                    await new Promise((resolve) => setTimeout(resolve, 3000));
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

    handleRegionClick(selection) {
        this.setState({locale: selection});
    }

    render() {
        return (
            <div className='launch-wrapper'>
                <LaunchStatus status={this.state.status}/>
                <IntroVideo visible={this.state.showIntroVideo} setVisibility={this.showVideo.bind(this)} afterVideo={this.goToDashboard.bind(this)}/>
                <LaunchDesign/>
                <div className="launch-container">
                    <label className="launch-button-form">
                        <input className="api-key" onChange={this.updateApiKey.bind(this)} type="text" required="" placeholder="Paste Api Key Here"/>
                        <button className="launch-button" onClick={this.clickLaunchBtn.bind(this)}>Launch</button>
                    </label>
                    <Region selectedLocale={this.state.locale} regionSelect={this.handleRegionClick.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default Launch;