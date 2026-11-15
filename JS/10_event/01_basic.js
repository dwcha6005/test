/*
=====================================================================================
[수업 콘티] 10_event / 01. 이벤트 기초                    권장 60분 (설명 35 + 실습 25)
=====================================================================================
< 준비 >
- 01_basic.html을 브라우저로 열고 F12 → Console 탭을 띄워 둔다.
- VS Code에서 01_basic.js를 옆에 띄우고, 섹션 번호 순서대로 내려가며 설명한다.

< 진행 순서 >
1) 도입 (5분) - 섹션 1
   - 판서 : "어떤 요소에서 + 어떤 일이 일어나면 + 무엇을 실행한다"
   - 등록 방법이 3가지라는 것만 먼저 알려 주고 하나씩 보여 준다.

2) 방법 1 : HTML 속성 (5분) - 섹션 2
   ▶ 시연 : [인사하기] 클릭 → 화면 "안녕하세요!" / 콘솔 "방법 1: HTML 속성으로 실행"
   ▶ 포인트 : HTML 안에 JS가 섞인다. 함수는 전역 함수여야 한다.

3) 방법 2 : 이벤트 프로퍼티 (5분) - 섹션 3
   ▶ 시연 : [프로퍼티 방식] 클릭 → 콘솔에 "방법 2: 두 번째 함수" 한 줄만 출력
   ▶ 질문 던지기 : "함수를 2개 등록했는데 왜 하나만 나올까?" → 덮어쓰기
   ▶ 포인트 : final.js(회원가입 과제)가 이 방식으로 작성되어 있다.

4) 방법 3 : addEventListener (5분) - 섹션 4
   ▶ 시연 : [addEventListener 방식] 클릭 → "첫 번째 함수", "두 번째 함수" 둘 다 출력
   ▶ 포인트 : 이벤트 이름에 on을 붙이지 않는다. ("click")

5) 비교표 (5분) - 섹션 5
   - 표를 그대로 판서하거나 화면에 띄운다. "새 코드는 addEventListener"로 정리.

6) 자주 하는 실수 (3분) - 섹션 6
   ▶ 시연 : 주석 처리된 showMessage() 줄의 주석을 풀고 저장 → 새로고침
            → 클릭하지 않았는데 콘솔에 바로 출력, 클릭해도 반응 없음 → 다시 주석 처리

7) 이벤트 제거 (4분) - 섹션 7
   ▶ 시연 : [쿠폰 받기] 2번 클릭 → 문구가 바뀌고, 콘솔 "쿠폰 이벤트 제거됨"은 1번만 출력
   ▶ 포인트 : 제거하려면 "이름 있는 함수"로 등록해야 한다. once 옵션은 소개만.

8) 실행 시점 (5분) - 섹션 8
   ▶ 시연 : 새로고침 → 콘솔 맨 아래 "DOMContentLoaded" → "load" 순서 확인
   ▶ 시연 : 01_basic.html의 script 태그에서 defer를 지우고 새로고침
            → 콘솔에 TypeError (Cannot set properties of null) → defer 원복
   ▶ 포인트 : final.js는 defer 대신 window.onload를 사용한다.

9) 실제 예 : 좋아요 버튼 (3분) - 섹션 9
   ▶ 시연 : [♡ 좋아요] 여러 번 클릭 → 숫자 증가, ♥로 변경 / [초기화] → 0, ♡

< 예상 질문 / 자주 막히는 곳 >
- "onclick에서도 on을 빼나요?" → 프로퍼티는 onclick, addEventListener만 "click"
- "화살표 함수로 써도 되나요?" → 된다. (this의 차이는 이후 수업에서)
- 함수 이름 뒤에 ()를 붙여서 등록하는 실수가 가장 많다. → 섹션 6 다시 보여 주기

< 실습 연결 : 01_basic_test.html / .js >
- 섹션 4까지 설명 후 : 문제 1 ~ 4 (기초)
- 섹션 7까지 설명 후 : 문제 5 ~ 7 (응용, 문제 6은 출력 예측 → 토론)
- 수업 마지막        : 문제 8 ~ 10 (심화, 문제 10은 window.onload + prompt)
=====================================================================================
*/


/*
    01_basic.js

    < 1. 이벤트란? >

    이벤트(Event)
    : 브라우저에서 일어나는 "사건"
    : 버튼 클릭, 키보드 입력, 입력값 변경, 페이지 로딩 완료 등

    이벤트 리스너(Event Listener) = 이벤트 핸들러(Event Handler)
    : 이벤트가 발생했을 때 실행할 함수

    이벤트 처리는 결국 다음 한 문장이다.

        "어떤 요소에서" + "어떤 일이 일어나면" + "무엇을 실행한다"
         btn               click                 function() { ... }

    이벤트를 등록하는 방법은 3가지가 있다.
    1) HTML 속성      : <button onclick="함수()">
    2) 이벤트 프로퍼티 : 요소.onclick = function() {}
    3) addEventListener : 요소.addEventListener("click", function() {})
*/


/*
    < 2. 방법 1 - HTML 속성 >

    <button onclick="sayHello()">인사하기</button>

    - HTML 태그에 직접 작성한다.
    - 가장 간단하지만 HTML과 JavaScript 코드가 섞인다.
    - 호출할 함수는 전역 함수여야 한다.
*/

function sayHello() {
    document.querySelector("#helloResult").textContent = "안녕하세요!";
    console.log("방법 1: HTML 속성으로 실행");
}


/*
    < 3. 방법 2 - 이벤트 프로퍼티 >

    요소.on이벤트명 = function() { ... };

    - JavaScript 코드 안에서 등록한다. (HTML과 분리)
    - final.js(회원가입 실습)에서 사용하는 방식이다.
    - 하나의 이벤트에 함수를 "하나만" 등록할 수 있다.
      → 다시 대입하면 이전 함수는 덮어써진다.
*/

const propertyBtn = document.querySelector("#propertyBtn");

propertyBtn.onclick = function() {
    console.log("방법 2: 첫 번째 함수");
};

propertyBtn.onclick = function() {
    console.log("방법 2: 두 번째 함수");
};

// 버튼을 클릭하면 "두 번째 함수"만 출력된다. (첫 번째는 덮어써짐)


/*
    < 4. 방법 3 - addEventListener() >

    요소.addEventListener("이벤트명", 실행할함수);

    - 이벤트명에는 on을 붙이지 않는다. ("click" O / "onclick" X)
    - 같은 이벤트에 함수를 여러 개 등록할 수 있다.
    - 실무에서 가장 많이 사용하는 방식이다.
*/

const listenerBtn = document.querySelector("#listenerBtn");

listenerBtn.addEventListener("click", function() {
    console.log("방법 3: 첫 번째 함수");
});

listenerBtn.addEventListener("click", function() {
    console.log("방법 3: 두 번째 함수");
});

// 버튼을 클릭하면 두 함수가 모두 순서대로 실행된다.


/*
    < 5. onclick 프로퍼티 vs addEventListener() 정리 >

    구분                  onclick = function(){}     addEventListener("click", fn)
    -------------------------------------------------------------------------------
    작성 형태             요소.onclick = 함수          요소.addEventListener("click", 함수)
    이벤트 이름           on 붙임 (onclick)           on 안 붙임 ("click")
    여러 개 등록          X (마지막 것만 남음)         O (모두 실행)
    제거 방법             요소.onclick = null          removeEventListener()
    기본 동작 취소        return false 가능            event.preventDefault() 사용

    정리
    - 간단한 화면, 기존 코드(final.js 등)에서는 onclick 프로퍼티도 많이 보인다.
    - 새로 작성하는 코드는 addEventListener()를 기본으로 사용한다.
*/


/*
    < 6. 자주 하는 실수 - 함수 뒤에 괄호() >

    btn.addEventListener("click", showMessage);    // O : 함수를 "전달"
    btn.addEventListener("click", showMessage());  // X : 함수를 "즉시 실행"

    괄호를 붙이면 클릭하기 전에 함수가 바로 실행되고,
    그 반환값(undefined)이 등록되어 클릭해도 아무 일도 일어나지 않는다.
*/

const mistakeBtn = document.querySelector("#mistakeBtn");

function showMessage() {
    console.log("실수 확인 버튼을 클릭했습니다.");
}

mistakeBtn.addEventListener("click", showMessage);      // 올바른 방법
// mistakeBtn.addEventListener("click", showMessage()); // 페이지 열자마자 실행됨


/*
    < 7. 이벤트 제거 - removeEventListener() >

    요소.removeEventListener("이벤트명", 등록했던함수);

    - 등록할 때와 "같은 함수"를 전달해야 제거된다.
    - 그래서 제거할 함수는 이름을 붙여서 만든다. (익명 함수는 제거 불가)

    실제 예) 쿠폰은 한 번만 받을 수 있다.
*/

const couponBtn = document.querySelector("#couponBtn");
const couponResult = document.querySelector("#couponResult");

function getCoupon() {
    couponResult.textContent = "10% 할인 쿠폰이 발급되었습니다.";
    couponBtn.textContent = "발급 완료";

    // 한 번 실행된 후 이벤트 제거
    couponBtn.removeEventListener("click", getCoupon);
    console.log("쿠폰 이벤트 제거됨");
}

couponBtn.addEventListener("click", getCoupon);

// 참고 : 한 번만 실행할 때는 once 옵션도 사용할 수 있다.
// couponBtn.addEventListener("click", getCoupon, { once: true });


/*
    < 8. 이벤트는 언제 등록해야 할까? >

    이벤트를 등록하려면 요소가 먼저 만들어져 있어야 한다.
    head에서 일반 script를 실행하면 아직 버튼이 없어서 null 오류가 난다.

    해결 방법 3가지 (모두 같은 목적)

    1) <script src="파일.js" defer></script>    ← 이 수업에서 사용
    2) window.onload = function() { ... }        ← final.js에서 사용
       : 이미지 등 모든 리소스까지 로딩된 후 실행
    3) document.addEventListener("DOMContentLoaded", function() { ... })
       : HTML 구조만 완성되면 바로 실행 (window.onload보다 빠름)
*/

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded : HTML 구조 완성");
});

window.addEventListener("load", function() {
    console.log("load : 이미지 등 모든 리소스 로딩 완료");
});


/*
    < 9. 실제 예 - 좋아요 버튼 >

    1. 좋아요 버튼을 누르면 숫자가 1 증가한다.
    2. 처음 누르면 ♡ → ♥ 로 바뀐다.
    3. 초기화 버튼을 누르면 0으로 돌아간다.
*/

const likeBtn = document.querySelector("#likeBtn");
const likeCount = document.querySelector("#likeCount");
const likeReset = document.querySelector("#likeReset");

let count = 0;

likeBtn.addEventListener("click", function() {
    count++;
    likeCount.textContent = count;
    likeBtn.textContent = "♥ 좋아요";
});

likeReset.addEventListener("click", function() {
    count = 0;
    likeCount.textContent = count;
    likeBtn.textContent = "♡ 좋아요";
});
