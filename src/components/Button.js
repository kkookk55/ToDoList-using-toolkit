import React, { useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";
import toDo from "../redux/modules/toDo";
import { render } from "@testing-library/react";
import { itIsDone, deleteToDo } from "../redux/modules/toDo";

function Comment() {
  return <div>댓글란</div>;
}

export default Comment;
