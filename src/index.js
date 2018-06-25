import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Launch from './Launch';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
   

    render() {
        return(
            <BrowserRouter>
                <div>
                    <Route exact path= "/" component= {Launch}/>
                    <Route path= "/app" component= {App}/>
                </div>
            </BrowserRouter>
        );
}
}

render(Main);