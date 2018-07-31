import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import * as actions from "../actions";

import Header from "./header/Header";
import Landing from "./Landing";
import Home from "./Home";
import SavedPosts from "./profile/SavedPosts";
import InfluencerMyPosts from "./profile/InfluencerMyPosts";

class App extends Component {
  componentDidMount() {
    this.props.fetchUserFromInstagram();
    this.props.fetchUserFromDb();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route path="/user/home" component={Home} />
          <Route path="/user/saved_posts" component={SavedPosts} />
          <Route path="/user/posts" component={InfluencerMyPosts} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
