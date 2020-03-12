import React from "react";
import "./styles/main.css";
import { Link } from "react-router-dom";
import radioheadLogo from "./assets/logo/radiohead-logo.png";
export default function App() {
  return (
    <div className="App">
      <div className="homepage__radiohead-logo-wrap">
        <img
          className="homepage__radiohead-logo"
          src={radioheadLogo}
          alt="Arrow button"
        />
      </div>
      <h1>DON'T SKIP</h1>
      {/* <Link className="" to="/album">
        <img className="" src={ArrowDown} alt="Arrow button" />
      </Link> */}
    </div>
  );
}
