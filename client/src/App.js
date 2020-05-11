import React from "react";
import radioheadDemon from "./assets/logo/radiohead-demon.png";

export default function App() {
  return (
    <div style={{ overflow: "hidden" }}>
      <div className="homepage">
        <img
          className="homepage__demon-logo"
          src={radioheadDemon}
          alt="Radiohead Demon"
        />
        <div className="homepage__content">
          <p className="homepage__description">
            When was the last time you listened to an album all the way through,
            from start to finish, without interruption?
          </p>
          <h1 className="homepage__title">RADIOHEAD</h1>
          <h2 className="homepage__subtitle">DISCOGRAPHY</h2>
          <p className="homepage__description">
            The Radiohead Discography project brings back the lost art of
            listening to full albums, creating a deeper connection with the
            artist you love, boosting your mood and your mental health. A full
            album listening experience using Spotify’s player, Wikipedia’s album
            description, and song lyrics from Genius.
          </p>
          <div className="homepage__button-wrap">
            <a
              className="homepage__button"
              href="http://localhost:5000/auth/spotify/"
            >
              Log in with Spotify
            </a>
          </div>
        </div>
        <h2 className="homepage__dont-skip">DON'T SKIP</h2>
      </div>
    </div>
  );
}
