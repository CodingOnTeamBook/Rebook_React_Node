import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

axios.defaults.withCredentials = true;

ReactDOM.render(<App />, document.getElementById('root'));

reportWebVitals();
