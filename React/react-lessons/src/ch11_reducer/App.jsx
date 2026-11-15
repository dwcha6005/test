import { useReducer, useRef, useState } from "react";

/*
  ch11. useReducer

  [순서01] useState의 한계 - 상태 변경 코드가 여기저기 흩어진다
  [순서02] useReducer 기본 문법 - 카운터
  [순서03] action에 값 담기 (payload)
  [순서04] reducer 규칙 - 순수 함수, 불변성
  [순서05] 할 일 앱을 useReducer로 바꾸기
  [순서06] useState vs useReducer - 언제 무엇을?


  [순서01] useState의 한계

  ch07 할 일 앱의 App을 다시 보면
  - onCreate, onToggle, onDelete 안에 setTodos(...)가 각각 들어 있다.
  - 기능이 늘어날수록(수정, 전체 완료, 완료 삭제 ...) 컴포넌트 안에 상태 변경 코드가 계속 쌓인다.
  → "상태를 어떻게 바꿀지"를 컴포넌트 밖의 함수 하나(reducer)에 모아 두자.


  [순서02] 기본 문법

  const [state, dispatch] = useReducer(reducer, 초기값);

  - dispatch(action) : "이런 일이 일어났어"라고 알린다. action은 보통 { type: "..." } 객체
  - reducer(state, action) : 현재 state와 action을 받아 "새 state를 return" 하는 함수
  - React가 reducer의 return 값으로 state를 바꾸고 다시 렌더링한다.

     버튼 클릭 → dispatch({ type: "INCREASE" }) → reducer(현재state, action) → 새 state → 화면 갱신

  비유 : dispatch는 "주문서 제출", reducer는 "주문서를 보고 처리하는 주방"
*/

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREASE":
      return state + 1;
    case "DECREASE":
      return state - 1;
    case "RESET":
      return 0;
    // [순서03] action에 담아 온 값 사용
    case "ADD":
      return state + action.payload;
    default:
      // 오타 등으로 모르는 action이 오면 바로 알 수 있게 에러를 던진다.
      throw new Error(`알 수 없는 action : ${action.type}`);
  }
}

function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div>
      <h3>{count}</h3>
      <button onClick={() => dispatch({ type: "DECREASE" })}>-1</button>
      <button onClick={() => dispatch({ type: "INCREASE" })}>+1</button>
      <button onClick={() => dispatch({ type: "ADD", payload: 10 })}>+10</button>
      <button onClick={() => dispatch({ type: "RESET" })}>초기화</button>
    </div>
  );
}


/*
  [순서04] reducer 규칙

  1) 순수 함수 : 같은 state, 같은 action이 들어오면 항상 같은 결과
     - reducer 안에서 fetch, setTimeout, localStorage, Math.random(), Date.now() 를 쓰지 않는다.
     - 이런 값이 필요하면 dispatch 하기 "전에" 만들어서 action에 담아 보낸다. (아래 onCreate의 id, date)
     - StrictMode에서는 reducer도 두 번 실행해 본다. → 순수하지 않으면 버그가 바로 드러난다.

  2) 불변성 : state를 직접 고치지 말고 새 값을 return 한다.
     X  state.push(item); return state;
     O  return [item, ...state];
     (ch04의 배열 업데이트 패턴과 똑같다. 코드 위치만 reducer로 옮겨졌을 뿐)
*/


// [순서05] 할 일 앱 reducer
function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.payload, ...state];
    case "TOGGLE":
      return state.map((todo) => (todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo));
    case "DELETE":
      return state.filter((todo) => todo.id !== action.id);
    case "CLEAR_DONE":
      return state.filter((todo) => !todo.isDone);
    default:
      throw new Error(`알 수 없는 action : ${action.type}`);
  }
}

const initialTodos = [
  { id: 1, isDone: false, content: "useReducer 배우기" },
  { id: 2, isDone: true, content: "useState 복습" },
];

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [content, setContent] = useState(""); // 입력값처럼 단순한 값은 useState 그대로
  const idRef = useRef(3);

  const onCreate = (e) => {
    e.preventDefault();
    if (content.trim() === "") return;
    // id는 reducer 밖에서 만든다 (순수 함수 규칙)
    dispatch({ type: "CREATE", payload: { id: idRef.current++, isDone: false, content: content.trim() } });
    setContent("");
  };

  return (
    <div>
      <form onSubmit={onCreate}>
        <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="할 일" />
        <button type="submit">추가</button>
        <button type="button" onClick={() => dispatch({ type: "CLEAR_DONE" })}>
          완료 항목 삭제
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.isDone} onChange={() => dispatch({ type: "TOGGLE", id: todo.id })} />
            <span style={{ textDecoration: todo.isDone ? "line-through" : "none" }}>{todo.content}</span>
            <button onClick={() => dispatch({ type: "DELETE", id: todo.id })}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


/*
  [순서06] useState vs useReducer

  | 상황                                           | 선택         |
  | 숫자, 문자열, 체크 여부처럼 단순한 값           | useState     |
  | 바꾸는 방법이 2~3가지 이하                      | useState     |
  | 배열/객체 state를 여러 방법(추가, 수정, 삭제 …)으로 바꿈 | useReducer |
  | 여러 state가 함께 바뀜 (loading, data, error)   | useReducer   |
  | 상태 변경 로직을 따로 테스트하고 싶을 때         | useReducer   |

  ※ useReducer + Context = 작은 Redux
     dispatch를 Context로 내려 주면, 깊은 컴포넌트에서도 dispatch({ type }) 한 줄로 상태를 바꿀 수 있다.
     → 이 구조를 라이브러리로 정리한 것이 ch12 Redux
*/

export default function App() {
  return (
    <div>
      <h1>ch11. useReducer</h1>

      <section>
        <h2>[순서02, 03] 카운터</h2>
        <Counter />
      </section>

      <section>
        <h2>[순서05] 할 일 앱</h2>
        <TodoApp />
      </section>
    </div>
  );
}
