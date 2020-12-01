import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Glide from "@glidejs/glide";

class PersonMedia extends Component {
  state = {};
  render() {
    const { images, handleExpandImage } = this.props;

    function Glider() {
      React.useEffect(() => {
        new Glide(".personMedia", {
          type: "carousel",
          startAt: 0,
          perTouch: 3,
          perView: 4,
        }).mount();
      });
      return (
        <div className={"glide personMedia"}>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {images.data.profiles.map((media) => (
                <li
                  key={media.file_path}
                  className="glide__slide expandSlide"
                  onClick={() =>
                    handleExpandImage(
                      "https://image.tmdb.org/t/p/w500" + media.file_path,
                      "open"
                    )
                  }
                  style={{
                    backgroundImage:
                      "url(https://image.tmdb.org/t/p/w500" +
                      media.file_path +
                      ")",
                  }}
                ></li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <Tabs transition={false} id="noanim-tab-example">
          <Tab title={"Images - " + images.data.profiles.length} disabled></Tab>
        </Tabs>
        {images.data.profiles.length > 0 ? (
          <div className="expandGlideContainer">
            <Glider />
          </div>
        ) : (
          "No Images Where Found"
        )}
      </React.Fragment>
    );
  }
}

export default PersonMedia;
