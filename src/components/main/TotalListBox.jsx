import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { __getTodosByIsDone } from "../../redux/modules/todosSlice";

const TotalListBox = () => {
  const dispatch = useDispatch();
  const [todos, setTodos] = useState(null);
  const [category, setCategory] = useState("workout");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const todoStore = useSelector((state) => state.todos.todos);
  console.log("todostore", todoStore);

  const workouts = todoStore.filter((todo) => {
    if (todo.category === "workout") {
      return todo;
    }
  });
  const dailys = todoStore.filter((todo) => {
    if (todo.category === "daily") {
      return todo;
    }
  });
  const studys = todoStore.filter((todo) => {
    if (todo.category === "study") {
      return todo;
    }
  });

  console.log(workouts);
  console.log(dailys);
  console.log(studys);

  const todo = {
    id: nanoid(),
    title: title,
    content: content,
    category: category,
    isDone: false,
  };
  const selectHandler = async (event) => {
    event.preventDefault();
    setCategory(event.target.value);
  };
  const btns = [
    { value: "workout", name: "운동" },
    { value: "daily", name: "일상" },
    { value: "study", name: "공부" },
  ];
  const fetchTodos = () => {
    dispatch(__getTodosByIsDone());
  };

  const onSubmitHandler = async (todo) => {
    await axios.post("http://localhost:3001/todos", todo);
    // setTodos([...todos, todo]);
  };
  useEffect(() => {
    fetchTodos();
  }, [todoStore]);

  return (
    <>
      <TotalBox>
        <ListBox>
          <StLink to={`/list/workout`}>운동</StLink>

          {workouts?.map((data) => {
            return (
              <EachList>
                <DetailLink to={`/detail/${data.id}`}>
                  <StText>{data.title}</StText>
                </DetailLink>
              </EachList>
            );
          })}
        </ListBox>
        <ListBox>
          <StLink to={`/list/daily`}>일상</StLink>
          {dailys?.map((data) => {
            return (
              <EachList>
                <DetailLink to={`/detail/${data.id}`}>
                  <StText>{data.title}</StText>
                </DetailLink>
              </EachList>
            );
          })}
        </ListBox>
        <ListBox>
          <StLink to={`/list/study`}>공부</StLink>
          {studys?.map((data) => {
            return (
              <EachList>
                <DetailLink to={`/detail/${data.id}`}>
                  <StText>{data.title}</StText>
                </DetailLink>
              </EachList>
            );
          })}
        </ListBox>
      </TotalBox>
    </>
  );
};
export default TotalListBox;

const DetailLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const TotalBox = styled.div`
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(3, minmax(20%, auto));
  column-gap: 50px;
  margin: 40px;
`;

const ListBox = styled.div`
  padding: 20px 0;
  border: 1px solid #9898986a;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  cursor: pointer;
`;

const StLink = styled(Link)`
  font-family: "Gamja Flower", cursive;
  font-size: 18px;
  text-decoration: none;
  padding-left: 20px;
  color: black;
`;

const EachList = styled.div`
  list-style: square;
  padding: 8px 0px;

  &:nth-child(2n) {
    background-color: #e7e7e73e;
  }
`;

const StText = styled.li`
  padding: 0 30px;
  list-decoration: square;
  font-family: "Poor Story", cursive;
  font-size: 16px;
  &:hover {
    scale: 1.05;
  }
`;
