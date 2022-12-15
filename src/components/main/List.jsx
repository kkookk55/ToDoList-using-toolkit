import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios"; // axios import 합니다.
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "./Header";

function List() {
  const todosStore = useSelector((state) => state.todos);
  console.log(todosStore);
  const [todos, setTodos] = useState([]);

  // axios를 통해서 get 요청을 하는 함수를 생성합니다.
  // 비동기처리를 해야하므로 async/await 구문을 통해서 처리합니다.
  const fetchTodos = async () => {
    const { data } = await axios.get(
      "http://localhost:3001/todos?category=study&isDone=true"
    );
    setTodos(data); // 서버로부터 fetching한 데이터를 useState의 state로 set 합니다.
  };

  // 생성한 함수를 컴포넌트가 mount 됐을 떄 실행하기 위해 useEffect를 사용합니다.
  useEffect(() => {
    // effect 구문에 생성한 함수를 넣어 실행합니다.
    fetchTodos();
  }, []);
  // data fetching이 정상적으로 되었는지 콘솔을 통해 확인합니다.
  console.log(todos);
  return (
    <div>
      <Header />
      <div>
        <Link to={`/list/workout`}>운동</Link>
        {todos.map((data) => {
          if (data.category === "workout") {
            return <div>{data.title}</div>;
          }
        })}
      </div>
      <div>
        <Link to={`/list/daily`}>일상</Link>
        {todos.map((data) => {
          if (data.category === "daily") {
            return <div>{data.title}</div>;
          }
        })}
      </div>
      <div>
        <Link to={`/list/study`}>공부</Link>
        {todos.map((data) => {
          if (data.category === "study") {
            return <div>{data.title}</div>;
          }
        })}
      </div>
    </div>
  );
}
export default List;
