/*
< 학생용 실습 문제 >

주제: 카페 주문 시스템으로 동기 / 비동기, 타이머, 콜백 익히기
출력: console.log() 또는 화면으로 확인

=====================================================================================
[기초]
=====================================================================================

< 문제 1. 실행 순서 예측 >
① 아래 코드를 실행하기 전에 콘솔 출력 순서를 주석으로 예측하시오.
② 코드를 작성하여 실행하고 예측과 비교하시오.

    console.log("A. 손님 입장");
    setTimeout(function() { console.log("B. 커피 완성"); }, 2000);
    setTimeout(function() { console.log("C. 진동벨 지급"); }, 0);
    console.log("D. 주문 완료");
    setTimeout(function() { console.log("E. 영수증 출력"); }, 500);
    console.log("F. 자리에 앉음");


< 문제 2. setTimeout >
① orderBtn을 클릭하면 orderStatus에 즉시 "주문이 접수되었습니다. (3초 소요)"를 표시하시오.
② 3초 뒤에 "아메리카노가 준비되었습니다."로 바꾸시오.


< 문제 3. 콜백 함수 만들기 >
① makeCoffee(menu, callback) 함수를 작성하시오.
   - 2초 뒤에 callback(menu + " 완성!")을 호출한다.
② latteBtn을 클릭하면 coffeeResult에 "제조 중..."을 표시하고,
   makeCoffee("카페라테", ...)의 결과를 coffeeResult에 표시하시오.


< 문제 4. clearTimeout - 주문 취소 >
① 문제 2의 타이머 번호를 변수에 저장하시오.
② cancelBtn을 클릭하면
   - 아직 준비 중이면 타이머를 취소하고 "주문이 취소되었습니다."
   - 이미 완료되었거나 주문하지 않았으면 "취소할 주문이 없습니다."를 표시하시오.
힌트) 완료되면 타이머 번호 변수를 null로 바꿔 두면 구분할 수 있다.


=====================================================================================
[응용]
=====================================================================================

< 문제 5. 콜백으로 순서대로 진행하기 >
① step(text, ms, callback) 함수를 작성하시오.
   - ms 밀리초 뒤에 stepList에 text를 li로 추가하고 callback()을 호출한다.
② stepBtn을 클릭하면 아래 순서로 진행되도록 step을 중첩해서 호출하시오.
   "주문 접수" (1초) → "원두 분쇄" (1초) → "추출 중" (2초) → "픽업 알림" (1초)
③ 진행 중에는 stepBtn을 비활성화하고, 모두 끝나면 다시 활성화하시오.
④ 단계가 늘어날수록 코드가 어떤 모양이 되는지 주석으로 작성하시오.


< 문제 6. setInterval - 진동벨 카운트다운 >
① bellBtn을 클릭하면 bellView에 10부터 1초마다 1씩 줄어드는 숫자를 표시하시오.
② 0이 되면 반복을 멈추고 "🔔 커피가 나왔습니다!"를 표시하시오.
③ 카운트다운 중에 버튼을 다시 눌러도 타이머가 겹치지 않게 하시오.


< 문제 7. 시계 시작 / 정지 토글 >
① clockBtn을 클릭하면 clock에 현재 시각을 1초마다 표시하시오. (new Date().toLocaleTimeString())
   클릭하자마자 바로 한 번 표시하시오. (1초를 기다리지 않도록)
② 다시 클릭하면 시계를 멈추시오.
③ 버튼 문구는 상태에 따라 "시계 시작" / "시계 정지"로 바꾸시오.


=====================================================================================
[심화]
=====================================================================================

< 문제 8. 진행률 표시 >
① pointBtn을 클릭하면 50ms마다 진행률을 2%씩 올리시오.
② progressBar의 width와 progressText에 "40%" 형식으로 표시하시오.
③ 100%가 되면 멈추고 progressText에 "정산 완료!"를 표시하시오.
④ 진행 중에는 버튼을 비활성화하시오.
⑤ 이 작업을 while문(동기)으로 만들면 어떤 문제가 생기는지 주석으로 작성하시오.


< 문제 9. 자동 로그아웃 >
① 페이지가 열리면 10초 타이머를 시작하고, logoutView에 "자동 로그아웃까지 10초"를 1초마다 갱신하시오.
② 문서에서 click 또는 keydown이 발생하면 남은 시간을 다시 10초로 되돌리시오.
③ 0초가 되면 타이머를 멈추고 "자동 로그아웃되었습니다."를 표시하시오.
④ 로그아웃된 뒤에는 클릭해도 다시 시작되지 않게 하시오.


< 문제 10. 검색 디바운스 (Debounce) >
입력할 때마다 서버에 검색 요청을 보내면 "아", "아메", "아메리" ... 요청이 너무 많아진다.
입력을 멈추고 0.5초가 지났을 때 한 번만 검색하도록 만드시오.

① searchInput에 input 이벤트를 등록하시오.
② 입력할 때마다 이전에 예약한 검색 타이머를 취소(clearTimeout)하고, 0.5초 뒤 검색을 새로 예약하시오.
③ 검색이 실행되면 searchLog에 "검색 : 아메리카노" li를 추가하고 searchCount를 1 늘리시오.
④ 빈 문자열이면 검색하지 마시오.
⑤ 콘솔에 input 이벤트 발생 횟수도 함께 출력하여 실제 검색 횟수와 비교하시오.
*/


// < 강사용 정답 >

// < 문제 1 >
console.log("A. 손님 입장");
setTimeout(function() { console.log("B. 커피 완성"); }, 2000);
setTimeout(function() { console.log("C. 진동벨 지급"); }, 0);
console.log("D. 주문 완료");
setTimeout(function() { console.log("E. 영수증 출력"); }, 500);
console.log("F. 자리에 앉음");

// 출력 순서 : A → D → F → C → E → B
// 일반 코드(A, D, F)가 모두 끝난 뒤, 타이머가 짧은 순서(0 → 500 → 2000)대로 실행된다.


// < 문제 2, 4 >
const orderStatus = document.querySelector("#orderStatus");
let orderTimer = null;

document.querySelector("#orderBtn").addEventListener("click", function() {
    clearTimeout(orderTimer);   // 이전 주문 타이머가 있으면 정리

    orderStatus.textContent = "주문이 접수되었습니다. (3초 소요)";

    orderTimer = setTimeout(function() {
        orderStatus.textContent = "아메리카노가 준비되었습니다.";
        orderTimer = null;      // 완료 표시
    }, 3000);
});

document.querySelector("#cancelBtn").addEventListener("click", function() {
    if (orderTimer === null) {
        orderStatus.textContent = "취소할 주문이 없습니다.";
        return;
    }

    clearTimeout(orderTimer);
    orderTimer = null;
    orderStatus.textContent = "주문이 취소되었습니다.";
});


// < 문제 3 >
function makeCoffee(menu, callback) {
    setTimeout(function() {
        callback(menu + " 완성!");
    }, 2000);
}

document.querySelector("#latteBtn").addEventListener("click", function() {
    const coffeeResult = document.querySelector("#coffeeResult");
    coffeeResult.textContent = "제조 중...";

    makeCoffee("카페라테", function(message) {
        coffeeResult.textContent = message;
    });
});


// < 문제 5 >
const stepBtn = document.querySelector("#stepBtn");
const stepList = document.querySelector("#stepList");

function step(text, ms, callback) {
    setTimeout(function() {
        const li = document.createElement("li");
        li.textContent = text;
        stepList.append(li);
        callback();
    }, ms);
}

stepBtn.addEventListener("click", function() {
    stepList.replaceChildren();
    stepBtn.disabled = true;

    step("주문 접수", 1000, function() {
        step("원두 분쇄", 1000, function() {
            step("추출 중", 2000, function() {
                step("픽업 알림", 1000, function() {
                    stepBtn.disabled = false;
                });
            });
        });
    });
});

// 단계가 늘어날수록 함수 안에 함수가 계속 들어가 오른쪽으로 깊어지는 피라미드 모양이 된다. (콜백 지옥)


// < 문제 6 >
const bellView = document.querySelector("#bellView");
let bellTimer = null;

document.querySelector("#bellBtn").addEventListener("click", function() {
    clearInterval(bellTimer);   // 겹침 방지

    let count = 10;
    bellView.textContent = count;

    bellTimer = setInterval(function() {
        count--;

        if (count <= 0) {
            clearInterval(bellTimer);
            bellView.textContent = "🔔 커피가 나왔습니다!";
            return;
        }

        bellView.textContent = count;
    }, 1000);
});


// < 문제 7 >
const clockBtn = document.querySelector("#clockBtn");
const clock = document.querySelector("#clock");
let clockTimer = null;

function showClock() {
    clock.textContent = new Date().toLocaleTimeString();
}

clockBtn.addEventListener("click", function() {
    if (clockTimer === null) {
        showClock();
        clockTimer = setInterval(showClock, 1000);
        clockBtn.textContent = "시계 정지";
    } else {
        clearInterval(clockTimer);
        clockTimer = null;
        clockBtn.textContent = "시계 시작";
    }
});


// < 문제 8 >
const pointBtn = document.querySelector("#pointBtn");
const progressBar = document.querySelector("#progressBar");
const progressText = document.querySelector("#progressText");

pointBtn.addEventListener("click", function() {
    let percent = 0;
    pointBtn.disabled = true;

    const timer = setInterval(function() {
        percent += 2;
        progressBar.style.width = percent + "%";
        progressText.textContent = percent + "%";

        if (percent >= 100) {
            clearInterval(timer);
            progressText.textContent = "정산 완료!";
            pointBtn.disabled = false;
        }
    }, 50);
});

// while문으로 만들면 반복이 끝날 때까지 화면이 멈춰서
// 진행률이 0%에서 갑자기 100%로 바뀌고, 그동안 클릭도 할 수 없다.


// < 문제 9 >
const logoutView = document.querySelector("#logoutView");
let remain = 10;

const logoutTimer = setInterval(function() {
    remain--;

    if (remain <= 0) {
        clearInterval(logoutTimer);
        logoutView.textContent = "자동 로그아웃되었습니다.";
        return;
    }

    logoutView.textContent = "자동 로그아웃까지 " + remain + "초";
}, 1000);

logoutView.textContent = "자동 로그아웃까지 " + remain + "초";

function resetLogout() {
    if (remain <= 0) {
        return;   // 이미 로그아웃됨
    }

    remain = 10;
    logoutView.textContent = "자동 로그아웃까지 " + remain + "초";
}

document.addEventListener("click", resetLogout);
document.addEventListener("keydown", resetLogout);


// < 문제 10 >
const searchInput = document.querySelector("#searchInput");
const searchLog = document.querySelector("#searchLog");
const searchCount = document.querySelector("#searchCount");

let searchTimer = null;
let inputCount = 0;
let searchNumber = 0;

searchInput.addEventListener("input", function() {
    inputCount++;
    console.log("input 이벤트 " + inputCount + "번째");

    clearTimeout(searchTimer);   // 이전 예약 취소

    searchTimer = setTimeout(function() {
        const keyword = searchInput.value.trim();

        if (keyword === "") {
            return;
        }

        searchNumber++;
        searchCount.textContent = searchNumber;

        const li = document.createElement("li");
        li.textContent = "검색 : " + keyword;
        searchLog.append(li);

        console.log("실제 검색 실행 : " + keyword + " (input " + inputCount + "번 중 " + searchNumber + "번 검색)");
    }, 500);
});
