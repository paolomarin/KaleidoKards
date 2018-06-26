import React, { Component } from 'react';
import './CardPopUp.scss'; 
import Shapes from './shapes.gif';


class Card extends Component {

renderCardPopUp() {
   
    const shapes = {
        backgroundImage: `url(${Shapes})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '210px',
        height: '220px',
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingTop: '60px'
    }

    return (
                <div className="card-colors">
                    <div style= {shapes}></div>
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
