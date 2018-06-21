import React, { Component } from 'react';
import Card from './../card/Card';
import './../styles/text.scss';
import './MyCardsContainer.scss';

class MyCardsContainer extends Component {

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
            <div className="dashboard-card-container">
                    <div className="my-card-container">
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>
                    <div className="my-card-container">
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>
             
             </div> 
        )
    }
}


export default MyCardsContainer;