
/*
    < 1. DOM 스타일과 클래스 제어 >

    DOM을 이용하면 JavaScript에서 HTML 요소의 스타일과 클래스를 변경할 수 있다.

    1) element.style
       - 특정 요소의 인라인 스타일을 변경한다.

    2) element.classList
       - 특정 요소의 CSS 클래스를 추가하거나 제거한다.
       - CSS 클래스에 정의된 스타일을 적용하거나 해제할 수 있다.
*/


// < 3. element.style >

// element.style은 HTML 요소의 인라인 스타일을 JavaScript에서 제어한다.
// CSS 속성 중 원하는 속성을 선택하여 값을 지정할 수 있다.

const title = document.querySelector("#title");

// 글자 색상 변경
title.style.color = "red";

// 글자 크기 변경
title.style.fontSize = "40px";

// 배경 색상 변경
title.style.backgroundColor = "lightyellow";

// 여백 변경
title.style.padding = "20px";

// 테두리 변경
title.style.border = "2px solid black";


// < 4. CSS 속성 이름의 차이 >

// CSS에서는 하이픈(-)을 사용한다.
// JavaScript의 style 속성에서는 일반적으로 camelCase를 사용한다.

/*
    CSS                    JavaScript

    color                  style.color
    font-size              style.fontSize
    background-color       style.backgroundColor
    border-radius          style.borderRadius
    margin-top             style.marginTop
    padding-left           style.paddingLeft
    z-index                style.zIndex
*/

title.style.fontSize = "32px";
title.style.backgroundColor = "lightblue";
title.style.borderRadius = "10px";
title.style.marginTop = "30px";


// < 5. 숫자와 단위 >

// CSS 속성에 따라 숫자와 단위를 함께 지정해야 한다.
// width, height, padding, margin 등의 길이 값에는 보통 단위가 필요하다.

title.style.width = "400px";
title.style.padding = "15px";
title.style.marginLeft = "20px";

// 잘못된 예
// title.style.width = 400;

// 단위가 필요한 CSS 길이 값은 "400px"처럼 지정하는 것이 안전하다.
// 단위 없는 숫자가 허용되는 속성도 있다. 예: opacity, zIndex, lineHeight(숫자 배수)


/*
    < 6. 여러 스타일을 한꺼번에 변경하기 >

    방법 1. 각각의 속성을 지정한다.

    title.style.color = "white";
    title.style.backgroundColor = "black";
    title.style.padding = "20px";

    방법 2. cssText를 사용한다.

    title.style.cssText = `
        color: white;
        background-color: black;
        padding: 20px;
    `;

    주의:
    cssText는 기존 인라인 스타일 선언을 대체한다.
    기존 인라인 스타일을 유지하며 특정 속성만 변경하려면
    개별 style 속성을 사용하는 편이 안전하다.
*/

// title.style.cssText = "color: white; background-color: black; padding: 20px";


// < 7. style로 설정한 값 읽기 >

// style은 기본적으로 인라인 스타일을 대상으로 한다.

title.style.color = "purple";

console.log(title.style.color);       // purple
console.log(title.style.fontSize);    // 지정된 인라인 값이 있다면 해당 값

// HTML이나 CSS 파일에만 지정된 스타일은
// element.style로 읽었을 때 빈 문자열이 나올 수 있다.

// 예를 들어 CSS 파일에 .title { color: navy; }만 정의되어 있다면
// title.style.color는 빈 문자열일 수 있다.


// < 8. 실제로 적용된 스타일 확인하기 >

// getComputedStyle()은 CSS 규칙과 상속 등을 반영한
// 요소의 계산된 스타일을 확인할 때 사용한다.

const computedStyle = getComputedStyle(title);

console.log(computedStyle.color);
console.log(computedStyle.fontSize);
console.log(computedStyle.backgroundColor);

// getComputedStyle()의 결과는 스타일 확인용이다.
// 일반적으로 이 결과를 직접 수정해서 스타일을 변경하지 않는다.

// style.color = 직접 지정한 인라인 스타일 확인
// getComputedStyle(element).color = 실제 계산된 스타일 확인


// < 9. CSS 클래스 제어 >

// 여러 스타일을 CSS 클래스에 정의해 두고
// JavaScript에서는 클래스만 변경할 수 있다.

const card = document.querySelector("#card");

// 클래스 추가
card.classList.add("active");

// 클래스 제거
card.classList.remove("active");

// 클래스가 있는지 확인
console.log(card.classList.contains("active")); // false

// 클래스가 없으면 추가하고, 있으면 제거한다.
card.classList.toggle("active");

// toggle()은 변경 후 해당 클래스의 존재 여부를 반환한다.
const isActive = card.classList.toggle("active");
console.log(isActive); // true 또는 false


// < 10. 여러 클래스 제어하기 >

// 여러 클래스를 한 번에 추가할 수 있다.
card.classList.add("active", "large");

// 여러 클래스를 한 번에 제거할 수 있다.
card.classList.remove("active", "large");

// replace()는 기존 클래스를 다른 클래스로 교체한다.
card.classList.add("active");
card.classList.replace("active", "dark");

// active가 존재하면 dark로 교체된다.
// active가 존재하지 않으면 교체되지 않는다.


// < 11. className과 classList의 차이 >

// className은 class 속성 전체를 문자열로 다룬다.
// classList는 개별 클래스를 편리하게 다룬다.

// className에 값을 대입하면 기존 클래스가 모두 대체된다.
card.className = "card active";

// 기존 class="card active"에서
// card.className = "dark";
// 를 실행하면 class="dark"만 남는다.

// classList.add()는 기존 클래스를 유지하면서 추가한다.
card.className = "card";
card.classList.add("active");

// 결과: class="card active"

// 클래스 하나를 추가하거나 제거할 때는 classList를 사용하는 것이 편리하다.


// < 12. classList.contains() 활용 >

// 특정 클래스가 있는지 확인하여 조건에 따라 처리할 수 있다.

if (card.classList.contains("active")) {
    console.log("활성화 상태입니다.");
} else {
    console.log("비활성화 상태입니다.");
}


// < 13. style과 classList 비교 >

/*
    element.style

    - CSS 속성을 직접 변경한다.
    - 변경한 스타일은 인라인 스타일로 적용된다.
    - 특정 속성 하나만 간단하게 변경할 때 유용하다.

    element.classList

    - CSS 클래스의 추가, 제거, 교체 등을 수행한다.
    - 실제 디자인은 CSS에서 관리한다.
    - 여러 스타일을 묶거나 상태에 따라 디자인을 바꿀 때 유용하다.
*/

// 개별 속성을 직접 변경
title.style.color = "red";
title.style.fontSize = "40px";

// CSS 클래스에 정의된 여러 스타일을 한 번에 적용
card.classList.add("active");


// < 14. 버튼으로 카드 활성화하기 >

// 아래 코드는 이벤트 처리의 간단한 미리보기다.
// addEventListener()의 자세한 내용은 이벤트 수업에서 다룬다.

const btn = document.querySelector("#btn");

btn.addEventListener("click", function () {
    card.classList.toggle("active");
});


// < 15. 버튼으로 글자 크기 변경하기 >

const message = document.querySelector("#message");

message.style.fontSize = "16px";

btn.addEventListener("click", function () {
    message.style.fontSize = "30px";
});

// 같은 버튼에 이벤트를 여러 개 등록할 수도 있다.
// 버튼을 한 번 클릭하면 등록된 이벤트가 각각 실행된다.


// < 16. 입력값에 따라 클래스 변경하기 >

const username = document.querySelector("#username");

username.addEventListener("input", function () {
    if (username.value.trim() === "") {
        username.classList.remove("success");
        username.classList.add("error");
    } else {
        username.classList.remove("error");
        username.classList.add("success");
    }
});

// input 이벤트는 입력값이 변경될 때 발생한다.
// trim()은 문자열 양쪽의 공백을 제거한 값을 반환한다.


// < 17. 요소 보이기와 숨기기 >

const notice = document.querySelector("#notice");

// 직접 스타일 변경
notice.style.display = "none";  // 숨기기
notice.style.display = "block"; // 보이기

// CSS 클래스 활용
notice.classList.add("hidden");    // 숨기기
notice.classList.remove("hidden"); // 보이기

// display: none은 화면에서 요소를 숨기며 레이아웃 공간도 차지하지 않는다.
// visibility: hidden은 보이지 않지만 원래 레이아웃 공간을 유지한다.
// 두 속성은 동작이 다르다.


// < 18. 클래스 전환으로 다크 모드 만들기 >

// HTML에 아래 요소가 있다고 가정한다.
// <div id="themeBox" class="card">테마 변경 실습</div>
// <button id="themeBtn">테마 변경</button>

// CSS의 .dark 클래스에 다크 모드 스타일이 정의되어 있다고 가정한다.

const themeBox = document.querySelector("#themeBox");
const themeBtn = document.querySelector("#themeBtn");

themeBtn.addEventListener("click", function () {
    themeBox.classList.toggle("dark");
});


// < 19. 클래스 상태에 따라 버튼 문구 변경하기 >

// 버튼 문구도 현재 상태에 맞게 변경할 수 있다.

const themeBox2 = document.querySelector("#themeBox");
const themeBtn2 = document.querySelector("#themeBtn");

themeBtn2.addEventListener("click", function () {
    const isDark = themeBox2.classList.toggle("dark");

    if (isDark) {
        themeBtn2.textContent = "라이트 모드";
    } else {
        themeBtn2.textContent = "다크 모드";
    }
});

// 위 18번과 19번은 같은 버튼에 중복으로 등록하는 예제가 아니다.
// 실제 실행할 때는 18번 코드 또는 19번 코드 중 하나를 사용한다.
// 같은 요소를 대상으로 한 예제 코드를 모두 실행하면 의도와 다르게 동작할 수 있다.


// < 20. 실습 문제 >

/*
    [문제 1]
    id가 message인 요소의 글자 색상을 파란색으로 변경하시오.

    [문제 2]
    id가 title인 요소의 글자 크기를 36px로 변경하시오.

    [문제 3]
    id가 card인 요소에 active 클래스를 추가하시오.

    [문제 4]
    id가 card인 요소에서 active 클래스가 있으면 제거하고,
    없으면 추가하시오.

    [문제 5]
    id가 notice인 요소에 hidden 클래스를 추가하여 숨기시오.

    [문제 6]
    id가 username인 요소에 success 클래스가 있는지 확인하여
    콘솔에 결과를 출력하시오.

    [문제 7]
    id가 title인 요소의 실제 계산된 글자 크기를 콘솔에 출력하시오.
*/


// < 21. 실습 문제 정답 >

// 문제 1
message.style.color = "blue";

// 문제 2
title.style.fontSize = "36px";

// 문제 3
card.classList.add("active");

// 문제 4
card.classList.toggle("active");

// 문제 5
notice.classList.add("hidden");

// 문제 6
console.log(username.classList.contains("success"));

// 문제 7
console.log(getComputedStyle(title).fontSize);
