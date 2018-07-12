import React, { Component } from 'react';
import './PlatinumPack.scss';
import PlatinumPackImg from './PlatinumPack.png';
import Popup from './../modal/popup';

class PlatinumPack extends Component {
    constructor(props) {
        super(props);
        
        // this.state = {isOpen: false };
    }

    // popupModal() {
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //     });
    // }

    render() {
        return( 
           <div>
            <div className="platinum-pack">
            <button className="popupbtn-platinum" onClick={this.props.click}>  
                <img src= {PlatinumPackImg} className="pack-of-platinumcards" alt="Pack-of-Cards"/>
            </button>
            </div>
            {/* <Popup show={this.state.isOpen} onClose={this.popupModal.bind(this)}>
                A platinum pack gives you 3 random cards with effects.
            </Popup> */}
            
            {/* <div className="platinumpack-radiobtn">
                <input type="radio" id="platinumInput" name="selector"/>
                    <label for="platinumInput"> Platinum Pack</label>
                    <div className="check"></div>

            </div>
                 */}
           </div>
        )
    }
}

export default PlatinumPack;