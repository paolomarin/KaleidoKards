import React, { Component } from 'react';
import './CardPopUp.scss'; 
import Star from './star.png';
import Diamond from './diamond.png';


class Card extends Component {

renderCardPopUp() {
    const circle = {
        backgroundColor: 'white',
        width: '60px',
        height: '60px',
        borderRadius: '50%'
        }
    
    const triangle = {
        color: 'transparent',
        width: '0',
        height: '0',
        borderRight: '40px solid transparent',
        borderLeft: '40px solid transparent',
        borderBottom: '80px solid white'
    }

    const square = {
        backgroundColor: 'white',
        width: '60px',
        height: '60px'
    }

    const star =
    {
        backgroundImage: `url(${Star})`,
        width: '80px',
        height: '80px'
        
    }

    const diamond = {
        backgroundImage: `url(${Diamond})`,
        width: '80px',
        height: '80px'
    }
        const shapes = [circle, triangle, star, square, diamond];

    return (
                <div className="card-colors">
                    <div style= {shapes[Math.floor(Math.random) *shapes.length]}></div>
                </div>
        )
    }
    render() {
    //    let { shape, color} = this.props; 
        
        return( 
            <div>
                {this.renderCardPopUp()}
            </div>
            // <div className={`card ${color}`}>
            //     <div className={`${shape}`}></div> 
            // </div> 
        )
    }
}

export default Card;
