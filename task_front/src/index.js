import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import  ApolloClient, {InMemoryCache}  from "apollo-boost";

import { ApolloProvider } from "react-apollo";

import { graphql } from 'react-apollo';
import { gql } from "apollo-boost";


const client = new ApolloClient({
  uri:'http://192.168.0.102:3005/graphql',
 
});

client
  .query({
    query: gql`
    query {
      all_list {
        id
        title
        text
      }
    }
    `
  })
  .then(result => console.log(result));




 const mov = gql`
  query {
    all_list {
      id
      title
      text
    }
  }
`;


client.query({
  query: mov
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
