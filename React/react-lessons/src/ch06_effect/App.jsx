import { useEffect, useRef, useState } from "react";

/*
  ch06. useEffect와 useRef

  [순서01] useEffect 기본 - 렌더링 "후"에 실행되는 코드
  [순서02] 의존성 배열 - 언제 다시 실행할지 정하기
  [순서03] 정리(cleanup) 함수 - 타이머 정리, 화면에서 사라질 때
  [순서04] 서버 데이터 불러오기 - fetch + 로딩 / 에러 (13_fetch 연결)
  [순서05] 값이 바뀔 때마다 다시 요청하기 + 늦게 온 응답 무시
  [순서06] useRef - DOM 요소 접근 (포커스)
  [순서07] useRef - 렌더링과 상관없는 값 저장
  [순서08] useEffect가 필요 없는 경우

  ※ 인터넷 연결 필요 (JSONPlaceholder)
*/

const API = "https://jsonplaceholder.typicode.com";


/*
  [순서01] useEffect 기본

  useEffect(() => {
    // 화면이 그려진 "후"에 실행할 코드
  }, [의존성 배열]);

  컴포넌트 함수는 "화면에 무엇을 그릴지 계산"하는 곳이다.
  그 밖의 작업(서버 요청, 타이머, document.title 변경 등)을 "부수 효과(side effect)"라고 하며
  useEffect 안에서 처리한다.
*/
function Step01() {
  const [count, setCount] = useState(0);

  console.log("[Step01] 1. 렌더링 중 (화면 그리기 전)");

  useEffect(() => {
    console.log("[Step01] 2. useEffect 실행 (화면 그린 후)");
    document.title = `클릭 ${count}회`;
  });

  return (
    <section>
      <h2>[순서01] useEffect 기본</h2>
      <button onClick={() => setCount(count + 1)}>클릭 {count}</button>
      <span> (브라우저 탭 제목이 바뀐다)</span>
    </section>
  );
}


/*
  [순서02] 의존성 배열

  useEffect(fn)            : 매 렌더링마다 실행
  useEffect(fn, [])        : 처음 화면에 나타날 때(마운트) 한 번만 실행
  useEffect(fn, [a, b])    : 처음 + a 또는 b가 바뀔 때마다 실행

  effect 안에서 사용하는 state, props는 의존성 배열에 넣는다.
*/
function Step02() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => setLogs((prev) => [...prev.slice(-5), msg]);

  useEffect(() => {
    addLog("[] → 처음 한 번만");
  }, []);

  useEffect(() => {
    addLog(`[count] → count가 ${count}(으)로 바뀜`);
  }, [count]);

  useEffect(() => {
    if (text !== "") addLog(`[text] → text가 "${text}"(으)로 바뀜`);
  }, [text]);

  return (
    <section>
      <h2>[순서02] 의존성 배열</h2>
      <button onClick={() => setCount(count + 1)}>count + 1</button>{" "}
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="text 입력" />
      <ol>
        {logs.map((log, i) => (
          <li key={i}>{log}</li>
        ))}
      </ol>
    </section>
  );
}


/*
  [순서03] 정리(cleanup) 함수

  useEffect(() => {
    const id = setInterval(...);
    return () => clearInterval(id);   ← 정리 함수
  }, []);

  정리 함수가 실행되는 때
  - 컴포넌트가 화면에서 사라질 때(언마운트)
  - 의존성 값이 바뀌어 effect가 다시 실행되기 직전

  정리하지 않으면 컴포넌트가 사라져도 타이머가 계속 돌아간다. (12_async 01의 clearInterval과 같은 이유)
*/
function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    console.log("[Clock] 타이머 시작");
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      console.log("[Clock] 타이머 정리");
      clearInterval(id);
    };
  }, []);

  return <p style={{ fontSize: 22, fontWeight: "bold" }}>{time}</p>;
}

function Step03() {
  const [show, setShow] = useState(true);

  return (
    <section>
      <h2>[순서03] 정리 함수</h2>
      <button onClick={() => setShow(!show)}>{show ? "시계 숨기기" : "시계 보이기"}</button>
      {show && <Clock />}
    </section>
  );
}


/*
  [순서04] 서버 데이터 불러오기 (13_fetch + 12_async 03의 3가지 상태)

  - 처음 화면에 나타날 때 한 번 불러온다. → 의존성 배열 []
  - useEffect의 함수 자체에는 async를 붙일 수 없다.
    → 안에서 async 함수를 만들고 바로 호출한다.
  - 로딩 / 성공 / 에러 상태를 각각 state로 관리한다.
*/
function Step04() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(API + "/users");
        if (!response.ok) {
          throw new Error(`요청 실패 (${response.status})`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h2>[순서04] 데이터 불러오기</h2>
      {loading && <p>불러오는 중...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </section>
  );
}


/*
  [순서05] 값이 바뀔 때마다 다시 요청 + 늦게 온 응답 무시

  - userId가 바뀔 때마다 게시글을 다시 불러온다. → [userId]
  - 회원을 빠르게 바꾸면 이전 요청의 응답이 늦게 와서 화면을 덮어쓸 수 있다. (12_async 03 [순서7])
    → 정리 함수에서 ignore = true 로 표시하고, 응답이 왔을 때 ignore면 무시한다.
*/
function Step05() {
  const [userId, setUserId] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadPosts() {
      setLoading(true);
      const response = await fetch(`${API}/posts?userId=${userId}&_limit=3`);
      const data = await response.json();

      if (!ignore) {
        setPosts(data);
        setLoading(false);
      }
    }

    loadPosts();

    return () => {
      ignore = true; // 다음 요청이 시작되면 이전 요청의 결과는 무시
    };
  }, [userId]);

  return (
    <section>
      <h2>[순서05] 의존성이 바뀌면 다시 요청</h2>
      <select value={userId} onChange={(e) => setUserId(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((id) => (
          <option key={id} value={id}>
            {id}번 회원
          </option>
        ))}
      </select>
      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}


/*
  [순서06] useRef - DOM 요소 접근

  const inputRef = useRef(null);
  <input ref={inputRef} />
  inputRef.current  → 실제 input DOM 요소 (document.querySelector로 찾은 것과 같음)

  React에서는 대부분 state로 화면을 바꾸지만,
  포커스 주기, 스크롤 이동처럼 "DOM을 직접 다뤄야 하는 일"에 ref를 사용한다.

  ※ 기존 자료 주의
    value={text}로 state가 관리하는 입력창을 inputRef.current.value = "" 로 직접 비우면 안 된다.
    화면만 비워지고 text state에는 이전 값이 남아 있어서, 다음 입력 때 이전 내용이 다시 나타난다.
    → 입력창 비우기는 setText("") 로 한다.
*/
function Step06() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      inputRef.current.focus(); // 비어 있으면 입력창으로 커서 이동
      return;
    }

    setList([...list, text]);
    setText(""); // 입력창 비우기는 state로!
    inputRef.current.focus(); // 다음 입력을 위해 포커스 유지
  };

  return (
    <section>
      <h2>[순서06] useRef - 포커스</h2>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} placeholder="입력 후 Enter" />
        <button type="submit">추가</button>
      </form>
      <p>{list.join(", ")}</p>
    </section>
  );
}


/*
  [순서07] useRef - 렌더링과 상관없는 값 저장

  ref.current 값은
  - 바꿔도 화면이 다시 그려지지 않는다. (state와 차이)
  - 다시 렌더링되어도 값이 유지된다. (일반 변수와 차이)

  종류         값이 바뀌면 다시 렌더링?   렌더링 후 값 유지?
  ------------------------------------------------------------
  일반 변수    X                          X (매번 초기화)
  state        O                          O
  ref          X                          O

  사용 예 : 타이머 id 저장, 이전 값 기억, 화면에 보여 줄 필요 없는 횟수 세기
*/
function Step07() {
  const [count, setCount] = useState(0);
  const clickRef = useRef(0);
  let normal = 0;

  const handleRef = () => {
    clickRef.current += 1;
    normal += 1;
    console.log(`ref : ${clickRef.current} / 일반 변수 : ${normal}`);
  };

  return (
    <section>
      <h2>[순서07] useRef - 값 저장</h2>
      <button onClick={handleRef}>ref 증가 (화면 그대로, 콘솔 확인)</button>
      <button onClick={() => setCount(count + 1)}>state 증가 (다시 렌더링)</button>
      <p>
        state : {count} / ref : {clickRef.current}
      </p>
      <p style={{ color: "gray" }}>ref를 여러 번 누른 뒤 state 버튼을 누르면 ref 값이 그때 화면에 반영된다.</p>
    </section>
  );
}


/*
  [순서08] useEffect가 필요 없는 경우

  state로 "계산할 수 있는 값"은 effect로 따로 저장하지 않고 렌더링 중에 바로 계산한다.

  (X) const [fullName, setFullName] = useState("");
      useEffect(() => { setFullName(first + " " + last); }, [first, last]);

  (O) const fullName = first + " " + last;

  effect는 "React 바깥"과 연결할 때(서버, 타이머, 브라우저 API) 사용한다.
*/


export default function App() {
  return (
    <div>
      <h1>ch06. useEffect와 useRef</h1>
      <Step01 />
      <Step02 />
      <Step03 />
      <Step04 />
      <Step05 />
      <Step06 />
      <Step07 />
    </div>
  );
}
