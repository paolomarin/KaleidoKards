import React, { Component } from 'react';
import './PurchaseBtn.scss';
import kaleidoKards from './../../utils/kaleidoKards';

class PurchaseBtn extends Component {

    handleClick() {
          return (
          console.log( kaleidoKards.asUser().buyStandardPack())
          )
      }

    render() {
        return( 
            <button className="purchase-button" onClick={this.handleClick.bind(this)}>

                Purchase 
            </button> 
        )
    }
}

export default PurchaseBtn;