import React, { Component } from 'react';
import './Checkmark.scss';
import './CheckMarkImg.svg';

class Checkmark extends Component {
    render() {
        return(
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> 
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark__check" fill="none"/>
            </svg>

        )
    }
}

export default Checkmark;