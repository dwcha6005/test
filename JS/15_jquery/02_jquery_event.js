/*
=====================================================================================
[수업 콘티] 15_jquery / 02. jQuery 이벤트와 효과          권장 60분 (설명 35 + 실습 25)
=====================================================================================
< 준비 >
- 인터넷 연결 필요 (jQuery CDN, 섹션 8의 JSONPlaceholder)
- 02_jquery_event.html을 열고 F12 → Console 탭을 띄워 둔다.
- 10_event 06_delegation.js를 옆에 열어 두고 "같은 기능 / 다른 문법"을 비교한다.

< 진행 순서 >
1) on() (7분) - 섹션 1
   ▶ 시연 : [인사하기] 클릭 → 문구 표시
   ▶ 판서 : 요소.addEventListener("click", fn)  →  $요소.on("click", fn)
   ▶ 시연 : 빨강 / 초록 / 파랑 클릭 → 반복문 없이 3개 버튼 모두 동작 (01의 "암묵적 반복")
   ▶ 포인트 : 함수 안의 this = 클릭한 DOM 요소 → $(this)로 감싸서 사용 (예전 코드에서 정말 많이 보인다)
   ▶ 참고 : $("#btn").click(fn) 같은 단축 메서드도 있지만 on()을 기본으로 쓴다.

2) one(), off() (4분) - 섹션 2
   ▶ 시연 : [쿠폰 받기] 두 번 클릭 → 두 번째는 반응 없음
   ▶ 시연 : [클릭 수 세기] 몇 번 → [세기 중지] → 더 이상 안 셈

3) 이벤트 위임 (8분)  ★ 핵심 - 섹션 3
   ▶ 판서 : $(부모).on("click", "자식 선택자", fn)  ← 두 번째 인수에 선택자
   ▶ 시연 : 새 할 일 추가 → 새 항목의 [완료], [삭제]도 바로 동작
   ▶ 비교 : 10_event 06의 event.target.closest() + if 검사가 jQuery 안에 들어 있다고 설명
   ▶ 포인트 : 위임에서도 this = 클릭한 자식 요소 (.done-btn)

4) 폼 이벤트 (4분) - 섹션 4
   ▶ 시연 : 아이디 입력 중 실시간 검사, [가입] → 새로고침 없이 결과 표시 (preventDefault)

5) 효과, animate (7분) - 섹션 5, 6
   ▶ 시연 : 버튼마다 눌러 보기. 특히 fadeToggle / slideToggle
   ▶ 시연 : [이동] 버튼을 빠르게 여러 번 → 애니메이션이 줄을 선다 → stop() 설명
   ▶ 포인트 : jQuery가 아직 쓰이는 큰 이유 중 하나. 단, 요즘은 CSS transition / animation을 더 많이 쓴다.

6) 실제 예 (5분) - 섹션 7
   ▶ 시연 : FAQ 질문 클릭 → 해당 답변만 slideToggle, 다른 답변은 닫힘 (next, siblings)
   ▶ 시연 : 탭 메뉴 → 01에서 배운 addClass().siblings().removeClass() 패턴

7) $.ajax 맛보기, 정리 (0분 ~ 남는 시간) - 섹션 8, 9
   ▶ 시연 : [사용자 불러오기] → 10명 목록
   ▶ 포인트 : 13_fetch에서 배울 fetch와 같은 일. "예전 코드에서 $.ajax를 보면 fetch로 읽으면 된다" 정도만
   - 섹션 9 표 : 언제 jQuery를 쓰고 언제 안 쓰는지

< 예상 질문 / 자주 막히는 곳 >
- on("onclick", fn) → "click" (10_event와 같다, on을 붙이지 않는다)
- 함수 안에서 this.text() → 에러. this는 DOM 요소 → $(this).text()
- 화살표 함수를 쓰면 this가 클릭한 요소가 아니다 → function () {} 사용, 또는 event.currentTarget
- 위임을 $("#todoList .delete-btn").on(...)으로 써서 새 항목에서 동작 안 함 → $("#todoList").on("click", ".delete-btn", ...)

< 실습 연결 : 02_jquery_event_test.html / .js >
- 2)까지 설명 후 : 문제 1 ~ 4 (기초)
- 4)까지 설명 후 : 문제 5 ~ 7 (응용)
- 수업 마지막    : 문제 8 ~ 10 (심화, 10_event 과제를 jQuery로 다시 만들기 성격)
=====================================================================================
*/


/*
    02_jquery_event.js

    10_event에서 배운 이벤트의 원리(이벤트 객체, 기본 동작 막기, 버블링, 위임)는 그대로다.
    jQuery는 "쓰는 방법"만 짧게 바꿔 준다.
*/

$(function () {

    /*
        < 1. on() - 이벤트 등록 >

        바닐라 JS : 요소.addEventListener("click", function (event) { ... });
        jQuery    : $요소.on("click", function (event) { ... });

        특징
        1) 선택된 요소가 여러 개면 모두에 등록된다. (forEach 필요 없음)
        2) 함수 안의 this = 이벤트가 발생한 DOM 요소
           → jQuery 메서드를 쓰려면 $(this)로 감싼다.
        3) event 객체도 그대로 받을 수 있다. (event.target, event.preventDefault() ...)

        참고 : $("#btn").click(function () {}) 같은 "단축 메서드"도 있다.
               예전 코드에서 자주 보이지만, 새로 쓸 때는 on()을 사용한다.
    */
    $("#helloBtn").on("click", function () {
        $("#helloResult").text("안녕하세요! jQuery로 등록한 이벤트입니다.");
    });

    $(".color-btn").on("click", function () {
        const $btn = $(this);                 // 클릭한 버튼
        const color = $btn.data("color");

        $("#colorResult").text($btn.text() + "을(를) 선택했습니다.").css("color", color);
    });


    /*
        < 2. one(), off() >

        one("click", fn)  : 한 번만 실행되고 자동으로 제거된다. ({ once: true }와 같다)
        off("click")      : 등록한 click 이벤트를 제거한다. (removeEventListener)
    */
    $("#couponBtn").one("click", function () {
        $(this).text("쿠폰이 발급되었습니다").prop("disabled", true);
        console.log("쿠폰 발급 (한 번만 실행)");
    });

    let count = 0;

    $("#countBtn").on("click", function () {
        count++;
        $("#countResult").text(count + "번 클릭");
    });

    $("#stopBtn").on("click", function () {
        $("#countBtn").off("click");
        $("#countResult").append(" (세기 중지)");
    });


    /*
        < 3. 이벤트 위임 >

        $(부모).on("이벤트", "자식 선택자", function () { ... });

        - 이벤트는 부모 하나에만 등록된다.
        - 클릭한 요소가 "자식 선택자"와 맞을 때만 함수가 실행된다.
        - 나중에 추가한 자식에도 동작한다.
        - 함수 안의 this = 선택자와 맞는 자식 요소 (예 : 클릭한 .delete-btn)

        10_event 06 바닐라 코드와 비교

            todoList.addEventListener("click", function (event) {
                const button = event.target.closest(".delete-btn");
                if (button === null) return;
                button.closest("li").remove();
            });

            $("#todoList").on("click", ".delete-btn", function () {
                $(this).closest("li").remove();
            });
    */
    const $todoList = $("#todoList");

    function updateCount() {
        const total = $todoList.children().length;
        const done = $todoList.children(".done").length;
        $("#todoCount").text("전체 " + total + "개 / 완료 " + done + "개");
    }

    $todoList.on("click", ".done-btn", function () {
        $(this).closest("li").toggleClass("done");
        updateCount();
    });

    $todoList.on("click", ".delete-btn", function () {
        $(this).closest("li").remove();
        updateCount();
    });

    // 새 항목 추가 : keydown + Enter (한글 조합 중 Enter는 무시 - 10_event 02)
    $("#todoInput").on("keydown", function (event) {
        if (event.key !== "Enter" || event.originalEvent.isComposing) return;

        const text = $(this).val().trim();
        if (text === "") return;

        const $li = $("<li>").append(
            $("<span>").text(text),            // 사용자 입력은 text()로
            " ",
            $("<button type='button' class='done-btn'>").text("완료"),
            " ",
            $("<button type='button' class='delete-btn'>").text("삭제")
        );

        $todoList.append($li);
        $(this).val("");
        updateCount();
    });

    updateCount();

    // 참고 : jQuery event는 원래 이벤트를 감싼 객체다. 원래 이벤트는 event.originalEvent


    /*
        < 4. 폼 이벤트 - input, submit >

        input  : 입력값이 바뀔 때마다
        submit : 폼 제출 → event.preventDefault()로 새로고침 막기 (10_event 04와 같다)
    */
    const $userId = $("#userId");
    const $idCheck = $("#idCheck");

    $userId.on("input", function () {
        const length = $(this).val().trim().length;

        if (length === 0) {
            $idCheck.text("").removeClass("error");
        } else if (length < 4) {
            $idCheck.text("4자 이상 입력하세요.").addClass("error");
        } else {
            $idCheck.text("사용 가능한 아이디입니다.").removeClass("error");
        }
    });

    $("#joinForm").on("submit", function (event) {
        event.preventDefault();

        const id = $userId.val().trim();
        if (id.length < 4) {
            $userId.trigger("focus");      // 포커스 이동 (focus() 단축 메서드와 같다)
            return;
        }

        $("#joinResult").text(id + "님 가입을 환영합니다.");
        this.reset();                      // this = form DOM 요소 → DOM 메서드 reset() 사용 가능
        $idCheck.text("");
    });


    /*
        < 5. 효과 - show / hide / fade / slide >

        | 보이기       | 숨기기        | 전환            |
        | show()       | hide()        | toggle()        |
        | fadeIn()     | fadeOut()     | fadeToggle()    |
        | slideDown()  | slideUp()     | slideToggle()   |

        속도 : 숫자(ms) 또는 "slow"(600), "fast"(200). 없으면 바로(show/hide) 또는 400ms
        끝난 뒤 실행 : 마지막 인수에 함수(콜백)
            $box.fadeOut(500, function () { console.log("다 사라짐"); });

        아래 코드는 버튼의 data-effect 값을 메서드 이름으로 사용한다.
        $box["fadeToggle"](400) 는 $box.fadeToggle(400) 과 같다. (08_object 대괄호 접근)
    */
    const $effectBox = $("#effectBox");

    $("[data-effect]").on("click", function () {
        const effect = $(this).data("effect");

        $effectBox.stop(true, true)[effect](400, function () {
            console.log(effect + " 완료");
        });
    });


    /*
        < 6. animate() >

        $요소.animate({ CSS 속성: 값 }, 시간, 콜백);
        - 숫자로 바뀌는 속성만 애니메이션된다. (left, width, opacity ...) 색은 안 된다.
        - jQuery 4.0 : 단위를 붙여서 쓴다. → "200px"

        stop() : 진행 중인 애니메이션을 멈춘다.
        - [이동]을 빠르게 여러 번 누르면 애니메이션이 줄을 서서 계속 움직인다.
        - stop()을 먼저 호출하면 줄 선 애니메이션을 정리한다.
    */
    const $moveBox = $("#moveBox");

    $("#moveBtn").on("click", function () {
        $moveBox.stop().animate({ left: "200px", opacity: 0.5 }, 600);
    });

    $("#resetBtn").on("click", function () {
        $moveBox.stop().animate({ left: "0px", opacity: 1 }, 300);
    });


    /*
        < 7-1. 실제 예 - FAQ 아코디언 >

        질문 클릭 → 바로 다음 답변(next)을 slideToggle
                   → 다른 답변은 slideUp (siblings로 찾기)
    */
    $("#faq").on("click", ".faq-q button", function () {
        const $answer = $(this).closest(".faq-q").next(".faq-a");

        $answer.slideToggle(200);
        $answer.siblings(".faq-a").slideUp(200);
    });


    /*
        < 7-2. 실제 예 - 탭 메뉴 >

        1) 클릭한 버튼만 active, 나머지 버튼은 active 제거 (siblings)
        2) data-tab 값과 id가 같은 패널만 active
    */
    $("#tabMenu").on("click", ".tab-btn", function () {
        const $btn = $(this);
        const tabId = $btn.data("tab");

        $btn.addClass("active").siblings().removeClass("active");
        $("#" + tabId).addClass("active").siblings(".tab-panel").removeClass("active");
    });


    /*
        < 8. $.ajax() 맛보기 >

        fetch가 없던 시절, 서버와 통신할 때 쓰던 방법이다. (13_fetch 참고)

        fetch (13_fetch)
            const res = await fetch(url);
            const users = await res.json();

        jQuery
            $.ajax({
                url: url,
                method: "GET",
                dataType: "json",
                success: function (users) { ... },   // 성공
                error: function () { ... }            // 실패
            });

            $.getJSON(url, function (users) { ... });  // GET + JSON 짧은 버전

        새 코드는 fetch를 쓴다. 예전 코드에서 $.ajax를 보면 "fetch로 요청하는 부분이구나" 하고 읽으면 된다.
    */
    $("#loadUsers").on("click", function () {
        const $userList = $("#userList").empty().append($("<li>").text("불러오는 중..."));

        $.ajax({
            url: "https://jsonplaceholder.typicode.com/users",
            method: "GET",
            dataType: "json",
            success: function (users) {
                $userList.empty();
                users.forEach(function (user) {
                    $userList.append($("<li>").text(user.name + " (" + user.email + ")"));
                });
            },
            error: function () {
                $userList.empty().append($("<li class='error'>").text("불러오기에 실패했습니다."));
            }
        });
    });


    /*
        < 9. 정리 - jQuery는 언제? >

        | 상황                                     | 선택                         |
        | 이미 jQuery로 만든 사이트를 고칠 때         | jQuery (기존 방식 유지)        |
        | jQuery 플러그인(슬라이더, 달력 등)을 쓸 때  | jQuery                        |
        | 새로 만드는 작은 페이지                     | 바닐라 JS                     |
        | 새로 만드는 큰 서비스                       | React 같은 프레임워크           |

        jQuery만 알고 바닐라 JS를 모르면 → jQuery가 없는 곳에서 아무것도 못 한다.
        바닐라 JS를 알면 → jQuery는 금방 읽을 수 있다. (지금 여러분처럼)
    */
});
