/*
< 학생용 실습 문제 >

주제: 카페 주문 페이지를 jQuery로 다루기
출력: console.log() 또는 화면으로 확인
규칙: document.querySelector, classList, textContent 등 바닐라 DOM 문법을 쓰지 말고 jQuery 메서드만 사용한다.
      (문제 10 제외)

=====================================================================
[기초]
=====================================================================

< 문제 1. 선택과 글자 변경 >
① id가 notice인 요소의 글자를 "오늘은 전 메뉴 10% 할인!"으로 변경하시오.
② class가 menu인 요소의 개수를 콘솔에 출력하시오.

출력 예시)
메뉴 개수: 4


< 문제 2. 여러 요소에 한 번에 적용 >
① class가 menu인 요소 모두에 글자 크기 "18px"를 적용하시오. (반복문 사용 금지)
② 첫 번째 메뉴(아메리카노)에만 best 클래스를 추가하시오. (first() 또는 eq() 사용)


< 문제 3. 입력값 읽기 >
① id가 nickname인 입력창의 값을 읽어
   id가 greeting인 요소에 "○○님, 어서 오세요."를 표시하시오.
② 입력창의 값을 "VIP 손님"으로 바꾼 뒤, 다시 읽어서 콘솔에 출력하시오.

출력 예시)
손님님, 어서 오세요.      (화면)
VIP 손님                  (콘솔)


< 문제 4. 속성 읽기와 변경 >
① id가 menuImage인 이미지의 alt 값을 콘솔에 출력하시오.
② 이미지의 src를 "https://picsum.photos/id/42/160/100"로, alt를 "라떼 이미지"로 바꾸시오.
③ id가 menuLink인 링크의 target 속성을 제거하시오.


=====================================================================
[응용]
=====================================================================

< 문제 5. data()와 each() >
① 모든 메뉴의 "이름 - 가격원"을 콘솔에 출력하시오. (each, data 사용)
② data-stock이 0인 메뉴에는 soldout 클래스를 추가하고 글자 뒤에 " (품절)"을 붙이시오.

출력 예시)
아메리카노 - 4500원
카페라떼 - 5000원
...


< 문제 6. 요소 생성 >
① 배열 ["아메리카노 2잔", "크루아상 1개", "바닐라라떼 1잔"]의 항목을
   li로 만들어 id가 orderList인 요소에 차례대로 추가하시오.
② 맨 앞에 "[주문 내역]" li를 추가하시오.
③ orderList의 자식 개수를 콘솔에 출력하시오.

출력 예시)
주문 항목 수: 4


< 문제 7. 탐색 >
① id가 r2인 리뷰 안의 작성자(.writer) 요소를 선택하시오.
② 그 요소에서 closest()로 리뷰 div를 찾아 selected 클래스를 추가하고,
   나머지 리뷰(siblings)에서는 selected 클래스를 제거하시오.
   (단, siblings에 h2도 포함되므로 ".review"로 걸러서 사용)
③ id가 reviewArea인 요소에서 find()로 모든 .text를 찾아 글자를 합쳐서 출력하시오.

출력 예시)
선택된 리뷰: r2
커피가 맛있어요 / 매장이 넓어요 / 디저트 추천


=====================================================================
[심화]
=====================================================================

< 문제 8. attr()과 prop()의 차이 >
① id가 agreeTerms, agreeMarketing인 체크박스의 checked 상태를 prop()으로 출력하시오.
② 같은 체크박스를 attr("checked")로 출력하고, 결과가 왜 다른지 주석으로 쓰시오.
③ 이용약관에 동의하지 않았으면 가입 버튼을 비활성화(prop("disabled", true))하시오.

출력 예시)
prop - 약관: false / 마케팅: true
attr - 약관: undefined / 마케팅: checked


< 문제 9. 장바구니 합계 >
① id가 cartBody 안의 각 tr에서 data-price와 data-qty를 읽어
   각 행에 금액 칸(td)을 하나 더 추가하시오. 예) "9,000원"
② 전체 합계를 id가 cartTotal인 요소에 "합계: 25,900원"으로 표시하시오.
   (힌트 : toLocaleString())


< 문제 10. 바닐라 JS → jQuery 바꾸기 >
아래 바닐라 JS 코드를 똑같이 동작하는 jQuery 코드로 바꾸시오.

    const tips = document.querySelectorAll("#convertArea .tip");
    tips.forEach(function (tip) {
        tip.classList.add("best");
    });
    tips[tips.length - 1].classList.add("hidden");
    document.querySelector("#tipCount").textContent = "보이는 팁: " + (tips.length - 1) + "개";

출력 예시)
보이는 팁: 2개   (화면, 팁 3은 숨겨짐)
*/


// < 강사용 정답 >

$(function () {

    // < 문제 1 >
    $("#notice").text("오늘은 전 메뉴 10% 할인!");
    console.log("메뉴 개수: " + $(".menu").length);


    // < 문제 2 >
    $(".menu").css("font-size", "18px");   // jQuery 4.0 : 단위 "px"를 꼭 쓴다
    $(".menu").first().addClass("best");    // 또는 $(".menu").eq(0)


    // < 문제 3 >
    const $nickname = $("#nickname");

    $("#greeting").text($nickname.val() + "님, 어서 오세요.");
    $nickname.val("VIP 손님");
    console.log($nickname.val());


    // < 문제 4 >
    const $menuImage = $("#menuImage");

    console.log($menuImage.attr("alt"));
    $menuImage.attr({
        src: "https://picsum.photos/id/42/160/100",
        alt: "라떼 이미지"
    });
    $("#menuLink").removeAttr("target");


    // < 문제 5 >
    $(".menu").each(function (index, element) {
        const $menu = $(element);

        console.log($menu.text() + " - " + $menu.data("price") + "원");

        if ($menu.data("stock") === 0) {     // data()는 숫자로 바꿔 준다
            $menu.addClass("soldout").append(" (품절)");
        }
    });


    // < 문제 6 >
    const orders = ["아메리카노 2잔", "크루아상 1개", "바닐라라떼 1잔"];
    const $orderList = $("#orderList");

    orders.forEach(function (order) {
        $orderList.append($("<li>").text(order));
    });
    $orderList.prepend($("<li>").text("[주문 내역]"));

    console.log("주문 항목 수: " + $orderList.children().length);


    // < 문제 7 >
    const $writer = $("#r2 .writer");
    const $review = $writer.closest(".review");

    $review.addClass("selected").siblings(".review").removeClass("selected");
    console.log("선택된 리뷰: " + $review.attr("id"));

    const texts = [];
    $("#reviewArea").find(".text").each(function (index, element) {
        texts.push($(element).text());
    });
    console.log(texts.join(" / "));


    // < 문제 8 >
    const $terms = $("#agreeTerms");
    const $marketing = $("#agreeMarketing");

    console.log("prop - 약관: " + $terms.prop("checked") + " / 마케팅: " + $marketing.prop("checked"));
    console.log("attr - 약관: " + $terms.attr("checked") + " / 마케팅: " + $marketing.attr("checked"));

    // attr("checked") : HTML에 처음 작성한 checked 속성 (사용자가 클릭해도 바뀌지 않는다)
    // prop("checked") : 지금 체크되어 있는지 (현재 상태) → 체크 여부는 항상 prop으로 확인한다.

    if (!$terms.prop("checked")) {
        $("#joinBtn").prop("disabled", true);
    }


    // < 문제 9 >
    let total = 0;

    $("#cartBody tr").each(function (index, element) {
        const $row = $(element);
        const amount = $row.data("price") * $row.data("qty");

        $row.append($("<td>").text(amount.toLocaleString() + "원"));
        total += amount;
    });

    $("#cartTotal").text("합계: " + total.toLocaleString() + "원");


    // < 문제 10 >
    const $tips = $("#convertArea .tip");

    $tips.addClass("best");          // 반복문 없이 모두 적용
    $tips.last().addClass("hidden");
    $("#tipCount").text("보이는 팁: " + ($tips.length - 1) + "개");
});
