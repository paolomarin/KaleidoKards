import React, { Component } from 'react';
import './TradeBtn.scss';
import Popup from './../modal/proposeTradePopUp';

class TradeBtn extends Component {
    constructor(props) {
        super(props);
        
        this.state = {isOpen: false };
    }

    sidePopUpModal() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    render() {
        return( 
            <div>
            <button className="trade-button" onClick={this.sidePopUpModal.bind(this)}>
                Propose Trade
            </button> 
            {/* <Popup show={this.state.isOpen} onClose={this.sidePopUpModal.bind(this)}>
            Trade Here
            </Popup> */}
            </div>
        )
    }
}

export default TradeBtn;