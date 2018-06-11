import React, { Component } from 'react';
import './Card.scss';

class Card extends Component {
    render() {
        let {shape, color} = this.props;
        return( 
            <div className="card">
            <div className={`${shape} ${color}`}></div>
            </div> 
        )
    }
}

export default Card;
