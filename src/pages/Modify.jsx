import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios"; // axios import 합니다.
import { Link } from "react-router-dom";
import styled from "styled-components";

const StBox = styled.div`
  text-align: center;
  width: 700px;

  margin: auto;
`;
const TitleBox = styled.div`
  text-shadow: 2px 2px 2px gray;
  color: #ebbead;
  font-size: 30px;
  font-weight: bold;
  padding-bottom: 30px;
`;
const CategoryBox = styled.div`
  text-align: left;
  padding: 20px;
  color: #ffeded;
  border-radius: 13px;
  background-color: #efcdcd;
`;
const ContentBox = styled.div`
  margin-top: 20px;
  border: 2px solid #e2d8ca;
  border-radius: 10px;
  min-height: 270px;
  max-height: 270px;
`;
const ButtonBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

  margin-top: 20px;
`;

const StInput = styled.input`
  margin-top: 20px;
  border: 2px solid #e2d8ca;
  border-radius: 10px;
  width: 700px;
  min-height: 270px;
  max-height: 270px;
`;

const ButtonStyle = styled.div``;
function Modify() {
  const [content, setContent] = useState("");
  const [item, setItem] = useState({});
  const param = useParams();
  const fetchTodos = async () => {
    const todoId = param.id;
    const { data } = await axios.get(`http://localhost:3001/todos/${todoId}`);
    setItem(data);
  };
  const onClickEditButtonHandler = (todoId, edit) => {
    alert("수정이 완료 되었습니다.");
    axios.patch(`http://localhost:3001/todos/${todoId}`, { content: content });
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <StBox>
      <TitleBox>{item.title} </TitleBox>
      <CategoryBox>
        카테고리 로고 / {item.category} /{/* {item.createAt} */}
      </CategoryBox>

      <StInput
        type="text"
        placeholder="content"
        onChange={(ev) => {
          setContent(ev.target.value);
        }}
      />

      <ButtonBox>
        <ButtonStyle>
          <Link to={`/detail/${item.id}`}>
            <button>수정취소</button>
          </Link>
        </ButtonStyle>
        <ButtonStyle></ButtonStyle>
        <ButtonStyle>
          <Link to={`/list/${item.category}`}>
            <button>리스트로 돌아가기</button>
          </Link>
        </ButtonStyle>
        <ButtonStyle>
          <Link to={`/detail/${item.id}`}>
            <button
              type="button"
              onClick={() => onClickEditButtonHandler(item.id, content)}
            >
              재작성하기
            </button>
          </Link>
        </ButtonStyle>
        <ButtonStyle>
          <Link to={`/list/${item.category}`}>
            <button>삭제하기</button>
          </Link>
        </ButtonStyle>
      </ButtonBox>
    </StBox>
  );
}

export default Modify;
