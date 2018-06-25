import React, { Component } from 'react';
import './PurchaseBtn.scss';
// import KaleidoKards from './../../utils/kaleidoKards';

class PurchaseBtn extends Component {



    //     let kalKards = new KaleidoKards();
    //     // kalKards.buyPlatinumPack('user_node').then((response) => {
    //     //     console.log(response, "DMB");
            
    //     // }).catch((error) => {
    //     //     console.log(error, "ERROR HERE");
    //     // });

    //    kalKards.getOwnedKards('user_node').then((response) => {
    //         console.log(response, "DMB");
    //     }).catch((error)=> {
    //         console.log(error, "Error here");
            
    //     });
    

    // handleClick() {
    //       return (
    //       console.log( kaleidoKards.asUser().buyStandardPack())
    //       )
    //   }onClick={this.handleClick.bind(this)

    render() {
        return( 
            <button className="purchase-button" onClick={this.props.click}>

                Purchase 
            </button> 
        )
    }
}

export default PurchaseBtn;