/*
=====================================================================================
[수업 콘티] 09_DOM / 06. DOM 탐색 (Traversal)              권장 60분 (설명 35 + 실습 25)
=====================================================================================
< 준비 >
- 06_traversal.html을 열고 F12 → Console, Elements 탭을 띄워 둔다.
- 이 파일은 모든 코드가 실행되는 상태다. 콘솔에 "< 2. 노드의 종류 >", "< 3. 부모 찾기 >" …
  제목이 섹션별로 찍히므로, 콘솔 출력을 위에서부터 읽어 내려가며 설명하면 된다.
- 판서용 : HTML의 #shop 구조(section > h2, 주석, ul > li*3, p)를 칠판에 트리로 그려 둔다.

< 진행 순서 >
1) DOM 탐색이란? (3분) - < 1 >
   - 판서 : "이미 찾은 요소에서 위 / 아래 / 옆으로 이동한다"
   ▶ 질문 던지기 : "클릭한 버튼과 같은 줄의 고객 이름은 어떻게 찾을까?" → < 13 >에서 해결

2) 노드의 종류 (5분) - < 2 >
   ▶ 시연 : 콘솔 nodeType 9(document) / 1(요소) / 3(텍스트), nodeName 확인
            (HTML의 "상품 목록 주석"처럼 주석도 노드다 → nodeType 8)
   ▶ 포인트 : HTML의 줄바꿈도 텍스트 노드다.

3) 부모 / 자식 / 형제 (12분)  ★ 핵심 - < 3 > ~ < 6 >
   ▶ 시연 : 콘솔에서 children(요소만 3개) vs childNodes(텍스트 노드 포함 7개) 비교
   ▶ 시연 : firstChild → #text / firstElementChild → li
   ▶ 시연 : item1.previousElementSibling → null (첫 번째라서)
   ▶ 포인트 : 이름에 "Element"가 들어간 것만 쓴다. (< 7 > 표)

4) 순회 (5분) - < 8 >, < 9 >
   ▶ 시연 : while문으로 nextElementSibling 따라가기 / children은 for...of 또는 Array.from

5) closest, matches, contains (7분) - < 10 > ~ < 12 >
   ▶ 시연 : span.closest("li") → 바로 위 li / closest("section") → 더 위의 section
   ▶ 포인트 : closest는 자기 자신도 검사한다. parentElement.parentElement… 대신 사용

6) 실전 패턴 (8분)  ★ 실무 - < 13 >, < 14 >
   ▶ 시연 : 주문 목록의 [확인] 클릭 → 그 행의 주문번호 / 고객명 / 금액 표시 + 행 배경 강조
            (button → closest("tr") → children[1])
   ▶ 시연 : FAQ 질문 클릭 → 바로 아래 답변 열기 / 닫기 (nextElementSibling + toggle)
   ▶ 포인트 : 10_event 06(이벤트 위임)에서 e.target.closest()로 다시 사용한다.

7) 자주 하는 실수, 정리 (5분) - < 15 >, < 16 >
   - < 16 > 정리표를 위 / 아래 / 옆 / 확인 네 칸으로 판서

< 예상 질문 / 자주 막히는 곳 >
- firstChild, nextSibling으로 찾아서 #text가 나오는 실수
- children.forEach → 에러 (HTMLCollection)
- null에서 다시 .id를 읽는 실수 → 존재 확인 먼저
- "querySelector로 찾으면 되지 왜 탐색을 배우나요?" → "클릭한 바로 그 요소" 기준으로 찾아야 할 때 필요

< 실습 연결 : 06_traversal_test.html / .js >
- 3)까지 설명 후 : 문제 1 ~ 4 (기초)
- 5)까지 설명 후 : 문제 5 ~ 7 (응용)
- 수업 마지막    : 문제 8 ~ 10 (심화, 좋아요 / 댓글 삭제 / 순서 변경 - closest 종합)
=====================================================================================
*/


/*
    06_traversal.js

    < 1. DOM 탐색(Traversal)이란? >

    DOM 탐색
    : 이미 선택한 요소를 기준으로 부모, 자식, 형제 요소로 이동하며
      다른 요소를 찾아가는 것

    querySelector()
    : 문서 전체(또는 특정 영역)에서 선택자로 "검색"한다.

    DOM 탐색
    : 지금 가지고 있는 요소에서 출발하여 "관계"를 따라 이동한다.

    언제 필요한가?
    - 클릭한 버튼이 들어 있는 행(tr)의 정보를 읽을 때
    - 질문 버튼 바로 다음에 있는 답변 요소를 열고 닫을 때
    - 목록(ul)의 자식(li)을 모두 확인할 때
    - 이벤트 위임에서 실제로 클릭된 항목을 찾을 때 (이벤트 수업에서 사용)

    노드 관계 (06_traversal.html의 #shop 영역)

    section#shop                      ← 부모(parent)
        ├── h2#shopTitle              ← 자식(child)
        ├── (주석)
        ├── ul#productList            ← 자식, h2의 형제(sibling)
        │     ├── li#item1            ← ul의 자식, 서로 형제
        │     ├── li#item2
        │     └── li#item3
        └── p#shopFooter              ← 자식, ul의 형제

    부모 노드 : 다른 노드를 포함하는 노드
    자식 노드 : 다른 노드에 포함된 노드
    형제 노드 : 같은 부모를 가진 노드
    조상 노드 : 부모, 부모의 부모 ... 위쪽 방향의 모든 노드
    자손 노드 : 자식, 자식의 자식 ... 아래쪽 방향의 모든 노드
*/


/*
    < 2. 노드의 종류 : nodeType, nodeName >

    DOM 트리에는 요소만 있는 것이 아니다.
    HTML 코드의 줄바꿈과 들여쓰기(공백), 주석도 노드가 된다.

    nodeType 값
    1 : 요소 노드 (Element)       예) <li>, <p>
    3 : 텍스트 노드 (Text)        예) "노트북", 줄바꿈과 공백
    8 : 주석 노드 (Comment)       예) <!-- 주석 -->
    9 : 문서 노드 (Document)      예) document

    nodeName
    : 요소 노드는 대문자 태그명 (LI, P, UL)
    : 텍스트 노드는 "#text", 주석 노드는 "#comment"

    이 차이 때문에 "노드" 기준 프로퍼티와 "요소" 기준 프로퍼티가
    따로 존재한다. (3번 ~ 7번에서 비교한다.)
*/

const shop = document.querySelector("#shop");

console.log("< 2. 노드의 종류 >");
console.log(document.nodeType);        // 9
console.log(shop.nodeType);            // 1
console.log(shop.nodeName);            // SECTION
console.log(shop.firstChild.nodeType); // 3 (줄바꿈과 공백으로 된 텍스트 노드)
console.log(shop.firstChild.nodeName); // #text


/*
    < 3. 부모 찾기 : parentElement, parentNode >

    요소.parentElement
    : 부모 "요소"를 반환한다.
    : 부모가 요소가 아니면 null을 반환한다.

    요소.parentNode
    : 부모 "노드"를 반환한다.
    : 부모가 document처럼 요소가 아닌 노드여도 반환한다.

    일반적인 HTML 요소에서는 두 결과가 같다.
    차이는 최상위 요소인 html에서 나타난다.

    html.parentNode     → document
    html.parentElement  → null (document는 요소가 아니기 때문)

    요소를 다룰 때는 보통 parentElement를 사용한다.
*/

const item1 = document.querySelector("#item1");

console.log("< 3. 부모 찾기 >");
console.log(item1.parentElement);                      // <ul id="productList">
console.log(item1.parentElement.id);                   // productList
console.log(item1.parentElement.parentElement.id);     // shop

const htmlElement = document.documentElement;          // <html> 요소

console.log(htmlElement.parentNode);                   // #document
console.log(htmlElement.parentElement);                // null


/*
    < 4. 자식 찾기 : children, childNodes >

    요소.children
    : 자식 "요소"만 모은 HTMLCollection을 반환한다.
    : 텍스트 노드와 주석 노드는 포함하지 않는다.

    요소.childNodes
    : 자식 "노드"를 모두 모은 NodeList를 반환한다.
    : 줄바꿈과 공백 텍스트 노드, 주석 노드까지 포함한다.

    #productList(ul) 안의 실제 구조

    ul
     ├── #text (줄바꿈과 공백)
     ├── li#item1
     ├── #text
     ├── li#item2
     ├── #text
     ├── li#item3
     └── #text

    children.length   → 3
    childNodes.length → 7

    대부분의 경우 요소만 필요하므로 children을 사용한다.
*/

const productList = document.querySelector("#productList");

console.log("< 4. 자식 찾기 >");
console.log(productList.children);            // HTMLCollection(3) [li#item1, li#item2, li#item3]
console.log(productList.children.length);     // 3
console.log(productList.childNodes);          // NodeList(7) [text, li, text, li, text, li, text]
console.log(productList.childNodes.length);   // 7

// 인덱스로 특정 자식 요소에 접근할 수 있다.
console.log(productList.children[0].id);      // item1
console.log(productList.children[2].id);      // item3

// 자식 요소의 개수만 필요할 때
console.log(productList.childElementCount);   // 3


/*
    < 5. 첫 번째 / 마지막 자식 >

    firstElementChild : 첫 번째 자식 요소
    lastElementChild  : 마지막 자식 요소

    firstChild        : 첫 번째 자식 노드 (텍스트 노드일 수 있음)
    lastChild         : 마지막 자식 노드 (텍스트 노드일 수 있음)

    자주 하는 실수
    : firstChild로 첫 번째 li를 가져오려고 하면
      줄바꿈 텍스트 노드가 반환되는 경우가 많다.
    : 요소가 필요하면 firstElementChild를 사용한다.

    자식 요소가 없으면 firstElementChild, lastElementChild는 null이다.
*/

console.log("< 5. 첫 번째 / 마지막 자식 >");
console.log(productList.firstChild);              // #text (줄바꿈)
console.log(productList.firstElementChild);       // <li id="item1">
console.log(productList.lastElementChild.id);     // item3

// li 안의 첫 번째 자식 요소는 span.name
console.log(item1.firstElementChild.textContent); // 노트북
console.log(item1.lastElementChild.textContent);  // 1200000


/*
    < 6. 형제 찾기 : nextElementSibling, previousElementSibling >

    nextElementSibling     : 바로 다음 형제 요소
    previousElementSibling : 바로 이전 형제 요소

    nextSibling            : 바로 다음 형제 노드 (텍스트, 주석 포함)
    previousSibling        : 바로 이전 형제 노드 (텍스트, 주석 포함)

    더 이상 형제가 없으면 null을 반환한다.

    #shop 영역 구조
    h2#shopTitle → #text → (주석) → #text → ul#productList → #text → p#shopFooter

    shopTitle.nextSibling        → #text
    shopTitle.nextElementSibling → ul#productList (텍스트와 주석은 건너뜀)
*/

const shopTitle = document.querySelector("#shopTitle");
const item2 = document.querySelector("#item2");

console.log("< 6. 형제 찾기 >");
console.log(shopTitle.nextSibling);                 // #text
console.log(shopTitle.nextSibling.nextSibling);     // <!-- 상품 목록 주석입니다. -->
console.log(shopTitle.nextElementSibling);          // <ul id="productList">

console.log(item2.previousElementSibling.id);       // item1
console.log(item2.nextElementSibling.id);           // item3

// 형제가 없는 경우
console.log(item1.previousElementSibling);          // null
console.log(productList.lastElementChild.nextElementSibling); // null


/*
    < 7. 노드 프로퍼티와 요소 프로퍼티 정리 >

    구분          노드 기준 (텍스트, 주석 포함)   요소 기준 (요소만)
    ---------------------------------------------------------------
    부모          parentNode                      parentElement
    자식 목록     childNodes                      children
    첫 번째 자식  firstChild                      firstElementChild
    마지막 자식   lastChild                       lastElementChild
    다음 형제     nextSibling                     nextElementSibling
    이전 형제     previousSibling                 previousElementSibling

    기억하는 방법
    : 이름에 Element가 들어가면 요소만 다룬다.
    : HTML 요소를 다룰 때는 Element가 들어간 프로퍼티를 우선 사용한다.
*/


/*
    < 8. 형제 요소 순회하기 >

    nextElementSibling은 마지막 형제에서 null을 반환한다.
    이 특징을 이용하면 while문으로 모든 다음 형제를 순회할 수 있다.

    let current = 시작요소;

    while (current !== null) {
        // current 처리
        current = current.nextElementSibling;
    }
*/

console.log("< 8. 형제 요소 순회 >");

let current = productList.firstElementChild;

while (current !== null) {
    console.log(current.id);              // item1, item2, item3
    current = current.nextElementSibling;
}


/*
    < 9. 자식 요소 반복 처리 >

    children은 HTMLCollection이다.
    - for문, for...of로 순회할 수 있다.
    - forEach(), map(), filter()는 직접 사용할 수 없다.
    - 배열 메서드가 필요하면 Array.from()으로 배열로 변환한다.
*/

console.log("< 9. 자식 요소 반복 처리 >");

// for...of
for (const li of productList.children) {
    console.log(li.querySelector(".name").textContent); // 노트북, 마우스, 키보드
}

// productList.children.forEach(...) // TypeError: forEach is not a function

// Array.from()으로 변환 후 배열 메서드 사용
const productNames = Array.from(productList.children).map(function(li) {
    return li.querySelector(".name").textContent;
});

console.log(productNames); // ['노트북', '마우스', '키보드']

// 할인 상품(sale 클래스)만 골라내기
const saleItems = Array.from(productList.children).filter(function(li) {
    return li.classList.contains("sale");
});

console.log(saleItems.length); // 1


/*
    < 10. closest() : 가장 가까운 조상 찾기 >

    요소.closest("CSS 선택자")
    : 자기 자신부터 시작하여 부모 방향으로 올라가며
      선택자와 일치하는 첫 번째 요소를 반환한다.
    : 일치하는 요소가 없으면 null을 반환한다.

    특징
    - 자기 자신도 검사 대상에 포함된다.
    - parentElement를 여러 번 쓰는 것보다 HTML 구조 변경에 강하다.

    parentElement.parentElement.parentElement
    → HTML 구조가 한 단계만 바뀌어도 다른 요소를 가리킨다.

    closest("li")
    → 중간 구조가 바뀌어도 가장 가까운 li를 찾는다.
*/

const firstPrice = document.querySelector("#item1 .price");

console.log("< 10. closest() >");
console.log(firstPrice.closest("li").id);         // item1
console.log(firstPrice.closest("ul").id);         // productList
console.log(firstPrice.closest("section").id);    // shop
console.log(firstPrice.closest(".price"));        // 자기 자신 (span.price)
console.log(firstPrice.closest("table"));         // null (조상 중에 table이 없음)


/*
    < 11. matches() : 선택자와 일치하는지 확인 >

    요소.matches("CSS 선택자")
    : 요소가 선택자와 일치하면 true, 아니면 false를 반환한다.

    classList.contains()는 클래스 하나만 확인할 수 있지만,
    matches()는 태그, id, 속성, 조합 선택자까지 확인할 수 있다.
*/

console.log("< 11. matches() >");
console.log(item2.matches(".product"));          // true
console.log(item2.matches(".sale"));             // true
console.log(item2.matches("li.product.sale"));   // true
console.log(item1.matches(".sale"));             // false
console.log(item1.matches("#productList > li")); // true


/*
    < 12. contains() : 자손 포함 여부 확인 >

    부모요소.contains(다른요소)
    : 다른 요소가 부모요소 자신이거나 자손이면 true를 반환한다.
*/

const shopFooter = document.querySelector("#shopFooter");

console.log("< 12. contains() >");
console.log(shop.contains(item1));           // true (자손)
console.log(productList.contains(shopFooter)); // false (형제의 자손이 아님)
console.log(shop.contains(shop));            // true (자기 자신)


/*
    < 13. 실전 패턴 1 : 클릭한 버튼이 속한 행의 정보 읽기 >

    표의 각 행마다 같은 버튼이 있을 때
    어떤 행의 버튼을 눌렀는지 알아야 한다.

    구현 순서
    1. 클릭한 버튼에서 closest("tr")로 행을 찾는다.
    2. 행의 children 또는 cells로 각 칸(td)에 접근한다.
    3. 필요한 칸의 textContent를 읽는다.

    참고
    : 이벤트 등록은 이벤트 수업에서 자세히 다룬다.
    : 여기서는 click 이벤트로 결과만 확인한다.
*/

const checkButtons = document.querySelectorAll("#orderTable .check-btn");
const rowResult = document.querySelector("#rowResult");

checkButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const row = button.closest("tr");

        const orderNo = row.children[0].textContent;
        const customer = row.children[1].textContent;
        const amount = row.children[2].textContent;

        console.log(orderNo, customer, amount);

        rowResult.textContent =
            "주문번호: " + orderNo +
            " / 고객명: " + customer +
            " / 금액: " + amount + "원";

        // 선택된 행 표시 : 형제 행들의 표시를 지우고 현재 행만 표시
        for (const tr of row.parentElement.children) {
            tr.classList.remove("selected");
        }

        row.classList.add("selected");
    });
});


/*
    < 14. 실전 패턴 2 : 형제 요소로 FAQ 열고 닫기 >

    질문 버튼 바로 다음 형제 요소가 답변이다.

    <div class="faq-item">
        <button class="faq-question">질문</button>   ← 클릭
        <p class="faq-answer">답변</p>                ← nextElementSibling
    </div>

    구현 순서
    1. 질문 버튼을 클릭한다.
    2. nextElementSibling으로 답변 요소를 찾는다.
    3. classList.toggle()로 open 클래스를 전환한다.
*/

const questions = document.querySelectorAll(".faq-question");

questions.forEach(function(question) {
    question.addEventListener("click", function() {
        const answer = question.nextElementSibling;

        answer.classList.toggle("open");
    });
});


/*
    < 15. 자주 하는 실수 >

    1) firstChild, nextSibling으로 요소를 찾으려는 실수
       : 줄바꿈 텍스트 노드가 반환된다.
       : firstElementChild, nextElementSibling을 사용한다.

    2) children에 forEach()를 바로 사용하는 실수
       : HTMLCollection에는 forEach()가 없다.
       : for...of 또는 Array.from()을 사용한다.

    3) null에서 다시 탐색하는 실수
       : item1.previousElementSibling.id
         → previousElementSibling이 null이므로 TypeError 발생
       : 존재 여부를 먼저 확인한다.

    4) parentElement를 여러 번 이어 쓰는 실수
       : HTML 구조가 바뀌면 엉뚱한 요소를 가리킨다.
       : 특정 조상을 찾을 때는 closest()를 사용한다.

    5) closest()가 자기 자신을 포함한다는 사실을 잊는 실수
       : span.closest("span")은 자기 자신을 반환한다.
*/

console.log("< 15. 자주 하는 실수 >");

// 3) null 확인 후 접근하기
const prevItem = item1.previousElementSibling;

if (prevItem !== null) {
    console.log(prevItem.id);
} else {
    console.log("이전 형제 요소가 없습니다.");
}


/*
    < 16. 정리 >

    위로 이동
    - parentElement          : 바로 위 부모 요소
    - closest("선택자")       : 조건에 맞는 가장 가까운 조상 (자기 자신 포함)

    아래로 이동
    - children               : 자식 요소 목록
    - firstElementChild      : 첫 번째 자식 요소
    - lastElementChild       : 마지막 자식 요소
    - querySelector()        : 자손 중 선택자로 검색

    옆으로 이동
    - nextElementSibling     : 다음 형제 요소
    - previousElementSibling : 이전 형제 요소

    확인
    - matches("선택자")      : 선택자와 일치하는지
    - contains(요소)         : 자손으로 포함하는지
*/
