import { Link } from "react-router";

export default function Home() {
  return (
    <section>
      <h2>홈</h2>
      <p>소셜 로그인 흐름을 프론트엔드만으로 흉내 낸 예제입니다.</p>
      <ol>
        <li>로그인 페이지에서 제공자 버튼 클릭</li>
        <li>제공자(가짜) 동의 화면에서 [동의하고 계속]</li>
        <li>콜백 페이지에서 code → 토큰 교환</li>
        <li>토큰 저장 후 마이페이지로 이동</li>
      </ol>
      <Link to="/mypage">마이페이지 (로그인 필요)</Link>
    </section>
  );
}
