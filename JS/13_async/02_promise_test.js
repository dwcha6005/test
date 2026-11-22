/*
< 학생용 실습 문제 >

주제: 쇼핑몰 주문 조회 화면을 Promise(then / catch / finally)로 만들기
규칙: 이 파일에서는 async / await를 사용하지 않는다. (03에서 학습)
참고: 사용할 수 있는 api 함수는 fake_api.js 맨 위 주석을 확인한다.

=====================================================================================
[기초]
=====================================================================================

< 문제 1. then >
① productsBtn을 클릭하면 api.getProducts()로 상품 목록을 불러오시오.
② productList에 "무선 이어폰 - 89,000원" 형식으로 표시하시오.
③ 재고(stock)가 0인 상품은 li에 soldout 클래스를 적용하고 뒤에 "(품절)"을 붙이시오.


< 문제 2. catch >
① orderBtn을 클릭하면 orderInput의 주문번호로 api.getOrder()를 호출하시오. (앞뒤 공백 제거, 대문자 변환)
② 성공하면 orderResult에 "주문 A001 : 배송 중" 을 표시하시오. (result 클래스)
③ 실패하면 error.message를 표시하시오. (error 클래스)  예) A999 입력


< 문제 3. finally - 로딩 처리 >
① 문제 2에 로딩 처리를 추가하시오.
   - 요청 시작 : orderBtn 비활성화, orderResult에 "조회 중..." (loading 클래스)
   - 요청 끝   : 성공/실패와 관계없이 orderBtn 다시 활성화 (finally)


< 문제 4. Promise 직접 만들기 >
① 지정한 시간만큼 기다리는 wait(ms) 함수를 작성하시오. (Promise 반환)
② payBtn을 클릭하면 payResult에 "결제 확인 중..."을 표시하고,
   wait(1500) 이후 "결제가 완료되었습니다."로 바꾸시오.


=====================================================================================
[응용]
=====================================================================================

< 문제 5. 체이닝 - 주문 → 상품 >
① detailBtn을 클릭하면 api.getOrder()로 주문을 조회한 뒤,
   주문의 productId로 api.getProduct()를 이어서 호출하시오. (then 안에서 return)
② orderDetail에 "무선 이어폰 2개 (178,000원) - 배송 중" 형식으로 표시하시오.
③ 첫 번째 then의 order 값을 마지막 then에서도 사용해야 한다.
   어떻게 전달할지 생각해 보고 방법을 주석으로 작성하시오.
④ 어느 단계에서 실패해도 catch 하나로 처리하시오.


< 문제 6. then 안에서 throw >
① stockBtn을 클릭하면 선택한 상품을 api.getProduct()로 조회하시오.
② 첫 번째 then에서 재고가 0이면 throw new Error("품절된 상품입니다.")를 실행하시오.
③ 두 번째 then에서 "게이밍 마우스 : 구매 가능 (재고 5개)"를 표시하시오.
④ catch에서는 서버 오류(없는 상품)와 품절 오류를 모두 같은 방식으로 표시하시오.
⑤ then 안에서 throw하면 어디로 가는지 주석으로 작성하시오.


< 문제 7. Promise.all - 장바구니 합계 >
① cartBtn을 클릭하면 장바구니 상품 ["P1", "P3", "P4"]를 동시에 조회하시오.
   힌트) const promises = cartIds.map(...)
② 모든 결과가 오면 cartResult에 "3개 상품 합계 : 183,000원 (1.0초)"를 표시하시오.
③ 하나씩 순서대로 조회하면 몇 초가 걸릴지 주석으로 작성하시오.


=====================================================================================
[심화]
=====================================================================================

< 문제 8. 자동 재시도 >
① retry(작업함수, 최대횟수) 함수를 작성하시오.
   - 작업함수()를 실행하고, 실패하면 최대 횟수까지 다시 시도한다.
   - 모두 실패하면 마지막 에러로 실패하는 Promise를 반환한다.
   - 시도할 때마다 retryLog에 "1번째 시도 : 실패" / "2번째 시도 : 성공 - 서울 8도" 를 추가한다.
   힌트) catch 안에서 retry를 다시 호출하여 return 한다. (재귀)
② retryBtn을 클릭하면 api.setFailRate(0.5)로 실패 확률을 50%로 만든 뒤
   retry(function() { return api.getWeather("서울"); }, 3)을 실행하시오.
③ 끝나면(finally) api.setFailRate(0)으로 되돌리시오.


< 문제 9. Promise.race - 응답 시간 제한 >
① ms 밀리초 뒤에 new Error("응답 시간 초과 (1초)")로 실패하는 timeout(ms) 함수를 작성하시오.
② Promise.race([api.getWeather("부산"), timeout(1000)])를 사용하여
   1초 안에 응답이 오면 날씨를, 아니면 시간 초과 메시지를 raceResult에 표시하시오.
③ getWeather는 0.5 ~ 2초 사이 랜덤으로 응답한다. 여러 번 눌러 두 결과를 모두 확인하시오.
④ Promise.race의 동작을 주석으로 설명하시오.


< 문제 10. Promise.allSettled - 일부 실패해도 나머지 표시 >
① settledBtn을 클릭하면 ["서울", "부산", "인천", "제주"]의 날씨를 동시에 조회하시오.
② Promise.all을 쓰면 인천(정보 없음) 때문에 전체가 실패한다. 먼저 확인해 보시오.
③ Promise.allSettled를 사용하여 성공한 도시는 "서울 : 8도 맑음",
   실패한 도시는 "인천 : 인천의 날씨 정보가 없습니다." 로 모두 표시하시오.
   힌트) 결과 배열의 각 항목 : { status: "fulfilled", value } 또는 { status: "rejected", reason }
*/


// < 강사용 정답 >

// < 문제 1 >
const productList = document.querySelector("#productList");

document.querySelector("#productsBtn").addEventListener("click", function() {
    productList.textContent = "불러오는 중...";

    api.getProducts().then(function(products) {
        productList.replaceChildren();

        products.forEach(function(p) {
            const li = document.createElement("li");
            li.textContent = p.name + " - " + p.price.toLocaleString() + "원";

            if (p.stock === 0) {
                li.classList.add("soldout");
                li.textContent += " (품절)";
            }

            productList.append(li);
        });
    });
});


// < 문제 2, 3 >
const orderBtn = document.querySelector("#orderBtn");
const orderResult = document.querySelector("#orderResult");

orderBtn.addEventListener("click", function() {
    const orderNo = document.querySelector("#orderInput").value.trim().toUpperCase();

    orderBtn.disabled = true;
    orderResult.className = "loading";
    orderResult.textContent = "조회 중...";

    api.getOrder(orderNo)
        .then(function(order) {
            orderResult.className = "result";
            orderResult.textContent = "주문 " + order.orderNo + " : " + order.status;
        })
        .catch(function(error) {
            orderResult.className = "error";
            orderResult.textContent = error.message;
        })
        .finally(function() {
            orderBtn.disabled = false;
        });
});


// < 문제 4 >
function wait(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

document.querySelector("#payBtn").addEventListener("click", function() {
    const payResult = document.querySelector("#payResult");
    payResult.textContent = "결제 확인 중...";

    wait(1500).then(function() {
        payResult.textContent = "결제가 완료되었습니다.";
    });
});


// < 문제 5 >
const orderDetail = document.querySelector("#orderDetail");

document.querySelector("#detailBtn").addEventListener("click", function() {
    const orderNo = document.querySelector("#detailInput").value.trim().toUpperCase();
    let savedOrder = null;   // 다음 then에서도 쓰기 위해 바깥 변수에 저장

    orderDetail.className = "loading";
    orderDetail.textContent = "조회 중...";

    api.getOrder(orderNo)
        .then(function(order) {
            savedOrder = order;
            return api.getProduct(order.productId);
        })
        .then(function(product) {
            const total = product.price * savedOrder.qty;

            orderDetail.className = "result";
            orderDetail.textContent =
                product.name + " " + savedOrder.qty + "개 (" + total.toLocaleString() + "원) - " +
                savedOrder.status;
        })
        .catch(function(error) {
            orderDetail.className = "error";
            orderDetail.textContent = error.message;
        });
});

// then 사이에서 값을 전달하는 방법
// 1) 바깥에 변수를 만들어 저장해 둔다. (위 방법)
// 2) then 안에서 다음 then을 중첩해서 order에 접근한다. (중첩이 다시 깊어짐)
// → 03의 async / await를 사용하면 변수에 그냥 담아 두고 쓰면 되므로 훨씬 간단해진다.


// < 문제 6 >
const stockResult = document.querySelector("#stockResult");

document.querySelector("#stockBtn").addEventListener("click", function() {
    const id = document.querySelector("#productSelect").value;

    stockResult.className = "loading";
    stockResult.textContent = "확인 중...";

    api.getProduct(id)
        .then(function(product) {
            if (product.stock === 0) {
                throw new Error("품절된 상품입니다.");
            }
            return product;
        })
        .then(function(product) {
            stockResult.className = "result";
            stockResult.textContent =
                product.name + " : 구매 가능 (재고 " + product.stock + "개)";
        })
        .catch(function(error) {
            stockResult.className = "error";
            stockResult.textContent = error.message;
        });
});

// then 안에서 throw하면 남은 then은 건너뛰고 바로 catch로 이동한다.
// 서버 실패(reject)와 직접 발생시킨 오류(throw)를 catch 한 곳에서 처리할 수 있다.


// < 문제 7 >
const cartResult = document.querySelector("#cartResult");

document.querySelector("#cartBtn").addEventListener("click", function() {
    const cartIds = ["P1", "P3", "P4"];
    const start = Date.now();

    cartResult.textContent = "계산 중...";

    const promises = cartIds.map(function(id) {
        return api.getProduct(id);
    });

    Promise.all(promises)
        .then(function(products) {
            let total = 0;

            products.forEach(function(p) {
                total += p.price;
            });

            const sec = ((Date.now() - start) / 1000).toFixed(1);
            cartResult.textContent =
                products.length + "개 상품 합계 : " + total.toLocaleString() + "원 (" + sec + "초)";
        })
        .catch(function(error) {
            cartResult.textContent = error.message;
        });
});

// 하나씩 순서대로 조회하면 1초 x 3개 = 약 3초가 걸린다. Promise.all은 약 1초.


// < 문제 8 >
const retryLog = document.querySelector("#retryLog");

function addRetryLog(text) {
    const li = document.createElement("li");
    li.textContent = text;
    retryLog.append(li);
}

function retry(task, maxCount, count) {
    count = count || 1;   // 현재 시도 횟수 (처음 호출할 때는 1)

    return task()
        .then(function(result) {
            addRetryLog(count + "번째 시도 : 성공");
            return result;
        })
        .catch(function(error) {
            addRetryLog(count + "번째 시도 : 실패");

            if (count >= maxCount) {
                throw error;   // 더 이상 시도하지 않고 실패
            }

            return retry(task, maxCount, count + 1);
        });
}

document.querySelector("#retryBtn").addEventListener("click", function() {
    retryLog.replaceChildren();
    api.setFailRate(0.5);

    retry(function() {
        return api.getWeather("서울");
    }, 3)
        .then(function(weather) {
            addRetryLog("결과 : " + weather.city + " " + weather.temp + "도");
        })
        .catch(function(error) {
            addRetryLog("3번 모두 실패 : " + error.message);
        })
        .finally(function() {
            api.setFailRate(0);
        });
});


// < 문제 9 >
function timeout(ms) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(new Error("응답 시간 초과 (" + ms / 1000 + "초)"));
        }, ms);
    });
}

document.querySelector("#raceBtn").addEventListener("click", function() {
    const raceResult = document.querySelector("#raceResult");
    raceResult.textContent = "조회 중...";

    Promise.race([api.getWeather("부산"), timeout(1000)])
        .then(function(weather) {
            raceResult.textContent = weather.city + " : " + weather.temp + "도 " + weather.sky;
        })
        .catch(function(error) {
            raceResult.textContent = error.message;
        });
});

// Promise.race는 여러 Promise 중 "가장 먼저 끝난 것"의 결과(성공이든 실패든)를 따른다.
// 날씨가 1초 안에 오면 날씨로 성공, timeout이 먼저 끝나면 시간 초과로 실패한다.


// < 문제 10 >
const settledList = document.querySelector("#settledList");

document.querySelector("#settledBtn").addEventListener("click", function() {
    const cities = ["서울", "부산", "인천", "제주"];
    settledList.textContent = "조회 중...";

    const promises = cities.map(function(city) {
        return api.getWeather(city);
    });

    Promise.allSettled(promises).then(function(results) {
        settledList.replaceChildren();

        results.forEach(function(result, index) {
            const li = document.createElement("li");

            if (result.status === "fulfilled") {
                li.textContent = cities[index] + " : " + result.value.temp + "도 " + result.value.sky;
            } else {
                li.textContent = cities[index] + " : " + result.reason.message;
                li.className = "error";
            }

            settledList.append(li);
        });
    });
});

// Promise.all은 하나라도 실패하면 전체가 catch로 가지만,
// Promise.allSettled는 항상 then으로 오고, 각 요청의 성공/실패를 하나씩 확인할 수 있다.
