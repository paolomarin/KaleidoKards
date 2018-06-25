import React, { Component } from 'react';
import Card from './../card/Card';
import './../styles/text.scss';
import './MyCardsContainer.scss';

class MyCardsContainer extends Component {

    renderCards() {
        const props = _.omit(this.props, ['data']);

        return _.map(this.props.data, (dat, index) => (<Card shape={dat.shape} color={dat.color} />));

    }


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
                        <Card color={0} shape={0}/>
                        <Card color={1} shape={1}/>
                        <Card color={2} shape={2}/>
                        <Card color={3} shape={3}/>
                        <Card color={4} shape={4}/>
                    </div>
                    <div className="my-card-container">
                        {this.renderCards()} 
                    </div>
             
             </div> 
        )
    }
}


export default MyCardsContainer;