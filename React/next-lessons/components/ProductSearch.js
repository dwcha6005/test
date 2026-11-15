"use client";

import Link from "next/link";
import { useState } from "react";

/*
  < 문제 3 >

  ③ page.js 전체를 "use client"로 만들지 않는 이유
  - page.js가 서버 컴포넌트여야 서버에서 async / await fetch로 데이터를 가져와 HTML을 완성해서 보낼 수 있다.
    (첫 화면이 빠르고, 검색 엔진도 상품 목록을 읽을 수 있다)
  - 전체를 클라이언트로 만들면 ch06처럼 useEffect + loading state로 브라우저에서 다시 불러와야 한다.
  - 그래서 "움직이는 부분(검색창)"만 클라이언트 컴포넌트로 떼어 낸다.
*/
export default function ProductSearch({ products }) {
  const [keyword, setKeyword] = useState("");

  const filtered = products.filter((p) => p.title.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <div>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="상품 검색" />
      <p>
        {filtered.length}개 / 전체 {products.length}개
      </p>
      <ul>
        {filtered.map((p) => (
          <li key={p.id}>
            <Link href={`/practice/products/${p.id}`}>{p.title}</Link> - ${p.price} ({p.category})
          </li>
        ))}
      </ul>
    </div>
  );
}
