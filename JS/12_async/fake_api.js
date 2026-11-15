/*
    fake_api.js - 수업용 가짜 서버

    실제 서버 없이 "시간이 걸리는 요청"과 "실패하는 요청"을 재현하기 위한 파일이다.
    모든 함수는 Promise를 반환한다. (02, 03 수업에서 사용)

    17. Fetch 수업에서는 이 api.xxx() 자리에 실제 fetch()가 들어간다.

    < 사용 가능한 함수 >
    api.getUsers()            : 회원 목록                       (1초)
    api.getUser(id)           : 회원 한 명 (없으면 실패)         (1초)
    api.getPosts(userId)      : 회원의 게시글 목록               (1초)
    api.getComments(postId)   : 게시글의 댓글 목록               (1초)
    api.getProducts()         : 상품 목록                       (1.5초)
    api.getProduct(id)        : 상품 하나 (없으면 실패)          (1초)
    api.getOrder(orderNo)     : 주문 정보 (없으면 실패)          (1초)
    api.getWeather(city)      : 날씨 (없는 도시는 실패)          (0.5 ~ 2초 랜덤)

    < 테스트용 설정 >
    api.failNext()            : 다음 요청 1번을 무조건 실패시킨다.
    api.setFailRate(0.3)      : 모든 요청이 30% 확률로 실패한다. (0이면 끔)
    api.setSpeed(2)           : 응답 속도 배율 (2 = 2배 느리게, 0.5 = 2배 빠르게)

    콘솔에 [서버] 로그가 찍히므로 요청과 응답 시점을 눈으로 확인할 수 있다.
*/

const api = (function() {
    const db = {
        users: [
            { id: 1, name: "홍길동", email: "hong@test.com", city: "서울" },
            { id: 2, name: "김철수", email: "kim@test.com", city: "부산" },
            { id: 3, name: "이영희", email: "lee@test.com", city: "대구" }
        ],
        posts: [
            { id: 101, userId: 1, title: "비동기 처음 배워요" },
            { id: 102, userId: 1, title: "Promise 정리 노트" },
            { id: 103, userId: 2, title: "async/await 너무 편하네요" },
            { id: 104, userId: 3, title: "콜백 지옥 탈출기" },
            { id: 105, userId: 3, title: "React 들어가기 전 체크리스트" }
        ],
        comments: [
            { id: 1, postId: 101, writer: "김철수", text: "저도 처음이에요!" },
            { id: 2, postId: 101, writer: "이영희", text: "setTimeout부터 보세요." },
            { id: 3, postId: 103, writer: "홍길동", text: "인정합니다." },
            { id: 4, postId: 104, writer: "홍길동", text: "제목이 웃기네요 ㅋㅋ" }
        ],
        products: [
            { id: "P1", name: "무선 이어폰", price: 89000, stock: 12 },
            { id: "P2", name: "기계식 키보드", price: 129000, stock: 0 },
            { id: "P3", name: "게이밍 마우스", price: 59000, stock: 5 },
            { id: "P4", name: "모니터 받침대", price: 35000, stock: 20 }
        ],
        orders: [
            { orderNo: "A001", productId: "P1", qty: 2, status: "배송 중" },
            { orderNo: "A002", productId: "P3", qty: 1, status: "배송 완료" }
        ],
        weather: {
            "서울": { temp: 8, sky: "맑음" },
            "부산": { temp: 13, sky: "구름 많음" },
            "대구": { temp: 10, sky: "흐림" },
            "제주": { temp: 15, sky: "비" }
        }
    };

    let forceFail = false;
    let failRate = 0;
    let speed = 1;

    // 모든 요청이 사용하는 공통 함수
    function request(name, ms, getData) {
        const delay = Math.round(ms * speed);
        console.log("[서버] 요청 받음 : " + name + " (" + delay + "ms 후 응답)");

        // 실패 여부는 요청을 받는 순간 결정한다. (failNext는 "바로 다음 요청"에만 적용)
        const shouldFail = forceFail || Math.random() < failRate;
        forceFail = false;

        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                if (shouldFail) {
                    console.log("[서버] 응답 실패 : " + name);
                    reject(new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도하세요."));
                    return;
                }

                try {
                    // 원본 데이터를 보호하기 위해 복사본을 응답한다.
                    const data = JSON.parse(JSON.stringify(getData()));
                    console.log("[서버] 응답 완료 : " + name);
                    resolve(data);
                } catch (error) {
                    console.log("[서버] 응답 실패 : " + name + " - " + error.message);
                    reject(error);
                }
            }, delay);
        });
    }

    function notFound(message) {
        throw new Error(message);
    }

    return {
        getUsers: function() {
            return request("getUsers()", 1000, function() {
                return db.users;
            });
        },
        getUser: function(id) {
            return request("getUser(" + id + ")", 1000, function() {
                return db.users.find(function(u) { return u.id === id; }) ||
                    notFound(id + "번 회원을 찾을 수 없습니다.");
            });
        },
        getPosts: function(userId) {
            return request("getPosts(" + userId + ")", 1000, function() {
                return db.posts.filter(function(p) { return p.userId === userId; });
            });
        },
        getComments: function(postId) {
            return request("getComments(" + postId + ")", 1000, function() {
                return db.comments.filter(function(c) { return c.postId === postId; });
            });
        },
        getProducts: function() {
            return request("getProducts()", 1500, function() {
                return db.products;
            });
        },
        getProduct: function(id) {
            return request("getProduct(" + id + ")", 1000, function() {
                return db.products.find(function(p) { return p.id === id; }) ||
                    notFound(id + " 상품을 찾을 수 없습니다.");
            });
        },
        getOrder: function(orderNo) {
            return request("getOrder(" + orderNo + ")", 1000, function() {
                return db.orders.find(function(o) { return o.orderNo === orderNo; }) ||
                    notFound("주문번호 " + orderNo + "을(를) 찾을 수 없습니다.");
            });
        },
        getWeather: function(city) {
            const ms = 500 + Math.floor(Math.random() * 1500);
            return request("getWeather(" + city + ")", ms, function() {
                const w = db.weather[city] || notFound(city + "의 날씨 정보가 없습니다.");
                return { city: city, temp: w.temp, sky: w.sky };
            });
        },

        // 테스트용 설정
        failNext: function() {
            forceFail = true;
            console.log("[서버 설정] 다음 요청 1번은 실패합니다.");
        },
        setFailRate: function(rate) {
            failRate = rate;
            console.log("[서버 설정] 실패 확률 : " + (rate * 100) + "%");
        },
        setSpeed: function(value) {
            speed = value;
            console.log("[서버 설정] 응답 속도 배율 : " + value);
        }
    };
})();
