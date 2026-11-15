/*
=====================================================================================
[수업 콘티] 12_async / 02. Promise                           권장 120분 (설명 70 + 실습 50)
=====================================================================================
< 준비 >
- 02_promise.html을 열고 F12 → Console 탭. 요청마다 [서버] 로그가 찍힌다.
- fake_api.js는 "가짜 서버"이다. 내부 코드는 설명하지 않고, 파일 맨 위의 사용법만 보여 준다.
  (api.getUsers() 같은 함수가 1초 뒤에 데이터를 주는 서버라고 생각하면 된다.)

< 진행 순서 >
1) Promise란? (10분) - 섹션 1
   - 판서 : Promise = "나중에 결과를 주겠다는 약속(주문 영수증)"
            상태 3가지 : 대기(pending) → 성공(fulfilled) / 실패(rejected)
   ▶ 시연 : [반환값 확인] → 콘솔 "Promise {<pending>}" → 1초 뒤 "1초 뒤 상태:" 와 함께 데이터 배열
   ▶ 포인트 : 함수가 데이터를 바로 주지 못하니, 대신 "영수증(Promise)"을 준다.

2) then (10분) - 섹션 2
   ▶ 시연 : [회원 목록 불러오기] → "불러오는 중..." → 1초 뒤 3명 표시
   ▶ 포인트 : then에 넘긴 함수가 "성공했을 때" 데이터를 받아 실행된다. (01의 콜백과 비교)

3) catch (8분) - 섹션 3
   ▶ 시연 : [99번 회원 요청] → "99번 회원을 찾을 수 없습니다." (빨간 글씨)
            [서버 오류 발생시키기] → "서버 오류가 발생했습니다..."
   ▶ 포인트 : 실패하면 then은 건너뛰고 catch가 실행된다. error.message로 이유를 확인한다.

4) finally - 로딩 처리 (8분) - 섹션 4  ★ React에서 그대로 쓰는 패턴
   ▶ 시연 : [상품 목록 불러오기] → 버튼 비활성 + "불러오는 중..." → 1.5초 뒤 목록, 버튼 복구
            "실패하게 만들기" 체크 후 다시 → 에러 문구, 버튼은 똑같이 복구
   ▶ 포인트 : 성공이든 실패든 "로딩 끝" 처리는 finally 한 곳에서

5) 체이닝 (15분) - 섹션 5  ★ 01의 콜백 지옥과 화면을 나란히 비교
   ▶ 시연 : [회원 → 게시글 → 댓글] → 1초 간격으로 3단계 표시 (01과 같은 결과)
            "중간에 실패시키기" 체크 → 첫 단계 후 실패, 나머지 then은 건너뛰고 catch 한 곳에서 처리
   ▶ 포인트 : 들여쓰기가 깊어지지 않는다. 에러 처리는 맨 끝 catch 하나로 끝난다.
              then 안에서 다음 Promise를 "return" 해야 다음 then이 기다린다.

6) return 빼먹기 실수 (5분) - 섹션 6
   ▶ 시연 : 버튼 → 다음 then에서 posts가 undefined → 화면 "게시글: undefined"
   ▶ 포인트 : 체이닝이 이상하게 동작하면 가장 먼저 return을 확인

7) Promise 직접 만들기 (8분) - 섹션 7
   - new Promise((resolve, reject) => {...}) 구조만 이해시킨다. (실무에서 직접 만들 일은 많지 않음)
   ▶ 시연 : [2초 기다리기] → 2초 뒤 "2초가 지났습니다." / [주사위] 여러 번 → 가끔 실패

8) Promise.all (6분) - 섹션 8
   ▶ 시연 : [하나씩 차례대로] → 약 3.5초 / [Promise.all] → 약 1.5초 (가장 느린 요청 시간)
   ▶ 포인트 : 서로 관계없는 요청은 동시에 보낸다. 하나라도 실패하면 전체가 실패한다.

< 예상 질문 / 자주 막히는 곳 >
- "then 안의 값을 밖에서 쓰고 싶어요" → 밖에서는 아직 도착하지 않았다. 사용하는 코드를 then 안으로.
- then(함수())처럼 괄호를 붙이는 실수
- 03에서 배우는 async/await도 내부는 Promise이다. Promise를 이해해야 async/await가 쉽다.

< 실습 연결 : 02_promise_test.html / .js (쇼핑몰 주문 조회) >
- 섹션 4까지 : 문제 1 ~ 4
- 섹션 6까지 : 문제 5 ~ 7
- 수업 마지막 : 문제 8 ~ 10
=====================================================================================
*/


/*
    < 1. Promise란? >

    Promise : 비동기 작업의 "미래의 결과"를 나타내는 객체
    → 지금은 결과가 없지만, 나중에 성공 또는 실패 결과를 알려 주겠다는 약속

    Promise의 상태 3가지
    - pending   (대기) : 아직 결과가 없음
    - fulfilled (성공) : 결과 데이터가 도착함   → then()으로 받는다
    - rejected  (실패) : 오류가 발생함          → catch()로 받는다

    api.getUsers()는 데이터를 바로 반환하지 않고 Promise를 반환한다.
*/

document.querySelector("#checkBtn").addEventListener("click", function() {
    const promise = api.getUsers();

    console.log("바로 확인한 반환값:", promise);   // Promise {<pending>}

    setTimeout(function() {
        console.log("1초 뒤 상태:", promise);     // Promise {<fulfilled>: Array(3)}
    }, 1100);
});


/*
    < 2. then() - 성공 결과 받기 >

    promise.then(function(data) {
        // 성공하면 data에 결과가 들어온다.
    });
*/

const userList = document.querySelector("#userList");

document.querySelector("#usersBtn").addEventListener("click", function() {
    userList.textContent = "불러오는 중...";

    api.getUsers().then(function(users) {
        userList.replaceChildren();

        users.forEach(function(user) {
            const li = document.createElement("li");
            li.textContent = user.name + " (" + user.email + ")";
            userList.append(li);
        });
    });
});


/*
    < 3. catch() - 실패 처리 >

    promise
        .then(function(data) { ... })      // 성공
        .catch(function(error) { ... });   // 실패 (error.message에 이유)

    실패하면 then은 실행되지 않고 catch로 넘어간다.
    catch가 없으면 콘솔에 "Uncaught (in promise)" 오류가 출력된다.
*/

const errorResult = document.querySelector("#errorResult");

document.querySelector("#notFoundBtn").addEventListener("click", function() {
    errorResult.className = "loading";
    errorResult.textContent = "요청 중...";

    api.getUser(99)
        .then(function(user) {
            errorResult.className = "result";
            errorResult.textContent = user.name;
        })
        .catch(function(error) {
            errorResult.className = "error";
            errorResult.textContent = error.message;
        });
});

document.querySelector("#serverErrorBtn").addEventListener("click", function() {
    api.failNext();   // 다음 요청을 강제로 실패시키는 테스트용 설정

    errorResult.className = "loading";
    errorResult.textContent = "요청 중...";

    api.getUsers()
        .then(function(users) {
            errorResult.className = "result";
            errorResult.textContent = users.length + "명";
        })
        .catch(function(error) {
            errorResult.className = "error";
            errorResult.textContent = error.message;
        });
});


/*
    < 4. finally() - 성공/실패와 관계없이 마지막에 실행 >

    실제 화면의 요청 처리 흐름 (React에서도 똑같다)
    1. 요청 시작 : 로딩 표시, 버튼 비활성화 (중복 클릭 방지)
    2. 성공      : 데이터 표시                        → then
    3. 실패      : 에러 메시지 표시                   → catch
    4. 끝        : 로딩 숨기기, 버튼 다시 활성화       → finally
*/

const productsBtn = document.querySelector("#productsBtn");
const productStatus = document.querySelector("#productStatus");
const productList = document.querySelector("#productList");

productsBtn.addEventListener("click", function() {
    if (document.querySelector("#failCheck").checked) {
        api.failNext();
    }

    productsBtn.disabled = true;
    productStatus.className = "loading";
    productStatus.textContent = "불러오는 중...";
    productList.replaceChildren();

    api.getProducts()
        .then(function(products) {
            productStatus.textContent = "";

            products.forEach(function(p) {
                const li = document.createElement("li");
                li.textContent = p.name + " - " + p.price.toLocaleString() + "원";
                productList.append(li);
            });
        })
        .catch(function(error) {
            productStatus.className = "error";
            productStatus.textContent = error.message;
        })
        .finally(function() {
            productsBtn.disabled = false;
            console.log("finally : 로딩 종료");
        });
});


/*
    < 5. 체이닝 - 순서가 있는 비동기 작업 >

    then 안에서 "다음 Promise를 return"하면, 다음 then은 그 결과를 기다렸다가 받는다.

    api.getUser(1)
        .then(function(user) {
            return api.getPosts(user.id);       // ← return이 핵심
        })
        .then(function(posts) {
            return api.getComments(posts[0].id);
        })
        .then(function(comments) { ... })
        .catch(function(error) { ... });        // 어느 단계에서 실패해도 여기로

    01의 콜백 지옥과 비교
    - 들여쓰기가 깊어지지 않고 위에서 아래로 읽힌다.
    - 에러 처리를 맨 끝 catch 한 곳에서 한다.
*/

const chainList = document.querySelector("#chainList");

function addChainLog(text, className) {
    const li = document.createElement("li");
    li.textContent = text;
    if (className) {
        li.className = className;
    }
    chainList.append(li);
}

document.querySelector("#chainBtn").addEventListener("click", function() {
    chainList.replaceChildren();
    addChainLog("요청 시작...");

    const failInMiddle = document.querySelector("#chainFail").checked;

    api.getUser(1)
        .then(function(user) {
            addChainLog("회원 : " + user.name);

            if (failInMiddle) {
                api.failNext();   // 두 번째 요청(게시글)을 실패시킴
            }

            return api.getPosts(user.id);
        })
        .then(function(posts) {
            addChainLog("게시글 : " + posts.length + "개 (첫 글 : " + posts[0].title + ")");
            return api.getComments(posts[0].id);
        })
        .then(function(comments) {
            const texts = comments.map(function(c) {
                return c.text;
            });

            addChainLog("댓글 : " + texts.join(" / "));
            addChainLog("완료!");
        })
        .catch(function(error) {
            addChainLog("실패 : " + error.message, "error");
        });
});


/*
    < 6. 자주 하는 실수 - then 안에서 return을 빼먹기 >

    return을 하지 않으면
    - 다음 then은 기다리지 않고 바로 실행된다.
    - 다음 then이 받는 값은 undefined이다.
*/

const mistakeResult = document.querySelector("#mistakeResult");

document.querySelector("#mistakeBtn").addEventListener("click", function() {
    mistakeResult.textContent = "요청 중...";

    api.getUser(1)
        .then(function(user) {
            api.getPosts(user.id);         // return 없음!
        })
        .then(function(posts) {
            console.log("posts:", posts);  // undefined
            mistakeResult.textContent = "게시글: " + posts;
        });
});


/*
    < 7. Promise 직접 만들기 >

    new Promise(function(resolve, reject) {
        // 비동기 작업
        resolve(결과);   // 성공 → then으로 전달
        reject(에러);    // 실패 → catch로 전달
    });

    실무에서는 fetch처럼 이미 Promise를 반환하는 함수를 쓰는 경우가 대부분이다.
    구조를 이해하는 정도로 충분하다. (fake_api.js도 이렇게 만들어져 있다.)
*/

const makeResult = document.querySelector("#makeResult");

// 지정한 시간만큼 기다리는 Promise
function delay(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

document.querySelector("#delayBtn").addEventListener("click", function() {
    makeResult.textContent = "기다리는 중...";

    delay(2000).then(function() {
        makeResult.textContent = "2초가 지났습니다.";
    });
});

// 1이 나오면 실패하는 주사위
function rollDice() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            const number = Math.floor(Math.random() * 6) + 1;

            if (number === 1) {
                reject(new Error("1이 나왔습니다. 실패!"));
            } else {
                resolve(number);
            }
        }, 500);
    });
}

document.querySelector("#diceBtn").addEventListener("click", function() {
    makeResult.textContent = "주사위 굴리는 중...";

    rollDice()
        .then(function(number) {
            makeResult.textContent = "주사위 : " + number;
        })
        .catch(function(error) {
            makeResult.textContent = error.message;
        });
});


/*
    < 8. Promise.all - 여러 요청을 동시에 >

    서로 관계없는 요청(회원 목록, 상품 목록, 날씨)은 하나씩 기다릴 필요가 없다.

    Promise.all([promise1, promise2, promise3])
        .then(function(results) {
            // results = [결과1, 결과2, 결과3]  (요청한 순서대로)
        });

    - 모두 성공해야 then이 실행된다.
    - 하나라도 실패하면 바로 catch로 간다.
    - 걸리는 시간 = 가장 느린 요청의 시간
*/

const allResult = document.querySelector("#allResult");

// 순차 : 회원(1초) → 상품(1.5초) → 날씨(0.5~2초) = 약 3 ~ 4.5초
document.querySelector("#seqBtn").addEventListener("click", function() {
    const start = Date.now();
    allResult.textContent = "순차 요청 중...";

    let users;
    let products;

    api.getUsers()
        .then(function(data) {
            users = data;
            return api.getProducts();
        })
        .then(function(data) {
            products = data;
            return api.getWeather("서울");
        })
        .then(function(weather) {
            const sec = ((Date.now() - start) / 1000).toFixed(1);
            allResult.textContent =
                "순차 완료 (" + sec + "초) : 회원 " + users.length + "명, 상품 " +
                products.length + "개, 서울 " + weather.temp + "도";
        });
});

// 동시 : 세 요청을 한꺼번에 보내고 모두 끝날 때까지 기다림 = 약 1.5 ~ 2초
document.querySelector("#allBtn").addEventListener("click", function() {
    const start = Date.now();
    allResult.textContent = "동시 요청 중...";

    Promise.all([api.getUsers(), api.getProducts(), api.getWeather("서울")])
        .then(function(results) {
            const users = results[0];
            const products = results[1];
            const weather = results[2];
            const sec = ((Date.now() - start) / 1000).toFixed(1);

            allResult.textContent =
                "Promise.all 완료 (" + sec + "초) : 회원 " + users.length + "명, 상품 " +
                products.length + "개, 서울 " + weather.temp + "도";
        })
        .catch(function(error) {
            allResult.textContent = "하나라도 실패하면 전체 실패 : " + error.message;
        });
});


/*
    < 9. 정리 >

    Promise           : 비동기 작업의 미래 결과 (대기 / 성공 / 실패)
    then(함수)        : 성공 결과 받기
    catch(함수)       : 실패 처리 (error.message)
    finally(함수)     : 성공/실패와 관계없이 마지막 처리 (로딩 해제)
    체이닝            : then 안에서 다음 Promise를 return → 순서대로 실행
    Promise.all([..]) : 여러 요청을 동시에 → 모두 끝나면 결과 배열

    → 03에서는 같은 내용을 async / await로 더 읽기 쉽게 작성한다.
*/
