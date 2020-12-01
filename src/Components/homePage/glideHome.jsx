import React, { Component } from "react";
import Glide from "@glidejs/glide";
import noImage from "../../Images/noImage.png";

class GlideHome extends Component { 
  state = {};
  render() {
    const { details, mediaType, handleExpand } = this.props;

    function Glider() {
      React.useEffect(() => {
        new Glide(".home" + mediaType, {
          type: "carousel",
          startAt: 0,
          perTouch: 3,
          perView: 4,
          autoplay: 3500,
        }).mount();
      });
      return (
        <div className={"glide home" + mediaType}>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {details.map((detail) => (
                <li
                  key={detail.id}
                  id={detail.id}
                  className="glide__slide"
                  onClick={() => handleExpand(detail.id, mediaType)}
                  
                  style={
                    mediaType === "person"
                      ? {
                          backgroundImage: detail.profile_path ? 
                            "url(https://image.tmdb.org/t/p/w500" +
                            detail.profile_path +
                            ")" : "url(" + noImage + ")"
                        }
                      : {
                          backgroundImage: detail.poster_path ? 
                            "url(https://image.tmdb.org/t/p/w500" +
                            detail.poster_path +
                            ")" : "url(" + noImage + ")"
                        }
                  }
                >
                  <div className="glideText">
                    {mediaType === "movie" ? detail.title : detail.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="glide">
            <div className="glide__track" data-glide-el="track"></div>

            <div className="glide__arrows homeGlideArrorws" data-glide-el="controls">
              <button
                className="glide__arrow glide__arrow--left"
                data-glide-dir="<"
              >
                Prev
              </button>
              <button
                className="glide__arrow glide__arrow--right"
                data-glide-dir=">"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="homeGlideContainer">
        <Glider />
      </div>
    );
  }
}

export default GlideHome;
