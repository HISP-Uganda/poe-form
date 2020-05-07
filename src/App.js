import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css'
import {Home} from "./components/Home";
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/home" component={Home}/>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/">
          <Login/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
