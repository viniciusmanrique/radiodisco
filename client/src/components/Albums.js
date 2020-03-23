import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";

/* import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; */
/* import Cors from "cors"; */

export default class Albums extends Component {
  state = {
    albumCover: [],
    albumsSpotify: [],
    albumWikiInfo: [],
    albumGeniusLyrics: []
  };

  componentDidMount() {
    axios.get("/api/albums").then(response => {
      let getAllCovers = response.data;
      console.log(getAllCovers);
      this.setState({
        albumCover: getAllCovers
      });
    });

    let parsed = queryString.parse(window.location.pathname);
    /* let access_token = parsed["/albums/access_token"]; */
    let refresh_token = parsed.refresh_token;

    /* if (!accessToken) return; */

    axios
      .get(
        "https://api.spotify.com/v1/albums/?ids=6vuykQgDLUCiZ7YggIpLM9,1DBkJIEoeHrTX4WCBQGcCi,7eyQXxuf2nGj9d2367Gi5f,1oW3v5Har9mvXnGk0x4fHm,6V9YnBmFjWmXCBaUVRCVXP,19RUXBFyM4PpmrLRdtqWbp,7dxKtc08dYeRVHt3p9CZJn,500FEaUzn8lN9zWFyZG5C2,6400dnyeDyD2mIFHfkwHXN",
        {
          headers: { Authorization: "Bearer " + refresh_token }
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

  render() {
    /* if (this.state.videosArray.length === 0)
      return <h4 className="loading">Loading</h4>; */
    return (
      <div className="albums">
        <h1>Albums</h1>
      </div>
    );
  }
}
