import React, { Component } from 'react';
import './ShowRegion.scss';
import RegionButton from './RegionButton';

const titleMap = {'us': 'Ohio', 'de': 'Frankfurt', 'kr': 'Seoul', 'au': 'Sydney'};


class ShowRegion extends Component {
    
    renderRegion() {
        let regionArray=this.props.regions.split(",");
        return(
            <div className="region-style">
            {regionArray.map(function(element) {
                return <RegionButton region={element} title={titleMap[element]}/>
            })}

            </div>
        )
    }
 
     render() {
         if(this.props.visible) {
         return this.renderRegion()
    }
 
        return null;
     }
 }
 
 export default ShowRegion;