import React, { Component } from "react";
import { Card, CardColumns } from "react-bootstrap";
import noImage from "../Images/noImage.png";

class MoiveResults extends Component {
  state = {};

  render() {
    const { details, handleExpand } = this.props;

    return (
      <CardColumns>
        {details.map((detail) => (
          <div
            key={detail.id}
            className={details.length < 6 ? "realign" : null}
          >
            <div className={"searchResultText"}>{detail.name}</div>
            <Card
              className="resultCard"
              onClick={() => handleExpand(detail.id, detail.media_type)}
            >
              <Card.Img
                variant="top"
                className="searchResultImg"
                src={
                  detail.poster_path === null || detail.poster_path === "/null"
                    ? noImage
                    : "https://image.tmdb.org/t/p/w500" + detail.poster_path
                }
              />
            </Card>
          </div>
        ))}
      </CardColumns>
    );
  }
}

export default MoiveResults;
