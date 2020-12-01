import React, { Component } from "react";
import { Card } from "react-bootstrap";
import PersonHeader from "./expandPerson/personHeader";
import PersonCredits from "./expandPerson/personCredits";
import PersonKnownFor from "./expandPerson/personKnownFor";
import PersonMedia from "./expandPerson/personMedia";
import MovieTVHeader from "./expandMovieTV/movieTVHeader";
import MovieTVCast from "./expandMovieTV/movieTVCredits";
import MovieTVInfo from "./expandMovieTV/movieTVInfo";
import MovieTVMedia from "./expandMovieTV/movieTVMedia";
import MovieTVReviews from "./expandMovieTV/movieTVReviews";
import MovieTVSimilar from "./expandMovieTV/movieTVSimilar";

class ExpandCard extends Component {
  state = {};

  render() {
    const {
      authenticated,
      expandDetails,
      userWatchList,
      userId,
      handleViewMore,
      previouslyViewed,
      viewMore,
      handleExpandImage,
      handleExpand,
      handleWatchList,
    } = this.props;

    return (
      <Card className="expandCard">
        <div className="expandNav">
          <div
            className="expandNavButton"
            onClick={
              previouslyViewed[0].length > 1
                ? () => this.props.handleBack()
                : null
            }
          >
            Back
          </div>
          <div style={{ flex: 1 }}></div>
          <div
            className="expandNavButton"
            onClick={() => this.props.handleClose()}
          >
            Close
          </div>
        </div>
        {expandDetails.mediaType === "person" ? (
          <React.Fragment>
            <PersonHeader
              key={"personHeader"}
              details={expandDetails.details}
              images={expandDetails.images}
              externals={expandDetails.externals}
            />
            <PersonKnownFor
              key={"personKnownFor"}
              knownFor={expandDetails.details.data.known_for_department}
              credits={expandDetails.credits}
              handleExpand={handleExpand}
            />
            <PersonCredits
              key={"personCredits"}
              credits={expandDetails.credits}
              viewMore={viewMore}
              handleViewMore={handleViewMore}
              handleExpand={handleExpand}
            />
            <PersonMedia
              key={"personMedia"}
              images={expandDetails.images}
              handleExpandImage={handleExpandImage}
            />
          </React.Fragment>
        ) : expandDetails.mediaType === "movie" ||
          expandDetails.mediaType === "tv" ? (
          <React.Fragment>
            <MovieTVHeader
              key={"MovieTVHeader"}
              authenticated={authenticated}
              credits={expandDetails.credits}
              details={expandDetails.details}
              externals={expandDetails.externals}
              userWatchList={userWatchList}
              userId={userId}
              mediaType={expandDetails.mediaType}
              handleWatchList={handleWatchList}
            />
            <MovieTVCast
              key={"MovieTVCast"}
              credits={expandDetails.credits}
              viewMore={viewMore}
              handleViewMore={handleViewMore}
              handleExpand={handleExpand}
            />
            <MovieTVInfo
              key={"MovieTVInfo"}
              details={expandDetails.details.data}
              mediaType={expandDetails.mediaType}
            />
            <MovieTVMedia
              key={"MovieTVVideos"}
              videos={expandDetails.videos}
              images={expandDetails.images}
              viewMore={viewMore}
              handleViewMore={handleViewMore}
              handleExpandImage={handleExpandImage}
            />
            <MovieTVReviews
              key={"MovieTVReviews"}
              reviews={expandDetails.reviews}
            />
            <MovieTVSimilar
              key={"MovieTVSimilar"}
              similar={expandDetails.similar}
              mediaType={expandDetails.mediaType}
              handleExpand={handleExpand}
            />
          </React.Fragment>
        ) : null}
      </Card>
    );
  }
}

export default ExpandCard;
