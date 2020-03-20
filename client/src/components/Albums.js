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
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.code;
    console.log(accessToken);

    axios.get("/api/albums").then(response => {
      let getAllAlbums = response.data;
      console.log(getAllAlbums);

      this.setState({
        albumCover: getAllAlbums
      });
    });

    /* axios
      .get(
        "https://api.spotify.com/v1/albums/?ids=6vuykQgDLUCiZ7YggIpLM9,1DBkJIEoeHrTX4WCBQGcCi,7eyQXxuf2nGj9d2367Gi5f,1oW3v5Har9mvXnGk0x4fHm,6V9YnBmFjWmXCBaUVRCVXP,19RUXBFyM4PpmrLRdtqWbp,7dxKtc08dYeRVHt3p9CZJn,500FEaUzn8lN9zWFyZG5C2,6400dnyeDyD2mIFHfkwHXN",
        {
          headers: { Authorization: "Bearer " + accessToken }
        }
      )
      .then(response => {
        let getAllAlbums = response.data;
        console.log(getAllAlbums);
      }); */

    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + accessToken }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          user: {
            name: data.display_name
          }
        })
      );
  }

  /* componentDidMount() {
    const getAllAlbums = axios.get("/api/albums");
    const getFirstVideoData = axios.get("/api/videos/1af0jruup5gu");
    axios.all([getAllAlbums, getFirstVideoData]).then(response => {
      let listVideo = response[0].data.filter(
        video => video.id !== "1af0jruup5gu"
      );

      this.setState({
        videosArray: listVideo,
        videoContent: response[1].data,
        allVideos: response[0].data
      });
    });
  } */

  /* componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
          this.props.handleVideoUpdate(this.props.match.params.id);
        }
        window.scrollTo(0, 0);
      } */

  /* fetchVideo = id => {
      axios.get(`/api/videos/${id}`).then(response => {
        let listVideoUpdated = this.state.allVideos.filter(
          video => video.id !== id
        );
        this.setState({
          videoContent: response.data,
          videosArray: listVideoUpdated
        });
      });
    }; */

  /* updateVideosArray = () => {
      axios.get("/api/videos/").then(response => {
        this.setState({
          videosArray: response.data
        });
      });
    }; */

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
