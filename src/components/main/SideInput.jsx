
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { nanoid } from "nanoid";
import '../../Font.css'

import { useDispatch, useSelector } from "react-redux/es/exports";
import { __getTodosByIsDone } from "../../redux/modules/todosSlice";

    
    const SideBar = () => {
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
  }, []);

  return (
    <>
      <TitleBox>
        <StTitle>What to do</StTitle>
      </TitleBox>
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
          <TitleBox><StTitle>Category</StTitle></TitleBox>
        
          <BtnBox>
          {btns.map((btn) =>
            btn.value === category ? (
              <Stbutton
                className="selected"
                onClick={selectHandler}
                value={btn.value}
              >
                {btn.name}
              </Stbutton>
            ) : (
              <Stbutton1 className="" onClick={selectHandler} value={btn.value}>
                {btn.name}
              </Stbutton1>
            )
          )}
        </BtnBox>
        
        <AddBtnBox>
          <StAddbutton>추가하기</StAddbutton>
        </AddBtnBox>
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
  width: 230px;
  height: 37px;
  margin-bottom: 8px;
  background-color: #edcfcfb4;
  border: none;
  border-radius: 20px;
  padding-left: 10px;
`;
const TitleBox = styled.div`
  /* font-size: / 14px; */
  
  width: 230px;
`;

const StTitle = styled.h3`
  font-size: 14px;
  text-align: left;
  padding-left: 10px;
  
`;

const Stbutton = styled.button`
  
  border: 3px solid #ac5151b4;
  background-color: #d97a7ab4;
  border-radius: 10px; 
  font-size:12px`;
  

const Stbutton1 = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px; 
  background-color: #edcfcf86;`


  const BtnBox = styled.div`
  display: flex;
  width: 230px;
  justify-content:space-evenly;
  margin-top: 10px;
  `

const AddBtnBox= styled.div`
  width: 230px;
  
`
 
const StAddbutton = styled.button `
  width:100px;
  height: 30px;
    
  background-color: red;
  margin: 50px auto;
  display: block;

`