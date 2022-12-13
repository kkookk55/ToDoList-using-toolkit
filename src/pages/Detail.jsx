import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios"; // axios import 합니다.
import { Link } from "react-router-dom";
import styled from "styled-components";

const StBox = styled.div`
  text-align: center;
  width: 700px;
  height: 500px;
  border: 1px solid red;
  margin: auto;
`;
const TitleBox = styled.div`
  font-size: 30px;
  font-weight: bold;
  padding-bottom: 30px;
`;
const CategoryBox = styled.div`
  text-align: left;
  padding: 20px;
  border: 1px solid black;
`;
const ContentBox = styled.div`
  border: 2px solid green;
  border-radius: 10px;
  min-height: 270px;
  max-height: 270px;
`;
const ButtonBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  border: 2px solid blue;
  margin-top: 20px;
`;
const ButtonStyle = styled.div``;
function Detail() {
  const [todos, setTodos] = useState([]);
  const param = useParams();
  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:3001/todos");
    setTodos(data);
  };
  useEffect(() => {
    // effect 구문에 생성한 함수를 넣어 실행합니다.
    fetchTodos();
  }, []);
  console.log(param);
  return (
    <StBox>
      {todos.map((item) => {
        if (item.id === param.id) {
          return (
            <div>
              제목:{item.title} // 내용:{item.content}
            </div>
          );
        }
      })}
      <TitleBox>체지방량 감소하기 </TitleBox>
      <CategoryBox>카테고리 로고 / 카테고리 값 / 마감까지남은일수/</CategoryBox>
      <ContentBox>내용/</ContentBox>
      <ButtonBox>
        <ButtonStyle>
          <button>완료</button>
        </ButtonStyle>
        <ButtonStyle></ButtonStyle>
        <ButtonStyle>
          <button>돌아가기</button>
        </ButtonStyle>
        <ButtonStyle>
          <button>수정하기</button>
        </ButtonStyle>
        <ButtonStyle>
          <button>삭제하기</button>
        </ButtonStyle>
      </ButtonBox>
    </StBox>
  );
}
export default Detail;
