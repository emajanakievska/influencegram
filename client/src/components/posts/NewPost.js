import React from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography
} from '@material-ui/core';
import RaisedButton from '../buttons/RaisedButton';
import {hideAddNewPostComponent} from '../../actions';
import NewPostForm from '../forms/NewPostForm';
import NewPostFormReview from '../forms/NewPostFormReview';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  title: {
    fontSize: 20,
    fontFamily: "'Playfair Display SC', serif"
  },
  dialog: {
    minWidth: 350
  }
});

class NewPost extends React.Component {
  state = {showFormReview: false};

  renderForm() {
    {
      if (this.state.showFormReview === true) {
        return (
          <NewPostFormReview
            onCancel={() => this.setState({showFormReview: false})}
            afterPost={() => this.props.hideAddNewPostComponent()}
          />
        );
      }
      return (
        <NewPostForm
          onPostSubmit={() => this.setState({showFormReview: true})}
        />
      );
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <Dialog open={this.props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <Typography component="p" className={classes.title}>
            Add new post
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          {this.renderForm()}
        </DialogContent>
        <RaisedButton
          onClick={() => {
            this.props.hideAddNewPostComponent();
          }}
          text="Cancel"
        />
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    showHideNewPost: state.showHideNewPost,
    posts: state.posts // FIXME: Why?
  };
}

NewPost.propTypes = {
  classes: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'newPostForm'
})(
  connect(
    mapStateToProps,
    {
      hideAddNewPostComponent
    }
  )(withStyles(styles)(NewPost))
);
