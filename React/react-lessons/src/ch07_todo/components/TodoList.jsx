import { useState } from "react";
import TodoItem from "./TodoItem.jsx";

/*
  [순서05] 목록 - TodoList
  [순서07] 검색과 필터

  - 검색어, 필터는 목록을 "어떻게 보여 줄지"만 정하는 값이다.
    → 이 컴포넌트 안의 state로 충분하다.
  - 걸러진 목록(filtered)은 state로 만들지 않고 렌더링 중에 계산한다. (ch06 [순서08])
*/
export default function TodoList({ todos, onToggle, onDelete }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | done

  const filtered = todos
    .filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()))
    .filter((todo) => {
      if (filter === "active") return !todo.isDone;
      if (filter === "done") return todo.isDone;
      return true;
    });

  return (
    <div className="todo-list">
      <h3>할 일 목록 📃</h3>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="검색어를 입력하세요" />

      <div className="filters">
        {[
          ["all", "전체"],
          ["active", "진행 중"],
          ["done", "완료"],
        ].map(([value, label]) => (
          <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty">할 일이 없습니다.</p>
      ) : (
        <ul>
          {filtered.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}
