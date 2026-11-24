import { createContext, useContext, useEffect, useState } from "react";
import { exchangeCodeForToken, getMe } from "../fakeAuthServer.js";
import { clearToken, loadToken, saveToken } from "../tokenStorage.js";

/*
  [순서04] AuthContext - 로그인 상태를 앱 전체에서 사용 (ch10 Context 복습)

  user     : 로그인한 사용자 (없으면 null)
  checking : 새로고침 직후 저장된 토큰을 확인하는 중인지
  startLogin(provider, storageType) : 로그인 시작 → 제공자 동의 화면 주소를 돌려준다
  completeLogin(code, state)        : 콜백에서 code를 토큰으로 바꾸고 저장
  logout()
*/
const AuthContext = createContext(null);

// 로그인을 시작할 때 잠깐 기억해 둘 값 (state, 저장소 종류)
const PENDING_KEY = "oauth_pending";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  /*
    [순서09] 새로고침해도 로그인 유지
    - state(user)는 새로고침하면 사라진다.
    - 저장해 둔 토큰이 있으면 서버(getMe)에 보내서 아직 유효한지 확인하고 user를 다시 채운다.
    - 만료되었거나 잘못된 토큰이면 지운다.
  */
  useEffect(() => {
    const token = loadToken();
    if (!token) {
      setChecking(false);
      return;
    }

    getMe(token)
      .then((me) => setUser(me))
      .catch(() => clearToken())
      .finally(() => setChecking(false));
  }, []);

  /*
    [순서05] 로그인 시작
    state : 무작위 문자열. 제공자에게 보냈다가 콜백에서 그대로 돌려받는다.
            돌아온 값이 내가 보낸 값과 같아야 "내가 시작한 로그인"이 맞다. (CSRF 공격 방지)
  */
  const startLogin = (provider, storageType) => {
    const state = Math.random().toString(36).slice(2);
    sessionStorage.setItem(PENDING_KEY, JSON.stringify({ state, storageType }));
    return `/oauth/${provider}?state=${state}`;
  };

  // [순서07] 콜백 : code → 토큰 교환 → 저장 → user 설정
  const completeLogin = async (code, state) => {
    const pending = JSON.parse(sessionStorage.getItem(PENDING_KEY));
    sessionStorage.removeItem(PENDING_KEY);

    if (!pending || pending.state !== state) {
      throw new Error("state 값이 다릅니다. 로그인을 처음부터 다시 시도하세요.");
    }

    const result = await exchangeCodeForToken(code);
    saveToken(result.token, pending.storageType);
    setUser(result.user);
    return result.user;
  };

  // [순서10] 로그아웃 : 토큰 삭제 + user 비우기
  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext value={{ user, checking, startLogin, completeLogin, logout }}>{children}</AuthContext>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth는 AuthProvider 안에서 사용하세요.");
  return context;
}
