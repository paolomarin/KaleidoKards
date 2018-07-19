import React, { Component } from 'react';
import './Dashboard.scss';

class Dashboard extends Component {
    render() {

        if(this.props.visible) {
        return (
            <div className="overlay">
                <div className="square-popup-container">
                    <button className="got-it-button" onClick={this.props.click}> Got it </button>
                </div>
            </div>
        );
    } if(!this.props.visible) {
        return null;
    }
}
}

export default Dashboard;