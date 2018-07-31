import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchUserPostsDb,
  showAddNewPostComponent,
  hideAddNewPostComponent
} from "../../actions";
import PostCard from "../posts/PostCard";
import { GridList, GridListTile, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import NewPost from "../posts/NewPost";
import FabButton from "../buttons/FabButton";
import PropTypes from "prop-types";

const styles = theme => ({
  absolute: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
    backgroundColor: "#eeeeeec4"
  },
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

class InfluencerMyPosts extends Component {
  componentDidMount() {
    this.props.fetchUserPostsDb();
  }

  renderPosts() {
    const { userPosts } = this.props;

    return userPosts.reverse().map(post => (
      <GridListTile key={post._id} cols={2} rows={1}>
        <PostCard key={post._id} data={post} deleteIcon={true} />;
      </GridListTile>
    ));
  }

  render() {
    const { showHideNewPost, classes, userPosts } = this.props;
    return (
      <div className={classes.root}>
        <GridList cellHeight={500} className={classes.gridList}>
          {userPosts && userPosts.length !== 0 ? (
            this.renderPosts()
          ) : (
            <GridListTile cols={2} rows={2}>
              <Typography className={classes.text} variant="display2">
                You have no posts!
              </Typography>
            </GridListTile>
          )}
        </GridList>
        <FabButton
          handleClick={() => {
            this.props.showAddNewPostComponent();
          }}
        />
        {showHideNewPost && <NewPost open={showHideNewPost} />}
      </div>
    );
  }
}

InfluencerMyPosts.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ posts: { userPosts }, showHideNewPost }) {
  return { userPosts, showHideNewPost };
}

export default connect(
  mapStateToProps,
  {
    fetchUserPostsDb,
    showAddNewPostComponent,
    hideAddNewPostComponent
  }
)(withStyles(styles)(InfluencerMyPosts));
