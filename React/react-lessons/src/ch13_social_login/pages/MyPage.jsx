import { useAuth } from "../context/AuthContext.jsx";
import { decodeToken, PROVIDERS } from "../fakeAuthServer.js";
import { findTokenPlace, loadToken } from "../tokenStorage.js";

/*
  [순서08] 로그인한 사용자만 보는 페이지
  [순서11] 토큰 들여다보기 - 내용은 누구나 읽을 수 있다 (암호화가 아니라 인코딩)
*/
export default function MyPage() {
  const { user, logout } = useAuth();
  const token = loadToken();
  const payload = token ? decodeToken(token) : null;

  return (
    <section>
      <h2>마이페이지</h2>
      <p>
        {user.name}님 ({PROVIDERS[user.provider].label} 로그인)
      </p>
      <p>이메일 : {user.email}</p>

      <h3>저장된 토큰</h3>
      <p>저장 위치 : {findTokenPlace()}</p>
      <p style={{ wordBreak: "break-all", fontSize: 12, color: "gray" }}>{token}</p>
      {payload && (
        <>
          <p>만료 시각 : {new Date(payload.exp).toLocaleTimeString()}</p>
          <pre style={{ background: "#f5f5f5", padding: 8 }}>{JSON.stringify(payload, null, 2)}</pre>
        </>
      )}
      <button onClick={logout}>로그아웃</button>
    </section>
  );
}
