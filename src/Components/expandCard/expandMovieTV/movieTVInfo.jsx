import React, { Component } from "react";
import { Col, Row, Container, Badge } from "react-bootstrap";

class MovieTVInfo extends Component {
  state = {};
  render() {
    const { details, mediaType } = this.props;

    return (
      <Container className="expandContainer">
        <div className="infoHeader">
          {mediaType === "movie" ? "Movie Information" : "Show Information"}
        </div>
        <Row>
          <Col>Status: {details.status}</Col>
          <Col>
            {mediaType === "movie"
              ? "Release Date: " + details.release_date
              : "Language: " + details.original_language}
          </Col>
        </Row>
        <Row>
          <Col>
            {mediaType === "movie"
              ? "Runtime: " + details.runtime
              : "Release Date: " + details.first_air_date}
          </Col>
          <Col>
            {mediaType === "movie"
              ? "Language: " + details.original_language
              : "Last Air Date: " + details.last_air_date}
          </Col>
        </Row>
        <Row>
          <Col>
            {mediaType === "movie"
              ? "Budget: $" + details.budget
              : "Seasons: " + details.number_of_seasons}
          </Col>
          <Col>
            {mediaType === "movie"
              ? "Revenue: $" + details.revenue
              : "Episodes: " + details.number_of_episodes}
          </Col>
        </Row>
        <Row>
          <Col>
            Genres:{" "}
            {details.genres.map((genre) => (
              <Badge key={genre.id} pill variant="dark">
                {genre.name}
              </Badge>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MovieTVInfo;
