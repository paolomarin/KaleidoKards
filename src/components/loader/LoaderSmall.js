import React, { Component } from 'react';
import Ripple from './Ripple.svg';


class LoaderSmall extends Component {
    render() {
        if(!this.props.show) {
            return null
        }
        return(
            <div className="small-loader">
                <img className="small" src= {Ripple} />
            </div> 
        )
    }
}

export default LoaderSmall;