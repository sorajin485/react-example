import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import {Company_code_Read} from './company_code'
import {Collapsible_table,Sorting_selecting,Sorting_selecting_google} from './test'

ReactDOM.render(
  <Router>
    <Route path="/company_code_Read" component={Company_code_Read}/>
    <Route path="/test_Collapsible_table" component={Collapsible_table}/>
    <Route path="/test_Sorting_selecting" component={Sorting_selecting}/>
    <Route path="/test_Sorting_selecting_google" component={Sorting_selecting_google}/>
  </Router>,
  document.getElementById('root')
);
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
