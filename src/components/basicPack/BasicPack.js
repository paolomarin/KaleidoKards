import React, { Component } from 'react';
import './BasicPack.scss';
import BasicPackImg from './BasicPack.png';

class BasicPack extends Component {
    render() {
        return( 
           <div className="basic-pack">
            <img src= {BasicPackImg} className="pack-of-cards" alt="Pack-of-Cards"/>
           </div>
        )
    }
}

export default BasicPack;