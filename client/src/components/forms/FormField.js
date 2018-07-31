import React from "react";
import {
  TextField
} from "@material-ui/core";
import PropTypes from "prop-types";
import {
  withStyles
} from "@material-ui/core/styles";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  formLabelRoot: {
    fontSize: 14,
    textTransform: "uppercase",
    fontFamily: "'Playfair Display SC', serif"

  }
});

class FormField extends React.Component {
  render() {
    const {
      classes,
      input,
      label
    } = this.props;
    return ( <
      TextField id = "full-width"
      label = {
        label
      }
      InputLabelProps = {
        {
          FormLabelClasses: {
            root: classes.formLabelRoot
          }
        }
      }
      inputProps = {
        {
          style: {
            fontSize: "16px"
          }
        }
      }
      fullWidth margin = "normal" { ...input
      }
      />
    );
  }
}

FormField.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormField);