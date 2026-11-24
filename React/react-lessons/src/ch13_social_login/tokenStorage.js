import { TOKEN_LIFETIME_SEC } from "./fakeAuthServer.js";

/*
  [순서03] 토큰 저장소 3가지 (12_web_storage 복습)

  | 저장소         | 유지 기간                       | 특징                                         |
  | localStorage   | 지우기 전까지 (브라우저 꺼도 유지) | "로그인 상태 유지"                             |
  | sessionStorage | 탭을 닫으면 삭제                  | 공용 PC 등 잠깐 로그인                          |
  | 쿠키           | max-age로 만료 시간 지정          | 요청할 때 서버에 자동으로 함께 전송된다          |

  ※ 실무에서는 서버가 HttpOnly 쿠키로 토큰을 심는 경우가 많다.
     HttpOnly 쿠키는 JavaScript(document.cookie)로 읽을 수 없어서 XSS 공격에 더 안전하다.
     (HttpOnly는 서버만 설정할 수 있어서 여기서는 흉내 낼 수 없다)
*/
const KEY = "auth_token";

export const STORAGE_TYPES = {
  local: "localStorage (로그인 상태 유지)",
  session: "sessionStorage (탭 닫으면 로그아웃)",
  cookie: `쿠키 (${TOKEN_LIFETIME_SEC}초 뒤 자동 삭제)`,
};

export function saveToken(token, type) {
  clearToken(); // 한 곳에만 저장되도록 먼저 모두 지운다

  if (type === "local") {
    localStorage.setItem(KEY, token);
  } else if (type === "session") {
    sessionStorage.setItem(KEY, token);
  } else {
    document.cookie = `${KEY}=${encodeURIComponent(token)}; max-age=${TOKEN_LIFETIME_SEC}; path=/`;
  }
}

export function loadToken() {
  return localStorage.getItem(KEY) || sessionStorage.getItem(KEY) || readCookie(KEY);
}

// 지금 토큰이 어디에 저장되어 있는지 (마이페이지 표시용)
export function findTokenPlace() {
  if (localStorage.getItem(KEY)) return "localStorage";
  if (sessionStorage.getItem(KEY)) return "sessionStorage";
  if (readCookie(KEY)) return "쿠키";
  return "없음";
}

export function clearToken() {
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(KEY);
  document.cookie = `${KEY}=; max-age=0; path=/`; // max-age=0 : 쿠키 삭제
}

// document.cookie 는 "a=1; b=2" 처럼 모든 쿠키가 한 문자열로 나온다
function readCookie(name) {
  const found = document.cookie.split("; ").find((item) => item.startsWith(name + "="));
  return found ? decodeURIComponent(found.slice(name.length + 1)) : null;
}
