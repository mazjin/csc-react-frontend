import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import App from './App';
import { CharacterProvider } from './context/CharacterState';
import { RepositoryProvider } from './context/RepositoryState';

ReactDOM.render(
  <React.StrictMode>
    <CharacterProvider>
      <RepositoryProvider>
        <App />
      </RepositoryProvider>
    </CharacterProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

