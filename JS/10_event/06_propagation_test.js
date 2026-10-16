
/*
< 실습 주제 >
상품 관리 화면에서 이벤트 전파 제어하기

< 요구사항 >

1. 상품 행 클릭
   - 상품 행을 클릭하면 해당 상품의 상세 모달을 보여준다.
   - 상품 번호, 상품명, 가격을 모달에 출력한다.

2. 상품 삭제
   - 삭제 버튼을 클릭하면 해당 상품 행을 삭제한다.
   - 삭제 버튼을 클릭했을 때 상품 상세 모달이 열리면 안 된다.
   - 삭제 후 안내 메시지를 출력한다.

3. 이벤트 전파 확인
   - 상품 테이블에 캡처링 리스너와 버블링 리스너를 등록한다.
   - 콘솔에서 두 리스너의 실행 순서를 확인한다.
   - 삭제 버튼을 클릭했을 때 두 리스너의 실행 결과가 어떻게 달라지는지 확인한다.

4. 모달 닫기
   - 모달 바깥의 어두운 영역을 클릭하면 모달을 닫는다.
   - 모달 내부를 클릭해도 모달이 닫히면 안 된다.
   - 닫기 버튼을 클릭하면 모달을 닫는다.

< 사용 개념 >
addEventListener()
event.target
event.currentTarget
stopPropagation()
캡처링과 버블링
*/

// < 정답 코드 >
const productTable = document.querySelector("#productTable");
const productTbody = productTable.querySelector("tbody");
const message = document.querySelector("#message");

const detailModal = document.querySelector("#detailModal");
const modalBox = document.querySelector("#modalBox");
const closeModal = document.querySelector("#closeModal");

const detailId = document.querySelector("#detailId");
const detailName = document.querySelector("#detailName");
const detailPrice = document.querySelector("#detailPrice");

// < 1. 이벤트 전파 순서 확인 >

// 캡처링 단계에서 실행
productTbody.addEventListener("click", function (event) {
    console.log("테이블 캡처링");
    console.log("target:", event.target);
    console.log("currentTarget:", event.currentTarget);
}, true);

// 버블링 단계에서 실행
productTbody.addEventListener("click", function (event) {
    console.log("테이블 버블링");
    console.log("target:", event.target);
    console.log("currentTarget:", event.currentTarget);
});

// < 2. 상품 행 클릭 시 상세 모달 열기 >

const productRows = productTbody.querySelectorAll("tr");

productRows.forEach(function (row) {
    row.addEventListener("click", function () {
        detailId.textContent = row.dataset.id;
        detailName.textContent = row.dataset.name;
        detailPrice.textContent = Number(row.dataset.price).toLocaleString("ko-KR");

        detailModal.classList.remove("d-none");
        message.textContent = row.dataset.name + " 상품 상세 정보를 열었습니다.";
    });
});

// < 3. 삭제 버튼 클릭 시 상품 삭제 >

const deleteButtons = productTbody.querySelectorAll(".delete-button");

deleteButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        // 삭제 버튼의 클릭 이벤트가 부모 행으로 전파되지 않게 한다.
        // event.stopPropagation();

        const row = button.closest("tr");
        const productName = row.dataset.name;

        row.remove();
        message.textContent = productName + " 상품을 삭제했습니다.";
    });
});

// < 4. 모달 바깥 영역 클릭 시 닫기 >

detailModal.addEventListener("click", function () {
    detailModal.classList.add("d-none");
    message.textContent = "상품 상세 모달을 닫았습니다.";
});

// < 5. 모달 내부 클릭 시 바깥 영역으로 전파되지 않게 하기 >

modalBox.addEventListener("click", function (event) {
    event.stopPropagation();
});

// < 6. 닫기 버튼 클릭 시 모달 닫기 >

closeModal.addEventListener("click", function () {
    detailModal.classList.add("d-none");
    message.textContent = "상품 상세 모달을 닫았습니다.";
});
