import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import App from './App';
import { CharacterProvider } from './context/CharacterState';

ReactDOM.render(
  <React.StrictMode>
    <CharacterProvider>
      <App />
    </CharacterProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

