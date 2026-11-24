/*
  [순서02] 가짜 인증 서버 (fakeAuthServer.js)

  실제 소셜 로그인에서는 카카오 / 구글 / 네이버의 "인증 서버"와 우리 "백엔드 서버"가 하는 일을
  이 파일의 함수들이 흉내 낸다. setTimeout으로 네트워크가 느린 것처럼 만든다.

  ※ 수업용 흉내일 뿐이다. 실제 서비스에서 브라우저 코드만으로 토큰을 만들면 누구나 위조할 수 있다.
*/

// 토큰 유효 시간 (수업에서 만료를 보여 주려고 2분으로 짧게)
export const TOKEN_LIFETIME_SEC = 120;

// 제공자(provider)별 정보와, 그 제공자에 가입된 가짜 계정
export const PROVIDERS = {
  kakao: {
    label: "카카오",
    color: "#FEE500",
    textColor: "#191919",
    account: { id: "kakao_1001", name: "홍길동", email: "hong@kakao.com" },
  },
  google: {
    label: "구글",
    color: "#ffffff",
    textColor: "#3c4043",
    account: { id: "google_2002", name: "Kim Chulsoo", email: "chulsoo@gmail.com" },
  },
  naver: {
    label: "네이버",
    color: "#03C75A",
    textColor: "#ffffff",
    account: { id: "naver_3003", name: "이영희", email: "younghee@naver.com" },
  },
};

// 발급한 인가 코드(code) 목록. 실제로는 제공자 서버에 저장된다.
// 새로고침하면 이 변수가 초기화되므로 "code는 한 번만, 잠깐만 쓸 수 있다"는 것도 자연스럽게 흉내 난다.
const issuedCodes = new Map();

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/*
  1) 인가 코드 발급 - 사용자가 제공자 화면에서 [동의]를 누르면 제공자가 code를 만들어 준다.
*/
export function issueCode(provider) {
  const code = Math.random().toString(36).slice(2, 10);
  issuedCodes.set(code, provider);
  return code;
}

/*
  2) code → 토큰 교환 - 실제로는 "우리 백엔드 서버"가 앱 비밀키(client secret)와 함께 요청한다.
     code는 한 번 쓰면 바로 지운다. (같은 code로 두 번 요청하면 실패)
*/
export async function exchangeCodeForToken(code) {
  await wait(700);

  const provider = issuedCodes.get(code);
  if (!provider) {
    throw new Error("유효하지 않거나 이미 사용된 인가 코드입니다.");
  }
  issuedCodes.delete(code);

  const account = PROVIDERS[provider].account;
  const user = { ...account, provider };
  const token = createToken({ ...user, exp: Date.now() + TOKEN_LIFETIME_SEC * 1000 });

  return { token, user };
}

/*
  3) 토큰으로 내 정보 조회 - 새로고침 후 "저장된 토큰이 아직 유효한지" 서버에 물어보는 단계
*/
export async function getMe(token) {
  await wait(300);

  const payload = decodeToken(token);
  if (!payload || !token.endsWith(".fake-signature")) {
    throw new Error("잘못된 토큰입니다.");
  }
  if (payload.exp < Date.now()) {
    throw new Error("토큰이 만료되었습니다. 다시 로그인하세요.");
  }

  const { exp, ...user } = payload;
  return user;
}


/*
  토큰 모양 흉내 (JWT : 헤더.내용.서명)
  - 내용(payload)은 base64로 "인코딩"만 했다. 암호화가 아니라서 누구나 읽을 수 있다. (마이페이지에서 확인)
  - 진짜 JWT는 서버만 아는 비밀키로 "서명"해서 내용을 바꾸면 서버가 알아챈다.
*/
function toBase64(text) {
  return btoa(String.fromCharCode(...new TextEncoder().encode(text)));
}

function fromBase64(base64) {
  const bytes = Uint8Array.from(atob(base64), (ch) => ch.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function createToken(payload) {
  const header = toBase64(JSON.stringify({ alg: "none", typ: "JWT" }));
  const body = toBase64(JSON.stringify(payload));
  return `${header}.${body}.fake-signature`;
}

export function decodeToken(token) {
  try {
    return JSON.parse(fromBase64(token.split(".")[1]));
  } catch {
    return null;
  }
}
