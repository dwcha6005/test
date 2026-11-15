/*
  [순서05] 항목 하나 - TodoItem

  - 데이터(todo)와 함수(onToggle, onDelete)를 props로 받는다.
  - 자신의 id를 넣어서 부모의 함수를 호출한다.
*/
export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={todo.isDone ? "todo-item done" : "todo-item"}>
      <input type="checkbox" checked={todo.isDone} onChange={() => onToggle(todo.id)} />
      <span className="content">{todo.content}</span>
      <span className="date">{new Date(todo.date).toLocaleDateString()}</span>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
}
