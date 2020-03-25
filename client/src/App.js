import React from "react";
/* import { Link } from "react-router-dom"; */
import radioheadLogo from "./assets/logo/radiohead-logo.png";

export default function App() {
  return (
    <div className="homepage">
      <h1>DON'T SKIP</h1>
      <div className="homepage__radiohead-logo-wrap">
        <img
          className="homepage__radiohead-logo"
          src={radioheadLogo}
          alt="Arrow button"
          style={{ width: 200 }}
        />
      </div>
      <p className="homepage__description" style={{ color: "grey" }}>
        When was the last time you listened to an album all the way through,
        from start to finish, without interruption? The Radiohead Discography
        project brings back the lost art of listening to full albums, creating a
        deeper connection with the artist you love, boosting your mood and your
        mental health. A full album listening experience using Spotify’s player,
        Wikipedia’s album description, and song lyrics from Genius.
      </p>

      <button className="homepage__button">
        <a
          className="homepage__button-link"
          href="http://localhost:5000/auth/spotify/"
          style={{ color: "white" }}
        >
          Log in with Spotify
        </a>
      </button>
    </div>
  );
}
