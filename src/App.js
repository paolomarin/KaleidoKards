import React, { Component } from 'react';
import Card from './components/card/Card';
import Header from './components/header/Header';
import './components/card/Card.scss';
import './App.scss';
import Footer from './components/footer/Footer';
import TradingContainer from './components/trade/tradingContainer';
import KaleidoKardsContract from '../build/contracts/KaleidoKards.json';
import getWeb3 from './utils/getWeb3';




class App extends Component {
  constructor() {
    super();

    this.state = {
      web3: null,
      kaleidoKardsInstance: null,
      cards: []

    }
  }

  componentWillMount () {

    console.log("here");
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch((err) => {
      console.log(err)
    })
  }


  instantiateContract() {
    
    const kaleidoKards = new this.state.web3.Contract(KaleidoKardsContract, 'contractAddress')
    console.log(kaleidoKards, "BANANA");
  


    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
     kaleidoKards.deployed().then((instance) => {
       instance.getKards().then((x) => console.log(x));
       this.setState({
         kaleidoKardsInstance: instance
      
       })
      })
    })

    
  }
 
  // getCards() {
  //   let result = getCards;
  //   this.setState({cards: <Card shape= {result.shape} color={result.color} />})
  // }

  render() {
    // let cards = this.state.cards;
    return (
      <div>
        <Header/>
        <div className= "App">
          <div className = "square-container">
            <div className="other-players-cards">
              <h2> Trade Cards </h2>
              <TradingContainer/> 
            </div>
            <div className="column-container">
              <div className="ether">
              </div>
              <div className="my-cards">
                <h2 className="my-cards-title"> My Cards </h2>
                <div className="my-cards-container">
                  <Card color="blue" shape="triangle"/>
                  <Card color="light-blue" shape="circle"/>
                  <Card color="orange" shape="star"/>
                </div>
              </div>
              <div>
                  {/* {cards}
                  <button onClick={this.getCards}> Get Cards</button> */}
              </div>
            </div>
          </div>
        </div>

        <Footer/>

      </div>
    );
  }
}

export default App;
