import React, { Component } from 'react';
import './BasicPack.scss';
import BasicPackImg from './BasicPack.png';

class BasicPack extends Component {

    // handleClick() {
    //     return (
    //         <div className="overlay">
    //             <div className="popup">
    //                 <h2> Basic Pack </h2>
    //                 <a className="close" href="#">x</a>
    //                 <div className="content">
    //                     This pack comes with 3 random basic cards.
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
    render() {
        return( 
            <div>
            <h4>Basic Pack</h4>
                <div className="basic-pack">
                   {/* <button onClick={this.handleClick}>  */}
                   <img src= {BasicPackImg} className="pack-of-cards" alt="Pack-of-Cards"/>
                   {/* </button> */}
                   
                   
                </div>
           </div>
        )
    }
}

export default BasicPack;