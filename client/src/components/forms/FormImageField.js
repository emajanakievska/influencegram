import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { FormLabel } from "@material-ui/core";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 6px 0px 15px;
`;

const styles = theme => ({
  label: {
    fontSize: 14,
    top: 0,
    left: 0,
    padding: "33px 0px 0px"
  },
  error: {
    fontSize: 14,
    color: "#f50057d"
  }
});

class FormImageField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: ""
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const {
      input,
      label,
      classes,
      meta: { touched, error }
    } = this.props;

    const { imagePreviewUrl } = this.state;
    let imagePreview = null;

    if (imagePreviewUrl) {
      imagePreview = (
        <div>
          <img
            style={{ width: "100%", height: "100%", paddingBottom: "10px" }}
            src={imagePreviewUrl}
            alt="preview"
          />
        </div>
      );
    }
    return (
      <div>
        <FormLabel className={classes.label}>{label}</FormLabel>
        <div>
          <StyledInput
            {...input}
            value={undefined}
            type="file"
            onChange={this.handleImageChange}
          />
          <FormLabel className={classes.error}>{touched && error}</FormLabel>
        </div>
        {imagePreview}
      </div>
    );
  }
}

FormImageField.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormImageField);
