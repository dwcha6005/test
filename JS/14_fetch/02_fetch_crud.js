/*
=====================================================================================
[수업 콘티] 14_fetch / 02. fetch로 등록 · 수정 · 삭제          권장 210분 (설명 90 + 실습 120)
=====================================================================================
< 준비 >
- 인터넷 연결 필수. 02_fetch_crud.html을 열고 F12 → Network 탭.
- 01의 REST 표(GET / POST / PUT / PATCH / DELETE)를 다시 띄워 두고 시작한다.
- 중요 : JSONPlaceholder는 "연습용 가짜 서버"라서 요청에 정상 응답은 하지만 실제로 저장하지는 않는다.
  → 새로고침하면 원래대로 돌아온다. 진짜 저장은 15_module_vite의 json-server에서 한다.

< 진행 순서 >
1) 데이터를 보내는 요청의 모양 (10분) - 섹션 1
   - 판서 : fetch(url, { method, headers, body })
            body는 JSON.stringify, headers에 "Content-Type": "application/json"

2) POST (15분) - 섹션 2
   ▶ 시연 : [새 게시글 등록] → 상태 코드 201, 보낸 데이터 + id: 101이 응답으로 돌아옴
            Network 탭 → 요청 클릭 → Payload(보낸 것) / Response(받은 것) 비교
   ▶ 포인트 : 서버가 id를 붙여서 돌려준다. 화면에는 "서버가 돌려준 데이터"를 표시한다.

3) PUT vs PATCH (10분) - 섹션 3
   ▶ 시연 : [PUT] → 응답에 보낸 필드만 남음 (body를 안 보내면 body가 사라짐)
            [PATCH] → 제목만 바뀌고 나머지 필드는 그대로
   ▶ 포인트 : PUT = 통째로 교체, PATCH = 일부만 수정. 실무에서는 PATCH를 더 자주 쓴다.

4) DELETE (5분) - 섹션 4
   ▶ 시연 : [1번 게시글 삭제] → 상태 코드 200, 응답 {}

5) 공통 함수 request (10분) - 섹션 5
   - 메서드, 경로, 데이터만 바꿔서 쓰는 함수 하나로 정리. 섹션 6은 모두 이 함수를 사용

6) 실전 게시판 (40분) - 섹션 6  ★ 12-02 메모장과 같은 구조 (데이터 → 화면)
   ▶ 시연 : 페이지 열면 1번 회원 글 10개 / 제목 없이 등록 → "제목을 입력하세요."
            새 글 등록 → 버튼 "저장 중..." → 목록 맨 위에 추가
            기존 글 [수정] → 폼에 내용 채워짐 → 수정 → 목록에 반영 (PATCH)
            [삭제] → confirm → 목록에서 제거 (DELETE)
   ▶ 시연 (연습 서버의 한계) : 방금 등록한 글의 [수정] → "요청 실패 (500)"
            → 서버에 실제로 저장되지 않았기 때문. 에러 처리가 왜 필요한지 보여 주는 좋은 예
            → F5 → 모든 변경이 사라짐 → 18번 json-server 예고
   ▶ 코드 설명 순서 : posts 배열 → render → submit(등록/수정 분기) → 위임(수정/삭제)
   ▶ 포인트 : 서버 요청이 "성공한 뒤에" 배열을 바꾸고 화면을 다시 그린다.

< 예상 질문 / 자주 막히는 곳 >
- body에 객체를 그대로 넣는 실수 → JSON.stringify 필수
- headers의 Content-Type을 빼먹으면 서버가 JSON으로 읽지 못하는 경우가 있다.
- "새 글이 계속 id 101이에요" → 연습 서버는 저장하지 않으므로 항상 101을 돌려준다.
  (화면에서 구분하기 위해 섹션 6에서는 새 글에 임시 id를 붙인다.)

< 실습 연결 : 02_fetch_crud_test.html / .js (할 일 관리 - 단계별 미션) >
- 수업 시간 : 단계 1 ~ 6
- 과제      : 단계 7 ~ 10
=====================================================================================
*/


/*
    < 1. 데이터를 보내는 요청 >

    fetch(url, {
        method: "POST",                                   // 메서드 (기본값은 GET)
        headers: { "Content-Type": "application/json" },  // 보내는 데이터가 JSON이라고 알림
        body: JSON.stringify(data)                        // 객체 → JSON 문자열
    });

    메서드    용도             body
    ------------------------------------------
    GET       조회             없음
    POST      등록             보낼 데이터
    PUT       전체 수정        수정할 전체 데이터
    PATCH     일부 수정        바꿀 필드만
    DELETE    삭제             없음
*/

const BASE_URL = "https://jsonplaceholder.typicode.com";

function show(element, value) {
    element.textContent = typeof value === "string" ? value : JSON.stringify(value, null, 2);
}


/*
    < 2. POST - 등록 >

    성공하면 서버는 보통 201 Created와 함께 "저장된 데이터(id 포함)"를 돌려준다.
*/

document.querySelector("#postBtn").addEventListener("click", async function() {
    const postResult = document.querySelector("#postResult");
    show(postResult, "요청 중...");

    const newPost = {
        title: "fetch로 등록한 글",
        body: "POST 요청 연습입니다.",
        userId: 1
    };

    try {
        const response = await fetch(BASE_URL + "/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost)
        });

        console.log("상태 코드 : " + response.status);   // 201

        const saved = await response.json();
        show(postResult, "상태 코드 " + response.status + "\n" + JSON.stringify(saved, null, 2));
    } catch (error) {
        show(postResult, "오류 : " + error.message);
    }
});


/*
    < 3. PUT과 PATCH - 수정 >

    PUT   : 대상을 "보낸 데이터로 통째로 교체"한다. 보내지 않은 필드는 사라질 수 있다.
    PATCH : "보낸 필드만" 수정한다. 나머지는 그대로 유지된다.
*/

const updateResult = document.querySelector("#updateResult");

document.querySelector("#putBtn").addEventListener("click", async function() {
    show(updateResult, "요청 중...");

    try {
        const response = await fetch(BASE_URL + "/posts/1", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: 1, title: "PUT으로 바꾼 제목", userId: 1 })   // body 필드 없음
        });

        const data = await response.json();
        show(updateResult, "PUT 결과 (body 필드가 사라짐)\n" + JSON.stringify(data, null, 2));
    } catch (error) {
        show(updateResult, "오류 : " + error.message);
    }
});

document.querySelector("#patchBtn").addEventListener("click", async function() {
    show(updateResult, "요청 중...");

    try {
        const response = await fetch(BASE_URL + "/posts/1", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: "PATCH로 바꾼 제목" })
        });

        const data = await response.json();
        show(updateResult, "PATCH 결과 (나머지 필드 유지)\n" + JSON.stringify(data, null, 2));
    } catch (error) {
        show(updateResult, "오류 : " + error.message);
    }
});


/*
    < 4. DELETE - 삭제 >
*/

document.querySelector("#deleteBtn").addEventListener("click", async function() {
    const deleteResult = document.querySelector("#deleteResult");
    show(deleteResult, "요청 중...");

    try {
        const response = await fetch(BASE_URL + "/posts/1", { method: "DELETE" });
        show(deleteResult, "상태 코드 " + response.status + " / ok : " + response.ok);
    } catch (error) {
        show(deleteResult, "오류 : " + error.message);
    }
});


/*
    < 5. 공통 함수 request(method, path, data) >

    - data가 있으면 JSON으로 변환하여 body에 넣는다.
    - response.ok가 false이면 에러를 발생시킨다. (01 섹션 6)
    - 응답 데이터를 반환한다.

    사용 예
    await request("GET", "/posts?userId=1");
    await request("POST", "/posts", { title, body });
    await request("PATCH", "/posts/3", { title });
    await request("DELETE", "/posts/3");
*/

async function request(method, path, data) {
    const options = { method: method, headers: {} };

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


/*
    < 6. 실전 - 게시판 >

    구조는 12-02 메모장과 같다. 차이는 "저장 위치"가 localStorage가 아니라 서버라는 것뿐이다.

        사용자 동작 → 서버 요청 → (성공하면) posts 배열 수정 → render()

    - 서버 요청이 실패하면 배열과 화면을 바꾸지 않고 에러만 보여 준다.
    - 요청 중에는 버튼을 비활성화해서 같은 요청이 두 번 가지 않게 한다.

    연습 서버의 한계
    - 새 글은 항상 id 101로 응답한다. → 화면에서 구분하려고 임시 id(Date.now())를 붙인다.
    - 새 글은 실제로 저장되지 않으므로, 새 글을 수정하면 서버가 500 오류를 돌려준다.
*/

const boardForm = document.querySelector("#boardForm");
const titleInput = document.querySelector("#title");
const bodyInput = document.querySelector("#body");
const submitBtn = document.querySelector("#submitBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const formMsg = document.querySelector("#formMsg");
const boardStatus = document.querySelector("#boardStatus");
const boardList = document.querySelector("#boardList");

let posts = [];
let editingId = null;

function render() {
    boardList.replaceChildren();

    posts.forEach(function(post) {
        const div = document.createElement("div");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        div.className = "post";
        div.dataset.id = post.id;
        h3.textContent = "[" + post.id + "] " + post.title;
        p.textContent = post.body;

        editBtn.type = "button";
        editBtn.dataset.action = "edit";
        editBtn.textContent = "수정";

        deleteBtn.type = "button";
        deleteBtn.dataset.action = "delete";
        deleteBtn.textContent = "삭제";

        div.append(h3, p, editBtn, " ", deleteBtn);
        boardList.append(div);
    });

    boardStatus.textContent = "게시글 " + posts.length + "개";
}

function resetForm() {
    boardForm.reset();
    editingId = null;
    submitBtn.textContent = "등록";
    cancelBtn.hidden = true;
}

// 목록 불러오기 (GET)
async function loadPosts() {
    boardStatus.className = "loading";
    boardStatus.textContent = "불러오는 중...";

    try {
        posts = await request("GET", "/posts?userId=1");
        boardStatus.className = "";
        render();
    } catch (error) {
        boardStatus.className = "error";
        boardStatus.textContent = error.message;
    }
}

// 등록 (POST) / 수정 (PATCH)
boardForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(boardForm));   // { title, body } (11-01)

    if (data.title.trim() === "") {
        formMsg.className = "error";
        formMsg.textContent = "제목을 입력하세요.";
        titleInput.focus();
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "저장 중...";
    formMsg.textContent = "";

    try {
        if (editingId === null) {
            const saved = await request("POST", "/posts", { ...data, userId: 1 });
            console.log("서버 응답 :", saved);

            saved.id = Date.now();   // 연습 서버는 항상 101 → 화면 구분용 임시 id
            posts.unshift(saved);
        } else {
            const updated = await request("PATCH", "/posts/" + editingId, data);

            const index = posts.findIndex(function(p) {
                return p.id === editingId;
            });
            posts[index] = { ...posts[index], ...updated };
        }

        render();
        resetForm();
    } catch (error) {
        formMsg.className = "error";
        formMsg.textContent = error.message;
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = editingId === null ? "등록" : "수정 완료";
    }
});

cancelBtn.addEventListener("click", resetForm);

// 수정 / 삭제 (이벤트 위임)
boardList.addEventListener("click", async function(event) {
    const button = event.target.closest("button");

    if (button === null) {
        return;
    }

    const id = Number(button.closest(".post").dataset.id);
    const post = posts.find(function(p) {
        return p.id === id;
    });

    if (button.dataset.action === "edit") {
        titleInput.value = post.title;
        bodyInput.value = post.body;
        editingId = id;
        submitBtn.textContent = "수정 완료";
        cancelBtn.hidden = false;
        titleInput.focus();
        return;
    }

    if (button.dataset.action === "delete") {
        if (!confirm("'" + post.title + "' 글을 삭제할까요?")) {
            return;
        }

        button.disabled = true;

        try {
            await request("DELETE", "/posts/" + id);

            posts = posts.filter(function(p) {
                return p.id !== id;
            });

            if (editingId === id) {
                resetForm();
            }

            render();
        } catch (error) {
            button.disabled = false;
            alert(error.message);
        }
    }
});

loadPosts();


/*
    < 7. 정리 >

    fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })

    POST   등록 → 서버가 id를 붙여 돌려준다 (201)
    PUT    전체 교체 / PATCH 일부 수정
    DELETE 삭제

    화면 갱신 순서 : 서버 요청 성공 → 배열 수정 → render()
    { ...객체, ...바꿀값 } : 전개 연산자로 기존 객체에 수정된 값 덮어쓰기 (React state에서 매일 쓰는 문법)
*/
