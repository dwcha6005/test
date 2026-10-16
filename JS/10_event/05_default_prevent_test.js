/*
< 실습 과제 >

1. 상품 상세 링크
- 모든 .product-link 요소에 click 이벤트를 등록한다.
- 링크를 클릭해도 기본 동작인 페이지 내 이동이 발생하지 않도록 한다.
- 클릭한 링크가 속한 행에서 상품 번호와 상품명을 가져온다.
- productResult에 선택한 상품 번호와 상품명을 출력한다.

2. 상품 행과 삭제 버튼
- #productTable의 각 행을 클릭하면 해당 상품 번호를 rowResult에 출력한다.
- 선택된 행에 table-active 클래스를 적용하고 이전 선택 행에서는 제거한다.
- 삭제 버튼을 클릭하면 해당 상품 번호를 출력한다.
- 삭제 버튼 클릭으로 행 선택 이벤트까지 발생하지 않도록 한다.
- 실제 행을 삭제하지는 않는다.

3. 기본 동작 취소와 이벤트 전파 비교
- #cancelDefaultLink를 클릭하면 링크 이동을 취소한다.
- 이때 부모 영역의 click 이벤트는 계속 실행되어야 한다.
- #stopPropagationLink를 클릭하면 부모 영역의 click 이벤트가 실행되지 않도록 한다.
- 단, 링크 이동은 취소하지 않는다.
- compareResult에 각 동작의 결과를 출력한다.

4. 취소할 수 없는 이벤트 확인
- #scrollArea에 scroll 이벤트를 등록한다.
- event.type, event.cancelable, event.defaultPrevented를 출력한다.
- preventDefault()를 호출한 뒤 defaultPrevented 값도 확인한다.
- 실제 스크롤이 계속되는 이유를 주석으로 설명한다.
*/

// < 정답 1. 상품 상세 링크 >
const productLinks = document.querySelectorAll(".product-link");
const productResult = document.querySelector("#productResult");

productLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        const row = link.closest("tr");
        const productNumber = row.cells[0].textContent;
        const productName = row.cells[1].textContent;

        productResult.textContent =
            "선택한 상품: " + productNumber + " / " + productName;
    });
});

// < 정답 2. 상품 행과 삭제 버튼 >
const productTable = document.querySelector("#productTable");
const rowResult = document.querySelector("#rowResult");

let selectedRow = null;

productTable.querySelectorAll("tr").forEach(function(row) {
    row.addEventListener("click", function(event) {
        // 삭제 버튼을 클릭한 경우 행 선택은 하지 않는다.
        if (event.target.closest(".delete-button")) {
            return;
        }

        if (selectedRow !== null) {
            selectedRow.classList.remove("table-active");
        }

        selectedRow = row;
        selectedRow.classList.add("table-active");

        const productNumber = row.cells[0].textContent;
        rowResult.textContent = "선택한 상품 번호: " + productNumber;
    });
});

productTable.querySelectorAll(".delete-button").forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.stopPropagation();

        const row = button.closest("tr");
        const productNumber = row.cells[0].textContent;

        rowResult.textContent =
            "삭제 버튼 클릭: 상품 번호 " + productNumber +
            " / 행 선택 이벤트는 실행되지 않았습니다.";
    });
});

// < 정답 3. 기본 동작 취소와 이벤트 전파 비교 >
const compareArea = document.querySelector("#compareArea");
const cancelDefaultLink = document.querySelector("#cancelDefaultLink");
const stopPropagationLink = document.querySelector("#stopPropagationLink");
const compareResult = document.querySelector("#compareResult");

let compareLog = [];

compareArea.addEventListener("click", function(event) {
    compareLog.push("부모 영역의 click 이벤트 실행");
    compareResult.textContent = compareLog.join("\n");
});

cancelDefaultLink.addEventListener("click", function(event) {
    compareLog = [];

    event.preventDefault();

    compareLog.push("자식 링크에서 preventDefault() 실행");
    compareLog.push("defaultPrevented: " + event.defaultPrevented);
    compareLog.push("링크 이동은 취소했지만 이벤트 전파는 계속됩니다.");

    compareResult.textContent = compareLog.join("\n");
});

stopPropagationLink.addEventListener("click", function(event) {
    compareLog = [];

    event.stopPropagation();

    compareLog.push("자식 링크에서 stopPropagation() 실행");
    compareLog.push("이벤트 전파를 중단했습니다.");
    compareLog.push("링크의 기본 동작은 취소하지 않았습니다.");

    compareResult.textContent = compareLog.join("\n");
});

// < 정답 4. 취소할 수 없는 이벤트 확인 >
const scrollArea = document.querySelector("#scrollArea");
const scrollResult = document.querySelector("#scrollResult");

scrollArea.addEventListener("scroll", function(event) {
    const before = event.defaultPrevented;

    event.preventDefault();

    scrollResult.textContent =
        "event.type: " + event.type + "\n" +
        "event.cancelable: " + event.cancelable + "\n" +
        "호출 전 defaultPrevented: " + before + "\n" +
        "호출 후 defaultPrevented: " + event.defaultPrevented + "\n" +
        "scrollTop: " + scrollArea.scrollTop + "\n\n" +
        "scroll 이벤트는 취소할 수 없으므로 preventDefault()로 스크롤을 막을 수 없습니다.";
});