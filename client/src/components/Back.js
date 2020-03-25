import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

export default function Back() {
  return (
    <div>
      <Link to={`/albums/`}>
        <h1>Back</h1>
      </Link>
    </div>
  );
}

/* return <Route path="/albums" exact component={Albums} />; */
