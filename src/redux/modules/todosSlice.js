// src/redux/modules/todosSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cooment: [],
  todos: [],
  isLoading: false,
  error: null,
};

export const __addTodo = createAsyncThunk(
  "addTodo",

  async (payload, thunkAPI) => {
    await axios.post("http://localhost:3001/todos", payload);
    return thunkAPI.fulfillWithValue(payload);
  }
);
export const __addComment = createAsyncThunk(
  "addComment",

  async (payload, thunkAPI) => {
    await axios.post("http://localhost:3001/comments", payload);
    return thunkAPI.fulfillWithValue(payload);
  }
);

export const __getTodos = createAsyncThunk(
  "todos/getTodos",
  async (payload, thunkAPI) => {
    // const data는 Promise를 반환
    try {
      const data = await axios.get("http://localhost:3001/todos");

      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getListTodos = createAsyncThunk(
  "todos/getTodosByList",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    // const data는 Promise를 반환
    try {
      const data = await axios.get(
        `http://localhost:3001/todos?category=${payload}`
      );

      console.log("data", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __getTodoById = createAsyncThunk(
  "todos/getTodoById",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    // const data는 Promise를 반환
    try {
      const data = await axios.get(`http://localhost:3001/todos?id=${payload}`);

      console.log("data", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [__getTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getListTodos.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodoById.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__addTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos.push(action.payload);
    },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.comment.push(action.payload);
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
