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

    smallLoader() {
        this.setState({
            visible:true
        })
    }

    dissapear() {
        this.setState({
            visible:false
        })
    }

    // TODO: consider moving this to parent?? So can be called after trade


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
            console.log('resultBody', resultBody);
            console.log(resultBody.receipt.status, "status");
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
                <div className="footer-cards">
                    <BasicPack/>
                    <PlatinumPack/>
                    <LoaderSmall show={this.state.visible}/>
                </div>
                <div className="selection">
                    <form className="form" onSubmit= {this.handleSubmit}>
                        <select className="select-options" id="pack-type" value={this.state.value} onChange={this.handleChange}>
                            <option> Pick your pack: </option>
                            <option value="/purchase/standard"> Basic Pack </option>
                            <option value="/purchase/platinum"> Platinum Pack </option>
                        </select>
                        <PurchaseBtn click={this.clickPurchaseBtn.bind(this)} type="submit" value="Submit" />
                    </form>
                </div>
            </div> 
        )
    }
}

export default Footer;