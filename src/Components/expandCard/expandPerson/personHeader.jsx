import React, { Component } from "react";
import { Col, Row, Image, Container } from "react-bootstrap";
import noImage from "../../../Images/noImage.png";

class ExpandPersonCardHeader extends Component {
  state = { seeMore: false };

  componentDidMount() {
    this.setState({ bioOverflow: this.isEllipsisActive(this.element) });
  }

  isEllipsisActive(e) {
    console.log(e)
    return e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth;
  }

  handleSeeMore(event) {
    this.setState({ seeMore: event === "expand" ? true : false });
  }

  render() {
    const details = this.props.details.data;
    const { externals } = this.props;
    const { bioOverflow, seeMore } = this.state;

    return (
      <React.Fragment>
        <div className="expandTitle">{details.name}</div>
        <Container className="cardBack">
          <Row className="cardWrap">
            <Col sm={3}>
              <Image
                className="expandHeaderImage"
                src={
                  details.profile_path !== null
                    ? "https://image.tmdb.org/t/p/w500" + details.profile_path
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
              <Row
                ref={(ref) => (this.element = ref)}
                className={
                  this.state.seeMore === false
                    ? "expandHeaderBio expandHeaderMargin"
                    : "expandHeaderBio expandHeaderMargin seeMore"
                }
              >
                {details.biography}
              </Row>
              {bioOverflow === true ? (
                seeMore === false ? (
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
                <div>Personal Info:</div>
                <Row className="expandHeaderPersInfo">
                  <Col>
                    Birthday:
                    <br />
                    {details.birthday}
                  </Col>
                  {details.deathday !== null ? (
                    <Col>
                      Date of Death:
                      <br />
                      {details.deathday}
                    </Col>
                  ) : null}
                  <Col>
                    Place of Birth:
                    <br />
                    {details.place_of_birth}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Known For:
                    <br />
                    {details.known_for_department}
                  </Col>
                  <Col>
                    Gender:
                    <br />
                    {details.gender === 1
                      ? "Female"
                      : details.gender === 2
                      ? "Male"
                      : "N/a"}
                  </Col>
                  {details.deathday !== null ? <Col /> : null}
                </Row>
              </div>
              <Row className="externalLinks">
                {details.homepage !== null ? (
                  <a
                    className="externalIconMargin"
                    href={details.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="externalIcon PersonIcon">H</button>
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
                    <button className="externalIcon PersonIcon">F</button>
                  </a>
                ) : null}
                {externals.data.twitter_id !== null ? (
                  <a
                    className="externalIconMargin"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://twitter.com/" + externals.data.twitter_id}
                  >
                    <button className="externalIcon PersonIcon">T</button>
                  </a>
                ) : null}
                {externals.data.imdb_id !== null ? (
                  <a
                    className="externalIconMargin"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      "https://www.imdb.com/name/" +
                      externals.data.imdb_id +
                      "/"
                    }
                  >
                    <button className="externalIcon PersonIcon">I</button>
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

export default ExpandPersonCardHeader;
