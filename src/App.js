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

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract(web3)
    })
    .catch((err) => {
      console.log(err)
    })
  }


  instantiateContract(web3) {

      // const contract = require('truffle-contract');

    const kaleidoKards = new web3.eth.Contract(KaleidoKardsContract.abi, '0xb7a996f99afff30a8a7c5b95aa9617f0985da9ee');
    console.log(kaleidoKards, "BANANA");

    //TODO: remove me

      // kaleidoKards.methods.buyStandardPack().send({from: "0x33F1ba1fa5F83Bc031E54bbBFBd2fF394707864C", gas: 300000000, value: web3.utils.toWei('1', 'ether')}).then(function(receipt){
      //     console.log(receipt);
      // // })
      // // .catch((err) =>{
      // //     //todo: handle error
      // });

      kaleidoKards.methods.getOwnedKards("0x33F1ba1fa5F83Bc031E54bbBFBd2fF394707864C").call().then(
          (response) => {
            console.log(response);
          })
          .catch(
              (error) => {
                  console.log(error);
                  //todo handle error
          });

      //todo: make this a function
    var myKards = new Map();
    kaleidoKards.methods.getKard(kardId).call().then(
        (response) => {
            myKards[kardId] = response;
        })
        .catch(
            (error) => {
                console.log(error);
                //todo handle error
            }
        );

    kaleidoKards.methods.maxColor().call().then(function(response) {
      console.log(response);
    })
    .catch((err) =>{
      //todo: handle error
    });

    this.setState({
        kaleidoKardsInstance: kaleidoKards
    })

    // Get accounts.
    // this.state.web3.eth.getAccounts((error, accounts) => {
    //  kaleidoKards.deployed().then((instance) => {
    //    instance.getKards().then((x) => console.log(x));
    //    this.setState({
    //      kaleidoKardsInstance: instance
    //    })
    //   })
    // })

    
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
