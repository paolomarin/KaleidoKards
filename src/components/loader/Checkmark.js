import React, { Component } from 'react';
import './Checkmark.scss';
import CheckmarkImg from './CheckMarkImg.png';

class Checkmark extends Component {
    render() {

        if(this.props.visible) {
        return(
            <div>
                <img src={CheckmarkImg} className="checkmark"/>
            </div>

        );
    }
        return null;
    }
}

export default Checkmark;