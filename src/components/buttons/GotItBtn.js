import React, { Component } from 'react';
import './GotItBtn.scss';

class GotItBtn extends Component {
    render() {
        return <button className="got-it-button" onClick={this.props.onClick}> Got it</button>
    }
}

export default GotItBtn;