/*
=====================================================================================
[수업 콘티] 15_module_vite / 01. 모듈 (import / export)       권장 60분 (설명 40 + 실습 20)
=====================================================================================
< 준비 >
- VS Code 확장 프로그램 "Live Server" 설치 (확장 탭에서 검색 → Ritwick Dey 제작)
- 01_module 폴더 구조를 먼저 보여 준다.
    01_module/
    ├── index.html
    ├── main.js          ← 시작 파일 (이 파일)
    ├── cart.js          ← default export
    └── utils/
        ├── format.js    ← named export
        ├── math.js      ← 한꺼번에 export
        └── logger.js    ← 한 번만 실행 확인용

< 진행 순서 >
1) 왜 모듈이 필요한가 (8분) - 섹션 1
   - 지금까지 : <script> 여러 개 → 모든 변수가 전역, 순서가 바뀌면 오류, 이름 충돌
   - 모듈 : 파일마다 독립된 공간, 필요한 것만 내보내고(export) 가져온다(import)

2) file://에서는 동작하지 않는다 (5분) - 섹션 2  ★ 먼저 실패를 보여 준다
   ▶ 시연 : index.html을 탐색기에서 더블클릭 → 화면은 나오지만 아무 동작 없음
            콘솔 : "Access to script ... from origin 'null' has been blocked by CORS policy"
   ▶ 시연 : VS Code에서 index.html 우클릭 → "Open with Live Server" → http://127.0.0.1:5500 으로 열림 → 정상 동작
   ▶ 포인트 : 모듈은 웹 서버(http://)로 열어야 한다. (Vite도 같은 이유로 개발 서버를 띄운다)

3) named export (10분) - 섹션 3, utils/format.js
   ▶ 시연 : 화면에 "12,000원 / 2026.11.12 / 22:46" 형식 출력
   ▶ 포인트 : import { 이름 } from "경로" - 중괄호 안 이름은 export한 이름과 같아야 한다.
              export하지 않은 pad()는 가져올 수 없다. (주석 해제해서 오류 보여 주기)

4) 한꺼번에 export / as / * as (5분) - 섹션 3, utils/math.js
   ▶ 콘솔 확인 : "세금 포함 : 11000", "math 객체 : Module {...}"

5) default export (10분) - 섹션 4, cart.js
   ▶ 시연 : [텀블러 담기] [머그컵 담기] → "2개 / 20,500원 (세금 포함 22,550원)" / [비우기]
   ▶ 포인트 : default는 중괄호 없이, 이름은 자유. 파일당 하나. (React 컴포넌트가 모두 이 방식)

6) 모듈 스코프 (3분) - 섹션 5
   ▶ 콘솔에서 직접 입력 : cart → ReferenceError (모듈 안의 변수는 전역이 아니다)

7) 경로 규칙 (3분) - 섹션 6
   - 브라우저 : "./" 와 ".js" 필수 / Vite : 확장자 생략 가능, "dayjs" 같은 패키지 이름 import 가능

8) 한 번만 실행 (3분) - 섹션 8
   ▶ 콘솔 확인 : "[logger.js] 실행됨"이 main.js와 cart.js가 모두 import 했는데도 한 번만 출력
            장바구니에 담으면 화면의 로그 목록에 cart.js가 남긴 기록도 함께 보임 (같은 logs 배열 공유)

< 예상 질문 / 자주 막히는 곳 >
- 경로에 ./ 를 빼먹음 → "Failed to resolve module specifier"
- 확장자 .js 를 빼먹음 → 404 (브라우저에서는 필수)
- export default를 import { createCart } 로 가져오는 실수 (default는 중괄호 없이)
- HTML의 onclick="함수()" 에서 모듈 안의 함수를 못 찾음 → 모듈 함수는 전역이 아니다. addEventListener 사용

< 실습 연결 >
- 별도 실습 파일 없음. 04_mission(메모장 Vite 이전)에서 api.js / render.js / main.js로 직접 나눠 본다.
=====================================================================================
*/


/*
    < 1. 왜 모듈이 필요한가? >

    지금까지의 방식
        <script src="a.js"></script>
        <script src="b.js"></script>
    - 모든 파일의 변수와 함수가 전역에 섞인다. (이름이 겹치면 덮어씀)
    - 파일 순서가 바뀌면 "함수가 정의되지 않음" 오류가 난다.
    - 어떤 파일이 어떤 파일에 의존하는지 코드만 봐서는 알 수 없다.

    모듈 방식
    - 파일 하나 = 모듈 하나. 각 파일은 독립된 공간을 가진다.
    - 다른 파일에 공개할 것만 export, 필요한 것만 import
    - 파일 맨 위 import만 보면 무엇에 의존하는지 바로 알 수 있다.
*/


/*
    < 2. 모듈 사용법과 주의점 >

    HTML : <script type="module" src="main.js"></script>
    - type="module"이면 defer가 자동 적용된다.
    - 시작 파일(main.js) 하나만 연결하면, 나머지는 import를 따라 자동으로 불러온다.

    주의 : 모듈은 file://(더블클릭)로 열면 보안 정책(CORS) 때문에 동작하지 않는다.
           → VS Code Live Server 같은 웹 서버로 열어야 한다.
*/


/*
    < 3. named export / import >

    내보내기 (utils/format.js)
        export function formatPrice(price) { ... }

    가져오기
        import { formatPrice, formatDate } from "./utils/format.js";

    - 중괄호 안의 이름은 export한 이름과 같아야 한다.
    - as로 이름을 바꿔 가져올 수 있다.       import { sum as total } from ...
    - * as 로 전부 하나의 객체로 가져올 수 있다. import * as math from ...
*/

import { formatPrice, formatDate, formatTime } from "./utils/format.js";
import { TAX_RATE, withTax } from "./utils/math.js";
import * as math from "./utils/math.js";
// import { pad } from "./utils/format.js";   // 오류 : export하지 않은 함수는 가져올 수 없다.

const now = new Date();

document.querySelector("#formatResult").textContent =
    formatPrice(12000) + " / " + formatDate(now) + " / " + formatTime(now);

console.log("세율 : " + TAX_RATE);
console.log("세금 포함 : " + withTax(10000));      // 11000
console.log("math 객체 :", math);                   // Module { TAX_RATE, sum, withTax }
console.log("math.sum : " + math.sum([1, 2, 3]));  // 6


/*
    < 4. default export / import >

    내보내기 (cart.js)
        export default function createCart() { ... }

    가져오기 : 중괄호 없이, 이름은 자유롭게
        import createCart from "./cart.js";
        import makeCart from "./cart.js";      // 이것도 가능 (같은 함수)

    - 파일 하나에 default는 하나만 있을 수 있다.
    - React 컴포넌트 파일은 보통 export default function App() { ... } 형태이다.

    named와 default 함께 가져오기
        import createCart, { 다른이름 } from "./cart.js";
*/

import createCart from "./cart.js";
import { addLog, getLogs } from "./utils/logger.js";

const cart = createCart();
const cartResult = document.querySelector("#cartResult");

function renderCart() {
    const items = cart.getItems();

    if (items.length === 0) {
        cartResult.textContent = "장바구니가 비어 있습니다.";
    } else {
        const total = cart.getTotal();
        cartResult.textContent =
            items.length + "개 / " + formatPrice(total) +
            " (세금 포함 " + formatPrice(withTax(total)) + ")";
    }

    renderLogs();
}

document.querySelectorAll("button[data-name]").forEach(function(button) {
    button.addEventListener("click", function() {
        cart.add(button.dataset.name, Number(button.dataset.price));
        renderCart();
    });
});

document.querySelector("#clearCart").addEventListener("click", function() {
    cart.clear();
    renderCart();
});


/*
    < 5. 모듈 스코프 >

    모듈 안에서 선언한 변수, 함수는 전역(window)에 등록되지 않는다.
    → 콘솔에서 cart 를 입력하면 ReferenceError
    → HTML의 onclick="함수()"로는 모듈 안의 함수를 호출할 수 없다. (addEventListener 사용)

    모듈은 자동으로 엄격 모드(strict mode)로 실행된다.
*/

console.log("window.cart : " + window.cart);   // undefined


/*
    < 6. 경로 규칙 >

    브라우저에서 직접 실행할 때
    - 상대 경로는 ./ 또는 ../ 로 시작해야 한다.   "./cart.js"  (O)   "cart.js" (X)
    - 확장자 .js 를 반드시 붙인다.                "./cart.js"  (O)   "./cart"  (X)

    Vite 같은 개발 도구를 사용할 때 (03에서 학습)
    - 확장자를 생략할 수 있다.                    import createCart from "./cart";
    - npm으로 설치한 패키지는 이름으로 가져온다.   import dayjs from "dayjs";
*/


/*
    < 7. 실전 파일 나누기 예시 (04 미션에서 직접 해 본다) >

    src/
    ├── main.js     : 시작 파일. 이벤트 연결, 전체 흐름
    ├── api.js      : 서버 요청 함수 (fetch)          → export function getMemos() ...
    ├── render.js   : 화면 그리기 함수                 → export function renderMemos(memos) ...
    └── utils.js    : 날짜, 가격 표시 등 공통 함수

    "하는 일"을 기준으로 나눈다. React에서는 화면 조각(컴포넌트) 하나가 파일 하나가 된다.
*/


/*
    < 8. 모듈은 한 번만 실행된다 >

    logger.js를 main.js와 cart.js가 모두 import 하지만
    - logger.js 코드는 처음 import될 때 한 번만 실행된다. (콘솔 메시지 1번)
    - logs 배열도 하나만 만들어져 두 파일이 같은 배열을 공유한다.
*/

const logResult = document.querySelector("#logResult");

function renderLogs() {
    const logs = getLogs();
    logResult.textContent = logs.length === 0 ? "로그 없음" : logs.join(" → ");
}

addLog("main.js : 시작");
renderLogs();
