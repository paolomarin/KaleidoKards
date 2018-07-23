import React, { Component } from 'react';
import './Dashboard.scss';
import GotItBtn from './../buttons/GotItBtn';
import PurchaseAction from './../actions/PurchaseAction';
import TradeAction from './../actions/TradeAction';
class Dashboard extends Component {
    render() {

        if(this.props.visible) {
        return (
            <div className="overlay">
                <div className="square-popup-container">
                <h2 className="top-text"> Welcome to the KaleidoKards Trading Application</h2>
                        <div className="top-text-container">
                        <h2 className="informal-top">You will be communicating with a blockchain network that has been provisioned against your Kaleido Organization, and invoking a smart contract deployed in the environment. Your Ethereum User Account has been pre-funded with 100 Ether, with which you can acquire packs of Standard and/or Platinum cards by using the purchase button at the bottom of the screen.</h2>
                        </div>
                        <PurchaseAction/>
                    <div className="informal-text-container">
                        <h2 className="informal-text">Packs are priced at 25 Ether for standard and 50 Ether for Platinum. Both packs contain three unique cards.</h2>
                        <h2 className="informal-text">Your counterparty, Joe, will mimic your selection and automatically elect for the same purchase.</h2>  
                        <h2 className="informal-text">Each card exists as a unique index, with the relevant Ethereum account address directly mapped to the index upon purchase.  This mapping is written to the blockchain, providing an indelible and transparent proof of ownership.</h2>
                    </div>
                    <TradeAction/>
                    <div className="informal-text-container">
                        <h2 className="informal-text-right">After purchasing, you have the ability to propose trades with Joe.  Drag a card from each user's collection and click the `Propose Trade` Button.</h2>
                        {/* <h2 className="informal-text-right"> An accepted trade will invoke the transfer function in the smart contract.  A rejected trade will do nothing.</h2> */}
                        <h2 className="informal-text-right"> An accepted trade will invoke the transfer function in the smart contract and update the index to reflect the new owner's Ethereum account address.  A rejected trade is confined to the application and does not communicate with the blockchain network.</h2>
                        <h2 className="informal-text-right"> That's all there is to it!  Happy trading.</h2>
                    </div>
                    <GotItBtn onClick={this.props.click}/>
                </div>
            </div>
        );
    } if(!this.props.visible) {
        return null;
    }
}
}

export default Dashboard;