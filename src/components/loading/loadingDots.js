import React, { Component } from 'react';
import './loadingDots.scss';

class LoadingDots extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.visible) {
            return (
                <div className="spinner">
                    <div className="bounce1"/>
                    <div className="bounce2"/>
                    <div className="bounce3"/>
                </div>
            );
        }
        return this.props.text;
    }
}

export default LoadingDots;
