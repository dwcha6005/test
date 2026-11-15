/*
=====================================================================================
[수업 콘티] 10_event / 03. 자주 쓰는 이벤트                  권장 90분 (설명 55 + 실습 35)
=====================================================================================
< 준비 >
- 03_event_type.html을 열고 F12 → Console 탭.
- 섹션 0의 표를 먼저 화면에 띄우거나 판서한다. 오늘 배울 전체 지도이다.

< 진행 순서 >
1) 전체 지도 (5분) - 섹션 0
   - "이 표의 이벤트만 알아도 대부분의 화면을 만들 수 있다."

2) 마우스 - mouseenter / mouseleave (5분) - 섹션 1
   ▶ 시연 : 상품 박스에 마우스를 올리면 설명 표시, 빼면 숨김

3) 키보드 - keydown (8분) - 섹션 2
   ▶ 시연 : "이어폰" 입력 + Enter → "'이어폰' 검색 결과입니다."
            빈 칸으로 Enter → "검색어를 입력하세요."
   ▶ 팁 : keydown 시점에는 방금 누른 글자가 아직 value에 들어가지 않았다.
          (final.js가 비밀번호 검사에 keyup을 쓰는 이유) → 실시간 값 검사는 input이 가장 정확하다.

4) input - 글자 수 세기 (7분) - 섹션 3
   ▶ 시연 : 리뷰 입력 → "12 / 50" 실시간 변경, 50자를 넘기면 빨간색

5) change - 값이 확정될 때 (10분) - 섹션 4  ★ final.js 7번과 같은 기능
   ▶ 시연 : 이메일 도메인에서 gmail.com 선택 → 도메인 칸에 자동 입력 + 읽기 전용 (입력 안 됨)
            "직접입력" 선택 → 칸이 비고 커서가 들어감
   ▶ 시연 : 약관 체크 → [다음 단계] 활성화 / 해제 → 비활성화

6) input vs change 비교 (5분) - 섹션 5
   ▶ 시연 : 비교 입력창에 "abc" 입력 → 콘솔 input 3줄
            다른 곳 클릭 → change 1줄
   ▶ 포인트 : 실시간이면 input, 최종 값이면 change

7) focus / blur - 아이디 검사 (8분) - 섹션 6  ★ final.js 2번과 같은 기능
   ▶ 시연 : 아이디 칸 클릭 → 파란 안내 "4~8자로 입력하세요."
            "ab" 입력 후 다른 곳 클릭 → 빨간 "사용 불가능" / "hong12" → 초록 "사용 가능"

8) scroll - TOP 버튼 (7분) - 섹션 7
   ▶ 시연 : 아래로 스크롤 → 200px을 넘으면 오른쪽 아래 [▲ TOP] 표시 → 클릭 시 부드럽게 맨 위로

< 예상 질문 / 자주 막히는 곳 >
- "mouseover랑 뭐가 달라요?" → mouseover는 자식 요소를 지날 때마다 반복 발생
- select에서 click을 쓰는 실수 → 선택이 바뀌는 것은 change
- readonly를 JS에서는 readOnly(카멜 표기)로 쓴다. (final.js에도 같은 설명 있음)

< 실습 연결 : 03_event_type_test.html / .js >
- 섹션 4까지 : 문제 1 ~ 3
- 섹션 6까지 : 문제 4 ~ 8
- 수업 마지막 : 문제 9 (스크롤 진행률), 10 (Ctrl + Enter)
=====================================================================================
*/


/*
    03_event_type.js

    < 0. 자주 쓰는 이벤트 한눈에 보기 >

    분류      이벤트                      언제 발생?                    실제 사용 예
    ---------------------------------------------------------------------------------------
    마우스    click                       클릭                          버튼, 메뉴
              mouseenter / mouseleave     마우스가 들어옴 / 나감         미리보기, 툴팁
    키보드    keydown                     키를 누를 때                   Enter 검색, 단축키
              keyup                       키에서 손을 뗄 때              (final.js 비밀번호 검사)
    입력      input                       값이 바뀔 때마다 (실시간)       글자 수, 실시간 검사
              change                      값이 "확정"될 때               select, checkbox
    포커스    focus / blur                커서가 들어옴 / 나감           안내 문구, 입력값 검사
    폼        submit                      폼 전송                        → 04에서 학습
    화면      scroll                      스크롤할 때                    맨 위로 버튼
    문서      DOMContentLoaded / load     페이지 준비 완료               → 01에서 학습

    이 표의 이벤트만 알아도 대부분의 화면을 만들 수 있다.
*/


/*
    < 1. 마우스 - mouseenter / mouseleave >

    mouseenter : 마우스가 요소 안으로 들어올 때
    mouseleave : 마우스가 요소 밖으로 나갈 때

    실제 예) 상품에 마우스를 올리면 설명 보이기

    참고 : mouseover / mouseout도 비슷하지만 자식 요소를 지날 때마다
          반복해서 발생하므로, 보통 mouseenter / mouseleave를 사용한다.
*/

const productBox = document.querySelector("#productBox");
const productDesc = document.querySelector("#productDesc");

productBox.addEventListener("mouseenter", function() {
    productDesc.style.display = "block";
});

productBox.addEventListener("mouseleave", function() {
    productDesc.style.display = "none";
});


/*
    < 2. 키보드 - keydown >

    keydown : 키를 누르는 순간 발생
    keyup   : 키에서 손을 떼는 순간 발생

    실제 예) 검색창에서 Enter를 누르면 검색 실행
    (한글 조합 중 Enter 중복 방지 : event.isComposing → 02 참고)
*/

const searchInput = document.querySelector("#searchInput");
const searchResult = document.querySelector("#searchResult");

searchInput.addEventListener("keydown", function(event) {
    if (event.isComposing) {
        return;
    }

    if (event.key === "Enter") {
        const keyword = searchInput.value.trim();

        if (keyword === "") {
            searchResult.textContent = "검색어를 입력하세요.";
        } else {
            searchResult.textContent = "'" + keyword + "' 검색 결과입니다.";
        }
    }
});


/*
    < 3. input - 값이 바뀔 때마다 >

    input : 입력값이 바뀔 때마다 즉시 발생 (한 글자 입력할 때마다)

    실제 예) 리뷰 글자 수 세기, 50자를 넘으면 빨간색
*/

const review = document.querySelector("#review");
const reviewCount = document.querySelector("#reviewCount");

review.addEventListener("input", function() {
    const length = review.value.length;

    reviewCount.textContent = length + " / 50";

    if (length > 50) {
        reviewCount.classList.add("over");
    } else {
        reviewCount.classList.remove("over");
    }
});


/*
    < 4. change - 값이 확정될 때 >

    change : 값이 바뀌고 "확정"되었을 때 발생
    - select   : 다른 항목을 선택했을 때
    - checkbox : 체크 / 해제했을 때
    - input    : 값을 바꾼 뒤 포커스가 빠져나갈 때

    실제 예 1) 이메일 도메인 선택 → 도메인 입력창에 자동 입력 (final.js와 같은 기능)
    실제 예 2) 약관 동의 체크 → 다음 버튼 활성화
*/

const emailSelect = document.querySelector("#emailSelect");
const emailDomainInput = document.querySelector("#emailDomainInput");

emailSelect.addEventListener("change", function() {
    emailDomainInput.value = emailSelect.value;

    // "직접입력"(value가 "")이면 입력 가능, 그 외에는 읽기 전용
    if (emailSelect.value === "") {
        emailDomainInput.readOnly = false;
        emailDomainInput.focus();
    } else {
        emailDomainInput.readOnly = true;
    }
});

const agree = document.querySelector("#agree");
const nextBtn = document.querySelector("#nextBtn");

agree.addEventListener("change", function() {
    // 체크되면 disabled = false, 해제되면 disabled = true
    nextBtn.disabled = !agree.checked;
});


/*
    < 5. input vs change 비교 >

    같은 입력창에 두 이벤트를 모두 등록하고 콘솔을 확인한다.

    input  : "a", "ab", "abc" ... 한 글자마다 실행
    change : 입력을 마치고 다른 곳을 클릭했을 때 한 번 실행

    → 실시간 반응이 필요하면 input
    → 최종 값만 필요하면 change
*/

const compareInput = document.querySelector("#compareInput");

compareInput.addEventListener("input", function() {
    console.log("input : " + compareInput.value);
});

compareInput.addEventListener("change", function() {
    console.log("change : " + compareInput.value);
});


/*
    < 6. focus / blur >

    focus : 입력창에 커서가 들어올 때
    blur  : 입력창에서 커서가 빠져나갈 때

    실제 예) 회원가입 아이디 입력
    - focus : 입력 규칙 안내
    - blur  : 입력을 마치면 길이 검사 (final.js의 아이디 검사와 같은 방식)
*/

const userId = document.querySelector("#userId");
const userIdMsg = document.querySelector("#userIdMsg");

userId.addEventListener("focus", function() {
    userIdMsg.textContent = "4~8자로 입력하세요.";
    userIdMsg.style.color = "royalblue";
});

userId.addEventListener("blur", function() {
    const length = userId.value.length;

    if (length >= 4 && length <= 8) {
        userIdMsg.textContent = "사용 가능";
        userIdMsg.style.color = "green";
    } else {
        userIdMsg.textContent = "사용 불가능 (4~8자)";
        userIdMsg.style.color = "red";
    }
});


/*
    < 7. scroll - 맨 위로 버튼 >

    scroll : 스크롤할 때마다 발생 (window에 등록)
    window.scrollY : 현재 세로 스크롤 위치(px)

    실제 예) 200px 이상 내려가면 TOP 버튼 표시, 클릭하면 맨 위로 이동
*/

const topBtn = document.querySelector("#topBtn");

window.addEventListener("scroll", function() {
    if (window.scrollY > 200) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
