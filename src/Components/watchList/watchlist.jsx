import React, { Component } from "react";
import { CardColumns } from "react-bootstrap";
import SearchResults from "../searchResults";

class WatchList extends Component {
  state = {};

  render() {
    const { userWatchList } = this.props;
    console.log(this.props.userWatchList);
    return (
      <CardColumns>
        {userWatchList.map((list) => (
          <SearchResults
            key={list.id}
            details={list}
            onClick={() => this.props.handleExpand(list)}
          />
        ))}
      </CardColumns>
    );
  }
}

export default WatchList;
