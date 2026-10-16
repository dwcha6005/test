
/*
< 07. 이벤트 위임 실습 >

주제 : 고객 문의 관리

< 실습 과제 >

1. 문의 목록의 부모 요소인 #inquiryList에 click 이벤트를 등록하세요.
   - 각 문의 행에 개별적으로 이벤트를 등록하지 않습니다.
   - 클릭한 요소와 이벤트가 등록된 요소를 eventInfo에 출력하세요.
   - event.target과 event.currentTarget의 차이를 확인하세요.

2. 문의 행을 클릭하면 선택한 문의 정보를 표시하세요.
   - 문의 번호, 고객명, 문의 제목, 답변 상태를 표시합니다.
   - 선택한 행에 table-primary 클래스를 적용합니다.
   - 다른 행을 선택하면 이전 행의 선택 표시를 제거합니다.

3. 답변 완료 버튼을 클릭하면 해당 문의의 상태를 변경하세요.
   - 답변 대기 → 답변 완료
   - 답변 완료 → 답변 대기
   - 상태 셀과 data-status 속성을 함께 변경하세요.
   - 버튼 내부의 span을 클릭해도 정상적으로 처리되어야 합니다.

4. 삭제 버튼을 클릭하면 해당 문의 행을 삭제하세요.
   - 삭제 버튼을 클릭했을 때 문의 행 선택 기능이 실행되면 안 됩니다.
   - 삭제한 행이 현재 선택된 행이라면 선택 정보도 초기화하세요.

5. 새 문의 추가 버튼을 클릭하면 새로운 문의를 목록에 추가하세요.
   - 문의 번호는 기존 번호와 겹치지 않도록 증가시킵니다.
   - 새 문의의 기본 상태는 '답변 대기'입니다.
   - 새로 추가한 문의도 별도의 이벤트 등록 없이 선택, 답변 상태 변경, 삭제가 가능해야 합니다.

< 작성 시 주의사항 >
- 문의 행마다 addEventListener()를 등록하지 마세요.
- event.target.closest()를 활용하세요.
- 선택한 요소가 실제 문의 목록 안에 있는지도 확인하세요.
*/

// < 정답 코드 >

// < 1. 요소 선택 >
const inquiryList = document.querySelector("#inquiryList");
const addInquiryButton = document.querySelector("#addInquiry");
const selectedInquiry = document.querySelector("#selectedInquiry");
const eventInfo = document.querySelector("#eventInfo");

let nextInquiryId = 204;
let selectedRow = null;

// < 2. 문의 선택 정보 표시 >
function showInquiry(row) {
    if (selectedRow !== null) {
        selectedRow.classList.remove("table-primary");
    }

    selectedRow = row;
    selectedRow.classList.add("table-primary");

    selectedInquiry.textContent =
        `문의 번호: ${row.dataset.id} / ` +
        `고객명: ${row.dataset.name} / ` +
        `제목: ${row.dataset.title} / ` +
        `상태: ${row.dataset.status}`;
}

// < 3. 문의 목록에 이벤트 위임 등록 >
inquiryList.addEventListener("click", function (event) {
    eventInfo.textContent =
        `event.type: ${event.type}\n` +
        `event.target: ${event.target.tagName}\n` +
        `event.currentTarget: ${event.currentTarget.id}`;

    // < 3-1. 버튼 클릭인지 확인 >
    const button = event.target.closest("button[data-action]");

    if (button && inquiryList.contains(button)) {
        const row = button.closest("tr[data-id]");

        if (!row || !inquiryList.contains(row)) {
            return;
        }

        const action = button.dataset.action;

        // < 3-2. 답변 상태 변경 >
        if (action === "reply") {
            const statusCell = row.querySelector(".status");

            if (row.dataset.status === "답변 대기") {
                row.dataset.status = "답변 완료";
            } else {
                row.dataset.status = "답변 대기";
            }

            statusCell.textContent = row.dataset.status;

            if (selectedRow === row) {
                showInquiry(row);
            }

            return;
        }

        // < 3-3. 문의 삭제 >
        if (action === "delete") {
            if (selectedRow === row) {
                selectedRow = null;
                selectedInquiry.textContent = "선택한 문의가 없습니다.";
            }

            row.remove();
            return;
        }
    }

    // < 3-4. 문의 행 선택 >
    const row = event.target.closest("tr[data-id]");

    if (row && inquiryList.contains(row)) {
        showInquiry(row);
    }
});

// < 4. 새 문의 추가 >
addInquiryButton.addEventListener("click", function () {
    const id = nextInquiryId++;
    const name = "신규 고객";
    const title = `신규 문의 ${id}`;
    const status = "답변 대기";

    const row = document.createElement("tr");

    row.dataset.id = id;
    row.dataset.name = name;
    row.dataset.title = title;
    row.dataset.status = status;

    row.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td class="inquiry-title">${title}</td>
        <td class="status">${status}</td>
        <td>
            <button type="button" class="btn btn-sm btn-success" data-action="reply">
                <span>답변 완료</span>
            </button>
            <button type="button" class="btn btn-sm btn-danger" data-action="delete">
                <span>삭제</span>
            </button>
        </td>
    `;

    inquiryList.appendChild(row);
});
