/*
< 학생용 실습 문제 >

주제: 게시글 댓글 목록에서 DOM 탐색하기
출력: console.log() 또는 화면으로 확인

=====================================================================
[기초]
=====================================================================

< 문제 1. children과 childNodes 비교 >
① id가 commentList인 요소를 선택하시오.
② children의 개수와 childNodes의 개수를 각각 출력하시오.
③ 두 값이 다른 이유를 주석으로 작성하시오.

출력 예시)
children: 4 / childNodes: 9


< 문제 2. 첫 번째와 마지막 자식 요소 >
① commentList의 첫 번째 자식 요소와 마지막 자식 요소의 id를 출력하시오.
② firstChild를 사용하면 어떤 노드가 나오는지 nodeName으로 출력하시오.

출력 예시)
첫 번째 댓글: c1 / 마지막 댓글: c4
firstChild: #text


< 문제 3. 형제 요소 찾기 >
① id가 c2인 요소의 이전 형제 요소와 다음 형제 요소의 id를 출력하시오.
② id가 c1인 요소의 이전 형제 요소를 출력하시오.

출력 예시)
c2의 이전 댓글: c1 / 다음 댓글: c3
c1의 이전 형제: null


< 문제 4. 부모와 조상 찾기 >
① id가 c3인 댓글 안의 작성자(.author) 요소를 선택하시오.
② parentElement로 부모 요소의 id를 출력하시오.
③ closest()로 가장 가까운 section의 id를 출력하시오.

출력 예시)
부모 요소: c3
소속 영역: commentSection


=====================================================================
[응용]
=====================================================================

< 문제 5. while문으로 형제 순회 >
① commentList의 첫 번째 자식 요소에서 시작하시오.
② nextElementSibling과 while문을 이용하여
   모든 댓글의 "작성자 - 내용"을 출력하시오.
   (작성자와 내용은 현재 댓글 요소 기준으로 querySelector() 사용)

출력 예시)
홍길동 - 설명이 정말 자세하네요!
김철수 - closest() 덕분에 코드가 짧아졌어요.
이영희 - 형제 요소 탐색이 헷갈렸는데 이해됐습니다.
박민수 - 실습 문제도 올려주세요.


< 문제 6. children을 배열로 가공 >
① commentList의 children을 배열로 변환하시오.
② filter()로 best 클래스가 있는 댓글만 골라 작성자 배열을 출력하시오.
③ 모든 댓글의 좋아요 수(.like-count)를 숫자로 변환하여 합계를 출력하시오.

출력 예시)
베스트 댓글 작성자: ['김철수', '박민수']
좋아요 합계: 29


< 문제 7. matches()로 조건 확인 >
① 모든 댓글을 순회하며 matches()로 ".best"인지 확인하시오.
② "작성자: 베스트 여부" 형식으로 출력하시오.
③ matches()와 classList.contains()의 차이를 주석으로 작성하시오.

출력 예시)
홍길동: false
김철수: true
이영희: false
박민수: true


=====================================================================
[심화]
=====================================================================

< 문제 8. 좋아요 버튼 >
① 모든 like-btn 버튼에 click 이벤트를 등록하시오.
② 클릭한 버튼에서 closest()로 해당 댓글(li)을 찾으시오.
③ 그 댓글 안의 like-count 숫자를 1 증가시키시오.
④ "작성자 댓글 좋아요: n" 형식으로 콘솔에 출력하시오.

출력 예시)
홍길동 댓글 좋아요: 4


< 문제 9. 댓글 삭제와 개수 갱신 >
① delete-btn을 클릭하면 confirm()으로 "작성자님의 댓글을 삭제할까요?"를 확인하시오.
② 확인을 누르면 해당 댓글(li)만 삭제하시오.
③ 삭제 후 commentList의 children 개수로 commentCount를 "댓글 n개"로 갱신하시오.
④ 댓글이 0개가 되면 "등록된 댓글이 없습니다."를 표시하시오.


< 문제 10. 댓글 순서 변경 >
① up-btn을 클릭하면 해당 댓글을 바로 위 댓글의 앞으로 이동하시오.
② down-btn을 클릭하면 해당 댓글을 바로 아래 댓글의 뒤로 이동하시오.
③ 이미 맨 위(또는 맨 아래)이면 이동하지 않고 "더 이상 이동할 수 없습니다."를 출력하시오.
④ 이동 후 현재 댓글 순서(id 배열)를 출력하시오.
힌트) previousElementSibling, nextElementSibling, before(), after()
      이미 문서에 있는 요소를 before(), after()에 전달하면 복제가 아니라 이동한다.

출력 예시)
현재 순서: ['c2', 'c1', 'c3', 'c4']
*/


// < 강사용 정답 >

// < 문제 1 >
const commentList = document.querySelector("#commentList");

console.log(
    "children: " + commentList.children.length +
    " / childNodes: " + commentList.childNodes.length
);

// childNodes는 li 사이의 줄바꿈과 공백 텍스트 노드까지 포함한다.
// li 4개 + 텍스트 노드 5개 = 9개


// < 문제 2 >
console.log(
    "첫 번째 댓글: " + commentList.firstElementChild.id +
    " / 마지막 댓글: " + commentList.lastElementChild.id
);
console.log("firstChild: " + commentList.firstChild.nodeName);


// < 문제 3 >
const c2 = document.querySelector("#c2");
const c1 = document.querySelector("#c1");

console.log(
    "c2의 이전 댓글: " + c2.previousElementSibling.id +
    " / 다음 댓글: " + c2.nextElementSibling.id
);
console.log("c1의 이전 형제: " + c1.previousElementSibling);


// < 문제 4 >
const c3Author = document.querySelector("#c3 .author");

console.log("부모 요소: " + c3Author.parentElement.id);
console.log("소속 영역: " + c3Author.closest("section").id);


// < 문제 5 >
let currentComment = commentList.firstElementChild;

while (currentComment !== null) {
    const author = currentComment.querySelector(".author").textContent;
    const content = currentComment.querySelector(".content").textContent;

    console.log(author + " - " + content);

    currentComment = currentComment.nextElementSibling;
}


// < 문제 6 >
const comments = Array.from(commentList.children);

const bestAuthors = comments
    .filter(function(li) {
        return li.classList.contains("best");
    })
    .map(function(li) {
        return li.querySelector(".author").textContent;
    });

let likeTotal = 0;

comments.forEach(function(li) {
    likeTotal += Number(li.querySelector(".like-count").textContent);
});

console.log("베스트 댓글 작성자:", bestAuthors);
console.log("좋아요 합계: " + likeTotal);


// < 문제 7 >
for (const li of commentList.children) {
    const author = li.querySelector(".author").textContent;

    console.log(author + ": " + li.matches(".best"));
}

// classList.contains()는 클래스 이름 하나만 확인한다.
// matches()는 CSS 선택자 전체를 확인할 수 있어
// "li.comment.best", "#commentList > li" 같은 조건도 검사할 수 있다.


// < 문제 8 >
const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const comment = button.closest("li");
        const likeCount = comment.querySelector(".like-count");
        const author = comment.querySelector(".author").textContent;

        likeCount.textContent = Number(likeCount.textContent) + 1;

        console.log(author + " 댓글 좋아요: " + likeCount.textContent);
    });
});


// < 문제 9 >
const commentCount = document.querySelector("#commentCount");
const deleteButtons = document.querySelectorAll(".delete-btn");

function updateCommentCount() {
    const count = commentList.children.length;

    if (count === 0) {
        commentCount.textContent = "등록된 댓글이 없습니다.";
    } else {
        commentCount.textContent = "댓글 " + count + "개";
    }
}

deleteButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const comment = button.closest("li");
        const author = comment.querySelector(".author").textContent;

        if (confirm(author + "님의 댓글을 삭제할까요?")) {
            comment.remove();
            updateCommentCount();
        }
    });
});


// < 문제 10 >
function printOrder() {
    const order = Array.from(commentList.children).map(function(li) {
        return li.id;
    });

    console.log("현재 순서:", order);
}

document.querySelectorAll(".up-btn").forEach(function(button) {
    button.addEventListener("click", function() {
        const comment = button.closest("li");
        const prev = comment.previousElementSibling;

        if (prev === null) {
            console.log("더 이상 이동할 수 없습니다.");
            return;
        }

        prev.before(comment);
        printOrder();
    });
});

document.querySelectorAll(".down-btn").forEach(function(button) {
    button.addEventListener("click", function() {
        const comment = button.closest("li");
        const next = comment.nextElementSibling;

        if (next === null) {
            console.log("더 이상 이동할 수 없습니다.");
            return;
        }

        next.after(comment);
        printOrder();
    });
});
