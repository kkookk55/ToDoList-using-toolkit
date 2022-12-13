import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { nanoid } from "@reduxjs/toolkit";

const SideBar = () => {
  const [category, setCategory] = useState("workout");
  const [title, setTitle] = useState(""); //추가
  const [content, setContent] = useState(""); //추가
  const [todos, setTodos] = useState(null);

  //추가
  const todo = {
    id: nanoid(),
    title: title,
    content: content,
    categoty: category,
    isDone: false,
  };
  //post
  // const [todo, setTodo] = useState({
  //   id: 0, // nanoId
  //   title: "",
  //   content: "",
  //   category,
  //   isDone: false,
  // });

  // const selectHandler = async (event) => {
  //   event.preventDefault();
  //   await axios.post("http://localhost:3001/todos", todo);
  //   setCategory(event.target.value);
  //   console.log(category);
  //   setTodos(category);
  // };
  const selectHandler = async (event) => {
    event.preventDefault();
    setCategory(event.target.value);
    console.log("todo:", todo);
    console.log("category:", category);
    //console.log(category)
  };

  const btns = [
    { value: "workout", name: "운동" },
    { value: "daily", name: "일상" },
    { value: "study", name: "공부" },
  ];

  //get
  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:3001/todos");
    setTodos(data); // 서버로부터 fetching한 데이터를 useState의 state로 set.
  };

  //post(submit)
  const onSubmitHandler = async (todo) => {
    await axios.post("http://localhost:3001/todos", todo);
    setTodos([...todos, todo]);
    // console.log(todo);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // console.log(todos);
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
              // const { value } = ev.target;
              // setTodo({
              //   ...todo,
              //   title: value,
              // });
              setTitle(ev.target.value);
            }}
          />
          <StInput
            type="text"
            placeholder="content"
            onChange={(ev) => {
              // const { value } = ev.target;
              // setTodo({
              //   ...todo,
              //   content: value,
              // });
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
