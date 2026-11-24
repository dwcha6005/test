import { useState } from "react";
import Viewer from "./components/Viewer.jsx";
import Controller from "./components/Controller.jsx";
import "./ch05.css";

/*
  ch05. State 끌어올리기 (Lifting State Up) - Simple Counter

  [순서01] 형제 컴포넌트는 서로의 state를 볼 수 없다
  [순서02] state를 공통 부모로 끌어올리기
  [순서03] Simple Counter 완성 (App + Viewer + Controller)  → 실습.jpg 화면
  [순서04] 정리 : 데이터는 아래로, 이벤트는 위로
*/


/*
  [순서01] 형제 컴포넌트는 서로의 state를 볼 수 없다

  아래 BadController 안에 count state가 있다.
  BadViewer는 형제 컴포넌트라서 그 값을 받을 방법이 없다.
  → props는 "부모 → 자식"으로만 전달된다. (ch02 [순서07])
*/
function BadController() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+1</button> (Controller 안의 count : {count})
    </div>
  );
}

function BadViewer() {
  return <p>Viewer : count를 알 수 없음 → 항상 ???</p>;
}

function Separate() { // [순서01]
  return (
    <section>
      <h2>[순서01] 형제끼리는 state를 공유할 수 없다</h2>
      <BadViewer />
      <BadController />
    </section>
  );
}


/*
  [순서02] state를 공통 부모로 끌어올리기

  해결 방법
  1) state를 두 컴포넌트의 "공통 부모"로 옮긴다.          (여기서는 App)
  2) 값이 필요한 자식에게는 state를 props로 내려준다.       Viewer count={count}
  3) 값을 바꿔야 하는 자식에게는 함수를 props로 내려준다.   Controller onClickButton={handleClick}
  4) 자식은 받은 함수를 호출해서 부모의 state 변경을 "요청"한다.

        App (count, handleClick)
        ├── Viewer       ← count
        └── Controller   ← handleClick
*/


/*
  [순서03] Simple Counter 완성  (실습.jpg 참고)

  - App        : count state와 변경 함수를 가진다.
  - Viewer     : count를 받아 표시만 한다.          → components/Viewer.jsx
  - Controller : 버튼을 누르면 받은 함수를 호출한다.  → components/Controller.jsx

  [참고] 부모(App)의 state가 바뀌면 App이 다시 렌더링되고,
         자식(Viewer, Controller)도 함께 다시 렌더링된다.
         (Controller는 값이 바뀌지 않아도 다시 그려진다. 성능 최적화는 React.memo 등으로 나중에)
*/
function Counter() { // [순서03]
  const [count, setCount] = useState(0);

  const handleClick = (value) => {
    setCount((prev) => prev + value); // ch04 [순서07] 함수형 업데이트
  };

  return (
    <div className="counter-app">
      <h1>Simple Counter</h1>
      <section>
        <Viewer count={count} />
      </section>
      <section>
        <Controller onClickButton={handleClick} />
      </section>
    </div>
  );
}


/*
  [순서04] 정리

  - 여러 컴포넌트가 같은 데이터를 써야 하면 → 가장 가까운 공통 부모로 state를 끌어올린다.
  - 데이터(state)는 props로 아래로, 이벤트(변경 요청)는 함수 호출로 위로
  - 끌어올리다 보면 아주 위쪽까지 올라가고, 중간 컴포넌트들이 props를 계속 전달만 하게 된다.
    → 이 문제(props drilling)는 ch10 Context API에서 해결한다.
*/


export default function App() {
  return (
    <div>
      <h1 style={{ fontSize: 22 }}>ch05. State 끌어올리기</h1>
      <Separate />
      <h2 style={{ fontSize: 17 }}>[순서02] ~ [순서03] Simple Counter</h2>
      <Counter />
    </div>
  );
}
