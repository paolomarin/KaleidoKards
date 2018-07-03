import React, { Component } from 'react';
import './proposeTradePopUp.scss';
import './../styles/text.scss';
import './../styles/colors.scss';
import {ItemTypes } from './../card/Constant';
import { findDOMNode } from 'react-dom';
import {moveCards} from './function';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';


const cardTarget = {
   drop(props) {
       moveCards(props.x, props.y);
   }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        itemType: monitor.getItemType()
    };
}



class ProposePopup extends Component {

    constructor() {
        super();

        this.state = {
            cards: []
        }
    }

    render() {

        const { isOver, connectDropTarget, x, y } = this.props;

        const backgroundStyle = {
            position:'absolute',
            top: '8rem',
            left: '4rem',
            padding: '2rem',
            backgroundColor: 'white',
            width: '15rem',
            height: '20rem'
        };

        // const popupStyle = {
        //     backgroundColor: 'white',
        //     width:'1080px',
        //     height: '1138px',
        //     margin: '326px 0px',
        //     marginLeft: '148px',
        //     padding: '30px',
        //     fontSize: '80px'

        // };

        const closebtnStyle = {
            outline: 'none',
            backgroundColor: 'transparent',
            color: 'grey',
            border: 'none',
            fontSize: '1rem',
        };
        return connectDropTarget(
            <div className="propose-background" style={backgroundStyle} >
                {isOver &&  <div style= {{ backgroundColor:'aliceblue', height: '100%',
            width: '100%'}}/>}
                
            </div>

            
        )

    }

}

ProposePopup.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
};


export default DropTarget(ItemTypes.CARD, cardTarget, collect) (ProposePopup); 