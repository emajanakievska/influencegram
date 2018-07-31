import React from 'react';
import styled from 'styled-components';

const StyledFabButton = styled.button`
  border-radius: 50%;
  border: 0;
  -webkit-tap-highlight-color: transparent;
  right: 24px;
  bottom: 16px;
  position: fixed;
  width: 60px;
  height: 60px;
  margin: auto;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  background: #eeeeeec4;

  &:hover {
    background: #e0e0e0;
  }
`;

const FabButton = props => {
  return (
    <StyledFabButton onClick={props.handleClick.bind(this)}>
      <i className="material-icons">add</i>
    </StyledFabButton>
  );
};

export default FabButton;
