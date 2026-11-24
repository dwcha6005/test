import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import OAuthConsent from "./pages/OAuthConsent.jsx";
import OAuthCallback from "./pages/OAuthCallback.jsx";
import RequireAuth from "./pages/RequireAuth.jsx";
import MyPage from "./pages/MyPage.jsx";

/*
  ch13. 소셜 로그인 흉내 내기 (OAuth 흐름 + 토큰 저장)

  [순서01] 소셜 로그인은 어떻게 동작하나? (OAuth 2.0 흐름)
  [순서02] 가짜 인증 서버                         → fakeAuthServer.js
  [순서03] 토큰 저장소 3가지                       → tokenStorage.js
  [순서04] AuthContext                            → context/AuthContext.jsx
  [순서05] 로그인 페이지, state 값                 → pages/Login.jsx, AuthContext.jsx
  [순서06] 제공자 동의 화면 (흉내)                 → pages/OAuthConsent.jsx
  [순서07] 콜백 : code → 토큰 교환                 → pages/OAuthCallback.jsx
  [순서08] 로그인해야 볼 수 있는 페이지            → pages/RequireAuth.jsx, MyPage.jsx
  [순서09] 새로고침해도 로그인 유지                → context/AuthContext.jsx
  [순서10] 로그아웃                                → context/AuthContext.jsx
  [순서11] 실제 서비스와 다른 점 (보안)            → 이 파일 아래 주석, MyPage.jsx

  사용 패키지 : react-router (ch08) - 추가 설치 없음


  [순서01] 소셜 로그인 흐름 (카카오 로그인 예)

    ① 사용자가 [카카오로 로그인] 클릭
    ② 카카오 로그인 / 동의 화면으로 이동 (카카오 사이트)
    ③ 동의하면 카카오가 우리 앱으로 돌려보낸다 → /oauth/callback?code=인가코드
    ④ 우리 서버가 code를 카카오에 보내서 "토큰"으로 바꾼다
    ⑤ 토큰을 저장하고, 이후에는 토큰으로 "로그인한 사용자"임을 증명한다

  판서
    [우리 앱] --①②--> [카카오] --③ code--> [우리 앱] --④ code--> [서버] --토큰--> [우리 앱 ⑤ 저장]

  왜 바로 토큰을 주지 않고 code를 먼저 줄까?
  - 주소창(URL)에 붙어 오는 값은 브라우저 기록, 로그에 남을 수 있다.
  - code는 잠깐만, 한 번만 쓸 수 있는 "교환권"이라 노출되어도 피해가 작다.
  - 진짜 토큰은 서버끼리 비밀키와 함께 주고받는다.

  용어
  - 제공자(provider) : 카카오, 구글, 네이버처럼 로그인을 대신 해 주는 곳
  - 인가 코드(code)  : 토큰으로 바꿀 수 있는 일회용 교환권
  - 토큰(token)      : 로그인했다는 증명서. 요청할 때 함께 보낸다
  - state            : CSRF 공격을 막기 위해 보냈다가 그대로 돌려받는 무작위 값


  [순서11] 이 예제와 실제 서비스의 차이 (꼭 설명!)

  | 이 예제                                  | 실제 서비스                                           |
  | 같은 앱 안의 /oauth/kakao 페이지          | 카카오 사이트로 페이지 전체가 이동                      |
  | 브라우저 코드가 code를 토큰으로 교환       | 우리 백엔드 서버가 비밀키(client secret)로 교환          |
  | 토큰 서명이 "fake-signature" (위조 가능)  | 서버 비밀키로 서명 → 바꾸면 서버가 알아챔                |
  | 토큰을 JS로 저장 (localStorage 등)        | 서버가 HttpOnly 쿠키로 저장하는 경우가 많다 (JS로 못 읽음) |

  실제로 연결하려면
  - 카카오 디벨로퍼스(developers.kakao.com) 등에서 앱을 등록하고 키를 발급받는다.
  - 리다이렉트 주소(콜백 주소)를 등록한다.
  - 토큰 교환은 백엔드(Spring, Node, Next.js Route Handler 등)에서 한다.
*/

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <h1 style={{ fontSize: 20 }}>ch13. 소셜 로그인 흉내 내기</h1>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="oauth/callback" element={<OAuthCallback />} />
            <Route path="oauth/:provider" element={<OAuthConsent />} />
            <Route
              path="mypage"
              element={
                <RequireAuth>
                  <MyPage />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
