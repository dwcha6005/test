import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice.js";
import todoReducer from "./todoSlice.js";
import userReducer from "./userSlice.js";

/*
  [순서02] store 만들기 - configureStore

  store : 앱 전체의 state를 담는 "하나의" 창고
  reducer 객체의 key가 state의 이름이 된다.

     store.getState()
     → { counter: { value: 0 }, todos: [...], users: { list, loading, error } }

  configureStore는 Redux DevTools 연결, 실수 감지 등을 자동으로 설정해 준다.
*/
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
    users: userReducer,
  },
});
