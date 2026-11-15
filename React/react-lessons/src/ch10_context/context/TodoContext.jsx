import { createContext, useContext, useEffect, useRef, useState } from "react";

/*
  [순서06] ch07 할 일 앱을 Context로 바꾸기

  ch07에서는 App → TodoList → TodoItem 으로 onToggle, onDelete를 계속 props로 넘겼다.
  이제 todos와 함수들을 TodoContext에 넣고, 필요한 컴포넌트에서 바로 꺼내 쓴다.

  [순서07] Context 나누기
  - 데이터(todos)와 함수(onCreate, onToggle, onDelete)를 다른 Context로 나눈다.
  - 이유 : Context 값이 바뀌면 그 Context를 쓰는 컴포넌트가 모두 다시 렌더링된다.
           TodoEditor는 onCreate만 필요한데, 같은 Context에 todos가 있으면 todos가 바뀔 때마다 다시 그려진다.
  - 수업에서는 "나눌 수 있다"는 것만 알고 넘어간다. (성능 최적화는 useMemo, useCallback과 함께 다룸)
*/
const TodoStateContext = createContext(null);
const TodoDispatchContext = createContext(null);

const STORAGE_KEY = "react-todos-context";

function loadTodos() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) return saved;
  } catch {
    // 잘못된 값이면 예시 데이터
  }
  return [
    { id: 1, isDone: false, content: "Context API 배우기" },
    { id: 2, isDone: false, content: "props drilling 없애기" },
  ];
}

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(loadTodos);
  const idRef = useRef(Math.max(0, ...todos.map((t) => t.id)) + 1);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const onCreate = (content) => {
    const id = idRef.current++;
    setTodos((prev) => [{ id, isDone: false, content }, ...prev]);
  };
  const onToggle = (id) => setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t)));
  const onDelete = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));

  return (
    <TodoStateContext value={todos}>
      <TodoDispatchContext value={{ onCreate, onToggle, onDelete }}>{children}</TodoDispatchContext>
    </TodoStateContext>
  );
}

export function useTodos() {
  const context = useContext(TodoStateContext);
  if (!context) throw new Error("useTodos는 TodoProvider 안에서 사용하세요.");
  return context;
}

export function useTodoActions() {
  const context = useContext(TodoDispatchContext);
  if (!context) throw new Error("useTodoActions는 TodoProvider 안에서 사용하세요.");
  return context;
}
