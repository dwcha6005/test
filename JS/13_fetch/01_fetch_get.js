/*
=====================================================================================
[수업 콘티] 13_fetch / 01. HTTP와 fetch (GET)                 권장 150분 (설명 80 + 실습 70)
=====================================================================================
< 준비 >
- 인터넷 연결 필수. 01_fetch_get.html을 열고 F12 → Network 탭, Console 탭.
- 사용하는 연습용 API (회원가입, 키 필요 없음)
  · JSONPlaceholder : https://jsonplaceholder.typicode.com  (게시글, 회원, 할 일)
  · DummyJSON       : https://dummyjson.com                 (상품 검색, 페이지)
- 12_async의 api.getUsers()가 오늘부터 진짜 서버 요청으로 바뀐다고 소개한다.

< 진행 순서 >
1) HTTP 개념 (15분) - 섹션 1
   - 판서 : 클라이언트(브라우저) ── 요청(Request) ──▶ 서버 / ◀── 응답(Response) ──
   - 요청 = 메서드 + URL (+ 헤더, 바디) / 응답 = 상태 코드 + 데이터(JSON)
   - 상태 코드는 200, 201, 400, 404, 500 다섯 개만 외우게 한다.

2) REST (10분) - 섹션 2
   - "URL은 대상(명사), 메서드는 행동(동사)" 표를 판서
   - 이번 01은 GET(조회)만, 02에서 POST / PUT / PATCH / DELETE

3) 주소창으로 GET 해 보기 (5분) - 섹션 3
   ▶ 시연 : 브라우저 주소창에 https://jsonplaceholder.typicode.com/posts/1 입력 → JSON이 화면에 그대로 보임
            /posts, /users, /posts?userId=1 도 차례로 열어 본다.
   ▶ 포인트 : 주소창에 URL을 입력하는 것 = GET 요청. fetch는 이것을 코드로 하는 것

4) fetch 기본 (15분) - 섹션 4
   ▶ 시연 : [1번 게시글 가져오기] → 콘솔 "상태 코드: 200 / ok: true", 화면에 JSON
            Network 탭에서 posts/1 요청을 클릭 → Headers(상태 코드), Response(데이터) 확인
   ▶ 포인트 : await가 2번! fetch(응답 도착) → response.json()(본문을 객체로 변환)

5) 목록 + 3가지 상태 (10분) - 섹션 5
   ▶ 시연 : [게시글 10개] → "불러오는 중..." → 10개 목록
            Network 탭 상단 "No throttling" → "Slow 3G"로 바꾸고 다시 → 로딩 상태가 길게 보임 → 원복
   ▶ 포인트 : 12_async 03의 상태 패턴과 완전히 같다. api.getXxx()가 fetch로 바뀐 것뿐

6) 실패 상황 (15분) - 섹션 6, 7  ★ 가장 많이 틀리는 부분
   ▶ 시연 : [999번 게시글] → "요청 실패 (404)"
            response.ok 확인 코드를 주석 처리하면 → 에러 없이 빈 객체 {}가 성공처럼 처리됨 → 원복
   ▶ 시연 : [잘못된 주소] → "네트워크 오류 : Failed to fetch"
   ▶ 포인트 : fetch는 404, 500이어도 catch로 가지 않는다. response.ok를 직접 확인해야 한다.

7) 공통 함수 getJSON (5분) - 섹션 8
   - 매번 반복되는 fetch + ok 확인 + json()을 함수 하나로. 이후 코드는 모두 getJSON 사용

8) 쿼리 스트링 (10분) - 섹션 9
   ▶ 시연 : 회원 선택 → 해당 회원의 게시글 10개 (Network 탭에서 ?userId=3 확인)
   ▶ 포인트 : 같은 /posts 주소에 조건만 붙인다. URLSearchParams로 만들면 한글, 특수문자도 안전

9) 검색 + 페이지 (10분) - 섹션 10
   ▶ 시연 : "phone" 검색 → 4개씩 표시, "총 n개 중 1~4" / [다음] [이전]
            "laptop" 검색 → 1페이지부터 다시
   ▶ 포인트 : 페이지 = limit(몇 개씩) + skip(몇 개 건너뛰기). 쇼핑몰, 게시판 목록이 모두 이 방식

< 예상 질문 / 자주 막히는 곳 >
- await response.json()에서 await를 빼먹음 → Promise가 들어감
- "CORS 오류가 나요" → 서버가 허용하지 않은 곳에서의 요청. 오늘 쓰는 API는 모두 허용되어 있다.
  (학원 네트워크에서 API가 막혀 있으면 12_async의 fake_api.js로 대신 진행)
- 로컬 JSON 파일을 fetch("data.json")로 읽으면 file://에서는 막힌다 → 14_module_vite에서 서버로 실행

< 실습 연결 : 01_fetch_get_test.html / .js (회원 · 게시판 · 상품 조회) >
- 섹션 5까지 : 문제 1 ~ 4
- 섹션 9까지 : 문제 5 ~ 7
- 수업 마지막 : 문제 8 ~ 10
=====================================================================================
*/


/*
    < 1. HTTP - 요청과 응답 >

    HTTP : 브라우저(클라이언트)와 서버가 데이터를 주고받는 약속(규칙)

    요청(Request)
    - 메서드 : 무엇을 할지      GET, POST, PUT, PATCH, DELETE
    - URL    : 어디에(무엇을)   https://jsonplaceholder.typicode.com/posts/1
    - 헤더   : 부가 정보        Content-Type: application/json
    - 바디   : 보낼 데이터      (POST, PUT, PATCH일 때)

    응답(Response)
    - 상태 코드 : 결과
    - 바디      : 데이터 (주로 JSON)

    꼭 알아야 할 상태 코드
    ---------------------------------------------------------
    200 OK                    성공
    201 Created               생성 성공 (POST)
    400 Bad Request           요청 데이터가 잘못됨
    401 / 403                 로그인 필요 / 권한 없음
    404 Not Found             대상이 없음
    500 Internal Server Error 서버 오류

    2xx = 성공, 4xx = 요청한 쪽(클라이언트) 문제, 5xx = 서버 문제
*/


/*
    < 2. REST API >

    REST : URL은 "대상(명사)", 메서드는 "행동(동사)"으로 표현하는 API 설계 방식

    메서드    URL              의미                     비유
    ---------------------------------------------------------------------
    GET       /posts           게시글 목록 조회          읽기
    GET       /posts/1         1번 게시글 조회           읽기
    GET       /posts?userId=1  1번 회원의 게시글 조회     조건으로 읽기
    POST      /posts           게시글 등록               쓰기
    PUT       /posts/1         1번 게시글 전체 수정       덮어쓰기
    PATCH     /posts/1         1번 게시글 일부 수정       부분 수정
    DELETE    /posts/1         1번 게시글 삭제           지우기

    → 같은 /posts/1 주소라도 메서드에 따라 하는 일이 다르다.
*/


/*
    < 3. 주소창으로 GET 요청 해 보기 >

    브라우저 주소창에 URL을 입력하고 Enter를 누르는 것이 바로 GET 요청이다.

    https://jsonplaceholder.typicode.com/posts/1
    https://jsonplaceholder.typicode.com/users
    https://jsonplaceholder.typicode.com/posts?userId=1
*/

const BASE_URL = "https://jsonplaceholder.typicode.com";


/*
    < 4. fetch 기본 >

    const response = await fetch(URL);     // 1) 응답이 도착할 때까지 기다림
    const data = await response.json();    // 2) 응답 본문(JSON 문자열)을 객체로 변환

    response 객체
    - response.status : 상태 코드 (200, 404 ...)
    - response.ok     : 상태 코드가 200 ~ 299이면 true
    - response.json() : 본문을 객체로 변환 (Promise 반환 → await 필요)

    fetch는 Promise를 반환한다. → 12_async에서 배운 async / await 그대로 사용
*/

document.querySelector("#basicBtn").addEventListener("click", async function() {
    const basicResult = document.querySelector("#basicResult");
    basicResult.textContent = "요청 중...";

    try {
        const response = await fetch(BASE_URL + "/posts/1");
        console.log("상태 코드: " + response.status + " / ok: " + response.ok);

        const post = await response.json();
        console.log(post);

        basicResult.textContent = JSON.stringify(post, null, 2);
    } catch (error) {
        basicResult.textContent = "오류 : " + error.message;
    }
});


/*
    < 5. 목록 + 로딩 / 성공 / 에러 >

    12_async 03의 패턴과 같다. api.getUsers() 자리에 fetch가 들어갔을 뿐이다.
    URL 끝의 ?_limit=10 은 "10개만 달라"는 조건이다. (섹션 9에서 자세히)
*/

const listBtn = document.querySelector("#listBtn");
const listBox = document.querySelector("#listBox");

listBtn.addEventListener("click", async function() {
    listBtn.disabled = true;
    listBox.className = "loading";
    listBox.textContent = "불러오는 중...";

    try {
        const response = await fetch(BASE_URL + "/posts?_limit=10");
        const posts = await response.json();

        const ol = document.createElement("ol");

        posts.forEach(function(post) {
            const li = document.createElement("li");
            li.textContent = post.title;
            ol.append(li);
        });

        listBox.className = "";
        listBox.replaceChildren(ol);
    } catch (error) {
        listBox.className = "error";
        listBox.textContent = "불러오지 못했습니다 : " + error.message;
    } finally {
        listBtn.disabled = false;
    }
});


/*
    < 6. 주의! fetch는 404, 500에도 실패(reject)하지 않는다 >

    fetch가 catch로 가는 경우는 "네트워크 자체가 실패"했을 때뿐이다. (인터넷 끊김, 잘못된 도메인 등)
    서버가 404, 500으로 응답해도 "응답은 받았으므로" 성공으로 처리된다.

    → response.ok를 직접 확인하고, false이면 throw로 에러를 발생시켜야 한다.

    if (!response.ok) {
        throw new Error("요청 실패 (" + response.status + ")");
    }
*/

const failResult = document.querySelector("#failResult");

document.querySelector("#notFoundBtn").addEventListener("click", async function() {
    failResult.className = "loading";
    failResult.textContent = "요청 중...";

    try {
        const response = await fetch(BASE_URL + "/posts/999");
        console.log("999번 상태 코드 : " + response.status);   // 404

        if (!response.ok) {
            throw new Error("요청 실패 (" + response.status + ")");
        }

        const post = await response.json();
        failResult.className = "result";
        failResult.textContent = "성공 : " + JSON.stringify(post);
    } catch (error) {
        failResult.className = "error";
        failResult.textContent = error.message;
    }
});


/*
    < 7. 네트워크 오류 >

    도메인이 없거나 인터넷이 끊기면 fetch 자체가 실패하여 catch로 간다.
    이때 error.message는 보통 "Failed to fetch"이다.
*/

document.querySelector("#networkBtn").addEventListener("click", async function() {
    failResult.className = "loading";
    failResult.textContent = "요청 중...";

    try {
        await fetch("https://no-such-domain.invalid/posts");
    } catch (error) {
        failResult.className = "error";
        failResult.textContent = "네트워크 오류 : " + error.message;
    }
});


/*
    < 8. 공통 함수 만들기 - getJSON(url) >

    fetch → ok 확인 → json() 은 매번 똑같다. 함수로 만들어 재사용한다.
    이후 코드는 모두 getJSON()을 사용한다.
*/

async function getJSON(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("요청 실패 (" + response.status + ")");
    }

    return response.json();   // async 함수 안에서 Promise를 return하면 await 없이도 된다.
}


/*
    < 9. 쿼리 스트링 (Query String) >

    URL 뒤에 ?이름=값&이름=값 형태로 조건을 붙인다.

    /posts?userId=3            → 3번 회원의 게시글
    /posts?userId=3&_limit=5   → 3번 회원의 게시글 5개

    URLSearchParams로 만들면 한글, 공백, 특수문자를 자동으로 변환(인코딩)해 준다.

    const params = new URLSearchParams({ userId: 3, _limit: 5 });
    params.toString()  → "userId=3&_limit=5"
*/

const userSelect = document.querySelector("#userSelect");
const userPosts = document.querySelector("#userPosts");

async function loadUserOptions() {
    try {
        const users = await getJSON(BASE_URL + "/users");

        userSelect.replaceChildren(new Option("회원을 선택하세요", ""));

        users.forEach(function(user) {
            userSelect.append(new Option(user.name, user.id));
        });
    } catch (error) {
        userSelect.replaceChildren(new Option("회원 목록 오류 : " + error.message, ""));
    }
}

userSelect.addEventListener("change", async function() {
    if (userSelect.value === "") {
        userPosts.replaceChildren();
        return;
    }

    userPosts.textContent = "불러오는 중...";

    const params = new URLSearchParams({ userId: userSelect.value });
    const url = BASE_URL + "/posts?" + params.toString();
    console.log("요청 URL : " + url);

    try {
        const posts = await getJSON(url);
        userPosts.replaceChildren();

        posts.forEach(function(post) {
            const li = document.createElement("li");
            li.textContent = post.title;
            userPosts.append(li);
        });
    } catch (error) {
        userPosts.textContent = error.message;
    }
});

loadUserOptions();


/*
    < 10. 검색 + 페이지 (DummyJSON 상품 API) >

    https://dummyjson.com/products/search?q=phone&limit=4&skip=0

    q     : 검색어
    limit : 한 번에 가져올 개수
    skip  : 앞에서부터 건너뛸 개수     (페이지 번호 - 1) x limit

    응답 형태
    { products: [...], total: 23, skip: 0, limit: 4 }

    → 전체 개수(total)를 알면 "다음 페이지가 있는지" 계산할 수 있다.
*/

const LIMIT = 4;

const searchForm = document.querySelector("#searchForm");
const keywordInput = document.querySelector("#keyword");
const searchInfo = document.querySelector("#searchInfo");
const productList = document.querySelector("#productList");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let currentKeyword = "";
let currentPage = 1;

async function searchProducts() {
    const params = new URLSearchParams({
        q: currentKeyword,
        limit: LIMIT,
        skip: (currentPage - 1) * LIMIT
    });

    searchInfo.className = "loading";
    searchInfo.textContent = "검색 중...";
    prevBtn.disabled = true;
    nextBtn.disabled = true;

    try {
        const data = await getJSON("https://dummyjson.com/products/search?" + params.toString());

        productList.replaceChildren();

        data.products.forEach(function(p) {
            const div = document.createElement("div");
            const img = document.createElement("img");
            const name = document.createElement("p");

            div.className = "product";
            img.src = p.thumbnail;
            img.alt = p.title;
            name.textContent = p.title + " ($" + p.price + ")";

            div.append(img, name);
            productList.append(div);
        });

        const from = data.total === 0 ? 0 : data.skip + 1;
        const to = data.skip + data.products.length;

        searchInfo.className = "result";
        searchInfo.textContent =
            "'" + currentKeyword + "' 총 " + data.total + "개 중 " + from + " ~ " + to;

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = to >= data.total;
    } catch (error) {
        searchInfo.className = "error";
        searchInfo.textContent = error.message;
    }
}

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    currentKeyword = keywordInput.value.trim();
    currentPage = 1;   // 새 검색은 항상 1페이지부터
    searchProducts();
});

prevBtn.addEventListener("click", function() {
    currentPage--;
    searchProducts();
});

nextBtn.addEventListener("click", function() {
    currentPage++;
    searchProducts();
});


/*
    < 11. 정리 >

    const response = await fetch(url);
    if (!response.ok) throw new Error(...);      // 404, 500 직접 확인
    const data = await response.json();

    - 네트워크 실패만 catch로 간다. 상태 코드 확인은 직접!
    - 조건은 쿼리 스트링 (URLSearchParams)
    - 페이지는 limit + skip
    - 공통 함수(getJSON)로 반복 코드 줄이기

    → 02에서는 POST, PUT, PATCH, DELETE로 데이터를 보내고 수정, 삭제한다.
*/
