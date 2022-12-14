import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios"; // axios import 합니다.
import { useSelector } from "react-redux";
import styled from "styled-components";

const ListLayout = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
`;

const ListHeader = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
`;

const LeftContainer = styled.div`
  display: grid;
  padding: 20px;
  /* grid-template-columns: repeat(2, 100px); */
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 10px;
  width: 50%;
  border: 3px solid yellow;
`;

const RightContainer = styled.div`
  display: grid;
  padding: 20px;
  grid-template-columns: repeat(2, 10rem);
  /* grid-auto-rows: minmax(100px, auto); */
  grid-gap: 10px;
  width: 50%;
  border: 3px solid yellow;
`;

const ListCard = styled.div`
  width: 200px;
  height: 200px;
  border: 3px solid black;
  margin: 20px;

  .title {
    width: 160px;
    height: 40px;
    border: 3px solid gray;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
  }
  .content {
    width: 160px;
    height: 100px;
    border: 3px solid gray;
    margin: 10px;
    overflow: hidden;
  }
`;

function List() {
  const todosStore = useSelector((state) => state.todos);
  const param = useParams();
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
  console.log(param);
  return (
    <ListLayout>
      <ListHeader>
        <h2>Working</h2>
        <h2>Done</h2>
      </ListHeader>
      <LeftContainer>
        <div>
          {todos.map((data) => {
            if (data.category === param.category) {
              if (data.isDone === false) {
                return (
                  <div to={`detail/${data.id}`}>
                    <ListCard>
                      {/* <Link to={`/detail/${data.id}`}>자세히</Link> */}
                      <h1 className="title">{data.title}</h1>
                      <h3 className="content">{data.content}</h3>
                    </ListCard>
                  </div>
                );
              }
            }
          })}
        </div>
      </LeftContainer>

      <RightContainer>
        <div>
          {todos.map((data) => {
            if (data.category === param.category) {
              if (data.isDone === true) {
                return (
                  <ListCard>
                    <Link to={`/detail/${data.id}`}>자세히</Link>
                    <h1 className="title">{data.title}</h1>
                    <h3 className="content">{data.content}</h3>
                  </ListCard>
                );
              }
            }
          })}
        </div>
      </RightContainer>
    </ListLayout>
  );
}
export default List;
