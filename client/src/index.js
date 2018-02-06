import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Form from './form/form';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(<Form />, document.getElementById('root'));
registerServiceWorker();