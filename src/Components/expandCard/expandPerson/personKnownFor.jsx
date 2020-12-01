import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Glide from "@glidejs/glide";
import noImage from "../../../Images/noImage.png";

class KnownFor extends Component {
  state = {};

  render() {
    const { credits, knownFor, handleExpand } = this.props;

    const SortByPopularity = () => {
      //this function sorts with a conditionally was to used to determine if it was a actor or tv person however due to the data i receive it cannot be determined
      //this maybe of use for the personCredits sort function
      /*const popularity = credits.data.cast.sort( 
        (a, b) => b.episode_count > 1 ? b.popularity - a.popularity : (b.episode_count <= 1)-(a.episode_count < 1) || b.popularity - a.popularity
          );*/

      const popularity =
        knownFor === "Acting"
          ? credits.data.cast.sort((a, b) => b.popularity - a.popularity)
          : credits.data.crew.sort((a, b) => b.popularity - a.popularity);

      React.useEffect(() => {
        new Glide(".personKnownFor", {
          type: "carousel",
          startAt: 0,
          perTouch: 3,
          perView: 4,
        }).mount();
      });

      return (
        <div className="glide personKnownFor">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {popularity.slice(0, 10).map((role) => (
                <li
                  key={role.credit_id}
                  className="glide__slide expandSlide"
                  onClick={() => handleExpand(role.id, role.media_type)}
                  style={{
                    backgroundImage:
                      role.poster_path !== null
                        ? "url(https://image.tmdb.org/t/p/w500" +
                          role.poster_path +
                          ")"
                        : "url(" + noImage + ")",
                  }}
                >
                  <div className="glideText">
                    {role.media_type === "movie" ? role.title : role.name}
                    <br />
                    {knownFor === "Acting" ? role.character : role.job}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    };

    return (
      <div>
        <Tabs transition={false} id="noanim-tab-example">
          <Tab title="Known For" disabled></Tab>
        </Tabs>
        <div className="expandGlideContainer">
          <SortByPopularity />
        </div>
      </div>
    );
  }
}

export default KnownFor;
