/*
< 학생용 실습 문제 >

주제: 커뮤니티 게시판을 async / await로 만들기
규칙: 이 파일에서는 then / catch 대신 async / await + try / catch를 사용한다.
참고: 사용할 수 있는 api 함수는 fake_api.js 맨 위 주석을 확인한다.

=====================================================================================
[기초]
=====================================================================================

< 문제 1. async 함수 만들기 >
① 회원 번호를 받아 그 회원의 이름만 반환하는 async 함수 getUserName(id)를 작성하시오.
② nameBtn을 클릭하면 getUserName(2)의 결과를 nameResult에 "2번 회원 : 김철수"로 표시하시오.
③ getUserName(2)를 await 없이 console.log 하면 무엇이 출력되는지 확인하고 주석으로 작성하시오.


< 문제 2. await + try / catch >
① usersBtn을 클릭하면 회원 목록을 불러와 userList에 "홍길동 (서울)" 형식으로 표시하시오.
② "실패시키기"가 체크되어 있으면 요청 전에 api.failNext()를 호출하시오.
③ 실패하면 userList에 error.message를 빨간색으로 표시하시오.


< 문제 3. 02 문제 5를 async / await로 다시 만들기 >
① orderBtn을 클릭하면 주문 → 상품을 차례로 조회하여
   orderDetail에 "무선 이어폰 2개 (178,000원) - 배송 중"을 표시하시오.
② 02에서는 order를 다음 then에서 쓰기 위해 바깥 변수가 필요했다.
   async / await에서는 어떻게 달라지는지 주석으로 작성하시오.


< 문제 4. finally - 로딩 처리 >
① countBtn을 클릭하면 1번 회원의 게시글 수를 countResult에 "게시글 2개"로 표시하시오.
② 요청 중에는 버튼을 비활성화하고 버튼 문구를 "조회 중..."으로 바꾸시오.
③ finally에서 버튼을 원래대로 되돌리시오.


=====================================================================================
[응용]
=====================================================================================

< 문제 5. 로딩 / 성공 / 에러 상태로 화면 그리기 >
① productState = { status: "idle", data: null, error: null } 상태 객체를 만드시오.
② 상태에 따라 productBox를 그리는 renderProducts() 함수를 작성하시오.
   - idle    : "상품 목록 버튼을 누르세요."
   - loading : "불러오는 중..." + productsBtn 비활성화
   - success : 상품 이름 목록 (ul)
   - error   : 에러 메시지 + [다시 시도] 버튼 (누르면 다시 불러오기)
③ loadProducts() 함수에서는 상태만 바꾸고 renderProducts()를 호출하시오.


< 문제 6. Promise.all로 동시에 >
① profileBtn을 클릭하면 선택한 회원의 정보(getUser)와 게시글(getPosts)을 동시에 요청하시오.
② profileResult에 "홍길동 (서울) - 게시글 2개 / 1.0초"를 표시하시오.
③ 배열 구조 분해 할당으로 결과를 받으시오.  const [user, posts] = await Promise.all([...]);


< 문제 7. 반복문과 await >
① seqBtn : 1, 2, 3번 회원의 게시글 수를 for...of로 "순서대로" 조회하시오.
   - 하나 끝날 때마다 progress에 "1 / 3 완료"처럼 진행 상황을 표시하시오.
   - statList에 "1번 회원 : 2개" li를 추가하시오.
② parallelBtn : 같은 작업을 map + Promise.all로 "동시에" 처리하시오.
③ 두 방식 모두 마지막에 progress에 걸린 시간을 표시하고 비교하시오.


=====================================================================================
[심화]
=====================================================================================

< 문제 8. 대시보드 - 독립적인 로딩 >
① 페이지가 열리면 회원 수, 상품 수, 제주 날씨를 "동시에" 불러와 각 카드의 p에 표시하시오.
② 각 카드는 따로 "불러오는 중..."을 표시하고, 먼저 도착한 카드부터 바로 표시하시오.
③ 하나가 실패해도 나머지 카드는 정상적으로 표시되어야 한다. (실패한 카드만 에러 표시)
④ 힌트) 카드마다 async 함수를 만들고, 각 함수 안에서 try / catch를 한다.
        세 함수를 await 없이 차례로 호출하면 동시에 시작된다.
⑤ dashboardBtn을 클릭하면 상품 요청만 실패하도록 만들고 대시보드를 다시 불러오시오.
   힌트) 상품 카드 함수를 가장 먼저 호출하고 그 직전에 api.failNext()


< 문제 9. 게시글 + 각 게시글의 댓글 수 >
① postsBtn을 클릭하면 선택한 회원의 게시글을 불러오시오.
② 각 게시글의 댓글을 Promise.all로 "동시에" 불러오시오.
③ postList에 "비동기 처음 배워요 (댓글 2)" 형식으로 표시하시오.
④ 게시글이 없으면 "작성한 게시글이 없습니다."를 표시하시오.


< 문제 10. 검색 자동완성 (디바운스 + 최신 응답만 반영) >
① searchInput에 입력할 때 0.3초 동안 입력이 없으면 검색하시오. (01 문제 10 디바운스)
② 검색은 api.getProducts()로 전체 상품을 받아 이름에 검색어가 포함된 상품만 표시하시오.
③ 검색 중에는 searchStatus에 "검색 중..."을, 끝나면 "n건"을 표시하시오. 결과가 없으면 "검색 결과 없음"
④ 빈 검색어면 목록과 상태를 비우시오.
⑤ 늦게 도착한 이전 검색 결과가 최신 결과를 덮어쓰지 않도록 요청 번호를 사용하시오.
   (03 수업자료 섹션 7 참고)
*/


// < 강사용 정답 >

// < 문제 1 >
async function getUserName(id) {
    const user = await api.getUser(id);
    return user.name;
}

document.querySelector("#nameBtn").addEventListener("click", async function() {
    const nameResult = document.querySelector("#nameResult");
    nameResult.textContent = "불러오는 중...";

    console.log(getUserName(2));   // Promise {<pending>}

    const name = await getUserName(2);
    nameResult.textContent = "2번 회원 : " + name;
});

// await 없이 출력하면 이름이 아니라 Promise {<pending>}이 출력된다.
// async 함수는 항상 Promise를 반환하므로, 값을 꺼내려면 await(또는 then)가 필요하다.


// < 문제 2 >
const userList = document.querySelector("#userList");

document.querySelector("#usersBtn").addEventListener("click", async function() {
    if (document.querySelector("#usersFail").checked) {
        api.failNext();
    }

    userList.textContent = "불러오는 중...";

    try {
        const users = await api.getUsers();
        userList.replaceChildren();

        users.forEach(function(user) {
            const li = document.createElement("li");
            li.textContent = user.name + " (" + user.city + ")";
            userList.append(li);
        });
    } catch (error) {
        userList.replaceChildren();

        const li = document.createElement("li");
        li.className = "error";
        li.textContent = error.message;
        userList.append(li);
    }
});


// < 문제 3 >
const orderDetail = document.querySelector("#orderDetail");

document.querySelector("#orderBtn").addEventListener("click", async function() {
    const orderNo = document.querySelector("#orderInput").value.trim().toUpperCase();

    orderDetail.className = "loading";
    orderDetail.textContent = "조회 중...";

    try {
        const order = await api.getOrder(orderNo);
        const product = await api.getProduct(order.productId);
        const total = product.price * order.qty;

        orderDetail.className = "result";
        orderDetail.textContent =
            product.name + " " + order.qty + "개 (" + total.toLocaleString() + "원) - " + order.status;
    } catch (error) {
        orderDetail.className = "error";
        orderDetail.textContent = error.message;
    }
});

// async / await에서는 order와 product가 같은 함수 안의 일반 변수이므로
// 바깥 변수나 중첩 없이 그대로 함께 사용할 수 있다.


// < 문제 4 >
const countBtn = document.querySelector("#countBtn");

countBtn.addEventListener("click", async function() {
    const countResult = document.querySelector("#countResult");

    countBtn.disabled = true;
    countBtn.textContent = "조회 중...";

    try {
        const posts = await api.getPosts(1);
        countResult.textContent = "게시글 " + posts.length + "개";
    } catch (error) {
        countResult.textContent = error.message;
    } finally {
        countBtn.disabled = false;
        countBtn.textContent = "1번 회원 게시글 수";
    }
});


// < 문제 5 >
const productsBtn = document.querySelector("#productsBtn");
const productBox = document.querySelector("#productBox");

let productState = { status: "idle", data: null, error: null };

function renderProducts() {
    productBox.replaceChildren();
    productsBtn.disabled = productState.status === "loading";

    if (productState.status === "idle") {
        productBox.textContent = "상품 목록 버튼을 누르세요.";
    } else if (productState.status === "loading") {
        productBox.className = "loading";
        productBox.textContent = "불러오는 중...";
    } else if (productState.status === "success") {
        const ul = document.createElement("ul");

        productState.data.forEach(function(p) {
            const li = document.createElement("li");
            li.textContent = p.name;
            ul.append(li);
        });

        productBox.className = "";
        productBox.append(ul);
    } else if (productState.status === "error") {
        const retryBtn = document.createElement("button");
        retryBtn.type = "button";
        retryBtn.textContent = "다시 시도";
        retryBtn.addEventListener("click", loadProducts);

        productBox.className = "error";
        productBox.append(productState.error + " ", retryBtn);
    }
}

async function loadProducts() {
    if (document.querySelector("#productsFail").checked) {
        api.failNext();
    }

    productState = { status: "loading", data: null, error: null };
    renderProducts();

    try {
        const products = await api.getProducts();
        productState = { status: "success", data: products, error: null };
    } catch (error) {
        productState = { status: "error", data: null, error: error.message };
    }

    renderProducts();
}

productsBtn.addEventListener("click", loadProducts);
renderProducts();


// < 문제 6 >
document.querySelector("#profileBtn").addEventListener("click", async function() {
    const id = Number(document.querySelector("#profileSelect").value);
    const profileResult = document.querySelector("#profileResult");
    const start = Date.now();

    profileResult.textContent = "불러오는 중...";

    try {
        const [user, posts] = await Promise.all([api.getUser(id), api.getPosts(id)]);
        const sec = ((Date.now() - start) / 1000).toFixed(1);

        profileResult.textContent =
            user.name + " (" + user.city + ") - 게시글 " + posts.length + "개 / " + sec + "초";
    } catch (error) {
        profileResult.textContent = error.message;
    }
});


// < 문제 7 >
const progress = document.querySelector("#progress");
const statList = document.querySelector("#statList");
const memberIds = [1, 2, 3];

function addStat(id, count) {
    const li = document.createElement("li");
    li.textContent = id + "번 회원 : " + count + "개";
    statList.append(li);
}

document.querySelector("#seqBtn").addEventListener("click", async function() {
    statList.replaceChildren();
    const start = Date.now();
    let done = 0;

    for (const id of memberIds) {
        const posts = await api.getPosts(id);
        addStat(id, posts.length);

        done++;
        progress.textContent = done + " / " + memberIds.length + " 완료";
    }

    progress.textContent = "순서대로 완료 : " + ((Date.now() - start) / 1000).toFixed(1) + "초";
});

document.querySelector("#parallelBtn").addEventListener("click", async function() {
    statList.replaceChildren();
    progress.textContent = "동시에 요청 중...";
    const start = Date.now();

    const results = await Promise.all(memberIds.map(function(id) {
        return api.getPosts(id);
    }));

    results.forEach(function(posts, index) {
        addStat(memberIds[index], posts.length);
    });

    progress.textContent = "동시에 완료 : " + ((Date.now() - start) / 1000).toFixed(1) + "초";
});


// < 문제 8 >
function setCard(cardId, text, className) {
    const p = document.querySelector("#" + cardId + " p");
    p.textContent = text;
    p.className = className || "";
}

async function loadUsersCard() {
    setCard("cardUsers", "불러오는 중...", "loading");
    try {
        const users = await api.getUsers();
        setCard("cardUsers", users.length + "명", "result");
    } catch (error) {
        setCard("cardUsers", error.message, "error");
    }
}

async function loadProductsCard() {
    setCard("cardProducts", "불러오는 중...", "loading");
    try {
        const products = await api.getProducts();
        setCard("cardProducts", products.length + "개", "result");
    } catch (error) {
        setCard("cardProducts", error.message, "error");
    }
}

async function loadWeatherCard() {
    setCard("cardWeather", "불러오는 중...", "loading");
    try {
        const weather = await api.getWeather("제주");
        setCard("cardWeather", weather.temp + "도 " + weather.sky, "result");
    } catch (error) {
        setCard("cardWeather", error.message, "error");
    }
}

function loadDashboard() {
    // await 없이 호출 → 세 요청이 동시에 시작되고, 각자 끝나는 대로 화면에 표시된다.
    loadProductsCard();
    loadUsersCard();
    loadWeatherCard();
}

document.querySelector("#dashboardBtn").addEventListener("click", function() {
    api.failNext();      // 바로 다음 요청(상품)만 실패
    loadDashboard();
});

loadDashboard();


// < 문제 9 >
const postList = document.querySelector("#postList");

document.querySelector("#postsBtn").addEventListener("click", async function() {
    const userId = Number(document.querySelector("#writerSelect").value);
    postList.textContent = "불러오는 중...";

    try {
        const posts = await api.getPosts(userId);

        if (posts.length === 0) {
            postList.textContent = "작성한 게시글이 없습니다.";
            return;
        }

        const commentsList = await Promise.all(posts.map(function(post) {
            return api.getComments(post.id);
        }));

        postList.replaceChildren();

        posts.forEach(function(post, index) {
            const li = document.createElement("li");
            li.textContent = post.title + " (댓글 " + commentsList[index].length + ")";
            postList.append(li);
        });
    } catch (error) {
        postList.textContent = error.message;
    }
});


// < 문제 10 >
const searchInput = document.querySelector("#searchInput");
const searchStatus = document.querySelector("#searchStatus");
const searchList = document.querySelector("#searchList");

let searchTimer = null;
let latestSearch = 0;

async function searchProducts(keyword) {
    const requestNo = ++latestSearch;
    searchStatus.textContent = "검색 중...";

    try {
        const products = await api.getProducts();

        if (requestNo !== latestSearch) {
            return;   // 더 최신 검색이 있으므로 이 결과는 버린다.
        }

        const found = products.filter(function(p) {
            return p.name.includes(keyword);
        });

        searchList.replaceChildren();

        found.forEach(function(p) {
            const li = document.createElement("li");
            li.textContent = p.name + " - " + p.price.toLocaleString() + "원";
            searchList.append(li);
        });

        searchStatus.textContent = found.length === 0 ? "검색 결과 없음" : found.length + "건";
    } catch (error) {
        if (requestNo === latestSearch) {
            searchStatus.textContent = error.message;
        }
    }
}

searchInput.addEventListener("input", function() {
    clearTimeout(searchTimer);

    const keyword = searchInput.value.trim();

    if (keyword === "") {
        latestSearch++;   // 진행 중인 검색 결과도 무시
        searchList.replaceChildren();
        searchStatus.textContent = "";
        return;
    }

    searchTimer = setTimeout(function() {
        searchProducts(keyword);
    }, 300);
});
