
/*
< 학생용 실습 문제 >

주제: 상품 관리 테이블의 이벤트 처리

< 1. 상품 행 선택 - click >
1. 상품 행을 클릭하면 해당 행에 "table-active" 클래스를 적용하세요.
2. 다른 행을 클릭하면 이전 행의 선택 표시를 제거하세요.
3. message에 선택한 상품의 코드와 상품명을 표시하세요.

< 2. 행 강조 - mouseenter / mouseleave >
1. 마우스가 상품 행에 들어오면 "table-warning" 클래스를 적용하세요.
2. 마우스가 행을 벗어나면 강조 클래스를 제거하세요.
3. 이미 선택된 행의 "table-active" 클래스는 유지하세요.

< 3. 상품명 수정 - dblclick >
1. 상품명의 셀을 더블 클릭하면 해당 셀을 수정 모드로 변경하세요.
2. 셀의 기존 내용을 input 요소로 바꾸고 기존 상품명을 입력하세요.
3. input에 포커스를 이동하세요.
4. 다른 셀이나 행은 수정되지 않도록 하세요.

< 4. 수정 완료 - keydown >
1. 수정 중 Enter를 누르면 입력한 상품명을 저장하세요.
2. 빈 문자열은 저장하지 말고 기존 상품명을 유지하세요.
3. 저장하면 input을 제거하고 셀에 상품명을 표시하세요.
4. 저장 결과를 message에 표시하세요.

< 5. 수정 취소 - keydown >
1. 수정 중 Escape를 누르면 변경 내용을 취소하세요.
2. 기존 상품명을 그대로 복원하세요.

< 6. 상품 등록 버튼 - click >
1. 상품 등록 버튼을 클릭하면 message에
   "상품 등록 기능은 아직 구현되지 않았습니다."를 표시하세요.
2. 실제 등록 기능은 구현하지 않습니다.
*/


// < 강사용 정답 >

const productTable = document.querySelector("#productTable");
const message = document.querySelector("#message");
const addButton = document.querySelector("#addButton");

let selectedRow = null;

// < 1. 상품 행 선택 >
productTable.querySelectorAll("tr").forEach(function(row) {
    row.addEventListener("click", function() {
        if (selectedRow !== null) {
            selectedRow.classList.remove("table-active");
        }

        selectedRow = row;
        selectedRow.classList.add("table-active");

        const productCode = row.cells[0].textContent;
        const productName = row.querySelector(".product-name").textContent;

        message.textContent =
            "선택 상품: " + productCode + " / " + productName;
    });

    // < 2. 행 강조 >
    row.addEventListener("mouseenter", function() {
        row.classList.add("table-warning");
    });

    row.addEventListener("mouseleave", function() {
        row.classList.remove("table-warning");
    });
});



// < 3. 상품명 더블 클릭 수정 >
productTable.querySelectorAll(".product-name").forEach(function(cell) {
    cell.addEventListener("dblclick", function() {
        // 이미 수정 중인 셀은 다시 수정 모드로 바꾸지 않습니다.
        if (cell.querySelector("input") !== null) {
            return;
        }

        const originalName = cell.textContent;
        const input = document.createElement("input");

        input.type = "text";
        input.className = "form-control form-control-sm";
        input.value = originalName;

        cell.textContent = "";
        cell.append(input);
        input.focus();
        input.select();

        // < 4. Enter로 저장 >
        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                const newName = input.value.trim();

                if (newName === "") {
                    message.textContent = "상품명을 입력하세요.";
                    input.focus();
                    return;
                }

                cell.textContent = newName;
                message.textContent = "상품명이 수정되었습니다.";
            }

            // < 5. Escape로 취소 >
            if (event.key === "Escape") {
                cell.textContent = originalName;
                message.textContent = "상품명 수정을 취소했습니다.";
            }
        });

        // 추가
        input.addEventListener("focusout", function(event){
            cell.textContent = originalName;
            message.textContent = "상품명 수정을 취소했습니다.";
        })

    });
});

// < 6. 상품 등록 버튼 >
addButton.addEventListener("click", function() {
    message.textContent = "상품 등록 기능은 아직 구현되지 않았습니다.";

    // 추가 (새로 추가된 행에는 새롭게 이벤트 등록)
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>P-105</td>
        <td>테스트</td>
        <td>테스트</td>
        <td>25000</td>
        <td>
            <span class="badge text-bg-danger">판매 중지</span>
        </td>
    `;

    const productTable = document.getElementById("productTable");
    productTable.append(row);

    // tr마다 이벤트를 새롭게 등록해줘야함!
});
