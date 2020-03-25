import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import Back from "./Back";

/* import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; */
/* import Cors from "cors"; */

const Album = props => {
  return (
    <div>
      <h1>Album</h1>
      <p>{props.albumId}</p>
      {/* <Back /> */}
      <Link to={`/albums/`}>
        <h1>Back</h1>
      </Link>
    </div>
  );
};

export default class Albums extends Component {
  state = {
    albumId: null,
    albumCover: [],
    selectedAlbum: [],
    albumsSpotify: [],
    albumWikiInfo: [],
    albumGeniusLyrics: []
  };

  componentDidMount() {
    console.log("Did mount");
    let parsed = queryString.parse(window.location.pathname);
    let accessToken = parsed["/albums/access_token"];
    /* let refreshToken = parsed.refresh_token; */

    /* if (!accessToken) return; */

    // Gets all album covers as well the Spotify IDs
    axios.get("/api/albums").then(response => {
      let getAllCovers = response.data;
      console.log(getAllCovers);
      this.setState({
        albumCover: getAllCovers
      });
    });

    // Gets all album's info from Spotify
    axios
      .get(
        "https://api.spotify.com/v1/albums/?ids=6vuykQgDLUCiZ7YggIpLM9,1DBkJIEoeHrTX4WCBQGcCi,7eyQXxuf2nGj9d2367Gi5f,1oW3v5Har9mvXnGk0x4fHm,6V9YnBmFjWmXCBaUVRCVXP,19RUXBFyM4PpmrLRdtqWbp,7dxKtc08dYeRVHt3p9CZJn,500FEaUzn8lN9zWFyZG5C2,6400dnyeDyD2mIFHfkwHXN",
        {
          headers: { Authorization: "Bearer " + accessToken }
        }
      )
      .then(response => {
        let getAllAlbums = response.data.albums;
        console.log(getAllAlbums);
        this.setState({
          albumsSpotify: getAllAlbums
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState({
        albumId: this.props.match.params.id
      });
    } else if (this.props.match.params.id === undefined) {
      console.log("URL has no Id");
    }
    window.scrollTo(0, 0);
    console.log("Did update");
    console.log(this.state.albumId);
  }

  render() {
    if (this.state.albumId !== null)
      return (
        <div>
          <Album albumId={this.state.albumId} />
        </div>
      );

    if (this.state.albumCover.length === 0)
      return <h4 className="loading">Loading</h4>;

    const coversMenu = this.state.albumCover.map((listData, index) => {
      return (
        <Link
          to={`/albums/${listData.id}`}
          key={index}
          className="albums__item-link"
        >
          <div className="albums__item">
            <div className="albums__image-wrap">
              <img
                className="albums__image"
                src={listData.thumb}
                alt="Album Cover"
                style={{ width: "30%" }}
              ></img>
            </div>
          </div>
        </Link>
      );
    });

    return (
      <div className="albums">
        <section className="albums__menu" style={{ display: "flex" }}>
          <div className="albums__menu-item-wrap" style={{ flexWrap: "wrap" }}>
            {coversMenu}
          </div>
        </section>

        <Link
          to={`/biography/`}
          className="albums__menu-link-wrap"
          style={{ color: "white" }}
        >
          <div className="albums__menu-link-wrap">
            <h1 className="albums__menu-link">Biography</h1>
          </div>
        </Link>
        <Link
          to={`/benefits/`}
          className="albums__menu-link-wrap"
          style={{ color: "white" }}
        >
          <div className="albums__menu-link-wrap">
            <h1 className="albums__menu-link">Benefits</h1>
          </div>
        </Link>
        <Link
          to={`/credits/`}
          className="albums__menu-link-wrap"
          style={{ color: "white" }}
        >
          <div className="albums__menu-link-wrap">
            <h1 className="albums__menu-link">Credits</h1>
          </div>
        </Link>
      </div>
    );
  }
}
