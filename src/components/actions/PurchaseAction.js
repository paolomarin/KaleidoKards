import React, { Component } from 'react';
import PurchaseActionImg from './PurchaseActions.png';
import './Purchase.scss';

class PurchaseAction extends Component {
    render() {
        return(
            <div className="purchase-action-container">
                <img className="purchase-action-image" src={PurchaseActionImg}/>
            </div>
        )
    }
}

export default PurchaseAction;