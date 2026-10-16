// < 1. onclick 방식과 비교 >

// HTML의 onclick 속성에서 호출하는 함수
function showLegacyMessage() {
    document.getElementById("legacyResult").textContent =
        "기존 onclick 방식으로 이벤트를 처리했습니다.";
}


// < 2. addEventListener() 기본 사용법 >

// addEventListener()는 지정한 이벤트가 발생했을 때
// 실행할 함수를 요소에 등록하는 메서드이다.

// 기본 문법
// 요소.addEventListener("이벤트 종류", 실행할 함수);

const orderButton = document.getElementById("orderButton");

orderButton.addEventListener("click", processOrder);

function processOrder() {
    document.getElementById("orderResult").textContent =
        "주문이 정상적으로 접수되었습니다.";
}


// < 3. 하나의 요소에 여러 이벤트 등록 >

const notificationButton = document.getElementById("notificationButton");

// 첫 번째 이벤트 핸들러
function saveNotificationSetting() {
    document.getElementById("notificationResult").textContent =
        "알림 설정이 저장되었습니다.";
}

// 두 번째 이벤트 핸들러
function writeNotificationLog() {
    document.getElementById("notificationLog").textContent =
        "알림 설정 저장 작업이 실행되었습니다.";
}

// 하나의 버튼에 서로 다른 이벤트 핸들러를 등록한다.
notificationButton.addEventListener("click", saveNotificationSetting);
notificationButton.addEventListener("click", writeNotificationLog);

// < 4. 이벤트 리스너 등록과 제거 >

const registerButton = document.getElementById("registerButton");
const unregisterButton = document.getElementById("unregisterButton");
const testButton = document.getElementById("testButton");

// 이벤트 리스너의 등록 여부
let isListenerRegistered = true;

// 점검 알림을 출력하는 이벤트 핸들러
function showMaintenanceNotice() {
    document.getElementById("maintenanceResult").textContent =
        "현재 시스템 점검 안내: 서비스 이용이 일시적으로 제한될 수 있습니다.";
}

// 페이지가 준비되면 점검 알림 리스너를 등록한다.
testButton.addEventListener("click", showMaintenanceNotice);

// 이벤트 리스너 등록 버튼
registerButton.addEventListener("click", function () {
    if (isListenerRegistered) {
        document.getElementById("listenerStatus").textContent =
            "점검 알림이 이미 등록되어 있습니다.";
        return;
    }

    testButton.addEventListener("click", showMaintenanceNotice);
    isListenerRegistered = true;

    document.getElementById("listenerStatus").textContent =
        "점검 알림을 등록했습니다.";
});

// 이벤트 리스너 제거 버튼
unregisterButton.addEventListener("click", function () {
    if (!isListenerRegistered) {
        document.getElementById("listenerStatus").textContent =
            "점검 알림이 이미 제거되어 있습니다.";
        return;
    }

    testButton.removeEventListener("click", showMaintenanceNotice);
    isListenerRegistered = false;

    document.getElementById("listenerStatus").textContent =
        "점검 알림을 제거했습니다.";
});