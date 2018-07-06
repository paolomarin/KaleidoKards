import React, { Component } from 'react';
import './proposeTradePopUp.scss';
import './../styles/text.scss';
import './../styles/colors.scss';
import {ItemTypes } from './../card/Constant';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import Card from './../card/Card';
import TradeBtn from './../buttons/TradeBtn';


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


    showMyCard() {
        const margin = {
            marginRight: '1rem'
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



    render() {
        console.log('my trade props', this.props);

        const { connectDropTarget } = this.props;

        const backgroundStyle = {
            position:'absolute',
            top: '8rem',
            left: '1rem',
            padding: '2rem',
            background:'white',
            width: '15rem',
            height: '20rem',
            display: 'flex',
            alignItems: 'center'
        };

        return connectDropTarget(
            <div className="propose-background" style={backgroundStyle} kard={this.props.myKards} card={this.props.joeKards}>
              {this.showMyCard()}
                <button className="button"> Propose Trade </button>
            </div>
        )

    }

}

// ProposePopup.propTypes = {
//     connectDropTarget: PropTypes.func.isRequired
// };


export default DropTarget(ItemTypes.CARD, targetSource, collect) (ProposePopup); 