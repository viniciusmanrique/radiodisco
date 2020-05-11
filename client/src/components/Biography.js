import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Biography extends Component {
  state = { albumWikiInfo: [] };

  componentDidMount() {
    console.log("Did mount");
    console.log(this.props.location.state);
    // Get Wikipedia bio
    axios
      .get("/api/wiki")
      .then(res => {
        let getWikiInfo = res.data.query.pages;
        let arrayWiki = Object.values(getWikiInfo);
        this.setState({ albumWikiInfo: arrayWiki[0].extract });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="biography">
        <h1 className="biography__title">Biography</h1>
        <div className="biography__image-wrap">
          <img
            className="biography__image"
            alt="Radiohead band"
            src={this.props.location.state.image}
          ></img>
        </div>
        <p className="biography__text">{this.state.albumWikiInfo}</p>
        <Link to={"/albums/"}>
          <h1>Back</h1>
        </Link>
      </div>
    );
  }
}
