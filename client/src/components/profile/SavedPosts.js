import React from "react";
import { connect } from "react-redux";
import { fetchUserSavedPosts, fetchPostsFromDb } from "../../actions";
import PostCard from "../posts/PostCard";
import { GridList, GridListTile, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundImage: "url(../dots.jpg)",
    paddingTop: 50
  },
  gridList: {
    width: 500,
    height: "100%"
  },
  text: {
    textAlign: "center",
    paddingTop: 200
  }
});

class SavedPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fetchUserPosts: true, fetchPosts: false };
  }

  //CHANGE
  //get saved posts for current user
  handleFetchingUserSavedPosts() {
    const { userInstagram } = this.props;
    this.props.fetchUserSavedPosts(userInstagram._id);
    this.setState({ fetchUserPosts: false, fetchPosts: true });
  }

  //get all info posts for the saved posts
  handleFetchingPosts() {
    const savedPosts = this.props.savedPosts
      ? Array.from(this.props.savedPosts.savedPosts)
      : [];
    if (savedPosts.length !== 0) {
      this.props.fetchPostsFromDb(savedPosts);
      this.setState({ fetchPosts: false });
    }
  }

  renderPosts() {
    const { fetchPostsInfoById } = this.props;

    return fetchPostsInfoById.reverse().map(post => (
      <GridListTile key={post._id} cols={2} rows={1}>
        <PostCard key={post._id} data={post} />
      </GridListTile>
    ));
  }

  render() {
    const { classes, fetchPostsInfoById, userInstagram } = this.props;

    if (this.state.fetchUserPosts && userInstagram) {
      this.handleFetchingUserSavedPosts();
    }

    if (this.state.fetchPosts && !this.state.fetchUserPosts) {
      this.handleFetchingPosts();
    }

    return (
      <div className={classes.root}>
        <GridList cellHeight={500} className={classes.gridList}>
          {fetchPostsInfoById && fetchPostsInfoById.length !== 0 ? (
            this.renderPosts()
          ) : (
            <GridListTile cols={2} rows={2}>
              <Typography className={classes.text} variant="display2">
                You have no saved posts
              </Typography>
            </GridListTile>
          )}
        </GridList>
      </div>
    );
  }
}

SavedPosts.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({
  userInstagram,
  fetchPostsInfoById,
  fetchIdOfUserSavedPosts: { savedPosts }
}) {
  return { userInstagram, fetchPostsInfoById, savedPosts };
}

export default connect(
  mapStateToProps,
  {
    fetchUserSavedPosts,
    fetchPostsFromDb
  }
)(withStyles(styles)(SavedPosts));
