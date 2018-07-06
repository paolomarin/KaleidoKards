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

const userGetKards = `/kards/user`;
const joeGetKards = `/kards/joe`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myKards: {},
            joeKards: {},
            myProposedCard: [],
            joeProposedCard:[]
        };
        this.refreshKards();
    }

    collectCards(card) {
        let cardId= parseInt(card.id);
      

        if(this.state.myKards.kards[cardId]) {
            this.setState({
                myProposedCard: this.state.myKards.kards[cardId]
            })

            this.setState(prevState=> {
                let myCardsNow= prevState.myKards;
                delete this.state.myKards.kards[cardId];
                return this.state.myKards;
            })


        }else if(this.state.joeKards.kards[cardId]) {
            this.setState({
                joeProposedCard: this.state.joeKards.kards[cardId]
            })

            this.setState(prevState=> {
                let joeCardsNow= prevState.joeKards;
                delete this.state.joeKards.kards[cardId];
                return this.state.joeKards;
            })
        }
     
     }

  emptyTradeCards() {
      this.setState({
        myProposedCard: [],
        joeProposedCard:[]
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
    }

    render() {
        //TODO: change h1/h2
        return (
          <div>
            <div>
            <Header/>
            <ProposePopup 
            myKards={this.state.myProposedCard} joeKards={this.state.joeProposedCard} refresh={this.refreshKards.bind(this)}
            empty={this.emptyTradeCards.bind(this)}
            />
              <div className="square-container">
                <div className="other-players-cards">
                  <TradingContainer moredata={this.state.joeKards} trade={(card) => this.collectCards(card)}/>
                </div>
                <div className="column-container">
                  <div className="ether">
                  <h1 className="amount-of-ether">100</h1>
                  <h2 className="text-style">Ether</h2>
                  </div>
                  <div className="my-cards">
                    <h2 className="my-cards-title header-text">My Cards</h2>
                       <MyCardsContainer data={this.state.myKards} trade={(card)=>this.collectCards(card)}/>
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
