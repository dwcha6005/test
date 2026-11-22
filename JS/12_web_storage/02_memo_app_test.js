/*
< 학생용 실습 문제 >

주제: 종합 실습 - localStorage 가계부 만들기
방법: 02_memo_app.js(메모장)의 구조를 참고하여 단계별로 완성한다.

    사용자 동작 → entries 배열 수정 → save() → render()

=====================================================================
[기초]
=====================================================================

< 단계 1. 데이터 구조와 저장 함수 >
① 가계부 한 건은 아래 형태의 객체로 저장한다.

    { id: 1731400000000, date: "2026-11-12", type: "expense", item: "점심 식사", amount: 9000 }

② localStorage의 "ledger" 값을 읽어 entries 배열을 만드시오. (없으면 빈 배열)
③ entries를 JSON 문자열로 저장하는 save() 함수를 작성하시오.
④ 페이지가 열릴 때 date 입력창의 기본값을 오늘 날짜로 지정하시오.
   힌트) new Date().toISOString().slice(0, 10)  → "2026-11-12"
   (한국 시간 오전 9시 이전에는 하루 전 날짜가 나올 수 있다. 실습에서는 그대로 사용한다.)


< 단계 2. 폼 값 읽기 >
① ledgerForm이 제출되면 전송을 막으시오.
② 날짜, 구분(radio), 항목, 금액을 읽어 단계 1 형태의 객체를 만들어 콘솔에 출력하시오.
   - 금액은 숫자로 변환하시오.
   - id는 Date.now()


< 단계 3. 입력값 검증 >
① 아래 규칙을 순서대로 검사하고, 틀리면 formMsg에 메시지를 표시한 뒤 해당 입력창에 포커스하시오.
   - 날짜 필수                     : "날짜를 선택하세요."
   - 항목 필수, 20자 이내           : "항목을 20자 이내로 입력하세요."
   - 금액은 1 이상의 정수           : "금액은 1원 이상의 숫자로 입력하세요."
     힌트) /^[1-9][0-9]*$/
② 통과하면 formMsg를 비우시오.


< 단계 4. 추가와 저장 >
① 검증을 통과한 객체를 entries 배열에 추가하고 save()를 호출하시오.
② 폼을 초기화하되, 날짜와 구분은 방금 입력한 값을 유지하시오. (연속 입력이 편하도록)
③ 개발자 도구 Application 탭에서 "ledger" 값이 저장되는지 확인하시오.


=====================================================================
[응용]
=====================================================================

< 단계 5. 목록 그리기 - render() >
① ledgerBody를 비우고, entries를 날짜 최신순으로 정렬하여 표의 행(tr)으로 만드시오.
   힌트) [...entries].sort(function(a, b) { return b.date.localeCompare(a.date); })
        원본 배열을 바꾸지 않도록 복사본을 정렬한다.
② 구분은 "수입" / "지출"로 표시하고, 금액은 수입은 "+12,000", 지출은 "-9,000" 형식으로 표시하시오.
   (각 td에 income 또는 expense 클래스 적용)
③ 각 행에는 data-id와 [수정] [삭제] 버튼(data-action)을 넣으시오.
④ 내역이 없으면 "내역이 없습니다."라는 행 하나를 표시하시오. (colspan="5")
⑤ 추가 후, 페이지가 열릴 때 render()를 호출하시오.


< 단계 6. 합계 계산 >
① render()에서 표시 중인 내역의 수입 합계, 지출 합계, 잔액(수입 - 지출)을 계산하시오.
② incomeTotal, expenseTotal, balance에 "수입 120,000원" 형식으로 표시하시오.
③ 잔액이 음수이면 balance의 글자를 빨간색으로 표시하시오.


< 단계 7. 삭제 - 이벤트 위임 >
① ledgerBody에 click 리스너를 하나만 등록하시오.
② 삭제 버튼이면 confirm으로 확인 후 해당 id의 내역을 entries에서 제거하시오. (filter)
③ save() → render()를 호출하시오.
주의) dataset 값은 문자열이므로 Number()로 변환하여 id와 비교한다.


=====================================================================
[심화]
=====================================================================

< 단계 8. 월별 보기 >
① monthFilter(type="month")의 값이 바뀌면 해당 월의 내역만 표시하시오.
   monthFilter.value 예) "2026-11"  → date가 "2026-11"로 시작하는 내역만
   힌트) entry.date.startsWith(monthFilter.value)
② 합계도 선택한 월 기준으로 계산하시오.
③ showAll 버튼을 누르면 monthFilter를 비우고 전체를 표시하시오.
④ 선택한 월을 localStorage의 "ledgerMonth"에 저장하여 새로고침 후에도 유지하시오.


< 단계 9. 수정 >
① 수정 버튼을 누르면 해당 내역의 값을 폼에 채우고, submitBtn 문구를 "수정 완료"로 바꾸고 cancelBtn을 보이시오.
② 수정 중인 id를 editingId 변수에 저장하시오.
③ 제출 시 editingId가 있으면 새로 추가하지 말고 해당 내역의 값을 변경하시오.
④ 수정 완료 또는 수정 취소 후에는 추가 모드로 되돌리시오.
⑤ 수정 중인 내역을 삭제하면 추가 모드로 되돌리시오.


< 단계 10. JSON 보기와 전체 삭제 >
① jsonBtn을 누르면 jsonView를 보이거나 숨기고, 저장된 데이터를 보기 좋게 표시하시오.
   힌트) JSON.stringify(entries, null, 2)  → 들여쓰기 2칸
② 데이터가 바뀔 때마다(save() 호출 시) jsonView의 내용도 갱신하시오.
③ clearAll을 누르면 confirm("모든 내역을 삭제할까요? 되돌릴 수 없습니다.") 후
   entries를 비우고 localStorage에서 "ledger"를 삭제한 뒤 화면을 갱신하시오.
*/


// < 강사용 정답 >

// < 단계 1 >
const STORAGE_KEY = "ledger";

const ledgerForm = document.querySelector("#ledgerForm");
const dateInput = document.querySelector("#date");
const itemInput = document.querySelector("#item");
const amountInput = document.querySelector("#amount");
const submitBtn = document.querySelector("#submitBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const formMsg = document.querySelector("#formMsg");

const monthFilter = document.querySelector("#monthFilter");
const ledgerBody = document.querySelector("#ledgerBody");
const jsonView = document.querySelector("#jsonView");

let entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let editingId = null;

function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    updateJsonView();   // 단계 10
}

dateInput.value = new Date().toISOString().slice(0, 10);


// < 단계 2, 3, 4, 9 > 제출
function validate() {
    if (dateInput.value === "") {
        formMsg.textContent = "날짜를 선택하세요.";
        dateInput.focus();
        return false;
    }

    const item = itemInput.value.trim();

    if (item === "" || item.length > 20) {
        formMsg.textContent = "항목을 20자 이내로 입력하세요.";
        itemInput.focus();
        return false;
    }

    if (!/^[1-9][0-9]*$/.test(amountInput.value.trim())) {
        formMsg.textContent = "금액은 1원 이상의 숫자로 입력하세요.";
        amountInput.focus();
        return false;
    }

    formMsg.textContent = "";
    return true;
}

function resetForm() {
    // 날짜와 구분은 유지하고 항목, 금액만 비운다.
    itemInput.value = "";
    amountInput.value = "";
    formMsg.textContent = "";

    editingId = null;
    submitBtn.textContent = "추가";
    cancelBtn.hidden = true;
}

ledgerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!validate()) {
        return;
    }

    const data = {
        date: dateInput.value,
        type: ledgerForm.type.value,
        item: itemInput.value.trim(),
        amount: Number(amountInput.value.trim())
    };

    if (editingId === null) {
        data.id = Date.now();
        entries.push(data);
        console.log("추가:", data);
    } else {
        const entry = entries.find(function(e) {
            return e.id === editingId;
        });

        Object.assign(entry, data);   // entry의 값을 data의 값으로 덮어쓰기
        console.log("수정:", entry);
    }

    save();
    render();
    resetForm();
    itemInput.focus();
});

cancelBtn.addEventListener("click", resetForm);


// < 단계 5, 6, 8 > 화면 그리기
function render() {
    ledgerBody.replaceChildren();

    const month = monthFilter.value;

    const list = [...entries]
        .filter(function(entry) {
            return month === "" || entry.date.startsWith(month);
        })
        .sort(function(a, b) {
            return b.date.localeCompare(a.date);
        });

    let income = 0;
    let expense = 0;

    list.forEach(function(entry) {
        const tr = document.createElement("tr");
        tr.dataset.id = entry.id;

        const isIncome = entry.type === "income";
        const sign = isIncome ? "+" : "-";
        const className = isIncome ? "income" : "expense";

        if (isIncome) {
            income += entry.amount;
        } else {
            expense += entry.amount;
        }

        const cells = [
            entry.date,
            isIncome ? "수입" : "지출",
            entry.item,
            sign + entry.amount.toLocaleString()
        ];

        cells.forEach(function(text, index) {
            const td = document.createElement("td");
            td.textContent = text;

            if (index === 1 || index === 3) {
                td.className = className;
            }

            tr.append(td);
        });

        const manageTd = document.createElement("td");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        editBtn.type = "button";
        editBtn.dataset.action = "edit";
        editBtn.textContent = "수정";

        deleteBtn.type = "button";
        deleteBtn.dataset.action = "delete";
        deleteBtn.textContent = "삭제";

        manageTd.append(editBtn, " ", deleteBtn);
        tr.append(manageTd);
        ledgerBody.append(tr);
    });

    if (list.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 5;
        td.textContent = "내역이 없습니다.";
        tr.append(td);
        ledgerBody.append(tr);
    }

    // 단계 6 : 합계
    const balance = income - expense;
    const balanceEl = document.querySelector("#balance");

    document.querySelector("#incomeTotal").textContent = "수입 " + income.toLocaleString() + "원";
    document.querySelector("#expenseTotal").textContent = "지출 " + expense.toLocaleString() + "원";
    balanceEl.textContent = "잔액 " + balance.toLocaleString() + "원";
    balanceEl.style.color = balance < 0 ? "red" : "";
}


// < 단계 7, 9 > 수정 / 삭제 위임
ledgerBody.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (button === null) {
        return;
    }

    const id = Number(button.closest("tr").dataset.id);
    const entry = entries.find(function(e) {
        return e.id === id;
    });

    if (button.dataset.action === "delete") {
        if (!confirm("'" + entry.item + "' 내역을 삭제할까요?")) {
            return;
        }

        entries = entries.filter(function(e) {
            return e.id !== id;
        });

        if (editingId === id) {
            resetForm();
        }

        save();
        render();
    }

    if (button.dataset.action === "edit") {
        dateInput.value = entry.date;
        ledgerForm.type.value = entry.type;
        itemInput.value = entry.item;
        amountInput.value = entry.amount;

        editingId = id;
        submitBtn.textContent = "수정 완료";
        cancelBtn.hidden = false;
        itemInput.focus();
    }
});


// < 단계 8 > 월별 보기
monthFilter.value = localStorage.getItem("ledgerMonth") || "";

monthFilter.addEventListener("change", function() {
    localStorage.setItem("ledgerMonth", monthFilter.value);
    render();
});

document.querySelector("#showAll").addEventListener("click", function() {
    monthFilter.value = "";
    localStorage.removeItem("ledgerMonth");
    render();
});


// < 단계 10 > JSON 보기 / 전체 삭제
function updateJsonView() {
    jsonView.textContent = JSON.stringify(entries, null, 2);
}

document.querySelector("#jsonBtn").addEventListener("click", function() {
    jsonView.hidden = !jsonView.hidden;
    updateJsonView();
});

document.querySelector("#clearAll").addEventListener("click", function() {
    if (!confirm("모든 내역을 삭제할까요? 되돌릴 수 없습니다.")) {
        return;
    }

    entries = [];
    localStorage.removeItem(STORAGE_KEY);
    resetForm();
    updateJsonView();
    render();
});


// 시작
render();
