/*
    02_DOM_Select.js

    < 1. DOM 요소 선택이란?

    DOM 요소 선택
    : HTML 문서에 존재하는 요소를 JavaScript에서 찾아 접근하는 것

    요소를 선택해야 할 수 있는 작업
    - 요소의 텍스트 변경
    - 요소의 속성 변경
    - CSS 스타일 및 클래스 변경
    - 이벤트 등록
    - 요소의 내용 조회

    대표적인 요소 선택 메서드

    document.getElementById()
    document.getElementsByClassName()
    document.getElementsByTagName()
    document.querySelector()
    document.querySelectorAll()

    실습용 HTML 구조 예시

    <h1 id="title">DOM 요소 선택</h1>

    <section id="menu">
        <h2>메뉴 목록</h2>
        <ul>
            <li class="menu-item">김치찌개</li>
            <li class="menu-item">된장찌개</li>
            <li class="menu-item">제육볶음</li>
        </ul>
    </section>

    <section id="notice">
        <h2>공지사항</h2>
        <p class="notice-item">첫 번째 공지</p>
        <p class="notice-item">두 번째 공지</p>
    </section>

    <button id="btn">확인</button>

    위 HTML 구조가 준비된 페이지에 이 JavaScript 파일을 연결한다.
*/

/*
    < 2. getElementById()

    document.getElementById("아이디")

    : 지정한 id를 가진 요소를 선택한다.
    : 요소 하나를 반환한다.
    : 해당 요소가 없으면 null을 반환한다.

    id는 일반적으로 HTML 문서에서 고유하게 사용한다.
    따라서 getElementById()는 특정 요소 하나를 선택할 때 적합하다.

    참고
    : getElementById()에는 #을 붙이지 않는다.
    : CSS 선택자를 전달하는 메서드가 아니기 때문이다.
*/

const title = document.getElementById("title");
console.log(title);
console.log(title.textContent);

// 잘못된 사용
// const title = document.getElementById("#title");

// 요소가 존재하지 않을 수 있다면 null 여부를 확인한다.
// const target = document.getElementById("notExist");
// console.log(target); // null

// if (target !== null) {
//     console.log(target.textContent);
// }


/*
    < 3. getElementsByClassName()

    document.getElementsByClassName("클래스명")

    : 지정한 클래스를 가진 요소들을 선택한다.
    : HTMLCollection 객체를 반환한다.
    : 일치하는 요소가 없어도 빈 HTMLCollection을 반환한다.

    클래스명 앞에 .을 붙이지 않는다.

    HTMLCollection
    : 여러 HTML 요소를 모아 제공하는 컬렉션 객체
    : 배열과 비슷하게 인덱스로 요소에 접근할 수 있다.
    : 일반 배열은 아니므로 map(), filter() 등의 배열 메서드를
      직접 사용할 수 없다.

    특징
    : getElementsByClassName()이 반환하는 HTMLCollection은
      일반적으로 live collection이다.
    : DOM에 해당 클래스의 요소가 추가되거나 제거되면
      컬렉션의 내용에도 변경 사항이 반영된다.
*/

// const menuItems = document.getElementsByClassName("menu-item");

// console.log(menuItems);
// console.log(menuItems.length); // 요소 개수
// console.log(menuItems[0]);     // 첫 번째 요소
// console.log(menuItems[1]);     // 두 번째 요소
// console.log(menuItems[2]);     // 세 번째 요소

// 클래스명에 .을 붙이지 않는다.
// const items = document.getElementsByClassName(".menu-item"); // 일치하지 않음


/*
    < 4. getElementsByTagName()

    document.getElementsByTagName("태그명")

    : 지정한 태그명을 가진 요소들을 선택한다.
    : HTMLCollection 객체를 반환한다.
    : 태그명은 일반적으로 소문자로 작성한다.

    특정 태그로 작성된 요소를 모두 선택할 때 사용할 수 있다.
*/

// const paragraphs = document.getElementsByTagName("p");

// console.log(paragraphs);
// console.log(paragraphs.length);

// const listItems = document.getElementsByTagName("li");

// for (let i = 0; i < listItems.length; i++) {
//     console.log(listItems[i].textContent);
// }


/*
    < 5. querySelector()

    document.querySelector("CSS 선택자")

    : CSS 선택자 문법을 이용해 요소를 선택한다.
    : 조건에 일치하는 첫 번째 요소를 반환한다.
    : 일치하는 요소가 없으면 null을 반환한다.

    CSS 선택자 문법을 그대로 활용할 수 있다는 장점이 있다.

    #id        : id 선택자
    .class     : class 선택자
    tag        : 태그 선택자
    부모 자식  : 자손 중 직접 자식 선택
    부모 자손  : 하위의 모든 자손 중 선택
*/

// id 선택자
// const title = document.querySelector("#title");

// class 선택자
// const firstMenu = document.querySelector(".menu-item");

// 태그 선택자
// const firstParagraph = document.querySelector("p");

// 자식 선택자
// const firstMenuItem = document.querySelector("#menu > ul > li");

// 자손 선택자
// const menuHeading = document.querySelector("#menu h2");

// console.log(title);
// console.log(firstMenu);
// console.log(firstParagraph);
// console.log(firstMenuItem);
// console.log(menuHeading);


/*
    < 6. querySelectorAll()

    document.querySelectorAll("CSS 선택자")

    : CSS 선택자에 일치하는 모든 요소를 선택한다.
    : NodeList 객체를 반환한다.
    : 일치하는 요소가 없으면 빈 NodeList를 반환한다.

    querySelector()와의 차이

    querySelector()
    : 첫 번째로 일치하는 요소 하나를 반환한다.

    querySelectorAll()
    : 일치하는 요소들을 모두 반환한다.

    querySelectorAll()이 반환하는 NodeList는
    일반적으로 정적(static) NodeList이다.
    선택 이후 DOM이 변경되어도 기존 NodeList의 항목은
    자동으로 갱신되지 않는다.
*/

// const menuItems = document.querySelectorAll(".menu-item");

// console.log(menuItems);
// console.log(menuItems.length);
// console.log(menuItems[0]);
// console.log(menuItems[1]);
// console.log(menuItems[2]);

// 모든 공지사항 선택
// const notices = document.querySelectorAll(".notice-item");
// console.log(notices);


/*
    < 7. HTMLCollection과 NodeList 비교

    HTMLCollection
    - getElementsByClassName()
    - getElementsByTagName()
    - 인덱스로 요소에 접근 가능
    - 일반적으로 live collection

    NodeList
    - querySelectorAll()
    - 인덱스로 요소에 접근 가능
    - forEach() 사용 가능
    - querySelectorAll()의 결과는 static NodeList

    주의
    : NodeList라는 이유만으로 무조건 정적인 것은 아니다.
      childNodes처럼 live NodeList를 반환하는 API도 있다.
    : 여기서는 querySelectorAll()의 반환값을 기준으로 비교한다.

    또한 두 객체 모두 일반 배열과는 다르다.
*/

// const collection = document.getElementsByClassName("menu-item");
// const nodeList = document.querySelectorAll(".menu-item");

// console.log(collection instanceof HTMLCollection); // true
// console.log(nodeList instanceof NodeList);           // true

// 배열인지 확인
// console.log(Array.isArray(collection)); // false
// console.log(Array.isArray(nodeList));   // false


/*
    < 8. 요소에 접근하는 방법

    여러 요소를 선택한 경우 인덱스로 개별 요소에 접근할 수 있다.

    인덱스는 0부터 시작한다.

    첫 번째 요소 : items[0]
    두 번째 요소 : items[1]
    세 번째 요소 : items[2]

    존재하지 않는 인덱스에 접근하면 undefined가 반환될 수 있다.
*/

// const items = document.querySelectorAll(".menu-item");

// console.log(items[0].textContent); // 김치찌개
// console.log(items[1].textContent); // 된장찌개
// console.log(items[2].textContent); // 제육볶음
// console.log(items[3]);             // undefined

// 존재 여부를 확인하고 접근하는 방법
// if (items.length > 0) {
//     console.log(items[0].textContent);
// }


/*
    < 9. 여러 요소 반복 처리 - for문

    querySelectorAll()로 여러 요소를 선택한 뒤
    for문으로 각 요소에 접근할 수 있다.

    배열의 인덱스를 사용하는 방식과 동일하게 반복할 수 있다.
*/

// const menuItems = document.querySelectorAll(".menu-item");

// for (let i = 0; i < menuItems.length; i++) {
//     console.log(menuItems[i].textContent);
// }


/*
    < 10. 여러 요소 반복 처리 - for...of

    for...of
    : 반복 가능한 객체에서 각 값을 하나씩 꺼내는 반복문

    NodeList와 HTMLCollection 모두 현대 브라우저에서
    일반적으로 for...of로 순회할 수 있다.
*/

// const menuItems = document.querySelectorAll(".menu-item");

// for (const item of menuItems) {
//     console.log(item.textContent);
// }


/*
    < 11. 여러 요소 반복 처리 - forEach()

    NodeList는 forEach() 메서드를 제공한다.

    forEach()
    : 컬렉션의 각 요소에 대해 콜백 함수를 실행한다.

    매개변수 item
    : 현재 반복 중인 요소

    매개변수 index
    : 현재 요소의 인덱스
*/

// const menuItems = document.querySelectorAll(".menu-item");

// menuItems.forEach(function(item, index) {
//     console.log(index, item.textContent);
// });

// 화살표 함수로 작성할 수도 있다.
// menuItems.forEach((item, index) => {
//     console.log(index, item.textContent);
// });

// 참고
// HTMLCollection에는 기본적으로 forEach()가 없다.
// 필요하면 Array.from()으로 배열로 변환할 수 있다.

// const collection = document.getElementsByClassName("menu-item");
// const array = Array.from(collection);

// array.forEach(item => {
//     console.log(item.textContent);
// });


/*
    < 12. CSS 선택자 조합하기

    querySelector()와 querySelectorAll()은
    CSS 선택자 문법을 이용하므로 여러 조건을 조합할 수 있다.

    #menu .menu-item
    : id가 menu인 요소의 하위에서 menu-item 클래스를 가진 요소

    #notice p
    : id가 notice인 요소의 하위에 있는 모든 p 요소

    #notice > p
    : id가 notice인 요소의 직접 자식 p 요소

    li.menu-item
    : li 태그이면서 menu-item 클래스를 가진 요소

    #menu, #notice
    : id가 menu 또는 notice인 요소

    :first-child, :last-child
    : 부모의 첫 번째 자식 또는 마지막 자식

    :nth-child(n)
    : 부모의 n번째 자식

    주의
    : nth-child()의 n은 1부터 시작한다.
    : JavaScript의 배열 인덱스는 0부터 시작한다.
*/

// const items = document.querySelectorAll("#menu .menu-item");
// const noticeParagraphs = document.querySelectorAll("#notice p");
// const directItems = document.querySelectorAll("#menu > ul > li");
// const listItems = document.querySelectorAll("li.menu-item");
// const firstChild = document.querySelector("#menu li:first-child");
// const secondChild = document.querySelector("#menu li:nth-child(2)");

// console.log(items);
// console.log(noticeParagraphs);
// console.log(directItems);
// console.log(listItems);
// console.log(firstChild);
// console.log(secondChild);


/*
    < 13. 특정 요소를 기준으로 하위 요소 선택하기

    document뿐 아니라 개별 요소에서도
    querySelector()와 querySelectorAll()을 사용할 수 있다.

    특정 영역 내부에서만 요소를 찾고 싶을 때 유용하다.

    예를 들어 #menu 내부의 .menu-item만 선택할 수 있다.
*/

// const menu = document.querySelector("#menu");

// const items = menu.querySelectorAll(".menu-item");

// console.log(items);

// 전체 문서에서 검색
// document.querySelectorAll(".menu-item");

// 특정 영역에서 검색
// menu.querySelectorAll(".menu-item");

// 같은 클래스가 다른 영역에도 있을 때
// 특정 영역으로 범위를 좁혀 선택할 수 있다.


/*
    < 14. 요소가 없을 때 주의하기

    querySelector()와 getElementById()는
    일치하는 요소가 없으면 null을 반환한다.

    null에 대해 textContent 같은 프로퍼티에 접근하면
    TypeError가 발생한다.

    따라서 요소가 실제로 존재하는지 확인할 수 있다.
*/

// const title = document.querySelector("#title");

// if (title !== null) {
//     console.log(title.textContent);
// } else {
//     console.log("요소를 찾을 수 없습니다.");
// }

// 간단한 조건 확인
// if (title) {
//     console.log(title.textContent);
// }


/*
    < 15. JavaScript 실행 시점과 요소 선택

    HTML 요소가 브라우저에 만들어지기 전에
    JavaScript가 먼저 실행되면 요소를 찾지 못할 수 있다.

    예를 들어 head에서 일반 script로 코드를 실행하면
    아직 body 요소가 파싱되지 않았을 수 있다.

    해결 방법

    1. script를 body 끝부분에 배치한다.
    2. script에 defer 속성을 사용한다.
    3. DOMContentLoaded 이벤트 이후에 실행한다.

    HTML 예시

    <script src="02_DOM_Select.js" defer></script>

    defer를 사용하면 HTML 파싱이 끝난 후
    해당 스크립트가 실행된다.

    참고
    : 아래 예제는 script가 defer로 연결되거나
      요소가 만들어진 후 실행된다는 전제이다.
*/


/*
    < 16. 선택 메서드 비교

    getElementById("title")
    : id로 요소 하나 선택
    : 요소가 없으면 null

    getElementsByClassName("menu-item")
    : 클래스로 여러 요소 선택
    : HTMLCollection 반환
    : live collection

    getElementsByTagName("li")
    : 태그명으로 여러 요소 선택
    : HTMLCollection 반환
    : live collection

    querySelector("#title")
    : CSS 선택자로 첫 번째 일치 요소 선택
    : 요소가 없으면 null

    querySelectorAll(".menu-item")
    : CSS 선택자로 모든 일치 요소 선택
    : static NodeList 반환

    실무에서는 선택자 표현이 유연한
    querySelector()와 querySelectorAll()을 자주 사용한다.

    다만 getElementById()도 간단하고 명확한 메서드이므로
    목적에 맞게 사용하면 된다.
*/


/*
    < 17. 실습 문제

    위에서 제시한 실습용 HTML 구조를 사용한다.

    문제 1.
    id가 title인 요소를 선택하여 콘솔에 출력하시오.

    문제 2.
    menu-item 클래스를 가진 요소를 모두 선택하여
    요소 개수를 출력하시오.

    문제 3.
    첫 번째 menu-item 요소의 텍스트를 출력하시오.

    문제 4.
    모든 menu-item 요소의 텍스트를 for문으로 출력하시오.

    문제 5.
    notice-item 클래스를 가진 모든 요소의 텍스트를
    forEach()로 출력하시오.

    문제 6.
    menu 영역 안에 있는 li 요소만 선택하여 출력하시오.

    문제 7.
    id가 btn인 요소를 선택하여 콘솔에 출력하시오.

    문제 8.
    존재하지 않는 id인 notExist를 선택했을 때
    반환되는 값을 확인하시오.

    문제 9.
    menu-item 클래스를 가진 요소가 HTMLCollection인지
    NodeList인지 각각 확인하시오.

    문제 10.
    id가 notice인 요소의 직접 자식 p 요소를 모두 선택하시오.
*/


/*
    < 18. 실습 문제 정답

    아래 코드는 문제를 모두 해결한 뒤 실행한다.
*/

// 문제 1
// const title = document.getElementById("title");
// console.log(title);

// 문제 2
// const menuItems = document.getElementsByClassName("menu-item");
// console.log(menuItems.length);

// 문제 3
// const firstItem = document.querySelector(".menu-item");
// console.log(firstItem.textContent);

// 문제 4
// const menuItems = document.querySelectorAll(".menu-item");

// for (let i = 0; i < menuItems.length; i++) {
//     console.log(menuItems[i].textContent);
// }

// 문제 5
// const notices = document.querySelectorAll(".notice-item");

// notices.forEach(notice => {
//     console.log(notice.textContent);
// });

// 문제 6
// const menuItems = document.querySelectorAll("#menu li");
// console.log(menuItems);

// 문제 7
// const button = document.getElementById("btn");
// console.log(button);

// 문제 8
// const target = document.getElementById("notExist");
// console.log(target); // null

// 문제 9
// const collection = document.getElementsByClassName("menu-item");
// const nodeList = document.querySelectorAll(".menu-item");

// console.log(collection instanceof HTMLCollection); // true
// console.log(nodeList instanceof NodeList);           // true

// 문제 10
// const notices = document.querySelectorAll("#notice > p");
// console.log(notices);