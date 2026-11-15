import { useState } from "react";

/*
  ch03. 이벤트와 State

  [순서01] 이벤트 연결 (onClick, 함수 전달 vs 호출, 인자 전달, 이벤트 객체)
  [순서02] 일반 변수로는 화면이 바뀌지 않는다
  [순서03] useState 기본
  [순서04] 입력창 다루기 (제어 컴포넌트)
  [순서05] 여러 입력값을 객체 state로 관리
  [순서06] 폼 제출 (onSubmit)
  [순서07] StrictMode와 두 번 실행되는 로그
*/


/*
  [순서01] 이벤트 연결

  - 이벤트 속성은 카멜 표기법 : onClick, onChange, onSubmit, onMouseEnter ...
  - 함수를 "전달"한다. 호출하지 않는다!
      onClick={handleClick}     (O) 클릭할 때 실행
      onClick={handleClick()}   (X) 화면을 그리는 순간 바로 실행됨 (10_event 01과 같은 실수)
  - 인자를 넘기고 싶으면 화살표 함수로 감싼다.
      onClick={() => handleSize("M")}
  - 이벤트 객체는 첫 번째 매개변수로 자동 전달된다. (10_event 02와 같음)
      const handleClick = (e) => { e.target ... }
  - 컴포넌트 안에서만 쓰는 함수는 컴포넌트 함수 "안"에 선언한다.
*/
function Step01() {
  const handleClick = () => {
    alert("버튼 클릭!");
  };

  // 하나의 함수로 여러 버튼 처리 (이벤트 객체 활용)
  const handleButton = (e) => {
    alert(`${e.target.name} 버튼 클릭! (${e.target.innerText})`);
  };

  // 인자를 받는 함수
  const handleSize = (size) => {
    alert(`${size} 사이즈 선택`);
  };

  return (
    <section>
      <h2>[순서01] 이벤트 연결</h2>
      <button onClick={handleClick}>기본</button>
      <button name="A" onClick={handleButton}>
        A버튼
      </button>
      <button name="B" onClick={handleButton}>
        B버튼
      </button>
      <button onClick={() => handleSize("S")}>S</button>
      <button onClick={() => handleSize("M")}>M</button>
      {/* 아래처럼 쓰면 화면이 그려질 때 alert가 바로 실행된다. */}
      {/* <button onClick={handleSize("L")}>L</button> */}
    </section>
  );
}


/*
  [순서02] 일반 변수로는 화면이 바뀌지 않는다

  let count = 0; 을 증가시켜도 화면은 그대로이다.
  - 변수 값은 바뀌지만(콘솔 확인), React는 "다시 그려야 한다"는 사실을 모른다.
  - 순수 JS라면 document.querySelector(...).textContent = count 로 직접 바꿨다.
  → React에서는 State를 사용한다.
*/
function Step02() {
  let count = 0;

  const onIncrease = () => {
    count++;
    console.log("일반 변수 count :", count);
  };

  return (
    <section>
      <h2>[순서02] 일반 변수 (화면이 안 바뀜)</h2>
      <h3>{count}</h3>
      <button onClick={onIncrease}>+</button> (콘솔에서는 증가)
    </section>
  );
}


/*
  [순서03] useState 기본

  const [count, setCount] = useState(0);
          값     값을 바꾸는 함수      초기값

  - count는 const이므로 count++ 처럼 직접 바꿀 수 없다. 반드시 setCount(새 값)
  - setCount로 값이 바뀌면 → 컴포넌트 함수가 다시 실행되고(리렌더링) → 화면이 바뀐다.
  - useState처럼 use로 시작하는 함수를 Hook(훅)이라고 한다.
    훅 : 함수 컴포넌트에서 state 같은 React 기능을 쓸 수 있게 해 주는 함수
  - 훅은 컴포넌트 함수의 "맨 위"에서 호출한다. (if, for 안에서 호출 X)
*/
function Step03() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);

  console.log("Step03 렌더링, count =", count);

  return (
    <section>
      <h2>[순서03] useState</h2>
      <h3>{count}</h3>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(0)}>초기화</button>

      <p>
        전등 : {isOn ? "💡 ON" : "OFF"}{" "}
        <button onClick={() => setIsOn(!isOn)}>스위치</button>
      </p>
    </section>
  );
}


/*
  [순서04] 입력창 다루기 - 제어 컴포넌트 (Controlled Component)

  입력값을 state에 저장하고, 입력창의 value를 state로 지정한다.
    <input value={text} onChange={(e) => setText(e.target.value)} />

  - 입력할 때마다 onChange → setText → 리렌더링 → value={text}로 화면 표시
  - state에 항상 현재 입력값이 있으므로 미리보기, 글자 수, 검사 등을 바로 할 수 있다.
  - value만 쓰고 onChange를 빼면 입력이 안 된다. (React가 값을 고정)
  - React의 onChange는 HTML의 input 이벤트처럼 "입력할 때마다" 실행된다.
*/
function Step04() {
  const [text, setText] = useState("");

  return (
    <section>
      <h2>[순서04] 입력창 (제어 컴포넌트)</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="닉네임" />
      <p>
        미리보기 : <b>{text}</b> ({text.length}자)
      </p>
      <button onClick={() => setText("")}>지우기</button>
    </section>
  );
}


/*
  [순서05] 여러 입력값을 객체 state로 관리

  입력창마다 useState와 onChange 함수를 만들면 코드가 길어진다.
  → 객체 하나로 관리하고, 입력창의 name 속성으로 어떤 값인지 구분한다.

  주의! state 객체를 직접 고치면 안 된다.
    form[e.target.name] = e.target.value;  setForm(form);   (X)
    → 객체의 주소가 같으므로 React가 "바뀌지 않았다"고 판단 → 화면이 안 바뀐다.

  새 객체를 만들어서 전달한다.
    setForm({ ...form, [e.target.name]: e.target.value });   (O)
      ...form               : 기존 값을 모두 복사
      [e.target.name]: 값   : 해당 key만 새 값으로 덮어쓰기 (계산된 속성 이름)
*/
function Step05() {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    birth: "",
    bio: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section>
      <h2>[순서05] 객체 state로 여러 입력 관리</h2>
      <div>
        <input name="name" value={form.name} onChange={handleChange} placeholder="이름" />
      </div>
      <div>
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">성별 선택</option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>
      </div>
      <div>
        <input name="birth" type="date" value={form.birth} onChange={handleChange} />
      </div>
      <div>
        <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="자기소개" />
      </div>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </section>
  );
}


/*
  [순서06] 폼 제출 - onSubmit

  - 버튼의 onClick이 아니라 form의 onSubmit에 연결한다. (Enter로 제출해도 동작)
  - e.preventDefault()로 페이지 새로고침을 막는다. (10_event 04와 같음)
  - 값은 이미 state에 있으므로 따로 읽을 필요가 없다.
*/
function Step06() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id.trim().length < 4) {
      setMessage("아이디는 4자 이상 입력하세요.");
      return;
    }

    setMessage(`${id}님 환영합니다!`);
    setId("");
  };

  return (
    <section>
      <h2>[순서06] 폼 제출</h2>
      <form onSubmit={handleSubmit}>
        <input value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디" />
        <button type="submit">로그인</button>
      </form>
      <p>{message}</p>
    </section>
  );
}


/*
  [순서07] StrictMode와 두 번 실행되는 로그

  - main.jsx의 <StrictMode>는 개발할 때만 컴포넌트를 일부러 두 번 실행한다.
  - 함수 안에서 실수(예: 렌더링 중에 외부 값을 바꾸는 코드)가 있으면 두 번 실행될 때 드러나도록 하기 위함이다.
  - 그래서 Step03의 "렌더링" 로그가 두 번씩 찍힌다. → 정상이므로 StrictMode를 지우지 않는다.
  - npm run build로 만든 배포 버전에서는 한 번만 실행된다.
*/


export default function App() {
  return (
    <div>
      <h1>ch03. 이벤트와 State</h1>
      <Step01 />
      <Step02 />
      <Step03 />
      <Step04 />
      <Step05 />
      <Step06 />
    </div>
  );
}
