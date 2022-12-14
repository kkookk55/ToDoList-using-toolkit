import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios"; // axios import 합니다.
import { useSelector } from "react-redux";

function List() {
  const todosStore = useSelector((state) => state.todos);
  console.log(todosStore);
  const [todos, setTodos] = useState([]);

  // axios를 통해서 get 요청을 하는 함수를 생성합니다.
  // 비동기처리를 해야하므로 async/await 구문을 통해서 처리합니다.
  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:3001/todos");
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
      <h2>Working</h2>

      <div>
        {todos.map((data) => {
          if (data.isDone === false) {
            return (
              // <div>
                <Link to={`/details/${data.id}`}>
                  {data.title}
                  {data.content}
                </Link>
              // </div>
            );
          }
        })}
      </div>
      <h2>Done</h2>

      <div>
        {todos.map((data) => {
          if (data.isDone !== false) {
            return (
              <div>
                <Link to={`/details/${data.id}`}>자세히</Link>
                {data.title}
                {data.content}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
export default List;
