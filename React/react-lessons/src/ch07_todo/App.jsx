import { useEffect, useRef, useState } from "react";
import TodoHeader from "./components/TodoHeader.jsx";
import TodoEditor from "./components/TodoEditor.jsx";
import TodoList from "./components/TodoList.jsx";
import "./ch07.css";

/*
  ch07. 종합 실습 - 할 일 관리 앱 (리액트 기초 마무리)

  지금까지 배운 것을 하나의 앱으로 합친다.
  - 컴포넌트 분리, props (ch02)
  - 이벤트, state, 폼 (ch03)
  - 배열 state 추가 / 삭제 / 수정 (ch04)
  - state 끌어올리기 (ch05)
  - useEffect, useRef (ch06)

  [순서01] 화면 설계 - 어떤 컴포넌트로 나눌까?
  [순서02] 컴포넌트 만들기                      → components/TodoHeader.jsx
  [순서03] todos state는 어디에 둘까?            → App
  [순서04] 추가 (onCreate)                      → components/TodoEditor.jsx
  [순서05] 목록과 항목                          → components/TodoList.jsx, TodoItem.jsx
  [순서06] 완료 토글, 삭제 (onToggle, onDelete)
  [순서07] 검색과 필터                          → components/TodoList.jsx
  [순서08] localStorage에 저장 (useEffect)      → 11_Form_WebStorage 03 복습


  [순서01] 화면 설계

     App  (todos state, onCreate, onToggle, onDelete)
     ├── TodoHeader   ← remain (남은 개수)
     ├── TodoEditor   ← onCreate
     └── TodoList     ← todos, onToggle, onDelete   (검색어, 필터 state는 TodoList 안에)
         └── TodoItem ← todo, onToggle, onDelete

  [순서03] todos state는 어디에 둘까?
  - TodoHeader(개수), TodoEditor(추가), TodoList(표시)가 모두 todos를 사용한다.
  - 셋의 공통 부모는 App → App에 둔다. (ch05 state 끌어올리기)
*/

const STORAGE_KEY = "react-todos";

const SAMPLE = [
  { id: 1, isDone: false, content: "React 공부하기", date: Date.now() },
  { id: 2, isDone: true, content: "빨래 널기", date: Date.now() },
  { id: 3, isDone: false, content: "노래 연습하기", date: Date.now() },
];

// [순서08] 저장된 값이 있으면 불러오고, 없으면 예시 데이터
function loadTodos() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : SAMPLE;
  } catch {
    return SAMPLE;
  }
}

export default function App() {
  // useState(함수) : 초기값을 계산하는 함수를 넘기면 "처음 한 번만" 실행된다.
  // useState(loadTodos()) 로 쓰면 렌더링할 때마다 localStorage를 읽는다.
  const [todos, setTodos] = useState(loadTodos);

  // 다음 id : 화면에 보여 줄 값이 아니므로 useRef (ch06 [순서07])
  const idRef = useRef(Math.max(0, ...todos.map((t) => t.id)) + 1);

  // [순서04] 추가
  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current,
      isDone: false,
      content,
      date: Date.now(),
    };
    idRef.current += 1;
    setTodos((prev) => [newTodo, ...prev]);
  };

  // [순서06] 완료 토글
  const onToggle = (id) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
  };

  // [순서06] 삭제
  const onDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // [순서08] todos가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const remain = todos.filter((todo) => !todo.isDone).length;

  return (
    <div className="todo-app">
      <TodoHeader remain={remain} />
      <TodoEditor onCreate={onCreate} />
      <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />
    </div>
  );
}
