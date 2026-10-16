// < 1. 링크의 기본 동작 제어 >
const normalLink = document.querySelector("#normalLink");
const preventLink = document.querySelector("#preventLink");
const linkResult = document.querySelector("#linkResult");

normalLink.addEventListener("click", function(event) {
    console.log("기본 링크 클릭");
    console.log("event.defaultPrevented:", event.defaultPrevented);
    linkResult.textContent = "기본 동작을 취소하지 않았습니다. 잠시 후 링크로 이동합니다.";
});

preventLink.addEventListener("click", function(event) {
    console.log("이동을 막는 링크 클릭");
    console.log("취소 전:", event.defaultPrevented);

    event.preventDefault();

    console.log("취소 후:", event.defaultPrevented);
    console.log("취소 가능 여부:", event.cancelable);

    linkResult.textContent = "링크 이동을 취소했습니다. 현재 페이지에 머무릅니다.";
});

// < 2. 마우스 오른쪽 버튼의 기본 동작 제어 >
const contextArea = document.querySelector("#contextArea");
const contextResult = document.querySelector("#contextResult");

contextArea.addEventListener("contextmenu", function(event) {
    console.log("이벤트 종류:", event.type);
    console.log("기본 동작 취소 가능:", event.cancelable);

    event.preventDefault();

    contextResult.textContent = "브라우저의 기본 컨텍스트 메뉴를 표시하지 않도록 했습니다.";
    console.log("기본 동작 취소 여부:", event.defaultPrevented);
});

// < 3. 키보드 이벤트의 기본 동작 제어 >
const keyboardMenu = document.querySelector("#keyboardMenu");
const keyboardResult = document.querySelector("#keyboardResult");
const menuItems = keyboardMenu.querySelectorAll(".list-group-item");

let selectedIndex = 0;

keyboardMenu.addEventListener("keydown", function(event) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
        return;
    }

    // 방향키의 브라우저 기본 동작인 페이지 스크롤 방지
    event.preventDefault();

    if (event.key === "ArrowDown") {
        selectedIndex++;
        if (selectedIndex >= menuItems.length) {
            selectedIndex = 0;
        }
    } else if (event.key === "ArrowUp") {
        selectedIndex--;
        if (selectedIndex < 0) {
            selectedIndex = menuItems.length - 1;
        }
    }

    menuItems.forEach(function(item, index) {
        item.classList.toggle("active", index === selectedIndex);
    });

    keyboardResult.textContent =
        "선택 메뉴: " + menuItems[selectedIndex].textContent +
        " / 입력 키: " + event.key;

    console.log("event.key:", event.key);
    console.log("event.defaultPrevented:", event.defaultPrevented);
});

// 메뉴 항목을 마우스로 클릭해도 선택 상태가 바뀌도록 처리
menuItems.forEach(function(item, index) {
    item.addEventListener("click", function() {
        selectedIndex = index;

        menuItems.forEach(function(menuItem, itemIndex) {
            menuItem.classList.toggle("active", itemIndex === selectedIndex);
        });

        keyboardResult.textContent = "선택 메뉴: " + item.textContent;
    });
});

// < 4. preventDefault와 stopPropagation 비교 >
const parentArea = document.querySelector("#parentArea");
const preventOnlyButton = document.querySelector("#preventOnlyButton");
const stopButton = document.querySelector("#stopButton");
const propagationResult = document.querySelector("#propagationResult");

let propagationLog = [];

parentArea.addEventListener("click", function(event) {
    propagationLog.push("② 부모 요소의 click 이벤트 실행");
    propagationResult.textContent = propagationLog.join("\n");
    console.log("② 부모 요소의 click 이벤트 실행");
});

preventOnlyButton.addEventListener("click", function(event) {
    propagationLog = [];

    propagationLog.push("① 자식 링크의 click 이벤트 실행");
    propagationLog.push("기본 동작 취소 전: " + event.defaultPrevented);

    event.preventDefault();

    propagationLog.push("preventDefault() 실행");
    propagationLog.push("기본 동작 취소 후: " + event.defaultPrevented);
    propagationLog.push("부모 요소로 이벤트가 전파됩니다.");

    propagationResult.textContent = propagationLog.join("\n");

    console.log(propagationLog.join("\n"));
});

stopButton.addEventListener("click", function(event) {
    propagationLog = [];

    propagationLog.push("① 자식 링크의 click 이벤트 실행");
    propagationLog.push("stopPropagation() 실행");

    event.stopPropagation();

    propagationLog.push("부모 요소의 click 이벤트는 실행되지 않습니다.");
    propagationLog.push("단, 링크의 기본 동작은 취소하지 않았습니다.");

    propagationResult.textContent = propagationLog.join("\n");

    console.log(propagationLog.join("\n"));
});

// < 5. cancelable이 false인 이벤트 >
const scrollArea = document.querySelector("#scrollArea");
const scrollResult = document.querySelector("#scrollResult");

scrollArea.addEventListener("scroll", function(event) {
    console.log("이벤트 종류:", event.type);
    console.log("기본 동작 취소 가능 여부:", event.cancelable);
    console.log("취소 전:", event.defaultPrevented);

    event.preventDefault();

    console.log("취소 후:", event.defaultPrevented);

    scrollResult.textContent =
        "event.type: " + event.type + "\n" +
        "event.cancelable: " + event.cancelable + "\n" +
        "event.defaultPrevented: " + event.defaultPrevented + "\n" +
        "scrollTop: " + scrollArea.scrollTop + "\n\n" +
        "scroll 이벤트의 기본 동작은 취소할 수 없으므로 " +
        "preventDefault()를 호출해도 스크롤이 계속됩니다.";
});