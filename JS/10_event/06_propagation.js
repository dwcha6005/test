
/*
< 수업 주제 >
06. 이벤트 전파(Event Propagation)

< 학습 목표 >
1. 이벤트 버블링과 캡처링의 실행 순서를 이해한다.
2. addEventListener()의 세 번째 인자를 이해한다.
3. stopPropagation()으로 이벤트 전파를 중단한다.
4. stopImmediatePropagation()과의 차이를 이해한다.
*/

// < 1. 이벤트 버블링(Bubbling) >

const bubbleOuter = document.querySelector("#bubbleOuter");
const bubbleMiddle = document.querySelector("#bubbleMiddle");
const bubbleInner = document.querySelector("#bubbleInner");
const bubbleButton = document.querySelector("#bubbleButton");

bubbleOuter.addEventListener("click", function () {
    console.log("Outer 클릭");
});

bubbleMiddle.addEventListener("click", function () {
    console.log("Middle 클릭");
});

bubbleInner.addEventListener("click", function () {
    console.log("Inner 클릭");
});

bubbleButton.addEventListener("click", function () {
    console.log("Button 클릭");
});

// 버튼을 클릭했을 때 출력 순서
// Button 클릭
// Inner 클릭
// Middle 클릭
// Outer 클릭
//
// < 이벤트 버블링 >
// 이벤트가 발생한 요소에서 시작하여 부모 요소 방향으로 전파되는 현상
//
// 버튼을 클릭하면 버튼의 리스너가 먼저 실행되고,
// 이후 부모 요소에 등록된 리스너들이 순서대로 실행된다.


// < 2. 캡처링(Capturing)과 버블링(Bubbling) >

const phaseOuter = document.querySelector("#phaseOuter");
const phaseMiddle = document.querySelector("#phaseMiddle");
const phaseButton = document.querySelector("#phaseButton");

// 캡처링 단계에서 실행
phaseOuter.addEventListener("click", function (event) {
    console.log("Outer 캡처링", event.eventPhase);
}, true);

phaseMiddle.addEventListener("click", function (event) {
    console.log("Middle 캡처링", event.eventPhase);
}, true);

// 이벤트가 실제 발생한 버튼에서 실행
phaseButton.addEventListener("click", function (event) {
    console.log("Button 타깃", event.eventPhase);
});

// 버블링 단계에서 실행
phaseMiddle.addEventListener("click", function (event) {
    console.log("Middle 버블링", event.eventPhase);
}, false);

phaseOuter.addEventListener("click", function (event) {
    console.log("Outer 버블링", event.eventPhase);
}, false);

// 버튼을 클릭했을 때 출력 순서
// Outer 캡처링 1
// Middle 캡처링 1
// Button 타깃 2
// Middle 버블링 3
// Outer 버블링 3
//
// < 이벤트 전파 단계 >
// 1 : CAPTURING_PHASE - 캡처링 단계
// 2 : AT_TARGET - 이벤트 타깃 단계
// 3 : BUBBLING_PHASE - 버블링 단계
//
// < addEventListener()의 세 번째 인자 >
// element.addEventListener("click", handler, true);
//
// true  : 캡처링 단계에서 리스너 실행
// false : 버블링 단계에서 리스너 실행
// 생략  : 기본값은 false
//
// < 캡처링과 버블링의 실행 순서 >
// 캡처링 : 부모 -> 자식 방향
// 타깃   : 실제 이벤트가 발생한 요소
// 버블링 : 자식 -> 부모 방향
//
// true와 false는 이벤트 전체의 방향을 바꾸는 것이 아니라,
// 해당 리스너가 어느 단계에서 실행될지를 지정한다.
//
// 참고 : 이벤트 종류에 따라 버블링을 지원하지 않을 수 있다.
// 위 예제의 click 이벤트는 버블링을 지원한다.


// < 3. stopPropagation() >

const stopOuter = document.querySelector("#stopOuter");
const stopInner = document.querySelector("#stopInner");
const stopButton = document.querySelector("#stopButton");

stopOuter.addEventListener("click", function () {
    console.log("Outer 실행");
});

stopInner.addEventListener("click", function () {
    console.log("Inner 실행");
});

stopButton.addEventListener("click", function (event) {
    console.log("Button 실행");
    event.stopPropagation();
});

// 버튼을 클릭했을 때 출력
// Button 실행
//
// < stopPropagation() >
// 현재 이벤트가 다른 요소로 전파되는 것을 중단한다.
//
// 버튼에서 호출했기 때문에 부모인 Inner와 Outer의
// 버블링 리스너는 실행되지 않는다.
//
// 단, 같은 버튼에 등록된 다른 리스너의 실행까지
// 자동으로 중단하는 것은 아니다.


// < 4. stopImmediatePropagation() >

const immediateOuter = document.querySelector("#immediateOuter");
const immediateButton = document.querySelector("#immediateButton");

immediateOuter.addEventListener("click", function () {
    console.log("Outer 실행");
});

immediateButton.addEventListener("click", function (event) {
    console.log("첫 번째 리스너 실행");
    event.stopImmediatePropagation();
});

immediateButton.addEventListener("click", function () {
    console.log("두 번째 리스너 실행");
});

// 버튼을 클릭했을 때 출력
// 첫 번째 리스너 실행
//
// < stopImmediatePropagation() >
// 현재 요소에 등록된 이후 리스너의 실행과
// 다른 요소로의 이벤트 전파를 중단한다.
//
// 따라서 두 번째 리스너와 부모 Outer의 리스너는 실행되지 않는다.
