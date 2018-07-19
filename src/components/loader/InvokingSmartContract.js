import React, { Component } from 'react';
import './InvokingSmartContract.scss';

class InvokingSmartContract extends Component {
    constructor(props) {
        super(props);
    }

    render() {

    if (this.props.visible) {
        return(
            <div className="smart-contract-container">
                <h6 className="smart-contract-text">Invoking Smart Contract at</h6>
                <h6 className="smart-contract">{this.props.contract}</h6>
                
            </div>
        );
    }
    return null;
}
}

export default InvokingSmartContract;