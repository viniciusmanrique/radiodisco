import React from "react";
import { Link } from "react-router-dom";

export default function Benefits() {
  return (
    <div>
      <h1>Benefits</h1>
      <Link to={"/albums/"}>
        <h1>Back</h1>
      </Link>
    </div>
  );
}
