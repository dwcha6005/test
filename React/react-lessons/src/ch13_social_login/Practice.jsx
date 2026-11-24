import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Link, Navigate, NavLink, Outlet, Route, Routes, useLocation, useNavigate, useSearchParams } from "react-router";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { decodeToken, PROVIDERS } from "./fakeAuthServer.js";
import { loadToken } from "./tokenStorage.js";
import Login from "./pages/Login.jsx";
import OAuthConsent from "./pages/OAuthConsent.jsx";

/*
  ch13 실습 - 소셜 로그인 기능 추가하기

  수업에서 만든 AuthContext, 로그인 페이지, 동의 화면은 그대로 가져와서 사용한다.
  (./context/AuthContext.jsx, ./pages/Login.jsx, ./pages/OAuthConsent.jsx)

  < 문제 1. 프로필 배지 > [기초]
  ① 로그인하면 메뉴 오른쪽에 제공자 색깔 배경의 배지로 "홍길동 · 카카오"를 표시하시오.
     (색은 PROVIDERS[provider].color, 글자색은 textColor)
  ② 로그인 전에는 [로그인] 링크를 표시하시오.

  < 문제 2. 자동 로그아웃 타이머 > [응용]
  ① 메뉴에 "자동 로그아웃까지 85초"처럼 토큰 남은 시간을 1초마다 표시하시오.
     힌트) decodeToken(loadToken()).exp - Date.now() , setInterval (ch06 Clock 복습)
  ② 0초가 되면 logout() 하고 "/login?error=로그인 시간이 만료되었습니다." 로 이동하시오.
  ③ 컴포넌트가 사라질 때 타이머를 정리(clearInterval)하시오.

  < 문제 3. 로그인 후 원래 가려던 페이지로 > [응용]
  ① /mypage, /settings 두 페이지를 로그인해야 볼 수 있게 하시오.
  ② 로그인하지 않은 채 /settings 로 들어오면, 가려던 주소를 sessionStorage("redirectAfterLogin")에 저장하고
     로그인 페이지로 보내시오. (useLocation().pathname)
  ③ 콜백에서 로그인이 끝나면 저장해 둔 주소로 이동하고(없으면 /mypage) 저장값을 지우시오.
     ※ 로그인 중에 제공자 화면을 거쳐 오므로 location.state 대신 sessionStorage에 저장한다.

  < 문제 4. 로그인 기록 > [심화]
  ① 로그인에 성공할 때마다 { provider, name, time } 을 localStorage("loginHistory") 배열 맨 앞에 추가하시오.
  ② 최근 5개까지만 남기시오. (slice)
  ③ /history 페이지에 "2026. 11. 24. 오후 7:50:12 - 홍길동 (카카오)" 형식으로 목록을 보여 주고,
     [기록 삭제] 버튼으로 모두 지울 수 있게 하시오. (로그인 없이도 볼 수 있는 페이지)
*/


// < 문제 4 > 로그인 기록 저장 / 읽기
const HISTORY_KEY = "loginHistory";

function readHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem(HISTORY_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function addHistory(user) {
  const item = { provider: user.provider, name: user.name, time: Date.now() };
  const next = [item, ...readHistory()].slice(0, 5);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
}


// < 문제 1 >
function ProfileBadge() {
  const { user } = useAuth();

  if (!user) {
    return <NavLink to="/login">로그인</NavLink>;
  }

  const info = PROVIDERS[user.provider];
  return (
    <span style={{ padding: "2px 10px", borderRadius: 12, border: "1px solid #ddd", background: info.color, color: info.textColor }}>
      {user.name} · {info.label}
    </span>
  );
}


// < 문제 2 >
function LogoutTimer() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [left, setLeft] = useState(null);

  useEffect(() => {
    if (!user) return;

    const tick = () => {
      const token = loadToken();
      const payload = token ? decodeToken(token) : null;
      const seconds = payload ? Math.max(0, Math.round((payload.exp - Date.now()) / 1000)) : 0;
      setLeft(seconds);

      if (seconds === 0) {
        logout();
        navigate("/login?error=로그인 시간이 만료되었습니다.", { replace: true });
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user || left === null) return null;
  return <span style={{ marginLeft: 8, color: left <= 30 ? "crimson" : "gray" }}>자동 로그아웃까지 {left}초</span>;
}


function PracticeLayout() {
  const { user, logout } = useAuth();
  const linkStyle = ({ isActive }) => ({ marginRight: 12, fontWeight: isActive ? "bold" : "normal" });

  return (
    <div>
      <nav style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #ccc", paddingBottom: 8, marginBottom: 12 }}>
        <NavLink to="/" end style={linkStyle}>
          홈
        </NavLink>
        <NavLink to="/mypage" style={linkStyle}>
          마이페이지
        </NavLink>
        <NavLink to="/settings" style={linkStyle}>
          설정
        </NavLink>
        <NavLink to="/history" style={linkStyle}>
          로그인 기록
        </NavLink>
        <span style={{ marginLeft: "auto" }}>
          <ProfileBadge />
          <LogoutTimer />
          {user && (
            <button onClick={logout} style={{ marginLeft: 8 }}>
              로그아웃
            </button>
          )}
        </span>
      </nav>
      <Outlet />
    </div>
  );
}


// < 문제 3 ②>
function RequireAuth({ children }) {
  const { user, checking } = useAuth();
  const location = useLocation();

  if (checking) return <p>로그인 상태 확인 중...</p>;

  if (!user) {
    sessionStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/login" replace />;
  }
  return children;
}

// < 문제 3 ③, 문제 4 ① > 수업용 OAuthCallback에 기능을 더한 버전
function PracticeCallback() {
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
      .then((user) => {
        addHistory(user);

        const target = sessionStorage.getItem("redirectAfterLogin") || "/mypage";
        sessionStorage.removeItem("redirectAfterLogin");
        navigate(target, { replace: true });
      })
      .catch((err) => setError(err.message));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <p style={{ color: "crimson" }}>
        {error} <Link to="/login">다시 로그인</Link>
      </p>
    );
  }
  return <p>⏳ 로그인 처리 중...</p>;
}


function Home() {
  return <h2>ch13 실습 - 홈</h2>;
}

function MyPage() {
  const { user } = useAuth();
  return (
    <h2>
      {user.name}님의 마이페이지 ({user.email})
    </h2>
  );
}

function Settings() {
  return <h2>설정 페이지 (로그인 후 바로 이 페이지로 돌아왔다면 문제 3 성공!)</h2>;
}

// < 문제 4 ③ >
function History() {
  const [history, setHistory] = useState(readHistory);

  const clear = () => {
    localStorage.removeItem(HISTORY_KEY);
    setHistory([]);
  };

  return (
    <section>
      <h2>최근 로그인 기록</h2>
      {history.length === 0 ? (
        <p>기록이 없습니다.</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={item.time}>
              {new Date(item.time).toLocaleString()} - {item.name} ({PROVIDERS[item.provider].label})
            </li>
          ))}
        </ul>
      )}
      <button onClick={clear} disabled={history.length === 0}>
        기록 삭제
      </button>
    </section>
  );
}


export default function Practice() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <h1 style={{ fontSize: 20 }}>ch13 실습 정답</h1>
        <Routes>
          <Route element={<PracticeLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="oauth/callback" element={<PracticeCallback />} />
            <Route path="oauth/:provider" element={<OAuthConsent />} />
            <Route path="history" element={<History />} />
            <Route
              path="mypage"
              element={
                <RequireAuth>
                  <MyPage />
                </RequireAuth>
              }
            />
            <Route
              path="settings"
              element={
                <RequireAuth>
                  <Settings />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
