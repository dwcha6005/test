
/*
< 학생용 실습 문제 >

주제: 고객 문의 관리 화면의 이벤트 정보 처리

< 1. 문의 선택 >
① 문의 테이블의 행을 클릭하면 선택된 문의 번호와 고객명을 표시하세요.
② 선택된 행에는 "table-active" 클래스를 적용하세요.
③ 다른 행을 선택하면 이전 행의 선택 표시를 제거하세요.

< 2. event.target과 event.currentTarget >
① eventArea에 click 이벤트 리스너를 등록하세요.
② 내부 버튼과 바깥 영역을 각각 클릭해 보세요.
③ eventInfo에 다음 정보를 표시하세요.
   - event.type
   - event.target의 태그명과 id
   - event.currentTarget의 태그명과 id
④ 두 속성의 값이 달라지는 상황을 확인하세요.

< 3. 문의 제목 클릭 >
① 문의 제목 버튼을 클릭하면 해당 문의의 제목과 번호를 표시하세요.
② 클릭한 버튼이 어떤 요소인지 event.target을 이용해 확인하세요.
③ 이벤트가 발생한 요소와 문의 행의 정보를 연결해 보세요.

< 4. 답변 작성 키보드 정보 >
① 답변 입력창에서 키를 누르면 event.key와 event.code를 표시하세요.
② Ctrl, Shift, Alt 키의 눌림 상태도 표시하세요.
③ Enter 키를 눌렀을 때 일반 문자 키와 다른 정보가 나오는지 확인하세요.

< 5. 마우스 좌표 >
① coordinateArea를 클릭하면 clientX, clientY를 표시하세요.
② pageX, pageY도 함께 표시하세요.
③ 페이지를 아래로 스크롤한 뒤 두 좌표의 차이를 확인하세요.

< 6. 마우스 버튼 확인 >
① coordinateArea에서 mousedown 이벤트를 처리하도록 확장하세요.
② event.button을 이용해 왼쪽, 가운데, 오른쪽 버튼을 구분하세요.
*/


// < 강사용 정답 >

const inquiryTable = document.querySelector("#inquiryTable");
const selectionMessage = document.querySelector("#selectionMessage");

const eventArea = document.querySelector("#eventArea");
const eventInfo = document.querySelector("#eventInfo");

const replyInput = document.querySelector("#replyInput");
const replyInfo = document.querySelector("#replyInfo");

const coordinateArea = document.querySelector("#coordinateArea");
const coordinateInfo = document.querySelector("#coordinateInfo");

// < 1. 문의 선택 >
let selectedRow = null;

inquiryTable.querySelectorAll("tr").forEach(function(row) {
    row.addEventListener("click", function(event) {
        if (selectedRow !== null) {
            selectedRow.classList.remove("table-active");
        }

        selectedRow = row;
        selectedRow.classList.add("table-active");

        const inquiryNumber = row.cells[0].textContent;
        const customerName = row.cells[2].textContent;

        selectionMessage.textContent =
            "선택된 문의 번호: " + inquiryNumber +
            " / 고객명: " + customerName;
    });
});

// < 2. event.target과 event.currentTarget >
eventArea.addEventListener("click", function(event) {
    const targetName = event.target.tagName;
    const targetId = event.target.id || "(id 없음)";

    const currentTargetName = event.currentTarget.tagName;
    const currentTargetId = event.currentTarget.id || "(id 없음)";

    eventInfo.textContent =
        "event.type: " + event.type + "\n" +
        "event.target: " + targetName + " / " + targetId + "\n" +
        "event.currentTarget: " + currentTargetName + " / " + currentTargetId;
});

// < 3. 문의 제목 클릭 >
inquiryTable.querySelectorAll(".inquiry-title").forEach(function(button) {
    button.addEventListener("click", function(event) {
        const row = event.target.closest("tr");

        const inquiryNumber = row.cells[0].textContent;
        const inquiryTitle = event.target.textContent;

        selectionMessage.textContent =
            "문의 제목: " + inquiryTitle +
            " / 문의 번호: " + inquiryNumber;
    });
});

// < 4. 답변 작성 키보드 정보 >
replyInput.addEventListener("keydown", function(event) {
    replyInfo.textContent =
        "event.type: " + event.type +
        " / key: " + event.key +
        " / code: " + event.code +
        " / Ctrl: " + event.ctrlKey +
        " / Shift: " + event.shiftKey +
        " / Alt: " + event.altKey;
});

// < 5. 마우스 좌표 >
coordinateArea.addEventListener("click", function(event) {
    coordinateInfo.textContent =
        "clientX: " + event.clientX +
        " / clientY: " + event.clientY +
        " / pageX: " + event.pageX +
        " / pageY: " + event.pageY;
});

// < 6. 마우스 버튼 확인 >
coordinateArea.addEventListener("mousedown", function(event) {
    let buttonName;

    if (event.button === 0) {
        buttonName = "왼쪽 버튼";
    } else if (event.button === 1) {
        buttonName = "가운데 버튼";
    } else if (event.button === 2) {
        buttonName = "오른쪽 버튼";
    } else {
        buttonName = "기타 버튼";
    }

    coordinateInfo.textContent =
        "누른 버튼: " + buttonName +
        " / event.button: " + event.button +
        " / clientX: " + event.clientX +
        " / clientY: " + event.clientY;
});
