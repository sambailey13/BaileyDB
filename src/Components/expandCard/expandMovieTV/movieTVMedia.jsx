import React, { Component } from "react";
import { Tab, Tabs, CardColumns, Card, Container, Row } from "react-bootstrap";
import YouTube from "react-youtube";
import Glide from "@glidejs/glide";
import viewMoreImage from "../../../Images/viewMore.png";

class MovieTVMedia extends Component {
  state = {
    tabType: "images",
    viewMore: "",
    enlargeImage: "",
  };

  handleTabType(type) {
    this.setState({
      tabType: type,
    });
  }

  videoOnReady(event) {
    event.target.pauseVideo();
  }

  render() {
    const {
      handleViewMore,
      viewMore,
      images,
      videos,
      handleExpandImage,
    } = this.props;
    const { tabType } = this.state;
    const videoOnReady = this.videoOnReady.bind(this);

    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        autoplay: 0,
      },
    };

    function ImageGlide() {
      React.useEffect(() => {
        new Glide(".mediaImage", {
          type: "carousel",
          startAt: 0,
          focusAt: 0,
          perView: 4,
        }).mount();
      });

      return (
        <div className={"glide mediaImage"}>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {images.data.posters.slice(0, 3).map((image) => (
                <li
                  className="glide__slide expandSlide"
                  key={image.file_path}
                  onClick={() =>
                    handleExpandImage(
                      "https://image.tmdb.org/t/p/w500" + image.file_path,
                      "open"
                    )
                  }
                  style={{
                    backgroundImage:
                      "url(https://image.tmdb.org/t/p/w500" +
                      image.file_path +
                      ")",
                  }}
                ></li>
              ))}
              {images.data.backdrops.slice(0, 3).map((image) => (
                <li
                  className="glide__slide"
                  key={image.file_path}
                  onClick={() =>
                    handleExpandImage(
                      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces" +
                        image.file_path,
                      "open"
                    )
                  }
                  style={{
                    backgroundImage:
                      "url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces" +
                      image.file_path +
                      ")",
                  }}
                ></li>
              ))}
              {images.data.posters.length > 3 ||
              images.data.backdrops.length > 3 ? (
                <li
                  className="glide__slide expandSlide"
                  onClick={() => handleViewMore("images")}
                  style={{
                    backgroundImage: "url(" + viewMoreImage + ")",
                  }}
                >
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      );
    }

    function VideoGlide() {
      React.useEffect(() => {
        new Glide(".mediaVideo", {
          type: "carousel",
          startAt: 0,
          focusAt: 0,
          perTouch: 2,
          perView: 2,
        }).mount();
      }, []);
      return (
        <div className="glide mediaVideo">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides" style={{ display: "flex" }}>
              {videos.data.results.slice(0, 3).map((video) => (
                <li>
                  <YouTube
                    className="glide__slide"
                    key={video.key}
                    videoId={video.key}
                    opts={opts}
                    onReady={videoOnReady}
                  />
                </li>
              ))}
              {videos.data.results.length > 2 ? (
                <li
                  className="glide__slide"
                  onClick={() => handleViewMore("videos")}
                >
                  View More
                </li>
              ) : null}
            </ul>
          </div>
          <div className="glide">
            <div className="glide__track" data-glide-el="track"></div>

            <div
              className="glide__arrows expandGlideArrorws"
              data-glide-el="controls"
            >
              <button
                className="glide__arrow glide__arrow--left expandGlideArrow"
                data-glide-dir="<"
              >
                prev
              </button>
              <button
                className="glide__arrow glide__arrow--right expandGlideArrow"
                data-glide-dir=">"
              >
                next
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        {viewMore === "images" ? (
          <Container className="expandContainer">
            <Row className="viewLessNav">
              <div className="viewLessNavSpacing">Posters:</div>
              <div
                className="viewLessButton"
                onClick={() => handleViewMore("closed")}
              >
                View Less
              </div>
            </Row>
            <CardColumns className="posterCard">
              {images.data.posters.map((image) => (
                <Card
                  key={image.file_path}
                  onClick={() =>
                    handleExpandImage(
                      "https://image.tmdb.org/t/p/w500" + image.file_path,
                      "open"
                    )
                  }
                >
                  <Card.Img
                    variant="top"
                    className="viewMoreImages"
                    src={"https://image.tmdb.org/t/p/w500" + image.file_path}
                    fluid
                  />
                </Card>
              ))}
            </CardColumns>

            <div>Backdrops:</div>
            <CardColumns>
              {images.data.backdrops.map((image) => (
                <Card
                  key={image.file_path}
                  onClick={() =>
                    handleExpandImage(
                      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces" +
                        image.file_path,
                      "open"
                    )
                  }
                >
                  <Card.Img
                    variant="top"
                    src={
                      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces" +
                      image.file_path
                    }
                    fluid
                  />
                </Card>
              ))}
            </CardColumns>
          </Container>
        ) : viewMore === "videos" ? (
          <Container className="expandContainer">
            <Row className="viewLessNav">
              <div className="viewLessNavSpacing">Videos:</div>
              <div onClick={() => handleViewMore("closed")}>View Less</div>
            </Row>
            <CardColumns className="videoCards">
              {videos.data.results.map((video) => (
                <Card>
                  <YouTube
                    className="glide__slide"
                    key={video.key}
                    videoId={video.key}
                    opts={opts}
                    onReady={videoOnReady}
                  />
                </Card>
              ))}
            </CardColumns>
          </Container>
        ) : (
          <React.Fragment>
            <Tabs
              defaultActiveKey={tabType}
              transition={false}
              id="noanim-tab-example"
              onSelect={this.handleTabType.bind(this)}
            >
              <Tab eventKey="media" title="Media" disabled></Tab>
              <Tab
                eventKey="images"
                title={
                  "Images - " +
                  (images.data.backdrops.length + images.data.posters.length)
                }
              ></Tab>
              <Tab
                eventKey="videos"
                title={"Videos - " + videos.data.results.length}
              ></Tab>
            </Tabs>
            <div className="expandGlideContainer">
              {this.state.tabType === "images" ? (
                images.data.backdrops.length > 0 &&
                images.data.posters.length > 0 ? (
                  <ImageGlide />
                ) : (
                  <Container className="expandContainer noResults">
                    No Images Found
                  </Container>
                )
              ) : null}

              {this.state.tabType === "videos" ? (
                videos.data.results.length === 1 ? (
                  <YouTube
                    className="glide__slide"
                    key={videos.data.results[0].key}
                    videoId={videos.data.results[0].key}
                    opts={opts}
                    onReady={videoOnReady}
                  />
                ) : videos.data.results.length > 0 ? (
                  <VideoGlide />
                ) : (
                  <Container className="expandContainer noResults">
                    No Videos Found
                  </Container>
                )
              ) : null}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default MovieTVMedia;
