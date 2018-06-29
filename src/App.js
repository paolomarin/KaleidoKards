import React, { Component } from 'react';
import Header from './components/header/Header';
import './components/card/Card.scss';
import './components/styles/text.scss';
import './App.scss';
import Footer from './components/footer/Footer';
import TradingContainer from './components/trade/tradingContainer';
import MyCardsContainer from './components/mycards/MyCardsContainer';

const userGetKards = `/kards/user`;
const joeGetKards = `/kards/joe`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myKards: {},
            joeKards: {}
        };
        this.refreshKards();
    }

    refreshKards() {
        window.fetch( userGetKards, {
            method: "GET",
            headers: {
                'content-type': 'application/json'
            }
        }).then(results => {
            return results.json();
        }).then(resultBody => {
            this.setState({myKards: resultBody});
        });

        window.fetch( joeGetKards, {
            method: "GET",
            headers: {
                'content-type': 'application/json'
            }
        }).then(results => {
            return results.json();
        }).then(resultBody => {
            this.setState({joeKards: resultBody});
        });
    }

    render() {
        //TODO: change h1/h2
        return (
          <div>
            <div>
            <Header/>
              <div className="square-container">
                <div className="other-players-cards">
                  <TradingContainer moredata={this.state.joeKards}/>
                </div>
                <div className="column-container">
                  <div className="ether">
                  <h1 className="amount-of-ether">100</h1>
                  <h2 className="text-style">Ether</h2>
                  </div>
                  <div className="my-cards">
                    <h2 className="my-cards-title header-text">My Cards</h2>
                       <MyCardsContainer data={this.state.myKards}/>
                  </div>
                </div>
              </div>
            </div>
            <Footer refreshKards={this.refreshKards.bind(this)}/>
          </div>
        );
    }
}

export default App;
