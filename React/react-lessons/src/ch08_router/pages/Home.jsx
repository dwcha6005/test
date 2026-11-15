import { Link } from "react-router";

/*
  [순서03] Link

  <a href="/about">  : 페이지 전체를 새로 불러온다. (깜빡임, state 초기화)
  <Link to="/about"> : 새로고침 없이 주소만 바꾸고 화면을 교체한다. (SPA)
  → 앱 안의 이동은 항상 Link를 사용한다. 외부 사이트는 <a>
*/
export default function Home() {
  return (
    <section>
      <h2>홈</h2>
      <p>DOM 마켓에 오신 것을 환영합니다.</p>
      <p>
        <Link to="/products">상품 보러 가기 (Link)</Link>
      </p>
      <p>
        <a href="/products">상품 보러 가기 (a 태그 - 새로고침 발생)</a>
      </p>
    </section>
  );
}
