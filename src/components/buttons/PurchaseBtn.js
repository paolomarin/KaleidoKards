import React, { Component } from 'react';
import './PurchaseBtn.scss';

class PurchaseBtn extends Component {

    render() {
        return( 
            <button className="purchase-button" onClick={this.props.click}>Purchase</button>
        )
    }
}

export default PurchaseBtn;