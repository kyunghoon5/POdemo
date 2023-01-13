import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import App from './App';
import './index.css';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_HASURA_URI,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = import.meta.env.VITE_TOKEN;

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': token,
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

// apollo client setup with auth
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
