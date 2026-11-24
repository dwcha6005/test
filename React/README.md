# React 수업 자료

이 폴더에는 프로젝트가 2개 들어 있다.

| 폴더 | 내용 | 실행 주소 |
| --- | --- | --- |
| `react-lessons` | ch01 ~ ch13 (Vite + React 19) | http://localhost:5173 |
| `next-lessons` | Next.js ch01 (App Router), 별도 프로젝트라 ch01부터 | http://localhost:3000 |

## 1. 실행 방법

Node.js 22 LTS 이상을 권장한다. (Vite 8은 20.19 이상, Next.js 16은 20.9 이상이 필요하다)

```bash
# 리액트 기초 ~ 소셜 로그인
cd react-lessons
npm install      # 처음 한 번만
npm run dev

# Next.js (터미널을 새로 열어서)
cd next-lessons
npm install
npm run dev
```

## 2. 챕터 바꾸는 방법 (react-lessons)

`react-lessons/src/main.jsx`에서 **수업할 챕터의 import 한 줄만** 주석을 푼다.

```js
// import App from "./ch01_jsx/App.jsx";
import App from "./ch02_props/App.jsx";        // 수업 자료
// import App from "./ch02_props/Practice.jsx"; // 실습 정답
```

- `App.jsx`: 시연용 수업 자료. `[순서01]`, `[순서02]` … 주석 순서대로 수업한다.
- `Practice.jsx`: 위쪽 주석에 실습 문제가 있고, 아래에 정답 코드가 있다.
- `chNN_콘티.txt`: 교시별 진행 순서, 시연 포인트, 예상 질문을 정리했다.

## 3. 목차

| 구분 | 챕터 | 폴더 | 교시 |
| --- | --- | --- | --- |
| 리액트 기초 | ch01. React 시작과 JSX | `ch01_jsx` | 2 |
| | ch02. 컴포넌트와 props | `ch02_props` | 2 |
| | ch03. 이벤트와 State | `ch03_state` | 2 |
| | ch04. 목록 렌더링과 배열 State | `ch04_list` | 2 |
| | ch05. State 끌어올리기 (Simple Counter) | `ch05_lifting` | 1 |
| | ch06. useEffect와 useRef | `ch06_effect` | 2 |
| | ch07. 종합 실습: 할 일 관리 앱 | `ch07_todo` | 2 |
| React Router | ch08. React Router | `ch08_router` | 2 |
| styled-components | ch09. styled-components | `ch09_styled` | 1 |
| Context API | ch10. Context API | `ch10_context` | 2 |
| useReducer | ch11. useReducer | `ch11_reducer` | 1 |
| 리덕스 | ch12. Redux, Redux Toolkit | `ch12_redux` | 2 |
| 소셜 로그인 | ch13. 소셜 로그인 흉내 내기 (OAuth 흐름, 토큰 저장) | `ch13_social_login` | 2 |
| Next.js | ch01. Next.js (App Router) | `next-lessons` | 2 |

모두 합쳐 25교시다.

> ch13 소셜 로그인은 실제 카카오/구글/네이버 서버 없이 프론트엔드만으로 흐름을 흉내 낸 예제다. 실제 연결에는 앱 키 발급과 백엔드가 필요하다.

할 일 앱은 이후 챕터에서도 계속 다시 만든다. 같은 기능을 다른 방식으로 바꿔 보면서 비교하는 흐름이다.

> ch07 useState → ch10 Context → ch11 useReducer → ch12 Redux Toolkit

장바구니 실습도 ch04 → ch10 → ch11 → ch12에서 같은 방식으로 반복한다.

## 4. 버전 메모 (예전 자료와 다른 점)

- **CRA(create-react-app)는 2025년 2월에 지원이 종료**되었다. 그래서 Vite를 사용한다. (`npm start` 대신 `npm run dev`)
- Vite에서는 JSX가 들어간 파일의 확장자를 `.jsx`로 해야 한다.
- **React Router v7**은 `react-router` 패키지 하나만 쓴다. 예전 자료에 있는 `react-router-dom`은 `react-router`로 바꿔 읽으면 된다.
- **React 19**부터는 `<Context.Provider value>` 대신 `<Context value>`로 쓸 수 있다. 예전 문법도 그대로 동작한다.
- **Redux**는 Redux Toolkit(`createSlice`, `configureStore`)이 공식 권장 방식이다. `createStore`로 시작하는 코드는 예전 방식이다.
- **Next.js 15 이상**에서는 `params`가 Promise다. `const { id } = await params;`처럼 await 해서 꺼낸다.
- `StrictMode`는 지우지 않는다. 개발 중에 두 번 실행되는 것은 정상이다. (ch03 `[순서07]`)

## 5. 외부 API

- https://jsonplaceholder.typicode.com: 사용자, 게시글, 할 일 (ch06, ch11, ch12, Next.js ch01)
- https://dummyjson.com: 상품 검색 (ch06 실습, ch12 실습, Next.js ch01 실습)
