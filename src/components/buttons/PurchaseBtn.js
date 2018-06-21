import React, { Component } from 'react';
import './PurchaseBtn.scss';
import KaleidoKards from './../../utils/kaleidoKards';

class PurchaseBtn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        };

       this.clickPurchaseBtn = this.clickPurchaseBtn.bind(this)
    }

 clickPurchaseBtn() {
        //console.log(KaleidoKards);
        window.fetch("http://localhost:3000/purchase", {
            body: JSON.stringify({hello: "world"}), 
            method: "POST",
            headers: {
                'content-type': 'application/json'
            }
        }).then(results => {
            return results.json();
        
        }).then(resultBody => {
            console.log('resultBody', resultBody);
        })



        let kalKards = new KaleidoKards();
        // kalKards.buyPlatinumPack('user_node').then((response) => {
        //     console.log(response, "DMB");
            
        // }).catch((error) => {
        //     console.log(error, "ERROR HERE");
        // });

       kalKards.getOwnedKards('user_node').then((response) => {
            console.log(response, "DMB");
        }).catch((error)=> {
            console.log(error, "Error here");
            
        });
    }

    // handleClick() {
    //       return (
    //       console.log( kaleidoKards.asUser().buyStandardPack())
    //       )
    //   }onClick={this.handleClick.bind(this)

    render() {
        return( 
            <button className="purchase-button" onClick={this.clickPurchaseBtn}>

                Purchase 
            </button> 
        )
    }
}

export default PurchaseBtn;