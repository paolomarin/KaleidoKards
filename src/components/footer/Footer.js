import React, { Component } from 'react';
import './Footer.scss';
import PurchaseBtn from './../buttons/PurchaseBtn';
import BasicPack from './../basicPack/BasicPack';
import PlatinumPack from './../platinumPack/PlatinumPack';
import LoaderSmall from './../loader/LoaderSmall';


const user= 'user';
const joe= 'joe';
const kard_store= 'kard_store';


class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            userCards: {},
            joeCards: {},
            visible:false
        };

        let url = this.state.value;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        
        this.setState({
            value: event.currentTarget.dataset.id
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    smallLoader() {
        this.setState({
            visible:true
        })
    }

    disappear() {
        this.setState({
            visible:!this.state.visible
        })
    }

    buyKards(purchaser) {

        this.smallLoader();
        window.fetch(this.state.value, {
            body: JSON.stringify({purchaser: purchaser}),
            method: "POST",
            headers: {
                'content-type': 'application/json'
            }
        }).then(results => {
            return results.json();
        }).then(resultBody => {
            if (resultBody && resultBody.receipt && resultBody.receipt.status) {
                this.disappear();
                this.props.refreshKards();
            }
            return resultBody;
        });
    }

    clickPurchaseBtn() {

        this.buyKards('user');
        this.buyKards('joe');
        // TODO: Need to update shown ether amount
    }


    render() {

        return( 
            <div className="footer">
                <h2 className="store"> Store </h2>
                <div className="selection">
                    <form className="form" onSubmit= {this.handleSubmit}>
                     <div>
                           <ul className="unordered-list-style">
                                <li onClick={this.handleChange.bind(this)} data-id="/purchase/standard">
                                    <BasicPack/>
                                </li>
                                <li onClick={this.handleChange.bind(this)} data-id="/purchase/platinum">
                                    <PlatinumPack/>
                                </li>
                            </ul>
                        </div>

                        <PurchaseBtn click={this.clickPurchaseBtn.bind(this)} type="submit" value="Submit" onSubmit= {this.handleSubmit} />
                    </form>
                </div>
            </div> 
        )
    }
}

export default Footer;