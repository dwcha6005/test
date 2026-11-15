/*
=====================================================================================
[수업 콘티] 09_DOM / 05. 요소 생성과 삭제                  권장 80분 (설명 50 + 실습 30)
=====================================================================================
< 준비 >
- 05_create_remove.html을 열고 F12 → Elements, Console 탭을 띄워 둔다.
- 이 파일은 < 3 > ~ < 26 > 코드가 모두 실행되는 상태다.
  → 새로고침하면 "1. 요소 생성" 영역에 결과가 한꺼번에 쌓인다.
  → 추천 진행 : 설명할 섹션 "아래"를 통째로 블록 주석으로 막고 한 섹션씩 풀어 가며 진행한다.
    (또는 콘솔에서 직접 createElement → append를 한 줄씩 입력하며 시연)
- 참고 : < 26 > 정답의 문제 8(todoList.replaceChildren())이 마지막에 실행되므로,
  처음 열면 "2. 목록 추가"의 목록이 비어 있는 것이 정상이다.
- HTML의 [요소 생성], [요소 교체], [요소 복제] 버튼에는 이벤트가 연결되어 있지 않다. (05_create_remove_test에서 사용)

< 진행 순서 >
1) 개요 (3분) - < 1 >
   - 판서 : 만들기(createElement) → 채우기(textContent, classList) → 붙이기(append) → 지우기(remove)

2) 만들기와 붙이기 (12분)  ★ 핵심 - < 3 > ~ < 7 >
   ▶ 시연 : 콘솔에서 const p = document.createElement("p"); p.textContent = "새 문단";
            → 화면에 아무것도 없음 (메모리에만 있다) → result.append(p) → 화면에 나타남
   ▶ 시연 : append(span, " / ", strong) → 여러 개 + 문자열도 가능 (appendChild는 1개, 노드만)
   ▶ 판서 : prepend(안쪽 맨 앞) / append(안쪽 맨 뒤) / before(바깥 앞) / after(바깥 뒤)

3) 위치 관계, 이동 (5분) - < 8 >, < 9 >
   ▶ 시연 : 이미 있는 요소를 다른 부모에 append → "복사"가 아니라 "이동" (contains 결과 확인)

4) 삭제 (7분) - < 10 > ~ < 12 >
   ▶ 포인트 : remove() 후에도 변수에는 요소가 남아 있다. / 없는 요소는 null 확인 후 삭제

5) 교체와 복제 (8분) - < 13 > ~ < 16 >
   ▶ 시연 : "4. 요소 교체와 복제" 영역에서 oldText가 h3로 바뀐 것 확인
   ▶ 시연 : cloneNode() vs cloneNode(true) → 얕은 복제는 글자가 없다
   ▶ 포인트 : 복제하면 id도 복제됨 → id 변경 필수

6) 실제 예 : 할 일 목록 (10분)  ★ 실무 - < 17 > ~ < 19 >
   ▶ 시연 : 입력 후 [목록 추가] → li 추가, 입력창 비워짐 / 빈 값 → alert
   ▶ 시연 : [전체 삭제] → replaceChildren()
   ▶ 포인트 : 흐름 "입력값 읽기 → 요소 생성 → 내용 지정 → DOM에 추가" 판서
   - < 18 > 삭제 버튼 달린 항목 : addTodoItem("DOM 실습") 주석을 풀어 확인

7) innerHTML vs createElement, 보안 (5분) - < 20 >, < 21 >
   ▶ 시연 : result.innerHTML = userText 주석을 풀면 → alert("위험") 실행 → 원복
   ▶ 포인트 : 사용자 입력은 textContent. 이것만 기억하면 된다.

8) DocumentFragment, 카드 생성, 속성 지정 (5분) - < 22 > ~ < 24 >
   ▶ 시연 : [카드 추가] 여러 번 → 카드마다 [카드 삭제] 동작
   - DocumentFragment는 "이런 것도 있다" 정도로 소개

< 예상 질문 / 자주 막히는 곳 >
- createElement만 하고 append를 안 해서 "화면에 안 나와요"
- 같은 요소를 두 군데 append → 하나만 남는다 (이동)
- appendChild("문자열") → 에러 (append는 가능)
- 이 파일 안의 < 25 > 문제 / < 26 > 정답은 복습용이다. 수업 시간 실습은 05_create_remove_test를 사용한다.

< 실습 연결 : 05_create_remove_test.html / .js >
- 4)까지 설명 후 : 문제 1 ~ 4 (기초)
- 6)까지 설명 후 : 문제 5 ~ 7 (응용)
- 수업 마지막    : 문제 8 ~ 10 (심화, 방명록 / 장바구니 - 10_event 이전 미리보기 성격)
=====================================================================================
*/



/*
    < 1. DOM 요소 생성과 삭제 >

    JavaScript를 이용하면 HTML 문서에 새로운 요소를 만들거나,
    기존 요소에 추가하거나, 삭제하거나, 다른 요소로 교체할 수 있다.

    주요 메서드

    document.createElement() : 새로운 요소 생성
    append()                 : 요소 또는 문자열을 마지막에 추가
    appendChild()            : 노드를 마지막 자식으로 추가
    prepend()                : 요소 또는 문자열을 맨 앞에 추가
    before()                 : 요소 앞에 추가
    after()                  : 요소 뒤에 추가
    remove()                 : 요소 삭제
    replaceWith()            : 요소를 다른 노드로 교체
    cloneNode()              : 노드 복제


    < 2. 실습용 HTML >

    아래 구조를 별도의 HTML 파일에 작성한다.

    <h1>DOM 요소 생성과 삭제</h1>

    <section>
        <h2>1. 요소 생성</h2>
        <div id="result"></div>
        <button id="createBtn">요소 생성</button>
    </section>

    <section>
        <h2>2. 목록 추가</h2>
        <input type="text" id="itemInput" placeholder="할 일 입력">
        <button id="addBtn">목록 추가</button>
        <ul id="todoList"></ul>
        <button id="clearBtn">전체 삭제</button>
    </section>

    <section>
        <h2>3. 카드 추가</h2>
        <div id="cardList"></div>
        <button id="cardBtn">카드 추가</button>
    </section>

    <section>
        <h2>4. 요소 교체와 복제</h2>
        <div id="replaceArea">
            <p id="oldText">교체할 요소입니다.</p>
        </div>
        <button id="replaceBtn">요소 교체</button>

        <div id="cloneArea">
            <p id="original">복제할 원본 요소입니다.</p>
        </div>
        <button id="cloneBtn">요소 복제</button>
    </section>

    <script src="05_DOM_Create_Remove.js" defer></script>
*/


// < 3. 요소 생성하기 : createElement() >

// createElement()는 지정한 태그의 HTML 요소를 생성한다.
// 단, 생성한 요소가 자동으로 화면에 표시되는 것은 아니다.

const newParagraph = document.createElement("p");

console.log(newParagraph);
console.log(newParagraph instanceof HTMLElement); // true

// 생성한 요소에 텍스트를 지정한다.
newParagraph.textContent = "JavaScript로 생성한 문단입니다.";

// CSS 클래스를 지정한다.
newParagraph.classList.add("message");

// 아직 문서에 추가하지 않았으므로 화면에는 표시되지 않는다.
// 실제로 화면에 표시하려면 기존 DOM 요소에 연결해야 한다.


// < 4. 생성한 요소를 문서에 추가하기 : appendChild() >

const result = document.querySelector("#result");

// result 요소의 마지막 자식으로 추가한다.
result.appendChild(newParagraph);

// appendChild()는 전달한 노드를 DOM에 연결한다.
// 연결된 요소는 브라우저 화면에 표시될 수 있다.


// < 5. append()와 appendChild()의 차이 >

const paragraph1 = document.createElement("p");
paragraph1.textContent = "append()로 추가한 문단";

result.append(paragraph1);

const paragraph2 = document.createElement("p");
paragraph2.textContent = "appendChild()로 추가한 문단";

result.appendChild(paragraph2);

/*
    append()

    - Node와 문자열을 추가할 수 있다.
    - 여러 개의 항목을 한 번에 전달할 수 있다.
    - 반환값은 undefined이다.

    appendChild()

    - Node를 추가한다. 일반 문자열을 그대로 전달하는 방식은 지원하지 않는다.
    - 한 번에 하나의 노드를 추가한다.
    - 추가한 노드 자체를 반환한다.
*/

result.append("일반 문자열도 추가할 수 있습니다.");

const span = document.createElement("span");
span.textContent = "SPAN 요소";

const strong = document.createElement("strong");
strong.textContent = "STRONG 요소";

result.append(span, " / ", strong);


// < 6. prepend() : 맨 앞에 추가하기 >

const firstParagraph = document.createElement("p");
firstParagraph.textContent = "맨 앞에 추가된 문단";

result.prepend(firstParagraph);

// append()는 마지막 자식으로,
// prepend()는 첫 번째 자식으로 추가한다.


// < 7. before()와 after() >

const referenceParagraph = document.createElement("p");
referenceParagraph.textContent = "기준 문단";

result.append(referenceParagraph);

const beforeParagraph = document.createElement("p");
beforeParagraph.textContent = "기준 문단 앞에 추가";

referenceParagraph.before(beforeParagraph);

const afterParagraph = document.createElement("p");
afterParagraph.textContent = "기준 문단 뒤에 추가";

referenceParagraph.after(afterParagraph);

/*
    기준 요소가 result의 자식이라고 가정하면 다음 순서가 된다.

    beforeParagraph
    referenceParagraph
    afterParagraph

    before()와 after()는 기준 요소의 자식으로 넣는 메서드가 아니다.
    기준 요소와 같은 부모 아래에서 앞이나 뒤에 배치한다.
*/


// < 8. 요소의 위치 관계 이해하기 >

/*
    <div id="parent">
        <p id="child">자식 요소</p>
    </div>

    parent
        └── child

    parent.append(child)
    - child를 parent의 마지막 자식으로 배치한다.

    child.before(newElement)
    - newElement를 child 앞에 배치한다.
    - child와 newElement는 같은 부모를 갖는다.
*/


// < 9. 이미 존재하는 요소를 다른 위치로 이동하기 >

const parentA = document.createElement("div");
const parentB = document.createElement("div");
const movingElement = document.createElement("p");

parentA.id = "parentA";
parentB.id = "parentB";
movingElement.textContent = "이동할 요소";

result.append(parentA, parentB);
parentA.append(movingElement);

// 이미 문서에 연결된 요소를 다른 부모에 추가하면 복제되는 것이 아니라 이동한다.
parentB.append(movingElement);

// 이동 후 movingElement는 parentB의 자식이다.
// parentA에는 movingElement가 남아 있지 않다.

console.log(parentA.contains(movingElement)); // false
console.log(parentB.contains(movingElement)); // true


// < 10. 요소 삭제하기 : remove() >

const temporaryParagraph = document.createElement("p");
temporaryParagraph.textContent = "삭제할 문단";

result.append(temporaryParagraph);

// 생성한 요소를 삭제한다.
temporaryParagraph.remove();

// remove()는 해당 요소를 DOM에서 제거한다.
// JavaScript 변수 temporaryParagraph 자체가 사라지는 것은 아니다.
// 변수가 참조하는 요소 객체는 계속 사용할 수 있다.

console.log(temporaryParagraph);


// < 11. 부모를 통해 자식 요소 삭제하기 >

const parent = document.createElement("div");
const child = document.createElement("p");

child.textContent = "부모를 통해 삭제할 문단";
parent.append(child);
result.append(parent);

// 부모에서 특정 자식 노드를 제거한다.
parent.removeChild(child);

// removeChild()는 제거한 노드를 반환한다.
// 제거할 노드가 해당 부모의 자식이 아니면 오류가 발생한다.

console.log(child.parentElement); // null


// < 12. 요소 존재 여부 확인하기 >

const target = document.querySelector("#notExist");

if (target !== null) {
    target.remove();
} else {
    console.log("삭제할 요소가 없습니다.");
}

// querySelector()는 요소를 찾지 못하면 null을 반환한다.
// 따라서 선택 결과를 확인한 뒤 메서드를 호출할 수 있다.


// < 13. replaceWith() : 요소 교체하기 >

const replaceArea = document.querySelector("#replaceArea");
const oldText = document.querySelector("#oldText");

const newText = document.createElement("h3");
newText.textContent = "새로운 요소로 교체했습니다.";
newText.classList.add("message");

oldText.replaceWith(newText);

// oldText는 DOM에서 제거되고 newText가 그 자리에 들어간다.
// oldText 변수가 자동으로 없어지는 것은 아니다.


// < 14. replaceChild()로 교체하기 >

const oldElement = document.createElement("p");
oldElement.textContent = "기존 요소";

const newElement = document.createElement("p");
newElement.textContent = "새 요소";

result.append(oldElement);

// 부모 노드의 replaceChild(새 노드, 기존 노드)
// 첫 번째 인수는 새 노드, 두 번째 인수는 교체할 기존 노드다.
result.replaceChild(newElement, oldElement);


// < 15. 요소 복제하기 : cloneNode() >

const original = document.createElement("div");
original.textContent = "원본 요소";
original.classList.add("card");

result.append(original);

// false 또는 인수를 생략하면 해당 요소 자체만 복제한다.
const shallowCopy = original.cloneNode();

console.log(shallowCopy.textContent); // 원본 요소

// true를 전달하면 자식 요소까지 복제한다.
const deepCopy = original.cloneNode(true);

result.append(shallowCopy, deepCopy);

/*
    cloneNode()

    cloneNode(false)
    - 요소 자체만 복제한다.
    - 자식 요소는 복제하지 않는다.

    cloneNode(true)
    - 요소와 자식 요소를 함께 복제한다.

    주의
    - 복제한 요소에 이벤트 리스너가 자동으로 복사되지는 않는다.
    - id가 있는 요소를 복제하면 중복 id가 생길 수 있으므로 주의한다.
*/


// < 16. 복제한 요소의 id 변경하기 >

const originalBox = document.createElement("div");
originalBox.id = "box1";
originalBox.textContent = "첫 번째 박스";

const copiedBox = originalBox.cloneNode(true);

// 복제 요소의 id를 변경하여 중복을 방지한다.
copiedBox.id = "box2";
copiedBox.textContent = "두 번째 박스";

result.append(originalBox, copiedBox);


// < 17. 입력값을 이용해 목록 추가하기 >

const itemInput = document.querySelector("#itemInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");

addBtn.addEventListener("click", function () {
    const text = itemInput.value.trim();

    // 입력값이 비어 있으면 추가하지 않는다.
    if (text === "") {
        alert("할 일을 입력하세요.");
        return;
    }

    // 새로운 li 요소 생성
    const li = document.createElement("li");

    // 사용자 입력은 textContent로 넣는다.
    li.textContent = text;

    // 목록에 추가
    todoList.append(li);

    // 입력창 초기화
    itemInput.value = "";

    // 입력창에 다시 포커스
    itemInput.focus();
});

// 핵심 흐름
// 입력값 읽기 → 요소 생성 → 내용 지정 → DOM에 추가


// < 18. 목록 항목에 삭제 버튼 추가하기 >

// 위 17번의 이벤트 등록 코드를 대신 사용하거나,
// 별도의 버튼과 목록으로 실습할 수 있다.

function addTodoItem(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");

    span.textContent = text;
    deleteBtn.textContent = "삭제";
    deleteBtn.type = "button";

    // li 안에 글자와 버튼을 함께 추가한다.
    li.append(span, " ", deleteBtn);

    // 삭제 버튼을 누르면 해당 li만 제거한다.
    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

    todoList.append(li);
}

// 별도 테스트를 원할 때만 실행한다.
// addTodoItem("JavaScript 복습");
// addTodoItem("DOM 실습");


// < 19. 전체 목록 삭제하기 >

const clearBtn = document.querySelector("#clearBtn");

clearBtn.addEventListener("click", function () {
    todoList.replaceChildren();
});

// replaceChildren()에 인수를 전달하지 않으면
// 해당 요소의 모든 자식 노드를 제거한다.
// todoList 요소 자체는 그대로 남는다.


// < 20. innerHTML과 요소 생성 방식 비교 >

// 문자열로 HTML을 작성하는 방법
const htmlExample = document.createElement("div");

htmlExample.innerHTML = "<p>HTML 문자열로 만든 문단</p>";

result.append(htmlExample);

// createElement()로 만드는 방법
const safeExample = document.createElement("div");
const safeParagraph = document.createElement("p");

safeParagraph.textContent = "DOM 메서드로 만든 문단";
safeExample.append(safeParagraph);

result.append(safeExample);

/*
    innerHTML

    - 문자열을 HTML로 해석한다.
    - 짧은 정적 HTML 구조를 작성할 때 편리하다.
    - 신뢰할 수 없는 사용자 입력을 삽입하면 XSS 취약점이 발생할 수 있다.

    createElement() + textContent

    - 요소와 내용을 분리해서 만든다.
    - 사용자 입력을 일반 텍스트로 넣을 때 안전한 기본 선택이다.
*/


// < 21. 사용자 입력을 innerHTML에 직접 넣으면 안 되는 이유 >

const userText = "<img src=x onerror=alert('위험')>";

const safeParagraph2 = document.createElement("p");
safeParagraph2.textContent = userText;

result.append(safeParagraph2);

// 위 코드는 입력 내용을 HTML로 실행하지 않고 글자로 표시한다.

// 위험한 방식의 예시
// result.innerHTML = userText;
//
// 신뢰할 수 없는 문자열을 innerHTML에 직접 넣으면 안 된다.
// 실제 공격 가능성은 입력 내용과 실행 환경에 따라 달라진다.


// < 22. DocumentFragment로 여러 요소 추가하기 >

const fragment = document.createDocumentFragment();

for (let i = 1; i <= 3; i++) {
    const li = document.createElement("li");
    li.textContent = `항목 ${i}`;
    fragment.append(li);
}

// 완성한 노드들을 한 번에 실제 목록에 연결한다.
todoList.append(fragment);

// DocumentFragment 자체는 일반적인 HTML 요소가 아니다.
// fragment를 DOM에 추가하면 그 자식 노드들이 이동하고,
// fragment 자체는 비어 있게 된다.


// < 23. 카드 요소 동적으로 생성하기 >

const cardList = document.querySelector("#cardList");
const cardBtn = document.querySelector("#cardBtn");

let cardCount = 0;

cardBtn.addEventListener("click", function () {
    cardCount++;

    const card = document.createElement("div");
    const heading = document.createElement("h3");
    const paragraph = document.createElement("p");
    const deleteBtn = document.createElement("button");

    card.classList.add("card");

    heading.textContent = `카드 ${cardCount}`;
    paragraph.textContent = "JavaScript로 동적으로 생성한 카드입니다.";
    deleteBtn.textContent = "카드 삭제";
    deleteBtn.type = "button";

    deleteBtn.addEventListener("click", function () {
        card.remove();
    });

    card.append(heading, paragraph, deleteBtn);
    cardList.append(card);
});


// < 24. 생성한 요소에 속성 지정하기 >

const link = document.createElement("a");

link.textContent = "OpenAI 홈페이지";
link.href = "https://openai.com";
link.target = "_blank";
link.rel = "noopener noreferrer";

result.append(link);

// href, target, rel 등의 DOM 프로퍼티를 이용해 속성을 지정할 수 있다.
// 일반적으로 외부 링크를 새 탭으로 열 때 rel에
// noopener noreferrer를 지정하면 안전성 및 개인정보 보호에 도움이 된다.


// < 25. 실습 문제 >

/*
    [문제 1]
    p 요소를 생성하고 "DOM 요소 생성 실습"이라는 문구를 넣어
    id가 result인 요소의 마지막에 추가하시오.

    [문제 2]
    id가 result인 요소에 "첫 번째 요소"라는 문단을 맨 앞에 추가하시오.

    [문제 3]
    id가 result인 요소에 있는 마지막 자식 요소를 삭제하시오.
    단, 자식 요소가 있는지 먼저 확인하시오.

    [문제 4]
    id가 todoList인 요소에 새로운 li를 생성하여
    "JavaScript 공부하기"라는 문구를 추가하시오.

    [문제 5]
    id가 oldText인 요소를 새로운 h2 요소로 교체하시오.

    [문제 6]
    id가 original인 요소를 자식 요소까지 복제하고
    id가 cloneArea인 요소에 추가하시오.

    [문제 7]
    버튼을 클릭하면 id가 cardList인 요소에
    새로운 카드가 추가되도록 구현하시오.

    [문제 8]
    id가 todoList인 요소의 모든 자식 요소를 삭제하시오.
*/


// < 26. 실습 문제 정답 >

// 문제 1
const answer1 = document.createElement("p");
answer1.textContent = "DOM 요소 생성 실습";
result.append(answer1);

// 문제 2
const answer2 = document.createElement("p");
answer2.textContent = "첫 번째 요소";
result.prepend(answer2);

// 문제 3
if (result.lastElementChild !== null) {
    result.lastElementChild.remove();
}

// 문제 4
const answer4 = document.createElement("li");
answer4.textContent = "JavaScript 공부하기";
todoList.append(answer4);

// 문제 5
const answer5 = document.createElement("h2");
answer5.textContent = "새로운 제목";

const oldTextForAnswer = document.querySelector("#oldText");

if (oldTextForAnswer !== null) {
    oldTextForAnswer.replaceWith(answer5);
}

// 문제 6
const originalForAnswer = document.querySelector("#original");
const cloneArea = document.querySelector("#cloneArea");

if (originalForAnswer !== null && cloneArea !== null) {
    const answer6 = originalForAnswer.cloneNode(true);

    // 복제한 요소의 id가 중복되지 않도록 변경한다.
    answer6.id = "originalCopy";
    cloneArea.append(answer6);
}

// 문제 7
// 위 23번 카드 생성 실습을 참고한다.

// 문제 8
todoList.replaceChildren();
