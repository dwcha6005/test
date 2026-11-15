import { useRef, useState } from "react";

/*
  [순서04] 할 일 추가 - TodoEditor

  - 입력값은 이 컴포넌트 안에서만 쓰므로 state를 여기에 둔다. (끌어올릴 필요 없음)
  - 추가할 때는 부모(App)가 내려준 onCreate 함수를 호출한다. (ch05 이벤트는 위로)
  - 빈 값이면 useRef로 입력창에 포커스 (ch06 [순서06])
*/
export default function TodoEditor({ onCreate }) {
  const [content, setContent] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content.trim() === "") {
      inputRef.current.focus();
      return;
    }

    onCreate(content.trim());
    setContent("");
  };

  return (
    <form className="todo-editor" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="새로운 할 일을 입력하세요"
      />
      <button type="submit">추가</button>
    </form>
  );
}
