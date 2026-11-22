/*
=====================================================================================
[수업 콘티] 12_web_storage / 02. 종합 실습 - 메모장       권장 60분 (시연·설명 30 + 실습 착수 30)
=====================================================================================
< 준비 >
- 02_memo_app.html을 열고 F12 → Application 탭 (Local Storage의 memos 확인용).
- 이 수업은 새 문법이 없다. 지금까지 배운 것을 "어떤 구조로 합치는지"를 보여 주는 시간이다.

< 진행 순서 >
1) 완성본 먼저 시연 (8분)
   ▶ 빈 제목으로 [메모 추가] → "제목을 입력하세요."
   ▶ 메모 3개 추가 (하나는 "중요 메모" 체크) → 중요 메모는 왼쪽 빨간 줄
   ▶ F5 → 메모 유지 / Application에서 memos 값(JSON 배열) 확인
   ▶ [☆ 중요] 토글 / [수정] → 폼에 내용이 채워지고 버튼이 "수정 완료"로 바뀜 → 수정 / [수정 취소]
   ▶ 검색창에 글자 입력 → 실시간 필터 / "중요만 보기" 체크 → 중요 메모만
   ▶ [삭제] → confirm → 삭제

2) 핵심 구조 판서 (5분) - 섹션 2  ★ 오늘 수업의 전부
   - 사용자 동작 → memos 배열 수정 → save() → render()
   - "화면을 직접 고치지 않는다. 배열을 고치고 화면은 다시 그린다."
   - memos 배열 객체 하나의 모양을 판서 (id, title, content, important, date)

3) 코드 읽기 (15분) - 아래 순서대로 함께 읽는다
   ① 섹션 3 save()            : 3줄짜리 함수 (12-01)
   ② 섹션 4 render()          : filter로 검색 조건 → forEach로 요소 생성 (09_DOM 05)
   ③ 섹션 6 submit            : 검증(11-02) → editingId로 추가/수정 분기
   ④ 섹션 5 startEdit()       : 폼에 값 채우기(11-01)
   ⑤ 섹션 7 위임              : data-action + data-id (10_event 06)
   ⑥ 섹션 8 검색              : 데이터는 그대로, render만 다시 호출 → 저장하지 않는 이유

4) 질문으로 정리 (2분)
   - "삭제할 때 왜 div.remove()를 하지 않고 배열에서 지운 뒤 render()를 할까?"
     → 화면과 저장 데이터가 항상 같도록 하기 위해 (새로고침해도 같은 결과)

< 예상 질문 / 자주 막히는 곳 >
- dataset.id는 문자열이라 m.id === id 비교가 false → Number() 변환 필수
- Date.now()를 id로 쓰는 이유 → 밀리초 단위 시간이라 겹치지 않는다
- 수정 중인 메모를 삭제하면? → 섹션 7에서 resetForm() 처리한 부분 보여 주기

< 실습 연결 : 02_memo_app_test.html / .js (가계부 10단계) >
- 수업 시간 : 단계 1 ~ 5 (데이터 구조, 폼 읽기, 검증, 추가, 목록)
- 다음 시간 또는 과제 : 단계 6 ~ 10 (합계, 삭제, 월별, 수정, JSON 보기)
- 막히면 메모장 코드의 같은 섹션을 참고하도록 안내 (구조가 1:1로 같다)
=====================================================================================
*/


/*
    02_memo_app.js

    < 1. 종합 실습 - 메모장 >

    지금까지 배운 내용을 하나로 합친다.

    - 폼 값 읽기 / 채우기       (11-01)
    - 입력값 검증               (11-02)
    - localStorage + JSON       (12-01)
    - 요소 생성 / 삭제          (09_DOM 05)
    - 이벤트 위임               (10_event 06)

    기능
    1) 메모 추가 (제목 필수)
    2) 메모 목록 표시 (새로고침해도 유지)
    3) 삭제, 중요 표시 전환
    4) 수정 (폼에 기존 내용을 채우고 다시 저장)
    5) 검색, 중요 메모만 보기


    < 2. 핵심 구조 : 데이터 → 저장 → 화면 >

    화면(DOM)을 직접 고치지 않고, 항상 "데이터(배열)"를 먼저 고친다.

        사용자 동작 → memos 배열 수정 → save() → render()

    memos 배열 (localStorage의 "memos"에 JSON으로 저장)
    [
        { id: 1731400000000, title: "장보기", content: "우유, 계란", important: false, date: "2026. 11. 12." },
        ...
    ]

    - id : 메모를 구분하는 고유 번호 (Date.now() : 현재 시각을 밀리초로 → 겹치지 않음)
    - 화면의 각 메모에는 data-id를 붙여서, 클릭했을 때 어떤 메모인지 찾는다.
*/

const STORAGE_KEY = "memos";

const memoForm = document.querySelector("#memoForm");
const titleInput = document.querySelector("#title");
const contentInput = document.querySelector("#content");
const importantInput = document.querySelector("#important");
const submitBtn = document.querySelector("#submitBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const formMsg = document.querySelector("#formMsg");

const searchInput = document.querySelector("#searchInput");
const onlyImportant = document.querySelector("#onlyImportant");
const memoCount = document.querySelector("#memoCount");
const memoList = document.querySelector("#memoList");

let memos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let editingId = null;   // 수정 중인 메모의 id (null이면 추가 모드)


/*
    < 3. 저장 함수 >
    배열이 바뀔 때마다 호출한다.
*/

function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
}


/*
    < 4. 화면 그리기 함수 >

    1) 목록을 비운다.
    2) 검색어, 중요만 보기 조건으로 걸러낸다. (filter)
    3) 남은 메모를 하나씩 요소로 만들어 추가한다.

    사용자 입력(제목, 내용)은 반드시 textContent로 넣는다. (XSS 방지)
*/

function render() {
    memoList.replaceChildren();

    const keyword = searchInput.value.trim().toLowerCase();

    const filtered = memos.filter(function(memo) {
        const matchKeyword =
            memo.title.toLowerCase().includes(keyword) ||
            memo.content.toLowerCase().includes(keyword);

        const matchImportant = !onlyImportant.checked || memo.important;

        return matchKeyword && matchImportant;
    });

    memoCount.textContent = "전체 " + memos.length + "개 / 표시 " + filtered.length + "개";

    if (filtered.length === 0) {
        memoList.textContent = "표시할 메모가 없습니다.";
        return;
    }

    filtered.forEach(function(memo) {
        const div = document.createElement("div");
        const h3 = document.createElement("h3");
        const content = document.createElement("p");
        const date = document.createElement("p");
        const starBtn = document.createElement("button");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        div.className = "memo";
        div.dataset.id = memo.id;
        if (memo.important) {
            div.classList.add("important");
        }

        h3.textContent = memo.title;
        content.className = "content";
        content.textContent = memo.content;
        date.className = "date";
        date.textContent = memo.date;

        starBtn.type = "button";
        starBtn.dataset.action = "star";
        starBtn.textContent = memo.important ? "★ 중요 해제" : "☆ 중요";

        editBtn.type = "button";
        editBtn.dataset.action = "edit";
        editBtn.textContent = "수정";

        deleteBtn.type = "button";
        deleteBtn.dataset.action = "delete";
        deleteBtn.textContent = "삭제";

        div.append(h3, content, date, starBtn, " ", editBtn, " ", deleteBtn);
        memoList.append(div);
    });
}


/*
    < 5. 폼 초기화 / 수정 모드 전환 >
*/

function resetForm() {
    memoForm.reset();
    editingId = null;
    submitBtn.textContent = "메모 추가";
    cancelBtn.hidden = true;
    formMsg.textContent = "";
}

function startEdit(memo) {
    // 폼에 기존 값 채우기 (11-01의 "값 채우기")
    titleInput.value = memo.title;
    contentInput.value = memo.content;
    importantInput.checked = memo.important;

    editingId = memo.id;
    submitBtn.textContent = "수정 완료";
    cancelBtn.hidden = false;
    titleInput.focus();
}


/*
    < 6. 추가 / 수정 : submit >

    1) 검증 : 제목 필수, 30자 이내
    2) editingId가 null이면 새 메모 추가, 아니면 기존 메모 수정
    3) save() → render() → 폼 초기화
*/

memoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = titleInput.value.trim();

    if (title === "") {
        formMsg.textContent = "제목을 입력하세요.";
        titleInput.focus();
        return;
    }

    if (title.length > 30) {
        formMsg.textContent = "제목은 30자 이내로 입력하세요.";
        titleInput.focus();
        return;
    }

    if (editingId === null) {
        // 추가 : 최신 메모가 위로 오도록 맨 앞에 추가
        memos.unshift({
            id: Date.now(),
            title: title,
            content: contentInput.value.trim(),
            important: importantInput.checked,
            date: new Date().toLocaleString()
        });
    } else {
        // 수정 : id가 같은 메모를 찾아 값 변경
        const memo = memos.find(function(m) {
            return m.id === editingId;
        });

        memo.title = title;
        memo.content = contentInput.value.trim();
        memo.important = importantInput.checked;
        memo.date = new Date().toLocaleString() + " (수정됨)";
    }

    save();
    render();
    resetForm();
});

cancelBtn.addEventListener("click", resetForm);


/*
    < 7. 중요 / 수정 / 삭제 : 이벤트 위임 >

    memoList 하나에 click 리스너를 등록하고
    1) 클릭한 버튼의 data-action으로 동작 구분
    2) 버튼이 속한 .memo의 data-id로 어떤 메모인지 찾기

    주의 : dataset 값은 문자열이므로 Number()로 바꿔서 id와 비교한다.
*/

memoList.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (button === null) {
        return;
    }

    const id = Number(button.closest(".memo").dataset.id);
    const memo = memos.find(function(m) {
        return m.id === id;
    });

    if (button.dataset.action === "star") {
        memo.important = !memo.important;
    } else if (button.dataset.action === "edit") {
        startEdit(memo);
        return;   // 데이터가 바뀌지 않았으므로 저장하지 않음
    } else if (button.dataset.action === "delete") {
        if (!confirm("'" + memo.title + "' 메모를 삭제할까요?")) {
            return;
        }

        memos = memos.filter(function(m) {
            return m.id !== id;
        });

        if (editingId === id) {
            resetForm();
        }
    }

    save();
    render();
});


/*
    < 8. 검색 / 중요만 보기 >
    데이터는 그대로 두고 화면만 다시 그린다. (저장 X)
*/

searchInput.addEventListener("input", render);
onlyImportant.addEventListener("change", render);


/*
    < 9. 시작 >
    페이지가 열리면 저장된 메모로 화면을 그린다.
*/

render();
