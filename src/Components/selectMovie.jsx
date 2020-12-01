import React, { Component, useState } from "react";
import SearchResults from "./searchResults";
import axios from "axios";
import { Alert, Spinner, Image, Container } from "react-bootstrap";
import ExpandCard from "./expandCard/expandCard";
import { CSSTransition } from "react-transition-group";
import NavBar from "./homePage/navBar";
import Pagination from "./watchList/pagination";
import Cookies from "js-cookie";
import HomeInfo from "./homePage/homeInfo";

class selectMovie extends Component {
  state = {
    axiosInstance: axios.create({
      baseURL: "https://bailey-db.xyz:3001",
    }),
    imagePath: "https://image.tmdb.org/t/p/w500",
    expandDetails: {
      details: "",
      mediaType: "",
      images: "",
      credits: "",
      externals: "",
      videos: "",
      reviews: "",
      similar: "",
      viewMore: "",
    },
    query: "",
    resultDetails: [],
    expand: false,
    openWatchList: false,
    authenticated: false,
    userId: "",
    userWatchList: [],
    paginatedUserWatchList: [],
    previouslyViewed: [[], []],
    isLoading: true,
    expandLoading: false,
    popularMovie: undefined,
    popularTV: undefined,
    popularPerson: undefined,
    expandImage: { expand: false, path: "path" },
    homeTab: "movie",
  };

  async componentDidMount() {
    const loggedIn = Cookies.getJSON("userLoggedIn");
    let homeRequests = await this.homeRequests();
    if (this.state.authenticated === false && loggedIn !== undefined) {
      this.setState(
        {
          popularMovie: homeRequests[0],
          popularTV: homeRequests[1],
          popularPerson: homeRequests[2],
          authenticated: true,
          userId: loggedIn.sub,
        },
        this.checkRequest
      );
      await this.handleWatchList("onLoad");
    } else {
      this.setState(
        {
          popularMovie: homeRequests[0],
          popularTV: homeRequests[1],
          popularPerson: homeRequests[2],
          authenticated: false,
        },
        this.checkRequest
      );
    }
  }

  checkRequest() {
    if (
      this.state.popularMovie !== undefined &&
      this.state.popularPerson !== undefined
    ) {
      this.setState({ isLoading: false });
    } else {
      this.setState({ failedHomeRetrieve: true });
    }
  }

  // Start - Api Requests

  async homeRequests() {
    const requestOne = this.state.axiosInstance.get(`/get_movie_popular`);
    const requestTwo = this.state.axiosInstance.get(`/get_tv_popular`);
    const requestThree = this.state.axiosInstance.get(`/get_person_popular`);

    let homeRequests = axios.all([requestOne, requestTwo, requestThree]).then(
      axios.spread((...response) => {
        return response;
      })
    );
    return homeRequests;
  }

  async handleSearch(query) {
    this.setState({ isLoading: true });
    await this.state.axiosInstance
      .get(`/get_search/${query}`)
      .then((response) => {
        response.data.results.forEach((result) => {
          if (result.media_type === "movie") {
            const title = result.title;
            delete result.title;
            result.name = title;
          } else if (result.media_type === "tv") {
          } else if (result.media_type === "person") {
            const profilePath = result.profile_path;
            delete result.profile_path;
            result.poster_path = profilePath;
          }
          this.setState({
            resultDetails: response.data.results.slice(0, 6),
            openWatchList: false,
            isLoading: false,
          });
        });
      });
  }

  //handleExpandRequest - this function is passed the id (value - used for searching using the API) and mediaType (either movie, tv or person) and use the mediaType to
  //determine which get fucntion to use depending on the value passed.

  handleExpandRequest(id, mediaType) {
    this.setState({ expandLoading: true });
    if (mediaType === "movie") {
      this.getMovie(id);
    } else if (mediaType === "tv") {
      this.getTV(id);
    } else if (mediaType === "person") {
      this.getPerson(id);
    }
  }

  getMovie(id) {
    const requestOne = this.state.axiosInstance.get(`/get_movie_details/${id}`);
    const requestTwo = this.state.axiosInstance.get(`/get_movie_images/${id}`);
    const requestThree = this.state.axiosInstance.get(
      `/get_movie_credits/${id}`
    );
    const requestFour = this.state.axiosInstance.get(
      `/get_movie_externals/${id}`
    );
    const requestFive = this.state.axiosInstance.get(`/get_movie_videos/${id}`);
    const requestSix = this.state.axiosInstance.get(`/get_movie_reviews/${id}`);
    const requestSeven = this.state.axiosInstance.get(
      `/get_movie_similar/${id}`
    );

    axios
      .all([
        requestOne,
        requestTwo,
        requestThree,
        requestFour,
        requestFive,
        requestSix,
        requestSeven,
      ])
      .then(
        axios.spread((...response) => {
          const title = response[0].data.title;
          delete response[0].data.title;
          response[0].data.name = title;
          this.setState({
            expand: true,
            expandDetails: {
              details: response[0],
              images: response[1],
              credits: response[2],
              externals: response[3],
              videos: response[4],
              reviews: response[5],
              similar: response[6],
              mediaType: "movie",
            },
            previouslyViewed: [
              [...this.state.previouslyViewed[0], response[0].data.id],
              [...this.state.previouslyViewed[1], "movie"],
            ],
            viewMore: "closed",
            expandLoading: false,
          });
        })
      );
  }

  getTV(id) {
    const requestOne = this.state.axiosInstance.get(`/get_tv_details/${id}`);
    const requestTwo = this.state.axiosInstance.get(`/get_tv_images/${id}`);
    const requestThree = this.state.axiosInstance.get(`/get_tv_credits/${id}`);
    const requestFour = this.state.axiosInstance.get(
      `/get_person_externals/${id}`
    );
    const requestFive = this.state.axiosInstance.get(`/get_tv_videos/${id}`);
    const requestSix = this.state.axiosInstance.get(`/get_tv_reviews/${id}`);
    const requestSeven = this.state.axiosInstance.get(`/get_tv_similar/${id}`);

    axios
      .all([
        requestOne,
        requestTwo,
        requestThree,
        requestFour,
        requestFive,
        requestSix,
        requestSeven,
      ])
      .then(
        axios.spread((...response) => {
          this.setState({
            expand: true,
            expandDetails: {
              details: response[0],
              images: response[1],
              credits: response[2],
              externals: response[3],
              videos: response[4],
              reviews: response[5],
              similar: response[6],
              mediaType: "tv",
            },
            previouslyViewed: [
              [...this.state.previouslyViewed[0], response[0].data.id],
              [...this.state.previouslyViewed[1], "tv"],
            ],
            viewMore: "closed",
            expandLoading: false,
          });
        })
      );
  }

  getPerson = (id) => {
    const requestOne = this.state.axiosInstance.get(`/get_person/${id}`);
    const requestTwo = this.state.axiosInstance.get(
      `/get_person_credits/${id}`
    );
    const requestThree = this.state.axiosInstance.get(
      `/get_person_images/${id}`
    );
    const requestFour = this.state.axiosInstance.get(
      `/get_person_externals/${id}`
    );
    axios.all([requestOne, requestTwo, requestThree, requestFour]).then(
      axios.spread((...response) => {
        this.setState({
          expand: true,
          expandDetails: {
            details: response[0],
            credits: response[1],
            images: response[2],
            externals: response[3],
            mediaType: "person",
          },
          previouslyViewed: [
            [...this.state.previouslyViewed[0], response[0].data.id],
            [...this.state.previouslyViewed[1], "person"],
          ],
          viewMore: "closed",
          expandLoading: false,
        });
      })
    );
  };

  // End - API Requests

  // Start - Expanded Card Functions

  handleBack() {
    const length = this.state.previouslyViewed[0].length;
    const id = this.state.previouslyViewed[0].slice(length - 2, length - 1);
    const mediaType = this.state.previouslyViewed[1].slice(
      length - 2,
      length - 1
    );
    if (length > 1) {
      this.state.previouslyViewed[0].splice(length - 2, 2);
      this.state.previouslyViewed[1].splice(length - 2, 2);
    }
    this.handleExpandRequest(id[0], mediaType[0]);
  }

  handleClose() {
    this.setState({
      expand: false,
      previouslyViewed: [[], []],
    });
  }

  handleViewMore(type) {
    this.setState({
      viewMore: type,
    });
  }

  handleExpandImage(path, event) {
    this.setState({
      expandImage: { expand: event === "open" ? true : false, path: path },
    });
  }

  // End - Expanded Card Functions

  // Start - Watch List Functions

  async handleWatchList(event) {
    if (this.state.authenticated === true) {
      this.state.axiosInstance
        .get(`/get_watch_list/${this.state.userId}`)
        .then((response) => {
          this.setState({
            openWatchList:
              event === "onLoad" ? false : event === "navClick" ? true : false,
            userWatchList: response.data,
            paginatedUserWatchList: response.data.slice(0, 6),
          });
        });
    } else {
      this.setState({ openWatchList: true });
    }
  }

  handlePaginate(num) {
    const indexOfLastResult = num * 6;
    const indexOfFirstResult = indexOfLastResult - 6;
    const currentResult = this.state.userWatchList.slice(
      indexOfFirstResult,
      indexOfLastResult
    );
    this.setState({
      paginatedUserWatchList: currentResult,
    });
  }

  // End - Watch List Functions

  //Start - State Changes

  handleChange(event) {
    const query = event.target.value;
    if (query.length > 0) {
      this.handleSearch(query);
    }
    this.setState({ query, openWatchList: false });
  }

  handleHomeTab(type) {
    this.setState({
      homeTab: type,
    });
  }

  handleNavHomeClick() {
    this.setState({
      query: "",
      openWatchList: false,
    });
  }

  //End - State Changes

  // Start - Login Functions

  handleLogIn(event) {
    Cookies.set(
      "userLoggedIn",
      { nickName: event.nickname, sub: event.sub, picture: event.picture },
      { expires: 7, path: "" }
    );
    this.setState({
      authenticated: true,
      userId: event.sub,
    });
  }

  handleLogOut() {
    Cookies.remove("userLoggedIn");
  }

  // End - Login Functions

  render() {
    const state = this.state;

    function HomeAlerts() {
      const [show, setShow] = useState(true);
      if (show) {
        return (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Retrieval Error</Alert.Heading>
            <p>
              The Website has failed to retrieve some important data, please
              reload and try again.
            </p>
          </Alert>
        );
      }
      return null;
    }

    return (
      <React.Fragment>
        <CSSTransition
          in={state.expand}
          appear={true}
          timeout={1000}
          classNames="fadeBackground"
        >
          <div
            className={
              state.expandImage.expand === true
                ? "expandBackground enlargeImage"
                : state.expand === true
                ? "expandBackground"
                : null
            }
          ></div>
        </CSSTransition>
        <CSSTransition
          in={state.expandImage.expand}
          appear={true}
          timeout={1000}
          classNames="fadeBackground"
        >
          <React.Fragment>
            {this.state.expandImage.expand === true ? (
              <Image
                className="expandImage"
                src={state.expandImage.path}
                fluid
              />
            ) : null}
          </React.Fragment>
        </CSSTransition>
        <CSSTransition
          in={state.expandImage.expand}
          appear={true}
          timeout={1000}
          classNames="fadeBackground"
        >
          <React.Fragment>
            {state.expandImage.expand === true ? (
              <div
                className="imageClose"
                onClick={() => this.handleExpandImage("", "close")}
              >
                Close
              </div>
            ) : null}
          </React.Fragment>
        </CSSTransition>
        <NavBar
          authenticated={state.authenticated}
          handleLogIn={this.handleLogIn.bind(this)}
          handleLogOut={this.handleLogOut.bind(this)}
          handleWatchList={this.handleWatchList.bind(this)}
          handleChange={this.handleChange.bind(this)}
          handleHome={this.handleNavHomeClick.bind(this)}
        />
        {state.failedHomeRetrieve === true ? <HomeAlerts /> : null}
        <Container className="container">
          {state.isLoading === false ? (
            <React.Fragment>
              {state.openWatchList === false && state.query === "" ? (
                <HomeInfo
                  popularMovie={state.popularMovie}
                  popularTV={state.popularTV}
                  popularPerson={state.popularPerson}
                  homeTab={state.homeTab}
                  handleHomeTab={this.handleHomeTab.bind(this)}
                  handleExpand={this.handleExpandRequest.bind(this)}
                />
              ) : (
                <React.Fragment>
                  {state.openWatchList === true ? (
                    <React.Fragment>
                      {state.userWatchList.length > 0 ? (
                        <React.Fragment>
                          <SearchResults
                            details={state.paginatedUserWatchList}
                            handleExpand={this.handleExpandRequest.bind(this)}
                          />
                          <Pagination
                            userWatchList={state.userWatchList}
                            paginate={this.handlePaginate.bind(this)}
                          />
                        </React.Fragment>
                      ) : (
                        <div className="noWatchList">
                          {state.authenticated === true
                            ? "There is currently no items on your watchlist"
                            : "You need to be logged in to use this feature"}
                        </div>
                      )}
                    </React.Fragment>
                  ) : (
                    <SearchResults
                      details={state.resultDetails}
                      handleExpand={this.handleExpandRequest.bind(this)}
                    />
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
            <Spinner
              animation="border"
              variant="light"
              role="status"
              className="loadingWheel"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
        </Container>
        <React.Fragment>
          {state.expandLoading === false ? (
            <CSSTransition
              in={state.expand}
              appear={true}
              timeout={1000}
              classNames="fade"
            >
              <React.Fragment>
                {state.expand === true ? (
                  <ExpandCard
                    key={state.expandDetails.details.data.id}
                    authenticated={state.authenticated}
                    previouslyViewed={state.previouslyViewed}
                    userWatchList={state.userWatchList}
                    userId={state.userId}
                    expandDetails={state.expandDetails}
                    expandLoading={state.expandLoading}
                    viewMore={state.viewMore}
                    handleClose={this.handleClose.bind(this)}
                    handleBack={this.handleBack.bind(this)}
                    handleWatchList={this.handleWatchList.bind(this)}
                    handleViewMore={this.handleViewMore.bind(this)}
                    handleExpandImage={this.handleExpandImage.bind(this)}
                    handleExpand={this.handleExpandRequest.bind(this)}
                  />
                ) : null}
              </React.Fragment>
            </CSSTransition>
          ) : (
            <Spinner
              animation="border"
              variant="light"
              role="status"
              className="loadingWheel"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default selectMovie;
