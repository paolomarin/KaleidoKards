import React, { Component } from 'react';
import './Header.scss';



class Header extends Component {
    render() {
        return(
            <div className="dashboard-header">
                {/*<img src={HeaderImg} className="header-image" alt="header-image" /> */}
                <h1 className="dashboard-text">My Dashboard</h1>
            </div>
        )

    }

}

export default Header; 