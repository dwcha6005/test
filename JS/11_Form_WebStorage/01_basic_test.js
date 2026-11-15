/*
< 학생용 실습 문제 >

주제: 호텔 예약 폼의 값 읽기, 채우기, 모으기
출력: console.log() 또는 화면으로 확인

객실 가격 (1박)
const roomPrices = { standard: 80000, deluxe: 120000, suite: 200000 };

=====================================================================
[기초]
=====================================================================

< 문제 1. text 값 읽기 >
① nameBtn을 클릭하면 guestName의 값을 읽어 nameResult에 "예약자: 홍길동"을 표시하시오.
② 앞뒤 공백을 제거하고, 비어 있으면 "이름을 입력하세요."를 표시하시오.


< 문제 2. select 값과 화면 글자 >
① roomType이 바뀌면(change) 선택된 option의 value와 화면에 보이는 글자를 모두 읽으시오.
② roomResult에 "디럭스 (120,000원) / value: deluxe" 형식으로 표시하시오.
힌트) select.options[select.selectedIndex].text


< 문제 3. radio 값 읽기 >
① radioBtn을 클릭하면 선택된 인원(people)과 조식(breakfast) 값을 읽으시오.
② 콘솔에 "인원: 2명 / 조식: 미포함"을 출력하시오.
③ form.people.value 방식과 querySelector(':checked') 방식을 각각 한 번씩 사용하시오.


< 문제 4. checkbox 하나 - checked >
① agree의 체크 상태가 바뀌면 콘솔에 "규정 동의: true"를 출력하시오.
② 체크되어 있을 때만 submitBtn을 활성화하시오.


=====================================================================
[응용]
=====================================================================

< 문제 5. checkbox 여러 개 - 배열로 모으기 >
① 추가 옵션(name="options")의 체크 상태가 바뀔 때마다 체크된 옵션만 모으시오.
② 각 체크박스의 data-label을 배열로 모으고, data-price를 모두 더하시오.
③ optionResult에 "선택 옵션: 주차, 스파 / 추가 요금: 40,000원"을 표시하시오.
④ 선택한 옵션이 없으면 "선택 옵션 없음"을 표시하시오.
⑤ 옵션 정보를 반환하는 getOptions() 함수로 만들어 문제 9에서도 사용하시오.
   반환 형태) { labels: ["주차", "스파"], total: 40000 }


< 문제 6. 폼에 값 채우기 >
① loadBtn을 클릭하면 아래 객체의 값을 폼에 채우시오.

    const lastBooking = {
        guestName: "김철수",
        roomType: "suite",
        people: "3",
        breakfast: "포함",
        options: ["parking", "late"],
        checkIn: "2026-12-24",
        checkOut: "2026-12-26",
        request: "높은 층으로 부탁드립니다."
    };

② checkbox는 options 배열에 value가 포함되어 있으면 체크, 아니면 해제하시오.
③ 값을 채운 뒤 문제 9의 요약도 갱신되도록 updateSummary()를 호출하시오.


< 문제 7. FormData로 한 번에 모으기 >
① bookForm이 제출되면 페이지 이동을 막으시오.
② new FormData(form)로 값을 모아 아래 3가지를 콘솔에 출력하시오.
   - formData.get("guestName")
   - formData.getAll("options")
   - Object.fromEntries(formData)
③ Object.fromEntries() 결과에서 options가 하나만 남는 이유를 주석으로 작성하시오.


=====================================================================
[심화]
=====================================================================

< 문제 8. 숙박일 계산 >
① getNights() 함수를 만들어 체크인과 체크아웃 사이의 숙박일(박)을 반환하시오.
② 날짜가 하나라도 비어 있으면 0을 반환하시오.
③ 체크아웃이 체크인과 같거나 빠르면 -1을 반환하시오.
④ 날짜가 바뀔 때마다 nightResult에 "2박" 또는 "체크아웃 날짜를 확인하세요."를 표시하시오.
힌트) (new Date(체크아웃) - new Date(체크인)) / (1000 * 60 * 60 * 24)


< 문제 9. 실시간 예약 요약 >
① updateSummary() 함수를 만들어 summary에 아래 형식으로 표시하시오.

    예약자 : 김철수
    객실 : 스위트 (200,000원) x 2박
    인원 : 3명 / 조식 : 포함
    옵션 : 주차, 레이트 체크아웃 (+30,000원)
    예상 금액 : 430,000원

   예상 금액 = 객실 가격 x 숙박일 + 옵션 요금 (숙박일이 0 이하이면 "날짜를 선택하세요")
② 폼 안의 어떤 입력이 바뀌어도 요약이 갱신되도록 bookForm 하나에
   input, change 이벤트를 등록하시오. (입력 요소마다 등록하지 않는다.)


< 문제 10. 제출과 초기화 >
① 제출 시 예약자 이름이 비어 있거나 숙박일이 1 미만이면 alert로 안내하고 중단하시오.
② 통과하면 result에 "김철수님, 스위트 2박 예약이 완료되었습니다. (430,000원)"을 표시하시오.
③ 초기화(reset) 버튼을 누르면 result를 처음 문구로 되돌리고 요약도 다시 계산하시오.
④ reset 이벤트는 값이 초기화되기 "전"에 발생한다.
   요약을 초기화된 값으로 계산하려면 어떻게 해야 하는지 주석으로 작성하시오.
   힌트) setTimeout(updateSummary, 0)
*/


// < 강사용 정답 >

const bookForm = document.querySelector("#bookForm");
const roomPrices = { standard: 80000, deluxe: 120000, suite: 200000 };


// < 문제 1 >
document.querySelector("#nameBtn").addEventListener("click", function() {
    const name = bookForm.guestName.value.trim();
    const nameResult = document.querySelector("#nameResult");

    nameResult.textContent = name === "" ? "이름을 입력하세요." : "예약자: " + name;
});


// < 문제 2 >
const roomType = bookForm.roomType;

function getRoomText() {
    return roomType.options[roomType.selectedIndex].text;
}

roomType.addEventListener("change", function() {
    document.querySelector("#roomResult").textContent =
        getRoomText() + " / value: " + roomType.value;
});


// < 문제 3 >
document.querySelector("#radioBtn").addEventListener("click", function() {
    const people = bookForm.people.value;
    const breakfast = document.querySelector('input[name="breakfast"]:checked').value;

    console.log("인원: " + people + "명 / 조식: " + breakfast);
});


// < 문제 4 >
const agree = bookForm.agree;
const submitBtn = document.querySelector("#submitBtn");

agree.addEventListener("change", function() {
    console.log("규정 동의: " + agree.checked);
    submitBtn.disabled = !agree.checked;
});


// < 문제 5 >
function getOptions() {
    const checked = bookForm.querySelectorAll('input[name="options"]:checked');
    const labels = [];
    let total = 0;

    checked.forEach(function(box) {
        labels.push(box.dataset.label);
        total += Number(box.dataset.price);
    });

    return { labels: labels, total: total };
}

bookForm.querySelectorAll('input[name="options"]').forEach(function(box) {
    box.addEventListener("change", function() {
        const options = getOptions();
        const optionResult = document.querySelector("#optionResult");

        if (options.labels.length === 0) {
            optionResult.textContent = "선택 옵션 없음";
        } else {
            optionResult.textContent =
                "선택 옵션: " + options.labels.join(", ") +
                " / 추가 요금: " + options.total.toLocaleString() + "원";
        }
    });
});


// < 문제 6 >
const lastBooking = {
    guestName: "김철수",
    roomType: "suite",
    people: "3",
    breakfast: "포함",
    options: ["parking", "late"],
    checkIn: "2026-12-24",
    checkOut: "2026-12-26",
    request: "높은 층으로 부탁드립니다."
};

document.querySelector("#loadBtn").addEventListener("click", function() {
    bookForm.guestName.value = lastBooking.guestName;
    bookForm.roomType.value = lastBooking.roomType;
    bookForm.people.value = lastBooking.people;
    bookForm.breakfast.value = lastBooking.breakfast;
    bookForm.checkIn.value = lastBooking.checkIn;
    bookForm.checkOut.value = lastBooking.checkOut;
    bookForm.request.value = lastBooking.request;

    bookForm.querySelectorAll('input[name="options"]').forEach(function(box) {
        box.checked = lastBooking.options.includes(box.value);
    });

    updateSummary();
});


// < 문제 7 >
bookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(bookForm);

    console.log(formData.get("guestName"));
    console.log(formData.getAll("options"));
    console.log(Object.fromEntries(formData));
});

// Object.fromEntries()는 같은 key가 여러 번 나오면 마지막 값으로 덮어쓴다.
// 그래서 체크박스처럼 같은 name이 여러 개인 값은 getAll()로 따로 읽어야 한다.


// < 문제 8 >
const checkIn = bookForm.checkIn;
const checkOut = bookForm.checkOut;

function getNights() {
    if (checkIn.value === "" || checkOut.value === "") {
        return 0;
    }

    const nights = (new Date(checkOut.value) - new Date(checkIn.value)) / (1000 * 60 * 60 * 24);

    return nights >= 1 ? nights : -1;
}

function showNights() {
    const nights = getNights();
    const nightResult = document.querySelector("#nightResult");

    if (nights === 0) {
        nightResult.textContent = "";
    } else if (nights === -1) {
        nightResult.textContent = "체크아웃 날짜를 확인하세요.";
    } else {
        nightResult.textContent = nights + "박";
    }
}

checkIn.addEventListener("change", showNights);
checkOut.addEventListener("change", showNights);


// < 문제 9 >
const summary = document.querySelector("#summary");

function updateSummary() {
    const nights = getNights();
    const options = getOptions();
    const roomPrice = roomPrices[roomType.value];

    let priceText;

    if (nights <= 0) {
        priceText = "날짜를 선택하세요";
    } else {
        priceText = (roomPrice * nights + options.total).toLocaleString() + "원";
    }

    summary.textContent =
        "예약자 : " + (bookForm.guestName.value.trim() || "-") + "\n" +
        "객실 : " + getRoomText() + " x " + (nights > 0 ? nights : 0) + "박\n" +
        "인원 : " + bookForm.people.value + "명 / 조식 : " + bookForm.breakfast.value + "\n" +
        "옵션 : " + (options.labels.length > 0 ? options.labels.join(", ") : "없음") +
        " (+" + options.total.toLocaleString() + "원)\n" +
        "예상 금액 : " + priceText;
}

bookForm.addEventListener("input", updateSummary);
bookForm.addEventListener("change", updateSummary);

updateSummary();


// < 문제 10 >
const result = document.querySelector("#result");

bookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = bookForm.guestName.value.trim();
    const nights = getNights();

    if (name === "") {
        alert("예약자 이름을 입력하세요.");
        bookForm.guestName.focus();
        return;
    }

    if (nights < 1) {
        alert("체크인, 체크아웃 날짜를 확인하세요.");
        return;
    }

    const total = roomPrices[roomType.value] * nights + getOptions().total;
    const roomName = getRoomText().split(" ")[0];

    result.textContent =
        name + "님, " + roomName + " " + nights + "박 예약이 완료되었습니다. (" +
        total.toLocaleString() + "원)";
});

bookForm.addEventListener("reset", function() {
    result.textContent = "아직 예약하지 않았습니다.";
    submitBtn.disabled = true;
    document.querySelector("#nameResult").textContent = "";
    document.querySelector("#roomResult").textContent = "";
    document.querySelector("#optionResult").textContent = "";
    document.querySelector("#nightResult").textContent = "";

    setTimeout(updateSummary, 0);
});

// reset 이벤트는 값이 초기화되기 직전에 실행되므로,
// 바로 updateSummary()를 호출하면 초기화 전의 값으로 계산된다.
// setTimeout(함수, 0)을 사용하면 초기화가 끝난 직후에 실행된다.
