/*
< 학생용 실습 문제 >

주제: 쇼핑몰 화면의 이벤트와 효과를 jQuery로 만들기
출력: 화면 또는 console.log()로 확인
규칙: addEventListener, querySelector 대신 jQuery의 on(), $()를 사용한다.

=====================================================================
[기초]
=====================================================================

< 문제 1. on()으로 클릭 이벤트 >
① [환영 메시지] 버튼을 클릭하면 id가 greetResult인 요소에
   "DOM 마켓에 오신 것을 환영합니다!"를 표시하시오.


< 문제 2. $(this) 사용하기 >
① sizeList의 li를 클릭하면 "선택한 사이즈: M"처럼 표시하시오.
② 클릭한 li에만 selected 클래스를 추가하고, 나머지 li에서는 제거하시오. (siblings)


< 문제 3. 효과 >
① [배너 닫기]를 클릭하면 배너가 fadeOut(500)으로 사라지게 하시오.
② [상세 정보]를 클릭할 때마다 detailBox가 slideToggle로 열리고 닫히게 하시오.
③ 배너가 다 사라진 뒤 콘솔에 "배너 닫힘"을 출력하시오. (콜백 함수)


< 문제 4. one() >
① [이벤트 응모 (1회)] 버튼은 한 번만 동작하게 하시오.
② 클릭하면 "응모 완료! 당첨 번호: (1~100 사이 랜덤 숫자)"를 표시하고 버튼 글자를 "응모 완료"로 바꾸시오.


=====================================================================
[응용]
=====================================================================

< 문제 5. 이벤트 위임 - 찜하기 >
① productArea에 이벤트 위임으로 .like-btn 클릭을 처리하시오.
② 클릭할 때마다 버튼에 liked 클래스를 토글하고, 글자를 "♥ 찜" / "♡ 찜"으로 바꾸시오.
③ 찜한 상품 개수를 likeCount에 "찜 2개"처럼 표시하시오.
④ [상품 추가]로 새로 만든 카드의 찜 버튼도 동작해야 한다.
   (새 카드 : data-name "보조배터리", data-price 32000)


< 문제 6. 글자 수 세기와 submit >
① reviewText에 입력할 때마다 글자 수를 charCount에 표시하시오. (input 이벤트)
② 100자를 넘으면 charCount에 error 클래스를 추가하시오.
③ 폼을 제출하면 새로고침을 막고, 1 ~ 100자일 때만 리뷰를 reviewList에 추가하시오.
   추가 후 입력창과 글자 수를 초기화하시오.


< 문제 7. 별점 >
① 별(span)을 클릭하면 클릭한 별까지 on 클래스를 추가하고, 그 뒤의 별은 on을 제거하시오.
   힌트) $(this).prevAll() : 나보다 앞에 있는 형제들 / nextAll() : 뒤에 있는 형제들
② starResult에 "별점: 4점"을 표시하시오. (data-score 사용)


=====================================================================
[심화]
=====================================================================

< 문제 8. 실시간 검색 필터 >
① searchInput에 입력할 때마다 검색어가 포함된 li만 보이게 하시오. (show / hide 또는 toggle(boolean))
② 영어는 대소문자 구분 없이 검색되게 하시오. (예 : "usb" → USB 허브)
③ searchCount에 "검색 결과: 2개"를 표시하시오.
   힌트) $("#searchList li").filter(":visible") 또는 개수를 직접 세기


< 문제 9. 장바구니 수량 변경 >
① 이벤트 위임으로 +, -, 삭제 버튼을 처리하시오.
② 수량은 1 미만이 되지 않게 하시오.
③ 수량이 바뀌면 그 행의 금액(.amount)과 전체 합계(cartTotal)를 다시 계산하시오.
④ 모든 행을 삭제하면 합계 대신 "장바구니가 비었습니다."를 표시하시오.


< 문제 10. $.getJSON()으로 상품 카드 만들기 >
① [인기 상품 불러오기]를 클릭하면 https://dummyjson.com/products?limit=4&select=title,price 를
   $.getJSON()으로 불러오시오. (응답 : { products: [ { id, title, price } ] })
② 상품마다 .card 요소를 만들어 productCards에 추가하시오. (제목, 가격 $)
③ 카드들이 fadeIn으로 나타나게 하시오.
④ 다시 클릭하면 기존 카드를 비우고 새로 불러오시오.
*/


// < 강사용 정답 >

$(function () {

    // < 문제 1 >
    $("#greetBtn").on("click", function () {
        $("#greetResult").text("DOM 마켓에 오신 것을 환영합니다!");
    });


    // < 문제 2 >
    $("#sizeList li").on("click", function () {
        const $li = $(this);

        $li.addClass("selected").siblings().removeClass("selected");
        $("#sizeResult").text("선택한 사이즈: " + $li.text());
    });


    // < 문제 3 >
    $("#closeBanner").on("click", function () {
        $("#banner").fadeOut(500, function () {
            console.log("배너 닫힘");
        });
    });

    $("#detailBtn").on("click", function () {
        $("#detailBox").slideToggle(300);
    });


    // < 문제 4 >
    $("#eventBtn").one("click", function () {
        const number = Math.floor(Math.random() * 100) + 1;

        $("#eventResult").text("응모 완료! 당첨 번호: " + number);
        $(this).text("응모 완료");
    });


    // < 문제 5 >
    const $productArea = $("#productArea");

    $productArea.on("click", ".like-btn", function () {
        const $btn = $(this);

        $btn.toggleClass("liked");
        $btn.text($btn.hasClass("liked") ? "♥ 찜" : "♡ 찜");

        $("#likeCount").text("찜 " + $productArea.find(".like-btn.liked").length + "개");
    });

    $("#addProduct").on("click", function () {
        const $card = $("<div class='card'>")
            .attr({ "data-name": "보조배터리", "data-price": 32000 })
            .append($("<strong>").text("보조배터리"), "<br>", $("<button type='button' class='like-btn'>").text("♡ 찜"));

        $productArea.append($card);
    });


    // < 문제 6 >
    const $reviewText = $("#reviewText");
    const $charCount = $("#charCount");

    $reviewText.on("input", function () {
        const length = $(this).val().length;

        $charCount.text(length).toggleClass("error", length > 100);
        // toggleClass("이름", true/false) : true면 추가, false면 제거
    });

    $("#reviewForm").on("submit", function (event) {
        event.preventDefault();

        const text = $reviewText.val().trim();
        if (text.length === 0 || text.length > 100) return;

        $("#reviewList").append($("<li>").text(text));
        $reviewText.val("");
        $charCount.text(0).removeClass("error");
    });


    // < 문제 7 >
    $("#stars").on("click", "span", function () {
        const $star = $(this);

        $star.addClass("on").prevAll().addClass("on");
        $star.nextAll().removeClass("on");

        $("#starResult").text("별점: " + $star.data("score") + "점");
    });


    // < 문제 8 >
    $("#searchInput").on("input", function () {
        const keyword = $(this).val().trim().toLowerCase();
        let count = 0;

        $("#searchList li").each(function (index, element) {
            const $li = $(element);
            const match = $li.text().toLowerCase().includes(keyword);

            $li.toggle(match);          // toggle(true) = show, toggle(false) = hide
            if (match) count++;
        });

        $("#searchCount").text("검색 결과: " + count + "개");
    });


    // < 문제 9 >
    const $cartBody = $("#cartBody");

    function updateCart() {
        const $rows = $cartBody.find("tr");

        if ($rows.length === 0) {
            $("#cartTotal").text("장바구니가 비었습니다.");
            return;
        }

        let total = 0;
        $rows.each(function (index, element) {
            const $row = $(element);
            const amount = $row.data("price") * Number($row.find(".qty").text());

            $row.find(".amount").text(amount.toLocaleString());
            total += amount;
        });

        $("#cartTotal").text("합계: " + total.toLocaleString() + "원");
    }

    $cartBody.on("click", ".plus, .minus", function () {
        const $qty = $(this).closest("tr").find(".qty");
        let qty = Number($qty.text());

        if ($(this).hasClass("plus")) {
            qty++;
        } else if (qty > 1) {
            qty--;
        }

        $qty.text(qty);
        updateCart();
    });

    $cartBody.on("click", ".remove", function () {
        $(this).closest("tr").remove();
        updateCart();
    });


    // < 문제 10 >
    $("#loadProducts").on("click", function () {
        const $cards = $("#productCards").empty();

        $.getJSON("https://dummyjson.com/products?limit=4&select=title,price", function (data) {
            data.products.forEach(function (product) {
                const $card = $("<div class='card'>")
                    .append($("<strong>").text(product.title), "<br>", "$" + product.price)
                    .hide();                 // 숨긴 상태로 추가한 뒤

                $cards.append($card);
                $card.fadeIn(400);           // 나타나게 한다
            });
        });
    });
});
