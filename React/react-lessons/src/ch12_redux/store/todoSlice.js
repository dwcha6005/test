import { createSlice } from "@reduxjs/toolkit";

/*
  [순서06] 할 일 slice

  ch07(useState) → ch10(Context) → ch11(useReducer)에서 만든 할 일 기능이
  Redux에서는 이렇게 된다. 배열을 push, splice로 바로 바꿔도 된다. (Immer)

  prepare : action을 만들 때 payload를 가공하는 곳
  - id, 날짜처럼 "매번 달라지는 값"은 reducer 안이 아니라 여기서 만든다. (reducer는 순수 함수, ch11 [순서04])
*/
let nextId = 3;

const todoSlice = createSlice({
  name: "todos",
  initialState: [
    { id: 1, isDone: false, content: "Redux Toolkit 배우기" },
    { id: 2, isDone: true, content: "useReducer 복습" },
  ],
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.unshift(action.payload);
      },
      prepare: (content) => ({
        payload: { id: nextId++, isDone: false, content },
      }),
    },
    toggleTodo: (state, action) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) todo.isDone = !todo.isDone;
    },
    deleteTodo: (state, action) => {
      const index = state.findIndex((t) => t.id === action.payload);
      if (index !== -1) state.splice(index, 1);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
