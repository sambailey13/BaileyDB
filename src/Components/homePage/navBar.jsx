import React, { Component } from "react";
import {
  Nav,
  Navbar,
  Form,
  FormControl,
  Image,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";

class NavBar extends Component {
  state = {};

  render() {
    //try and get these to import from the .env at some point - might no be neccesary thou, need to do it because of secruity?
    const domain = "dev-1fffdk8p.eu.auth0.com";
    const clientId = "beMqwRfnCverTEuvY0rKtUtrcPciwxCN";
    const audience = "https://dev-1fffdk8p.eu.auth0.com/api/v2/";
    const { authenticated, handleChange, handleHome } = this.props;
    const getCookie = Cookies.getJSON("userLoggedIn");

    const LoggingButton = () => {
      const { logout, loginWithRedirect } = useAuth0();

      return getCookie !== undefined ? (
        <Nav.Link
          className="nav-end-link"
          onClick={() => {
            logout();
            this.props.handleLogOut();
          }}
        >
          Log Out
        </Nav.Link>
      ) : (
        <Nav.Link onClick={() => loginWithRedirect()}>Log In</Nav.Link>
      );
    };

    const Profile = () => {
      const { user, isAuthenticated } = useAuth0();

      return isAuthenticated === true ? (
        <React.Fragment>
          <OverlayTrigger
            key="UserToolTip"
            placement="bottom"
            overlay={<Tooltip id={`tooltip-bottom`}>{user.nickname}</Tooltip>}
          >
            <Nav.Item
              className="nav-end-link profile"
              onLoad={
                authenticated === false
                  ? () => this.props.handleLogIn(user)
                  : null
              }
            >
              <Image src={user.picture} className="userPicture" roundedCircle />
            </Nav.Item>
          </OverlayTrigger>
          <Nav.Item className="nav-end-link profileText">
            {"Logged in as: " + user.nickname}
          </Nav.Item>
        </React.Fragment>
      ) : getCookie !== undefined ? (
        <React.Fragment>
          <OverlayTrigger
            key="UserToolTip"
            placement="bottom"
            overlay={
              <Tooltip id={`tooltip-bottom`}>{getCookie.nickName}</Tooltip>
            }
          >
            <Nav.Item className="nav-end-link profile">
              <Image
                src={getCookie.picture}
                className="userPicture"
                roundedCircle
              />
            </Nav.Item>
          </OverlayTrigger>
          <Nav.Item className="nav-end-link profileText">
            {"Logged in as: " + getCookie.nickName}
          </Nav.Item>
        </React.Fragment>
      ) : null;
    };

    return (
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri="https://bailey-db.xyz/home"
        audience={audience}
      >
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand onClick={handleHome}>BaileyDB</Navbar.Brand>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={handleChange}
            />
          </Form>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navEnd">
              <Nav.Link
                className="nav-end-link"
                onClick={() => this.props.handleWatchList("navClick")}
              >
                Watch List
              </Nav.Link>
              <Profile />
              <LoggingButton />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Auth0Provider>
    );
  }
}

export default NavBar;

