import React, { Component } from 'react';
import './BasicPack.scss';
import BasicPackImg from './BasicPack.png';

class BasicPack extends Component {
    render() {
        return( 
            <div>
            <h4>Basic Pack</h4>
                <div className="basic-pack">
                   <a className="button" > 
                   <img src= {BasicPackImg} className="pack-of-cards" alt="Pack-of-Cards"/>
                   </a>

                   <div className="basicpackpopup overlay">
                    <div className="popup">
                        <h2> Basic Pack </h2>
                        <a className="close" href="#"> &times;</a>x
                        <div> className="content">
                            This pack comes with 3 random basic cards.
                        </div>
                    </div>
                    </div>
                   
                   
                </div>
           </div>
        )
    }
}

export default BasicPack;