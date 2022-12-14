import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios"; // axios import 합니다.
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { __getTodos } from "../redux/modules/todosSlice";
import { __getListTodos } from "../redux/modules/todosSlice";

function List() {
  const param = useParams();
  console.log(param);
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);
  console.log(todos);

  useEffect(() => {
    dispatch(__getListTodos(param.category));
  }, []);
  return (
    <div>
      <h2>Working</h2>

      <div>
        {todos?.map((data) => {
          if (data.isDone === false) {
            return (
              <div>
                <Link to={`/detail/${data.id}`}>자세히</Link>
                {data.title}
                {data.content}
              </div>
            );
          }
        })}
      </div>
      <h2>Done</h2>

      <div>
        {todos?.map((data) => {
          if (data.isDone === true) {
            return (
              <div>
                <Link to={`/detail/${data.id}`}>자세히</Link>
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
