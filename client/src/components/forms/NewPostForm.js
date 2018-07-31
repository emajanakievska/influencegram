import React from "react";
import { Field, reduxForm } from "redux-form";
import _ from "lodash";
import RaisedButton from "../buttons/RaisedButton";
import FormField from "./FormField";
import FormImageField from "./FormImageField";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({});

class NewPostForm extends React.Component {
  renderFields() {
    const formFields = [
      { label: "description", name: "description" },
      { label: "tags", name: "tags" }
    ];

    return _.map(formFields, ({ label, name }) => {
      return (
        <div key={name}>
          <Field name={label} component={FormField} type="text" label={label} />
        </div>
      );
    });
  }

  render() {
    const { handleSubmit, classes } = this.props;

    const required = value => (value ? undefined : "Required");

    return (
      <form
        className={classes.form}
        onSubmit={handleSubmit(this.props.onPostSubmit)}
      >
        {this.renderFields()}
        <div>
          <Field
            name="image"
            key="image"
            label="Add image"
            component={FormImageField}
            validation={[required]}
          />
        </div>
        <div>
          <RaisedButton
            setType={"submit"}
            text="Post"
            backgroundColor="#8bc34a"
            hoverColor="#558b2f"
          />
        </div>
      </form>
    );
  }
}

NewPostForm.propTypes = {
  classes: PropTypes.object.isRequired
};

function validate(values) {
  const errors = {};
  if (values["image"] === undefined || values["image"].length === 0) {
    errors["image"] = `Please add an image`;
  }
  return errors;
}

export default reduxForm({
  validate,
  form: "newPostForm",
  destroyOnUnmount: false
})(withStyles(styles)(NewPostForm));
