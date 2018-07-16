import React, { Component } from 'react';
import './PurchaseBtn.scss';
import LoadingDots from "../loading/loadingDots";

class PurchaseBtn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return( 
            <button className={this.props.loading ? "purchase-button disabled" : "purchase-button"} onClick={this.props.click}>
                {/*{this.props.loading ? <LoadingDots/> : "Purchase"}*/}
                <LoadingDots visible={this.props.loading} text="Purchase"/>
            </button>
        )
    }
}

export default PurchaseBtn;