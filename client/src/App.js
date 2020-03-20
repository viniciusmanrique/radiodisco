import React from "react";
import radioheadLogo from "./assets/logo/radiohead-logo.png";

export default function App() {
  return (
    <div className="homepage">
      <a
        className="homepage__button-link"
        href="http://localhost:5000/auth/spotify/"
        style={{ color: "white" }}
      >
        Albums
        {/* <button className="homepage__button">Albums</button> */}
      </a>
      <h1>DON'T SKIP</h1>
      <div className="homepage__radiohead-logo-wrap">
        <img
          className="homepage__radiohead-logo"
          src={radioheadLogo}
          alt="Arrow button"
          style={{ width: 200 }}
        />
      </div>
    </div>
  );
}
