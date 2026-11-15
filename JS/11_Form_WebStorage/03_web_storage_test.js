/*
< 학생용 실습 문제 >

주제: 쇼핑몰 개인화 설정을 Web Storage에 저장하기
확인: 문제를 풀 때마다 새로고침(F5)해서 값이 유지되는지 확인한다.
주의: 다른 실습 파일과 key가 겹치지 않도록 key 이름 앞에 "shop"을 붙인다.

=====================================================================
[기초]
=====================================================================

< 문제 1. 저장 / 불러오기 / 삭제 >
① nickSave를 누르면 nickInput의 값을 localStorage의 "shopNickname"에 저장하시오.
② nickLoad를 누르면 저장된 값을 읽어 nickResult에 "저장된 닉네임: 길동이"를 표시하시오.
③ nickRemove를 누르면 "shopNickname"을 삭제하시오.


< 문제 2. 숫자 저장 - 방문 횟수 >
① 페이지가 열릴 때마다 localStorage의 "shopVisit" 값을 1 증가시켜 저장하시오.
② visitResult에 "3번째 방문입니다."를 표시하시오.
③ Number()로 변환하지 않으면 어떤 결과가 나오는지 주석으로 작성하시오.


< 문제 3. sessionStorage - 이 탭에서만 닫기 >
① tabNoticeClose를 누르면 tabNotice를 숨기고 sessionStorage의 "shopNoticeClosed"에 "Y"를 저장하시오.
② 페이지가 열릴 때 "shopNoticeClosed"가 "Y"이면 공지를 숨기시오.
③ 새로고침과 탭을 새로 열었을 때의 차이를 확인하고 주석으로 작성하시오.


< 문제 4. 값이 없을 때 처리 >
① 문제 1의 nickLoad에서 저장된 값이 없으면 nickResult에 "저장된 닉네임이 없습니다."를 표시하시오.
② 페이지가 열릴 때 저장된 닉네임이 있으면 nickInput에 미리 채우시오.


=====================================================================
[응용]
=====================================================================

< 문제 5. 글자 크기 설정 유지 >
① fontSize 라디오를 바꾸면 body에 font-small 또는 font-large 클래스를 적용하시오. (normal은 둘 다 제거)
② 선택한 값을 "shopFontSize"에 저장하시오.
③ 페이지가 열리면 저장된 값을 읽어 화면과 라디오 선택 상태를 모두 복원하시오.


< 문제 6. 객체 저장 - 기본 배송지 >
① addressForm을 제출하면 전송을 막고, "기본 배송지로 저장"이 체크되어 있으면
   { receiver, phone, address } 객체를 JSON 문자열로 "shopAddress"에 저장하시오.
② addressMsg에 "기본 배송지가 저장되었습니다."를 표시하시오. (체크하지 않았으면 "배송지가 등록되었습니다.")
③ 페이지가 열릴 때 저장된 배송지가 있으면 JSON.parse()로 읽어 폼에 채우고 체크박스도 체크하시오.


< 문제 7. 오늘 하루 보지 않기 >
① popupClose를 누르면 dailyPopup을 숨기시오.
② 이때 hideToday가 체크되어 있으면 오늘 날짜를 "shopHideDate"에 저장하시오.
   오늘 날짜 문자열 : new Date().toDateString()   예) "Thu Nov 12 2026"
③ 페이지가 열릴 때 저장된 날짜가 오늘과 같으면 팝업을 숨기시오.
   (내일이 되면 날짜가 달라지므로 다시 보인다.)


=====================================================================
[심화]
=====================================================================

< 문제 8. 최근 본 상품 >
① productArea에 이벤트 위임으로 click 리스너를 하나 등록하시오.
② view-btn을 누르면 상품의 { id, name } 객체를 "shopRecent" 배열에 저장하시오.
③ 같은 상품은 중복 저장하지 말고 맨 앞으로 옮기시오. 최대 3개까지 저장하시오.
④ recentList에 "USB 허브, 무선 이어폰, 기계식 키보드" 형식으로 표시하시오. (없으면 "없음")
⑤ 페이지가 열릴 때도 저장된 목록을 표시하시오.


< 문제 9. 찜 목록 토글 >
① 같은 리스너에서 wish-btn을 누르면 상품 id를 "shopWish" 배열에 추가하시오.
   이미 있으면 배열에서 제거하시오. (토글)
② 찜한 상품의 버튼은 "♥" + on 클래스, 찜하지 않은 상품은 "♡"로 표시하시오.
③ wishCount에 "찜한 상품: 2개"를 표시하시오.
④ 페이지가 열릴 때 저장된 찜 목록으로 하트 상태를 복원하시오.
⑤ 화면 갱신은 renderWish() 함수 하나로 처리하시오.


< 문제 10. 리뷰 임시 저장 >
① reviewText에 입력할 때마다 내용을 "shopDraft"에 자동 저장하고,
   draftMsg에 "임시 저장됨 (오후 8:30:15)"을 표시하시오.
② 페이지가 열릴 때 임시 저장된 내용이 있으면 textarea에 복원하고
   draftMsg에 "임시 저장된 리뷰를 불러왔습니다."를 표시하시오.
③ reviewSubmit을 누르면 내용이 있을 때 alert("리뷰가 등록되었습니다.") 후
   textarea를 비우고 임시 저장 데이터를 삭제하시오.
④ 내용을 모두 지웠을 때(빈 문자열)는 저장하지 말고 임시 저장 데이터를 삭제하시오.
*/


// < 강사용 정답 >

// < 공통 : 배열 읽기 / 저장 함수 >
function loadArray(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}


// < 문제 1, 4 >
const nickInput = document.querySelector("#nickInput");
const nickResult = document.querySelector("#nickResult");

document.querySelector("#nickSave").addEventListener("click", function() {
    localStorage.setItem("shopNickname", nickInput.value.trim());
    nickResult.textContent = "저장했습니다.";
});

document.querySelector("#nickLoad").addEventListener("click", function() {
    const nickname = localStorage.getItem("shopNickname");

    if (nickname === null || nickname === "") {
        nickResult.textContent = "저장된 닉네임이 없습니다.";
    } else {
        nickResult.textContent = "저장된 닉네임: " + nickname;
    }
});

document.querySelector("#nickRemove").addEventListener("click", function() {
    localStorage.removeItem("shopNickname");
    nickResult.textContent = "삭제했습니다.";
});

// 문제 4 ② 페이지가 열릴 때 미리 채우기
const savedNickname = localStorage.getItem("shopNickname");

if (savedNickname !== null) {
    nickInput.value = savedNickname;
}


// < 문제 2 >
const visit = Number(localStorage.getItem("shopVisit")) + 1;

localStorage.setItem("shopVisit", visit);
document.querySelector("#visitResult").textContent = visit + "번째 방문입니다.";

// Number() 없이 localStorage.getItem("shopVisit") + 1 을 하면
// 문자열 연결이 되어 "1" → "11" → "111" 처럼 늘어난다.
// (처음에는 null + 1 = 1 이지만 두 번째부터 "1" + 1 = "11")


// < 문제 3 >
const tabNotice = document.querySelector("#tabNotice");

if (sessionStorage.getItem("shopNoticeClosed") === "Y") {
    tabNotice.style.display = "none";
}

document.querySelector("#tabNoticeClose").addEventListener("click", function() {
    tabNotice.style.display = "none";
    sessionStorage.setItem("shopNoticeClosed", "Y");
});

// 새로고침 : 같은 탭이므로 sessionStorage가 유지되어 공지가 계속 숨겨진다.
// 탭을 닫고 새로 열기 : sessionStorage가 삭제되어 공지가 다시 보인다.


// < 문제 5 >
function applyFontSize(size) {
    document.body.classList.remove("font-small", "font-large");

    if (size === "small") {
        document.body.classList.add("font-small");
    } else if (size === "large") {
        document.body.classList.add("font-large");
    }
}

const savedFontSize = localStorage.getItem("shopFontSize") || "normal";

applyFontSize(savedFontSize);
document.querySelector('input[name="fontSize"][value="' + savedFontSize + '"]').checked = true;

document.querySelectorAll('input[name="fontSize"]').forEach(function(radio) {
    radio.addEventListener("change", function() {
        applyFontSize(radio.value);
        localStorage.setItem("shopFontSize", radio.value);
    });
});


// < 문제 6 >
const addressForm = document.querySelector("#addressForm");
const addressMsg = document.querySelector("#addressMsg");

const savedAddress = JSON.parse(localStorage.getItem("shopAddress"));

if (savedAddress !== null) {
    addressForm.receiver.value = savedAddress.receiver;
    addressForm.phone.value = savedAddress.phone;
    addressForm.address.value = savedAddress.address;
    addressForm.isDefault.checked = true;
}

addressForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (addressForm.isDefault.checked) {
        const address = {
            receiver: addressForm.receiver.value.trim(),
            phone: addressForm.phone.value.trim(),
            address: addressForm.address.value.trim()
        };

        localStorage.setItem("shopAddress", JSON.stringify(address));
        addressMsg.textContent = "기본 배송지가 저장되었습니다.";
    } else {
        addressMsg.textContent = "배송지가 등록되었습니다.";
    }
});


// < 문제 7 >
const dailyPopup = document.querySelector("#dailyPopup");
const today = new Date().toDateString();

if (localStorage.getItem("shopHideDate") === today) {
    dailyPopup.style.display = "none";
}

document.querySelector("#popupClose").addEventListener("click", function() {
    dailyPopup.style.display = "none";

    if (document.querySelector("#hideToday").checked) {
        localStorage.setItem("shopHideDate", today);
    }
});


// < 문제 8, 9 >
const productArea = document.querySelector("#productArea");
const recentList = document.querySelector("#recentList");
const wishCount = document.querySelector("#wishCount");

function renderRecent() {
    const recent = loadArray("shopRecent");

    if (recent.length === 0) {
        recentList.textContent = "없음";
        return;
    }

    recentList.textContent = recent.map(function(item) {
        return item.name;
    }).join(", ");
}

function renderWish() {
    const wish = loadArray("shopWish");

    productArea.querySelectorAll(".product").forEach(function(product) {
        const button = product.querySelector(".wish-btn");
        const isWished = wish.includes(product.dataset.id);

        button.textContent = isWished ? "♥" : "♡";
        button.classList.toggle("on", isWished);
    });

    wishCount.textContent = "찜한 상품: " + wish.length + "개";
}

productArea.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (button === null) {
        return;
    }

    const product = button.closest(".product");
    const id = product.dataset.id;

    // 문제 8 : 최근 본 상품
    if (button.classList.contains("view-btn")) {
        let recent = loadArray("shopRecent");

        recent = recent.filter(function(item) {
            return item.id !== id;
        });

        recent.unshift({ id: id, name: product.dataset.name });
        recent = recent.slice(0, 3);

        saveArray("shopRecent", recent);
        renderRecent();
    }

    // 문제 9 : 찜 토글
    if (button.classList.contains("wish-btn")) {
        let wish = loadArray("shopWish");

        if (wish.includes(id)) {
            wish = wish.filter(function(w) {
                return w !== id;
            });
        } else {
            wish.push(id);
        }

        saveArray("shopWish", wish);
        renderWish();
    }
});

renderRecent();
renderWish();


// < 문제 10 >
const reviewText = document.querySelector("#reviewText");
const draftMsg = document.querySelector("#draftMsg");

const draft = localStorage.getItem("shopDraft");

if (draft !== null) {
    reviewText.value = draft;
    draftMsg.textContent = "임시 저장된 리뷰를 불러왔습니다.";
}

reviewText.addEventListener("input", function() {
    if (reviewText.value === "") {
        localStorage.removeItem("shopDraft");
        draftMsg.textContent = "";
        return;
    }

    localStorage.setItem("shopDraft", reviewText.value);
    draftMsg.textContent = "임시 저장됨 (" + new Date().toLocaleTimeString() + ")";
});

document.querySelector("#reviewSubmit").addEventListener("click", function() {
    if (reviewText.value.trim() === "") {
        alert("리뷰 내용을 입력하세요.");
        return;
    }

    alert("리뷰가 등록되었습니다.");
    reviewText.value = "";
    localStorage.removeItem("shopDraft");
    draftMsg.textContent = "";
});
