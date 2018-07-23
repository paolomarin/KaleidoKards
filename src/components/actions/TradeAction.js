import React, { Component } from 'react';
import TradeActionImg from './TradeActions.png';
import './TradeActions.scss';

class TradeAction extends Component {
    render() {
        return(
            <div className="trade-action-container">
                <h2 className="trade-action-text"> Trade</h2>
                <img className="trade-action-image" src={TradeActionImg}/>
            </div>
        )
    }
}

export default TradeAction;