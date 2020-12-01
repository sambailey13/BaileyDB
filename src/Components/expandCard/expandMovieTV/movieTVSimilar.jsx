import React, { Component } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import Glide from "@glidejs/glide";
import noImage from "../../../Images/noImage.png";

class movieTVSimilar extends Component {
  state = {};
  render() {
    const similar = this.props.similar.data.results;
    const { handleExpand, mediaType } = this.props;

    function Glider() {
      React.useEffect(() => {
        new Glide(".similar", {
          type: "carousel",
          startAt: 0,
          perTouch: 3,
          perView: 4,
          autoplay: 3500,
        }).mount();
      });
      return (
        <div className={"glide similar"}>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {similar.slice(0, 8).map((similar) => (
                <li
                  key={similar.id}
                  id={similar.id}
                  className="glide__slide"
                  style={{
                    backgroundImage:
                      similar.poster_path !== null
                        ? "url(https://image.tmdb.org/t/p/w500" +
                          similar.poster_path +
                          ")"
                        : "url(" + noImage + ")",
                  }}
                  onClick={() => handleExpand(similar.id, mediaType)}
                >
                  <div className="glideText">
                    {mediaType === "movie" ? similar.title : similar.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <Tabs transition={false} id="noanim-tab-example">
          <Tab
            title={mediaType === "movie" ? "Similar Movies" : "Similar Shows"}
            disabled
          ></Tab>
        </Tabs>
        {similar.length > 0 ? (
          <div className="expandGlideContainer">
            <Glider />
          </div>
        ) : (
          <Container className="expandContainer noResults">
            No Similar Movies Found
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default movieTVSimilar;
