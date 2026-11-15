"use client";

import { useState } from "react";

/*
  [순서08] 클라이언트 컴포넌트

  파일 맨 위에 "use client" 를 쓰면 브라우저에서도 실행되는 컴포넌트가 된다.
  - useState, useEffect, onClick 같은 "사용자와 상호작용"하는 기능은 여기서만 쓸 수 있다.
  - 지금까지 Vite에서 만든 컴포넌트는 전부 클라이언트 컴포넌트였다고 보면 된다.

  추천 구조
  - 페이지(page.js)는 서버 컴포넌트로 두고 데이터를 가져온다.
  - 버튼, 입력창처럼 움직이는 부분만 작은 클라이언트 컴포넌트로 떼어 낸다.
  - 서버 → 클라이언트로는 props로 데이터를 넘긴다. (아래 initial)
*/
export default function Counter({ initial = 0 }) {
  const [count, setCount] = useState(initial);

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount((prev) => prev - 1)}>-1</button>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
    </div>
  );
}
