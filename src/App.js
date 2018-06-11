import React, { Component } from 'react';
import Card from './components/card/Card';
import Header from './components/header/Header';
import './components/card/Card.scss';
import './App.scss';
import Footer from './components/footer/Footer';
import TradeBtn from './components/buttons/TradeBtn';
import _ from 'lodash';


class App extends Component {

  render() {

    return (
      <div>
        <Header/>
        <div className= "App">
          <div className = "square-container">
            <div className="other-players-cards">
              <h2> Trade Cards </h2>
              <TradeBtn/>
            </div>
            <div className="column-container">
              <div className="ether">
              </div>
              <div className="my-cards">
                <h2> My Cards </h2>
              </div>
            </div>
          </div>

        {/*<div>
          <Card color="blue" shape="triangle"/>
          <Card color="light-blue" shape="circle"/>
          <Card color="orange" shape="star"/>
        </div>*/}
        </div>

        <Footer/>

      </div>
    );
  }
}

export default App;
