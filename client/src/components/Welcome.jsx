import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif"

export default function Welcome() {

  const [userName, setUserName] = useState("");

  useEffect(
      () => {
        setUserName(
            JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)).username
        );
      }
  );

  return (
      <>
        <Container>
          <img src={Robot} alt="robot"/>
          <h1>Welcome, <span>{userName?userName : 'Guest'}!</span></h1>
          <h3>Hey there! To get started with messaging, please choose a chat</h3>
        </Container>
      </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;

  img {
    height: 20rem;
  }

  span {
    color: #4e0eff;
  }
`;
