import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { __getTodos } from "../redux/modules/todosSlice";
import { __getListTodos } from "../redux/modules/todosSlice";
import styled from "styled-components";
import Header from "../components/main/Header";
import "../Font.css";

function List() {
  const param = useParams();

  console.log(param);
  const dispatch = useDispatch();
  const linkStyle = {
    textDecoration: "none",
  };
  const todos = useSelector((state) => state.todos.todos);

  useEffect(() => {
    dispatch(__getListTodos(param.category));
  }, [todos]);

  return (
    <ListLayout>
      <PTitle>{param.category}</PTitle>
      <Header />
      <LeftContainer>
        <StTitle>Working</StTitle>
        <StGridBox>
          {todos?.map((data) => {
            if (data.isDone === false) {
              return (
                <>
                  <LinkBox>
                    <Link to={`/detail/${data.id}`} style={linkStyle}>
                      <ListCard backgroundColor="#bfdfed">
                        <h1 className="title" backgroundColor="#d8d8d1">
                          {data.title}
                        </h1>
                        <h3 className="content" backgroundColor="#f8cef1;">
                          {data.content}
                        </h3>
                      </ListCard>
                    </Link>
                  </LinkBox>
                </>
              );
            }
          })}
        </StGridBox>
      </LeftContainer>

      <RightContainer>
        <StTitle>Done</StTitle>
        <StGridBox>
          {todos?.map((data) => {
            if (data.isDone === true) {
              return (
                <LinkBox>
                  <Link to={`/detail/${data.id}`} style={linkStyle}>
                    <ListCard backgroundColor="#f6cccc">
                      <h1 className="title" backgroundColor="">
                        {data.title}
                      </h1>
                      <h3 className="content" backgroundColor="">
                        {data.content}
                      </h3>
                    </ListCard>
                  </Link>
                </LinkBox>
              );
            }
          })}
        </StGridBox>
      </RightContainer>
    </ListLayout>
  );
}
export default List;

const ListLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  margin: 0;
  position: absolute;
  top: 130px;
`;
const StTitle = styled.h2`
  text-align: center;
  font-family: "Poor Story", cursive;
`;

// const ListHeader = styled.div`
//   width: 100%;
//   height: 20%;
//   display: flex;
// `;

const LeftContainer = styled.div`
  /* display: grid;
  padding: 20px;
  grid-template-columns: repeat(2, 100px);
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 10px; */
  width: 50%;
  height: 100%;
  overflow-y: hidden;
`;

const RightContainer = styled.div`
  /* display: grid;
  padding: 20px;
  grid-template-columns: repeat(2, 10rem);
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 10px; */
  width: 50%;
`;
const StGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const LinkBox = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

const PTitle = styled.p`
  position: absolute;
  left: 45%;
  top: -20px;
  font-size: 30px;
  font-weight: bold;
  color: gray;
  font-family: "Poor Story", cursive;
`;
const ListCard = styled.div`
  /* width: 200px; */
  height: 220px;
  border: 3px solid white;
  border-radius: 10px;
  background-color: ${(props) => props.backgroundColor};
  margin: 10px;

  padding: 10px;

  .title {
    /* width: 160px; */
    height: 40px;
    border: 3px solid white;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: black;
    background-color: ${(props) => props.backgroundColor};
    font-family: "Poor Story", cursive;
  }
  .content {
    /* width: 160px; */
    height: 120px;
    border: 3px solid white;
    border-radius: 10px;
    padding: 5px;
    margin: 10px;
    overflow: scroll;
    background-color: ${(props) => props.backgroundColor};
    font-family: "Poor Story", cursive;
    color: black;
  }
  .content::-webkit-scrollbar {
    display: none;
  }
  .title::-webkit-scrollbar {
    display: none;
  }
  &:hover {
    scale: 1.03;
  }
`;
