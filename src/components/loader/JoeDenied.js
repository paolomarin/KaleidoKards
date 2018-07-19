import React, { Component } from 'react';
import './JoeDenied.scss';

class JoeDenied extends Component {
    constructor(props) {
        super(props);
    }

    render() {

    if (this.props.visible) {
        return <h6 className="joe-text">Joe has denied trade.</h6>

    }
    return null;
}
}

export default JoeDenied;