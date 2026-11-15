/*
=====================================================================================
[수업 콘티] 10_event / 02. 이벤트 객체 (event)               권장 60분 (설명 35 + 실습 25)
=====================================================================================
< 준비 >
- 02_event_object.html을 열고 F12 → Console 탭.
- 이 수업을 03(이벤트 종류)보다 먼저 하는 이유 : 03의 예제(Enter 검색, 실시간 입력)에
  event.key, event.target.value가 필요하기 때문이다.

< 진행 순서 >
1) 이벤트 객체란? (5분) - 섹션 1
   - 판서 : function(event) { } ← 브라우저가 자동으로 넣어 주는 "사건 보고서"
   - 꼭 기억할 3가지 : type, target, key

2) event.type (5분) - 섹션 2
   ▶ 시연 : [클릭 / 더블클릭] 한 번 클릭 → 콘솔에 PointerEvent 객체 + "발생한 이벤트: click"
            콘솔의 객체를 펼쳐서 type, target, clientX 등을 직접 보여 준다.
   ▶ 시연 : 더블클릭 → click, click, dblclick 3번 출력
   ▶ 질문 던지기 : "더블클릭했는데 왜 click이 2번 먼저 나올까?" → 클릭 2번 + 더블클릭 1번

3) event.target - 사이즈 선택 (8분) - 섹션 3  ★ 가장 중요
   ▶ 시연 : S / M / L 클릭 → 클릭한 버튼만 파란색, "선택한 사이즈: M"
   ▶ 포인트 : 버튼 3개에 함수는 1개. "누가 눌렸는지"는 event.target이 알려 준다.

4) target vs currentTarget (5분) - 섹션 4
   ▶ 시연 : 카드 빈 곳 클릭 → target: DIV / currentTarget: DIV
            카드 안 버튼 클릭 → target: BUTTON / currentTarget: DIV
   ▶ 포인트 : "왜 버튼을 눌렀는데 div의 리스너가 실행될까?" → 05(이벤트 전파)에서 해결. 예고만 한다.

5) event.target.value - 닉네임 미리보기 (4분) - 섹션 5
   ▶ 시연 : 닉네임 입력 → 한 글자마다 미리보기에 바로 반영

6) event.key - 채팅 Enter 전송 (8분) - 섹션 6
   ▶ 시연 : 아무 키나 누르면 콘솔에 "누른 키: a", "누른 키: Shift" ...
            메시지 입력 + Enter → 목록에 추가, 입력창 비워짐 / Esc → 입력 내용 삭제
   ▶ 시연 (한글 문제) : isComposing 부분(if문 3줄)을 주석 처리 → 한글 입력 후 Enter
            → 메시지가 두 번 들어가거나 마지막 글자가 남는 현상 확인 → 원복
   ▶ 포인트 : 한글 입력창에서 Enter를 처리할 때는 항상 isComposing 확인

7) 정리 (2분) - 섹션 7

< 예상 질문 / 자주 막히는 곳 >
- "매개변수 이름을 e로 써도 되나요?" → 된다. 이름은 자유.
- event.target.value를 버튼에서 읽으려는 실수 → value는 입력 요소에서 사용, 버튼은 textContent / dataset

< 실습 연결 : 02_event_object_test.html / .js >
- 섹션 3까지 : 문제 1, 2
- 섹션 6까지 : 문제 3, 4, 7
- 수업 마지막 : 문제 5, 6, 8 ~ 10
  (문제 9 단축키는 입력창 바깥을 한 번 클릭한 뒤 1, 2, 3, Esc를 눌러 확인)
=====================================================================================
*/


/*
    02_event_object.js

    < 1. 이벤트 객체(event)란? >

    이벤트가 발생하면 브라우저는 "무슨 일이 일어났는지" 정보를 담은 객체를 만들어
    리스너 함수의 첫 번째 매개변수로 자동 전달한다.

    요소.addEventListener("click", function(event) {
        console.log(event);   // 이벤트 정보가 담긴 객체
    });

    - 매개변수 이름은 자유 (event, e, evt 등) → 보통 event 또는 e 를 사용
    - 이 수업에서 꼭 기억할 정보는 3가지

      event.type    : 어떤 이벤트인가?        ("click", "input", "keydown" ...)
      event.target  : 어떤 요소에서 일어났나? (실제로 클릭/입력한 요소)
      event.key     : 어떤 키를 눌렀나?       (키보드 이벤트)
*/


/*
    < 2. event.type >

    같은 함수를 여러 이벤트에 등록했을 때
    지금 실행된 이벤트가 무엇인지 구분할 수 있다.
*/

const typeBtn = document.querySelector("#typeBtn");

function printType(event) {
    console.log(event);                       // 이벤트 객체 전체
    console.log("발생한 이벤트: " + event.type); // click 또는 dblclick
}

typeBtn.addEventListener("click", printType);
typeBtn.addEventListener("dblclick", printType);


/*
    < 3. event.target - 이벤트가 발생한 요소 >

    event.target : 실제로 이벤트가 발생한 요소

    실제 예) 사이즈 버튼 S, M, L
    - 버튼마다 함수를 따로 만들지 않고 "하나의 함수"로 처리한다.
    - 어떤 버튼을 눌렀는지는 event.target으로 알 수 있다.
*/

const sizeButtons = document.querySelectorAll(".size-btn");
const sizeResult = document.querySelector("#sizeResult");

function selectSize(event) {
    const clickedBtn = event.target;

    // 모든 버튼의 선택 표시 제거 → 클릭한 버튼만 표시
    sizeButtons.forEach(function(btn) {
        btn.classList.remove("selected");
    });
    clickedBtn.classList.add("selected");

    sizeResult.textContent = "선택한 사이즈: " + clickedBtn.textContent;
}

sizeButtons.forEach(function(btn) {
    btn.addEventListener("click", selectSize);
});


/*
    < 4. event.target과 event.currentTarget >

    event.target        : 실제로 클릭한 요소 (클릭 위치에 따라 달라짐)
    event.currentTarget : 리스너를 등록한 요소 (항상 같음)

    #card(div)에만 리스너를 등록했다.
    - 카드 빈 곳 클릭    → target: DIV,    currentTarget: DIV
    - 카드 안 버튼 클릭  → target: BUTTON, currentTarget: DIV

    버튼을 눌러도 div의 리스너가 실행되는 이유는 "이벤트 전파(05)"에서 배운다.
    지금은 "target은 실제 클릭한 것, currentTarget은 리스너 주인"만 기억한다.
*/

const card = document.querySelector("#card");

card.addEventListener("click", function(event) {
    console.log("target: " + event.target.tagName);
    console.log("currentTarget: " + event.currentTarget.tagName);
});


/*
    < 5. event.target.value - 입력값 읽기 >

    입력 이벤트에서 event.target은 입력 중인 input 요소이다.
    따라서 event.target.value 로 현재 입력값을 읽을 수 있다.

    실제 예) 닉네임을 입력하는 즉시 미리보기에 표시
    (input 이벤트 : 입력값이 바뀔 때마다 발생 → 03에서 자세히)
*/

const nickname = document.querySelector("#nickname");
const preview = document.querySelector("#preview");

nickname.addEventListener("input", function(event) {
    preview.textContent = event.target.value;
});


/*
    < 6. event.key - 어떤 키를 눌렀는가? >

    키보드 이벤트(keydown)에서 event.key 로 누른 키를 확인한다.

    event.key 예시
    - 문자 키 : "a", "B", "1"
    - Enter   : "Enter"
    - Esc     : "Escape"
    - 방향키  : "ArrowUp", "ArrowDown"

    실제 예) 채팅창에서 Enter를 누르면 메시지 전송
*/

const chatInput = document.querySelector("#chatInput");
const chatList = document.querySelector("#chatList");

chatInput.addEventListener("keydown", function(event) {
    console.log("누른 키: " + event.key);

    // 한글 입력 주의!
    // 한글은 조합 중(ㅎ → 하 → 한)에 Enter를 누르면 keydown이 2번 발생한다.
    // event.isComposing이 true이면 아직 글자를 조합하는 중이므로 무시한다.
    if (event.isComposing) {
        return;
    }

    if (event.key === "Enter") {
        const message = chatInput.value.trim();

        if (message === "") {
            return;
        }

        const li = document.createElement("li");
        li.textContent = message;
        chatList.append(li);

        chatInput.value = "";
    }

    // Esc를 누르면 입력 내용 지우기
    if (event.key === "Escape") {
        chatInput.value = "";
    }
});


/*
    < 7. 정리 >

    event               : 이벤트 정보 객체 (리스너의 첫 번째 매개변수)
    event.type          : 이벤트 종류
    event.target        : 실제로 이벤트가 발생한 요소
    event.currentTarget : 리스너를 등록한 요소
    event.target.value  : (입력 요소) 현재 입력값
    event.key           : (키보드) 누른 키

    참고 : 마우스 좌표(clientX, clientY), Ctrl 키 여부(ctrlKey) 등
          더 많은 정보는 console.log(event)로 직접 확인할 수 있다.
*/
