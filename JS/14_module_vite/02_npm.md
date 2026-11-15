# 02. Node.js와 npm

> **[수업 콘티]** 권장 60분 (설명 + 따라 하기)
> 이 수업은 코드보다 **터미널 명령**이 중심이라 Markdown으로 작성했다. VS Code에서 `Ctrl + Shift + V`로 미리보기를 열고, 명령은 코드 블록에서 복사한다.
> 진행 방식 : 강사가 한 단계씩 실행 → 학생이 따라 실행 → 결과 확인 후 다음 단계

---

## 0. 오늘 배우는 것과 이유 (5분)

| 용어 | 한 줄 설명 | 비유 |
|---|---|---|
| **Node.js** | 브라우저 밖(내 컴퓨터)에서 JavaScript를 실행하는 프로그램 | JS 실행기 |
| **npm** | 다른 사람이 만든 코드(패키지)를 설치하고 관리하는 도구 | 앱 스토어 |
| **패키지** | npm으로 설치하는 코드 묶음 (dayjs, react, vite ...) | 앱 |
| **package.json** | 이 프로젝트가 어떤 패키지를 쓰는지 적은 목록 | 장바구니 영수증 |

**왜 필요한가?**
React, Vite, json-server는 모두 npm으로 설치한다. React 수업의 첫 명령도 `npm create vite@latest`이다.

---

## 1. Node.js 설치 확인 (5분)

1. https://nodejs.org 에서 **LTS** 버전을 설치한다.
2. VS Code 터미널(`` Ctrl + ` ``)에서 확인한다.

```bash
node -v
npm -v
```

- 버전 번호가 나오면 성공이다.
- **Vite를 쓰려면 Node.js 20.19 이상 또는 22.12 이상이 필요하다.** 버전이 낮으면 LTS로 다시 설치한다.

> ▶ 자주 막히는 곳 : 설치 직후 `'node'은(는) ... 명령이 아닙니다` → VS Code를 완전히 껐다 켠다. (환경 변수 반영)
> ▶ Windows PowerShell에서 `npm ... 이 시스템에서 스크립트를 실행할 수 없으므로` 오류 → 터미널 오른쪽 위 `+` 옆 ▼ 에서 **Command Prompt**로 바꾸거나, 관리자 PowerShell에서 `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` 실행

---

## 2. Node.js로 JS 파일 실행해 보기 (5분)

`hello.js` 파일을 만들고 실행한다.

```js
// hello.js
const name = "Node.js";
console.log("안녕하세요, " + name + "!");
console.log(1 + 2);
```

```bash
node hello.js
```

- 결과가 **브라우저 콘솔이 아니라 터미널**에 출력된다.
- Node.js에는 `document`, `window`가 없다. (브라우저가 아니므로) → `console.log(document)` 를 넣어 오류를 보여 준다.

---

## 3. 프로젝트 시작 : npm init (5분)

```bash
mkdir npm-practice
cd npm-practice
npm init -y
```

- `package.json` 파일이 생긴다. 열어서 함께 본다.

```json
{
  "name": "npm-practice",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

- `-y` : 질문에 모두 기본값(yes)으로 답한다.

---

## 4. 패키지 설치 : npm install (10분)

날짜를 쉽게 다루는 `dayjs` 패키지를 설치한다.

```bash
npm install dayjs
```

설치 후 바뀐 것 3가지를 확인한다.

| 생긴 것 | 설명 |
|---|---|
| `package.json`의 `dependencies` | `"dayjs": "^1.11.x"` 가 추가됨 → "이 프로젝트는 dayjs가 필요하다"는 기록 |
| `node_modules/` 폴더 | 실제 패키지 코드가 저장되는 곳 (매우 크다) |
| `package-lock.json` | 설치된 정확한 버전 기록 (직접 수정하지 않는다) |

`app.js`를 만들어 사용해 본다.

```js
// app.js
const dayjs = require("dayjs");

console.log(dayjs().format("YYYY-MM-DD HH:mm"));
console.log(dayjs().add(7, "day").format("다음 주 : YYYY년 MM월 DD일"));
```

```bash
node app.js
```

> ▶ 포인트 : `require`는 Node.js의 예전 모듈 방식이다. 브라우저와 Vite에서는 01에서 배운 `import`를 쓴다.

---

## 5. node_modules는 공유하지 않는다 (5분) ★ 중요

- `node_modules`는 용량이 크고, `package.json`만 있으면 언제든 다시 만들 수 있다.
- 그래서 **Git에 올리지 않고, 과제 제출 시 압축에서도 빼게 한다.**

**시연**
1. `node_modules` 폴더를 삭제한다. → `node app.js` 실행 → 오류 (`Cannot find module 'dayjs'`)
2. 아래 명령 한 줄로 복구한다.

```bash
npm install
```

- `npm install` (패키지 이름 없이) = `package.json`에 적힌 패키지를 모두 설치

**.gitignore** 파일을 만들어 Git에서 제외한다.

```
node_modules
dist
```

---

## 6. 개발용 패키지 : -D (5분)

개발할 때만 필요하고, 완성된 사이트에는 들어가지 않는 도구는 `-D` (devDependencies)로 설치한다.

```bash
npm install -D json-server
```

| 구분 | 설치 명령 | 예시 |
|---|---|---|
| `dependencies` | `npm install 이름` | dayjs, react (사이트가 실행될 때 필요) |
| `devDependencies` | `npm install -D 이름` | vite, json-server (개발할 때만 필요) |

---

## 7. npm scripts : 자주 쓰는 명령에 이름 붙이기 (5분)

`package.json`의 `scripts`를 수정한다.

```json
"scripts": {
  "start": "node app.js",
  "api": "json-server db.json --port 3000"
}
```

```bash
npm run start
npm run api
```

- 긴 명령을 외우지 않아도 된다.
- Vite 프로젝트의 `npm run dev`, `npm run build`도 모두 이 scripts에 적혀 있다.
- 실행 중인 서버(json-server 등)는 터미널에서 `Ctrl + C`로 종료한다.

---

## 8. npx : 설치하지 않고 바로 실행 (3분)

```bash
npx json-server --version
npm create vite@latest
```

- `npx 이름` : 패키지를 임시로 받아 바로 실행한다. 한 번만 쓰는 도구에 사용한다.
- `npm create vite@latest` 도 내부적으로 같은 방식이다. (03에서 사용)

---

## 9. 버전 표기 읽기 (2분)

`"dayjs": "^1.11.13"` → **주(major).부(minor).수(patch)**

| 기호 | 의미 |
|---|---|
| `^1.11.13` | 1.x.x 안에서 최신으로 설치 가능 (가장 흔함) |
| `~1.11.13` | 1.11.x 안에서만 |
| `1.11.13` | 정확히 이 버전만 |

- 주 버전(major)이 바뀌면 사용법이 달라질 수 있다. (React 18 → 19, json-server 0.x → 1.x)

---

## 10. 정리 (5분)

```bash
node -v                  # Node.js 버전 확인
npm init -y              # package.json 만들기
npm install 이름          # 패키지 설치 (dependencies)
npm install -D 이름       # 개발용 패키지 설치 (devDependencies)
npm install              # package.json 목록대로 모두 설치 (node_modules 복구)
npm run 스크립트이름       # scripts 실행
npx 이름                  # 설치 없이 실행
```

**예상 질문**
- "다른 사람 프로젝트를 받았는데 실행이 안 돼요" → 먼저 `npm install`
- "npm install을 어디서 해요?" → **package.json이 있는 폴더**에서 (터미널 경로 확인 : `cd`)
- "전역 설치(-g)는요?" → 이 과정에서는 쓰지 않는다. 프로젝트마다 설치하거나 npx 사용

**실습 연결** : 별도 실습 파일 없음. 03 Vite와 04 미션에서 계속 사용한다.
