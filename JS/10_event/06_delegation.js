/*
=====================================================================================
[수업 콘티] 10_event / 06. 이벤트 위임                       권장 90분 (설명 45 + 실습 45)
=====================================================================================
< 준비 >
- 06_delegation.html을 열고 F12 → Console 탭.
- 05(버블링)를 짧게 복습하고 시작한다. "버튼을 누르면 부모까지 이벤트가 올라온다."

< 진행 순서 >
1) 문제 상황 (8분) - 섹션 1  ★ 반드시 직접 보여 줄 것
   ▶ 시연 : 1번 영역의 기존 항목 [삭제] → 정상 삭제
            "새일" 입력 → [추가] → 새로 생긴 항목의 [삭제] 클릭 → 아무 반응 없음
   ▶ 질문 던지기 : "왜 새로 만든 버튼만 안 될까?"
            → querySelectorAll은 실행하는 순간 있던 버튼만 선택했기 때문

2) 해결 아이디어 (5분) - 섹션 2
   - 판서 : "버튼마다 경비원을 세우지 말고, 출입구(ul)에 경비원 한 명"
   - 기본 형태 코드(부모.addEventListener + event.target 확인)를 판서

3) 해결 코드 (7분) - 섹션 3
   ▶ 시연 : 3번 영역에서 항목 추가 → 새 항목 [삭제] → 정상 삭제
            목록 글자 부분을 클릭하면 콘솔 "클릭한 요소: LI", 버튼은 "BUTTON"
   ▶ 포인트 : 리스너는 ul에 1개뿐인데 모든 버튼이 동작한다.

4) closest() (7분) - 섹션 4
   ▶ 시연 : 메뉴 버튼의 이모지(아이콘) 부분 클릭 → 콘솔 "target: SPAN / 찾은 버튼: 검색"
            → target은 SPAN이지만 closest로 버튼을 찾아 정상 동작
   ▶ 포인트 : 위임에서는 matches보다 closest를 쓴다. (09_DOM 06_traversal 복습)

5) 실제 예 - 할 일 목록 (15분) - 섹션 5
   ▶ 시연 : Enter로 할 일 추가 → [완료] 줄긋기 / 다시 누르면 해제 → [삭제]
            필터 [진행 중] / [완료] / [전체] 전환, "남은 할 일: n개" 변화
            새로 추가한 항목도 완료/삭제/필터가 모두 동작하는 것을 강조
   ▶ 코드 설명 순서 : addTodo → render → todoList 위임(data-action) → filterArea 위임
   ▶ 예고 : "새로고침하면 다 사라진다" → 12_web_storage에서 저장하는 방법을 배운다.

6) 정리 (3분) - 섹션 6 : 언제 쓰는지, 작성 순서 4단계

< 예상 질문 / 자주 막히는 곳 >
- event.target이 버튼이 아닌 span, li일 수 있다는 점을 놓친다 → closest + null 체크
- closest 결과가 null인데 dataset에 접근해서 오류 → 반드시 null이면 return
- 자식에서 stopPropagation을 쓰면 위임이 동작하지 않는다 (05 복습)

< 실습 연결 : 06_delegation_test.html / .js >
- 섹션 3까지 : 문제 1 ~ 3
- 섹션 4까지 : 문제 4, 5
- 섹션 5까지 : 문제 6, 7 (장바구니, 별점)
- 수업 마지막 / 과제 : 문제 8 ~ 10
=====================================================================================
*/


/*
    06_delegation.js

    이벤트 위임(Event Delegation)
    : 자식 요소마다 이벤트를 등록하지 않고,
      "부모 요소 하나"에만 등록해서 자식들의 이벤트를 대신 처리하는 방법

    05에서 배운 버블링 덕분에 가능하다.
    → 자식(버튼)을 클릭하면 이벤트가 부모(ul)까지 올라오기 때문

    먼저 "왜 필요한지" 문제 상황부터 확인한다.
*/


/*
    < 1. 문제 상황 >

    지금까지 배운 방식
    1. querySelectorAll()로 삭제 버튼을 모두 선택
    2. forEach()로 버튼마다 click 이벤트 등록

    문제
    : querySelectorAll()은 "실행하는 순간"에 있던 버튼만 선택한다.
    : 나중에 추가한 항목의 삭제 버튼에는 이벤트가 등록되어 있지 않다.

    확인 방법
    : 새 할 일을 추가한 뒤 그 항목의 삭제 버튼을 눌러 보자. → 아무 반응 없음
*/

const problemInput = document.querySelector("#problemInput");
const problemAdd = document.querySelector("#problemAdd");
const problemList = document.querySelector("#problemList");

// 처음 있던 버튼에만 이벤트 등록됨
problemList.querySelectorAll(".delete-btn").forEach(function(button) {
    button.addEventListener("click", function() {
        button.closest("li").remove();
    });
});

problemAdd.addEventListener("click", function() {
    const li = document.createElement("li");
    li.innerHTML = '<button type="button" class="delete-btn">삭제</button>';
    li.prepend(problemInput.value + " ");   // 사용자 입력은 텍스트로 추가
    problemList.append(li);
    problemInput.value = "";
    // 새로 만든 삭제 버튼에는 이벤트가 없다!
});


/*
    < 2. 해결 아이디어 >

    "삭제 버튼마다 경비원을 세우지 말고, 출입구(ul)에 경비원 한 명만 세운다."

    ul (리스너 1개)
     ├── li  [삭제]  ← 클릭하면 ul까지 전달됨
     ├── li  [삭제]  ← 클릭하면 ul까지 전달됨
     └── li  [삭제]  ← 나중에 추가해도 ul 안에 있으므로 똑같이 전달됨

    ul의 리스너에서 할 일
    1. event.target으로 "무엇을 클릭했는지" 확인
    2. 삭제 버튼이면 → 그 버튼이 속한 li 삭제
    3. 아니면 → 아무것도 하지 않음

    기본 형태

    부모.addEventListener("click", function(event) {
        if (event.target.matches(".delete-btn")) {
            // 삭제 버튼을 클릭했을 때만 실행
        }
    });
*/


/*
    < 3. 해결 코드 >

    삭제 버튼 개수와 상관없이 리스너는 ul에 단 1개만 있다.
    나중에 추가한 항목의 삭제 버튼도 정상 동작한다.
*/

const solveInput = document.querySelector("#solveInput");
const solveAdd = document.querySelector("#solveAdd");
const solveList = document.querySelector("#solveList");

solveList.addEventListener("click", function(event) {
    console.log("클릭한 요소: " + event.target.tagName);

    if (event.target.matches(".delete-btn")) {
        event.target.closest("li").remove();
    }
});

solveAdd.addEventListener("click", function() {
    const li = document.createElement("li");
    li.innerHTML = '<button type="button" class="delete-btn">삭제</button>';
    li.prepend(solveInput.value + " ");
    solveList.append(li);
    solveInput.value = "";
    // 이벤트를 따로 등록하지 않아도 삭제가 동작한다!
});


/*
    < 4. closest()로 정확하게 찾기 >

    버튼 안에 <span> 같은 자식 요소가 있으면
    아이콘을 클릭했을 때 event.target은 버튼이 아니라 span이 된다.

    event.target.matches(".icon-btn")      → span을 클릭하면 false (실패)
    event.target.closest(".icon-btn")      → span에서 위로 올라가 버튼을 찾음 (성공)

    그래서 이벤트 위임에서는 closest()를 사용하는 것이 안전하다.
    closest()의 결과가 null이면 버튼 바깥을 클릭한 것이다.
*/

const iconArea = document.querySelector("#iconArea");
const iconResult = document.querySelector("#iconResult");

iconArea.addEventListener("click", function(event) {
    // const button = event.target.matches(".icon-btn");
    const button = event.target.closest(".icon-btn");

    console.log("target: " + event.target.tagName + " / 찾은 버튼: " + (button ? button.dataset.menu : null));

    if (button === null) {
        return;   // 버튼이 아닌 곳을 클릭
    }

    iconResult.textContent = button.dataset.menu + " 메뉴를 선택했습니다.";
});


/*
    < 5. 실제 예 - 할 일 목록 >

    기능
    - 추가 : 버튼 클릭 또는 Enter
    - 완료 / 삭제 : ul 하나에 위임 + data-action으로 버튼 구분
    - 필터 : 전체 / 진행 중 / 완료 (필터 버튼 영역에도 위임)

    data-action을 사용하면 버튼 종류가 늘어나도 if문만 추가하면 된다.

    <button data-action="done">완료</button>
    <button data-action="delete">삭제</button>
*/

const todoInput = document.querySelector("#todoInput");
const todoAdd = document.querySelector("#todoAdd");
const todoList = document.querySelector("#todoList");
const todoCount = document.querySelector("#todoCount");
const filterArea = document.querySelector("#filterArea");

let currentFilter = "all";

// 할 일 추가
function addTodo() {
    const text = todoInput.value.trim();

    if (text === "") {
        return;
    }

    const li = document.createElement("li");
    const span = document.createElement("span");
    const doneBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    span.textContent = text;

    doneBtn.type = "button";
    doneBtn.textContent = "완료";
    doneBtn.dataset.action = "done";

    deleteBtn.type = "button";
    deleteBtn.textContent = "삭제";
    deleteBtn.dataset.action = "delete";

    li.append(span, " ", doneBtn, " ", deleteBtn);
    todoList.append(li);

    todoInput.value = "";
    todoInput.focus();
    render();
}

// 필터 적용 + 남은 개수 표시
function render() {
    let remain = 0;

    for (const li of todoList.children) {
        const isDone = li.classList.contains("done");

        if (!isDone) {
            remain++;
        }

        if (currentFilter === "all") {
            li.style.display = "";
        } else if (currentFilter === "done") {
            li.style.display = isDone ? "" : "none";
        } else {
            li.style.display = isDone ? "none" : "";
        }
    }

    todoCount.textContent = "남은 할 일: " + remain + "개";
}

todoAdd.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.isComposing) {
        addTodo();
    }
});

// 완료 / 삭제 : ul 하나에 위임
todoList.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (button === null) {
        return;
    }

    const li = button.closest("li");
    const action = button.dataset.action;

    if (action === "done") {
        li.classList.toggle("done");
    } else if (action === "delete") {
        li.remove();
    }

    render();
});

// 필터 버튼 : 버튼 영역 하나에 위임
filterArea.addEventListener("click", function(event) {
    const button = event.target.closest(".filter-btn");

    if (button === null) {
        return;
    }

    filterArea.querySelectorAll(".filter-btn").forEach(function(btn) {
        btn.classList.remove("active");
    });
    button.classList.add("active");

    currentFilter = button.dataset.filter;
    render();
});

render();


/*
    < 6. 정리 >

    이벤트 위임이란?
    : 부모 요소 하나에 리스너를 등록하고, event.target으로 실제 클릭한 자식을 구분하는 방법

    언제 사용하나?
    - 항목이 나중에 추가/삭제되는 목록 (할 일, 댓글, 장바구니, 채팅)
    - 같은 버튼이 아주 많을 때 (리스너를 하나만 만들면 됨)

    작성 순서
    1. 부모 요소에 이벤트 등록
    2. event.target.closest("선택자")로 원하는 요소 찾기
    3. null이면 return
    4. data-* 속성 등으로 어떤 동작인지 구분하여 처리

    주의
    - 자식에서 stopPropagation()을 사용하면 부모까지 전달되지 않아 위임이 동작하지 않는다.
*/
