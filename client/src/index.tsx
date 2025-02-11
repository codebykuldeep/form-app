import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient,InMemoryCache,ApolloProvider, } from '@apollo/client';
import constants from './constants';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const client = new ApolloClient({
  uri: constants.GRAPHQL_SERVER,
  cache: new InMemoryCache(),
});



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
   <Provider store={store}>
   <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
   </Provider>
  </React.StrictMode>
);

