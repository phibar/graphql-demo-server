import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import reportWebVitals from './reportWebVitals'

import App from './components/app/app'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './services/apollo-client'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
