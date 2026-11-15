/*
< 학생용 실습 문제 >

주제: 카페 주문 페이지의 요소 생성, 추가, 삭제
출력: console.log() 또는 화면으로 확인

=====================================================================
[기초]
=====================================================================

< 문제 1. 요소 생성 후 추가 >
① p 요소를 생성하고 "어서 오세요, DOM 카페입니다."라는 문구를 넣으시오.
② id가 welcomeArea인 요소의 마지막 자식으로 추가하시오.
③ welcomeArea의 자식 요소 개수를 출력하시오.

출력 예시)
welcomeArea 자식 요소 수: 1


< 문제 2. 맨 앞과 맨 뒤에 추가 >
① menuList의 맨 앞에 "오늘의 추천 - 바닐라라테" li를 추가하시오. (prepend)
② menuList의 맨 뒤에 "신메뉴 - 흑당라테" li를 추가하시오. (append)
③ menuList의 모든 li 텍스트를 순서대로 출력하시오.

출력 예시)
오늘의 추천 - 바닐라라테
아메리카노
카페라테
신메뉴 - 흑당라테


< 문제 3. 기준 요소의 앞과 뒤에 추가 >
① id가 targetItem인 요소의 바로 앞에 "브라우니" li를 추가하시오. (before)
② targetItem의 바로 뒤에 "에그타르트" li를 추가하시오. (after)
③ dessertList의 li 개수를 출력하시오.

출력 예시)
디저트 수: 5


< 문제 4. 요소 삭제 >
① id가 oldBanner인 요소를 선택하시오.
② 요소가 존재하면 삭제하고 "배너를 삭제했습니다."를 출력하시오.
③ 다시 #oldBanner를 선택하여 null인지 확인하시오.

출력 예시)
배너를 삭제했습니다.
삭제 후 선택 결과: null


=====================================================================
[응용]
=====================================================================

< 문제 5. 배열로 목록 만들기 >
① 아래 배열의 값으로 li 요소를 만들어 drinkList에 추가하시오.

   const drinks = ["아메리카노", "카페라테", "바닐라라테", "카푸치노", "녹차라테"];

② DocumentFragment에 li를 모두 담은 뒤, 마지막에 한 번만 drinkList에 추가하시오.
③ 각 li의 텍스트는 "1. 아메리카노"처럼 번호를 붙이시오.
④ 추가 후 fragment의 자식 수와 drinkList의 자식 수를 출력하시오.

출력 예시)
fragment 자식 수: 0
drinkList 자식 수: 5


< 문제 6. 요소 복제 >
① id가 templateCard인 요소를 자식까지 복제하여 3개의 카드를 만드시오.
② 복제한 카드의 h3 텍스트를 "추천 메뉴 1", "추천 메뉴 2", "추천 메뉴 3"으로 변경하시오.
③ 복제한 카드의 id 속성은 제거하시오. (중복 id 방지)
④ 복제한 카드를 cardArea에 추가하시오.
⑤ 원본 카드는 화면에서 삭제하시오.
⑥ 문서에서 id가 templateCard인 요소의 개수를 출력하시오.

출력 예시)
templateCard 개수: 0
cardArea 카드 수: 3


< 문제 7. 요소 교체 >
① strong 요소를 생성하고 "주문이 완료되었습니다."라는 문구를 넣으시오.
② id가 statusText인 요소를 ①의 strong 요소로 교체하시오.
③ 교체 후 statusText 변수가 가리키는 요소가 문서에 연결되어 있는지
   isConnected 프로퍼티로 확인하시오.

출력 예시)
statusText 연결 여부: false


=====================================================================
[심화]
=====================================================================

< 문제 8. 방명록 >
① guestBtn을 클릭하면 guestName과 guestMsg의 입력값을 읽으시오. (trim)
② 하나라도 비어 있으면 guestError에 "이름과 메시지를 모두 입력하세요."를 표시하고 종료하시오.
③ guestList에 다음 구조의 li를 생성하여 맨 위(가장 최근 글이 위)에 추가하시오.

   <li>
       <strong>이름</strong> : 메시지 <button>삭제</button>
   </li>

④ 사용자 입력은 반드시 textContent로 넣으시오. (innerHTML 사용 금지)
⑤ 삭제 버튼을 클릭하면 해당 li만 삭제되도록 하시오.
⑥ 등록 후 입력창과 guestError를 비우시오.
⑦ <img src=x onerror=alert(1)> 을 메시지로 입력해 보고,
   textContent를 사용하면 어떻게 표시되는지 확인하시오.


< 문제 9. 장바구니 담기 >
① add-cart 버튼을 클릭하면 dataset으로 상품명(data-name)과 가격(data-price)을 읽으시오.
② cartList에 같은 상품이 없으면 새 li를 추가하시오.
   - li에 data-name, data-price, data-qty 속성을 지정하시오. (data-qty는 1)
   - li 텍스트 형식 : "상품명 4,500원 x 1"
③ 같은 상품이 이미 있으면 새로 추가하지 말고 data-qty를 1 증가시키고 텍스트를 갱신하시오.
   힌트) cartList.querySelector('li[data-name="' + name + '"]')
④ 상품을 담을 때마다 총 금액(cartTotal)을 다시 계산하시오.
⑤ 장바구니에 상품이 하나라도 있으면 cartEmpty를 삭제가 아니라 숨기시오. (style.display)

화면 예시)
아메리카노 4,500원 x 2 [삭제]
카페라테 5,000원 x 1 [삭제]
총 금액: 14,000원


< 문제 10. 장바구니 삭제와 비우기 >
① 문제 9에서 만든 li마다 삭제 버튼을 추가하시오.
② 삭제 버튼을 클릭하면 해당 상품 li를 삭제하고 총 금액을 다시 계산하시오.
③ clearCart 버튼을 클릭하면 replaceChildren()으로 cartList를 비우시오.
④ 장바구니가 비면 cartEmpty를 다시 보이고 총 금액을 0원으로 표시하시오.
⑤ 총 금액 계산과 빈 장바구니 표시는 하나의 함수(updateCart)로 만들어 재사용하시오.
*/


// < 강사용 정답 >

// < 문제 1 >
const welcomeArea = document.querySelector("#welcomeArea");
const welcomeText = document.createElement("p");

welcomeText.textContent = "어서 오세요, DOM 카페입니다.";
welcomeArea.append(welcomeText);

console.log("welcomeArea 자식 요소 수: " + welcomeArea.children.length);


// < 문제 2 >
const menuList = document.querySelector("#menuList");

const recommendItem = document.createElement("li");
recommendItem.textContent = "오늘의 추천 - 바닐라라테";
menuList.prepend(recommendItem);

const newMenuItem = document.createElement("li");
newMenuItem.textContent = "신메뉴 - 흑당라테";
menuList.append(newMenuItem);

menuList.querySelectorAll("li").forEach(function(li) {
    console.log(li.textContent);
});


// < 문제 3 >
const targetItem = document.querySelector("#targetItem");

const brownieItem = document.createElement("li");
brownieItem.textContent = "브라우니";
targetItem.before(brownieItem);

const tartItem = document.createElement("li");
tartItem.textContent = "에그타르트";
targetItem.after(tartItem);

console.log("디저트 수: " + document.querySelectorAll("#dessertList li").length);


// < 문제 4 >
const oldBanner = document.querySelector("#oldBanner");

if (oldBanner !== null) {
    oldBanner.remove();
    console.log("배너를 삭제했습니다.");
}

console.log("삭제 후 선택 결과: " + document.querySelector("#oldBanner"));


// < 문제 5 >
const drinks = ["아메리카노", "카페라테", "바닐라라테", "카푸치노", "녹차라테"];
const drinkList = document.querySelector("#drinkList");
const fragment = document.createDocumentFragment();

drinks.forEach(function(drink, index) {
    const li = document.createElement("li");
    li.textContent = (index + 1) + ". " + drink;
    fragment.append(li);
});

drinkList.append(fragment);

console.log("fragment 자식 수: " + fragment.childNodes.length); // 0
console.log("drinkList 자식 수: " + drinkList.children.length); // 5

// fragment를 DOM에 추가하면 자식 노드들이 이동하므로 fragment는 비게 된다.


// < 문제 6 >
const templateCard = document.querySelector("#templateCard");
const cardArea = document.querySelector("#cardArea");

for (let i = 1; i <= 3; i++) {
    const copy = templateCard.cloneNode(true);

    copy.removeAttribute("id");
    copy.querySelector("h3").textContent = "추천 메뉴 " + i;

    cardArea.append(copy);
}

templateCard.remove();

console.log("templateCard 개수: " + document.querySelectorAll("#templateCard").length);
console.log("cardArea 카드 수: " + cardArea.children.length);


// < 문제 7 >
const statusText = document.querySelector("#statusText");
const doneText = document.createElement("strong");

doneText.textContent = "주문이 완료되었습니다.";
statusText.replaceWith(doneText);

console.log("statusText 연결 여부: " + statusText.isConnected); // false

// replaceWith() 후 statusText 변수는 여전히 기존 p 요소를 가리키지만
// 그 요소는 더 이상 문서에 연결되어 있지 않다.


// < 문제 8 >
const guestName = document.querySelector("#guestName");
const guestMsg = document.querySelector("#guestMsg");
const guestBtn = document.querySelector("#guestBtn");
const guestError = document.querySelector("#guestError");
const guestList = document.querySelector("#guestList");

guestBtn.addEventListener("click", function() {
    const name = guestName.value.trim();
    const message = guestMsg.value.trim();

    if (name === "" || message === "") {
        guestError.textContent = "이름과 메시지를 모두 입력하세요.";
        return;
    }

    const li = document.createElement("li");
    const strong = document.createElement("strong");
    const deleteBtn = document.createElement("button");

    strong.textContent = name;
    deleteBtn.type = "button";
    deleteBtn.textContent = "삭제";

    // 문자열은 append()로 텍스트 노드가 되므로 HTML로 해석되지 않는다.
    li.append(strong, " : " + message + " ", deleteBtn);

    deleteBtn.addEventListener("click", function() {
        li.remove();
    });

    guestList.prepend(li);

    guestName.value = "";
    guestMsg.value = "";
    guestError.textContent = "";
    guestName.focus();
});

// <img src=x onerror=alert(1)> 을 입력해도 태그로 해석되지 않고
// 입력한 문자열이 그대로 화면에 표시된다.


// < 문제 9, 10 >
const addCartButtons = document.querySelectorAll(".add-cart");
const cartList = document.querySelector("#cartList");
const cartEmpty = document.querySelector("#cartEmpty");
const cartTotal = document.querySelector("#cartTotal");
const clearCart = document.querySelector("#clearCart");

// li의 dataset을 이용해 텍스트를 다시 작성하는 함수
function renderCartItem(li) {
    const name = li.dataset.name;
    const price = Number(li.dataset.price);
    const qty = Number(li.dataset.qty);

    // 첫 번째 자식(텍스트를 담는 span)만 변경한다.
    li.firstElementChild.textContent =
        name + " " + price.toLocaleString() + "원 x " + qty + " ";
}

// 총 금액과 빈 장바구니 표시를 갱신하는 함수
function updateCart() {
    let total = 0;

    for (const li of cartList.children) {
        total += Number(li.dataset.price) * Number(li.dataset.qty);
    }

    cartTotal.textContent = "총 금액: " + total.toLocaleString() + "원";

    if (cartList.children.length === 0) {
        cartEmpty.style.display = "block";
    } else {
        cartEmpty.style.display = "none";
    }
}

addCartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const name = button.dataset.name;
        const price = button.dataset.price;

        const existItem = cartList.querySelector('li[data-name="' + name + '"]');

        if (existItem !== null) {
            // 이미 담긴 상품 : 수량만 증가
            existItem.dataset.qty = Number(existItem.dataset.qty) + 1;
            renderCartItem(existItem);
        } else {
            // 새 상품 : li 생성
            const li = document.createElement("li");
            const text = document.createElement("span");
            const deleteBtn = document.createElement("button");

            li.dataset.name = name;
            li.dataset.price = price;
            li.dataset.qty = 1;

            deleteBtn.type = "button";
            deleteBtn.textContent = "삭제";

            // < 문제 10 > 개별 삭제
            deleteBtn.addEventListener("click", function() {
                li.remove();
                updateCart();
            });

            li.append(text, deleteBtn);
            renderCartItem(li);
            cartList.append(li);
        }

        updateCart();
    });
});

// < 문제 10 > 전체 비우기
clearCart.addEventListener("click", function() {
    cartList.replaceChildren();
    updateCart();
});
