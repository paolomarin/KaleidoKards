import React, { Component } from 'react';
import './tradingContainer.scss';
import _ from 'lodash';
import Card from './../card/Card';
import TradeBtn from './../buttons/TradeBtn';
import './../styles/text.scss';

class tradingContainer extends Component {
    generateCards() {
        // The data is structured:
        // {
        //   "26": {"color": 1, "shape": 3, "effect": 1}
        //   "321": {"color": 93, "shape": 31, "effect": 10}
        // }

        let Kards = this.props.moredata.kards; // data is from clickPurchaseBtn function- contains resultBody. Passed in through App.js.
        if(Kards) {
        
            let keysArray = Object.keys(Kards) // way to use an object in a map function. 
            let cardsArray = keysArray.map((key) => {
                let Kard = Kards[key]; // this grabs the object from the key. 
                let card = (<Card color={Kard.color} shape={Kard.shape} effect={Kard.effect}/>)
                return card // returns card component in map function
            });
            return cardsArray // returns cardArray in the generateCards function so as it shows up in browser.
}

    else{
       console.log("error");
    }
}


      render() {
        // const users = ["Kaleido's Cards", "Joe's Cards"].map((user) => {
        //     return(
        //     <div>
        //         <h3 key={user}> {user}</h3>
        //         <div className="card-container">
        //             <Card/>
        //             <Card/>
        //             <Card/>
        //         </div>
        //     </div>
        //     );
        // });
        
        return( 
            <div className="trading-container">
                <h3 className="header-text"> Joe's Cards </h3>
                    <div className="card-container">
                        {this.generateCards()}
                    </div>
                
                <TradeBtn/>
             
             </div> 
        )
    }
}


export default tradingContainer;
