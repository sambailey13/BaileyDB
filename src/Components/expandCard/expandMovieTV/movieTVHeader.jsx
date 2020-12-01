import React, { Component, useState } from "react";
import {
  Col,
  Row,
  Image,
  Tooltip,
  OverlayTrigger,
  Alert,
  Container,
  ProgressBar,
} from "react-bootstrap";
import axios from "axios";
import noImage from "../../../Images/noImage.png";

class MovieTVHeader extends Component {
  state = {
    axiosInstance: axios.create({
      baseURL: "https://bailey-db.xyz:3001",
    }),
  };

  componentDidMount() {
    this.setState({ bioOverflow: this.isEllipsisActive(this.element) });
  }

  isEllipsisActive(e) {
    console.log(e);
    return e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth;
  }

  async handleRemoveFromWatchList() {
    console.log("try remove");
    await this.state.axiosInstance
      .get(
        `/remove_from_watch_list/${this.props.userId}/${this.props.details.data.id}`
      )
      .then((response) => {
        console.log(response);
        this.props.handleWatchList("onLoad");
      });
  }

  async handleAddToWatchList(details, mediaType, authenticated) {
    if (authenticated === true) {
      const posterPath =
        details.poster_path !== null
          ? details.poster_path.indexOf("/") === 0
            ? details.poster_path.slice(1, details.poster_path.length)
            : details.poster_path
          : null;
      await this.state.axiosInstance
        .get(
          `/add_to_watch_list/${this.props.userId}/${details.id}/${posterPath}/${details.name}/${mediaType}`
        )
        .then((response) => {
          this.props.handleWatchList("onLoad");
        });
    } else {
      this.setState({
        watchListAlert: true,
      });
    }
  }

  handleSeeMore(event) {
    console.log(event);
    this.setState({ seeMore: event === "expand" ? true : false });
  }

  render() {
    const details = this.props.details.data;
    const { bioOverflow } = this.state;
    const {
      userWatchList,
      mediaType,
      authenticated,
      externals,
      credits,
    } = this.props;
    const score = Math.ceil(details.vote_average * 10);
    const director = credits.data.crew.filter(
      (crew) => crew.department === "Directing"
    );
    const writer = credits.data.crew.filter(
      (crew) => crew.department === "Writing"
    );

    const CheckWatchList = () => {
      let onWatchList = false;
      for (var i = 0; i < userWatchList.length; i++) {
        if (userWatchList[i].id.indexOf(details.id) === 0) {
          onWatchList = true;
          break;
        }
      }

      return (
        <OverlayTrigger
          key="watchListToolTip"
          placement="bottom"
          overlay={
            <Tooltip id={`tooltip-bottom`}>
              {onWatchList === false
                ? "Add To Watchlist"
                : "Remove From Watchlist"}
            </Tooltip>
          }
        >
          <button
            onClick={
              onWatchList === false
                ? () =>
                    this.handleAddToWatchList(details, mediaType, authenticated)
                : this.handleRemoveFromWatchList.bind(this)
            }
            className={
              onWatchList === false
                ? "externalIcon externalIconMargin"
                : "onWatchList"
            }
          >
            +
          </button>
        </OverlayTrigger>
      );
    };

    function WatchListAlert() {
      const [show, setShow] = useState(true);
      if (show) {
        return (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Watchlist Error</Alert.Heading>
            <p>You need to login to use this feature</p>
          </Alert>
        );
      }
      return null;
    }

    return (
      <React.Fragment>
        <div className="expandTitle">{details.name}</div>
        {this.state.watchListAlert === true ? <WatchListAlert /> : null}
        <Container
          className="cardBack"
          style={{
            backgroundImage:
              details.backdrop_path !== null
                ? "url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces" +
                  details.backdrop_path +
                  ")"
                : null,
          }}
        >
          <Row className="cardWrap">
            <Col sm={3}>
              <Image
                className="expandHeaderImage"
                src={
                  details.poster_path !== null
                    ? "https://image.tmdb.org/t/p/w500" + details.poster_path
                    : noImage
                }
                alt="Profile"
                fluid
              />
            </Col>
            <Col
              className={
                this.state.seeMore === false
                  ? "expandHeaderTextCol"
                  : "expandHeaderTextCol seeMore"
              }
            >
              <Row className="expandHeaderMargin">
                {details.tagline !== "" ? `"` + details.tagline + `"` : null}
              </Row>
              <Row
                ref={(ref) => (this.element = ref)}
                className={
                  this.state.seeMore === false
                    ? "expandHeaderBio expandHeaderMargin"
                    : "expandHeaderBio expandHeaderMargin seeMore"
                }
              >
                {details.overview}
              </Row>
              {bioOverflow === true ? (
                this.state.seeMore === false ? (
                  <div
                    onClick={() => this.handleSeeMore("expand")}
                    className="seeMoreButton"
                  >
                    See More
                  </div>
                ) : (
                  <div
                    onClick={() => this.handleSeeMore("close")}
                    className="seeMoreButton"
                  >
                    See Less
                  </div>
                )
              ) : null}
              <div className="expandHeaderMargin">
                <div>
                  Vote Average:
                  <ProgressBar
                    animated
                    now={score}
                    striped
                    variant={
                      score < 34 ? "danger" : score < 67 ? "warning" : "success"
                    }
                    label={score > 0 ? `${score}/100` : "No Score"}
                  />
                </div>
                <div>Film Info:</div>
                <Row className="expandHeaderPersInfo">
                  {director.length > 0 ? (
                    <Col>
                      {mediaType === "movie"
                        ? director.length > 1
                          ? "Directors"
                          : "Director"
                        : details.created_by.length > 1
                        ? "Creators"
                        : "Creator"}
                      <br />
                      {mediaType === "movie"
                        ? director.map((d, i) =>
                            i + 1 < director.length ? d.name + ", " : d.name
                          )
                        : details.created_by.map((d, i) =>
                            i + 1 < details.created_by.length
                              ? d.name + ", "
                              : d.name
                          )}
                    </Col>
                  ) : (
                    <Col>
                      {mediaType === "movie" ? "Writer" : "Creator"} <br /> n/a
                    </Col>
                  )}
                  {writer.length > 0 ? (
                    <Col>
                      {writer.length > 1 ? "Writers" : "Writer"}
                      <br />
                      {writer.map((w, i) =>
                        i + 1 < writer.length ? w.name + ", " : w.name
                      )}
                    </Col>
                  ) : (
                    <Col>
                      Writer <br /> n/a
                    </Col>
                  )}
                </Row>
              </div>
              <Row className="externalLinks">
                <CheckWatchList />
                {details.homepage !== null ? (
                  <a
                    className="externalIconMargin"
                    href={details.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="externalIcon">H</button>
                  </a>
                ) : null}
                {externals.data.facebook_id !== null ? (
                  <a
                    className="externalIconMargin"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      "https://www.facebook.com/" + externals.data.facebook_id
                    }
                  >
                    <button className="externalIcon">F</button>
                  </a>
                ) : null}
                {externals.data.twitter_id !== null ? (
                  <a
                    className="externalIconMargin"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://twitter.com/" + externals.data.twitter_id}
                  >
                    <button className="externalIcon">T</button>
                  </a>
                ) : null}
                {externals.data.imdb_id !== null ? (
                  <a
                    className="externalIconMargin"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      "https://www.imdb.com/title/" +
                      externals.data.imdb_id +
                      "/"
                    }
                  >
                    <button className="externalIcon">I</button>
                  </a>
                ) : null}
              </Row>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default MovieTVHeader;
