import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { __getTodosByIsDone } from "../redux/modules/todosSlice";
const SideBar = () => {
  const dispatch = useDispatch();
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
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        <StBox>
          <StInput
            type="text"
            placeholder="title"
            onChange={(ev) => {
              setTitle(ev.target.value);
            }}
          />
          <StInput
            type="text"
            placeholder="content"
            onChange={(ev) => {
              setContent(ev.target.value);
            }}
          />
        </StBox>
        <StTitle>카테고리</StTitle>
        {/*
        <button className={category === value} onClick={selectHandler} value='workout'>운동</button>
        <button className='' onClick={selectHandler} value='daily'>일상</button>
        <button className='' onClick={selectHandler} value='study'>공부</button>
        */}
        <div>
          {btns.map((btn) =>
            btn.value === category ? (
              <button
                className="selected"
                onClick={selectHandler}
                value={btn.value}
              >
                {btn.name}
              </button>
            ) : (
              <button className="" onClick={selectHandler} value={btn.value}>
                {btn.name}
              </button>
            )
          )}
        </div>
        <button>추가하기</button>
      </form>
      <div>
        <Link to={`/list/workout`}>운동</Link>
        {workouts?.map((data) => {
          return <div>{data.title}</div>;
        })}
        <Link to={`/list/daily`}>일상</Link>
        {dailys?.map((data) => {
          return <div>{data.title}</div>;
        })}
        <Link to={`/list/study`}>공부</Link>
        {studys?.map((data) => {
          return <div>{data.title}</div>;
        })}
      </div>
    </>
  );
};
export default SideBar;
const StBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const StInput = styled.input`
  width: 200px;
  height: 30px;
  margin-bottom: 8px;
`;
const StTitle = styled.h3`
  font-size: 14px;
`;
