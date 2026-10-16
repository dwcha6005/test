
// < DOM 요소 선택 >

const searchInput = document.querySelector("#searchInput");
const clearSearchButton = document.querySelector("#clearSearchButton");
const productItems = document.querySelectorAll(".product-item");
const searchResult = document.querySelector("#searchResult");
const noProductMessage = document.querySelector("#noProductMessage");

const inquiryInput = document.querySelector("#inquiryInput");
const inquiryMessage = document.querySelector("#inquiryMessage");
const charCount = document.querySelector("#charCount");
const charWarning = document.querySelector("#charWarning");

const couponInput = document.querySelector("#couponInput");
const couponMessage = document.querySelector("#couponMessage");
const applyCouponButton = document.querySelector("#applyCouponButton");
const discountAmount = document.querySelector("#discountAmount");
const finalPrice = document.querySelector("#finalPrice");
const couponResult = document.querySelector("#couponResult");


// < 실습 1. 상품 실시간 검색 >

// 문제:
// 1. searchProducts 함수를 선언하세요.
// 2. 검색창에 입력된 값을 가져옵니다.
// 3. 모든 상품을 순회하면서 상품명이 검색어를 포함하는지 확인합니다.
// 4. 포함하면 표시하고, 포함하지 않으면 숨깁니다.
// 5. 검색 결과 개수를 searchResult에 표시합니다.
// 6. 검색 결과가 0개이면 noProductMessage를 표시합니다.
// 7. 검색창의 keyup 이벤트에 함수를 등록하세요.
// 8. 초기화 버튼을 클릭하면 검색어를 비우고 전체 상품을 표시하세요.

// 정답 시작
function searchProducts() {
    const keyword = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    productItems.forEach(function(item) {
        const productName = item.querySelector(".product-name").textContent.toLowerCase();
        const isMatched = productName.includes(keyword);

        item.style.display = isMatched ? "" : "none";

        if (isMatched) {
            visibleCount++;
        }
    });

    searchResult.textContent = `검색 결과 ${visibleCount}개`;
    noProductMessage.classList.toggle("d-none", visibleCount !== 0);
}

function clearSearch() {
    searchInput.value = "";
    searchProducts();
    searchInput.focus();
}

searchInput.addEventListener("keyup", searchProducts);
clearSearchButton.addEventListener("click", clearSearch);


// < 실습 2. 고객 문의 글자 수 확인 >

// 문제:
// 1. checkInquiryLength 함수를 선언하세요.
// 2. 입력된 문의 내용의 글자 수를 확인합니다.
// 3. 현재 글자 수를 charCount에 표시합니다.
// 4. 100자를 초과하면 경고 문구를 표시합니다.
// 5. 100자 이하이면 경고 문구를 숨깁니다.
// 6. 입력 내용이 비어 있으면 기본 안내 문구를 표시하세요.
// 7. inquiryInput의 keyup 이벤트에 함수를 등록하세요.

// 정답 시작
function checkInquiryLength() {
    const length = inquiryInput.value.length;
    charCount.textContent = `${length} / 100자`;

    const isOverLimit = length > 100;
    charWarning.classList.toggle("d-none", !isOverLimit);

    if (length === 0) {
        inquiryMessage.textContent = "문의 내용을 입력해 주세요.";
    } else if (isOverLimit) {
        inquiryMessage.textContent = "입력 가능한 글자 수를 초과했습니다.";
    } else {
        inquiryMessage.textContent = "문의 내용을 작성 중입니다.";
    }

    charCount.classList.toggle("text-danger", isOverLimit);
}

inquiryInput.addEventListener("keyup", checkInquiryLength);


// < 실습 3. 쿠폰 코드 검증 및 할인 적용 >

// 문제:
// 1. validateCoupon 함수를 선언하세요.
// 2. 입력된 쿠폰 코드를 대문자로 변환해 WELCOME10과 비교합니다.
// 3. 유효하면 성공 메시지를 표시하고 쿠폰 적용 버튼을 활성화합니다.
// 4. 유효하지 않으면 안내 메시지를 표시하고 버튼을 비활성화합니다.
// 5. 쿠폰 적용 버튼을 클릭하면 50,000원의 10%를 할인합니다.
// 6. 할인 금액과 최종 결제 금액을 표시하세요.
// 7. couponInput의 keyup 이벤트와 적용 버튼의 click 이벤트를 각각 등록하세요.

// 정답 시작
function validateCoupon() {
    const code = couponInput.value.trim().toUpperCase();
    const isValid = code === "WELCOME10";

    if (isValid) {
        couponMessage.textContent = "사용 가능한 쿠폰입니다.";
        couponMessage.className = "mt-2 mb-0 text-success";
    } else {
        couponMessage.textContent = code === ""
            ? "쿠폰 코드를 입력해 주세요."
            : "유효하지 않은 쿠폰 코드입니다.";
        couponMessage.className = "mt-2 mb-0 text-danger";
    }

    applyCouponButton.disabled = !isValid;
    couponResult.textContent = "";
}

function applyCoupon() {
    const price = 50000;
    const discount = price * 0.1;
    const result = price - discount;

    discountAmount.textContent = `${discount.toLocaleString()}원`;
    finalPrice.textContent = `${result.toLocaleString()}원`;
    couponResult.textContent = "쿠폰이 적용되었습니다.";
    couponResult.className = "mt-3 mb-0 text-success";
}

couponInput.addEventListener("keyup", validateCoupon);
applyCouponButton.addEventListener("click", applyCoupon);
