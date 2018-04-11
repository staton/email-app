import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App/App';
import './index.css';
import './stylesheets/main.css';
import registerServiceWorker from './registerServiceWorker';
import allReducers from './redux/reducers/index';
require('typeface-roboto');

var store = createStore(allReducers);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
