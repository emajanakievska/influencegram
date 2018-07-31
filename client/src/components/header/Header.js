import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";
import styled from "styled-components";
import RaisedButton from "../buttons/RaisedButton";
import HeaderLoggedIn from "./HeaderLoggedIn";
import PropTypes from "prop-types";

const TitleLogo = styled.div`
  font-family: "Oswald", sans-serif;
  text-align: left;
  color: rgba(0, 0, 0, 0.87);
  font-size: 25px;

  @media (max-width: 767px) {
    font-size: 20px;
  }
`;

const styles = theme => ({
  flex: {
    flex: 1,
    color: "black"
  },
  header: {
    backgroundColor: "white",
    boxShadow:
      "0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
    width: "100%",
    display: "inline-block",
    zIndex: "1100",
    boxSizing: "border-box"
  }
});

class Header extends Component {
  renderContent() {
    switch (this.props.userInstagram) {
      case null:
        return;
      case false:
        return (
          <a href="/auth/instagram">
            <RaisedButton text="Login" />
          </a>
        );
      default:
        return (
          <HeaderLoggedIn
            influencer={this.props.userInstagram.influencer}
            instagramPhoto={
              this.props.userInstagram
                ? this.props.userInstagram.instagramProfilePicture
                : ""
            }
          />
        );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.header} position="fixed">
        <Toolbar>
          <Link
            className={classes.flex}
            to={this.props.userInstagram ? "/user/home" : "/"}
          >
            <TitleLogo>Influencegram</TitleLogo>
          </Link>
          {this.renderContent()}
        </Toolbar>
      </AppBar>
    );
  }
}

function mapStateToProps({ userInstagram }) {
  return { userInstagram };
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Header));
