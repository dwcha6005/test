/*
=====================================================================================
[수업 콘티] 11_Form_WebStorage / 03. Web Storage              권장 90분 (설명 50 + 실습 40)
=====================================================================================
< 준비 >
- 03_web_storage.html을 열고 F12 → Application 탭 → Local Storage → file:// 항목을 펼쳐 둔다.
  (Console 탭과 Application 탭을 번갈아 보여 준다.)
- 이 파일은 열 때마다 visitCount가 1씩 증가한다. demo로 시작하는 key는 저장 후 바로 삭제된다.
- 주의 : [clear] 버튼은 같은 PC의 다른 실습 파일 저장값까지 모두 지운다.

< 진행 순서 >
1) 도입 (5분) - 섹션 1
   - "06_delegation의 할 일 목록은 새로고침하면 사라졌다" → 브라우저에 저장하는 방법
   - 비교표 : localStorage(영구) / sessionStorage(탭) / 쿠키(참고)

2) 기본 메서드 (10분) - 섹션 2
   ▶ 시연 : [setItem] → 아래 표와 Application 탭에 userName = 홍길동 추가
            [getItem] → "읽기 : userName → 홍길동"
            key를 "abc"로 바꾸고 [getItem] → null (없으면 null)
            [removeItem] → 삭제 / value를 바꿔 setItem → 덮어쓰기
   ▶ 포인트 : Application 탭에서 값을 직접 수정, 삭제할 수도 있다는 것을 보여 준다.

3) 문자열만 저장된다 (8분) - 섹션 3  ★ 가장 많이 틀리는 부분
   ▶ 콘솔 확인 : string / 1001 / 사과,배 / [object Object] / 101
   ▶ 질문 던지기 : "100 + 1이 왜 1001일까?" → 저장하는 순간 문자열이 된다.

4) JSON (8분) - 섹션 4
   ▶ 콘솔 확인 : {"name":"홍길동",...} 문자열 → 홍길동 → 게임 → []
   ▶ 판서 : 저장 JSON.stringify / 읽기 JSON.parse / 없을 때 || []

5) 저장 → 읽기 패턴 (2분) - 섹션 5
   - 판서 : ① 열릴 때 읽어서 반영 ② 바뀔 때 저장 → 아래 예제 3개가 모두 이 구조

6) local vs session (5분) - 섹션 6
   ▶ 시연 : F5 두 번 → 두 숫자 모두 증가
            탭을 닫고 같은 파일을 새 탭으로 다시 열기 → local은 이어서 증가, session은 1회부터

7) 실제 예 - 아이디 저장 (5분) - 섹션 7
   ▶ 시연 : 아이디 입력 + [아이디 저장] 체크 → [로그인] → F5 → 아이디와 체크 상태 유지
            체크 해제 후 로그인 → F5 → 아이디 사라짐 (Application에서 savedId 삭제 확인)
   ▶ 포인트 : 비밀번호는 절대 저장하지 않는다.

8) 실제 예 - 다크 모드 (3분) - 섹션 8
   ▶ 시연 : [다크 모드] → F5 → 다크 모드 유지

9) 실제 예 - 최근 검색어 (8분) - 섹션 9
   ▶ 시연 : a, b, c 검색 → 최신순 표시 / a를 다시 검색 → 중복 없이 맨 앞으로 이동
            6개 이상 검색 → 5개 유지 / ✕ 개별 삭제 / F5 → 유지
            Application에서 recentKeywords 값이 JSON 배열 문자열인 것 확인

10) 주의사항 (2분) - 섹션 10

< 예상 질문 / 자주 막히는 곳 >
- getItem 결과를 Number()나 JSON.parse() 없이 바로 사용하는 실수
- JSON.parse(null)은 null → || [] 기본값을 빼먹으면 null.push()에서 오류
- "다른 사이트에서 내 localStorage를 볼 수 있나요?" → 같은 출처(사이트)만 접근 가능

< 실습 연결 : 03_web_storage_test.html / .js (쇼핑몰 개인화) >
- 섹션 4까지 : 문제 1 ~ 4
- 섹션 8까지 : 문제 5 ~ 7
- 수업 마지막 : 문제 8 ~ 10 (최근 본 상품, 찜 토글, 리뷰 임시 저장)
- 학생들에게 "문제를 풀 때마다 F5로 유지되는지 확인"하도록 안내
=====================================================================================
*/


/*
    03_web_storage.js

    < 1. Web Storage란? >

    브라우저 안에 "key - value" 형태로 데이터를 저장하는 공간
    서버 없이도 새로고침이나 브라우저를 다시 열었을 때 값을 유지할 수 있다.

    실제 사용 예
    - 로그인 화면의 "아이디 저장"
    - 다크 모드, 글자 크기 같은 화면 설정
    - 최근 검색어, 최근 본 상품
    - 작성 중인 글 임시 저장, 장바구니 (비회원)

    구분              localStorage              sessionStorage           (참고) 쿠키
    -----------------------------------------------------------------------------------------
    유지 기간          직접 지울 때까지 영구       탭을 닫으면 삭제          만료일 지정
    공유 범위          같은 사이트의 모든 탭        현재 탭에서만             같은 사이트
    용량              약 5MB                     약 5MB                   약 4KB
    서버 전송          X                          X                        요청마다 자동 전송

    → 이 수업에서는 localStorage를 중심으로 배우고,
      sessionStorage는 사용법이 완전히 같으므로 차이만 확인한다.
*/


/*
    < 2. 기본 메서드 >

    localStorage.setItem("key", "value")   : 저장 (같은 key가 있으면 덮어씀)
    localStorage.getItem("key")            : 읽기 (없으면 null)
    localStorage.removeItem("key")         : 하나 삭제
    localStorage.clear()                   : 전체 삭제 (주의!)
    localStorage.length                    : 저장된 개수
    localStorage.key(인덱스)                : 인덱스 번째 key 이름

    아래 화면에서 버튼을 눌러 보고, 개발자 도구 Application 탭과 비교한다.
*/

const keyInput = document.querySelector("#keyInput");
const valueInput = document.querySelector("#valueInput");
const storageMsg = document.querySelector("#storageMsg");
const storageBody = document.querySelector("#storageTable tbody");

// 현재 localStorage에 저장된 모든 값을 표로 보여주는 함수
function renderStorage() {
    storageBody.replaceChildren();

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const tr = document.createElement("tr");
        const keyTd = document.createElement("td");
        const valueTd = document.createElement("td");

        keyTd.textContent = key;
        valueTd.textContent = localStorage.getItem(key);

        tr.append(keyTd, valueTd);
        storageBody.append(tr);
    }
}

document.querySelector("#setBtn").addEventListener("click", function() {
    localStorage.setItem(keyInput.value, valueInput.value);
    storageMsg.textContent = "저장 : " + keyInput.value + " = " + valueInput.value;
    renderStorage();
});

document.querySelector("#getBtn").addEventListener("click", function() {
    const value = localStorage.getItem(keyInput.value);
    storageMsg.textContent = "읽기 : " + keyInput.value + " → " + value;   // 없으면 null
});

document.querySelector("#removeBtn").addEventListener("click", function() {
    localStorage.removeItem(keyInput.value);
    storageMsg.textContent = "삭제 : " + keyInput.value;
    renderStorage();
});

document.querySelector("#clearBtn").addEventListener("click", function() {
    if (confirm("localStorage를 모두 삭제할까요? (다른 예제의 값도 삭제됩니다)")) {
        localStorage.clear();
        storageMsg.textContent = "전체 삭제";
        renderStorage();
    }
});


/*
    < 3. 가장 중요한 주의점 : 문자열만 저장된다 >

    Web Storage는 값을 무조건 "문자열"로 바꿔서 저장한다.

    저장한 값                     getItem() 결과
    ------------------------------------------------------
    100                          "100"               (숫자 → 문자열)
    true                         "true"
    ["사과", "배"]                "사과,배"            (배열 구조가 사라짐)
    { name: "홍길동" }            "[object Object]"   (내용이 사라짐!)
*/

localStorage.setItem("demoNumber", 100);
localStorage.setItem("demoArray", ["사과", "배"]);
localStorage.setItem("demoObject", { name: "홍길동" });

console.log(typeof localStorage.getItem("demoNumber"));  // string
console.log(localStorage.getItem("demoNumber") + 1);      // "1001" (문자열 연결)
console.log(localStorage.getItem("demoArray"));           // 사과,배
console.log(localStorage.getItem("demoObject"));          // [object Object]

// 숫자는 Number()로 변환해서 사용한다.
console.log(Number(localStorage.getItem("demoNumber")) + 1);   // 101


/*
    < 4. 배열 / 객체 저장 : JSON.stringify() / JSON.parse() >

    저장할 때 : JSON.stringify(값)  → 객체/배열을 JSON 문자열로 변환
    읽을 때   : JSON.parse(문자열)  → JSON 문자열을 다시 객체/배열로 변환

    저장되지 않은 key를 읽으면 null이므로, 기본값을 함께 정해 둔다.
    JSON.parse(localStorage.getItem("key")) || []
*/

const user = { name: "홍길동", age: 20, hobbies: ["독서", "게임"] };

localStorage.setItem("demoUser", JSON.stringify(user));
console.log(localStorage.getItem("demoUser"));       // {"name":"홍길동","age":20,"hobbies":["독서","게임"]}

const savedUser = JSON.parse(localStorage.getItem("demoUser"));
console.log(savedUser.name);                          // 홍길동
console.log(savedUser.hobbies[1]);                    // 게임

const notSaved = JSON.parse(localStorage.getItem("없는키")) || [];
console.log(notSaved);                                // []

// 예제용 값 정리
localStorage.removeItem("demoNumber");
localStorage.removeItem("demoArray");
localStorage.removeItem("demoObject");
localStorage.removeItem("demoUser");

renderStorage();


/*
    < 5. 저장 → 읽기 패턴 (모든 실제 예제가 이 구조) >

    1) 페이지가 열리면 : 저장된 값을 읽어서 화면에 반영
    2) 사용자가 바꾸면 : 화면을 바꾸고 + 값을 저장

    이 두 가지를 항상 짝으로 작성한다.
*/


/*
    < 6. localStorage vs sessionStorage >

    방문 횟수를 두 저장소에 각각 저장해 차이를 확인한다.
    - 새로고침 : 둘 다 유지되어 증가
    - 탭을 닫고 다시 열기 : localStorage는 이어서 증가, sessionStorage는 1부터 다시 시작
*/

const localVisit = Number(localStorage.getItem("visitCount")) + 1;
const sessionVisit = Number(sessionStorage.getItem("visitCount")) + 1;

localStorage.setItem("visitCount", localVisit);
sessionStorage.setItem("visitCount", sessionVisit);

document.querySelector("#visitResult").textContent =
    "localStorage 방문: " + localVisit + "회 / sessionStorage 방문: " + sessionVisit + "회";

// 참고 : getItem() 결과가 null이면 Number(null)은 0이므로 첫 방문은 1이 된다.


/*
    < 7. 실제 예 1 - 아이디 저장 >

    1) 페이지가 열리면 : 저장된 아이디가 있으면 입력창에 채우고 체크박스 체크
    2) 로그인할 때     : 체크되어 있으면 아이디 저장, 아니면 삭제

    주의 : 비밀번호는 절대 저장하지 않는다! (누구나 개발자 도구로 볼 수 있음)
*/

const loginForm = document.querySelector("#loginForm");
const loginId = document.querySelector("#loginId");
const rememberId = document.querySelector("#rememberId");

// 1) 페이지가 열리면
const savedId = localStorage.getItem("savedId");

if (savedId !== null) {
    loginId.value = savedId;
    rememberId.checked = true;
}

// 2) 로그인할 때
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (rememberId.checked) {
        localStorage.setItem("savedId", loginId.value);
    } else {
        localStorage.removeItem("savedId");
    }

    document.querySelector("#loginMsg").textContent =
        loginId.value + "님 로그인 (새로고침해서 아이디가 남아 있는지 확인)";
    renderStorage();
});


/*
    < 8. 실제 예 2 - 다크 모드 유지 >

    1) 페이지가 열리면 : 저장된 theme이 "dark"이면 다크 모드 적용
    2) 버튼을 누르면   : 다크 모드 전환 + 현재 상태 저장
*/

const themeBtn = document.querySelector("#themeBtn");

function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark");
        themeBtn.textContent = "라이트 모드";
    } else {
        document.body.classList.remove("dark");
        themeBtn.textContent = "다크 모드";
    }
}

// 1) 페이지가 열리면
applyTheme(localStorage.getItem("theme"));

// 2) 버튼을 누르면
themeBtn.addEventListener("click", function() {
    const newTheme = document.body.classList.contains("dark") ? "light" : "dark";

    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    renderStorage();
});


/*
    < 9. 실제 예 3 - 최근 검색어 (배열 저장) >

    규칙
    - 최근 검색어가 맨 앞
    - 같은 검색어는 중복 저장하지 않고 맨 앞으로 이동
    - 최대 5개까지 저장
    - 개별 삭제(✕), 전체 삭제

    배열을 저장하므로 JSON.stringify / JSON.parse를 사용한다.
*/

const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const keywordList = document.querySelector("#keywordList");

// 저장된 배열 읽기 (없으면 빈 배열)
let keywords = JSON.parse(localStorage.getItem("recentKeywords")) || [];

// 배열 저장
function saveKeywords() {
    localStorage.setItem("recentKeywords", JSON.stringify(keywords));
    renderStorage();
}

// 배열 → 화면
function renderKeywords() {
    keywordList.replaceChildren();

    if (keywords.length === 0) {
        keywordList.textContent = "최근 검색어가 없습니다.";
        return;
    }

    keywords.forEach(function(word, index) {
        const span = document.createElement("span");
        const delBtn = document.createElement("button");

        span.className = "keyword";
        span.textContent = word;

        delBtn.type = "button";
        delBtn.textContent = "✕";
        delBtn.dataset.index = index;

        span.append(delBtn);
        keywordList.append(span);
    });
}

// 검색 : 배열 수정 → 저장 → 화면 갱신
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const word = searchInput.value.trim();

    if (word === "") {
        return;
    }

    keywords = keywords.filter(function(k) {
        return k !== word;            // 같은 검색어 제거 (중복 방지)
    });

    keywords.unshift(word);           // 맨 앞에 추가
    keywords = keywords.slice(0, 5);  // 최대 5개

    saveKeywords();
    renderKeywords();
    searchInput.value = "";
});

// 개별 삭제 : 이벤트 위임 (10_event 06)
keywordList.addEventListener("click", function(event) {
    const delBtn = event.target.closest("button");

    if (delBtn === null) {
        return;
    }

    keywords.splice(Number(delBtn.dataset.index), 1);
    saveKeywords();
    renderKeywords();
});

// 전체 삭제
document.querySelector("#clearKeywords").addEventListener("click", function() {
    keywords = [];
    localStorage.removeItem("recentKeywords");
    renderKeywords();
    renderStorage();
});

renderKeywords();


/*
    < 10. 정리와 주의사항 >

    1) setItem / getItem / removeItem / clear
    2) 값은 항상 문자열 → 숫자는 Number(), 배열/객체는 JSON.stringify / JSON.parse
    3) 없는 key는 null → || 기본값 으로 처리
    4) 패턴 : 페이지 열릴 때 읽어서 반영 + 바뀔 때마다 저장

    주의
    - 비밀번호, 주민번호, 카드번호 등 민감한 정보는 저장하지 않는다.
    - 같은 사이트(출처)끼리만 공유된다. 다른 사이트의 값은 읽을 수 없다.
    - 사용자가 브라우저 데이터를 지우면 함께 사라진다. (중요한 데이터는 서버에 저장)
    - 로컬 파일(file://)로 열면 같은 PC의 다른 실습 파일과 저장소를 공유할 수 있으므로
      key 이름이 겹치지 않게 주의한다.
*/
