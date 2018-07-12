import React, { Component } from 'react';
import './Header.scss';
import './../styles/text.scss';
import Star from './Star';



class Header extends Component {
    render() {
        return(
            <div className="dashboard-header">
                <Star/>

                <div className="ether-left">
                    {this.props.etherAmount}
                </div>
                <h3 className="ether-text"> Ξ </h3>
            </div>
        )

    }

}

export default Header; 