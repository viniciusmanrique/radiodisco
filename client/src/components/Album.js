import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class Album extends Component {
  state = {
    albumsSpotify: [],
    albumCover: [],
    albumTracklist: [],
    albumInfo: [],
    albumLyrics: []
  };

  componentDidMount() {
    const clientId = "e6d20d9a42a74ae5b889bd8ec5d0767f";
    const spotifyAlbumsCall = `https://api.spotify.com/v1/albums/?ids=6vuykQgDLUCiZ7YggIpLM9,1DBkJIEoeHrTX4WCBQGcCi,7eyQXxuf2nGj9d2367Gi5f,1oW3v5Har9mvXnGk0x4fHm,6V9YnBmFjWmXCBaUVRCVXP,19RUXBFyM4PpmrLRdtqWbp,7dxKtc08dYeRVHt3p9CZJn,500FEaUzn8lN9zWFyZG5C2,6400dnyeDyD2mIFHfkwHXN" -H "Authorization: Bearer {clientId}`;

    const getAllAlbums = axios.get("/api/albums").then(response => {
      response.data;
    });
  }

  /* componentDidMount() {
      const getAllVideos = axios.get("/api/albums");
      const getFirstVideoData = axios.get("/api/videos/1af0jruup5gu");
      axios.all([getAllVideos, getFirstVideoData]).then(response => {
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
    if (this.state.videosArray.length === 0)
      return <h4 className="loading">Loading</h4>;
    return (
      <div>
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <div>
                  <Hero
                    videoContent={this.state.videoContent}
                    {...props}
                    handleVideoUpdate={this.fetchVideo}
                  />
                  <Description videoContent={this.state.videoContent} />
                  <Comments videoContent={this.state.videoContent} />
                  <NextVideo videosArray={this.state.videosArray} />
                </div>
              )}
            />
            <Route
              path="/video/:id"
              render={props => (
                <div>
                  <Hero
                    videoContent={this.state.videoContent}
                    {...props}
                    handleVideoUpdate={this.fetchVideo}
                  />
                  <Description videoContent={this.state.videoContent} />
                  <Comments videoContent={this.state.videoContent} />
                  <NextVideo videosArray={this.state.videosArray} />
                </div>
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
