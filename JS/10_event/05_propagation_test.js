/*
< 학생용 실습 문제 >

주제: 커뮤니티 사이트에서 이벤트 전파(버블링) 다루기
출력: console.log() 또는 화면으로 확인

=====================================================================
[기초]
=====================================================================

< 문제 1. 버블링 순서 확인 >
① outerBox, innerBox, innerBtn에 각각 click 리스너를 등록하시오.
② 각 리스너에서 "innerBox 실행 / target: innerBtn" 형식으로 콘솔에 출력하시오.
③ innerBtn을 클릭했을 때의 출력 순서를 먼저 주석으로 예측한 뒤 확인하시오.


< 문제 2. stopPropagation() >
① postItem을 클릭하면 postResult에 "게시글을 엽니다."를 표시하시오.
② likeBtn을 클릭하면 likeCount를 1 증가시키고 postResult에 "좋아요를 눌렀습니다."를 표시하시오.
③ likeBtn을 눌렀을 때 게시글이 열리지 않도록 하시오.
④ stopPropagation()이 없으면 어떤 문제가 생기는지 주석으로 작성하시오.


< 문제 3. 부모에서 자식의 클릭 확인하기 >
① menuBar에만 click 리스너를 등록하시오. (버튼 각각에 등록하지 않는다.)
② 클릭한 버튼의 텍스트를 event.target으로 읽어 menuResult에 "인기글 메뉴 선택"을 표시하시오.
③ 버튼 사이 빈 공간(nav 자신)을 클릭했을 때는 아무것도 표시하지 않도록 하시오.
   힌트) event.target.tagName === "BUTTON"


< 문제 4. preventDefault와 stopPropagation의 차이 >
① noticeCard를 클릭하면 noticeResult에 "공지 카드 클릭"을 표시하시오.
② noticeLink를 클릭하면 notice.html로 이동하지 않게 하되,
   카드의 클릭 동작은 그대로 실행되게 하시오.
③ 이때 사용해야 하는 메서드와 그 이유를 주석으로 작성하시오.


=====================================================================
[응용]
=====================================================================

< 문제 5. 알림 목록 - 읽음 처리와 삭제 >
① noti-item을 클릭하면 read 클래스를 적용하여 읽음 처리하시오.
② noti-delete(✕) 버튼을 클릭하면 해당 알림만 삭제하시오.
③ ✕ 버튼을 눌렀을 때 읽음 처리 코드가 실행되지 않도록 하시오.
④ 삭제할 때 콘솔에 "알림 삭제: (알림 내용)"을 출력하시오.


< 문제 6. 이미지 모달 >
① openImg를 클릭하면 imgModal에 open 클래스를 추가하시오.
② closeImg 버튼, 어두운 배경 클릭, Esc 키로 모달을 닫으시오.
③ 흰색 내용 영역(imgModalContent)을 클릭했을 때는 닫히지 않게 하시오.
   단, stopPropagation()을 사용하지 말고 event.target과 event.currentTarget을 비교하시오.


< 문제 7. 드롭다운 메뉴 - 바깥 클릭 시 닫기 >
① dropBtn을 클릭하면 dropMenu에 open 클래스를 토글하시오.
② 문서의 아무 곳이나 클릭하면 dropMenu를 닫으시오. (document에 click 등록)
③ dropBtn과 dropMenu 안을 클릭했을 때는 ②의 코드로 닫히지 않게 하시오.
   힌트) dropMenu.contains(event.target), dropBtn.contains(event.target)
④ stopPropagation() 대신 contains()로 처리하는 것이 좋은 이유를 주석으로 작성하시오.


=====================================================================
[심화]
=====================================================================

< 문제 8. 중첩 댓글 하이라이트 >
① 모든 comment 요소에 click 리스너를 등록하시오.
② 클릭한 댓글에만 highlight 클래스를 적용하고, 다른 댓글의 highlight는 모두 제거하시오.
③ 답글을 클릭하면 부모 댓글까지 하이라이트되는 문제를 해결하시오.
④ 콘솔에 클릭한 댓글의 첫 번째 줄 텍스트를 출력하시오.
   힌트) 댓글의 첫 번째 자식 노드(firstChild)는 텍스트 노드이다.


< 문제 9. 캡처링과 버블링 순서 >
① 문제 1의 outerBox, innerBox에 캡처링 단계 리스너를 추가로 등록하시오. (세 번째 인수 true)
② 각 리스너에서 "[캡처링] outerBox" 형식으로 출력하시오.
③ innerBtn을 클릭했을 때 문제 1과 합쳐진 전체 출력 순서를 주석으로 작성하시오.


< 문제 10. 사이드 메뉴 >
① openSide를 클릭하면 sideMenu를 여시오. (open 클래스)
② sideMenu 바깥을 클릭하면 닫으시오. (문제 7의 방식 활용)
③ sideMenu 안의 링크를 클릭하면 페이지 이동을 막고,
   클릭한 링크에만 selected 클래스를 적용한 뒤
   sideResult에 "자유게시판으로 이동합니다."를 표시하고 메뉴를 닫으시오.
④ 링크 처리는 sideMenu에 리스너 하나만 등록하여 처리하시오. (event.target.closest("a"))
*/


// < 강사용 정답 >

// < 문제 1 >
const outerBox = document.querySelector("#outerBox");
const innerBox = document.querySelector("#innerBox");
const innerBtn = document.querySelector("#innerBtn");

innerBtn.addEventListener("click", function(event) {
    console.log("innerBtn 실행 / target: " + event.target.id);
});

innerBox.addEventListener("click", function(event) {
    console.log("innerBox 실행 / target: " + event.target.id);
});

outerBox.addEventListener("click", function(event) {
    console.log("outerBox 실행 / target: " + event.target.id);
});

// innerBtn 클릭 시 출력 순서 : innerBtn → innerBox → outerBox
// target은 세 줄 모두 innerBtn이다.


// < 문제 2 >
const postItem = document.querySelector("#postItem");
const likeBtn = document.querySelector("#likeBtn");
const likeCount = document.querySelector("#likeCount");
const postResult = document.querySelector("#postResult");
let likes = 0;

postItem.addEventListener("click", function() {
    postResult.textContent = "게시글을 엽니다.";
});

likeBtn.addEventListener("click", function(event) {
    event.stopPropagation();

    likes++;
    likeCount.textContent = likes;
    postResult.textContent = "좋아요를 눌렀습니다.";
});

// stopPropagation()이 없으면 좋아요 클릭이 postItem까지 전달되어
// "좋아요를 눌렀습니다." 직후 "게시글을 엽니다."로 덮어써진다.
// (실제 사이트라면 좋아요를 누를 때마다 게시글 페이지로 이동하게 된다.)


// < 문제 3 >
const menuBar = document.querySelector("#menuBar");
const menuResult = document.querySelector("#menuResult");

menuBar.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        menuResult.textContent = event.target.textContent + " 메뉴 선택";
    }
});


// < 문제 4 >
const noticeCard = document.querySelector("#noticeCard");
const noticeLink = document.querySelector("#noticeLink");
const noticeResult = document.querySelector("#noticeResult");

noticeCard.addEventListener("click", function() {
    noticeResult.textContent = "공지 카드 클릭";
});

noticeLink.addEventListener("click", function(event) {
    event.preventDefault();
});

// 링크 이동(기본 동작)만 막아야 하므로 preventDefault()를 사용한다.
// stopPropagation()은 이동을 막지 못하고, 카드로 전달되는 클릭만 막아 버린다.


// < 문제 5 >
document.querySelectorAll(".noti-item").forEach(function(item) {
    item.addEventListener("click", function() {
        item.classList.add("read");
    });
});

document.querySelectorAll(".noti-delete").forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.stopPropagation();

        const item = button.closest(".noti-item");
        console.log("알림 삭제: " + item.firstChild.textContent.trim());
        item.remove();
    });
});


// < 문제 6 >
const openImg = document.querySelector("#openImg");
const closeImg = document.querySelector("#closeImg");
const imgModal = document.querySelector("#imgModal");

openImg.addEventListener("click", function() {
    imgModal.classList.add("open");
});

closeImg.addEventListener("click", function() {
    imgModal.classList.remove("open");
});

imgModal.addEventListener("click", function(event) {
    if (event.target === event.currentTarget) {
        imgModal.classList.remove("open");
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        imgModal.classList.remove("open");
    }
});


// < 문제 7 >
const dropBtn = document.querySelector("#dropBtn");
const dropMenu = document.querySelector("#dropMenu");

dropBtn.addEventListener("click", function() {
    dropMenu.classList.toggle("open");
});

document.addEventListener("click", function(event) {
    if (dropBtn.contains(event.target) || dropMenu.contains(event.target)) {
        return;
    }

    dropMenu.classList.remove("open");
});

// dropBtn에서 stopPropagation()을 사용하면 document까지 이벤트가 전달되지 않아
// 다른 기능(문제 10의 사이드 메뉴 닫기 등)이 함께 동작하지 않을 수 있다.
// contains()로 "어디를 클릭했는지" 확인하면 전파를 막지 않고 처리할 수 있다.


// < 문제 8 >
const comments = document.querySelectorAll(".comment");

comments.forEach(function(comment) {
    comment.addEventListener("click", function(event) {
        event.stopPropagation();   // 부모 댓글로 전달되지 않게

        comments.forEach(function(c) {
            c.classList.remove("highlight");
        });

        comment.classList.add("highlight");
        console.log(comment.firstChild.textContent.trim());
    });
});


// < 문제 9 >
outerBox.addEventListener("click", function() {
    console.log("[캡처링] outerBox");
}, true);

innerBox.addEventListener("click", function() {
    console.log("[캡처링] innerBox");
}, true);

// innerBtn 클릭 시 전체 출력 순서
// [캡처링] outerBox → [캡처링] innerBox → innerBtn 실행 → innerBox 실행 → outerBox 실행
// 이벤트는 바깥에서 안쪽으로 내려간 뒤(캡처링), 다시 바깥으로 올라온다(버블링).


// < 문제 10 >
const openSide = document.querySelector("#openSide");
const sideMenu = document.querySelector("#sideMenu");
const sideResult = document.querySelector("#sideResult");

openSide.addEventListener("click", function() {
    sideMenu.classList.add("open");
});

document.addEventListener("click", function(event) {
    if (openSide.contains(event.target) || sideMenu.contains(event.target)) {
        return;
    }

    sideMenu.classList.remove("open");
});

sideMenu.addEventListener("click", function(event) {
    const link = event.target.closest("a");

    if (link === null) {
        return;
    }

    event.preventDefault();

    sideMenu.querySelectorAll("a").forEach(function(a) {
        a.classList.remove("selected");
    });
    link.classList.add("selected");

    sideResult.textContent = link.textContent + "으로 이동합니다.";
    sideMenu.classList.remove("open");
});
