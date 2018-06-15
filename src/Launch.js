import React, { Component } from 'react';
import './Launch.scss';
import { Link } from 'react-router-dom';

class Launch extends Component {
    render() {
        return( 
           <div className="launch-container">
                <span className="input">
                    <input type="text" placeholder="Paste Api key here"/>
                        <span></span>
                </span>
                <button className="launch-button"> 
                <Link to="/app">Launch </Link>
                </button>

           </div>
        )
    }
}

export default Launch;