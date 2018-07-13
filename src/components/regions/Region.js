import React, { Component } from 'react';
import './Region.scss';
import RegionButton from './RegionButton';

class Region extends Component {
    constructor(props) {
        super();
        this.state={
            region: '',
            sydney: 'au',
            seoul: 'kr'
        }
    }

    handleChangeFlag(event) {
        
        this.setState({
            region: event.currentTarget.dataset.id
        });
    }

    render() {
        return(
            <div className="flex-wrap">
            <fieldset>
                <form action novalidate>
                    <input className="radio" type="radio" name="rg" id="sign-in" checked/>
                    <input className="radio" type="radio" name="rg" id="sign-up"/>
                    <input className="radio" type="radio" name="rg" id="reset"/>

                        <label htmlFor="sign-in" onClick={this.handleChangeFlag.bind(this)} data-id="us" >USA</label>
                        <label htmlFor="sign-up" onClick={this.handleChangeFlag.bind(this)} data-id="de">Europe</label>
                        <label htmlFor="reset" >Asia-Pacific</label>

                        <div className="not-radio sign-in color-text">
                            <h5> Ohio </h5>
                            <RegionButton region={this.state.region}/>
                         </div>
                        <div className="not-radio sign-up color-text"> 
                            <h5> Frankfurt </h5>
                            <RegionButton region={this.state.region}/>
                        </div>
                        <div className="not-radio reset color-text">
                            <h5>Sydney</h5>
                            <RegionButton region={this.state.sydney}/>
                        </div>
                        <div className="not-radio reset color-text">
                            <h5>Seoul</h5>
                            <RegionButton region={this.state.seoul}/>
                        </div>
                    




                </form>
            </fieldset>
            </div>
        )
    }
}

export default Region;