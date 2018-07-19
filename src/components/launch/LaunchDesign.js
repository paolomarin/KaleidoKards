import React, { Component } from 'react';
import './launchDesign.scss';
import StarShape from './star.svg';
import TriangleShape from './Triangle.svg';
import CircleShape from './Circle.svg';
import DiamondShape from './Diamond.svg';
import SquareShape from './Square.svg';

class LaunchDesign extends Component {



    render() {
          
        return (
            <div className="shapes"> 
                <div className="star-shape-design"> 
                   <img src={StarShape} className="star-shape-image"/>
                </div>
                <div className="square-two"> 
                    <img src={SquareShape} className="square-shape-two"/>
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
                    <img src={TriangleShape} className="triangle-shape-two"/>
                </div> 
                <div className="square-four"> 
                    <img src={SquareShape} className="square-shape-four"/>
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
                    <img src={TriangleShape} className="triangle-shape-one"/>
                </div> 


                <div className="square-five"> 
                    <img src={SquareShape} className="square-shape-five"/>
                </div>


            </div>
        )
    }
}

export default LaunchDesign; 