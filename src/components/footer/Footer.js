import React, { Component } from 'react';
import './Footer.scss';
import PurchaseBtn from './../buttons/PurchaseBtn';
import BasicPack from './../basicPack/BasicPack';
import PlatinumPack from './../platinumPack/PlatinumPack';


const user= 'user';
const joe= 'joe';
const kard_store= 'kard_store';

const userGetKards = `/kards/${user}`;
const joeGetKards = `/kards/${joe}`;


class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            userCards: {},
            joeCards: {}
        
        };

        let url = this.state.value;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        //change url in purchase button here? 
        console.log(this.state.value);
    }

    clickPurchaseBtn() {

    //First Part 
        //console.log(KaleidoKards);
        // window.fetch(this.state.value, {
        //     body: JSON.stringify({purchaser: user}), 
        //     method: "POST",
        //     headers: {
        //         'content-type': 'application/json'
        //     }
        // }).then(results => {
        //     return results.json();
        
        // }).then(resultBody => {
        //     console.log('resultBody', resultBody);
        //     return resultBody;
            
        // }).then(getKards => {

                window.fetch( userGetKards, {
                    method: "GET",
                    headers: {
                        'content-type': 'application/json'
                    }
                    }).then(results => {
                        return results.json();
                        // this.setState({cards: results.json()});
                        
                    }).then(resultBody => {
                        this.setState({userCards: resultBody});
                        console.log('this state', this.state.userCards);
                        this.props.updateParent(this.state.userCards);
                       
                    }).then(getJoesKards => {
                         window.fetch( joeGetKards, {
                        method: "GET",
                        headers: {
                            'content-type': 'application/json'
                        }
                        }).then(results => {
                            return results.json();
                            // this.setState({cards: results.json()});
                            
                        }).then(resultBody => {
                            this.setState({joeCards: resultBody});
                            console.log('this state', this.state.joeCards);
                            this.props.otherUpdate(this.state.joeCards);
                           
                        })
                    })
                

            // })

            // if(resultBody.status === 200) {
            //     //then second part of function
            // } else {
            //     console.log('error');
            // }
        
        //can I put this here??

        // Second Part if first part is succesful

        // this.props.updateParent;
      }


    render() {
        return( 
            <div className="footer">
                <div className="footer-cards">
                    <BasicPack/>
                    <PlatinumPack/>
                </div>
                <div className="selection">
                    <form onSubmit= {this.handleSubmit}>
                        <label> 
                            Pick your pack:
                        <select value={this.state.value} onChange={this.handleChange}> 
                            <option> - - - - </option>
                            <option value="/purchase/standard"> Basic Pack</option>
                            <option value="/purchase/platinum"> Platinum Pack </option>
                        </select>
                        <PurchaseBtn click={this.clickPurchaseBtn.bind(this)} type="submit" value="Submit" />
                    </label>
    
                    </form>

                </div>
            </div> 
        )
    }
}

export default Footer;