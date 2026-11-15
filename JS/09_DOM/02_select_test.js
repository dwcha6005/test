/*
< 학생용 실습 문제 >

주제: 쇼핑몰 상품 목록에서 요소 선택하기
출력: console.log()로 확인

=====================================================================
[기초]
=====================================================================

< 문제 1. id로 선택 >
① getElementById()로 id가 shopName인 요소를 선택하시오.
② 요소의 텍스트를 출력하시오.

출력 예시)
쇼핑몰 이름: DOM 마켓


< 문제 2. 클래스로 선택 >
① getElementsByClassName()으로 product 클래스를 가진 요소를 모두 선택하시오.
② 전체 상품 개수를 출력하시오.

출력 예시)
전체 상품 수: 7


< 문제 3. 첫 번째 요소 선택 >
① querySelector()로 첫 번째 product 요소를 선택하시오.
② 텍스트를 출력하시오.

출력 예시)
첫 번째 상품: 무선 이어폰


< 문제 4. 여러 요소 반복 출력 >
① querySelectorAll()로 #noticeArea 안의 notice 요소를 모두 선택하시오.
② for...of 문으로 모든 공지사항의 텍스트를 출력하시오.

출력 예시)
배송 안내: 오후 3시 이전 주문은 당일 출고됩니다.
교환 안내: 수령 후 7일 이내에 신청하세요.
이벤트 안내: 신규 회원 10% 할인 쿠폰 지급


=====================================================================
[응용]
=====================================================================

< 문제 5. 특정 영역 안에서만 선택 >
① 먼저 id가 newList인 요소를 선택하시오.
② document가 아니라 ①에서 선택한 요소를 기준으로 product 요소를 선택하시오.
③ forEach()를 이용해 "번호. 상품명" 형식으로 출력하시오. (번호는 1부터)

출력 예시)
1. USB 허브
2. 노트북 파우치
3. 웹캠


< 문제 6. 조건에 맞는 요소만 선택 >
① 품절 상품(product 클래스와 soldout 클래스를 모두 가진 li)만 선택하시오.
   단, 선택자 하나로 작성하시오.
② 품절 상품 개수와 각 상품명을 출력하시오.

출력 예시)
품절 상품: 2개
- 기계식 키보드
- 노트북 파우치


< 문제 7. 위치 선택자 활용 >
① #bestList의 세 번째 상품을 :nth-child()로 선택하여 출력하시오.
② #bestList의 마지막 상품을 :last-child로 선택하여 출력하시오.
③ 같은 세 번째 상품을 querySelectorAll()과 인덱스로 선택하여 출력하시오.
   (nth-child와 인덱스의 시작 번호 차이에 주의)

출력 예시)
세 번째 상품: 게이밍 마우스
마지막 상품: 모니터 받침대
인덱스로 선택: 게이밍 마우스


=====================================================================
[심화]
=====================================================================

< 문제 8. 요소가 없을 때 안전하게 처리 >
① id가 eventArea인 요소를 선택하시오. (HTML에 존재하지 않는다.)
② 요소가 없으면 "이벤트 영역이 없습니다."를 출력하시오.
③ 요소가 있으면 요소의 텍스트를 출력하시오.
④ 조건 확인 없이 eventArea.textContent에 접근하면 어떤 오류가 발생하는지 주석으로 작성하시오.

출력 예시)
이벤트 영역이 없습니다.


< 문제 9. HTMLCollection(live)과 NodeList(static) 비교 >
① getElementsByClassName("product")의 결과를 liveItems에 저장하시오.
② querySelectorAll(".product")의 결과를 staticItems에 저장하시오.
③ 두 컬렉션의 length를 출력하시오.
④ 아래 코드로 #newList에 새 상품을 추가하시오.

    const newItem = document.createElement("li");
    newItem.className = "product";
    newItem.textContent = "블루투스 스피커";
    document.querySelector("#newList").append(newItem);

⑤ 다시 두 컬렉션의 length를 출력하고, 결과가 다른 이유를 주석으로 작성하시오.

출력 예시)
추가 전 - live: 7 / static: 7
추가 후 - live: 8 / static: 7


< 문제 10. 선택한 요소를 배열로 가공 >
① 모든 product 요소를 선택하시오. (문제 9에서 추가한 상품 포함)
② Array.from()과 map()으로 모든 상품명 배열을 만들어 출력하시오.
③ filter()로 품절(soldout)이 아닌 상품만 골라 상품명 배열을 출력하시오.
   힌트) 요소.classList.contains("soldout") : 클래스가 있으면 true (04에서 자세히 학습)

출력 예시)
전체 상품: ['무선 이어폰', '기계식 키보드', '게이밍 마우스', '모니터 받침대', 'USB 허브', '노트북 파우치', '웹캠', '블루투스 스피커']
구매 가능 상품: ['무선 이어폰', '게이밍 마우스', '모니터 받침대', 'USB 허브', '웹캠', '블루투스 스피커']
*/


// < 강사용 정답 >

// < 문제 1 >
const shopName = document.getElementById("shopName");

console.log("쇼핑몰 이름: " + shopName.textContent);


// < 문제 2 >
const products = document.getElementsByClassName("product");

console.log("전체 상품 수: " + products.length);


// < 문제 3 >
const firstProduct = document.querySelector(".product");

console.log("첫 번째 상품: " + firstProduct.textContent);


// < 문제 4 >
const notices = document.querySelectorAll("#noticeArea .notice");

for (const notice of notices) {
    console.log(notice.textContent);
}


// < 문제 5 >
const newList = document.getElementById("newList");
const newProducts = newList.querySelectorAll(".product");

newProducts.forEach(function(item, index) {
    console.log((index + 1) + ". " + item.textContent);
});


// < 문제 6 >
const soldoutItems = document.querySelectorAll("li.product.soldout");

console.log("품절 상품: " + soldoutItems.length + "개");

soldoutItems.forEach(function(item) {
    console.log("- " + item.textContent);
});


// < 문제 7 >
const thirdItem = document.querySelector("#bestList li:nth-child(3)");
const lastItem = document.querySelector("#bestList li:last-child");
const bestItems = document.querySelectorAll("#bestList li");

console.log("세 번째 상품: " + thirdItem.textContent);
console.log("마지막 상품: " + lastItem.textContent);
console.log("인덱스로 선택: " + bestItems[2].textContent);

// nth-child()는 1부터, 인덱스는 0부터 시작한다.


// < 문제 8 >
const eventArea = document.getElementById("eventArea");

if (eventArea !== null) {
    console.log(eventArea.textContent);
} else {
    console.log("이벤트 영역이 없습니다.");
}

// 조건 없이 eventArea.textContent에 접근하면
// TypeError: Cannot read properties of null (reading 'textContent')
// 오류가 발생한다. 요소를 찾지 못하면 null이 반환되기 때문이다.


// < 문제 9 >
const liveItems = document.getElementsByClassName("product");
const staticItems = document.querySelectorAll(".product");

console.log("추가 전 - live: " + liveItems.length + " / static: " + staticItems.length);

const newItem = document.createElement("li");
newItem.className = "product";
newItem.textContent = "블루투스 스피커";
document.querySelector("#newList").append(newItem);

console.log("추가 후 - live: " + liveItems.length + " / static: " + staticItems.length);

// getElementsByClassName()의 HTMLCollection은 live collection이므로
// DOM에 요소가 추가되면 자동으로 반영된다.
// querySelectorAll()의 NodeList는 static이므로 선택한 시점의 결과가 유지된다.


// < 문제 10 >
const allProducts = document.querySelectorAll(".product");

const productNames = Array.from(allProducts).map(function(item) {
    return item.textContent;
});

const availableNames = Array.from(allProducts)
    .filter(function(item) {
        return !item.classList.contains("soldout");
    })
    .map(function(item) {
        return item.textContent;
    });

console.log("전체 상품:", productNames);
console.log("구매 가능 상품:", availableNames);
