/*
< 학생용 실습 문제 >

주제: 쇼핑몰 상품 상세 페이지의 버튼 기능 만들기
출력: console.log() 또는 화면으로 확인

=====================================================================
[기초]
=====================================================================

< 문제 1. HTML 속성 방식 >
① "바로 구매" 버튼에는 onclick="buyNow()"가 작성되어 있다.
② buyNow() 함수를 작성하여 buyResult에 "구매 페이지로 이동합니다."를 표시하시오.


< 문제 2. 이벤트 프로퍼티 방식 >
① wishBtn에 onclick 프로퍼티로 이벤트를 등록하시오.
② 클릭하면 버튼 문구를 "♥ 찜 완료"로 바꾸고, 콘솔에 "찜 목록에 추가"를 출력하시오.


< 문제 3. addEventListener()로 여러 개 등록 >
① shareBtn에 addEventListener()로 첫 번째 리스너를 등록하여 콘솔에 "공유하기 클릭"을 출력하시오.
② 같은 버튼에 두 번째 리스너를 등록하여 shareCount를 1씩 증가시키시오.
③ 클릭할 때 두 리스너가 모두 실행되는지 확인하시오.


< 문제 4. 이름 있는 함수로 등록 >
① showInfo라는 이름의 함수를 만들어 infoText에 "배송: 결제 후 2~3일 이내 도착"을 표시하시오.
② infoBtn에 showInfo 함수를 등록하시오.
③ showInfo() 처럼 괄호를 붙여 등록하면 어떤 문제가 생기는지 주석으로 작성하시오.


=====================================================================
[응용]
=====================================================================

< 문제 5. 수량 선택 >
① plusBtn을 누르면 수량이 1 증가, minusBtn을 누르면 1 감소하시오.
② 수량은 1 ~ 10 사이로 제한하시오.
③ 수량이 바뀔 때마다 totalPrice에 "총 금액: 45,000원" 형식으로 표시하시오. (단가 15000)
④ 수량 표시와 금액 계산은 updatePrice() 함수 하나로 만들어 재사용하시오.


< 문제 6. onclick과 addEventListener 비교 >
① 아래 코드를 그대로 작성하시오.

    testBtn.onclick = function() { console.log("A"); };
    testBtn.onclick = function() { console.log("B"); };
    testBtn.addEventListener("click", function() { console.log("C"); });
    testBtn.addEventListener("click", function() { console.log("D"); });

② 버튼을 클릭하기 전에, 출력될 결과를 먼저 주석으로 예측하시오.
③ 클릭하여 결과를 확인하고, A가 출력되지 않는 이유를 주석으로 작성하시오.


< 문제 7. 이벤트 한 번만 실행 >
① eventBtn을 클릭하면 eventResult에 "응모가 완료되었습니다."를 표시하시오.
② removeEventListener()를 이용하여 한 번 응모한 뒤에는 다시 실행되지 않게 하시오.
③ 응모 후 버튼 문구를 "응모 완료"로 바꾸고 disabled로 만드시오.


=====================================================================
[심화]
=====================================================================

< 문제 8. 상품 이미지 넘기기 >
① 이미지는 총 4장이라고 가정한다. 현재 번호를 변수로 관리하시오.
② nextBtn을 누르면 다음 번호, prevBtn을 누르면 이전 번호를 표시하시오.
③ 4에서 다음을 누르면 1로, 1에서 이전을 누르면 4로 돌아가시오.
④ imageView에 "상품 이미지 3 / 4" 형식으로 표시하시오.


< 문제 9. 탭 메뉴 >
① tab-btn 3개에 forEach()로 click 이벤트를 등록하시오.
② 클릭한 탭에만 active 클래스를 적용하시오.
③ 아래 배열에서 같은 순서의 내용을 tabContent에 표시하시오.

    const tabTexts = ["고음질 무선 이어폰입니다.", "리뷰 128개 (평점 4.8)", "등록된 문의가 없습니다."];


< 문제 10. window.onload 방식 (final.js 방식) >
① window.onload = function() { ... } 안에서 reviewBtn에 onclick 이벤트를 등록하시오.
② 클릭하면 prompt()로 리뷰를 입력받으시오.
③ 취소(null)하거나 빈 문자열이면 alert("리뷰를 입력하지 않았습니다.")
④ 입력하면 reviewList에 li로 추가하고, 콘솔에 "리뷰 n개"를 출력하시오.
⑤ window.onload를 사용하는 이유를 주석으로 작성하시오.
*/


// < 강사용 정답 >

// < 문제 1 >
function buyNow() {
    document.querySelector("#buyResult").textContent = "구매 페이지로 이동합니다.";
}


// < 문제 2 >
const wishBtn = document.querySelector("#wishBtn");

wishBtn.onclick = function() {
    wishBtn.textContent = "♥ 찜 완료";
    console.log("찜 목록에 추가");
};


// < 문제 3 >
const shareBtn = document.querySelector("#shareBtn");
const shareCount = document.querySelector("#shareCount");
let shareNumber = 0;

shareBtn.addEventListener("click", function() {
    console.log("공유하기 클릭");
});

shareBtn.addEventListener("click", function() {
    shareNumber++;
    shareCount.textContent = shareNumber;
});


// < 문제 4 >
const infoBtn = document.querySelector("#infoBtn");

function showInfo() {
    document.querySelector("#infoText").textContent = "배송: 결제 후 2~3일 이내 도착";
}

infoBtn.addEventListener("click", showInfo);

// infoBtn.addEventListener("click", showInfo()); 처럼 괄호를 붙이면
// 클릭하기 전에 페이지가 열리자마자 함수가 실행되고,
// 반환값(undefined)이 등록되어 클릭해도 아무 동작을 하지 않는다.


// < 문제 5 >
const minusBtn = document.querySelector("#minusBtn");
const plusBtn = document.querySelector("#plusBtn");
const qtyText = document.querySelector("#qty");
const totalPrice = document.querySelector("#totalPrice");

const unitPrice = 15000;
let qty = 1;

function updatePrice() {
    qtyText.textContent = qty;
    totalPrice.textContent = "총 금액: " + (unitPrice * qty).toLocaleString() + "원";
}

plusBtn.addEventListener("click", function() {
    if (qty < 10) {
        qty++;
        updatePrice();
    }
});

minusBtn.addEventListener("click", function() {
    if (qty > 1) {
        qty--;
        updatePrice();
    }
});


// < 문제 6 >
const testBtn = document.querySelector("#testBtn");

testBtn.onclick = function() { console.log("A"); };
testBtn.onclick = function() { console.log("B"); };
testBtn.addEventListener("click", function() { console.log("C"); });
testBtn.addEventListener("click", function() { console.log("D"); });

// 예측 결과 : B, C, D
// onclick 프로퍼티는 함수를 하나만 저장할 수 있으므로
// 두 번째 대입(B)이 첫 번째(A)를 덮어쓴다.
// addEventListener()는 등록한 함수가 모두 실행된다.


// < 문제 7 >
const eventBtn = document.querySelector("#eventBtn");

function applyEvent() {
    document.querySelector("#eventResult").textContent = "응모가 완료되었습니다.";
    eventBtn.textContent = "응모 완료";
    eventBtn.disabled = true;

    eventBtn.removeEventListener("click", applyEvent);
}

eventBtn.addEventListener("click", applyEvent);


// < 문제 8 >
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const imageView = document.querySelector("#imageView");

const totalImages = 4;
let currentImage = 1;

function showImage() {
    imageView.textContent = "상품 이미지 " + currentImage + " / " + totalImages;
}

nextBtn.addEventListener("click", function() {
    currentImage++;

    if (currentImage > totalImages) {
        currentImage = 1;
    }

    showImage();
});

prevBtn.addEventListener("click", function() {
    currentImage--;

    if (currentImage < 1) {
        currentImage = totalImages;
    }

    showImage();
});


// < 문제 9 >
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContent = document.querySelector("#tabContent");
const tabTexts = ["고음질 무선 이어폰입니다.", "리뷰 128개 (평점 4.8)", "등록된 문의가 없습니다."];

tabButtons.forEach(function(button, index) {
    button.addEventListener("click", function() {
        tabButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        tabContent.textContent = tabTexts[index];
    });
});


// < 문제 10 >
window.onload = function() {
    const reviewBtn = document.querySelector("#reviewBtn");
    const reviewList = document.querySelector("#reviewList");

    reviewBtn.onclick = function() {
        const review = prompt("리뷰를 입력하세요.");

        if (review === null || review.trim() === "") {
            alert("리뷰를 입력하지 않았습니다.");
            return;
        }

        const li = document.createElement("li");
        li.textContent = review;
        reviewList.append(li);

        console.log("리뷰 " + reviewList.children.length + "개");
    };
};

// window.onload는 HTML과 이미지 등 모든 리소스의 로딩이 끝난 후 실행된다.
// script를 head에 defer 없이 작성해도 요소가 만들어진 뒤 이벤트를 등록할 수 있다.
