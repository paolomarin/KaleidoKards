import React, { Component } from 'react';
import LoaderImg from './Ripple.svg';


class LoaderSmall extends Component {
    render() {
        return(
            <div className="small-loader">
                <LoaderImg/> 
            </div> 
        )
    }
}

export default LoaderSmall;