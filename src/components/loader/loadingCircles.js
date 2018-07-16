import React, { Component } from 'react';
import './loadingCircle.scss';
import circleImg from './loading.svg'


class loadingCircle extends Component {
    render() {
        return(
            <div>
                <img src={circleImg} alt="loading img"/>

            </div>
        )
    }
}

export default loadingCircle;