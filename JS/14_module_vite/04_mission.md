# 04. 미션 - 메모장을 Vite + 모듈 + json-server로 옮기기

> **[수업 콘티]** 권장 40분 + 과제
> 11_Form_WebStorage/04_memo_app 메모장을 아래처럼 바꾼다.
>
> | 항목 | 변경 전 (11-04) | 변경 후 (이번 미션) |
> |---|---|---|
> | 실행 | html 파일 더블클릭 | `npm run dev` (Vite) |
> | 파일 | memo_app.js 한 파일 | main.js / api.js / render.js 로 분리 (모듈) |
> | 저장 | localStorage | json-server (db.json 파일에 실제 저장) |
>
> 정답 프로젝트 : `04_mission_answer` 폴더 (아래 "정답 실행 방법" 참고)
> 진행 : 단계 1 ~ 4는 수업 시간에 함께, 단계 5 ~ 8은 과제

---

## 단계 1. 프로젝트 만들기

```bash
npm create vite@latest memo-app -- --template vanilla
cd memo-app
npm install
npm install -D json-server
```

- `src/` 안의 예제 파일(counter.js, 이미지 등)은 지운다.
- `package.json`의 scripts에 `"api": "json-server db.json --port 3000"` 을 추가한다.
- 터미널 2개 : `npm run dev` / `npm run api`

---

## 단계 2. db.json 만들기

프로젝트 최상위에 만든다. 메모 하나의 모양은 11-04와 같다.

```json
{
  "memos": [
    { "id": "1", "title": "장보기", "content": "우유, 계란", "important": false, "date": "2026. 11. 12." },
    { "id": "2", "title": "React 준비", "content": "구조 분해, 전개 연산자 복습", "important": true, "date": "2026. 11. 12." }
  ]
}
```

`http://localhost:3000/memos` 를 브라우저에서 열어 확인한다.

---

## 단계 3. index.html

11-04의 `<body>` 내용(폼, 검색, 목록)을 Vite의 `index.html`에 옮기고, 스크립트를 아래처럼 연결한다.

```html
<script type="module" src="/src/main.js"></script>
```

CSS는 `src/style.css`로 옮긴다. (main.js에서 `import "./style.css";` 또는 index.html에서 `<link>`)

---

## 단계 4. api.js - 서버 요청만 담당하는 모듈

13_fetch의 `request()` 함수를 옮기고, 메모용 함수를 **export** 한다.

```js
// src/api.js
const BASE_URL = "http://localhost:3000";

async function request(method, path, data) { /* 13_fetch 02 섹션 5와 동일 */ }

export function getMemos() { ... }              // GET    /memos
export function createMemo(memo) { ... }        // POST   /memos
export function updateMemo(id, changes) { ... } // PATCH  /memos/:id
export function deleteMemo(id) { ... }          // DELETE /memos/:id
```

- `request` 함수는 export 하지 않는다. (api.js 안에서만 사용)

---

## 단계 5. render.js - 화면 그리기만 담당하는 모듈

11-04의 `render()`를 옮긴다. 단, **데이터를 매개변수로 받도록** 바꾼다.

```js
// src/render.js
export function renderMemos(listElement, memos) { ... }
export function renderCount(countElement, total, shown) { ... }
```

- render.js는 서버도, 전역 변수도 모른다. 받은 데이터로 화면만 그린다.
- 이렇게 "데이터를 받아서 화면을 그리는 함수"가 React 컴포넌트의 기본 개념이다.

---

## 단계 6. main.js - 이벤트와 흐름

```js
// src/main.js
import { getMemos, createMemo, updateMemo, deleteMemo } from "./api.js";
import { renderMemos, renderCount } from "./render.js";

let memos = [];
let editingId = null;
```

- 시작 : `getMemos()` → memos에 저장 → 화면 그리기
- 추가 / 수정 / 삭제 / 중요 표시 : **서버 요청 성공 → memos 배열 수정 → 다시 그리기**
- 검색, 중요만 보기 : 서버 요청 없이 memos를 filter해서 다시 그리기

---

## 단계 7. 로딩과 에러

- 처음 불러올 때 "불러오는 중..."
- json-server를 끄고(`Ctrl + C`) 새로고침 → "서버에 연결할 수 없습니다. (npm run api 실행 확인)" 표시
- 저장 중에는 버튼 비활성화

---

## 단계 8. 확인

- [ ] 메모 추가 → F5 → 유지된다
- [ ] db.json 파일을 열면 추가한 메모가 들어 있다
- [ ] 수정, 삭제, 중요 표시 후 F5 → 유지된다
- [ ] json-server를 끄면 에러 메시지가 보인다
- [ ] `npm run build` 가 오류 없이 끝난다

---

## 정답 실행 방법 (04_mission_answer)

```bash
cd 04_mission_answer
npm install
```

터미널 2개에서 각각 실행한다.

```bash
npm run api
```

```bash
npm run dev
```

> 정답 폴더에는 `node_modules`가 없다. (02에서 배운 대로 `npm install`로 만든다)

---

## React 수업과의 연결

| 이번 미션 | React |
|---|---|
| `memos` 배열 + `renderMemos()` 직접 호출 | `useState` + React가 자동으로 다시 그림 |
| `render.js`의 함수 | 컴포넌트 (`function MemoList({ memos }) { ... }`) |
| `main.js`의 처음 불러오기 | `useEffect` 안에서 fetch |
| `api.js` | React에서도 그대로 사용 |
