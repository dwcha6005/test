/*
    render.js - 화면 그리기만 담당하는 모듈

    서버도, 전역 변수도 모른다. 매개변수로 받은 데이터로 화면만 그린다.
    → React 컴포넌트와 같은 생각 방식 : "데이터를 받아서 화면을 돌려준다"
*/

function createButton(text, action) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = text;
    button.dataset.action = action;
    return button;
}

export function renderMemos(listElement, memos) {
    listElement.replaceChildren();

    if (memos.length === 0) {
        listElement.textContent = "표시할 메모가 없습니다.";
        return;
    }

    memos.forEach(function(memo) {
        const div = document.createElement("div");
        const h3 = document.createElement("h3");
        const content = document.createElement("p");
        const date = document.createElement("p");

        div.className = memo.important ? "memo important" : "memo";
        div.dataset.id = memo.id;

        h3.textContent = memo.title;
        content.className = "content";
        content.textContent = memo.content;
        date.className = "date";
        date.textContent = memo.date;

        div.append(
            h3,
            content,
            date,
            createButton(memo.important ? "★ 중요 해제" : "☆ 중요", "star"),
            " ",
            createButton("수정", "edit"),
            " ",
            createButton("삭제", "delete")
        );

        listElement.append(div);
    });
}

export function renderCount(countElement, total, shown) {
    countElement.textContent = "전체 " + total + "개 / 표시 " + shown + "개";
}

export function renderStatus(listElement, text, className) {
    listElement.className = className;
    listElement.textContent = text;
}
