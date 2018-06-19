import React, { Component } from 'react';
import './Card.scss'; 


class Card extends Component {


   renderCard() {

    const circle = {
        backgroundColor: 'white',
        width: '80px',
        height: '80px',
        borderRadius: '50%'
        }
    
    const triangle = {
        color: 'transparent',
        width: '0',
        height: '0',
        borderRight: '50px solid transparent',
        borderLeft: '50px solid transparent',
        borderBottom: '100px solid white'
    }

    const square = {
        backgroundColor: 'white',
        width: '80px',
        height: '80px'
    }

    const star =
    {

    margin:'50px 0',
    position: 'relative',
    display: 'block',
    color: 'white',
    width: '0px',
    height: '0px',
    borderRight: '100px solid transparent',
    borderBottom: '70px solid white',
    borderLeft: '100px solid transparent',
    mozTransform: 'rotate(35deg)',
    webkitTransform: 'rotate(35deg)',
    msTransform: 'rotate(35deg)',
    oTransform: 'rotate(35deg)',
    ':hover': {
    
            borderBottom: '80px solid white',
            borderLeft: '30px solid transparent',
            borderRight: '30px solid transparent',
            position: 'absolute',
            height: '0',
            width: '0',
            top: '-45px',
            left: '-65px',
            display: 'block',
            content: '',
            WebkitTransform: 'rotate(-35deg)',
            mozTransform: 'rotate(-35deg)',
            msTransform: 'rotate(-35deg)',
            oTransform: 'rotate(-35deg)'
        },

        ':after': {
            position: 'absolute',
            display: 'block',
            color: 'white',
            top: '3px',
            left: '-105px',
            width: '0',
            height: '0',
            borderRight: '100px solid transparent',
            borderBottom: '70px solid white',
            borderLeft: '100px solid transparent',
            webkitTransform: 'rotate(-70deg)',
            mozTransform: 'rotate(-70deg)',
            msTransform: 'rotate(-70deg)',
            oTransform: 'rotate(-70deg)',
            content: ''
        }
    }

        const color= ["#202CE0", "#51C2FA", "#F99243", "#EE34A8", "#00CD79"];
        const shapes = [circle, triangle, star, square];


    
        const styles = {
        width: '150px',
        height: '200px',
        borderRadius: '12px',
        backgroundColor: color[Math.floor(Math.random() * color.length)]
        };
    
        return (
                <div className="card" style={styles}>
                    <div style= {shapes[Math.floor(Math.random() * shapes.length)]}></div>
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
