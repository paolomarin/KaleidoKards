import React, { Component } from 'react';
import './Footer.scss';
import PurchaseBtn from './../buttons/PurchaseBtn';
import BasicPack from './../basicPack/BasicPack';
import PlatinumPack from './../platinumPack/PlatinumPack';


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
            visible:false,
            purchaseLoading: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    loading(){
        this.setState({purchaseLoading: true});
    }

    notLoading(){
        this.setState({purchaseLoading: false});
    }

    handleChange(event) {

        this.setState({
            value: event.currentTarget.dataset.id
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }


    buyKards(purchaser) {

        // this.smallLoader();
        return window.fetch(this.state.value, {
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
        this.loading();
        let buyPromises = Promise.all([
            this.buyKards('user'),
            this.buyKards('joe')]);
        buyPromises.then(() => this.notLoading()); // TODO: not this bc ignores errors
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

                        <PurchaseBtn loading={this.state.purchaseLoading}
                                     click={this.clickPurchaseBtn.bind(this)}
                                     type="submit" value="Submit"
                                     onSubmit= {this.handleSubmit} />
                    </form>
                </div>
            </div> 
        )
    }
}

export default Footer;