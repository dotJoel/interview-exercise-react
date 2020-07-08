import React from 'react';
import ReactDOM from 'react-dom';

import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'

import App from './app/App';

import 'bootstrap/dist/css/bootstrap.min.css';


JavascriptTimeAgo.addLocale(en);

ReactDOM.render(<App />, document.getElementById('root'));
