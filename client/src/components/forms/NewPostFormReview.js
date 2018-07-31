import React from "react";
import { addNewPost } from "../../actions";
import { connect } from "react-redux";
import RaisedButton from "../buttons/RaisedButton";
import PropTypes from "prop-types";
import _ from "lodash";
import { List, ListItem, ListItemText, withStyles } from "@material-ui/core";
import { withRouter, Redirect } from "react-router-dom";

const styles = {
  labelClassPrimary: {
    fontSize: 15,
    textTransform: "uppercase",
    fontFamily: "'Playfair Display SC', serif"
  },
  labelClassSecondary: {
    fontSize: 15,
    fontFamily: "'Amiri', serif"
  },
  review: {
    display: "flex",
    flexWrap: "wrap"
  }
};

class NewPostFormReview extends React.Component {
  handleOnSubmit() {
    const { description, tags, image } = this.props.formValues;
    const { history } = this.props;

    let formData = new FormData();
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("image", image.item(0));

    this.props.addNewPost(formData, history);
    this.props.afterPost();
  }

  renderFormData() {
    const { formValues, classes } = this.props;

    const formFields = [
      { label: "description", name: "description" },
      { label: "tags", name: "tags" },
      { label: "image", name: "image" }
    ];

    return _.map(formFields, ({ label, name }) => {
      return (
        <ListItem key={name}>
          <ListItemText
            classes={{
              primary: classes.labelClassPrimary,
              secondary: classes.labelClassSecondary
            }}
            primary={label}
            secondary={
              name === "image" ? formValues[name][0].name : formValues[name]
            }
          />
        </ListItem>
      );
    });
  }

  render() {
    const { onCancel } = this.props;
    return (
      <div>
        <List>{this.renderFormData()}</List>
        <div>
          <RaisedButton text="Back" onClick={() => onCancel()} float={"left"} />
        </div>
        <RaisedButton
          text="Submit"
          onClick={() => this.handleOnSubmit()}
          backgroundColor="#f50057"
          float={"right"}
        />
      </div>
    );
  }
}

NewPostFormReview.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    formValues: state.form.newPostForm.values
  };
}

export default connect(
  mapStateToProps,
  { addNewPost }
)(withRouter(withStyles(styles)(NewPostFormReview)));
