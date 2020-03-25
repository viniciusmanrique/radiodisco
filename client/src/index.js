import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/main.css";
import App from "./App";
import Albums from "./components/Albums";
import Biography from "./components/Biography";
import Benefits from "./components/Benefits";
import Credits from "./components/Credits";

const routing = (
  <div>
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/albums" exact component={Albums} />
        <Route path="/albums/:id" component={Albums} />
        <Route path="/biography" component={Biography} />
        <Route path="/benefits" component={Benefits} />
        <Route path="/credits" component={Credits} />
      </Switch>
    </Router>
  </div>
);

ReactDOM.render(routing, document.getElementById("root"));
