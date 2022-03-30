import React from 'react';
import App from './App';
import * as ReactDOMClient from 'react-dom/client';
import './index.css'
import { Provider } from 'react-redux';
import { store } from 'features/store';

const container = document.querySelector('#root');
const root = ReactDOMClient.createRoot(container, {
  identifierPrefix: 'id_',
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);