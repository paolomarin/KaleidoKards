import React, { Component } from 'react';
import './PlatinumPack.scss';
import PlatinumPackImg from './PlatinumPack.png';

class PlatinumPack extends Component {
    render() {
        return( 
           <div>
            <div className="platinum-pack">
                <img src= {PlatinumPackImg} className="pack-of-cards" alt="Pack-of-Cards"/>
            </div>
            <div className="platinumpack-radiobtn">
                <input type="radio" id="platinumInput" name="selector"/>
                    <label for="platinumInput"> Platinum Pack</label>
                    <div className="check"></div>

            </div>
                
           </div>
        )
    }
}

export default PlatinumPack;