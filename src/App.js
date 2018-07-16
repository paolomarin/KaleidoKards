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
import ProposePopup from './components/modal/proposeTradePopUp';
import Checkmark from './components/loader/Checkmark';

const userGetKards = `/kards/user`;
const joeGetKards = `/kards/joe`;
const getBalance = `/balance/user`; // joe balance should always be the same as the user's

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myKards: {},
            joeKards: {},
            myProposedCard: [],
            joeProposedCard:[],
            ether: ''
        };
        this.refreshKards();
    }

    collectCards(card) {
        let cardId= parseInt(card.id);

        if (this.state.myKards.kards[cardId]) {
            this.setState({
                myProposedCard: this.state.myKards.kards[cardId]
            });

            this.setState(prevState=> {
                let myCardsNow= prevState.myKards;
                delete this.state.myKards.kards[cardId];
                return this.state.myKards;
            });
            //This is getting rid of the card in the container as you drag it to the trading container

        } else if (this.state.joeKards.kards[cardId]) {
            this.setState({
                joeProposedCard: this.state.joeKards.kards[cardId]
            });

            this.setState(prevState=> {
                let joeCardsNow= prevState.joeKards;
                delete this.state.joeKards.kards[cardId];
                return this.state.joeKards;
            });
            //This is getting rid of the card in the container as you drag it to the trading container
        }
    }

    emptyTradeCards() {
      this.setState({
        myProposedCard: [],
        joeProposedCard: []
      })

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
            this.setState({ether: resultBody.balance})
        });
    }

    render() {
        //TODO: change h1/h2
        return (
          <div>
            <div>
            <Header etherAmount={this.state.ether}/>
              <div className="square-container">
                <div className="my-cards">
                    <h2>My Cards</h2>
                       <MyCardsContainer data={this.state.myKards} trade={(card)=>this.collectCards(card)}/>
                  </div>

                <div classname="middle-container">
                    <ProposePopup 
                        myKards={this.state.myProposedCard} joeKards={this.state.joeProposedCard} refresh={this.refreshKards.bind(this)}
                        empty={this.emptyTradeCards.bind(this)}
                    />
                </div>
                  <div className="other-players-cards">
                <h2>Joe's Cards</h2>
                  <TradingContainer moredata={this.state.joeKards} trade={(card) => this.collectCards(card)}/>
                </div>
              </div>
            </div>
            <Checkmark/>
            <Footer refreshKards={this.refreshKards.bind(this)}/>
          </div>
        );
    }
}

export default  DragDropContext(HTML5Backend) (App);
