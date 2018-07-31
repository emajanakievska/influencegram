import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background: ${props =>
    props.backgroundColor ? props.backgroundColor : "#eeeeeec4"};
  color: rgba(0, 0, 0, 0.87);
  box-sizing: border-box;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  border: 0;
  -webkit-tap-highlight-color: transparent;
  padding: 8px 16px;
  font-size: 13px;
  text-transform: uppercase;
  min-width: 100px;
  min-height: 36px;
  line-height: 1.4em;
  justify-content: center;
  vertical-align: middle;
  margin-right: ${props => (props.marginRight ? props.marginRight : "")};
  margin-top: ${props => (props.marginTop ? props.marginTop : "")};
  float: ${props => (props.float ? props.float : "inherit")};

  &:hover {
    background: ${props => (props.hoverColor ? props.hoverColor : "#e0e0e0")};
  }
`;

const RaisedButton = props => {
  return (
    <StyledButton
      backgroundColor={props.backgroundColor}
      hoverColor={props.hoverColor}
      marginTop={props.marginTop}
      marginRight={props.marginRight}
      float={props.float}
      type={props.setType}
      onClick={props.onClick && props.onClick.bind(this)}
    >
      {props.text}
    </StyledButton>
  );
};

export default RaisedButton;
