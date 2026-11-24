import { useNavigate, useParams, useSearchParams } from "react-router";
import { issueCode, PROVIDERS } from "../fakeAuthServer.js";

/*
  [순서06] 제공자 동의 화면 흉내 - /oauth/:provider?state=...

  실제로는 카카오 / 구글 / 네이버 사이트의 화면이다. (우리 코드가 아님)
  - 사용자가 제공자 계정으로 로그인하고 "이 앱에 이름, 이메일 제공"에 동의한다.
  - 동의하면 제공자가 우리 앱의 콜백 주소로 돌려보낸다.
      /oauth/callback?code=인가코드&state=보낸값그대로
  - 취소하면 code 대신 error가 붙어서 돌아온다.
      /oauth/callback?error=access_denied&state=...
*/
export default function OAuthConsent() {
  const { provider } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const info = PROVIDERS[provider];
  const state = searchParams.get("state");

  if (!info) {
    return <p>지원하지 않는 로그인 방식입니다 : {provider}</p>;
  }

  const agree = () => {
    const code = issueCode(provider);
    // replace : 뒤로 가기로 동의 화면에 다시 오지 않게
    navigate(`/oauth/callback?code=${code}&state=${state}`, { replace: true });
  };

  const cancel = () => {
    navigate(`/oauth/callback?error=access_denied&state=${state}`, { replace: true });
  };

  return (
    <section style={{ maxWidth: 360, padding: 20, border: `3px solid ${info.color === "#ffffff" ? "#4285F4" : info.color}`, borderRadius: 12 }}>
      <p style={{ color: "gray", fontSize: 13 }}>※ 실제로는 {info.label} 사이트의 화면입니다.</p>
      <h2>{info.label} 계정으로 로그인</h2>
      <p>
        <strong>{info.account.name}</strong> ({info.account.email})
      </p>
      <p>"React 수업 앱"이 다음 정보를 요청합니다.</p>
      <ul>
        <li>이름 (필수)</li>
        <li>이메일 (필수)</li>
      </ul>
      <button onClick={agree} style={{ background: info.color, color: info.textColor, padding: "8px 16px" }}>
        동의하고 계속하기
      </button>
      <button onClick={cancel}>취소</button>
    </section>
  );
}
