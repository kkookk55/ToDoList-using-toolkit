import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { __getTodos } from "../redux/modules/todosSlice";
import { __getListTodos } from "../redux/modules/todosSlice";
import styled from "styled-components";

function List() {
  const param = useParams();
  console.log(param);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  console.log(todos);

  useEffect(() => {
    dispatch(__getListTodos(param.category));
  }, []);

  return (
    <ListLayout>
      <LeftContainer>
        <StTitle>Working</StTitle>
        <StGridBox>
          {todos.map((data) => {
            if (data.isDone === false) {
              return (
                <LinkBox to={`detail/${data.id}`}>
                  <ListCard backgroundColor="#EEC0C0">
                    <h1 className="title" backgroundColor="#d8d8d1">
                      {data.title}
                    </h1>
                    <h3 className="content" backgroundColor="#f8cef1;">
                      {data.content}
                    </h3>
                  </ListCard>
                </LinkBox>
              );
            }
          })}
        </StGridBox>
      </LeftContainer>

      <RightContainer>
        <StTitle>Done</StTitle>
        <StGridBox>
          {todos.map((data) => {
            if (data.isDone === true) {
              return (
                <LinkBox>
                  <ListCard backgroundColor="#EEC0C0">
                    <h1 className="title" backgroundColor="">
                      {data.title}
                    </h1>
                    <h3 className="content" backgroundColor="">
                      {data.content}
                    </h3>
                  </ListCard>
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
`;
const StTitle = styled.h2`
  text-align: center;
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
  grid-template-columns: repeat(auto-fit, minmax(40%, auto));
`;

const LinkBox = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

const ListCard = styled.div`
  /* width: 200px; */
  height: 200px;
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
  }
  .content::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
  &:hover {
    scale: 1.03;
  }
`;
