import React, { Component } from "react";
import { Container, Tabs, Tab, Table, Image } from "react-bootstrap";
import Glide from "@glidejs/glide";
import noImage from "../../../Images/noImage.png";
import viewMoreImage from "../../../Images/viewMore.png";

class MovieTVCast extends Component {
  state = {
    tabType: "cast",
  };

  handleTabType(type) {
    this.setState({
      tabType: type,
    });
  }

  render() {
    const { handleViewMore, viewMore, handleExpand } = this.props;
    const { tabType } = this.state;
    const credits =
      tabType === "cast"
        ? this.props.credits.data.cast
        : tabType === "crew"
        ? this.props.credits.data.crew
        : null;
    const moreCredits =
      viewMore === "cast"
        ? this.props.credits.data.cast
        : viewMore === "crew"
        ? this.props.credits.data.crew
        : null;

    function Glider() {
      React.useEffect(() => {
        new Glide(".credits", {
          type: "carousel",
          startAt: 0,
          perTouch: 3,
          perView: 4,
          autoplay: 3500,
        }).mount();
      });
      return (
        <div className="glide credits">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {credits.slice(0, 6).map((credit) => (
                <li
                  key={credit.id}
                  id={credit.id}
                  className="glide__slide expandSlide"
                  style={{
                    backgroundImage:
                      credit.profile_path !== null
                        ? "url(https://image.tmdb.org/t/p/w500" +
                          credit.profile_path +
                          ")"
                        : "url(" + noImage + ")",
                  }}
                  onClick={() => handleExpand(credit.id, "person")}
                >
                  <div className="glideText">
                    {credit.name}
                    <br /> {credit.character}
                  </div>
                </li>
              ))}
              {credits.length > 6 ? (
                <li
                  className="glide__slide expandSlide"
                  onClick={() => handleViewMore(tabType)}
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

    return (
      <div>
        {viewMore === "cast" || viewMore === "crew" ? (
          <React.Fragment>
            <div
              className="viewLessButton"
              onClick={() => handleViewMore("closed")}
            >
              View Less
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="tablePictureCol">Picture</th>
                  <th className="tableNameCol">Name</th>
                  <th className="tableRoleCol">Role</th>
                </tr>
              </thead>
              <tbody>
                {moreCredits.map((credit) => (
                  <tr
                    key={credit.id}
                    className="tableRow"
                    onClick={() => handleExpand(credit.id, "person")}
                  >
                    <td>
                      <Image
                        className="tablePicture"
                        src={
                          credit.profile_path !== null
                            ? "https://image.tmdb.org/t/p/w500" +
                              credit.profile_path
                            : noImage
                        }
                        fluid
                      />
                    </td>
                    <td className="tableRow">{credit.name}</td>
                    <td className="tableRow">
                      {viewMore === "cast"
                        ? credit.character
                        : credit.department}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Tabs
              defaultActiveKey={tabType}
              transition={false}
              id="noanim-tab-example"
              onSelect={this.handleTabType.bind(this)}
            >
              <Tab eventKey="credits" title="Credits" disabled></Tab>
              <Tab
                eventKey="cast"
                title={"Cast - " + this.props.credits.data.cast.length}
              ></Tab>
              <Tab
                eventKey="crew"
                title={"Crew - " + this.props.credits.data.crew.length}
              ></Tab>
            </Tabs>
            {credits.length > 0 ? (
              <div className="expandGlideContainer">
                <Glider />
              </div>
            ) : (
              <Container className="expandContainer noResults">
                No Credits Found
              </Container>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default MovieTVCast;
