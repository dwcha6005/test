/*
< 학생용 실습 문제 >

주제: 공개 API로 회원, 게시글, 상품 정보 조회하기 (GET)
규칙: async / await + try / catch를 사용한다.
준비: 문제를 풀기 전에 각 URL을 브라우저 주소창에 직접 열어서 응답 JSON 구조를 먼저 확인한다.

=====================================================================================
[기초]
=====================================================================================

< 문제 1. 객체 하나 + 중첩 객체 >
URL : https://jsonplaceholder.typicode.com/users/1
① userBtn을 클릭하면 1번 회원 정보를 가져오시오.
② userCard에 "이름 (이메일) - 도시 / 회사명" 형식으로 표시하시오.
   (도시는 address.city, 회사명은 company.name 에 있다.)


< 문제 2. 배열 → 표 >
URL : https://jsonplaceholder.typicode.com/users
① usersBtn을 클릭하면 회원 목록을 가져와 userTable에 표로 표시하시오.
② 열 : 번호(id), 이름(name), 이메일(email), 회사(company.name)
③ 첫 행은 th로 된 제목 행으로 만드시오.


< 문제 3. 받아온 데이터 가공 >
URL : https://jsonplaceholder.typicode.com/todos?userId=1
① todoCountBtn을 클릭하면 1번 회원의 할 일 목록을 가져오시오.
② 완료(completed가 true)된 개수를 세어 todoCount에 "전체 20개 중 11개 완료 (55%)" 형식으로 표시하시오.
   (숫자는 실제 응답 결과에 따라 다를 수 있다.)


< 문제 4. getJSON 함수 + 404 처리 >
① 수업에서 만든 getJSON(url) 함수를 직접 작성하시오. (response.ok가 false이면 throw)
② postBtn을 클릭하면 postId에 입력한 번호의 게시글(/posts/번호)을 조회하시오.
③ 성공하면 postResult에 "[1] 게시글 제목"을, 실패하면 에러 메시지를 빨간색으로 표시하시오.
④ 1, 100, 101, 0 을 각각 입력해 결과를 확인하시오. (게시글은 1 ~ 100번까지 있다.)


=====================================================================================
[응용]
=====================================================================================

< 문제 5. 상세 + 댓글 동시 요청 >
URL : /posts/1  ,  /posts/1/comments
① detailBtn을 클릭하면 두 요청을 Promise.all로 동시에 보내시오.
② detailBox에 아래 형태로 표시하시오. (h3 제목, p 본문, ul 댓글 목록)
   - 제목 / 본문 / "댓글 5개" / 댓글 작성자 이메일 : 댓글 내용
③ 요청 중에는 "불러오는 중...", 실패하면 에러 메시지를 표시하시오.


< 문제 6. 조건 조회 + 화면 필터 >
URL : /todos?userId=번호
① todoUser를 바꿀 때마다 해당 회원의 할 일을 가져오시오. (페이지가 열릴 때 1번 회원 자동 조회)
② 가져온 배열은 변수에 저장해 두고, todoFilter 라디오(전체 / 완료 / 미완료)를 바꾸면
   서버에 다시 요청하지 않고 저장된 배열을 filter해서 다시 그리시오.
③ 완료된 항목은 done 클래스, todoStatus에 "표시 7개 / 전체 20개"를 표시하시오.
④ "서버에 다시 요청하지 않는 것"이 좋은 이유를 주석으로 작성하시오.


< 문제 7. select 채우기 + 선택 결과 (DummyJSON) >
URL : https://dummyjson.com/products/category-list                  (카테고리 이름 배열)
      https://dummyjson.com/products/category/카테고리?limit=5&select=title,price
① 페이지가 열리면 카테고리 목록을 가져와 categorySelect의 option으로 채우시오.
② 카테고리를 선택하면 해당 카테고리 상품 5개를 categoryProducts에 "상품명 - $가격"으로 표시하시오.
③ select=title,price 는 필요한 필드만 받아오는 옵션이다. Network 탭에서 응답 크기를 비교해 보시오.


=====================================================================================
[심화]
=====================================================================================

< 문제 8. 페이지 번호 버튼 (DummyJSON 게시글) >
URL : https://dummyjson.com/posts?limit=10&skip=0&select=title
      응답 : { posts: [...], total: 251, skip: 0, limit: 10 }
① 페이지가 열리면 1페이지(10개)를 pagePosts에 표시하시오.
② total로 전체 페이지 수를 계산하시오.  Math.ceil(total / 10)
③ pageButtons에 현재 페이지 기준 앞뒤 2개씩, 최대 5개의 번호 버튼을 만드시오.
   예) 현재 7페이지 → [5] [6] [7] [8] [9]   /  현재 1페이지 → [1] [2] [3] [4] [5]
④ 현재 페이지 버튼에는 current 클래스를 적용하고, 번호 버튼을 누르면 해당 페이지를 불러오시오.
⑤ 맨 앞에 [처음], 맨 뒤에 [끝] 버튼도 추가하시오.
⑥ pageInfo에 "7 / 26 페이지"를 표시하시오.
⑦ 버튼 클릭은 pageButtons에 이벤트 위임으로 처리하시오. (data-page 속성 활용)


< 문제 9. 실시간 검색 + 이전 요청 취소 (AbortController) >
URL : https://dummyjson.com/products/search?q=검색어&limit=5&select=title,price
① liveSearch에 입력하고 0.4초 동안 입력이 없으면 검색하시오. (디바운스)
② 새 검색을 시작할 때 아직 끝나지 않은 이전 요청은 AbortController로 취소하시오.

    const controller = new AbortController();
    fetch(url, { signal: controller.signal });
    controller.abort();   // 요청 취소 → fetch가 AbortError로 실패한다

③ 취소로 인한 실패(error.name === "AbortError")는 화면에 에러로 표시하지 마시오.
④ liveStatus에 "검색 중..." / "5건" / "검색 결과 없음"을 표시하시오. 빈 검색어면 모두 비우시오.
⑤ 13_async의 "요청 번호" 방식과 비교하여 장점을 주석으로 작성하시오.


< 문제 10. 대시보드 - 일부 실패해도 나머지 표시 >
① dashboardBtn을 클릭하면 아래 4개 요청을 동시에 보내시오.
   - 회원 수   : https://jsonplaceholder.typicode.com/users        (배열 길이)
   - 게시글 수 : https://jsonplaceholder.typicode.com/posts        (배열 길이)
   - 상품 수   : https://dummyjson.com/products?limit=1           (응답의 total)
   - 공지      : https://jsonplaceholder.typicode.com/notices      (존재하지 않는 주소 → 404)
② Promise.allSettled를 사용하여 성공한 카드는 숫자를, 실패한 카드는 에러 메시지를 빨간색으로 표시하시오.
③ 각 카드는 요청 전에 "불러오는 중..."을 표시하시오.
*/


// < 강사용 정답 >

const JSONP = "https://jsonplaceholder.typicode.com";
const DUMMY = "https://dummyjson.com";

// < 문제 4 ① > 공통 함수 (모든 문제에서 사용)
async function getJSON(url, options) {
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error("요청 실패 (" + response.status + ")");
    }

    return response.json();
}

function setStatus(element, text, className) {
    element.textContent = text;
    element.className = className || "";
}


// < 문제 1 >
document.querySelector("#userBtn").addEventListener("click", async function() {
    const userCard = document.querySelector("#userCard");
    setStatus(userCard, "불러오는 중...", "loading");

    try {
        const user = await getJSON(JSONP + "/users/1");

        setStatus(userCard,
            user.name + " (" + user.email + ") - " + user.address.city + " / " + user.company.name,
            "result");
    } catch (error) {
        setStatus(userCard, error.message, "error");
    }
});


// < 문제 2 >
document.querySelector("#usersBtn").addEventListener("click", async function() {
    const table = document.querySelector("#userTable");
    table.textContent = "불러오는 중...";

    try {
        const users = await getJSON(JSONP + "/users");
        table.replaceChildren();

        const headRow = document.createElement("tr");
        ["번호", "이름", "이메일", "회사"].forEach(function(title) {
            const th = document.createElement("th");
            th.textContent = title;
            headRow.append(th);
        });
        table.append(headRow);

        users.forEach(function(user) {
            const tr = document.createElement("tr");

            [user.id, user.name, user.email, user.company.name].forEach(function(value) {
                const td = document.createElement("td");
                td.textContent = value;
                tr.append(td);
            });

            table.append(tr);
        });
    } catch (error) {
        table.textContent = error.message;
    }
});


// < 문제 3 >
document.querySelector("#todoCountBtn").addEventListener("click", async function() {
    const todoCount = document.querySelector("#todoCount");
    setStatus(todoCount, "불러오는 중...", "loading");

    try {
        const todos = await getJSON(JSONP + "/todos?userId=1");
        const doneCount = todos.filter(function(todo) {
            return todo.completed;
        }).length;
        const percent = Math.round(doneCount / todos.length * 100);

        setStatus(todoCount,
            "전체 " + todos.length + "개 중 " + doneCount + "개 완료 (" + percent + "%)",
            "result");
    } catch (error) {
        setStatus(todoCount, error.message, "error");
    }
});


// < 문제 4 >
document.querySelector("#postBtn").addEventListener("click", async function() {
    const id = document.querySelector("#postId").value;
    const postResult = document.querySelector("#postResult");
    setStatus(postResult, "불러오는 중...", "loading");

    try {
        const post = await getJSON(JSONP + "/posts/" + id);
        setStatus(postResult, "[" + post.id + "] " + post.title, "result");
    } catch (error) {
        setStatus(postResult, error.message, "error");
    }
});


// < 문제 5 >
document.querySelector("#detailBtn").addEventListener("click", async function() {
    const detailBox = document.querySelector("#detailBox");
    setStatus(detailBox, "불러오는 중...", "loading");

    try {
        const [post, comments] = await Promise.all([
            getJSON(JSONP + "/posts/1"),
            getJSON(JSONP + "/posts/1/comments")
        ]);

        const h3 = document.createElement("h3");
        const body = document.createElement("p");
        const count = document.createElement("p");
        const ul = document.createElement("ul");

        h3.textContent = post.title;
        body.textContent = post.body;
        count.textContent = "댓글 " + comments.length + "개";

        comments.forEach(function(c) {
            const li = document.createElement("li");
            li.textContent = c.email + " : " + c.body;
            ul.append(li);
        });

        setStatus(detailBox, "", "");
        detailBox.append(h3, body, count, ul);
    } catch (error) {
        setStatus(detailBox, error.message, "error");
    }
});


// < 문제 6 >
const todoUser = document.querySelector("#todoUser");
const todoStatus = document.querySelector("#todoStatus");
const todoList = document.querySelector("#todoList");
let userTodos = [];

function renderTodos() {
    const filter = document.querySelector('input[name="todoFilter"]:checked').value;

    const shown = userTodos.filter(function(todo) {
        if (filter === "done") return todo.completed;
        if (filter === "todo") return !todo.completed;
        return true;
    });

    todoList.replaceChildren();

    shown.forEach(function(todo) {
        const li = document.createElement("li");
        li.textContent = todo.title;
        if (todo.completed) {
            li.className = "done";
        }
        todoList.append(li);
    });

    setStatus(todoStatus, "표시 " + shown.length + "개 / 전체 " + userTodos.length + "개", "result");
}

async function loadTodos() {
    setStatus(todoStatus, "불러오는 중...", "loading");
    todoList.replaceChildren();

    try {
        userTodos = await getJSON(JSONP + "/todos?userId=" + todoUser.value);
        renderTodos();
    } catch (error) {
        setStatus(todoStatus, error.message, "error");
    }
}

todoUser.addEventListener("change", loadTodos);

document.querySelectorAll('input[name="todoFilter"]').forEach(function(radio) {
    radio.addEventListener("change", renderTodos);
});

loadTodos();

// 이미 가진 데이터로 화면만 다시 그리면 기다릴 필요가 없어 즉시 바뀌고,
// 서버 요청 횟수(비용)와 네트워크 사용량도 줄일 수 있다.


// < 문제 7 >
const categorySelect = document.querySelector("#categorySelect");
const categoryProducts = document.querySelector("#categoryProducts");

async function loadCategories() {
    try {
        const categories = await getJSON(DUMMY + "/products/category-list");

        categorySelect.replaceChildren(new Option("카테고리를 선택하세요", ""));

        categories.forEach(function(name) {
            categorySelect.append(new Option(name, name));
        });
    } catch (error) {
        categorySelect.replaceChildren(new Option(error.message, ""));
    }
}

categorySelect.addEventListener("change", async function() {
    if (categorySelect.value === "") {
        categoryProducts.replaceChildren();
        return;
    }

    categoryProducts.textContent = "불러오는 중...";

    try {
        const data = await getJSON(
            DUMMY + "/products/category/" + categorySelect.value + "?limit=5&select=title,price"
        );

        categoryProducts.replaceChildren();

        data.products.forEach(function(p) {
            const li = document.createElement("li");
            li.textContent = p.title + " - $" + p.price;
            categoryProducts.append(li);
        });
    } catch (error) {
        categoryProducts.textContent = error.message;
    }
});

loadCategories();


// < 문제 8 >
const PAGE_SIZE = 10;
const pagePosts = document.querySelector("#pagePosts");
const pageButtons = document.querySelector("#pageButtons");
const pageInfo = document.querySelector("#pageInfo");

function makePageButton(label, page, isCurrent) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.dataset.page = page;

    if (isCurrent) {
        button.className = "current";
    }

    return button;
}

function renderPageButtons(page, totalPages) {
    pageButtons.replaceChildren();

    // 현재 페이지 기준 앞뒤 2개, 최대 5개
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + 4);
    start = Math.max(1, end - 4);   // 끝 쪽에서도 5개가 되도록 보정

    pageButtons.append(makePageButton("처음", 1, false));

    for (let i = start; i <= end; i++) {
        pageButtons.append(makePageButton(i, i, i === page));
    }

    pageButtons.append(makePageButton("끝", totalPages, false));
}

async function loadPage(page) {
    pagePosts.textContent = "불러오는 중...";

    try {
        const skip = (page - 1) * PAGE_SIZE;
        const data = await getJSON(DUMMY + "/posts?limit=" + PAGE_SIZE + "&skip=" + skip + "&select=title");
        const totalPages = Math.ceil(data.total / PAGE_SIZE);

        pagePosts.replaceChildren();
        pagePosts.start = skip + 1;   // ol 번호를 이어서 표시

        data.posts.forEach(function(post) {
            const li = document.createElement("li");
            li.textContent = post.title;
            pagePosts.append(li);
        });

        renderPageButtons(page, totalPages);
        pageInfo.textContent = page + " / " + totalPages + " 페이지";
    } catch (error) {
        pagePosts.textContent = error.message;
    }
}

pageButtons.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (button !== null) {
        loadPage(Number(button.dataset.page));
    }
});

loadPage(1);


// < 문제 9 >
const liveSearch = document.querySelector("#liveSearch");
const liveStatus = document.querySelector("#liveStatus");
const liveList = document.querySelector("#liveList");

let liveTimer = null;
let liveController = null;

async function runLiveSearch(keyword) {
    if (liveController !== null) {
        liveController.abort();   // 이전 요청 취소
    }

    liveController = new AbortController();
    liveStatus.textContent = "검색 중...";

    try {
        const params = new URLSearchParams({ q: keyword, limit: 5, select: "title,price" });
        const data = await getJSON(DUMMY + "/products/search?" + params.toString(), {
            signal: liveController.signal
        });

        liveList.replaceChildren();

        data.products.forEach(function(p) {
            const li = document.createElement("li");
            li.textContent = p.title + " - $" + p.price;
            liveList.append(li);
        });

        liveStatus.textContent = data.products.length === 0 ? "검색 결과 없음" : data.products.length + "건";
    } catch (error) {
        if (error.name === "AbortError") {
            console.log("이전 검색 요청 취소됨");
            return;
        }

        liveStatus.textContent = error.message;
    }
}

liveSearch.addEventListener("input", function() {
    clearTimeout(liveTimer);

    const keyword = liveSearch.value.trim();

    if (keyword === "") {
        if (liveController !== null) {
            liveController.abort();
        }
        liveList.replaceChildren();
        liveStatus.textContent = "";
        return;
    }

    liveTimer = setTimeout(function() {
        runLiveSearch(keyword);
    }, 400);
});

// 요청 번호 방식은 이전 요청이 끝까지 진행된 뒤 결과만 버리지만,
// AbortController는 요청 자체를 취소하므로 불필요한 네트워크 사용을 줄일 수 있다.


// < 문제 10 >
document.querySelector("#dashboardBtn").addEventListener("click", async function() {
    const cards = [
        { el: document.querySelector("#cardUsers"), url: JSONP + "/users", pick: function(d) { return d.length + "명"; } },
        { el: document.querySelector("#cardPosts"), url: JSONP + "/posts", pick: function(d) { return d.length + "개"; } },
        { el: document.querySelector("#cardProducts"), url: DUMMY + "/products?limit=1", pick: function(d) { return d.total + "개"; } },
        { el: document.querySelector("#cardNotice"), url: JSONP + "/notices", pick: function(d) { return d.length + "개"; } }
    ];

    cards.forEach(function(card) {
        setStatus(card.el, "불러오는 중...", "loading");
    });

    const results = await Promise.allSettled(cards.map(function(card) {
        return getJSON(card.url);
    }));

    results.forEach(function(result, index) {
        const card = cards[index];

        if (result.status === "fulfilled") {
            setStatus(card.el, card.pick(result.value), "result");
        } else {
            setStatus(card.el, result.reason.message, "error");
        }
    });
});
