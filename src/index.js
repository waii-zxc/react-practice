import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { Provider } from 'react-redux';
import store from './components/store';
import ErrorBoundary from "./components/store/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( 
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
);
