/*
  main.jsx - 앱의 시작 파일

  실행 흐름 : index.html의 <div id="root"> → main.jsx → App 컴포넌트

  [수업 방법]
  아래 import 중에서 "지금 수업하는 챕터" 한 줄만 주석을 풀고 나머지는 주석 처리한다.
  - App.jsx      : 수업 자료 (시연용)
  - Practice.jsx : 실습 문제 정답
*/
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

/* ---------------- 리액트 기초 ---------------- */
// import App from "./ch01_jsx/App.jsx";
// import App from "./ch01_jsx/Practice.jsx";
// import App from "./ch02_props/App.jsx";
// import App from "./ch02_props/Practice.jsx";
import App from "./ch03_state/App.jsx";
// import App from "./ch03_state/Practice.jsx";
// import App from "./ch04_list/App.jsx";
// import App from "./ch04_list/Practice.jsx";
// import App from "./ch05_lifting/App.jsx";
// import App from "./ch05_lifting/Practice.jsx";
// import App from "./ch06_effect/App.jsx";
// import App from "./ch06_effect/Practice.jsx";
// import App from "./ch07_todo/App.jsx";
// import App from "./ch07_todo/Practice.jsx";

/* ---------------- React Router ---------------- */
// import App from "./ch08_router/App.jsx";
// import App from "./ch08_router/Practice.jsx";

/* ---------------- styled-components ---------------- */
// import App from "./ch09_styled/App.jsx";
// import App from "./ch09_styled/Practice.jsx";

/* ---------------- Context API ---------------- */
// import App from "./ch10_context/App.jsx";
// import App from "./ch10_context/Practice.jsx";

/* ---------------- useReducer ---------------- */
// import App from "./ch11_reducer/App.jsx";
// import App from "./ch11_reducer/Practice.jsx";

/* ---------------- Redux Toolkit ---------------- */
// import App from "./ch12_redux/App.jsx";
// import App from "./ch12_redux/Practice.jsx";

createRoot(document.getElementById("root")).render(
  // StrictMode : 개발할 때만 컴포넌트를 일부러 두 번 실행해서 실수를 찾아 준다.
  // console.log가 두 번 찍혀도 정상이다. (지우지 않는다!)
  <StrictMode>
    <App />
  </StrictMode>
);
