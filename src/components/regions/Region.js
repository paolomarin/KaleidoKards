import React, { Component } from 'react';
import './Region.scss';

class Region extends Component {
    render() {
        return(
            <div className="flex-wrap">
            <fieldset>
                <form action novalidate>
                {/* <h2 className="region-text"> Region </h2> */}
                    <input className="radio" type="radio" name="rg" id="sign-in" checked/>
                    <input className="radio" type="radio" name="rg" id="sign-up"/>
                    <input className="radio" type="radio" name="rg" id="reset"/>

                        <label for="sign-in">USA</label>
                        <label for="sign-up">Europe</label>
                        <label for="reset">Asia-Pacific</label>

                        <div className="not-radio sign-in color-text"> Ohio </div>
                        <div className="not-radio sign-in color-text"> Oregon </div>
                        <div className="not-radio sign-up color-text"> Frankfurt </div>
                        <div className="not-radio sign-up color-text"> Ireland </div>
                        <div className="not-radio reset color-text"> Sydney </div>
                        <div className="not-radio reset color-text"> Seoul </div>
                        <div className="not-radio reset color-text"> Singapore </div>
                        {/* <input className="not-radio sign-up sign-in" type="password" placeholder="Password"/> */}
                        {/* <input className="not-radio sign-up" type="password" placeholder="Repeat Password"/> */}




                </form>
            </fieldset>
            </div>
        )
    }
}

export default Region;