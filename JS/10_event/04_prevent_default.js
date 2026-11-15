/*
=====================================================================================
[수업 콘티] 10_event / 04. 기본 동작 막기 (preventDefault)    권장 60분 (설명 30 + 실습 30)
=====================================================================================
< 준비 >
- 04_prevent_default.html을 열고 F12 → Console 탭.
- 이 수업은 final.js(회원가입 과제)의 onsubmit / return false 와 직접 연결된다.

< 진행 순서 >
1) 기본 동작이란? (5분) - 섹션 1
   - 표 설명 : 링크는 이동, 폼은 전송(새로고침), 키는 입력, 우클릭은 메뉴

2) 링크 이동 막기 (5분) - 섹션 2
   ▶ 시연 : [마이페이지] 클릭 → alert "로그인이 필요한 메뉴입니다." → 이동하지 않음
   ▶ 시연 : isLogin을 true로 바꾸고 새로고침 → 클릭하면 실제로 이동 → false로 원복

3) 폼 전송 막기 - 로그인 검사 (10분) - 섹션 3  ★ 가장 중요
   ▶ 시연 : 빈 상태로 [로그인] → "아이디를 입력하세요."
            아이디 입력, 비밀번호 "12" 입력 후 Enter → "비밀번호는 4자 이상 입력하세요."
            → 버튼이 아니라 Enter로도 검사되는 것을 강조 (그래서 click이 아닌 submit)
            아이디, 비밀번호 4자 이상 → "검사 통과!"
   ▶ 시연 : submit 리스너 맨 아래의 event.preventDefault(); 한 줄을 주석 처리 → 통과 시 전송
            → login.jsp가 없어 오류 페이지가 뜨지만, 주소창에 ?loginId=...&loginPw=... 가 붙은 것을 보여 준다.
            (name 속성이 있는 값이 서버로 전송된다는 것) → 원복

4) return false 방식 (5분) - 섹션 4  ★ final.js 방식
   ▶ 시연 : 검색어 없이 [검색] → alert "검색어를 입력하세요." / 입력 후 → alert 검색어
   ▶ 포인트 : document.폼name.입력name 접근 방법 (final.js와 동일)
              addEventListener에서는 return false가 동작하지 않는다!

5) 숫자만 입력 (4분) - 섹션 5
   ▶ 시연 : 전화번호 칸에 문자 입력 → 입력되지 않고 콘솔 "입력 불가 키: a"
            Backspace, 방향키는 정상 동작 / 한글은 완벽히 막히지 않는다는 점도 언급

6) 우클릭 막기 (1분) - 섹션 6

< 예상 질문 / 자주 막히는 곳 >
- 폼 검사를 버튼 click에 등록하는 실수 → Enter 제출을 못 막는다. 반드시 form의 submit
- return false를 addEventListener 안에서 쓰는 실수
- preventDefault와 stopPropagation 혼동 → 다음 수업(05)에서 비교

< 실습 연결 : 04_prevent_default_test.html / .js >
- 섹션 3까지 : 문제 1 ~ 5
- 섹션 6까지 : 문제 6, 7
- 수업 마지막 : 문제 8 (회원가입 - 모든 오류 동시 표시), 9, 10 (메신저 Enter 전송)
  → 문제 8은 final.js 과제 직전 연습으로 활용하기 좋다.
=====================================================================================
*/


/*
    04_prevent_default.js

    < 1. 기본 동작이란? >

    일부 HTML 요소는 JavaScript를 작성하지 않아도
    브라우저가 "원래 하는 동작"이 있다. 이것을 기본 동작이라고 한다.

    요소 / 이벤트               기본 동작
    ------------------------------------------------------
    <a href> 클릭               href 주소로 이동
    <form> submit               action 주소로 전송 (페이지 새로고침)
    키보드 입력 (keydown)       입력창에 글자 입력
    마우스 우클릭 (contextmenu) 브라우저 메뉴 표시

    event.preventDefault()
    : 이 기본 동작을 "취소"한다.

    언제 쓰나?
    - 입력값이 잘못되면 폼 전송을 막을 때 (가장 많이 사용)
    - 조건에 따라 링크 이동을 막을 때
    - 특정 키 입력을 막을 때
*/


/*
    < 2. 링크 이동 막기 >

    실제 예) 로그인하지 않은 사용자가 마이페이지를 누르면
             이동을 막고 안내한다.
*/

const myPageLink = document.querySelector("#myPageLink");
let isLogin = false;   // 로그인 상태라고 가정하는 변수

myPageLink.addEventListener("click", function(event) {
    if (!isLogin) {
        event.preventDefault();   // 링크 이동 취소
        alert("로그인이 필요한 메뉴입니다.");
    }
});


/*
    < 3. 폼 전송 막기 - 가장 중요 >

    폼 검사는 버튼의 click이 아니라 form의 submit 이벤트에 등록한다.
    → 버튼 클릭뿐 아니라 입력창에서 Enter를 눌러도 submit이 발생하기 때문

    흐름
    1. form에 submit 이벤트 등록
    2. 입력값 검사
    3. 잘못되었으면 event.preventDefault()로 전송 취소 + 안내
    4. 모두 통과하면 아무것도 하지 않음 → 원래대로 전송됨

    실제 예) 로그인 폼 - 아이디, 비밀번호가 비어 있으면 전송 막기
*/

const loginForm = document.querySelector("#loginForm");
const loginId = document.querySelector("#loginId");
const loginPw = document.querySelector("#loginPw");
const loginMsg = document.querySelector("#loginMsg");

loginForm.addEventListener("submit", function(event) {
    if (loginId.value.trim() === "") {
        event.preventDefault();
        loginMsg.textContent = "아이디를 입력하세요.";
        loginId.focus();
        return;
    }

    if (loginPw.value.length < 4) {
        event.preventDefault();
        loginMsg.textContent = "비밀번호는 4자 이상 입력하세요.";
        loginPw.focus();
        return;
    }

    // 여기까지 오면 검사 통과 → 폼이 login.jsp로 전송된다.
    // (실습 파일에는 login.jsp가 없으므로 수업에서는 아래 줄로 전송을 막고 확인한다.)
    event.preventDefault();
    loginMsg.textContent = "검사 통과! 실제로는 이 시점에 서버로 전송됩니다.";
});


/*
    < 4. return false 방식 (final.js에서 사용) >

    onsubmit 프로퍼티 방식에서는 return false로 전송을 취소할 수 있다.

    form.onsubmit = function() {
        if (조건) {
            return false;   // 전송 취소
        }
    };

    주의 : addEventListener()에서는 return false가 동작하지 않는다!
           addEventListener()를 사용할 때는 반드시 event.preventDefault()를 사용한다.

    폼 선택 방법 : document.폼name → <form name="searchForm">
                  document.searchForm.keyword → 폼 안의 name="keyword" 입력창
*/

document.searchForm.onsubmit = function() {
    const keyword = document.searchForm.keyword.value.trim();

    if (keyword === "") {
        alert("검색어를 입력하세요.");
        document.searchForm.keyword.focus();
        return false;   // 전송 취소
    }

    alert("'" + keyword + "' 검색 (실습에서는 전송을 막습니다)");
    return false;
};


/*
    < 5. 키 입력 막기 - 숫자만 입력받기 >

    keydown에서 preventDefault()를 하면 해당 키가 입력되지 않는다.

    실제 예) 전화번호 입력창에 숫자만 입력
    - 숫자(0~9)는 허용
    - Backspace, Delete, 방향키, Tab은 허용 (수정, 이동을 위해 필요)
    - 그 외의 키는 막는다.
*/

const phone = document.querySelector("#phone");
const allowKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

phone.addEventListener("keydown", function(event) {
    const isNumber = event.key >= "0" && event.key <= "9" && event.key.length === 1;

    if (!isNumber && !allowKeys.includes(event.key)) {
        event.preventDefault();
        console.log("입력 불가 키: " + event.key);
    }
});

// 참고 : 한글은 keydown으로 완벽히 막기 어렵다.
//        <input type="tel">을 함께 사용하거나, input 이벤트에서 숫자가 아닌 문자를 지우는 방법도 있다.


/*
    < 6. 우클릭 메뉴 막기 >

    contextmenu : 마우스 우클릭 시 발생
*/

const noRightClick = document.querySelector("#noRightClick");

noRightClick.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    console.log("우클릭이 차단되었습니다.");
});


/*
    < 7. 정리 >

    event.preventDefault()
    - 브라우저의 기본 동작(이동, 전송, 입력 등)을 취소한다.
    - 폼 검사 → form의 submit 이벤트에서 사용 (click X)
    - addEventListener()에서는 return false 대신 반드시 preventDefault()

    주의
    - preventDefault()는 "기본 동작"만 막는다.
    - 이벤트가 부모로 전달되는 것(전파)은 막지 않는다. → 05에서 학습
*/
