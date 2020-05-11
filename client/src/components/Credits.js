import React from "react";
import { Link } from "react-router-dom";

export default function Credits() {
  return (
    <div>
      <h1>Credits</h1>
      <Link to={"/albums/"}>
        <h1>Back</h1>
      </Link>
    </div>
  );
}
