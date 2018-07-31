import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Avatar, MenuItem, Menu, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";

const styles = {
  menuItem: {
    width: 100,
    height: 50,
    fontSize: 15
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class HeaderLoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = { menuEl: null };
    this.state = { userMenuEl: null };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUserMenu = this.handleUserMenu.bind(this);
    this.handleUserMenuClose = this.handleUserMenuClose.bind(this);
  }

  handleMenu = event => {
    this.setState({ menuEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ menuEl: null });
  };

  handleUserMenu = event => {
    this.setState({ userMenuEl: event.currentTarget });
  };

  handleUserMenuClose = () => {
    this.setState({ userMenuEl: null });
  };

  render() {
    const { classes } = this.props;
    const openMenu = Boolean(this.state.menuEl);
    const openUserMenu = Boolean(this.state.userMenuEl);
    return (
      <div>
        <IconButton
          className={classes.menuButton}
          onClick={this.handleMenu}
          color="default"
        >
          <MenuIcon />
        </IconButton>

        <Menu
          id="menu-appbar"
          aria-haspopup="menu"
          anchorEl={this.state.menuEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={openMenu}
          onClose={this.handleClose}
        >
          <MenuItem className={classes.menuItem} onClick={this.handleClose}>
            <Link to="/user/home">Home</Link>
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={this.handleClose}>
            <Link to="/user/saved_posts">Saved posts</Link>
          </MenuItem>
          {this.props.influencer && (
            <MenuItem className={classes.menuItem} onClick={this.handleClose}>
              <Link to="/user/posts">My posts</Link>
            </MenuItem>
          )}
        </Menu>

        <IconButton onClick={this.handleUserMenu} color="default">
          <Avatar src={this.props.instagramPhoto} />
        </IconButton>
        <Menu
          id="menu-appbar"
          aria-haspopup="menu"
          anchorEl={this.state.userMenuEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={openUserMenu}
          onClose={this.handleUserMenuClose}
        >
          <MenuItem
            className={classes.menuItem}
            onClick={this.handleUserMenuClose}
          >
            <a href="/auth/logout">Logout</a>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

HeaderLoggedIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HeaderLoggedIn);
