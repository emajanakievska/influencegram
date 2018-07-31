import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAllPostsFromDb} from '../actions';
import PostCard from './posts/PostCard';
import {GridList, GridListTile, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper
    backgroundImage: 'url(../dots.jpg)',
    paddingTop: 50
  },
  gridList: {
    width: 500,
    height: '100%'
  },
  text: {
    color: 'white'
  }
});

class Home extends Component {
  componentDidMount() {
    this.props.fetchAllPostsFromDb();
  }

  renderPosts() {
    const {allPosts} = this.props;
    return allPosts.reverse().map(post => (
      <GridListTile key={post._id} cols={2} rows={1}>
        <PostCard key={post._id} data={post} />
      </GridListTile>
    ));
  }

  render() {
    const {classes, allPosts} = this.props;
    return (
      <div className={classes.root}>
        <GridList cellHeight={500} className={classes.gridList}>
          {allPosts && allPosts.length !== 0 ? (
            this.renderPosts()
          ) : (
            <GridListTile cols={2} rows={2}>
              <Typography className={classes.text} variant="display2">
                No posts to display
              </Typography>
            </GridListTile>
          )}
        </GridList>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({posts: {allPosts}}) {
  return {
    allPosts
  };
}

export default connect(
  mapStateToProps,
  {
    fetchAllPostsFromDb
  }
)(withStyles(styles)(Home));
