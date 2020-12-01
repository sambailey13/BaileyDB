import React, { Component, useContext } from "react";
import {
  Tab,
  Tabs,
  Accordion,
  useAccordionToggle,
  AccordionContext,
  Card,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

class PersonCredits extends Component {
  state = {
    tabType: "castCredits",
  };

  // tv shows are having the same problem as they are defined by name not title therefore undefined is retrieved either write a little function to over come this
  // or do what i did in selectMovie and rename the array when it is retrieved.
  // function might look like if(roles.title === undefined) { return roles.name} else {return roles.title}

  sortScore() {
    console.log("sortscore");
    console.log(this.props.credits.data.cast[0].vote_average);
    const roles = this.props.credits.data.cast;
    console.log(roles);
    const rolesScore = roles.sort((a, b) => b.vote_average - a.vote_average);
    console.log(rolesScore);
    this.setState({
      roles: rolesScore,
    });
  }

  handleTabType(type) {
    this.setState({
      tabType: type,
    });
  }

  render() {
    const { cast, crew } = this.props.credits.data;
    const { handleViewMore, viewMore, handleExpand } = this.props;
    const { tabType } = this.state;

    //might have to combine these two together isnt hard to do, but when further sort methods are addeded it could all be run throught this???

    const sortCast = cast.sort(
      (a, b) =>
        new Date(b.media_type === "movie" ? b.release_date : b.first_air_date) -
        new Date(a.media_type === "movie" ? a.release_date : a.first_air_date)
    );
    const sortCrew = crew.sort(
      (a, b) =>
        new Date(b.media_type === "movie" ? b.release_date : b.first_air_date) -
        new Date(a.media_type === "movie" ? a.release_date : a.first_air_date)
    );

    const credits =
      tabType === "castCredits" && viewMore === "castCredits"
        ? sortCast
        : tabType === "crewCredits" && viewMore === "crewCredits"
        ? sortCrew
        : tabType === "castCredits" && viewMore === "closed"
        ? sortCast.slice(0, 10)
        : sortCrew.slice(0, 10);

    function ContextAwareToggle({ children, eventKey, callback }) {
      const currentEventKey = useContext(AccordionContext);

      const decoratedOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey)
      );

      const isCurrentEventKey = currentEventKey === eventKey;

      return (
        <Card.Header
          type="button"
          className={isCurrentEventKey ? "accordActive" : "accordInActive"}
          onClick={decoratedOnClick}
        >
          {children}
        </Card.Header>
      );
    }
    function Credits() {
      return (
        <React.Fragment>
          {credits.map((credit) => (
            <Accordion defaultActiveKey="1" key={credit.credit_id}>
              <Card>
                <ContextAwareToggle eventKey="0">
                  {tabType === "castCredits"
                    ? credit.media_type === "movie"
                      ? credit.title +
                        " - " +
                        (credit.character === undefined ||
                        credit.character === ""
                          ? "n/a"
                          : credit.character) +
                        " - " +
                        (credit.release_date === undefined ||
                        credit.release_date === ""
                          ? "n/a"
                          : credit.release_date)
                      : credit.name +
                        " - " +
                        (credit.character === undefined ||
                        credit.character === ""
                          ? "n/a"
                          : credit.character) +
                        " - " +
                        (credit.first_air_date === undefined ||
                        credit.first_air_date === ""
                          ? "n/a"
                          : credit.first_air_date)
                    : credit.media_type === "movie"
                    ? credit.title +
                      " - " +
                      (credit.job === undefined || credit.job === ""
                        ? "n/a"
                        : credit.job) +
                      " - " +
                      (credit.release_date === undefined ||
                      credit.release_date === ""
                        ? "n/a"
                        : credit.release_date)
                    : credit.name +
                      " - " +
                      (credit.job === undefined || credit.job === ""
                        ? "n/a"
                        : credit.job) +
                      " - " +
                      (credit.first_air_date === undefined ||
                      credit.first_air_date === ""
                        ? "n/a"
                        : credit.first_air_date)}
                </ContextAwareToggle>

                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {credit.overview}
                    <div
                      onClick={() => handleExpand(credit.id, credit.media_type)}
                      className="viewDetailsButton"
                    >
                      View Details
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
          <div>
            {tabType === "castCredits" ? (
              cast.length > 10 ? (
                <div
                  onClick={() =>
                    handleViewMore(viewMore === tabType ? "closed" : tabType)
                  }
                >
                  {viewMore === tabType ? "Show Less" : "Show More"}
                </div>
              ) : null
            ) : crew.length > 10 ? (
              <div
                onClick={() =>
                  handleViewMore(viewMore === tabType ? "closed" : tabType)
                }
              >
                {viewMore === tabType ? "Show Less" : "Show More"}
              </div>
            ) : null}
          </div>
        </React.Fragment>
      );
    }

    return (
      <div className="expandContainer">
        <Tabs
          defaultActiveKey="castCredits"
          id="uncontrolled-tab-example"
          onSelect={this.handleTabType.bind(this)}
        >
          <Tab eventKey="credits" title="Credits" disabled>
            Credits
          </Tab>
          <Tab eventKey="castCredits" title={"Acting - " + cast.length}>
            {cast.length > 0 ? <Credits /> : "No Acting Credits Found"}
          </Tab>
          <Tab eventKey="crewCredits" title={"Crew - " + crew.length}>
            {crew.length > 0 ? <Credits /> : "No Crew Credits Found"}
          </Tab>
        </Tabs>
        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
          <Dropdown.Item>Sort By</Dropdown.Item>
          <Dropdown.Item>Date</Dropdown.Item>
          <Dropdown.Item onClick={this.sortScore.bind(this)}>
            Vote Average
          </Dropdown.Item>
          <Dropdown.Item>Popularity</Dropdown.Item>
        </DropdownButton>
      </div>
    );
  }
}

export default PersonCredits;
