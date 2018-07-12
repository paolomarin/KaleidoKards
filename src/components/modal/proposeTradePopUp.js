import React, { Component } from 'react';
import './proposeTradePopUp.scss';
import './../styles/text.scss';
import './../styles/colors.scss';
import {ItemTypes } from './../card/Constant';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import Card from './../card/Card';

const targetSource= {
    drop(props, monitor, component) {
        monitor.didDrop()
    }
}


function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        item: monitor.getItem(),
    };
}



class ProposePopup extends Component {

    constructor(props) {
        super(props);


    }


//========================================================
// showMyCard function-- makes the illusion of cards being dropped into droptarget 


    showMyCard() {
        const margin = {
            marginRight: '1rem'
        }

        if(this.props.myKards && this.props.joeKards == null) {
            return;
        }

        let myOwnKard= this.props.myKards;
        let joesOwnKard= this.props.joeKards;
        return(
            <div className="show-card"> 
                    <Card color={myOwnKard.color} shape={myOwnKard.shape} effect={myOwnKard.effect} style={margin}/>
                    <Card color={joesOwnKard.color} shape={joesOwnKard.shape} effect={joesOwnKard.effect}/>
            </div>
        )
    }

    // Trade Function 
    //===================================================

    trade(userKard, joeKard) {
        userKard= this.props.myKards;
        joeKard= this.props.joeKards;
        //send my kard to joe
        window.fetch("/transfer", {
            body:JSON.stringify({from: 'user', to: 'joe', kardId:userKard.id}),
            method:"POST",
            headers: {
                'content-type': 'application/json'
            }
        }).then(results=> {
            return results.json();
        }).then(resultBody => {
            //Returns tx receipt so we should check it's status
            if(resultBody.receipt && resultBody.receipt.status) {
                //TODO: show trade success message
                console.log("Trade Success");
                this.props.refresh(); 
                this.props.empty();
            } else {
                console.log("Response does not contain tx receipt");
            }
            }).catch((error) => {
                //TODO: handle failed transfer
                console.log("errorMESSAGE");
                console.log(error);
            });

            //Send joe's kard to me
            window.fetch("/transfer", {
                body: JSON.stringify({from: 'joe', to:'user', kardId: joeKard.id}),
                method: "POST",
                headers:{
                    'content-type': 'application/json'
                }
            }).then(results => {
                return results.json();
            }).then(resultBody => {
                //Returns tx receipt so we should check it's status
                if(resultBody.receipt && resultBody.receipt.status) {
                    //TODO: show trade success message
                    console.log("Trade Success");
                    this.props.refresh();// make sure props are getting transferred in correctly from App.js
                    this.props.empty();
                } else {
                    console.log("Response does not contain tx receipt");
                }
            }).catch((error) => {
                console.log("errorMESSAGE");
                console.log(error);
            });
    }

     //===================================================
     //Random function


    random() {
        //Function that accepts or denies the trade
        return parseInt((Math.random() * 2) + 1);
    }
    //====================================================
    //Accept or Deny function

    acceptorDeny() {
        let randomFunction = this.random();
        if(randomFunction === 1) {
            alert('Trade denied');
            //return cards to their former spots
        }

        if(randomFunction === 2) {
            this.trade();
            alert('Trade accepted');
            //trade function commences 
            
        }
    }
    //=======================================================
    //Function used when click on Button

    proposeThisTrade() {
        this.acceptorDeny();
    }



    render() {

        const { connectDropTarget } = this.props;

        const backgroundStyle = {
            top: '8rem',
            padding: '2rem',
            background:'white',
            width: '15rem',
            height: '20rem',
            display: 'flex',
            alignItems: 'center',
            marginLeft: '1rem'
        };

        return connectDropTarget(
            <div className="propose-background" style={backgroundStyle} kard={this.props.myKards} card={this.props.joeKards}>
              {this.showMyCard()}
                <button className="button" onClick={this.proposeThisTrade.bind(this)}> Propose Trade </button>
            </div>
        )

    }

}


export default DropTarget(ItemTypes.CARD, targetSource, collect) (ProposePopup); 