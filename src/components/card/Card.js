import React, { Component } from 'react';
import './Card.scss';

class Card extends Component {
    render() {
       let { shape, color} = this.props; 
        
        return( 
            <div className={`card ${color}`}>
                <div className={`${shape}`}></div> 
            </div> 
        )
    }
}

export default Card;
