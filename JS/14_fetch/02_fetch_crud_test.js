/*
< 학생용 실습 문제 - 단계별 미션 >

주제: JSONPlaceholder의 /todos로 할 일 관리 화면 만들기 (조회 · 등록 · 수정 · 삭제)
참고: 02_fetch_crud.js 섹션 5(request 함수), 섹션 6(게시판)과 구조가 같다.

    사용자 동작 → 서버 요청 → (성공하면) todos 배열 수정 → render()

API
    GET    /todos?userId=1      목록         응답 : [{ userId, id, title, completed }, ...]
    POST   /todos               등록         보낼 데이터 : { userId, title, completed: false }
    PATCH  /todos/번호          일부 수정     보낼 데이터 : { completed: true } 또는 { title: "..." }
    DELETE /todos/번호          삭제

※ 연습 서버라서 실제로 저장되지 않는다. (새로 추가한 할 일을 수정하면 500 오류가 나는 것이 정상)

=====================================================================================
[기초]
=====================================================================================

< 단계 1. 공통 함수 >
① request(method, path, data) 함수를 작성하시오. (수업자료 섹션 5)
② 콘솔에서 await request("GET", "/todos/1") 를 실행해 동작을 확인하시오.
   (콘솔에서도 await를 바로 쓸 수 있다.)


< 단계 2. 목록 불러오기 >
① loadTodos() : 선택한 회원의 할 일을 불러와 todos 배열에 저장하고 render()를 호출하시오.
② render() : todoList에 li를 만드시오.
   <li class="(완료면 done)" data-id="번호">
       <input type="checkbox" data-action="toggle" (완료면 checked)>
       <span>제목</span>
       <button data-action="edit">수정</button>
       <button data-action="delete">삭제</button>
   </li>
③ 불러오는 동안 status에 "불러오는 중...", 실패하면 에러 메시지를 표시하시오.
④ 페이지가 열릴 때와 userSelect를 바꿀 때 loadTodos()를 실행하시오.


< 단계 3. 요약 표시 >
① render()에서 summary에 "전체 20개 / 완료 11개 / 남은 일 9개"를 표시하시오.


=====================================================================================
[응용]
=====================================================================================

< 단계 4. 등록 (POST) >
① todoForm 제출 시 빈 값이면 formMsg에 "할 일을 입력하세요." 를 표시하고 중단하시오.
② POST로 등록하고, 서버가 돌려준 객체를 todos 배열 "맨 앞"에 추가한 뒤 render() 하시오.
   (연습 서버는 id가 항상 201이므로 화면 구분을 위해 id를 Date.now()로 바꿔 둔다.)
③ 요청 중에는 addBtn을 비활성화하고 문구를 "추가 중..."으로 바꾸시오.
④ 성공하면 입력창을 비우고 포커스를 주시오.


< 단계 5. 완료 체크 (PATCH) - 이벤트 위임 >
① todoList에 change 리스너 하나를 등록하시오.
② data-action="toggle" 체크박스가 바뀌면 PATCH /todos/번호 { completed: 체크상태 } 를 보내시오.
③ 요청 중에는 해당 li에 saving 클래스를 적용하시오.
④ 성공하면 배열의 completed를 바꾸고 render(), 실패하면 체크박스를 원래 상태로 되돌리고 alert 하시오.


< 단계 6. 삭제 (DELETE) - 이벤트 위임 >
① todoList에 click 리스너 하나를 등록하시오. (단계 7의 수정 버튼도 이 리스너에서 처리)
② data-action="delete" 버튼을 누르면 confirm 후 DELETE 요청을 보내시오.
③ 성공하면 배열에서 제거하고 render() 하시오.


=====================================================================================
[심화]
=====================================================================================

< 단계 7. 제목 수정 (PATCH) >
① data-action="edit" 버튼을 누르면 prompt("수정할 내용", 기존제목)으로 새 제목을 입력받으시오.
② 취소하거나 빈 값이거나 기존과 같으면 아무것도 하지 마시오.
③ PATCH /todos/번호 { title: 새제목 } 을 보내고, 성공하면 배열과 화면을 갱신하시오.


< 단계 8. 낙관적 업데이트 (Optimistic Update) >
단계 5에서는 서버 응답을 기다린 뒤 화면을 바꿨다. 사용자는 0.2 ~ 1초 정도 기다려야 한다.
SNS의 "좋아요"처럼 화면을 먼저 바꾸고, 서버 요청이 실패하면 되돌리는 방식으로 바꾸시오.
① 체크하는 즉시 배열을 바꾸고 render() 하시오.
② PATCH 요청이 실패하면 배열을 원래 값으로 되돌리고 다시 render() + alert 하시오.
③ 두 방식(응답 후 반영 / 먼저 반영)의 장단점을 주석으로 작성하시오.


< 단계 9. 완료한 일 모두 삭제 (여러 요청 동시에) >
① clearDoneBtn을 누르면 완료된 할 일들의 DELETE 요청을 Promise.allSettled로 동시에 보내시오.
② 성공한 항목만 배열에서 제거하고, 실패한 항목이 있으면 "n개 삭제 실패"를 alert 하시오.
③ 완료한 일이 없으면 "완료한 일이 없습니다."를 alert 하시오.


< 단계 10. 회원 전환 시 응답 순서 문제 >
① userSelect를 1 → 2 → 3으로 빠르게 바꿨을 때, 늦게 도착한 이전 회원의 응답이
   화면을 덮어쓰지 않도록 하시오. (13_async 요청 번호 방식 또는 01 실습 문제 9의 AbortController)
② 개발자 도구 Network 탭에서 "Slow 3G"로 설정하고 확인하시오.
*/


// < 강사용 정답 >

const BASE_URL = "https://jsonplaceholder.typicode.com";

const userSelect = document.querySelector("#userSelect");
const summary = document.querySelector("#summary");
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const formMsg = document.querySelector("#formMsg");
const statusText = document.querySelector("#status");
const todoList = document.querySelector("#todoList");

let todos = [];
let loadController = null;


// < 단계 1 >
async function request(method, path, data, signal) {
    const options = { method: method, headers: {}, signal: signal };

    if (data !== undefined) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    const response = await fetch(BASE_URL + path, options);

    if (!response.ok) {
        throw new Error("요청 실패 (" + response.status + ")");
    }

    return response.json();
}

function findTodo(id) {
    return todos.find(function(todo) {
        return todo.id === id;
    });
}


// < 단계 2, 3 >
function render() {
    todoList.replaceChildren();

    todos.forEach(function(todo) {
        const li = document.createElement("li");
        const check = document.createElement("input");
        const span = document.createElement("span");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        li.dataset.id = todo.id;
        if (todo.completed) {
            li.className = "done";
        }

        check.type = "checkbox";
        check.dataset.action = "toggle";
        check.checked = todo.completed;

        span.textContent = todo.title;

        editBtn.type = "button";
        editBtn.dataset.action = "edit";
        editBtn.textContent = "수정";

        deleteBtn.type = "button";
        deleteBtn.dataset.action = "delete";
        deleteBtn.textContent = "삭제";

        li.append(check, span, editBtn, deleteBtn);
        todoList.append(li);
    });

    const doneCount = todos.filter(function(todo) {
        return todo.completed;
    }).length;

    summary.textContent =
        "전체 " + todos.length + "개 / 완료 " + doneCount + "개 / 남은 일 " + (todos.length - doneCount) + "개";
}

// < 단계 2, 10 >
async function loadTodos() {
    // 단계 10 : 이전 회원의 요청이 진행 중이면 취소
    if (loadController !== null) {
        loadController.abort();
    }
    loadController = new AbortController();

    statusText.className = "loading";
    statusText.textContent = "불러오는 중...";
    todoList.replaceChildren();

    try {
        todos = await request("GET", "/todos?userId=" + userSelect.value, undefined, loadController.signal);
        statusText.textContent = "";
        render();
    } catch (error) {
        if (error.name === "AbortError") {
            return;
        }

        statusText.className = "error";
        statusText.textContent = error.message;
    }
}

userSelect.addEventListener("change", loadTodos);
loadTodos();


// < 단계 4 >
todoForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const title = todoInput.value.trim();

    if (title === "") {
        formMsg.textContent = "할 일을 입력하세요.";
        return;
    }

    formMsg.textContent = "";
    addBtn.disabled = true;
    addBtn.textContent = "추가 중...";

    try {
        const saved = await request("POST", "/todos", {
            userId: Number(userSelect.value),
            title: title,
            completed: false
        });

        saved.id = Date.now();   // 연습 서버는 항상 같은 id → 화면 구분용
        todos.unshift(saved);
        render();

        todoInput.value = "";
        todoInput.focus();
    } catch (error) {
        formMsg.textContent = error.message;
    } finally {
        addBtn.disabled = false;
        addBtn.textContent = "추가";
    }
});


// < 단계 5 → 단계 8 (낙관적 업데이트로 변경) >
todoList.addEventListener("change", async function(event) {
    if (!event.target.matches('[data-action="toggle"]')) {
        return;
    }

    const id = Number(event.target.closest("li").dataset.id);
    const todo = findTodo(id);
    const before = todo.completed;

    // 1) 화면 먼저 반영
    todo.completed = event.target.checked;
    render();

    // 2) 서버 요청, 실패하면 되돌리기
    try {
        await request("PATCH", "/todos/" + id, { completed: todo.completed });
    } catch (error) {
        todo.completed = before;
        render();
        alert("변경하지 못했습니다 : " + error.message);
    }
});

/*
    단계 5 방식(응답 후 반영)
    async function toggleAfterResponse(li, checkbox) {
        li.classList.add("saving");
        try {
            await request("PATCH", ...);
            todo.completed = checkbox.checked;
            render();
        } catch (error) {
            checkbox.checked = !checkbox.checked;
            li.classList.remove("saving");
            alert(error.message);
        }
    }

    응답 후 반영 : 화면이 항상 서버와 같다(정확). 대신 응답이 올 때까지 기다려야 해서 느리게 느껴진다.
    먼저 반영   : 즉시 바뀌어 빠르게 느껴진다. 대신 실패하면 화면이 되돌아가는 처리가 필요하다.
    → 실패해도 큰 문제가 없는 동작(좋아요, 체크)은 먼저 반영, 결제처럼 중요한 동작은 응답 후 반영
*/


// < 단계 6, 7 >
todoList.addEventListener("click", async function(event) {
    const button = event.target.closest("button");

    if (button === null) {
        return;
    }

    const li = button.closest("li");
    const id = Number(li.dataset.id);
    const todo = findTodo(id);

    if (button.dataset.action === "delete") {
        if (!confirm("'" + todo.title + "'을(를) 삭제할까요?")) {
            return;
        }

        li.classList.add("saving");

        try {
            await request("DELETE", "/todos/" + id);
            todos = todos.filter(function(t) {
                return t.id !== id;
            });
            render();
        } catch (error) {
            li.classList.remove("saving");
            alert(error.message);
        }
    }

    if (button.dataset.action === "edit") {
        const newTitle = prompt("수정할 내용", todo.title);

        if (newTitle === null || newTitle.trim() === "" || newTitle.trim() === todo.title) {
            return;
        }

        li.classList.add("saving");

        try {
            const updated = await request("PATCH", "/todos/" + id, { title: newTitle.trim() });
            todo.title = updated.title;
            render();
        } catch (error) {
            li.classList.remove("saving");
            alert(error.message);
        }
    }
});


// < 단계 9 >
document.querySelector("#clearDoneBtn").addEventListener("click", async function() {
    const doneTodos = todos.filter(function(todo) {
        return todo.completed;
    });

    if (doneTodos.length === 0) {
        alert("완료한 일이 없습니다.");
        return;
    }

    const results = await Promise.allSettled(doneTodos.map(function(todo) {
        return request("DELETE", "/todos/" + todo.id);
    }));

    const deletedIds = [];
    let failCount = 0;

    results.forEach(function(result, index) {
        if (result.status === "fulfilled") {
            deletedIds.push(doneTodos[index].id);
        } else {
            failCount++;
        }
    });

    todos = todos.filter(function(todo) {
        return !deletedIds.includes(todo.id);
    });
    render();

    if (failCount > 0) {
        alert(failCount + "개 삭제 실패");
    }
});
