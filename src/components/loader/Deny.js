import React, { Component } from 'react';
import './Deny.scss';
import ExImg from './ExImg.png';

class Deny extends Component {
    render() {

        if(this.props.visible) {
        return(
            <div>
                <img src={ExImg} className="exmark"/>
            </div>

        );
    }
        return null;
    }
}

export default Deny;