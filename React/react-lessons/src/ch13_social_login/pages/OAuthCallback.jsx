import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

/*
  [순서07] 콜백 페이지 - /oauth/callback?code=...&state=...

  1) 주소에서 code, state를 꺼낸다. (ch08 useSearchParams)
  2) code를 서버에 보내 토큰으로 바꾼다. (completeLogin)
  3) 성공하면 마이페이지로 이동 (replace : 뒤로 가기로 콜백 페이지에 다시 오지 않게)

  ★ useRef로 한 번만 요청하는 이유
  - 개발 모드의 StrictMode는 useEffect를 일부러 두 번 실행한다. (ch03 [순서07])
  - code는 한 번만 쓸 수 있어서 두 번 요청하면 두 번째는 "이미 사용된 코드" 에러가 난다.
  - ref 값은 두 번째 실행 때도 유지되므로, 이미 요청했으면 건너뛴다.
*/
export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { completeLogin } = useAuth();
  const [error, setError] = useState("");
  const requestedRef = useRef(false);

  useEffect(() => {
    if (requestedRef.current) return;
    requestedRef.current = true;

    if (searchParams.get("error")) {
      navigate("/login?error=로그인을 취소했습니다.", { replace: true });
      return;
    }

    completeLogin(searchParams.get("code"), searchParams.get("state"))
      .then(() => navigate("/mypage", { replace: true }))
      .catch((err) => setError(err.message));
    // 이 페이지에 들어왔을 때 한 번만 실행하면 되므로 의존성 배열은 비워 둔다.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <section>
        <h2>로그인 실패</h2>
        <p style={{ color: "crimson" }}>{error}</p>
        <Link to="/login">다시 로그인</Link>
      </section>
    );
  }

  return <p>⏳ 로그인 처리 중... (code → 토큰 교환)</p>;
}
