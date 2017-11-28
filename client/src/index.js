import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { bootstrap } from './utils/data';

bootstrap();

ReactDOM.render(<App />, document.getElementById('root'));
