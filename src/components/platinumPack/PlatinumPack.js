import React, { Component } from 'react';
import './PlatinumPack.scss';
import PlatinumPackImg from './PlatinumPack.png';

class PlatinumPack extends Component {
    render() {
        return( 
           <div className="platinum-pack">
            <img src= {PlatinumPackImg} className="pack-of-cards" alt="Pack-of-Cards"/>
           </div>
        )
    }
}

export default PlatinumPack;