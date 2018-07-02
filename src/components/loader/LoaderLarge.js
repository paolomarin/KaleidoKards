import React, { Component } from 'react';
import Ripple from './Ripple.svg';
import './Loader.scss';


class LoaderLarge extends Component {

    constructor() {
        super();
    }

    render() {
        if (!this.props.onShow) {
            return null;
        }

        return (
            <div className="large-loader">
               <img className="ripple-img" src= {Ripple}/>
            </div> 
        )
    }
}

export default LoaderLarge;