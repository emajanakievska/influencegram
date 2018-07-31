import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  Chip,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import { saveNewPost, removeSavedPost, removeDbPost } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";

const styles = theme => ({
  card: {
    maxWidth: 400,
    marginTop: 20,
    backgroundColor: "#fff0"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  description: {
    fontSize: 16,
    fontFamily: "'Amiri', serif"
  },
  title: {
    fontSize: 18,
    fontFamily: "'Playfair Display SC', serif"
  },
  bigAvatar: {
    width: 60,
    height: 60
  },
  chip: {
    marginTop: 5,
    fontSize: "14px",
    fontFamily: "'Amiri', serif",
    backgroundColor: "white",
    border: "2px solid #f50057",
    minWidth: 60
  }
});

class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {}, saved: false, saves: this.props.data.saves };
  }

  async componentDidMount() {
    const { data } = this.props;
    const res = await fetch(`/api/get_user_data/${data._user}`);
    const dataFetched = await res.json();
    this.setState({ user: dataFetched });
    this.handleSavedColor();
  }

  renderImage() {
    const { image } = this.props.data;

    let base64String = btoa(
      String.fromCharCode(...new Uint8Array(image.data.data))
    );

    return `data:image/${image.contentType};base64,${base64String}`;
  }

  handleDelete = () => {
    const {
      data: { _id },
      history
    } = this.props;

    this.props.removeDbPost(_id, history);
  };

  handleSavedClick = () => {
    const { _id } = this.props.data;

    this.setState({ saved: !this.state.saved });
    if (!this.state.saved) {
      this.setState({ saves: this.state.saves + 1 });
      this.props.saveNewPost(this.props.userFromDbById._id, _id);
    } else {
      this.setState({ saves: this.state.saves - 1 });
      this.props.removeSavedPost(this.props.userFromDbById._id, _id);
    }
  };

  handleSavedColor = () => {
    const { _id } = this.props.data;
    const { savedPosts } = this.props.userFromDbById;

    return savedPosts.map(postId => {
      if (postId === _id) {
        this.setState({ saved: true });
      }
    });
  };

  render() {
    const { classes, data } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            classes={{ title: classes.title }}
            avatar={
              <Avatar
                className={classes.bigAvatar}
                src={this.state.user.instagramProfilePicture}
              />
            }
            title={this.state.user.instagramUsername}
            subheader={moment(data.date)
              .startOf("minute")
              .fromNow(new Date())}
          />
          <CardMedia
            className={classes.media}
            image={this.renderImage()}
            title="Title"
          />
          <CardContent>
            <Typography component="p" className={classes.description}>
              {data.description}
            </Typography>
            {data.tags &&
              data.tags.map(tag => (
                <Chip key={tag} label={tag} className={classes.chip} />
              ))}
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              aria-label="Add to favorites"
              color={this.state.saved ? "secondary" : "default"}
              onClick={() => this.handleSavedClick()}
            >
              <FavoriteIcon />
            </IconButton>
            {this.state.saves > 0 ? (
              <IconButton color={"secondary"}>
                {this.state.saves}
                <FavoriteBorderIcon />
              </IconButton>
            ) : (
              ""
            )}

            {this.props.deleteIcon && (
              <IconButton
                aria-label="Delete"
                onClick={() => this.handleDelete()}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </CardActions>
        </Card>
      </div>
    );
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ savePost, userFromDbById }) {
  return { savePost, userFromDbById };
}

export default connect(
  mapStateToProps,
  {
    saveNewPost,
    removeSavedPost,
    removeDbPost
  }
)(withRouter(withStyles(styles)(PostCard)));
