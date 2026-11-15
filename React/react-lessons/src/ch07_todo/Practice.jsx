import { useEffect, useRef, useState } from "react";
import TodoHeader from "./components/TodoHeader.jsx";
import TodoEditor from "./components/TodoEditor.jsx";
import "./ch07.css";

/*
  ch07 실습 - 할 일 앱 기능 추가하기

  수업에서 만든 할 일 앱(App.jsx)에 아래 기능을 추가하시오.

  < 문제 1. 내용 수정 > [응용]
  ① 할 일 내용을 더블클릭하면 입력창으로 바뀌고, Enter를 누르면 수정되게 하시오.
  ② Esc를 누르면 수정을 취소하시오.
  ③ App에 onUpdate(id, content) 함수를 만들어 내려 주시오. (map 사용)

  < 문제 2. 중요 표시 > [응용]
  ① 각 항목에 ☆ 버튼을 만들어 누르면 isImportant를 토글하시오.
  ② 중요한 할 일은 목록의 맨 위에 오도록 정렬해서 표시하시오.
     힌트) [...todos].sort(...) - 원본 배열을 직접 정렬(sort)하면 안 된다. (state 직접 수정)

  < 문제 3. 전체 완료 / 완료 항목 삭제 > [응용]
  ① [전체 완료] 버튼 : 모든 할 일의 isDone을 true로 (이미 모두 완료면 모두 false로)
  ② [완료 항목 삭제] 버튼 : isDone이 true인 항목을 모두 삭제
  ③ 완료 항목이 없으면 [완료 항목 삭제] 버튼을 비활성화하시오.

  < 문제 4. 진행률 > [심화]
  ① 헤더 아래에 "진행률 60% (3 / 5)"와 진행률 막대를 표시하시오.
  ② 할 일이 하나도 없으면 "할 일을 추가해 보세요."를 표시하시오.
  ③ 진행률은 state로 만들지 말고 todos로 계산하시오. 이유를 주석으로 쓰시오.

  ※ 정답은 수업용 데이터와 섞이지 않도록 localStorage key를 "react-todos-practice"로 사용한다.
*/

const STORAGE_KEY = "react-todos-practice";

function loadTodos() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) return saved;
  } catch {
    // 저장된 값이 잘못된 형식이면 예시 데이터 사용
  }
  return [
    { id: 1, isDone: false, isImportant: false, content: "React 복습", date: Date.now() },
    { id: 2, isDone: true, isImportant: false, content: "장보기", date: Date.now() },
    { id: 3, isDone: false, isImportant: true, content: "과제 제출", date: Date.now() },
  ];
}


// < 문제 1, 2 > 수정과 중요 표시가 가능한 항목
function EditableItem({ todo, onToggle, onDelete, onUpdate, onImportant }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.content);

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return; // 한글 조합 중 Enter 무시 (10_event 02)

    if (e.key === "Enter" && text.trim() !== "") {
      onUpdate(todo.id, text.trim());
      setEditing(false);
    }
    if (e.key === "Escape") {
      setText(todo.content);
      setEditing(false);
    }
  };

  return (
    <li className={todo.isDone ? "todo-item done" : "todo-item"}>
      <input type="checkbox" checked={todo.isDone} onChange={() => onToggle(todo.id)} />
      <button onClick={() => onImportant(todo.id)} title="중요 표시">
        {todo.isImportant ? "★" : "☆"}
      </button>
      {editing ? (
        <input autoFocus value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown} />
      ) : (
        <span className="content" onDoubleClick={() => setEditing(true)}>
          {todo.content}
        </span>
      )}
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
}


export default function Practice() {
  const [todos, setTodos] = useState(loadTodos);
  const idRef = useRef(Math.max(0, ...todos.map((t) => t.id)) + 1);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const onCreate = (content) => {
    const newTodo = { id: idRef.current, isDone: false, isImportant: false, content, date: Date.now() };
    idRef.current += 1;
    setTodos((prev) => [newTodo, ...prev]);
  };

  const onToggle = (id) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t)));

  const onDelete = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));

  // < 문제 1 >
  const onUpdate = (id, content) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, content } : t)));

  // < 문제 2 >
  const onImportant = (id) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, isImportant: !t.isImportant } : t)));

  const sorted = [...todos].sort((a, b) => Number(b.isImportant) - Number(a.isImportant));

  // < 문제 3 >
  const allDone = todos.length > 0 && todos.every((t) => t.isDone);
  const doneCount = todos.filter((t) => t.isDone).length;

  const toggleAll = () => setTodos((prev) => prev.map((t) => ({ ...t, isDone: !allDone })));
  const deleteDone = () => setTodos((prev) => prev.filter((t) => !t.isDone));

  // < 문제 4 >
  // 진행률은 todos만 있으면 언제든 계산할 수 있으므로 state로 따로 만들지 않는다.
  // state로 만들면 todos가 바뀔 때마다 진행률도 따로 맞춰 줘야 해서 값이 어긋날 위험이 생긴다.
  const percent = todos.length === 0 ? 0 : Math.round((doneCount / todos.length) * 100);

  return (
    <div className="todo-app">
      <TodoHeader remain={todos.length - doneCount} />

      {todos.length === 0 ? (
        <p>할 일을 추가해 보세요.</p>
      ) : (
        <div>
          진행률 {percent}% ({doneCount} / {todos.length})
          <div style={{ height: 8, background: "#eee", borderRadius: 4 }}>
            <div style={{ width: `${percent}%`, height: "100%", background: "royalblue", borderRadius: 4 }} />
          </div>
        </div>
      )}

      <TodoEditor onCreate={onCreate} />

      <div style={{ marginBottom: 8 }}>
        <button onClick={toggleAll} disabled={todos.length === 0}>
          {allDone ? "전체 완료 해제" : "전체 완료"}
        </button>
        <button onClick={deleteDone} disabled={doneCount === 0}>
          완료 항목 삭제
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {sorted.map((todo) => (
          <EditableItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onImportant={onImportant}
          />
        ))}
      </ul>
    </div>
  );
}
