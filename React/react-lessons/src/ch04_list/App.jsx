import { useState } from "react";

/*
  ch04. 목록 렌더링과 배열 State

  [순서01] map으로 목록 렌더링
  [순서02] key가 필요한 이유 (index를 key로 쓰면 생기는 문제)
  [순서03] filter로 조건에 맞는 목록만 표시
  [순서04] 배열 state - 추가 (push 대신 전개 연산자)
  [순서05] 배열 state - 삭제 (filter)
  [순서06] 배열 state - 수정 (map)
  [순서07] 함수형 업데이트 setState(prev => ...)
  [순서08] 목록 항목을 컴포넌트로 분리하기
*/


/*
  [순서01] map으로 목록 렌더링

  JSX의 { } 안에는 for문을 쓸 수 없다. → 배열의 map()으로 "JSX 배열"을 만든다.

  fruits.map((fruit) => <li>{fruit}</li>)
  → [<li>사과</li>, <li>배</li>, <li>포도</li>] → 화면에 차례대로 표시

  화살표 함수에서 { } 없이 바로 JSX를 쓰면 자동으로 return 된다.
  여러 줄이면 ( ) 로 감싼다.
*/
function List() { // [순서01]
  const fruits = ["사과", "배", "포도"];
  const users = [
    { id: 1, name: "홍길동", age: 25 },
    { id: 2, name: "김철수", age: 31 },
    { id: 3, name: "이영희", age: 19 },
  ];

  return (
    <section>
      <h2>[순서01] map으로 목록 렌더링</h2>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>

      <table border="1" cellPadding="4">
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}세</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}


/*
  [순서02] key가 필요한 이유

  key : React가 목록의 각 항목을 "구분하는 이름표"
  - 목록이 바뀌었을 때(추가, 삭제, 순서 변경) 어떤 항목이 그대로인지 key로 판단한다.
  - key가 없으면 콘솔에 경고 : Each child in a list should have a unique "key" prop.

  key 규칙
  - 형제끼리 겹치지 않는 고유한 값 (보통 데이터의 id)
  - 배열 index는 항목이 추가/삭제/정렬되지 않는 목록에서만 사용
  - key는 props로 전달되지 않는다. (자식 컴포넌트에서 props.key로 읽을 수 없음)

  아래 예제 : 각 항목의 입력창에 글자를 입력한 뒤 [맨 앞에 추가]를 누른다.
  - index를 key로 쓴 목록 : 입력한 글자가 엉뚱한 항목에 붙어 있다.
  - id를 key로 쓴 목록     : 입력한 글자가 원래 항목에 그대로 있다.
*/
function Key() { // [순서02]
  const [items, setItems] = useState([
    { id: 1, text: "첫 번째" },
    { id: 2, text: "두 번째" },
  ]);
  const [nextId, setNextId] = useState(3);

  const addFirst = () => {
    setItems([{ id: nextId, text: `새 항목 ${nextId}` }, ...items]);
    setNextId(nextId + 1);
  };

  return (
    <section>
      <h2>[순서02] key가 필요한 이유</h2>
      <button onClick={addFirst}>맨 앞에 추가</button>
      <div style={{ display: "flex", gap: 30 }}>
        <div>
          <h4>key = index (문제 발생)</h4>
          {items.map((item, index) => (
            <div key={index}>
              {item.text} <input placeholder="메모" />
            </div>
          ))}
        </div>
        <div>
          <h4>key = id (정상)</h4>
          {items.map((item) => (
            <div key={item.id}>
              {item.text} <input placeholder="메모" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/*
  [순서03] filter로 조건에 맞는 목록만 표시

  배열.filter(조건).map(...) 처럼 이어서 사용한다.
  결과가 없을 때의 화면도 함께 처리한다.
*/
function Filter() { // [순서03]
  const products = [
    { id: 1, name: "무선 이어폰", price: 89000, soldOut: false },
    { id: 2, name: "기계식 키보드", price: 129000, soldOut: true },
    { id: 3, name: "게이밍 마우스", price: 59000, soldOut: false },
  ];
  const [hideSoldOut, setHideSoldOut] = useState(false);

  const shown = hideSoldOut ? products.filter((p) => !p.soldOut) : products;

  return (
    <section>
      <h2>[순서03] filter</h2>
      <label>
        <input type="checkbox" checked={hideSoldOut} onChange={(e) => setHideSoldOut(e.target.checked)} /> 품절 상품
        숨기기
      </label>
      <ul>
        {shown.map((p) => (
          <li key={p.id} style={{ color: p.soldOut ? "#999" : "black" }}>
            {p.name} - {p.price.toLocaleString()}원 {p.soldOut && "(품절)"}
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p>표시할 상품이 없습니다.</p>}
    </section>
  );
}


/*
  [순서04] ~ [순서06] 배열 state 추가 / 삭제 / 수정

  ch03 [순서05] 객체 state와 같은 원리 : 원본을 직접 바꾸지 않고 "새 배열"을 만든다.

  작업    원본을 바꾸는 방법 (X)          새 배열을 만드는 방법 (O)
  ---------------------------------------------------------------------------
  추가    todos.push(new)                 [...todos, new]  /  [new, ...todos]
  삭제    todos.splice(i, 1)              todos.filter((t) => t.id !== id)
  수정    todos[i].done = true            todos.map((t) => t.id === id ? { ...t, done: !t.done } : t)

  push, splice는 배열 주소가 그대로라서 React가 바뀐 것을 알지 못한다.
  → 13_async 이전에 배운 map / filter / 전개 연산자가 여기서 매일 쓰인다.
*/
function Todo() { // [순서04~06]
  const [todos, setTodos] = useState([
    { id: 1, text: "React 복습", done: false },
    { id: 2, text: "점심 먹기", done: true },
  ]);
  const [input, setInput] = useState("");
  const [nextId, setNextId] = useState(3);

  // [순서04] 추가
  const handleAdd = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // todos.push({...}); setTodos(todos);  ← 화면이 바뀌지 않는다!
    setTodos([...todos, { id: nextId, text: input.trim(), done: false }]);
    setNextId(nextId + 1);
    setInput("");
  };

  // [순서05] 삭제
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // [순서06] 수정 (완료 토글)
  const handleToggle = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };

  return (
    <section>
      <h2>[순서04] 추가 / [순서05] 삭제 / [순서06] 수정</h2>
      <form onSubmit={handleAdd}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="할 일" />
        <button type="submit">추가</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.done} onChange={() => handleToggle(todo.id)} />
            <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>{todo.text}</span>{" "}
            <button onClick={() => handleDelete(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
      <p>
        전체 {todos.length}개 / 완료 {todos.filter((t) => t.done).length}개
      </p>
    </section>
  );
}


/*
  [순서07] 함수형 업데이트

  setCount(count + 1)을 한 번에 세 번 호출해도 1만 증가한다.
  - 지금 실행 중인 함수의 count는 "이번 렌더링의 값"으로 고정되어 있기 때문 (0 + 1 을 세 번 예약)

  setCount((prev) => prev + 1)
  - prev : "가장 최신 값"을 React가 넣어 준다. → 세 번 호출하면 3 증가
  - 이전 값을 기준으로 새 값을 만들 때는 함수형 업데이트를 쓰는 것이 안전하다.
    setTodos((prev) => [...prev, newTodo]);
*/
function Update() { // [순서07]
  const [count, setCount] = useState(0);

  const plusThreeWrong = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  const plusThreeRight = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  return (
    <section>
      <h2>[순서07] 함수형 업데이트</h2>
      <h3>{count}</h3>
      <button onClick={plusThreeWrong}>+3 (잘못된 방법)</button>
      <button onClick={plusThreeRight}>+3 (함수형 업데이트)</button>
      <button onClick={() => setCount(0)}>초기화</button>
    </section>
  );
}


/*
  [순서08] 목록 항목을 컴포넌트로 분리하기

  - 항목 하나를 그리는 컴포넌트(ContactItem)를 만들고 데이터를 props로 전달한다.
  - key는 map 안에서 "컴포넌트"에 붙인다.
  - 삭제 함수는 state가 있는 부모에 두고, 자식에게 props로 내려준다. (ch05에서 자세히)
*/
function ContactItem({ contact, onDelete }) {
  return (
    <li>
      {contact.name} ({contact.phone}) <button onClick={() => onDelete(contact.id)}>삭제</button>
    </li>
  );
}

function Contacts() { // [순서08]
  const [contacts, setContacts] = useState([
    { id: 1, name: "홍길동", phone: "010-1111-2222" },
    { id: 2, name: "김철수", phone: "010-3333-4444" },
  ]);

  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <section>
      <h2>[순서08] 항목 컴포넌트 분리</h2>
      <ul>
        {contacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} onDelete={handleDelete} />
        ))}
      </ul>
    </section>
  );
}


export default function App() {
  return (
    <div>
      <h1>ch04. 목록 렌더링과 배열 State</h1>
      <List />
      <Key />
      <Filter />
      <Todo />
      <Update />
      <Contacts />
    </div>
  );
}
