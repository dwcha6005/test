import { useState } from "react";
import Viewer from "./components/Viewer.jsx";
import Controller from "./components/Controller.jsx";
import "./ch05.css";

/*
  ch05 실습 - Simple Counter 확장  (기본 화면 : 실습.jpg)

  < 문제 1. Simple Counter 만들기 > [기초]
  실습.jpg와 같은 화면을 App, Viewer, Controller 세 컴포넌트로 만드시오.
  - count state는 App에만 둔다.
  - Controller의 버튼 6개는 배열과 map으로 만들고, 양수는 "+100"처럼 + 를 붙여 표시한다.

  < 문제 2. 초기화 버튼 > [기초]
  ① Controller에 [초기화] 버튼을 추가하시오.
  ② App에 handleReset 함수를 만들어 props(onReset)로 전달하시오.

  < 문제 3. 범위 제한 > [응용]
  ① count가 0 미만, 1000 초과가 되지 않도록 App의 함수에서 막으시오. (Math.max, Math.min)
  ② Viewer에서 count가 0이면 회색, 1000이면 빨간색으로 표시하시오.

  < 문제 4. 변경 기록 > [응용]
  ① 버튼을 누를 때마다 "+10 → 150" 같은 기록을 history 배열 state에 맨 앞으로 추가하시오. (최대 5개)
  ② 기록을 보여 주는 History 컴포넌트를 새로 만들어 세 번째 section에 표시하시오.
  ③ history state는 어느 컴포넌트에 있어야 하는지, 이유를 주석으로 쓰시오.
*/


// < 문제 2 > Controller에 초기화 버튼 추가
function ControllerWithReset({ onClickButton, onReset }) {
  return (
    <div>
      <Controller onClickButton={onClickButton} />
      <button onClick={onReset} style={{ marginTop: 6 }}>
        초기화
      </button>
    </div>
  );
}

// < 문제 3 ② > 값에 따라 색이 바뀌는 Viewer
function ColorViewer({ count }) {
  let color = "black";
  if (count === 0) color = "gray";
  if (count === 1000) color = "crimson";

  return (
    <div style={{ color }}>
      <Viewer count={count} />
    </div>
  );
}

// < 문제 4 ② >
function History({ history }) {
  if (history.length === 0) {
    return <p>기록이 없습니다.</p>;
  }

  return (
    <ul>
      {history.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}


export default function Practice() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  // < 문제 3 ① > + < 문제 4 ① >
  const handleClick = (value) => {
    const next = Math.min(1000, Math.max(0, count + value));
    const sign = value > 0 ? `+${value}` : value;

    setCount(next);
    setHistory((prev) => [{ id: Date.now() + Math.random(), text: `${sign} → ${next}` }, ...prev].slice(0, 5));
  };

  // < 문제 2 >
  const handleReset = () => {
    setCount(0);
    setHistory((prev) => [{ id: Date.now() + Math.random(), text: "초기화 → 0" }, ...prev].slice(0, 5));
  };

  // < 문제 4 ③ >
  // history는 버튼(Controller)을 누를 때 바뀌고 History 컴포넌트에서 보여 준다.
  // 두 컴포넌트가 함께 쓰는 데이터이므로 공통 부모인 App(Practice)에 둔다.

  return (
    <div className="counter-app">
      <h1>Simple Counter (실습 정답)</h1>
      <section>
        <ColorViewer count={count} />
      </section>
      <section>
        <ControllerWithReset onClickButton={handleClick} onReset={handleReset} />
      </section>
      <section>
        <History history={history} />
      </section>
    </div>
  );
}
