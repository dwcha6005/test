// < 1. event 객체와 event.type >

const typeButton = document.querySelector("#typeButton");
const typeResult = document.querySelector("#typeResult");

// 이벤트 리스너의 매개변수 event에는 이벤트 정보가 전달됩니다.
typeButton.addEventListener("click", function(event) {
    console.log(event);

    typeResult.textContent =
        "발생한 이벤트: " + event.type;
});

// dblclick 이벤트도 별도로 등록할 수 있습니다.
typeButton.addEventListener("dblclick", function(event) {
    typeResult.textContent =
        "발생한 이벤트: " + event.type;
});

// < 2. event.target과 event.currentTarget >

const outerBox = document.querySelector("#outerBox");
const targetResult = document.querySelector("#targetResult");

// 바깥 영역에 이벤트 리스너를 등록합니다.
outerBox.addEventListener("click", function(event) {
    console.log("event 객체:", event);
    console.log("event.type:", event.type);
    console.log("event.target:", event.target);
    console.log("event.currentTarget:", event.currentTarget);

    targetResult.textContent =
        "event.type: " + event.type + "\n" +
        "event.target: " + event.target.tagName +
        (event.target.id ? " (#" + event.target.id + ")" : "") + "\n" +
        "event.currentTarget: " + event.currentTarget.tagName +
        " (#" + event.currentTarget.id + ")";
});

// < 3. 키보드 이벤트 정보 >

const keyboardInput = document.querySelector("#keyboardInput");
const keyboardResult = document.querySelector("#keyboardResult");

// keydown: 키를 누르는 순간 발생
keyboardInput.addEventListener("keydown", function(event) {
    keyboardResult.textContent =
        "이벤트 종류: " + event.type + "\n" +
        "event.key: " + event.key + "\n" +
        "event.code: " + event.code + "\n" +
        "Ctrl 키: " + event.ctrlKey + "\n" +
        "Shift 키: " + event.shiftKey + "\n" +
        "Alt 키: " + event.altKey;
});

// keyup: 키에서 손을 떼는 순간 발생
keyboardInput.addEventListener("keyup", function(event) {
    console.log(
        "키를 놓았습니다:",
        event.key,
        event.code,
        event.type
    );
});

// < 4. 마우스 좌표 >

const coordinateArea = document.querySelector("#coordinateArea");
const coordinateResult = document.querySelector("#coordinateResult");

coordinateArea.addEventListener("click", function(event) {
    console.log("clientX:", event.clientX);
    console.log("clientY:", event.clientY);
    console.log("pageX:", event.pageX);
    console.log("pageY:", event.pageY);

    coordinateResult.textContent =
        "clientX: " + event.clientX + "\n" +
        "clientY: " + event.clientY + "\n" +
        "pageX: " + event.pageX + "\n" +
        "pageY: " + event.pageY;
});

// < 5. 마우스 버튼 구분 >

const mouseButtonArea = document.querySelector("#mouseButtonArea");
const mouseButtonResult = document.querySelector("#mouseButtonResult");

mouseButtonArea.addEventListener("mousedown", function(event) {
    let buttonName = "";

    if (event.button === 0) {
        buttonName = "왼쪽 버튼";
    } else if (event.button === 1) {
        buttonName = "가운데 버튼";
    } else if (event.button === 2) {
        buttonName = "오른쪽 버튼";
    } else {
        buttonName = "기타 버튼";
    }

    mouseButtonResult.textContent =
        "누른 버튼: " + buttonName + "\n" +
        "event.button: " + event.button;
});