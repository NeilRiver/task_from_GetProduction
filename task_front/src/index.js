import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import App from "./App";
import './index.css'
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://192.168.0.102:3005/graphql",
});


client
  .query({
    query: gql`
    query getAllList {
  	getAllList{
      id
      title
      text
    }
}
    `
  })
  .then(result => console.log(result));

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

