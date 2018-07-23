import React, { Component } from 'react';
import './launchDesign.scss';
import StarShape from './star.svg';
import TriangleShape from './Triangle.svg';
import CircleShape from './Circle.svg';
import DiamondShape from './Diamond.svg';
import SquareShape from './Square.svg';
import TriangleBlue from './TriangleBlue.png';
import SquareOrange from './SquareOrange.png';
import TrianglePink from './TrianglePink.png';
import SquareGreen from './SquareGreen.png';
import DiamondPink from './DiamondPink.png';

class LaunchDesign extends Component {



    render() {
          
        return (
            <div className="shapes"> 
                <div className="star-shape-design"> 
                   <img src={StarShape} className="star-shape-image"/>
                </div>
                <div className="square-two"> 
                    <img src={SquareGreen} className="square-shape-two"/>
                </div>
                <div className="square-shape-two">
                    <img src={DiamondPink} className="star-shape-design square-pink"/>
                </div>
                <div>
                    <img src={CircleShape} className="circle-shape-three"/>
                </div>  
                <div className="star-two"> 
                   <img src={StarShape} className="star-shape-two"/>
                </div>
                <div className="star-three"> 
                   <img src={StarShape}/>
                </div>
                <div className="square-shape"> 
                    <img src={SquareShape} className="square-shape-one"/>
                </div>
                <div>
                    <img src={CircleShape} className="circle-shape-four"/>
                </div> 
                <div className="square-three"> 
                    <img src={SquareShape} className="square-shape-three"/>
                </div>
                <div> 
                    <img src={TrianglePink} className="triangle-shape-two"/>
                </div> 
                <div className="square-four"> 
                    <img src={SquareOrange} className="square-shape-four"/>
                </div>

                <div>
                    <img src={CircleShape} className="circle-shape-one"/>
                </div> 

                <div className="diamond-shape">
                    <img src={DiamondShape} className="diamond-shape-one"/>
                </div> 

                 <div>
                    <img src={CircleShape} className="circle-shape-two"/>
                </div>  
                <div> 
                    <img src={TriangleBlue} className="triangle-shape-one"/>
                </div> 


                <div className="square-five"> 
                    <img src={SquareShape} className="square-shape-five"/>
                </div>


            </div>
        )
    }
}

export default LaunchDesign; 