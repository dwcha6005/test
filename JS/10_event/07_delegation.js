
/*
< 수업 주제 >
07. 이벤트 위임(Event Delegation)

< 학습 목표 >
1. 이벤트 위임이 필요한 이유를 이해한다.
2. 부모 요소에 이벤트 리스너를 등록하고 자식 이벤트를 처리한다.
3. event.target과 event.currentTarget의 차이를 이해한다.
4. closest()로 원하는 요소를 찾는다.
5. 동적으로 추가된 요소의 이벤트도 처리한다.
*/

// < 1. HTML 요소 선택 >

const productList = document.querySelector("#productList");
const addProductButton = document.querySelector("#addProduct");
const detailArea = document.querySelector("#detailArea");
const eventInfo = document.querySelector("#eventInfo");

let nextProductId = 104;

// < 2. 상품 상세 정보 출력 함수 >

function showProductDetail(row) {
    debugger;
    const id = row.dataset.id;
    const name = row.dataset.name;
    const price = Number(row.dataset.price);

    detailArea.innerHTML = `
        <p>상품 번호: ${id}</p>
        <p>상품명: ${name}</p>
        <p>가격: ${price.toLocaleString("ko-KR")}원</p>
    `;
}

// < 3. 이벤트 위임 >

// 상품 각각에 리스너를 등록하지 않고,
// 모든 상품 행을 포함하는 부모 요소에 리스너 하나를 등록한다.

productList.addEventListener("click", function (event) {
    // 실제 클릭한 요소와 리스너가 실행 중인 요소 확인
    console.log("target:", event.target);
    console.log("currentTarget:", event.currentTarget);

    eventInfo.textContent =
        "target: " + event.target.tagName + "\n" +
        "currentTarget: " + event.currentTarget.tagName;

    // < 3-1. 클릭한 요소가 상세 보기 또는 삭제 버튼인지 확인 >

    // 버튼 안의 span을 클릭해도 해당 버튼을 찾을 수 있다.
    const button = event.target.closest("button[data-action]");

    // closest()는 조상 방향으로 탐색하므로,
    // 찾은 버튼이 실제 상품 목록 안에 있는지 확인한다.
    if (button && productList.contains(button)) {
        const row = button.closest("tr");

        if (button.dataset.action === "detail") {
            showProductDetail(row);
            return;
        }

        if (button.dataset.action === "delete") {
            const productName = row.dataset.name;

            row.remove();
            detailArea.innerHTML = `<p>${productName} 상품을 삭제했습니다.</p>`;
            return;
        }
    }

    // < 3-2. 버튼이 아닌 상품 행을 클릭한 경우 >

    const row = event.target.closest("tr[data-id]");

    if (row && productList.contains(row)) {
        showProductDetail(row);
    }
});

// < 4. 동적으로 상품 추가 >

addProductButton.addEventListener("click", function () {
    const id = nextProductId++;
    const name = "신규 상품 " + id;
    const price = 10000 + (id - 104) * 5000;

    const row = document.createElement("tr");

    row.dataset.id = id;
    row.dataset.name = name;
    row.dataset.price = price;

    row.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${price.toLocaleString("ko-KR")}원</td>
        <td>
            <button class="btn btn-sm btn-success" data-action="detail">
                <span>상세 보기</span>
            </button>
            <button class="btn btn-sm btn-danger" data-action="delete">
                <span>삭제</span>
            </button>
        </td>
    `;

    productList.append(row);
});

// 새 상품을 추가한 뒤에도 상세 보기와 삭제가 동작한다.
// 상품 행마다 이벤트 리스너를 새로 등록하지 않았기 때문이다.
