import React, { Component } from 'react';
import Card from './components/card/Card';
import Header from './components/header/Header';
import './components/card/Card.scss';
import './components/styles/text.scss';
import './App.scss';
import Footer from './components/footer/Footer';
import TradingContainer from './components/trade/tradingContainer';
import MyCardsContainer from './components/mycards/MyCardsContainer';





class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data: {},
        joe: {}
    };  
}


updateParentComponent(cards) {
  this.setState({data: cards});
}

updateParentComp(joesCards) {
  this.setState({joe: joesCards});
}
  render() {
    //let cards = this.state.cards;
    return (
      <div>
        <div>
        <Header/>
          <div className = "square-container">
            <div className="other-players-cards">
              <TradingContainer moredata={this.state.joe}/>
            </div>
            <div className="column-container">
              <div className="ether">
              <h1 className="amount-of-ether"> 100</h1>
              <h2 className="text-style"> Ether </h2>
              </div>
              <div className="my-cards">
                <h2 className="my-cards-title header-text"> My Cards </h2>
                   <MyCardsContainer data={this.state.data}/>
              </div>
            </div>
          </div>
        </div>

        <Footer updateParent={this.updateParentComponent.bind(this)} otherUpdate={this.updateParentComp.bind(this)}/>

      </div>
    );
  }
}

export default App;
