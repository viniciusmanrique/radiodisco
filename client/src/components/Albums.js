import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import Album from "./Album";

export default class Albums extends Component {
  state = {
    accessToken: null,
    albumId: "menu",
    playAlbumId: null,
    item: null,
    is_playing: null,
    progress_ms: null,
    albumCover: [],
    selectedAlbum: [],
    albumsSpotify: [],
    albumGeniusLyrics: [],
    radioPhoto: null
  };

  playAlbum = () => {
    const accessToken = this.state.accessToken;
    console.log(this.state.playAlbumId);

    /* if (this.state.albumId !== "menu") {
      this.setState({
        playAlbumId: this.state.albumId
      });
    } */

    /* if (this.state.playAlbumId !== null) {} */

    /* axios.put(
      "https://api.spotify.com/v1/me/player/play",
      { context_uri: `spotify:album:6vuykQgDLUCiZ7YggIpLM9` },
      {
        headers: { Authorization: "Bearer " + accessToken },
        accept: "application/json",
        contentType: "application/json"
      }
    ); */

    axios
      .put(
        "https://api.spotify.com/v1/me/player/play",
        { context_uri: `spotify:album:6vuykQgDLUCiZ7YggIpLM9` },
        {
          headers: { Authorization: "Bearer " + accessToken },
          accept: "application/json",
          contentType: "application/json"
        }
      )
      .then(res => {
        const data = res.data;
        console.log(data);
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms
        });
      })
      .catch(err => console.log(err));

    console.log("Did play");
  };

  componentDidMount() {
    console.log("Did mount");
    let parsed = queryString.parse(window.location.pathname);
    let accessToken = parsed["/albums/access_token"];
    this.setState({ accessToken: accessToken });
    console.log(this.state.accessToken);

    /* let refreshToken = parsed.refresh_token; */

    /* if (!accessToken) return; */

    // Gets all album covers, Spotify IDs
    axios
      .get("/api/albums")
      .then(res => {
        this.setState({ albumCover: res.data });
        console.log(this.state.albumCover);
      })
      .catch(err => console.log(err));

    axios.defaults.headers.common = { Authorization: "Bearer " + accessToken };
    // Gets all album's info from Spotify
    axios
      .get(
        "https://api.spotify.com/v1/albums/?ids=6vuykQgDLUCiZ7YggIpLM9,1DBkJIEoeHrTX4WCBQGcCi,7eyQXxuf2nGj9d2367Gi5f,1oW3v5Har9mvXnGk0x4fHm,6V9YnBmFjWmXCBaUVRCVXP,19RUXBFyM4PpmrLRdtqWbp,7dxKtc08dYeRVHt3p9CZJn,500FEaUzn8lN9zWFyZG5C2,6400dnyeDyD2mIFHfkwHXN"
      )
      .then(response => {
        let getAllAlbums = response.data.albums;
        console.log(getAllAlbums);
        this.setState({
          albumsSpotify: getAllAlbums
        });
      })
      .catch(err => console.log(err));

    // Gets band's info from Spotify
    axios
      .get("https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb")
      .then(res => {
        this.setState({ radioPhoto: res.data.images[0].url });
        console.log(this.state.radioPhoto);
      })
      .catch(err => console.log(err));

    /* axios
      .put(
        "https://api.spotify.com/v1/me/player/play",
        { context_uri: `spotify:album:6vuykQgDLUCiZ7YggIpLM9` },
        {
          headers: { Authorization: "Bearer " + accessToken },
          accept: "application/json",
          contentType: "application/json"
        }
      )
      .then(res => {
        const data = res.data;
        console.log(data);
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms
        });
      })
      .catch(err => console.log(err)); */

    // Plays the album
    /* axios.put(
      "https://api.spotify.com/v1/me/player/play",
      { context_uri: `spotify:album:6vuykQgDLUCiZ7YggIpLM9` },
      {
        headers: { Authorization: "Bearer " + accessToken },
        accept: "application/json",
        contentType: "application/json"
      }
    ); */

    /* if (this.state.albumId !== null) {
      axios.put(
        "https://api.spotify.com/v1/me/player/play",
        { context_uri: `spotify:${this.state.albumId}` },
        {
          headers: { Authorization: "Bearer " + accessToken },
          accept: "application/json",
          contentType: "application/json"
        }
      );
    } */
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState({
        albumId: this.props.match.params.id,
        playAlbumId: this.props.match.params.id
      });
    } /* else if (prevState.albumId !== this.state.albumId) {
      console.log("set null");
      this.setState({
        AlbumId: null
      });
    } */
    window.scrollTo(0, 0);
    console.log("Did update");
    console.log(this.state.playAlbumId);
  }

  /* setAlbumId = () => {
    console.log("set");
    this.setState({
      AlbumId: "menu"
    });
  }; */

  render() {
    if (this.state.albumId !== "menu")
      return (
        <div>
          <Album
            albumId={this.state.albumId}
            albumCover={this.state.albumCover}
          />
          <Link to={"/albums/menu"}>
            <h1>Back</h1>
          </Link>
        </div>
      );

    /* if (this.state.albumCover.length === 0)
      return <h4 className="loading">Loading</h4>; */

    const coversMenu = this.state.albumCover.map((listData, index) => {
      return (
        <Link
          to={`/albums/${listData.id}`}
          onClick={this.playAlbum}
          key={index}
          className="albums__item-link"
        >
          <div className="albums__image-wrap">
            <img
              className="albums__image"
              src={listData.thumb}
              alt="Album Cover"
            ></img>
          </div>
        </Link>
      );
    });

    /* onClick={(this.setAlbumId, this.playAlbum)} */
    /* onClick={() => {
              this.setAlbumId();
              this.playAlbum();
            }} */

    return (
      <div className="albums">
        <section className="albums__menu">
          <div className="albums__menu-item-wrap">{coversMenu}</div>
        </section>
        <Link
          className="albums__menu-link-wrap"
          to={{
            pathname: "/biography",
            state: {
              image: this.state.radioPhoto
            }
          }}
        >
          <div className="albums__menu-link-wrap">
            <h1 className="albums__menu-link">Biography</h1>
          </div>
        </Link>
        <Link to={`/benefits/`} className="albums__menu-link-wrap">
          <div className="albums__menu-link-wrap">
            <h1 className="albums__menu-link">Benefits</h1>
          </div>
        </Link>
        <Link to={`/credits/`} className="albums__menu-link-wrap">
          <div className="albums__menu-link-wrap">
            <h1 className="albums__menu-link">Credits</h1>
          </div>
        </Link>
      </div>
    );
  }
}
