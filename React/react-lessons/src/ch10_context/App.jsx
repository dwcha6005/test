import { useState } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";
import { TodoProvider, useTodoActions, useTodos } from "./context/TodoContext.jsx";

/*
  ch10. Context API

  [순서01] 문제 : props drilling
  [순서02] createContext                          → context/ThemeContext.jsx
  [순서03] Provider
  [순서04] useContext
  [순서05] Provider 컴포넌트 + 커스텀 훅 패턴     → context/ThemeContext.jsx
  [순서06] 할 일 앱에 적용                        → context/TodoContext.jsx
  [순서07] Context 나누기 (데이터 / 함수)         → context/TodoContext.jsx
  [순서08] 언제 Context를 쓰나?


  [순서01] props drilling

  App(user) → Page(user) → Sidebar(user) → Profile(user)
  - Page와 Sidebar는 user를 쓰지도 않는데 "전달만 하려고" props를 받는다.
  - 단계가 깊어질수록 수정하기 어렵다. (이름 하나 바꾸면 모든 단계 수정)
  → Context : 값을 "공중에 띄워 놓고" 필요한 컴포넌트가 직접 꺼내 쓴다.


  [순서08] 언제 Context를 쓰나?
  - 앱 전체에서 쓰는 값 : 로그인 사용자, 테마, 언어 설정, 장바구니
  - 2~3단계 props 전달은 그냥 props가 더 명확하다. (Context는 "어디서 왔는지" 추적이 어렵다)
  - 값이 자주, 복잡하게 바뀌면 → ch11 useReducer와 함께 쓰거나 ch12 Redux
*/


// ----- [순서01] props drilling 예시 -----
function DrillingApp() {
  const user = { name: "홍길동" };
  return <Page user={user} />;
}
function Page({ user }) {
  return <Sidebar user={user} />; // Page는 user를 안 쓰는데 전달만 한다
}
function Sidebar({ user }) {
  return <Profile user={user} />; // Sidebar도 전달만 한다
}
function Profile({ user }) {
  return <p>props drilling으로 받은 이름 : {user.name}</p>;
}


// ----- [순서04] useContext로 꺼내 쓰기 (중간 컴포넌트는 아무것도 안 받음) -----
function ThemeBox() {
  return (
    <div>
      <ThemeLabel />
      <ThemeButton />
    </div>
  );
}

function ThemeLabel() {
  const { dark } = useTheme();
  return <p>현재 테마 : {dark ? "다크 🌙" : "라이트 ☀️"}</p>;
}

function ThemeButton() {
  const { toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>테마 전환</button>;
}

// 테마에 따라 배경이 바뀌는 영역
function Themed({ children }) {
  const { dark } = useTheme();
  return (
    <div style={{ padding: 16, borderRadius: 8, background: dark ? "#2c2e36" : "#f4f6fb", color: dark ? "#eee" : "#222" }}>
      {children}
    </div>
  );
}


// ----- [순서06] 할 일 앱 : 어떤 컴포넌트도 props를 받지 않는다 -----
function TodoEditor() {
  const { onCreate } = useTodoActions();
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === "") return;
    onCreate(content.trim());
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="할 일" />
      <button type="submit">추가</button>
    </form>
  );
}

function TodoList() {
  const todos = useTodos();
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

function TodoItem({ todo }) {
  const { onToggle, onDelete } = useTodoActions(); // 부모에게 함수를 받지 않고 직접 꺼낸다
  return (
    <li>
      <input type="checkbox" checked={todo.isDone} onChange={() => onToggle(todo.id)} />
      <span style={{ textDecoration: todo.isDone ? "line-through" : "none" }}>{todo.content}</span>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
}

function TodoCount() {
  const todos = useTodos();
  return <p>남은 할 일 : {todos.filter((t) => !t.isDone).length}개</p>;
}


export default function App() {
  return (
    <ThemeProvider>
      <Themed>
        <h1>ch10. Context API</h1>

        <section>
          <h2>[순서01] props drilling</h2>
          <DrillingApp />
        </section>

        <section>
          <h2>[순서02 ~ 05] 테마 Context</h2>
          <ThemeBox />
        </section>

        <section>
          <h2>[순서06] 할 일 앱 + Context</h2>
          <TodoProvider>
            <TodoCount />
            <TodoEditor />
            <TodoList />
          </TodoProvider>
        </section>
      </Themed>
    </ThemeProvider>
  );
}
