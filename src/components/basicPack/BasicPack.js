import React, { Component } from 'react';
import './BasicPack.scss';
import BasicPackImg from './BasicPack.png';

class BasicPack extends Component {
    render() {
        return( 
            <div>
            <h4>Basic Pack</h4>
                <div className="basic-pack">
                    <img src= {BasicPackImg} className="pack-of-cards" alt="Pack-of-Cards"/>
                </div>
           </div>
        )
    }
}

export default BasicPack;