import React, { Component } from "react";
import HomeGlider from "./glideHome";
import { Tab, Row, Col, Nav } from "react-bootstrap";

class HomeInfo extends Component {
  state = {};

  handleRequest(id, mediaType) {
    console.log(id);
    console.log(mediaType);
    this.props.request.expandRequest(id, mediaType);
  }

  render() {
    const movie = this.props.popularMovie.data.results;
    const person = this.props.popularPerson.data.results;
    const tv = this.props.popularTV.data.results;
    const { handleHomeTab, homeTab, handleExpand } = this.props;

    return (
      <React.Fragment>
        <div>
          <div className="homeText topHeader">
            {homeTab === "movie" ? "Popular Movies:" : "Popular Shows:"}
          </div>
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="movie"
            onSelect={handleHomeTab}
          >
            <Row>
              <Col sm={3}>
                <Nav variant="pills">
                  <Nav.Item className="homeButton">
                    <Nav.Link eventKey="movie">Movies</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="homeButton">
                    <Nav.Link eventKey="tv">TV</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
          </Tab.Container>
        </div>
        {homeTab === "movie" ? (
          <HomeGlider
            details={movie}
            mediaType="movie"
            handleExpand={handleExpand}
          />
        ) : (
          <HomeGlider details={tv} mediaType="tv" handleExpand={handleExpand} />
        )}
        <div className="homeText"> Popular People:</div>
        <HomeGlider
          details={person}
          mediaType="person"
          handleExpand={handleExpand}
        />
      </React.Fragment>
    );
  }
}

export default HomeInfo;
