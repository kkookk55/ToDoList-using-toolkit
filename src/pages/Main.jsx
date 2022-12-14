import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { __addTodo } from "../redux/modules/todosSlice";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/hooks/useSelector";
const SideBar = () => {
  const todosStore = useSelector((state) => state.todos);
  console.log("투두스토어", todosStore);
  const [category, setCategory] = useState("workout");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState(null);
  const dispatch = useDispatch();

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
    console.log("todo:", todo);
    console.log("category:", category);
    // console.log(category)
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
    dispatch(__addTodo(todo));
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
