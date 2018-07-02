import React, { Component } from 'react';
import Card from './../card/Card';
import './../styles/text.scss';
import './MyCardsContainer.scss';

class MyCardsContainer extends Component {
    constructor() {
        super();
    }
    generateCards() {
        // The data is structured:
        // {
        //   "26": {"color": 1, "shape": 3, "effect": 1}
        //   "321": {"color": 93, "shape": 31, "effect": 10}
        // }

        let Kards = this.props.data.kards; // data is from clickPurchaseBtn function- contains resultBody. Passed in through App.js.
        if(Kards) {
        
            let keysArray = Object.keys(Kards) // way to use an object in a map function. 
            let cardsArray = keysArray.map((key) => {
                let Kard = Kards[key]; // this grabs the object from the key. 
            let card = (<Card id={Kard.id} color={Kard.color} shape={Kard.shape} effect={Kard.effect}/>)
                return card // returns card component in map function
            });
            return cardsArray // returns cardArray in the generateCards function so as it shows up in browser.
}

    else{
       console.log("error");
    }
}



      render() {
           
        return( 
                    <div className="my-card-container">
                        {this.generateCards()}
                    </div>
        )
    }
}


export default MyCardsContainer;