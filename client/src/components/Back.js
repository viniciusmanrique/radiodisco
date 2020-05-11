import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Back extends Component {
  /* state = {
    albumId: this.props.match.params.id
  }; */
  /* componentDidMount() {
    this.props.setAlbumId(this.props.match.params.id);
  } */

  componentDidUpdate() {
    /* if (props.match.params.id !== this.props.match.params.id) {
      this.props.setAlbumId(this.props.match.params.id);
    }
    window.scrollTo(0, 0); */
    /* handleClick = () => {
      this.setState({
        AlbumId: null
      });
    }; */
  }

  render() {
    const path = null;
    return (
      <div>
        <Link
          to={{
            pathname: "/albums",
            state: {
              albumId: null
            }
          }}
        >
          <h1>Back</h1>
        </Link>
      </div>
    );
  }
}

/* to={{
    pathname: "/biography",
    state: {
      image: this.state.radioPhoto
    }
  }} */
