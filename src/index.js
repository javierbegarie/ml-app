import 'popper.js';
import $ from 'jquery';
import 'bootstrap';
import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import './index.scss';
import App from './App';

let store = configureStore();
render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);

