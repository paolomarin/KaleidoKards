import React, { Component } from 'react';
import './tradingContainer.scss';
import _ from 'lodash';
import Card from './../card/Card';
import TradeBtn from './../buttons/TradeBtn';

class tradingContainer extends Component {

      render() {
        // const users = ["Kaleido's Cards", "Joe's Cards"].map((user) => {
        //     return(
        //     <div>
        //         <h3 key={user}> {user}</h3>
        //         <div className="card-container">
        //             <Card/>
        //             <Card/>
        //             <Card/>
        //         </div>
        //     </div>
        //     );
        // });
        
        return( 
            <div className="trading-container">
                <h3> Kaleido's Cards </h3>
                    <div className="card-container">
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>
                    <div className="card-container">
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>

                {/* {users} */}
                <TradeBtn/>
             
             </div> 
        )
    }
}


export default tradingContainer;
