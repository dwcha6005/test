/*
=====================================================================================
[수업 콘티] 12_async / 03. async / await                     권장 150분 (설명 80 + 실습 70)
=====================================================================================
< 준비 >
- 03_async_await.html을 열고 F12 → Console 탭.
- 02_promise.js를 VS Code에서 함께 열어 두고, 같은 기능을 비교하며 설명한다.
- 페이지를 열면 섹션 7의 회원 목록 요청이 자동으로 1번 실행된다. (콘솔에 [서버] 로그)

< 진행 순서 >
1) async 함수 (8분) - 섹션 1
   ▶ 시연 : [확인] → 콘솔 "Promise {<fulfilled>: '안녕하세요'}" → then으로 받은 "안녕하세요"
   ▶ 포인트 : async를 붙이면 return 값이 자동으로 Promise에 담긴다. await는 async 함수 안에서만 쓸 수 있다.

2) await (15분) - 섹션 2  ★ 02 섹션 5(체이닝)와 나란히 비교
   ▶ 시연 : [불러오기] → 1초 간격으로 회원 → 게시글 → 댓글 (02와 같은 결과)
   ▶ 포인트 : "Promise가 끝날 때까지 기다렸다가 결과를 변수에 담는다"
              코드가 일반 코드처럼 위에서 아래로 읽힌다. then도, return 실수도 없다.

3) try / catch / finally (10분) - 섹션 3
   ▶ 시연 : "중간에 실패시키기" 체크 → 회원 후 실패 → catch에서 메시지 표시
   ▶ 포인트 : 02의 catch()가 try / catch 문으로 바뀐 것뿐이다.

4) 로딩 / 성공 / 에러 3가지 상태 (20분) - 섹션 4  ★ 오늘 수업의 핵심, React의 기본 패턴
   ▶ 시연 : 서울 [날씨 조회] → "불러오는 중..." + 버튼 비활성 → 결과 (0.5~2초 랜덤)
            인천 → "인천의 날씨 정보가 없습니다." + [다시 시도] 버튼
            "서버 오류 발생" 체크 → 에러 → 체크 해제 후 [다시 시도] → 성공
   ▶ 코드 설명 : 상태(state) 변수 하나 + 상태에 따라 화면을 그리는 render 함수
   ▶ 예고 : React에서는 이 state와 render를 React가 대신 관리해 준다.

5) 순차 vs 동시 (10분) - 섹션 5
   ▶ 시연 : [await 하나씩] 약 3초 이상 / [await Promise.all] 약 1.5~2초
   ▶ 포인트 : 서로 관계없는 요청에 await를 줄줄이 쓰면 불필요하게 느려진다.

6) 반복문과 await (10분) - 섹션 6
   ▶ 시연 : [for...of] → 1초 간격으로 1, 2, 3번 회원 게시글 수 → 마지막에 "모두 완료"
            [forEach] → "모두 완료"가 맨 먼저 찍히고 나중에 결과가 들어옴 → 기다려 주지 않는다!
            [map + Promise.all] → 약 1초 만에 3개가 한꺼번에
   ▶ 포인트 : 순서가 중요하면 for...of, 동시에 하려면 map + Promise.all. forEach + await는 쓰지 않는다.

7) 실전 예제 (7분) - 섹션 7
   ▶ 시연 : 회원 선택 → 게시글 목록 → 게시글 클릭 → 댓글 (댓글 없는 글은 "댓글이 없습니다.")
            회원을 빠르게 연속으로 바꿔도 마지막에 선택한 회원의 글만 표시된다.
   ▶ 포인트 : 요청 번호(latestRequest)로 "늦게 도착한 이전 응답"을 무시하는 방법 (React에서도 같은 문제가 생긴다)

< 예상 질문 / 자주 막히는 곳 >
- async 함수 밖에서 await를 써서 SyntaxError → 이벤트 리스너 함수에 async를 붙인다.
- await를 빼먹으면 변수에 데이터가 아니라 Promise가 들어간다. (콘솔에 Promise {<pending>})
- "then이랑 뭐가 더 좋아요?" → 결과는 같다. 실무와 React에서는 대부분 async/await를 쓴다.
- 17. Fetch 예고 : api.getUsers() 자리에 아래 두 줄이 들어갈 뿐이다.
      const response = await fetch("주소");
      const users = await response.json();

< 실습 연결 : 03_async_await_test.html / .js (커뮤니티 게시판) >
- 섹션 3까지 : 문제 1 ~ 4
- 섹션 5까지 : 문제 5 ~ 7
- 수업 마지막 / 과제 : 문제 8 ~ 10
=====================================================================================
*/


/*
    < 1. async 함수 >

    함수 앞에 async를 붙이면
    - 함수는 항상 Promise를 반환한다.
    - return 값은 자동으로 Promise에 담겨 then으로 받을 수 있다.
    - 함수 안에서 await를 사용할 수 있다.

    async function 함수명() { ... }
    const 함수명 = async function() { ... };
    const 함수명 = async () => { ... };
*/

async function sayHello() {
    return "안녕하세요";
}

document.querySelector("#asyncCheckBtn").addEventListener("click", function() {
    const result = sayHello();

    console.log(result);   // Promise {<fulfilled>: '안녕하세요'}

    result.then(function(message) {
        console.log("then으로 받은 값 : " + message);
    });
});


/*
    < 2. await - Promise가 끝날 때까지 기다리기 >

    const 결과 = await Promise;

    - Promise가 성공하면 결과 값을 꺼내 변수에 담는다.
    - 기다리는 동안 다른 코드(클릭 등)는 정상적으로 동작한다. (화면이 멈추지 않음)
    - async 함수 안에서만 사용할 수 있다.

    02의 체이닝 코드와 비교

    [Promise then]                                [async / await]
    api.getUser(1)                                const user = await api.getUser(1);
      .then(user => api.getPosts(user.id))        const posts = await api.getPosts(user.id);
      .then(posts => api.getComments(...))        const comments = await api.getComments(...);
      .then(comments => { ... })                  ...
      .catch(error => { ... });                   (에러는 try / catch로 - 섹션 3)
*/


/*
    < 3. try / catch / finally - 에러 처리 >

    try {
        // 성공했을 때의 흐름
    } catch (error) {
        // 어느 줄에서든 실패하면 여기로 (error.message)
    } finally {
        // 성공/실패와 관계없이 마지막에 실행
    }

    이벤트 리스너 함수에 async를 붙이면 그 안에서 await를 사용할 수 있다.
*/

const awaitBtn = document.querySelector("#awaitBtn");
const awaitList = document.querySelector("#awaitList");

function addAwaitLog(text, className) {
    const li = document.createElement("li");
    li.textContent = text;
    if (className) {
        li.className = className;
    }
    awaitList.append(li);
}

awaitBtn.addEventListener("click", async function() {
    awaitList.replaceChildren();
    awaitBtn.disabled = true;
    addAwaitLog("요청 시작...");

    try {
        const user = await api.getUser(1);
        addAwaitLog("회원 : " + user.name);

        if (document.querySelector("#awaitFail").checked) {
            api.failNext();
        }

        const posts = await api.getPosts(user.id);
        addAwaitLog("게시글 : " + posts.length + "개 (첫 글 : " + posts[0].title + ")");

        const comments = await api.getComments(posts[0].id);
        const texts = comments.map(function(c) {
            return c.text;
        });
        addAwaitLog("댓글 : " + texts.join(" / "));

        addAwaitLog("완료!");
    } catch (error) {
        addAwaitLog("실패 : " + error.message, "error");
    } finally {
        awaitBtn.disabled = false;
    }
});


/*
    < 4. 로딩 / 성공 / 에러 - 3가지 상태로 화면 만들기 >

    서버에서 데이터를 받아오는 화면은 항상 아래 상태 중 하나이다.

    상태        화면
    -----------------------------------------------
    loading     "불러오는 중..." + 버튼 비활성화
    success     데이터 표시
    error       에러 메시지 + [다시 시도] 버튼

    방법
    1) 현재 상태를 객체 하나에 저장한다.  weatherState = { status, data, error }
    2) 상태에 맞게 화면을 그리는 함수(renderWeather)를 만든다.
    3) 요청 흐름에서는 상태만 바꾸고 renderWeather()를 호출한다.

    → React의 useState + 렌더링 방식과 같은 구조이다. (11-04 메모장의 data → render와도 같다)
*/

const citySelect = document.querySelector("#citySelect");
const weatherBtn = document.querySelector("#weatherBtn");
const weatherBox = document.querySelector("#weatherBox");

let weatherState = { status: "idle", data: null, error: null };

function renderWeather() {
    weatherBox.replaceChildren();
    weatherBtn.disabled = weatherState.status === "loading";

    if (weatherState.status === "loading") {
        weatherBox.className = "loading";
        weatherBox.textContent = "불러오는 중...";
    } else if (weatherState.status === "success") {
        const w = weatherState.data;
        weatherBox.className = "result";
        weatherBox.textContent = w.city + " : " + w.temp + "도, " + w.sky;
    } else if (weatherState.status === "error") {
        const retryBtn = document.createElement("button");
        retryBtn.type = "button";
        retryBtn.textContent = "다시 시도";
        retryBtn.addEventListener("click", loadWeather);

        weatherBox.className = "error";
        weatherBox.append(weatherState.error + " ", retryBtn);
    } else {
        weatherBox.className = "";
        weatherBox.textContent = "도시를 선택하고 조회하세요.";
    }
}

async function loadWeather() {
    if (document.querySelector("#weatherFail").checked) {
        api.failNext();
    }

    weatherState = { status: "loading", data: null, error: null };
    renderWeather();

    try {
        const weather = await api.getWeather(citySelect.value);
        weatherState = { status: "success", data: weather, error: null };
    } catch (error) {
        weatherState = { status: "error", data: null, error: error.message };
    }

    renderWeather();
}

weatherBtn.addEventListener("click", loadWeather);
renderWeather();


/*
    < 5. 순차 실행 vs 동시 실행 >

    서로 관계없는 요청에 await를 줄줄이 쓰면, 앞의 요청이 끝날 때까지 다음 요청을 보내지 않는다.

    // 순차 : 1초 + 1.5초 + (0.5~2초) = 3 ~ 4.5초
    const users = await api.getUsers();
    const products = await api.getProducts();
    const weather = await api.getWeather("서울");

    // 동시 : 가장 느린 요청 시간만큼 = 1.5 ~ 2초
    const [users, products, weather] = await Promise.all([...]);

    const [a, b, c] = 배열  → 배열 구조 분해 할당 (배열의 값을 순서대로 변수에 담기)

    정리 : 앞의 결과가 다음 요청에 필요하면 순차, 아니면 Promise.all
*/

const speedResult = document.querySelector("#speedResult");

document.querySelector("#seqAwaitBtn").addEventListener("click", async function() {
    const start = Date.now();
    speedResult.textContent = "순차 요청 중...";

    const users = await api.getUsers();
    const products = await api.getProducts();
    const weather = await api.getWeather("서울");

    const sec = ((Date.now() - start) / 1000).toFixed(1);
    speedResult.textContent =
        "순차 완료 (" + sec + "초) : 회원 " + users.length + "명, 상품 " +
        products.length + "개, 서울 " + weather.temp + "도";
});

document.querySelector("#allAwaitBtn").addEventListener("click", async function() {
    const start = Date.now();
    speedResult.textContent = "동시 요청 중...";

    const [users, products, weather] = await Promise.all([
        api.getUsers(),
        api.getProducts(),
        api.getWeather("서울")
    ]);

    const sec = ((Date.now() - start) / 1000).toFixed(1);
    speedResult.textContent =
        "동시 완료 (" + sec + "초) : 회원 " + users.length + "명, 상품 " +
        products.length + "개, 서울 " + weather.temp + "도";
});


/*
    < 6. 반복문 안에서 await >

    for...of + await       : 하나씩 순서대로 기다린다.          (O)
    forEach + await         : forEach는 기다려 주지 않는다.      (X, 사용 금지)
    map + Promise.all       : 모두 동시에 보내고 한꺼번에 기다린다. (O)
*/

const loopList = document.querySelector("#loopList");
const userIds = [1, 2, 3];

function addLoopLog(text) {
    const li = document.createElement("li");
    li.textContent = text;
    loopList.append(li);
}

// for...of : 1초씩 순서대로 → 약 3초
document.querySelector("#forOfBtn").addEventListener("click", async function() {
    loopList.replaceChildren();

    for (const id of userIds) {
        const posts = await api.getPosts(id);
        addLoopLog(id + "번 회원 게시글 : " + posts.length + "개");
    }

    addLoopLog("모두 완료");
});

// forEach : 기다리지 않고 바로 "모두 완료"가 먼저 출력된다.
document.querySelector("#forEachBtn").addEventListener("click", function() {
    loopList.replaceChildren();

    userIds.forEach(async function(id) {
        const posts = await api.getPosts(id);
        addLoopLog(id + "번 회원 게시글 : " + posts.length + "개");
    });

    addLoopLog("모두 완료 (??? 아직 아무것도 안 왔는데...)");
});

// map + Promise.all : 동시에 → 약 1초
document.querySelector("#mapAllBtn").addEventListener("click", async function() {
    loopList.replaceChildren();

    const promises = userIds.map(function(id) {
        return api.getPosts(id);
    });

    const results = await Promise.all(promises);

    results.forEach(function(posts, index) {
        addLoopLog(userIds[index] + "번 회원 게시글 : " + posts.length + "개");
    });

    addLoopLog("모두 완료");
});


/*
    < 7. 실전 - 회원 선택 → 게시글 → 댓글 >

    1) 페이지가 열리면 회원 목록을 불러와 select에 채운다.
    2) 회원을 선택하면 그 회원의 게시글을 불러온다.
    3) 게시글을 클릭하면(이벤트 위임) 댓글을 불러온다.

    주의 : 응답 순서 문제
    회원을 빠르게 A → B로 바꾸면, A의 응답이 B보다 늦게 도착해 화면을 덮어쓸 수 있다.
    → 요청할 때마다 번호를 붙이고, 응답이 왔을 때 "가장 마지막 요청"이 아니면 무시한다.
*/

const userSelect = document.querySelector("#userSelect");
const postStatus = document.querySelector("#postStatus");
const postList = document.querySelector("#postList");
const commentStatus = document.querySelector("#commentStatus");
const commentList = document.querySelector("#commentList");

let latestRequest = 0;

async function loadUserOptions() {
    try {
        const users = await api.getUsers();

        userSelect.replaceChildren(new Option("회원을 선택하세요", ""));

        users.forEach(function(user) {
            userSelect.append(new Option(user.name, user.id));
        });
    } catch (error) {
        userSelect.replaceChildren(new Option("회원 목록을 불러오지 못했습니다", ""));
    }
}

userSelect.addEventListener("change", async function() {
    postList.replaceChildren();
    commentList.replaceChildren();
    commentStatus.textContent = "게시글을 클릭하세요.";

    if (userSelect.value === "") {
        postStatus.textContent = "";
        return;
    }

    const requestNo = ++latestRequest;   // 이번 요청 번호
    postStatus.textContent = "불러오는 중...";

    try {
        const posts = await api.getPosts(Number(userSelect.value));

        if (requestNo !== latestRequest) {
            console.log("이전 요청(" + requestNo + "번)의 늦은 응답은 무시합니다.");
            return;
        }

        postStatus.textContent = posts.length + "개의 게시글";

        posts.forEach(function(post) {
            const li = document.createElement("li");
            li.textContent = post.title;
            li.dataset.id = post.id;
            postList.append(li);
        });
    } catch (error) {
        postStatus.textContent = error.message;
    }
});

// 게시글 클릭 → 댓글 (이벤트 위임)
postList.addEventListener("click", async function(event) {
    const li = event.target.closest("li");

    if (li === null) {
        return;
    }

    postList.querySelectorAll("li").forEach(function(item) {
        item.classList.remove("selected");
    });
    li.classList.add("selected");

    commentList.replaceChildren();
    commentStatus.textContent = "불러오는 중...";

    try {
        const comments = await api.getComments(Number(li.dataset.id));

        if (comments.length === 0) {
            commentStatus.textContent = "댓글이 없습니다.";
            return;
        }

        commentStatus.textContent = comments.length + "개의 댓글";

        comments.forEach(function(c) {
            const item = document.createElement("li");
            item.textContent = c.writer + " : " + c.text;
            commentList.append(item);
        });
    } catch (error) {
        commentStatus.textContent = error.message;
    }
});

loadUserOptions();


/*
    < 8. 정리 >

    async function     : 항상 Promise를 반환, 안에서 await 사용 가능
    await Promise      : 끝날 때까지 기다렸다가 결과 값을 꺼냄
    try / catch        : 실패 처리, finally : 마지막 정리
    상태 3가지         : loading / success / error → 상태를 바꾸고 화면을 다시 그린다
    순차 vs 동시       : 관계없는 요청은 await Promise.all([...])
    반복문             : 순서대로 for...of, 동시에 map + Promise.all, forEach + await 금지

    → 17. Fetch 에서는 api.xxx() 대신 실제 서버 주소로 fetch()를 사용한다.
       const response = await fetch("https://...");
       const data = await response.json();
*/
