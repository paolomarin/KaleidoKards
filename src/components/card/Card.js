import React, { Component } from 'react';
import './Card.scss'; 
import PropTypes from 'prop-types';
import { ItemTypes } from './Constant';
import Star from './star.png';
import Diamond from './diamond.png';
import { DragSource } from 'react-dnd';


const cardSource = {

beginDrag(props) {
    // const item = props;
    // console.log('item', item);
    // return item;
    return props;
}
};

function collect(connect, monitor) {
    return{
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

class Card extends Component {
    constructor() {
        super();
    }



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
        width: '6rem',
        height: '8rem',
        borderRadius: '12px',
        backgroundColor: color[this.props.color],
        marginBottom: '20px'
        };
    
        return (
                <div className="card" draggable="true" style={styles}>
                    <div style= {shapes[this.props.shape]}
                ></div>
                </div>
        )
    }
    render() {
        const {connectDragSource, isDragging } = this.props;
   
        
        return connectDragSource( 
            <div>
                {this.renderCard()}
                {isDragging}
            </div>
            // <div className={`card ${color}`}>
            //     <div className={`${shape}`}></div> 
            // </div> 
        )
    }
}

Card.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.CARD, cardSource, collect) (Card);
