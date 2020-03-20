import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/main.css";
import App from "./App";
import Albums from "./components/Albums";
import Biography from "./components/Biography";
import Credits from "./components/Credits";

const routing = (
  <div>
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/albums" component={Albums} />
        <Route path="/biography" component={Biography} />
        <Route path="/credits" component={Credits} />
      </Switch>
    </Router>
  </div>
);

ReactDOM.render(routing, document.getElementById("root"));
