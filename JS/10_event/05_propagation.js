/*
=====================================================================================
[수업 콘티] 10_event / 05. 이벤트 전파 (버블링)              권장 60분 (설명 30 + 실습 30)
=====================================================================================
< 준비 >
- 05_propagation.html을 열고 F12 → Console 탭.
- 이론(캡처링 단계 등)은 최소화하고 "문제 상황 → 해결" 순서로만 진행한다.

< 진행 순서 >
1) 비유로 시작 (3분) - 섹션 1
   - 판서 : 집 > 방 > 전등 스위치. "스위치를 누르면 방 안의 무언가, 집 안의 무언가를 누른 것이기도 하다."
   - 오늘의 목표 2가지 : 버블링 때문에 생기는 문제를 막는다(05) / 버블링을 활용한다(06)

2) 버블링 확인 (7분) - 섹션 2
   ▶ 시연 : [전등 스위치] 클릭 → 화면 목록에 "버튼 → 방 → 집" 3줄 (target은 모두 lightBtn)
            초록색 "방" 빈 곳 클릭 → "방 → 집" 2줄 / 노란색 "집" 빈 곳 클릭 → "집" 1줄
   ▶ 포인트 : 이벤트는 안쪽에서 바깥으로 올라간다. target은 처음 클릭한 요소 그대로.

3) 문제 상황과 stopPropagation (10분) - 섹션 3  ★ 가장 중요
   ▶ 시연 : 먼저 event.stopPropagation(); 줄을 주석 처리하고 새로고침
            [장바구니 담기] 클릭 → 문구가 "... 상세 페이지로 이동합니다."로 덮어써짐, 콘솔 2줄
            "장바구니만 담고 싶었는데 상세 페이지로 가 버린다!"
   ▶ 시연 : 주석을 풀고 다시 클릭 → "장바구니에 담았습니다."만 / 카드 빈 곳 클릭 → 상세 이동 문구

4) 모달 (8분) - 섹션 4
   ▶ 시연 : [공지 열기] → 흰색 내용 클릭해도 유지 / 어두운 배경 클릭 → 닫힘 / Esc → 닫힘
            콘솔 "클릭한 요소: (빈칸 또는 modalContent) / 리스너 요소: modalBg" → 배경을 클릭했을 때만 둘이 같다.
   ▶ 시연 : if (event.target === event.currentTarget) 조건을 지우면 → 내용을 클릭해도 닫힘 → 원복
   ▶ 포인트 : 이 경우 stopPropagation 대신 target 비교를 권장 (06의 위임을 방해하지 않음)

5) 캡처링 (2분) - 섹션 5
   - "반대 방향 단계도 있다. 세 번째 인수 true" 정도만. 실습 문제 9에서 확인 가능.

6) 정리 (3분) - 섹션 6
   - 판서 : preventDefault = 기본 동작 막기(04) / stopPropagation = 부모로 전달 막기(05)

< 예상 질문 / 자주 막히는 곳 >
- "그럼 모든 버튼에 stopPropagation을 쓰면 되나요?" → 남용하면 06의 이벤트 위임, 바깥 클릭 닫기 등이 깨진다.
- preventDefault로 버블링을 막으려는 실수 (실습 문제 4에서 확인)

< 실습 연결 : 05_propagation_test.html / .js >
- 섹션 3까지 : 문제 1 ~ 4
- 섹션 4까지 : 문제 5 ~ 7 (드롭다운 바깥 클릭 닫기 - 실무에서 매우 자주 씀)
- 수업 마지막 : 문제 8 ~ 10
=====================================================================================
*/


/*
    05_propagation.js

    < 1. 이벤트 전파(버블링)란? >

    버블링(Bubbling)
    : 안쪽 요소에서 발생한 이벤트가 바깥쪽(부모) 요소로 차례대로 전달되는 것
    : 물속 거품(bubble)이 아래에서 위로 올라오는 모습에서 나온 이름

    쉽게 생각하기
    - 버튼은 방 안에 있고, 방은 집 안에 있다.
    - 버튼을 누르면 "방 안의 무언가를 누른 것"이기도 하고,
      "집 안의 무언가를 누른 것"이기도 하다.
    - 그래서 버튼 → 방 → 집 순서로 클릭 이벤트가 전달된다.

    핵심 2가지
    1) 버블링 때문에 생기는 "문제"를 막는 방법  → stopPropagation()  (3번)
    2) 버블링을 "활용"하는 방법                → 이벤트 위임 (06에서 학습)
*/


/*
    < 2. 버블링 확인하기 >

    집(#house), 방(#room), 버튼(#lightBtn)에 각각 click 리스너를 등록했다.

    - 버튼 클릭 → 버튼 → 방 → 집 (3개 모두 실행)
    - 방 클릭   → 방 → 집
    - 집 클릭   → 집

    event.target은 처음 클릭한 요소로 끝까지 같다. (02에서 배운 내용)
*/

const house = document.querySelector("#house");
const room = document.querySelector("#room");
const lightBtn = document.querySelector("#lightBtn");
const bubbleLog = document.querySelector("#bubbleLog");

let lastEvent = null;

// 화면과 콘솔에 실행 순서를 기록하는 함수
// 새로운 클릭(다른 event 객체)이면 이전 기록을 지운다.
function writeLog(event, text) {
    if (event !== lastEvent) {
        bubbleLog.replaceChildren();
        lastEvent = event;
    }

    const li = document.createElement("li");
    li.textContent = text;
    bubbleLog.append(li);
    console.log(text);
}

lightBtn.addEventListener("click", function(event) {
    writeLog(event, "버튼 실행 (target: " + event.target.id + ")");
});

room.addEventListener("click", function(event) {
    writeLog(event, "방 실행 (target: " + event.target.id + ")");
});

house.addEventListener("click", function(event) {
    writeLog(event, "집 실행 (target: " + event.target.id + ")");
});


/*
    < 3. 버블링 때문에 생기는 문제와 해결 - stopPropagation() >

    실제 상황) 쇼핑몰 상품 카드
    - 카드를 클릭하면 → 상세 페이지로 이동
    - 카드 안의 "장바구니 담기" 버튼을 클릭하면 → 장바구니에만 담기

    문제
    : 버튼 클릭이 카드까지 전달되어 "장바구니 담기 + 상세 페이지 이동"이 둘 다 실행된다.

    해결
    : 버튼의 리스너에서 event.stopPropagation()을 호출한다.
    : 이벤트가 더 이상 부모(카드)로 전달되지 않는다.

    아래 코드에서 stopPropagation() 줄을 주석 처리하고
    버튼을 눌러 문제 상황을 먼저 확인해 보자.
*/

const productCards = document.querySelectorAll(".product-card");
const cartButtons = document.querySelectorAll(".cart-btn");
const cardResult = document.querySelector("#cardResult");

// 카드 클릭 → 상세 페이지 이동 (실습에서는 문구로 대신)
productCards.forEach(function(card) {
    card.addEventListener("click", function() {
        cardResult.textContent = card.dataset.name + " 상세 페이지로 이동합니다.";
        console.log("카드 클릭 : 상세 페이지 이동");
    });
});

// 버튼 클릭 → 장바구니 담기
cartButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.stopPropagation();   // 카드로 전달되지 않도록 막기

        const card = button.closest(".product-card");
        cardResult.textContent = card.dataset.name + "을(를) 장바구니에 담았습니다.";
        console.log("버튼 클릭 : 장바구니 담기");
    });
});


/*
    < 4. 실제 예 - 모달 창 >

    요구사항
    - 어두운 배경(#modalBg)을 클릭하면 모달이 닫힌다.
    - 흰색 내용(#modalContent)을 클릭하면 닫히면 안 된다.

    문제
    : 내용은 배경 안에 있으므로, 내용을 클릭해도 버블링으로 배경의 리스너가 실행된다.

    해결 방법 : event.target 확인 (추천)
    : "배경 자체"를 클릭했을 때만 닫는다.
    : event.target === event.currentTarget
      → 실제 클릭한 요소가 리스너를 등록한 배경 자신일 때만 true

    stopPropagation()으로도 해결할 수 있지만,
    전파를 막으면 다른 기능(이벤트 위임 등)이 동작하지 않을 수 있어
    이런 경우에는 target 확인 방법을 더 많이 사용한다.
*/

const openModal = document.querySelector("#openModal");
const closeModal = document.querySelector("#closeModal");
const modalBg = document.querySelector("#modalBg");

openModal.addEventListener("click", function() {
    modalBg.classList.add("open");
});

closeModal.addEventListener("click", function() {
    modalBg.classList.remove("open");
});

modalBg.addEventListener("click", function(event) {
    console.log("클릭한 요소: " + event.target.id + " / 리스너 요소: " + event.currentTarget.id);

    if (event.target === event.currentTarget) {
        modalBg.classList.remove("open");
    }
});

// Esc 키로 모달 닫기 (03에서 배운 keydown 활용)
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        modalBg.classList.remove("open");
    }
});


/*
    < 5. 참고 - 캡처링 >

    이벤트는 사실 "바깥 → 안쪽(캡처링)"으로 내려갔다가
    "안쪽 → 바깥(버블링)"으로 올라온다.

    addEventListener()는 기본적으로 버블링 단계에서 실행되며,
    세 번째 인수에 true를 주면 캡처링 단계에서 실행된다.

    house.addEventListener("click", 함수, true);  // 캡처링 단계

    실무에서 캡처링을 직접 쓰는 경우는 거의 없으므로
    "그런 단계도 있다" 정도만 알고 넘어간다.
*/


/*
    < 6. 정리 >

    버블링            : 안쪽 요소의 이벤트가 부모 요소로 전달되는 것
    stopPropagation() : 부모로 전달되는 것을 막는다. (안쪽 버튼 + 바깥 카드 상황)
    target 확인       : event.target === event.currentTarget 으로
                        "그 요소 자체"를 클릭했는지 확인 (모달 배경 상황)

    preventDefault()  : 기본 동작(이동, 전송)을 막는다.     → 04
    stopPropagation() : 부모로 전파되는 것을 막는다.        → 05
    두 메서드는 서로 다른 것을 막는다!
*/
