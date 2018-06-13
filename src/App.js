import React, { Component } from 'react';
import Card from './components/card/Card';
import Header from './components/header/Header';
import './components/card/Card.scss';
import './App.scss';
import Footer from './components/footer/Footer';
import TradingContainer from './components/trade/tradingContainer';



class App extends Component {

  render() {

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
            </div>
          </div>
        </div>

        <Footer/>

      </div>
    );
  }
}

export default App;
