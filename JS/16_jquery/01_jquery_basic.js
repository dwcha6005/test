/*
=====================================================================================
[수업 콘티] 16_jquery / 01. jQuery 기초                   권장 60분 (설명 35 + 실습 25)
=====================================================================================
< 준비 >
- 인터넷 연결 필요 (jQuery를 CDN에서 불러온다)
- 01_jquery_basic.html을 브라우저로 열고 F12 → Console, Elements 탭을 띄워 둔다.
- 09_DOM 06_traversal.js, 10_event 06_delegation.js를 옆에 열어 두면 비교하기 좋다.
- 이 파일은 모든 섹션이 실행되는 상태다. 콘솔에 "< 3. 선택 >" 같은 제목이 섹션마다 찍히므로
  콘솔을 위에서부터 읽어 내려가며 설명하면 된다.

< 진행 순서 >
1) jQuery란? (5분) - 섹션 1
   - 판서 : "바닐라 JS로 5줄 → jQuery로 1줄"
   ▶ 질문 던지기 : "이미 DOM을 다 배웠는데 왜 jQuery를?" → 실무의 기존 코드를 읽고 고칠 수 있어야 한다.
   ▶ 포인트 : 새 프로젝트는 바닐라 JS 또는 React. jQuery는 "읽고 고칠 수 있을 정도"가 목표

2) 연결하기 (5분) - 섹션 2 (HTML head 참고)
   ▶ 시연 : HTML에서 두 script 순서를 바꾸고 새로고침 → "$ is not defined" → 원복
   ▶ 시연 : 콘솔에 $ 입력 → 함수가 나온다. jQuery === $ → true
   ▶ 포인트 : $(function () { ... }) = DOMContentLoaded (예전 코드에서 아주 많이 보인다)

3) 선택 (7분)  ★ 핵심 - 섹션 3
   ▶ 시연 : $(".menu-item") 출력 → jQuery 객체(유사 배열), length 3
   ▶ 시연 : $("#notExist").text("x") → 에러가 나지 않는다 (바닐라는 null → TypeError)
            → 편하지만 "오타를 내도 조용히 넘어간다"는 단점도 있다
   ▶ 포인트 : 변수 이름 앞에 $를 붙이는 관례 ($menu = jQuery 객체, menu = DOM 요소)

4) 내용, 속성, 클래스 (10분) - 섹션 4 ~ 6
   ▶ 판서 : 같은 이름으로 "값 없이 → 읽기 / 값 넣으면 → 쓰기"
            text() / text("새 값"), val() / val("새 값"), attr("href") / attr("href", "...")
   ▶ 시연 : 체크박스 클릭 후 콘솔에서 $("#agree").prop("checked") / .attr("checked") 비교
   ▶ 시연 : data("price")는 숫자 12000으로 나온다 (dataset은 문자열이었다)
   ▶ 주의 : jQuery 4.0부터 css("font-size", 20)처럼 숫자만 쓰면 px가 자동으로 붙지 않는다 → "20px"

5) 여러 요소 한 번에, each() (3분) - 섹션 7
   ▶ 시연 : $(".menu-item").addClass("highlight") → 반복문 없이 3개 모두 적용
   ▶ 포인트 : 각각 다른 값이 필요할 때만 each() (점수에 따라 다른 표시)

6) 생성, 삭제, 탐색 (5분) - 섹션 8, 9
   ▶ 시연 : 할 일 목록에 항목 추가된 것 확인, 콘솔에서 $("#todoList").empty()
   ▶ 시연 : $("#item2 .name").closest("li").siblings() → 나머지 두 상품

7) 체이닝, 비교표 (0분 ~ 수업 남는 시간) - 섹션 10, 11
   - 비교표를 화면에 띄우고 "외우지 말고 필요할 때 찾아본다"로 정리

< 예상 질문 / 자주 막히는 곳 >
- "$ is not defined" → jQuery script를 내 script보다 먼저, 또는 인터넷 연결 확인
- $("#title").textContent → undefined. jQuery 객체에는 DOM 프로퍼티가 없다 → .text() 또는 $("#title")[0].textContent
- $(".menu-item").text() → 첫 번째만이 아니라 "모든 요소의 글자를 합친 값"이 나온다
- 인터넷의 예전 코드에서 $.trim() → jQuery 4.0에서 삭제됨. 문자열.trim() 사용

< 실습 연결 : 01_jquery_basic_test.html / .js >
- 4)까지 설명 후 : 문제 1 ~ 4 (기초)
- 6)까지 설명 후 : 문제 5 ~ 7 (응용)
- 수업 마지막    : 문제 8 ~ 10 (심화, 문제 10은 바닐라 코드를 jQuery로 바꾸기)
=====================================================================================
*/


/*
    01_jquery_basic.js

    < 1. jQuery란? >

    jQuery
    : DOM 선택, 조작, 이벤트, 애니메이션, Ajax를 "짧게" 쓸 수 있게 해 주는 JavaScript 라이브러리
    : 2006년에 등장. 브라우저마다 DOM 사용법이 제각각이던 시절에 "어디서나 똑같이 동작"해서 인기를 얻었다.

    지금은?
    - 브라우저가 querySelector, classList, fetch 등을 기본으로 제공하면서
      새 프로젝트에서는 바닐라 JS나 React 같은 프레임워크를 주로 사용한다.
    - 하지만 오래된 회사 사이트, 관리자 페이지, 쇼핑몰 솔루션, 플러그인 등에 jQuery 코드가 여전히 많다.
    → 목표 : "jQuery 코드를 보고 무슨 뜻인지 읽고, 필요하면 고칠 수 있다"

    같은 일을 하는 코드 비교

    바닐라 JS
        const items = document.querySelectorAll(".menu-item");
        items.forEach(function (item) {
            item.classList.add("highlight");
        });

    jQuery
        $(".menu-item").addClass("highlight");

    ※ 2026년 1월 jQuery 4.0이 나왔다. 이 수업은 4.0 기준이다.


    < 2. 연결하기 >

    CDN(인터넷에 올려 둔 파일)으로 불러오는 것이 가장 간단하다.
        <script src="https://code.jquery.com/jquery-4.0.0.min.js" defer></script>
        <script src="내파일.js" defer></script>

    jQuery 파일을 불러오면 전역에 두 개의 이름이 생긴다.
        jQuery   (본래 이름)
        $        (짧은 별명, jQuery와 같은 함수)

    문서 준비 후 실행 - 예전 코드에서 거의 항상 보이는 형태
        $(function () {
            // HTML을 다 읽은 뒤 실행할 코드
        });

        → document.addEventListener("DOMContentLoaded", function () { ... }); 와 같다.
        → 이 파일은 defer로 불러오므로 없어도 되지만, 예전 코드를 읽을 수 있도록 감싸 둔다.
*/

$(function () {

    /*
        < 3. 선택 - $("CSS 선택자") >

        $("선택자")는 CSS 선택자를 그대로 사용한다. (querySelectorAll과 같은 규칙)
        결과는 "jQuery 객체" : 선택된 요소들을 담은 유사 배열 + jQuery 메서드

        바닐라 JS와 다른 점
        1) 요소가 없어도 null이 아니라 "빈 jQuery 객체"가 나온다. (length 0)
           → 메서드를 호출해도 에러가 나지 않는다.
        2) jQuery 객체에는 textContent, classList 같은 DOM 프로퍼티가 없다.
           → jQuery 메서드(text(), addClass() ...)를 사용한다.

        jQuery 객체 ↔ DOM 요소
            $("#title")[0]          → DOM 요소 (= document.querySelector("#title"))
            $(DOM요소)               → jQuery 객체로 감싸기

        관례 : jQuery 객체를 담는 변수 이름 앞에 $를 붙인다.
            const $menuItems = $(".menu-item");
    */
    console.log("< 3. 선택 >");

    const $title = $("#title");
    const $menuItems = $(".menu-item");
    const $notExist = $("#notExist");

    console.log($menuItems);            // jQuery 객체 (요소 3개)
    console.log($menuItems.length);     // 3
    console.log($notExist.length);      // 0 → 요소가 있는지 확인할 때 length 사용
    $notExist.text("에러 안 남");        // 아무 일도 일어나지 않는다

    console.log($title[0]);                         // <h1 id="title">
    console.log($title[0] === document.querySelector("#title")); // true
    console.log($title.textContent);                // undefined (jQuery 객체에는 DOM 프로퍼티가 없다)


    /*
        < 4. 내용 - text(), html(), val() >

        jQuery 메서드의 공통 규칙
            값 없이 호출  → 읽기 (getter)
            값을 넣어 호출 → 쓰기 (setter)

        | jQuery            | 바닐라 JS             |
        | text()            | textContent           |
        | html()            | innerHTML             |
        | val()             | value                 |
    */
    console.log("< 4. 내용 >");

    console.log($("#intro").text());                       // 읽기
    $("#intro").html("<strong>jQuery</strong>를 공부하고 있습니다.");  // 쓰기 (HTML로 해석)

    console.log($("#username").val());                     // 홍길동
    $("#valueResult").text("입력창의 값 : " + $("#username").val());

    // 주의 : 사용자 입력은 html()이 아니라 text()로 넣는다. (09_DOM 05 innerHTML 보안 문제와 같다)


    /*
        < 5. 속성 - attr(), prop(), removeAttr(), data() >

        attr("속성")          : HTML 속성 읽기 (getAttribute)
        attr("속성", "값")     : HTML 속성 쓰기 (setAttribute)
        removeAttr("속성")    : 속성 제거
        prop("checked")       : 현재 상태(DOM 프로퍼티) 읽기 → checked, disabled, selected는 prop 사용
        data("price")         : data-price 값 읽기 (숫자처럼 보이면 숫자로 바꿔 준다)

        09_DOM 03에서 배운 "속성 vs 프로퍼티" 차이가 그대로 attr vs prop 차이다.
    */
    console.log("< 5. 속성 >");

    const $link = $("#productLink");
    console.log($link.attr("href"));        // https://example.com
    $link.attr("href", "https://example.org");
    $link.removeAttr("target");             // 이제 현재 탭에서 열린다

    console.log($("#agree").prop("checked"));  // false (체크 여부)
    console.log($("#agree").attr("checked"));  // undefined (HTML에 checked 속성이 없다)

    const $buyBtn = $("#buyBtn");
    console.log($buyBtn.data("productId"));     // P01  (data-product-id → productId)
    console.log($buyBtn.data("price"));         // 12000 (숫자)
    console.log(typeof $buyBtn.data("price"));  // number (dataset은 string이었다)

    $("#attrResult").text(
        "상품번호: " + $buyBtn.data("productId") + " / 가격: " + ($buyBtn.data("price") + 500) + "원 (500원 추가)"
    );


    /*
        < 6. 클래스와 스타일 - addClass(), css() >

        addClass("이름")        : classList.add
        removeClass("이름")     : classList.remove
        toggleClass("이름")     : classList.toggle
        hasClass("이름")        : classList.contains

        css("속성")             : 실제 적용된 값 읽기 (getComputedStyle과 같다)
        css("속성", "값")        : 인라인 스타일 쓰기
        css({ 속성: 값, ... })   : 여러 개를 한 번에

        CSS 속성 이름은 "font-size", "fontSize" 둘 다 된다.

        주의! jQuery 4.0부터 숫자만 쓰면 px가 자동으로 붙지 않는다.
            css("font-size", 20)      → 적용 안 됨 (예전 버전에서는 20px)
            css("font-size", "20px")  → O
    */
    console.log("< 6. 클래스와 스타일 >");

    const $message = $("#message");
    $message.addClass("highlight big");               // 공백으로 여러 개
    console.log($message.hasClass("big"));            // true
    $message.removeClass("big");

    $message.css("color", "crimson");
    $message.css({ padding: "6px", "border-left": "4px solid crimson" });
    console.log($message.css("color"));               // rgb(220, 20, 60)


    /*
        < 7. 여러 요소 한 번에 (암묵적 반복), each() >

        $(".menu-item").addClass("highlight");
        → 선택된 요소가 3개면 3개 모두에 적용된다. 반복문이 필요 없다.

        요소마다 "다른 값"이 필요할 때만 each()를 사용한다.
            $("선택자").each(function (index, element) {
                // element는 DOM 요소 → $(element)로 감싸서 jQuery 메서드 사용
            });
    */
    console.log("< 7. each() >");

    $(".menu-item").addClass("highlight");

    $("#scoreList li").each(function (index, element) {
        const $li = $(element);
        const score = $li.data("score");
        const grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";

        $li.append(" - " + score + "점 (" + grade + ")");
        console.log(index, $li.text());
    });

    // 주의 : 읽기 메서드는 여러 요소 중 "첫 번째" 기준이 많다. (text()는 예외 : 전부 합친 글자)
    console.log($("#scoreList li").data("score"));   // 95 (첫 번째 li만)


    /*
        < 8. 생성과 삭제 >

        $("<li>")                  : 요소 생성 (document.createElement("li"))
        $("<li>").text("내용")      : 생성 + 내용

        부모.append(자식)   : 안쪽 맨 뒤      부모.prepend(자식) : 안쪽 맨 앞
        기준.after(요소)    : 바깥 뒤         기준.before(요소)  : 바깥 앞
        요소.remove()       : 자기 자신 삭제
        부모.empty()        : 자식 모두 삭제 (replaceChildren()과 같다)

        09_DOM 05와 이름이 거의 같다. (바닐라가 jQuery 이름을 따라 만들었다)
    */
    console.log("< 8. 생성과 삭제 >");

    const $todoList = $("#todoList");

    $todoList.append($("<li>").text("jQuery 배우기"));
    $todoList.prepend($("<li>").text("맨 앞에 추가된 할 일"));
    $todoList.append("<li>HTML 문자열로 추가 (사용자 입력에는 쓰지 않는다)</li>");

    const $temp = $("<li>").text("삭제될 할 일");
    $todoList.append($temp);
    $temp.remove();

    console.log($todoList.children().length);   // 4


    /*
        < 9. 탐색 >

        | jQuery              | 바닐라 JS                         |
        | parent()            | parentElement                     |
        | closest("선택자")    | closest("선택자")                  |
        | children()          | children                          |
        | find("선택자")       | querySelectorAll("선택자") (자손에서) |
        | next() / prev()     | nextElementSibling / previous...  |
        | siblings()          | (없음) 나를 뺀 형제 모두             |
        | eq(1)               | [1] 번째 (jQuery 객체로)            |
        | first() / last()    | 첫 번째 / 마지막                    |

        jQuery는 텍스트 노드를 신경 쓸 필요가 없다. (항상 요소만 찾는다)
    */
    console.log("< 9. 탐색 >");

    const $mouseName = $("#item2 .name");

    console.log($mouseName.closest("li").attr("id"));            // item2
    console.log($mouseName.closest("section").attr("id"));       // shop
    console.log($("#productList").children().length);            // 3
    console.log($("#productList").find(".price").first().text()); // 1200000
    console.log($("#item2").next().attr("id"));                  // item3
    console.log($("#item2").prev().attr("id"));                  // item1

    // siblings() : 선택된 것 하나만 표시하고 나머지는 해제하는 패턴에 자주 쓰인다
    $("#item2").addClass("selected").siblings().removeClass("selected");
    console.log($("#item2").siblings().length);                  // 2


    /*
        < 10. 체이닝 >

        jQuery 메서드(쓰기)는 대부분 자기 자신(jQuery 객체)을 return 한다.
        → 점(.)으로 계속 이어서 쓸 수 있다.

        주의 : 읽기 메서드(text(), val(), attr("x"))는 값을 return 하므로 체이닝이 끊긴다.
    */
    console.log("< 10. 체이닝 >");

    $("#chainBox")
        .text("체이닝으로 글자, 클래스, 스타일을 한 번에 바꿨다")
        .addClass("active")
        .css("padding", "8px");


    /*
        < 11. 정리 - 바닐라 JS vs jQuery >

        | 하는 일        | 바닐라 JS                                | jQuery                      |
        | 하나 선택      | document.querySelector("#a")             | $("#a")                     |
        | 여러 개 선택   | document.querySelectorAll(".a")          | $(".a")                     |
        | 글자           | el.textContent = "x"                     | $el.text("x")               |
        | HTML           | el.innerHTML = "<b>x</b>"                | $el.html("<b>x</b>")        |
        | 입력값         | input.value                              | $input.val()                |
        | 속성           | el.getAttribute / setAttribute           | $el.attr()                  |
        | 상태           | checkbox.checked                         | $checkbox.prop("checked")   |
        | data-*         | el.dataset.price (문자열)                | $el.data("price") (자동 변환) |
        | 클래스         | el.classList.add / toggle                | $el.addClass / toggleClass  |
        | 스타일         | el.style.color = "red"                   | $el.css("color", "red")     |
        | 생성           | document.createElement("li")             | $("<li>")                   |
        | 추가 / 삭제    | append / remove                          | append / remove             |
        | 반복           | forEach                                  | 자동 (필요하면 each)          |
        | 문서 준비      | DOMContentLoaded                         | $(function () { })          |

        결론
        - 원리는 09_DOM과 완전히 같다. 이름과 쓰는 방법만 짧아졌을 뿐이다.
        - 이벤트와 애니메이션은 02_jquery_event에서 다룬다.
    */
});
