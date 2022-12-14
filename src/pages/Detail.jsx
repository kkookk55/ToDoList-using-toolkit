import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios"; // axios import 합니다.
import { Link } from "react-router-dom";
import styled from "styled-components";
import { __addComment, __getTodoById } from "../redux/modules/todosSlice";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { nanoid } from "nanoid";

const StBox = styled.div`
  text-align: center;
  width: 700px;

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
const CommentWriteBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 2px solid red;
  margin-top: 20px;
`;
const StInput = styled.input`
  width: 550px;
  height: 20px;
`;
const CommentBox = styled.div`
  border: 1px solid black;
  width: 558px;
  height: 20px;
`;
const CommentBoxOuter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const ButtonStyle = styled.div``;
function Detail() {
  const [comments, setComments] = useState([]);
  const param = useParams();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  console.log("todos", todos);
  const fetchTodos = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/comments?todoId=${param.id}`
    );
    setComments(data);
    console.log("comments", comments);
  };

  useEffect(() => {
    dispatch(__getTodoById(param.id));
    fetchTodos();
  }, []);
  const [content, setContent] = useState("");
  const comment = {
    id: nanoid(),
    todoId: param.id,
    content: content,
  };
  function writeCommentHandler() {
    alert("작성완료");
    dispatch(__addComment(comment));
    setContent("");
  }
  const commentDeleteHandler = (commentId) => {
    alert("댓글삭제완료");
    axios.delete(`http://localhost:3001/comments/${commentId}`);
  };
  const onClickDeleteButtonHandler = (todoId) => {
    axios.delete(`http://localhost:3001/todos/${todoId}`);
  };
  const onClickEditButtonHandler = (todoId, edit) => {
    alert("변경완료");
    axios.patch(`http://localhost:3001/todos/${todoId}`, edit);
  };

  return (
    <StBox>
      {todos.map((item) => {
        if (item.isDone === false) {
          return (
            <div>
              <TitleBox>{item.title} //진행중 </TitleBox>
              <CategoryBox>
                카테고리 로고 / {item.category} /{/* {item.createAt} */}
              </CategoryBox>

              <ContentBox>{item.content}</ContentBox>
              <ButtonBox>
                <ButtonStyle>
                  <Link to={`/list/${item.category}`}>
                    <button
                      type="button"
                      onClick={() =>
                        onClickEditButtonHandler(item.id, {
                          isDone: !item.isDone,
                        })
                      }
                    >
                      완료하기
                    </button>
                  </Link>
                </ButtonStyle>
                <ButtonStyle></ButtonStyle>
                <ButtonStyle>
                  <Link to={`/list/${item.category}`}>
                    <button>돌아가기</button>
                  </Link>
                </ButtonStyle>
                <ButtonStyle>
                  <Link to={`/modify/${item.id}`}>
                    <button>수정하기</button>
                  </Link>
                </ButtonStyle>
                <ButtonStyle>
                  <Link to={`/list/${item.category}`}>
                    <button
                      type="button"
                      onClick={() => onClickDeleteButtonHandler(item.id)}
                    >
                      삭제하기
                    </button>
                  </Link>
                </ButtonStyle>
              </ButtonBox>
              <CommentWriteBox>
                <StInput
                  type="text"
                  value={content}
                  placeholder="comment"
                  onChange={(event) => {
                    setContent(event.target.value);
                    console.log(comment);
                  }}
                />

                <button
                  type="button"
                  onClick={() => {
                    writeCommentHandler();
                  }}
                >
                  작성
                </button>
              </CommentWriteBox>
              {comments.map((comment) => {
                return (
                  <CommentBoxOuter>
                    <CommentBox>{comment.content}</CommentBox>
                    <button
                      type="button"
                      onClick={() => {
                        commentDeleteHandler(comment.id);
                      }}
                    >
                      삭제
                    </button>
                  </CommentBoxOuter>
                );
              })}
            </div>
          );
        } else if (item.isDone === true) {
          return (
            <div>
              <TitleBox>{item.title} //완료한일 </TitleBox>
              <CategoryBox>
                카테고리 로고 / {item.category} /{/* {item.createAt} */}
              </CategoryBox>

              <ContentBox>{item.content}</ContentBox>
              <ButtonBox>
                <ButtonStyle>
                  <Link to={`/list/${item.category}`}>
                    <button
                      type="button"
                      onClick={() =>
                        onClickEditButtonHandler(item.id, {
                          isDone: !item.isDone,
                        })
                      }
                    >
                      취소하기
                    </button>
                  </Link>
                </ButtonStyle>
                <ButtonStyle></ButtonStyle>
                <ButtonStyle>
                  <Link to={`/list/${item.category}`}>
                    <button>돌아가기</button>
                  </Link>
                </ButtonStyle>
                <ButtonStyle></ButtonStyle>
                <ButtonStyle>
                  <Link to={`/list/${item.category}`}>
                    <button
                      type="button"
                      onClick={() => onClickDeleteButtonHandler(item.id)}
                    >
                      삭제하기
                    </button>
                  </Link>
                </ButtonStyle>
              </ButtonBox>
              <CommentWriteBox>
                <StInput
                  type="text"
                  value={content}
                  placeholder="comment"
                  onChange={(event) => {
                    setContent(event.target.value);
                    console.log(comment);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    writeCommentHandler();
                  }}
                >
                  작성
                </button>
              </CommentWriteBox>
              {comments.map((comment) => {
                return (
                  <CommentBoxOuter>
                    <CommentBox>{comment.content}</CommentBox>
                    <button
                      type="button"
                      onClick={() => {
                        commentDeleteHandler(comment.id);
                      }}
                    >
                      삭제
                    </button>
                  </CommentBoxOuter>
                );
              })}
            </div>
          );
        }
      })}
    </StBox>
  );
}
export default Detail;
