import React, { Component } from 'react';
import './Launch.scss';
import LoaderLarge from './components/loader/LoaderLarge';
import LaunchDesign from './components/launch/LaunchDesign';
import Region from './components/regions/Region.js';


class Launch extends Component {

    constructor(props) {
        super(props);
        this.state={
            apiKey: '',
            loaderVisible:false
        };
    }

 
   loader() {
        this.setState({
            loaderVisible: !this.state.loaderVisible
        })
    }
    
    clickLaunchBtn() {
        // TODO: play video while launch is happening
        //show loader here
        this.loader();
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
                //not visible
                this.loader();
                this.props.history.push('/app');
                console.log(resultBody.contractAddress);
            } else {
                // contract address is empty so we need to do something here
                // Highly unlikely edge case but need to discuss handling
                this.loader();
                alert("There was an error, please restart the app");
                console.log("There was an error, please restart the app");
            }

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
                <LaunchDesign/>
                <div className="launch-container">
                    <label className="launch-button-form">
                        <input className="api-key" onChange={this.updateApiKey.bind(this)} type="text" required="" placeholder="Paste Api Key Here"/>
                        <button className="launch-button" onClick={this.clickLaunchBtn.bind(this)}>Launch</button>
                    </label>
                    <Region/>
                    {/* <LoaderLarge onShow={this.state.visible}/> */}
                </div>
            </div>
        );
    }
}

export default Launch;