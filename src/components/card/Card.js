import React, { Component } from 'react';
import './Card.scss'; 
import Star from './star.png';
import Diamond from './diamond.png';


class Card extends Component {


   renderCard() {

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

        const color= ["#202CE0", "#51C2FA", "#F99243", "#EE34A8", "#00CD79"];
        const shapes = [circle, triangle, star, square, diamond];


    
        const styles = {
        width: '150px',
        height: '200px',
        borderRadius: '12px',
        backgroundColor: color[this.props.color],
        marginBottom: '20px'
        };
    
        return (
                <div className="card" style={styles}>
                    <div style= {shapes[this.props.shape]}></div>
                </div>
        )
    }
    render() {
    //    let { shape, color} = this.props; 
        
        return( 
            <div>
                {this.renderCard()}
            </div>
            // <div className={`card ${color}`}>
            //     <div className={`${shape}`}></div> 
            // </div> 
        )
    }
}

export default Card;
