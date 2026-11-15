# 03. Vite와 json-server

> **[수업 콘티]** 권장 80분 (설명 + 따라 하기)
> 준비 : Node.js 20.19+ (또는 22.12+) 설치 확인 (`node -v`), 인터넷 연결 (패키지 설치)
> 진행 방식 : 강사가 한 단계씩 실행 → 학생이 따라 실행 → 결과 확인 후 다음 단계
> 목표 : React 수업 첫날 쓰는 명령(`npm create vite`, `npm run dev`)을 미리 익숙하게 만들고,
> json-server로 **실제로 저장되는 서버**를 만들어 13_fetch의 게시판과 연결한다.

---

## 1. Vite란? (5분)

**Vite** : 웹 개발용 **개발 서버 + 빌드 도구**

| 지금까지 겪은 문제 | Vite가 해결 |
|---|---|
| 모듈을 file://로 열면 CORS 오류 → Live Server 필요 | `npm run dev` 한 번으로 개발 서버 실행 |
| npm으로 설치한 패키지를 브라우저에서 import 할 수 없음 | `import dayjs from "dayjs"` 가능 |
| 코드를 고칠 때마다 새로고침 | 저장하면 자동 반영 (HMR) |
| 파일이 많아 배포할 때 느림 | `npm run build`로 압축 · 합치기 |

React 수업에서도 `npm create vite@latest`로 프로젝트를 만든다. 오늘 배우는 구조가 그대로 이어진다.

---

## 2. 프로젝트 만들기 (10분)

작업할 폴더(예 : `D:\Git\JS\14_module_vite`)에서 터미널을 열고 실행한다.

```bash
npm create vite@latest my-vite-app
```

질문에 답한다. (화살표 키로 선택, Enter)

1. Select a framework → **Vanilla** (React 수업에서는 React 선택)
2. Select a variant → **JavaScript**
3. 바로 설치하고 실행할지 물어보면 → 이번에는 **No**를 골라 아래 명령을 직접 실행해 본다.

```bash
cd my-vite-app
npm install
npm run dev
```

- 터미널에 표시되는 `http://localhost:5173` 을 Ctrl + 클릭하여 연다.
- 종료는 터미널에서 `Ctrl + C`

> 질문 없이 한 번에 만들기 : `npm create vite@latest my-vite-app -- --template vanilla`
> ▶ 자주 막히는 곳 : `cd my-vite-app`을 빼먹고 `npm install` → "package.json을 찾을 수 없음"

---

## 3. HMR 확인 (5분)

1. `src/main.js`에서 화면에 보이는 글자를 하나 바꾸고 저장한다.
2. 브라우저를 새로고침하지 않아도 바로 바뀐다.

---

## 4. 프로젝트 구조 (10분)

버전에 따라 파일이 조금 다를 수 있지만 핵심 구조는 같다.

```
my-vite-app/
├── index.html        ← 시작 HTML (프로젝트 최상위에 있다!)
├── package.json      ← scripts : dev / build / preview
├── node_modules/
├── public/           ← 그대로 복사되는 정적 파일 (파비콘 등)
└── src/
    ├── main.js       ← 시작 JS (index.html에서 type="module"로 연결)
    ├── counter.js    ← 예제 모듈
    └── style.css
```

**index.html**

```html
<div id="app"></div>
<script type="module" src="/src/main.js"></script>
```

**package.json의 scripts**

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

**main.js 첫 줄**

```js
import "./style.css";              // CSS도 import로 불러온다 (Vite 기능)
import { setupCounter } from "./counter.js";
```

> ▶ 포인트 : 01에서 배운 import / export가 그대로 쓰인다. React 프로젝트도 이 구조에 `App.jsx`가 추가되는 정도다.

---

## 5. 직접 코드 작성하기 (10분)

예제 코드를 지우고 간단한 화면을 직접 만든다.

**src/main.js**

```js
import "./style.css";
import { formatPrice } from "./utils.js";

const app = document.querySelector("#app");

app.innerHTML = `
  <h1>Vite 연습</h1>
  <p id="price"></p>
  <p id="today"></p>
`;

document.querySelector("#price").textContent = formatPrice(12000);
```

**src/utils.js** (새로 만들기)

```js
export function formatPrice(price) {
  return price.toLocaleString() + "원";
}
```

- Vite에서는 `import { formatPrice } from "./utils";` 처럼 **확장자를 생략해도 된다.**

---

## 6. npm 패키지 import (5분)

```bash
npm install dayjs
```

**src/main.js**에 추가

```js
import dayjs from "dayjs";

document.querySelector("#today").textContent = "오늘 : " + dayjs().format("YYYY년 MM월 DD일");
```

- 패키지는 경로(`./`) 없이 **이름으로** import 한다. Vite가 `node_modules`에서 찾아 준다.
- 01에서 Live Server로는 이렇게 할 수 없었다. (그래서 Vite 같은 도구를 쓴다)

---

## 7. 배포용 빌드 (5분)

```bash
npm run build
npm run preview
```

- `dist/` 폴더가 생긴다. 여러 JS 파일이 압축되어 하나로 합쳐진 결과물이다.
- 실제 서버(호스팅)에는 `dist` 폴더만 올린다.
- `npm run preview` : 빌드 결과를 미리 확인하는 서버 (`http://localhost:4173`)

> ▶ `dist/index.html`을 더블클릭하면 동작하지 않는다. (모듈은 서버로 열어야 한다 - 01과 같은 이유)

---

## 8. json-server : 진짜로 저장되는 연습 서버 (15분) ★

13_fetch의 JSONPlaceholder는 저장이 안 됐다. json-server는 **db.json 파일 하나를 실제 REST API 서버로** 만들어 준다.

### 8-1. 설치

my-vite-app 폴더에서 실행한다. (터미널 경로 확인)

```bash
npm install -D json-server
```

### 8-2. db.json 만들기 (프로젝트 최상위)

```json
{
  "posts": [
    { "id": "1", "title": "첫 번째 글", "body": "json-server로 만든 서버입니다." },
    { "id": "2", "title": "두 번째 글", "body": "수정, 삭제가 실제로 저장됩니다." }
  ]
}
```

### 8-3. 실행 스크립트 추가 (package.json)

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "api": "json-server db.json --port 3000"
}
```

### 8-4. 터미널 2개로 실행

- 터미널 1 : `npm run dev` (화면, 5173)
- 터미널 2 : `npm run api` (서버, 3000) ← VS Code 터미널 오른쪽 위 `+` 로 터미널 추가

브라우저에서 `http://localhost:3000/posts` 를 열면 db.json의 내용이 보인다.

### 8-5. 만들어지는 API (13_fetch에서 배운 그대로)

| 메서드 | URL | 동작 |
|---|---|---|
| GET | /posts | 목록 |
| GET | /posts/1 | 1개 |
| POST | /posts | 등록 (id 자동 생성) |
| PUT / PATCH | /posts/1 | 수정 |
| DELETE | /posts/1 | 삭제 |

> ▶ 시연 : 아래 8-6 코드로 글을 등록한 뒤 **VS Code에서 db.json을 열면 실제로 내용이 추가되어 있다.** 새로고침해도 유지된다.

### 8-6. 주의 : id는 문자열이다

`npm install json-server`로 설치되는 현재 버전(v1)은 **id를 문자열**로 만든다. (예 : `"id": "a3f9"`)

```js
// 13_fetch 코드처럼 Number()로 바꾸면 비교가 실패한다
const id = button.closest(".post").dataset.id;   // 문자열 그대로 사용
const post = posts.find((p) => p.id === id);
```

> 예전 버전(0.17)을 쓰는 자료가 인터넷에 많다. 예전 버전은 id가 숫자이고 `--watch` 옵션이 필요하다. 이 수업은 현재 버전 기준이다.

---

## 9. 13_fetch 게시판을 json-server로 바꾸기 (10분)

`13_fetch/02_fetch_crud.js`의 섹션 6을 Vite 프로젝트의 `src/main.js`로 옮기고 아래 3곳만 바꾼다.

| 바꿀 곳 | 변경 전 | 변경 후 |
|---|---|---|
| 서버 주소 | `https://jsonplaceholder.typicode.com` | `http://localhost:3000` |
| 목록 조회 | `/posts?userId=1` | `/posts` |
| id 처리 | `Number(...dataset.id)`, `saved.id = Date.now();` | `Number()` 제거, `Date.now()` 줄 삭제 |

> ▶ 확인 : 등록 · 수정 · 삭제 후 F5 → 그대로 유지 / db.json 내용 변경 확인
> ▶ JSONPlaceholder에서 500 오류가 났던 "새 글 수정"도 이제 정상 동작한다.

---

## 10. 정리와 React 예고 (5분)

```bash
npm create vite@latest 프로젝트명   # 프로젝트 만들기
cd 프로젝트명
npm install                          # 패키지 설치
npm run dev                          # 개발 서버 (5173)
npm run build                        # 배포용 빌드 (dist)
npm run api                          # json-server (3000, 직접 추가한 스크립트)
```

**React 프로젝트도 똑같이 시작한다.**

```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
```

**예상 질문**
- "5173 포트가 이미 사용 중이래요" → 이전에 켠 dev 서버가 남아 있다. 다른 터미널에서 `Ctrl + C` 또는 Vite가 자동으로 5174를 사용한다.
- "fetch가 Failed to fetch예요" → json-server 터미널(`npm run api`)이 켜져 있는지 확인
- "db.json을 고쳤는데 반영이 안 돼요" → json-server 터미널을 껐다 다시 켠다.

**실습 연결** : 04_mission.md (11-04 메모장을 Vite + 모듈 + json-server로 옮기기)
