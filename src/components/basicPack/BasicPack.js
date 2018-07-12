import React, { Component } from 'react';
import './BasicPack.scss';
import BasicPackImg from './BasicPack.png';
import Popup from './../modal/popup';


class BasicPack extends Component {
    constructor(props) {
        super(props);
        
        // this.state = {
        //     isOpen: false,
        //     // check: false
        // };
    }

    // popupModal() {
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //     });
    // }

    // basicPack() {

        // this.setState({
        //     check: true // When you click on this then the checked value should change to true
            //Then I want this function to prep the purchasebtn with the standard pack url in the clickpurchasebtn. 

    //     });
    //     console.log("state", this.state.check);
    // }
        
    render() {
        return( 
            <div>
                <div className="basic-pack">
                     <button className="popupbtn">   
                   <img src= {BasicPackImg} className="pack-of-cards" alt="Pack-of-Cards"/>
                     </button>
                </div>
                {/* <Popup show={this.state.isOpen} onClose={this.popupModal.bind(this)}>
                        A basic pack gives you 3 random cards.
                </Popup> */}
                
           </div>
        )
    }
}

export default BasicPack;