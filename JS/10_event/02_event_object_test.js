/*
< 학생용 실습 문제 >

주제: 카페 키오스크 화면에서 이벤트 객체(event) 활용하기
출력: console.log() 또는 화면으로 확인

=====================================================================
[기초]
=====================================================================

< 문제 1. event.type >
① printType(event) 함수를 만들어 콘솔에 "이벤트 종류: click" 형식으로 출력하시오.
② orderBtn의 click과 dblclick 이벤트에 같은 함수를 등록하시오.


< 문제 2. event.target - 하나의 함수로 여러 버튼 처리 >
① selectMenu(event) 함수를 하나만 만드시오.
② 클릭한 버튼의 텍스트를 event.target으로 읽어 menuResult에 "선택: 카페라테"를 표시하시오.
③ 모든 menu-btn에 같은 함수를 등록하시오.


< 문제 3. event.target.value >
① nameInput에 input 이벤트를 등록하시오.
② event.target.value를 이용해 nameEcho에 "홍길동님의 주문입니다."를 표시하시오.
③ 입력값이 비어 있으면 nameEcho를 비우시오.


< 문제 4. event.key >
① keyInput에 keydown 이벤트를 등록하시오.
② keyResult에 "누른 키: a" 형식으로 표시하시오.
③ Enter, Shift, 방향키 등을 눌러 어떤 값이 나오는지 확인하시오.


=====================================================================
[응용]
=====================================================================

< 문제 5. event.target + dataset >
① size-btn을 클릭하면 클릭한 버튼에만 selected 클래스를 적용하시오.
② 클릭한 버튼의 data-size, data-price를 읽어 sizeResult에 표시하시오.

화면 예시)
선택한 사이즈: Large (+500원)


< 문제 6. target과 currentTarget >
① menuCard에만 click 리스너를 등록하시오.
② 사진, 문장, 버튼, 카드 빈 곳을 각각 클릭하며
   cardInfo에 "target: P / currentTarget: DIV" 형식으로 표시하시오.
③ 두 값의 차이를 주석으로 작성하시오.


< 문제 7. Enter로 쿠폰 확인 >
① couponInput에서 Enter를 누르면 쿠폰 코드를 확인하시오.
② 대소문자 구분 없이 "CAFE10"이면 "10% 할인이 적용되었습니다.",
   그 외에는 "유효하지 않은 쿠폰입니다."를 couponResult에 표시하시오. (toUpperCase())
③ Esc를 누르면 입력창과 결과를 모두 비우시오.
④ 한글 조합 중 Enter가 두 번 처리되지 않도록 event.isComposing을 확인하시오.


=====================================================================
[심화]
=====================================================================

< 문제 8. 하나의 함수로 수량 조절 >
① qty-btn 3개에 changeQty(event) 함수 하나만 등록하시오.
② 클릭한 버튼의 data-diff 값을 숫자로 변환하여 수량에 더하시오.
③ 수량은 1 ~ 20 사이로 제한하시오. (범위를 벗어나면 1 또는 20으로 맞춤)
④ qtyView에 수량을 표시하고 콘솔에 "변경량: +5 / 현재 수량: 6"을 출력하시오.


< 문제 9. 키보드 단축키 >
① document에 keydown 이벤트를 등록하시오.
② 1, 2, 3 키를 누르면 menu-btn의 1, 2, 3번째 메뉴를 선택한 것처럼 menuResult에 표시하시오.
③ Esc를 누르면 menuResult에 "선택이 취소되었습니다."를 표시하시오.
④ 단, 입력창(INPUT)에서 키를 누를 때는 단축키가 동작하지 않도록
   event.target.tagName을 확인하시오.


< 문제 10. 여러 입력창을 하나의 함수로 미리보기 >
① updatePreview(event) 함수 하나를 orderName, orderPhone, orderRequest의 input 이벤트에 등록하시오.
② event.target.id로 어떤 입력창인지 구분하여 해당 미리보기 span에 값을 표시하시오.
   - orderName    → previewName
   - orderPhone   → previewPhone
   - orderRequest → previewRequest
③ 값이 비어 있으면 "-"를 표시하시오.
힌트) 객체로 연결하면 if문 없이도 작성할 수 있다.
     const previewMap = { orderName: "previewName", ... };
*/


// < 강사용 정답 >

// < 문제 1 >
const orderBtn = document.querySelector("#orderBtn");

function printType(event) {
    console.log("이벤트 종류: " + event.type);
}

orderBtn.addEventListener("click", printType);
orderBtn.addEventListener("dblclick", printType);


// < 문제 2 >
const menuButtons = document.querySelectorAll(".menu-btn");
const menuResult = document.querySelector("#menuResult");

function selectMenu(event) {
    menuResult.textContent = "선택: " + event.target.textContent;
}

menuButtons.forEach(function(button) {
    button.addEventListener("click", selectMenu);
});


// < 문제 3 >
const nameInput = document.querySelector("#nameInput");
const nameEcho = document.querySelector("#nameEcho");

nameInput.addEventListener("input", function(event) {
    const name = event.target.value.trim();

    if (name === "") {
        nameEcho.textContent = "";
    } else {
        nameEcho.textContent = name + "님의 주문입니다.";
    }
});


// < 문제 4 >
const keyInput = document.querySelector("#keyInput");
const keyResult = document.querySelector("#keyResult");

keyInput.addEventListener("keydown", function(event) {
    keyResult.textContent = "누른 키: " + event.key;
});


// < 문제 5 >
const sizeButtons = document.querySelectorAll(".size-btn");
const sizeResult = document.querySelector("#sizeResult");

sizeButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        const clicked = event.target;

        sizeButtons.forEach(function(btn) {
            btn.classList.remove("selected");
        });
        clicked.classList.add("selected");

        sizeResult.textContent =
            "선택한 사이즈: " + clicked.dataset.size + " (+" + clicked.dataset.price + "원)";
    });
});


// < 문제 6 >
const menuCard = document.querySelector("#menuCard");
const cardInfo = document.querySelector("#cardInfo");

menuCard.addEventListener("click", function(event) {
    cardInfo.textContent =
        "target: " + event.target.tagName +
        " / currentTarget: " + event.currentTarget.tagName;
});

// target은 실제로 클릭한 요소라서 클릭한 위치에 따라 DIV, P, BUTTON으로 바뀐다.
// currentTarget은 리스너를 등록한 menuCard이므로 항상 DIV이다.


// < 문제 7 >
const couponInput = document.querySelector("#couponInput");
const couponResult = document.querySelector("#couponResult");

couponInput.addEventListener("keydown", function(event) {
    if (event.isComposing) {
        return;
    }

    if (event.key === "Enter") {
        const code = couponInput.value.trim().toUpperCase();

        if (code === "CAFE10") {
            couponResult.textContent = "10% 할인이 적용되었습니다.";
        } else {
            couponResult.textContent = "유효하지 않은 쿠폰입니다.";
        }
    }

    if (event.key === "Escape") {
        couponInput.value = "";
        couponResult.textContent = "";
    }
});


// < 문제 8 >
const qtyButtons = document.querySelectorAll(".qty-btn");
const qtyView = document.querySelector("#qtyView");
let quantity = 1;

function changeQty(event) {
    const diff = Number(event.target.dataset.diff);

    quantity += diff;

    if (quantity < 1) {
        quantity = 1;
    }
    if (quantity > 20) {
        quantity = 20;
    }

    qtyView.textContent = quantity;
    console.log("변경량: " + (diff > 0 ? "+" : "") + diff + " / 현재 수량: " + quantity);
}

qtyButtons.forEach(function(button) {
    button.addEventListener("click", changeQty);
});


// < 문제 9 >
document.addEventListener("keydown", function(event) {
    // 입력창에서 누른 키는 무시
    if (event.target.tagName === "INPUT") {
        return;
    }

    if (event.key === "1" || event.key === "2" || event.key === "3") {
        const index = Number(event.key) - 1;
        menuResult.textContent = "선택: " + menuButtons[index].textContent;
    }

    if (event.key === "Escape") {
        menuResult.textContent = "선택이 취소되었습니다.";
    }
});


// < 문제 10 >
const previewMap = {
    orderName: "previewName",
    orderPhone: "previewPhone",
    orderRequest: "previewRequest"
};

function updatePreview(event) {
    const input = event.target;
    const preview = document.getElementById(previewMap[input.id]);
    const value = input.value.trim();

    preview.textContent = value === "" ? "-" : value;
}

document.querySelector("#orderName").addEventListener("input", updatePreview);
document.querySelector("#orderPhone").addEventListener("input", updatePreview);
document.querySelector("#orderRequest").addEventListener("input", updatePreview);
