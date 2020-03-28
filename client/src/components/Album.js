import React, { Component } from "react";
import axios from "axios";

export default class Album extends Component {
  state = { albumWikiInfo: [], albumCoverID: null };

  componentDidMount() {
    axios
      .get(`/api/albums/${this.props.albumId}`)
      .then(res => {
        this.setState({ albumCoverID: res.data.cover });
        console.log(this.state.albumCoverID);
      })
      .catch(err => console.log(err));
    console.log("Did mount");
  }

  render() {
    console.log(this.props.albumCover);
    if (this.state.albumId !== null)
      return (
        <div className="album">
          <div className="album__cover-wrap">
            <img
              className="album__cover"
              src={this.state.albumCoverID}
              alt="Album Cover"
            ></img>
          </div>
          <h1 className="album__title">Album</h1>
          <p>{this.props.albumId}</p>
        </div>
      );
  }
}
