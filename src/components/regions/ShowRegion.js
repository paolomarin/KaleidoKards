import React, { Component } from 'react';
import './ShowRegion.scss';
import RegionButton from './RegionButton';

const titleMap = {'us': 'Ohio', 'de': 'Frankfurt', 'kr': 'Seoul', 'au': 'Sydney'};

class ShowRegion extends Component {
    
    renderRegion() {
        let regionArray=this.props.regions.split(",");
        let self = this;
        return(
            <div className="region-style">
            {regionArray.map(function(element) {
                return <RegionButton selected={self.props.selected} region={element} title={titleMap[element]} value={element} regionClickHandler={self.props.regionClick}/>
            })}

            </div>
        )
    }
 
    render() {
        if (this.props.visible) {
            return this.renderRegion()
        }
    return null;
    }
}

export default ShowRegion;