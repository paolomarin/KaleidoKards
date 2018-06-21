import React, { Component } from 'react';
import './BasicPack.scss';
import BasicPackImg from './BasicPack.png';
import Popup from './../modal/popup';


class BasicPack extends Component {
    constructor(props) {
        super(props);
        
        this.state = {isOpen: false };
    }

    popupModal() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
        
    render() {
        return( 
            <div>
                <div className="basic-pack" >
                     <button className="popupbtn" onClick={this.popupModal.bind(this)}>   
                   <img src= {BasicPackImg} className="pack-of-cards" alt="Pack-of-Cards"/>
                     </button>
                </div>
                <Popup show={this.state.isOpen} onClose={this.popupModal.bind(this)}>
                A basic pack gives you 3 random cards.
                </Popup>

                <div className="basicpack-radiobtn">
                {/* <label className="basic-pack-radiobtn"> Basic Pack
                    <input type="radio" checked="checked" name="radio"/>
                    <span className="checkmark"></span>
                </label> */}
                <input type="radio" id="input" name="selector"/>
                    <label for="input"> Basic Pack</label>
                    <div className="check"></div>

                </div>
                
           </div>
        )
    }
}

export default BasicPack;