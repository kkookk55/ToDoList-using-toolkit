import React from "react";
import styled from "styled-components";
import Burger from "../SideBar/Burger";
import "../../Font.css";

const Header = () => {
  return (
    <HeaderBox>
      <Burger />
      <StBox>
        <StTitle>
          <StSpan>T</StSpan>TODOLIST
        </StTitle>
      </StBox>
    </HeaderBox>
  );
};

export default Header;

const HeaderBox = styled.div`
  width: 100vw;
  position: fixed;
  background-color: white;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

const StBox = styled.div`
  width: 100vw;
  height: 55px;
  margin-top: 80px;
  background-color: #eec0c0;
  align-items: center;
  display: flex;
`;

const StTitle = styled.h1`
  font-size: 18px;
  color: white;
  padding-left: 20px;
  font-family: "Caveat Brush", cursive;
  letter-spacing: 0.2em;
`;

const StSpan = styled.span`
  font-size: 22px;
  z-index: -1;
`;
