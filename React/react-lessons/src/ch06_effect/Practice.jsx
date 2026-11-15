import { useEffect, useRef, useState } from "react";

/*
  ch06 실습 - useEffect와 useRef

  < 문제 1. 페이지 제목 > [기초]
  ① 장바구니 개수 state(cartCount)를 만들고 [담기] 버튼으로 1씩 늘리시오.
  ② cartCount가 바뀔 때마다 브라우저 탭 제목을 "장바구니 (3)" 으로 바꾸시오. (의존성 배열 [cartCount])

  < 문제 2. 자동 포커스 > [기초]
  ① 화면이 처음 나타날 때 검색 입력창에 자동으로 포커스가 가게 하시오. (useRef + useEffect [])

  < 문제 3. 할 일 목록 불러오기 > [응용]
  URL : https://jsonplaceholder.typicode.com/todos?userId=1
  ① 처음 화면에 나타날 때 할 일 목록을 불러와 완료된 항목은 줄긋기로 표시하시오.
  ② 로딩 중에는 "불러오는 중...", 실패하면 에러 메시지와 [다시 시도] 버튼을 표시하시오.
     힌트) reloadKey state를 만들어 의존성 배열에 넣고, [다시 시도]를 누르면 reloadKey를 1 늘린다.

  < 문제 4. 스톱워치 > [응용]
  ① [시작]을 누르면 0.1초마다 시간이 올라가고, [정지]를 누르면 멈추게 하시오.
  ② setInterval의 id는 useRef에 저장하시오. (화면에 보여 줄 값이 아니므로 state가 아니다)
  ③ 스톱워치가 화면에서 사라질 때 타이머가 정리되도록 하시오. ([스톱워치 숨기기] 버튼으로 확인)

  < 문제 5. 검색 디바운스 > [심화]
  URL : https://dummyjson.com/products/search?q=검색어&limit=5&select=title
  ① 입력이 멈추고 0.5초 뒤에만 검색하시오. (useEffect + setTimeout + 정리 함수에서 clearTimeout)
  ② 빈 검색어면 결과를 비우시오.
  ③ 늦게 온 이전 응답은 무시하시오. (ignore 플래그)
*/


// < 문제 1 >
function PageTitle() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    document.title = `장바구니 (${cartCount})`;
  }, [cartCount]);

  return (
    <section>
      <h2>문제 1. 페이지 제목</h2>
      <button onClick={() => setCartCount(cartCount + 1)}>담기</button> {cartCount}개
    </section>
  );
}


// < 문제 2 >
function AutoFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <section>
      <h2>문제 2. 자동 포커스</h2>
      <input ref={inputRef} placeholder="검색어 (자동 포커스)" />
    </section>
  );
}


// < 문제 3 >
function TodoLoader() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos?userId=1");
        if (!res.ok) throw new Error(`요청 실패 (${res.status})`);
        const data = await res.json();
        if (!ignore) setTodos(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  return (
    <section>
      <h2>문제 3. 할 일 불러오기</h2>
      {loading && <p>불러오는 중...</p>}
      {error && (
        <p style={{ color: "crimson" }}>
          {error} <button onClick={() => setReloadKey(reloadKey + 1)}>다시 시도</button>
        </p>
      )}
      {!loading && !error && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}


// < 문제 4 >
function Stopwatch() {
  const [time, setTime] = useState(0); // 0.1초 단위
  const timerRef = useRef(null);

  const start = () => {
    if (timerRef.current !== null) return; // 이미 동작 중
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 100);
  };

  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  // 화면에서 사라질 때 정리
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div>
      <p style={{ fontSize: 24, fontWeight: "bold" }}>{(time / 10).toFixed(1)}초</p>
      <button onClick={start}>시작</button>
      <button onClick={stop}>정지</button>
      <button
        onClick={() => {
          stop();
          setTime(0);
        }}
      >
        리셋
      </button>
    </div>
  );
}

function StopwatchSection() {
  const [show, setShow] = useState(true);

  return (
    <section>
      <h2>문제 4. 스톱워치</h2>
      <button onClick={() => setShow(!show)}>{show ? "스톱워치 숨기기" : "스톱워치 보이기"}</button>
      {show && <Stopwatch />}
    </section>
  );
}


// < 문제 5 >
function DebounceSearch() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (keyword.trim() === "") {
      setResults([]);
      setStatus("");
      return;
    }

    let ignore = false;

    const timer = setTimeout(async () => {
      setStatus("검색 중...");
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(keyword)}&limit=5&select=title`
        );
        const data = await res.json();
        if (!ignore) {
          setResults(data.products);
          setStatus(data.products.length === 0 ? "검색 결과 없음" : `${data.products.length}건`);
        }
      } catch (err) {
        if (!ignore) setStatus(err.message);
      }
    }, 500);

    return () => {
      ignore = true;
      clearTimeout(timer); // 0.5초 안에 다시 입력하면 이전 예약 취소
    };
  }, [keyword]);

  return (
    <section>
      <h2>문제 5. 검색 디바운스</h2>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="예: phone" /> {status}
      <ul>
        {results.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </section>
  );
}


export default function Practice() {
  return (
    <div>
      <h1>ch06 실습 정답</h1>
      <PageTitle />
      <AutoFocus />
      <TodoLoader />
      <StopwatchSection />
      <DebounceSearch />
    </div>
  );
}
