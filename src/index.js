import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Launch from './Launch';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
console.log(Launch);

let rootElement = document.getElementById('root');

const render = Component => {
ReactDOM.render(
        <Component/>,
    
    rootElement,
    root => {
     rootElement.classList.add('visible');
    }
);
}


class Main extends Component {
    constructor() {
        super();

    
    }

    render() {
        return(
            <BrowserRouter>
                <div>
                    <Route path= "/" component= {Launch}/>
                    <Route path= "/app" component= {App}/>
                </div>
            </BrowserRouter>
        );
}
}


render(Main);