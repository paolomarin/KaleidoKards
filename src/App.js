import React, { Component } from 'react';
import Header from './components/header/Header';
import './components/card/Card.scss';
import './components/styles/text.scss';
import './App.scss';
import Footer from './components/footer/Footer';
import TradingContainer from './components/trade/tradingContainer';
import MyCardsContainer from './components/mycards/MyCardsContainer';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

const userGetKards = `/kards/user`;
const joeGetKards = `/kards/joe`;
const getBalance = `/balance/user`; // joe balance should always be the same as the user's

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

        window.fetch( getBalance, {
            method: "GET",
            headers: {
                'content-type': 'application/json'
            }
        }).then(results => {
            return results.json();
        }).then(resultBody => {
            document.getElementById("etherAmount").innerText = resultBody.balance;
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
                  <p id="etherAmount" className="amount-of-ether"/>
                  <p className="text-style">Ether</p>
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

export default  DragDropContext(HTML5Backend) (App);
