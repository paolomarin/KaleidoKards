import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'

class RegionButton extends Component{
    constructor(){
        super();
    }

    render(){
        const { region } = this.props;
        return <div className="region-button-component" >
                <div className={`flag-icon flag-icon-${region} region-flag`}></div>
                {/* <div className='region-title'>{title}</div> */}
        </div>
    }
} 

export default RegionButton;

// //Prop Definitions for this component
// RegionButton.propTypes = {
//     /**
//      * The name of the region
//      */
//     title : PropTypes.string,
//     /**
//      * The region string for this region (eu, gb, us etc..)
//      */
//     region: PropTypes.string,
//     /**
//      * Whether or not this has been selected (clicked)
//      */
//     selected : PropTypes.bool,
//     /**
//      * Function that is called on selection
//      */
//     clickFunc : PropTypes.func

// }
