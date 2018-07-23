import React, { Component } from 'react';
import './proposeTradePopUp.scss';
import './../styles/text.scss';
import './../styles/colors.scss';
import {ItemTypes } from './../card/Constant';
import { DropTarget } from 'react-dnd';
import Card from './../card/Card';
import LoadingDots from "../loading/loadingDots";
import Checkmark from './../loader/Checkmark';
import InvokingSmartContract from './../loader/InvokingSmartContract';
import Deny from './../loader/Deny';
import './../loader/InvokingSmartContract.scss';
import JoeDenied from './../loader/JoeDenied';
require('babel-polyfill');

const ACCEPT = 1;
const DENY = 2;
const JOE = 'joe';
const USER = 'user';

const targetSource= {
    drop(props, monitor, component) {
        monitor.didDrop()
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        item: monitor.getItem(),
    };
}

class ProposePopup extends Component {

    constructor(props) {
        super(props);

        this.state={
            tradeLoading: false,
            checkmark:false,
            words: false,
            ex:false,
            denied: false
        };
    }

    // showMyCard function-- makes the illusion of cards being dropped into droptarget
    showMyCard() {
        const margin = {
            marginRight: '1rem'
        };

        if(this.props.myKards && this.props.joeKards == null) {
            return;
        }

        let myOwnKard= this.props.myKards;
        let joesOwnKard= this.props.joeKards;
        return(
            <div className="show-card"> 
                    <div className="dashed-card-border">
                        <h4 className="card-name"> My Card </h4> 
                        <Card color={myOwnKard.color} shape={myOwnKard.shape} effect={myOwnKard.effect} style={margin}/>
                    </div>
                    <div className="dashed-card-border">
                        <h4 className="card-name"> Joe's Card </h4>
                        <Card color={joesOwnKard.color} shape={joesOwnKard.shape} effect={joesOwnKard.effect}/>
                    </div>
            </div>
        )
    }

    // Trade Function
    async trade(userKard, joeKard) {
        // TODO: say invoking solidity contract or something
        // TODO: fix this...
        userKard= this.props.myKards;
        joeKard= this.props.joeKards;
        //send my kard to joe
        setTimeout(() => this.afterCheckmark(),2000);
        return await Promise.all([
            this.transfer(JOE, USER, joeKard.id),
            this.transfer(USER, JOE, userKard.id),
        ]).then((response) => {
            // console.log(response);
        }).catch((error) => {
            //TODO: better handle error here
            console.log(error);
            console.log("Trade failed");
        });
        //Send joe's kard to me

    }

    transfer(from, to, kardId) {
        return window.fetch("/transfer", {
            body: JSON.stringify({from: from, to: to, kardId: kardId}),
            method: "POST",
            headers:{
                'content-type': 'application/json'
            }
        }).then(results => {
            return results.json();
        }).then(resultBody => {
            //Returns tx receipt so we should check it's status
            if (resultBody.receipt && resultBody.receipt.status) {
                //TODO: show trade success message
                // console.log("Transfer Success. kardId: "+ kardId +" from: " + from + " to: " + to);
                return resultBody;
            } else {
                console.log("Response does not contain tx receipt or tx failed");
                console.log(resultBody);
            }
        }).catch((error) => {
            console.log("errorMESSAGE");
            console.log(error);
        });
    }

    //Random function
    random() {
        //Function that accepts or denies the trade
        return parseInt((Math.random() * 2) + 1);
    }

    //Accept or Deny function
    async acceptorDeny() {
        // TODO: Change notification system (no alert, show text or something)
        let random = this.random();
        if (random === DENY) {
            this.tradeDenied();
            this.joeDenied();
            setInterval(() => this.joeTextDisappear(), 4000);
            setInterval(() => this.exmarkDisappear(), 4000);

            //TODO: return cards to their former spots?
            return await [];
        } else if (random === ACCEPT) {
            // alert('Trade accepted')
            this.tradeAccepted();
            setInterval(() => this.checkmarkDisappear(), 2000);
            return await this.trade();
        }
    }


    //Function used when click on Button
    proposeThisTrade() {
        this.loading();

        this.acceptorDeny().then(() => {
            this.notLoading();
            this.props.refresh();
            this.props.empty();
            this.wordsDisappear();
        });
    }

    loading(){
        this.setState({tradeLoading: true});
    }

    notLoading(){
        this.setState({tradeLoading: false});
    }

    tradeAccepted() {
        this.setState({
            checkmark:true
        })
    }

    tradeDenied() {
        this.setState({
            ex:true
        })
    }

    joeDenied() {
        this.setState({
            denied:true
        })
    }

    joeTextDisappear() {
        this.setState({
            denied:false
        })
    }

    exmarkDisappear() {
        this.setState({
            ex:false
        })
    }

    afterCheckmark() {
        this.setState({
            words:true
        })
    }

    wordsDisappear() {
        this.setState({
            words:false
        })
    }

    checkmarkDisappear() {
        this.setState({
            checkmark:false
        })
    }


    render() {
        const { connectDropTarget } = this.props;

        const backgroundStyle = {
            position:'relative',
            paddingTop: '2rem',
            paddingBottom: '2rem',
            background:'white',
            width: '20rem',
            height: '20rem',
            display: 'flex',
            alignItems: 'center',
            marginLeft: '1rem'
        };

        return connectDropTarget(
            <div className="propose-background" style={backgroundStyle} kard={this.props.myKards} card={this.props.joeKards}>
                <h2 className="trade-text"> Trade</h2>
                <InvokingSmartContract visible={this.state.words} contract={this.props.smartContractAddress}/>
                <JoeDenied visible={this.state.denied}/>
                {this.showMyCard()}
                <Checkmark visible={this.state.checkmark}/>
                <Deny visible={this.state.ex}/>
                <button className={this.state.tradeLoading ? "propose-button disabled" : "propose-button"} onClick={this.proposeThisTrade.bind(this)}>
                    <LoadingDots visible={this.state.tradeLoading} text="Propose Trade"/>
                </button>
            </div>
        )
    }

}


export default DropTarget(ItemTypes.CARD, targetSource, collect) (ProposePopup); 