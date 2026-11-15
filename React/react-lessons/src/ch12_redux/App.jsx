import { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/index.js";
import { addBy, decrease, increase, reset } from "./store/counterSlice.js";
import { addTodo, deleteTodo, toggleTodo } from "./store/todoSlice.js";
import { fetchUsers } from "./store/userSlice.js";

/*
  ch12. 리덕스(Redux)와 리덕스 툴킷(Redux Toolkit)

  [순서01] Redux란? 핵심 개념, 설치
  [순서02] store 만들기 - configureStore          → store/index.js
  [순서03] slice 만들기 - createSlice             → store/counterSlice.js
  [순서04] Provider, useSelector, useDispatch
  [순서05] payload 전달
  [순서06] 할 일 앱을 Redux로                     → store/todoSlice.js
  [순서07] 비동기 - createAsyncThunk              → store/userSlice.js
  [순서08] Redux DevTools, Context vs Redux


  [순서01] Redux란?

  - 앱의 state를 컴포넌트 밖 "store" 한 곳에 모아 관리하는 라이브러리
  - ch11의 useReducer + Context 구조를 앱 전체 규모로 키운 것이라고 보면 된다.

     컴포넌트 ──dispatch(action)──▶ store(reducer 실행) ──새 state──▶ useSelector로 읽던 컴포넌트 다시 렌더링

  용어
  - store    : state 창고 (앱에 하나)
  - action   : { type: "counter/increase", payload: ... } "무슨 일이 일어났는지"
  - reducer  : (state, action) → 새 state
  - dispatch : action을 store에 보내는 함수

  Redux Toolkit (RTK)
  - 예전 Redux는 action type 상수, action 생성 함수, switch reducer를 각각 직접 만들어야 해서 코드가 길었다.
  - Redux 공식 팀이 만든 RTK가 이것을 createSlice 하나로 줄였다. → 지금은 RTK 사용이 공식 권장 방법이다.
  - 인터넷에서 createStore, switch(action.type)로 된 예전 Redux 코드를 보면 "옛날 방식"이라고 이해하면 된다.

  설치
    npm install @reduxjs/toolkit react-redux
    - @reduxjs/toolkit : Redux 본체 + 편의 기능
    - react-redux      : React 컴포넌트와 store를 연결 (Provider, useSelector, useDispatch)


  [순서04] 연결하기

  1) <Provider store={store}> 로 앱을 감싼다. (보통 main.jsx에서. 이 수업에서는 챕터 전환을 위해 App 안에서 감쌈)
  2) const value = useSelector((state) => state.counter.value);   ← 필요한 값만 골라 읽기
     - 고른 값이 바뀔 때만 다시 렌더링된다.
  3) const dispatch = useDispatch();
     dispatch(increase());                                        ← action 생성 함수를 "호출"해서 보낸다


  [순서08] Context vs Redux

  | Context                          | Redux                                     |
  | 값을 "전달"하는 도구              | 값을 "관리"하는 도구                        |
  | 설치 필요 없음                    | 라이브러리 설치                             |
  | 값이 바뀌면 사용하는 컴포넌트 전부 렌더링 | useSelector로 고른 값이 바뀔 때만 렌더링    |
  | 테마, 로그인 정보처럼 가끔 바뀌는 값 | 장바구니, 게시판 데이터처럼 자주 바뀌고 큰 state |
  | 디버깅 도구 없음                  | Redux DevTools : action 기록, 이전 상태로 되돌리기 |

  Redux DevTools : 크롬 웹 스토어에서 "Redux DevTools" 확장 설치 → 개발자 도구에 Redux 탭이 생긴다.
*/


// ----- [순서04, 05] 카운터 -----
function Counter() {
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>{value}</h3>
      <button onClick={() => dispatch(decrease())}>-1</button>
      <button onClick={() => dispatch(increase())}>+1</button>
      <button onClick={() => dispatch(addBy(10))}>+10</button>
      <button onClick={() => dispatch(reset())}>초기화</button>
    </div>
  );
}

// 다른 컴포넌트에서도 같은 값을 읽는다 (props 없음)
function CounterDisplay() {
  const value = useSelector((state) => state.counter.value);
  return <p>다른 컴포넌트에서 읽은 값 : {value}</p>;
}


// ----- [순서06] 할 일 -----
function TodoApp() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [content, setContent] = useState(""); // 입력값처럼 이 컴포넌트만 쓰는 값은 useState로 충분

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === "") return;
    dispatch(addTodo(content.trim()));
    setContent("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="할 일" />
        <button type="submit">추가</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.isDone} onChange={() => dispatch(toggleTodo(todo.id))} />
            <span style={{ textDecoration: todo.isDone ? "line-through" : "none" }}>{todo.content}</span>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


// ----- [순서07] 비동기 -----
function UserList() {
  const { list, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(fetchUsers())} disabled={loading}>
        사용자 불러오기
      </button>
      {loading && <p>불러오는 중...</p>}
      {error && <p style={{ color: "crimson" }}>에러 : {error}</p>}
      <ul>
        {list.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}


export default function App() {
  return (
    <Provider store={store}>
      <h1>ch12. Redux Toolkit</h1>

      <section>
        <h2>[순서04, 05] 카운터</h2>
        <Counter />
        <CounterDisplay />
      </section>

      <section>
        <h2>[순서06] 할 일</h2>
        <TodoApp />
      </section>

      <section>
        <h2>[순서07] createAsyncThunk</h2>
        <UserList />
      </section>
    </Provider>
  );
}
