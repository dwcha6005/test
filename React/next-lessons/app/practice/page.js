import Link from "next/link";

/*
  ch13 실습 - Next.js 상품 페이지

  사용 API : https://dummyjson.com/products?limit=12&select=title,price,category,description
             https://dummyjson.com/products/1

  < 문제 1. 상품 목록 페이지 > [기초]            → app/practice/products/page.js
  ① /practice/products 주소에 상품 목록 페이지를 만드시오.
  ② 서버 컴포넌트에서 async / await fetch로 12개를 불러와 이름, 가격($), 분류를 표시하시오.
  ③ 각 상품 이름을 누르면 /practice/products/상품id 로 이동하시오. (Link)

  < 문제 2. 상품 상세 페이지 > [기초]            → app/practice/products/[id]/page.js
  ① params에서 id를 꺼내 상품 하나를 불러와 표시하시오. (await params 주의)
  ② 없는 상품이면 notFound()를 호출하시오. (/practice/products/9999 로 확인)
  ③ generateMetadata로 브라우저 탭 제목을 상품 이름으로 바꾸시오.

  < 문제 3. 검색 필터 > [응용]                   → components/ProductSearch.js
  ① 목록 페이지(서버)에서 받은 products를 클라이언트 컴포넌트에 props로 넘기시오.
  ② 클라이언트 컴포넌트에서 검색어(useState)로 이름을 필터링해 보여 주시오.
  ③ 왜 page.js 전체를 "use client"로 만들지 않는지 주석으로 쓰시오.

  < 문제 4. 찜하기 + 로딩 화면 > [심화]          → components/LikeButton.js, app/practice/products/loading.js
  ① 상세 페이지에 ♡ 찜하기 버튼(클라이언트 컴포넌트)을 만드시오.
  ② 찜한 상품 id 목록을 localStorage("likes")에 저장해서 새로고침해도 유지되게 하시오.
     힌트) localStorage는 브라우저에만 있다 → useEffect 안에서 읽는다.
  ③ 상품을 불러오는 동안 보여 줄 loading.js를 만드시오.
*/
export default function PracticePage() {
  return (
    <main>
      <h1>ch13 실습</h1>
      <p>문제는 이 파일(app/practice/page.js)의 주석을 확인하세요.</p>
      <Link href="/practice/products">정답 확인 : 상품 목록 →</Link>
    </main>
  );
}
