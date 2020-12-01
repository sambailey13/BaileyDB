import React, { Component } from "react";
import { Card } from "react-bootstrap";

class movieTVReviews extends Component {
  state = {};

  render() {
    const {reviews} = this.props;
    
    return (
      <React.Fragment>
        <Card>
          <Card.Body>
            <Card.Title>Reviews</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {reviews.data.results.length === 0
                ? "No reviews found"
                : reviews.data.results[0].author}
            </Card.Subtitle>
            <Card.Text>
              {reviews.data.results.length === 0
                ? null
                : reviews.data.results[0].content}
            </Card.Text>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

export default movieTVReviews;
