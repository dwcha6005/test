/*
=====================================================================================
[수업 콘티] 13_async / 01. 동기와 비동기                      권장 90분 (설명 50 + 실습 40)
=====================================================================================
< 준비 >
- 01_sync_async.html을 열고 F12 → Console 탭.
- 오늘의 목표 : "왜 비동기가 필요한가"를 몸으로 느끼게 하는 것. 문법보다 체감이 먼저다.

< 진행 순서 >
1) 도입 (5분) - 섹션 1
   - 판서 : 동기 = 줄 서서 차례대로 / 비동기 = 진동벨 받고 다른 일 하다가 울리면 받기
   - "서버에서 데이터를 받아오는 일"은 언제 끝날지 모르는 대표적인 비동기 작업

2) 동기 작업은 화면을 멈춘다 (10분) - 섹션 2  ★ 반드시 직접 체험
   ▶ 시연 : [클릭 수 +1]을 몇 번 눌러 숫자가 오르는 것 확인
            [동기 방식으로 3초 작업] 클릭 → 바로 [클릭 수 +1]을 연타 → 3초 동안 화면이 완전히 멈춤
            3초 뒤 밀려 있던 클릭이 한꺼번에 반영됨
   ▶ 시연 : [비동기 방식으로 3초 작업] 클릭 → [클릭 수 +1]이 계속 잘 동작 → 3초 뒤 "완료"
   ▶ 포인트 : 자바스크립트는 한 번에 한 가지 일만 한다(싱글 스레드).
              오래 걸리는 일은 "맡겨 두고" 다음 일을 하는 것이 비동기다.

3) setTimeout 실행 순서 (10분) - 섹션 3
   ▶ 질문 던지기 : 코드를 먼저 보여 주고 "콘솔에 어떤 순서로 찍힐까?" 예측하게 한다.
   ▶ 시연 : [순서 확인] → 1. 시작 → 4. 끝 → 3. 0초 타이머 → 2. 1초 타이머
   ▶ 포인트 : 0초여도 setTimeout은 "지금 하는 일이 모두 끝난 뒤"에 실행된다.

4) 콜백 함수 복습 (5분) - 섹션 4
   - forEach, addEventListener에 넘긴 함수가 이미 콜백이었다는 것을 연결

5) return으로 받을 수 없다 (8분) - 섹션 5  ★ 가장 많이 막히는 개념
   ▶ 시연 : [return으로 받기] → 화면 "결과: undefined" (1초 뒤 콘솔에 데이터가 늦게 찍힘)
            [콜백으로 받기] → 1초 뒤 "홍길동 (hong@test.com)"
   ▶ 포인트 : 함수는 이미 끝났는데 데이터는 나중에 온다 → "도착하면 이 함수를 실행해 줘"라고 맡긴다(콜백)

6) 콜백 지옥 (7분) - 섹션 6
   ▶ 시연 : 버튼 클릭 → 1초 간격으로 회원 → 게시글 → 댓글이 차례대로 표시
   ▶ 코드 보여 주기 : 들여쓰기가 계속 깊어지는 모양 + 에러 처리를 단계마다 해야 하는 문제
   ▶ 예고 : 이 코드를 02에서 Promise로, 03에서 async/await로 같은 결과를 훨씬 짧게 만든다.

7) setInterval - 인증번호 타이머 (5분) - 섹션 7
   ▶ 시연 : [인증번호 받기] → 03:00부터 1초씩 감소 / 여러 번 눌러도 빨라지지 않음(중복 방지)
            [인증 완료] → 멈춤
   ▶ 포인트 : setInterval은 반드시 clearInterval로 멈출 방법을 함께 만든다.

< 예상 질문 / 자주 막히는 곳 >
- "setTimeout(함수, 1000)은 정확히 1초 뒤인가요?" → "최소 1초 뒤". 앞의 일이 밀려 있으면 더 늦어진다.
- setTimeout(sayHi(), 1000) 처럼 괄호를 붙이는 실수 (10_event 01과 같은 실수)
- 타이머 버튼을 여러 번 누르면 타이머가 겹친다 → 섹션 7의 중복 방지

< 실습 연결 : 01_sync_async_test.html / .js (카페 주문 시스템) >
- 섹션 3까지 : 문제 1 ~ 3
- 섹션 5까지 : 문제 4 ~ 6
- 수업 마지막 : 문제 7 ~ 10 (문제 10 검색 디바운스는 React에서도 자주 쓰는 패턴)
=====================================================================================
*/


/*
    < 1. 동기와 비동기 >

    동기(Synchronous)
    : 작업을 순서대로 하나씩 처리한다. 앞의 작업이 끝나야 다음 작업을 시작한다.
    : 예) 은행 창구 - 앞사람 업무가 끝나야 내 차례

    비동기(Asynchronous)
    : 시간이 걸리는 작업을 맡겨 두고, 기다리지 않고 다음 작업을 진행한다.
      작업이 끝나면 그때 결과를 처리한다.
    : 예) 카페 진동벨 - 주문 후 자리에서 다른 일을 하다가 벨이 울리면 커피를 받음

    대표적인 비동기 작업
    - setTimeout, setInterval (타이머)
    - 서버에서 데이터 받아오기 (17. Fetch)
    - 이벤트 (클릭은 언제 일어날지 모른다)
*/


/*
    < 2. 동기 작업은 화면을 멈춘다 >

    자바스크립트는 한 번에 한 가지 일만 처리한다. (싱글 스레드)
    동기 방식으로 오래 걸리는 작업을 하면 그동안 클릭, 입력, 화면 그리기가 모두 멈춘다.
*/

const countBtn = document.querySelector("#countBtn");
const countView = document.querySelector("#countView");
const workResult = document.querySelector("#workResult");
let clickCount = 0;

countBtn.addEventListener("click", function() {
    clickCount++;
    countView.textContent = clickCount;
});

// 동기 방식 : 3초 동안 반복문으로 시간을 끌며 아무것도 못 하게 막는다.
document.querySelector("#syncBtn").addEventListener("click", function() {
    console.log("동기 작업 시작");
    const start = Date.now();

    while (Date.now() - start < 3000) {
        // 3초 동안 계속 반복 (화면 멈춤)
    }

    workResult.textContent = "동기 작업 완료 (그동안 화면이 멈춰 있었음)";
    console.log("동기 작업 완료");
});

// 비동기 방식 : 3초 뒤에 실행할 일을 맡겨 두고 바로 다음 일로 넘어간다.
document.querySelector("#asyncBtn").addEventListener("click", function() {
    console.log("비동기 작업 시작");
    workResult.textContent = "비동기 작업 진행 중... (클릭 수 버튼을 눌러 보세요)";

    setTimeout(function() {
        workResult.textContent = "비동기 작업 완료 (그동안 화면이 정상 동작)";
        console.log("비동기 작업 완료");
    }, 3000);
});


/*
    < 3. setTimeout 실행 순서 >

    setTimeout(함수, 밀리초)
    : 지정한 시간이 "지난 뒤에" 함수를 실행하도록 예약한다.
    : 예약만 하고 바로 다음 줄로 넘어간다.

    아래 코드의 출력 순서를 먼저 예측해 보자.

    console.log("1. 시작");
    setTimeout(() => console.log("2. 1초 타이머"), 1000);
    setTimeout(() => console.log("3. 0초 타이머"), 0);
    console.log("4. 끝");

    정답 : 1 → 4 → 3 → 2
    → 0초 타이머도 지금 실행 중인 코드가 모두 끝난 뒤에 실행된다.
*/

const orderList = document.querySelector("#orderList");

function printOrder(text) {
    const li = document.createElement("li");
    li.textContent = text;
    orderList.append(li);
    console.log(text);
}

document.querySelector("#orderBtn").addEventListener("click", function() {
    orderList.replaceChildren();

    printOrder("1. 시작");

    setTimeout(function() {
        printOrder("2. 1초 타이머");
    }, 1000);

    setTimeout(function() {
        printOrder("3. 0초 타이머");
    }, 0);

    printOrder("4. 끝");
});


/*
    < 4. 콜백 함수 복습 >

    콜백 함수 : 다른 함수에 인자로 전달되어 "나중에" 호출되는 함수

    이미 사용해 본 콜백
    - arr.forEach(function(item) { ... })          → 요소마다 호출
    - btn.addEventListener("click", function() {})  → 클릭할 때 호출
    - setTimeout(function() { ... }, 1000)          → 1초 뒤 호출

    비동기 작업에서는 "작업이 끝나면 이 함수를 실행해 줘"라는 의미로 콜백을 사용한다.
*/


/*
    < 5. 비동기 결과는 return으로 받을 수 없다 >

    서버에서 회원 정보를 받아오는 데 1초가 걸린다고 가정한다.

    잘못된 방법 : 1초 뒤에 return 해도, 함수는 이미 끝나 undefined가 반환된 뒤이다.
    올바른 방법 : 결과를 받을 함수(콜백)를 미리 전달하고, 데이터가 도착하면 그 함수를 호출한다.
*/

const userResult = document.querySelector("#userResult");
const sampleUser = { id: 1, name: "홍길동", email: "hong@test.com" };

// 잘못된 방법
function getUserWrong() {
    setTimeout(function() {
        console.log("1초 뒤 데이터 도착 (하지만 이미 늦음):", sampleUser);
        return sampleUser;    // 이 return은 setTimeout 안의 함수의 return일 뿐
    }, 1000);
    // getUserWrong 함수는 여기서 바로 끝난다 → undefined 반환
}

document.querySelector("#returnBtn").addEventListener("click", function() {
    const user = getUserWrong();
    userResult.textContent = "결과: " + user;    // 결과: undefined
});

// 올바른 방법 : 콜백으로 받기
function getUser(callback) {
    setTimeout(function() {
        callback(sampleUser);   // 데이터가 도착하면 전달받은 함수를 호출
    }, 1000);
}

document.querySelector("#callbackBtn").addEventListener("click", function() {
    userResult.textContent = "불러오는 중...";

    getUser(function(user) {
        userResult.textContent = user.name + " (" + user.email + ")";
    });
});


/*
    < 6. 콜백 지옥 (Callback Hell) >

    순서가 중요한 비동기 작업이 여러 개면 콜백 안에 콜백이 계속 들어간다.
    회원 정보 → 그 회원의 게시글 → 첫 게시글의 댓글

    문제점
    - 들여쓰기가 계속 깊어져 읽기 어렵다. (피라미드 모양)
    - 단계마다 에러 처리를 따로 해야 한다.
    - 순서를 바꾸거나 단계를 추가하기 어렵다.

    → 이 문제를 해결하기 위해 Promise(02)와 async/await(03)가 등장했다.
*/

const hellList = document.querySelector("#hellList");

function addHellLog(text) {
    const li = document.createElement("li");
    li.textContent = text;
    hellList.append(li);
}

// 콜백 방식의 가짜 서버 함수들 (각 1초)
function loadUser(id, callback) {
    setTimeout(function() {
        callback({ id: id, name: "홍길동" });
    }, 1000);
}

function loadPosts(userId, callback) {
    setTimeout(function() {
        callback([{ id: 101, title: "비동기 처음 배워요" }, { id: 102, title: "Promise 정리 노트" }]);
    }, 1000);
}

function loadComments(postId, callback) {
    setTimeout(function() {
        callback(["저도 처음이에요!", "setTimeout부터 보세요."]);
    }, 1000);
}

document.querySelector("#hellBtn").addEventListener("click", function() {
    hellList.replaceChildren();
    addHellLog("요청 시작...");

    loadUser(1, function(user) {
        addHellLog("회원 : " + user.name);

        loadPosts(user.id, function(posts) {
            addHellLog("게시글 : " + posts.length + "개 (첫 글 : " + posts[0].title + ")");

            loadComments(posts[0].id, function(comments) {
                addHellLog("댓글 : " + comments.join(" / "));
                addHellLog("완료! (총 3초)");

                // 여기에 단계가 더 생기면 계속 안쪽으로 들어간다...
            });
        });
    });
});


/*
    < 7. setInterval - 반복 실행 >

    setInterval(함수, 밀리초) : 지정한 간격마다 함수를 계속 실행한다.
    clearInterval(타이머번호) : 반복을 멈춘다.
    (setTimeout도 clearTimeout(타이머번호)로 취소할 수 있다.)

    setInterval / setTimeout은 타이머 번호를 반환하므로, 변수에 저장해 두었다가 멈출 때 사용한다.

    실제 예) 휴대폰 인증번호 3분 타이머
    - 버튼을 여러 번 누르면 타이머가 겹쳐 시간이 2배, 3배 빨리 줄어든다.
      → 새로 시작하기 전에 기존 타이머를 먼저 멈춘다.
*/

const timerView = document.querySelector("#timerView");
let timerId = null;
let remainSeconds = 0;

function showTime() {
    const min = String(Math.floor(remainSeconds / 60)).padStart(2, "0");
    const sec = String(remainSeconds % 60).padStart(2, "0");
    timerView.textContent = min + ":" + sec;
}

document.querySelector("#sendCodeBtn").addEventListener("click", function() {
    clearInterval(timerId);   // 기존 타이머가 있으면 멈춤 (중복 방지)

    remainSeconds = 180;
    showTime();

    timerId = setInterval(function() {
        remainSeconds--;
        showTime();

        if (remainSeconds <= 0) {
            clearInterval(timerId);
            timerView.textContent = "시간 초과";
        }
    }, 1000);

    console.log("타이머 번호 : " + timerId);
});

document.querySelector("#stopBtn").addEventListener("click", function() {
    clearInterval(timerId);
    timerView.textContent = "인증 완료";
});
