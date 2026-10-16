
// < 1. click과 dblclick >

// click : 클릭 동작이 완료되면 발생합니다.
// dblclick : 짧은 시간 안에 같은 요소를 두 번 클릭하면 발생합니다.
// 클릭 횟수 자체가 아니라 서로 다른 이벤트를 등록한 것입니다.

const singleClickButton = document.querySelector("#singleClickButton");
const doubleClickButton = document.querySelector("#doubleClickButton");
const singleClickResult = document.querySelector("#singleClickResult");
const doubleClickResult = document.querySelector("#doubleClickResult");

let singleClickCount = 0;
let doubleClickCount = 0;

singleClickButton.addEventListener("click", function() {
    singleClickCount++;
    singleClickResult.textContent = `click: ${singleClickCount}회`;
});

doubleClickButton.addEventListener("dblclick", function() {
    doubleClickCount++;
    doubleClickResult.textContent = `dblclick: ${doubleClickCount}회`;
});


// < 2. mousedown과 mouseup >

// mousedown : 마우스 버튼을 누르는 순간 발생합니다.
// mouseup : 마우스 버튼을 놓는 순간 발생합니다.
// click과 달리 버튼을 누르거나 놓는 각각의 시점을 감지할 수 있습니다.

const pressArea = document.querySelector("#pressArea");
const pressResult = document.querySelector("#pressResult");

pressArea.addEventListener("mousedown", function() {
    pressResult.textContent = "mousedown: 마우스 버튼을 눌렀습니다.";
    pressArea.classList.add("border-primary");
});

pressArea.addEventListener("mouseup", function() {
    pressResult.textContent = "mouseup: 마우스 버튼을 놓았습니다.";
    pressArea.classList.remove("border-primary");
});


// < 3. mouseenter와 mouseleave >

// mouseenter : 마우스가 해당 요소의 영역 안으로 들어올 때 발생합니다.
// mouseleave : 마우스가 해당 요소의 영역 밖으로 나갈 때 발생합니다.
// 자식 요소 사이를 이동해도 부모 요소의 mouseenter / mouseleave가
// 다시 발생하지 않는다는 특징이 있습니다.

const enterLeaveArea = document.querySelector("#enterLeaveArea");
const enterLeaveResult = document.querySelector("#enterLeaveResult");

enterLeaveArea.addEventListener("mouseenter", function() {
    enterLeaveArea.classList.add("border-success", "bg-light");
    enterLeaveResult.textContent = "mouseenter: 상품 카드에 마우스가 들어왔습니다.";
});

enterLeaveArea.addEventListener("mouseleave", function() {
    enterLeaveArea.classList.remove("border-success", "bg-light");
    enterLeaveResult.textContent = "mouseleave: 상품 카드에서 마우스가 나갔습니다.";
});


// < 4. mouseover와 mouseout >

// mouseover : 마우스가 요소 위로 들어올 때 발생합니다.
// mouseout : 마우스가 요소에서 벗어날 때 발생합니다.
// 부모 요소 안에서 자식 요소로 이동할 때도 발생할 수 있습니다.
// 아래 예제에서는 부모 영역과 자식 요소 사이를 이동하면서 횟수를 관찰합니다.

const overOutArea = document.querySelector("#overOutArea");
const overOutResult = document.querySelector("#overOutResult");

let mouseOverCount = 0;
let mouseOutCount = 0;

function updateOverOutResult() {
    overOutResult.textContent =
        `mouseover: ${mouseOverCount}회 / mouseout: ${mouseOutCount}회`;
}

overOutArea.addEventListener("mouseover", function() {
    mouseOverCount++;
    updateOverOutResult();
});

overOutArea.addEventListener("mouseout", function() {
    mouseOutCount++;
    updateOverOutResult();
});


// < 5. keydown과 keyup >

// keydown : 키를 누르는 순간 발생합니다.
// keyup : 누르고 있던 키를 놓을 때 발생합니다.
// 키를 계속 누르고 있으면 keydown이 반복 발생할 수도 있습니다.
// event.key는 어떤 키가 눌렸는지 확인할 때 사용합니다.

const keyboardArea = document.querySelector("#keyboardArea");
const keyDownResult = document.querySelector("#keyDownResult");
const keyUpResult = document.querySelector("#keyUpResult");

keyboardArea.addEventListener("keydown", function(event) {
    keyDownResult.textContent = `keydown: ${event.key} 키를 눌렀습니다.`;
});

keyboardArea.addEventListener("keyup", function(event) {
    keyUpResult.textContent = `keyup: ${event.key} 키를 놓았습니다.`;
});


// < 6. Enter와 Escape로 작업 제어하기 >

// Enter : 현재 작업 내용을 확정합니다.
// Escape : 입력 내용을 취소합니다.
// 키보드 이벤트와 버튼 클릭 이벤트가 같은 기능을 실행하도록 구성합니다.

const taskInput = document.querySelector("#taskInput");
const confirmTaskButton = document.querySelector("#confirmTaskButton");
const cancelTaskButton = document.querySelector("#cancelTaskButton");
const taskResult = document.querySelector("#taskResult");

function confirmTask() {
    const task = taskInput.value.trim();

    if (task === "") {
        taskResult.textContent = "확정할 작업 내용을 입력해 주세요.";
        return;
    }

    taskResult.textContent = `작업이 확정되었습니다: ${task}`;
}

function cancelTask() {
    taskInput.value = "";
    taskResult.textContent = "입력이 취소되었습니다.";
    taskInput.focus();
}

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        confirmTask();
    }

    if (event.key === "Escape") {
        cancelTask();
    }
});

confirmTaskButton.addEventListener("click", confirmTask);
cancelTaskButton.addEventListener("click", cancelTask);


// < 7. 방향키로 메뉴 선택하기 >

// keydown : 방향키를 누를 때 메뉴 선택 위치를 변경합니다.
// 배열의 인덱스를 사용해 현재 선택된 메뉴를 관리합니다.
// 메뉴를 선택하는 동작은 화면에서 강조 표시로 확인합니다.

const menuArea = document.querySelector("#menuArea");
const menuItems = document.querySelectorAll(".menu-item");
const menuResult = document.querySelector("#menuResult");

let selectedMenuIndex = 0;

function updateSelectedMenu() {
    menuItems.forEach(function(item, index) {
        item.classList.toggle("bg-primary", index === selectedMenuIndex);
        item.classList.toggle("text-white", index === selectedMenuIndex);
        item.classList.toggle("fw-bold", index === selectedMenuIndex);
    });

    menuResult.textContent = `선택 메뉴: ${menuItems[selectedMenuIndex].textContent}`;
}

menuArea.addEventListener("keydown", function(event) {
    if (event.key === "ArrowDown") {
        selectedMenuIndex++;

        if (selectedMenuIndex >= menuItems.length) {
            selectedMenuIndex = 0;
        }

        updateSelectedMenu();
    }

    if (event.key === "ArrowUp") {
        selectedMenuIndex--;

        if (selectedMenuIndex < 0) {
            selectedMenuIndex = menuItems.length - 1;
        }

        updateSelectedMenu();
    }
    // 브라우저의 기본 기능을 막는다.
    event.preventDefault();
});

updateSelectedMenu();
