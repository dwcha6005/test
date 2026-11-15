import Link from "next/link";

/*
  [순서06] not-found.js

  - 없는 주소로 들어오거나 notFound()를 호출하면 표시된다.
  - React Router의 <Route path="*" /> 와 같은 역할
*/
export default function NotFound() {
  return (
    <main>
      <h1>404 - 페이지를 찾을 수 없습니다</h1>
      <Link href="/">홈으로</Link>
    </main>
  );
}
