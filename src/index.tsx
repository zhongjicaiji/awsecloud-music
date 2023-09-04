import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux/es/exports';
import store from './store';

//设置移动端适配
document.documentElement.style.fontSize=100/750 +"vw"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
 <Router>
   <App />
 </Router>
  
  </Provider>

);


reportWebVitals();
