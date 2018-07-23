import React, { Component } from 'react';
import './styles.scss'

class RegionButton extends Component{
    constructor(){
        super();
    }

    render(){
        const { region, title } = this.props;
        return (<div className="region-button-component" >
                    <div className="testing" onClick={() => {this.props.regionClickHandler(region)}}>
                        <div className={`flag-icon flag-icon-${region} region-flag`}/>
                        <div className='region-title'>{title}</div>
                    </div>
                </div>)
    }
} 

export default RegionButton;
