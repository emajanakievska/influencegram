import React, { Component } from "react";
import styled from "styled-components";
import RaisedButton from "./buttons/RaisedButton";

const Wrapper = styled.div`
  text-align: center;
  padding: 100px;

  @media (max-width: 767px) {
    padding: 65px 20px;
  }
`;

const Title = styled.h1`
  text-weight: 100;
  font-size: 60px;
  font-family: "Oswald", sans-serif;
  padding: 10px;
  @media (max-width: 767px) {
    font-size: 40px;
  }
`;

const Subtitle = styled.h3``;

class Landing extends Component {
  render() {
    return (
      <Wrapper className="container">
        <Title>Influencegram</Title>
        <Subtitle>
          Take a closer look into the profiles of your local most popular
          instagram bloggers!
        </Subtitle>
        <Subtitle>
          You want to become one? Don't wait, hit 2000 followers and influence!
        </Subtitle>
        <a href="/auth/instagram">
          <RaisedButton marginTop="20px" text="Join us!" />
        </a>
      </Wrapper>
    );
  }
}

export default Landing;
