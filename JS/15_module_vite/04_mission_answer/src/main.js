/*
    main.js - 시작 파일 : 이벤트 연결과 전체 흐름

    사용자 동작 → 서버 요청(api.js) → 성공하면 memos 배열 수정 → 다시 그리기(render.js)
*/

import { getMemos, createMemo, updateMemo, deleteMemo } from "./api.js";
import { renderMemos, renderCount, renderStatus } from "./render.js";

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

let memos = [];
let editingId = null;   // json-server v1의 id는 문자열


// 검색 조건을 적용하여 다시 그리기 (서버 요청 없음)
function refresh() {
    const keyword = searchInput.value.trim().toLowerCase();

    const shown = memos.filter(function(memo) {
        const matchKeyword =
            memo.title.toLowerCase().includes(keyword) ||
            memo.content.toLowerCase().includes(keyword);

        return matchKeyword && (!onlyImportant.checked || memo.important);
    });

    memoList.className = "";
    renderMemos(memoList, shown);
    renderCount(memoCount, memos.length, shown.length);
}

function resetForm() {
    memoForm.reset();
    editingId = null;
    submitBtn.textContent = "메모 추가";
    cancelBtn.hidden = true;
    formMsg.textContent = "";
}


// 시작 : 서버에서 메모 불러오기
async function init() {
    renderStatus(memoList, "불러오는 중...", "loading");

    try {
        const data = await getMemos();
        memos = data.reverse();   // 최신 메모가 위로
        refresh();
    } catch (error) {
        renderStatus(memoList, error.message, "error");
    }
}


// 추가 / 수정
memoForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const title = titleInput.value.trim();

    if (title === "" || title.length > 30) {
        formMsg.textContent = "제목을 30자 이내로 입력하세요.";
        titleInput.focus();
        return;
    }

    const data = {
        title: title,
        content: contentInput.value.trim(),
        important: importantInput.checked,
        date: new Date().toLocaleString()
    };

    submitBtn.disabled = true;

    try {
        if (editingId === null) {
            const saved = await createMemo(data);   // 서버가 id를 붙여서 돌려준다
            memos.unshift(saved);
        } else {
            const updated = await updateMemo(editingId, data);
            memos = memos.map(function(memo) {
                return memo.id === editingId ? updated : memo;
            });
        }

        resetForm();
        refresh();
    } catch (error) {
        formMsg.textContent = error.message;
    } finally {
        submitBtn.disabled = false;
    }
});

cancelBtn.addEventListener("click", resetForm);


// 중요 / 수정 / 삭제 (이벤트 위임)
memoList.addEventListener("click", async function(event) {
    const button = event.target.closest("button");

    if (button === null) {
        return;
    }

    const id = button.closest(".memo").dataset.id;   // 문자열 그대로 비교
    const memo = memos.find(function(m) {
        return m.id === id;
    });

    try {
        if (button.dataset.action === "star") {
            const updated = await updateMemo(id, { important: !memo.important });
            memos = memos.map(function(m) {
                return m.id === id ? updated : m;
            });
        }

        if (button.dataset.action === "edit") {
            titleInput.value = memo.title;
            contentInput.value = memo.content;
            importantInput.checked = memo.important;
            editingId = id;
            submitBtn.textContent = "수정 완료";
            cancelBtn.hidden = false;
            titleInput.focus();
            return;
        }

        if (button.dataset.action === "delete") {
            if (!confirm("'" + memo.title + "' 메모를 삭제할까요?")) {
                return;
            }

            await deleteMemo(id);
            memos = memos.filter(function(m) {
                return m.id !== id;
            });

            if (editingId === id) {
                resetForm();
            }
        }

        refresh();
    } catch (error) {
        alert(error.message);
    }
});

searchInput.addEventListener("input", refresh);
onlyImportant.addEventListener("change", refresh);

init();
