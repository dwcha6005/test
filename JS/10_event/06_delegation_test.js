/*
< 학생용 실습 문제 >

주제: 쇼핑몰과 커뮤니티 화면에 이벤트 위임 적용하기
규칙: 모든 문제에서 자식 요소마다 이벤트를 등록하지 말고,
      "부모 요소 하나"에만 등록하여 처리한다.

=====================================================================
[기초]
=====================================================================

< 문제 1. 목록 위임 >
① fruitList에 click 리스너 하나만 등록하시오.
② 클릭한 li에만 selected 클래스를 적용하고, fruitResult에 "선택: 바나나"를 표시하시오.
③ li가 아닌 곳을 클릭하면 아무것도 하지 않도록 하시오.


< 문제 2. 버튼 그룹 위임 + dataset >
① colorArea에 리스너 하나만 등록하시오.
② 클릭한 버튼의 data-color 값으로 colorBox의 배경색을 변경하시오.
③ 콘솔에 "선택한 색상: royalblue"를 출력하시오.


< 문제 3. 숫자 키패드 >
① numPad에 리스너 하나만 등록하시오.
② 숫자 버튼을 누르면 display 뒤에 숫자를 이어 붙이시오. (최대 11자리)
③ data-key="clear" 버튼은 전체 지우기, data-key="back" 버튼은 마지막 한 글자 지우기를 하시오.


< 문제 4. matches()와 closest() 비교 >
① iconMenu에 리스너 하나를 등록하시오.
② 버튼 안의 아이콘(span)을 클릭했을 때와 글자를 클릭했을 때
   event.target.matches(".menu-btn")와 event.target.closest(".menu-btn")의 결과를 콘솔에 출력하시오.
③ closest()로 찾은 버튼의 data-page를 이용해 iconResult에 "cart 페이지로 이동"을 표시하시오.
④ 이벤트 위임에서 closest()를 사용해야 하는 이유를 주석으로 작성하시오.


=====================================================================
[응용]
=====================================================================

< 문제 5. 댓글 추가와 삭제 >
① commentAdd를 클릭하면 commentInput의 값으로 새 댓글 li를 만드시오.
   (구조는 HTML의 기존 li와 같게 : span + 삭제 버튼, 내용은 textContent 사용)
② 삭제는 commentList에 위임하여, 처음 있던 댓글과 새로 추가한 댓글 모두 삭제되게 하시오.
③ 삭제 전에 confirm("댓글을 삭제할까요?")으로 확인하시오.


< 문제 6. 장바구니 수량 변경 >
① cartTable의 tbody에 리스너 하나만 등록하시오.
② data-action 값으로 동작을 구분하시오.
   - plus   : 수량 1 증가 (최대 99)
   - minus  : 수량 1 감소 (최소 1)
   - remove : 해당 행(tr) 삭제
③ 수량이 바뀌면 해당 행의 소계(가격 x 수량)를 갱신하시오. (가격은 tr의 data-price)
④ 모든 동작 후 cartTotal에 총 금액을 다시 계산하여 표시하시오.
⑤ 모든 행이 삭제되면 cartTotal에 "장바구니가 비었습니다."를 표시하시오.


< 문제 7. 별점 선택 >
① stars에 리스너 하나만 등록하시오.
② 클릭한 별의 data-score까지 on 클래스를 적용하고, 나머지는 제거하시오.
③ starResult에 "4점을 선택했습니다."를 표시하시오.
④ (추가) mouseover 이벤트도 위임하여, 마우스를 올린 별까지 미리 on 표시를 하고
   stars에서 마우스가 나가면(mouseleave) 클릭으로 선택한 점수로 되돌리시오.


=====================================================================
[심화]
=====================================================================

< 문제 8. FAQ 아코디언 + 동적 추가 >
① faqList에 리스너 하나만 등록하시오.
② 질문(faq-q)을 클릭하면 바로 다음 형제 요소(faq-a)에 open 클래스를 토글하시오.
③ faqAdd를 클릭하면 질문과 답변으로 새 faq-item을 만들어 faqList에 추가하시오.
④ 새로 추가한 FAQ도 별도의 이벤트 등록 없이 열고 닫을 수 있어야 한다.
⑤ 하나를 열면 나머지는 모두 닫히도록 하시오.


< 문제 9. 메일함 체크박스 (change 이벤트 위임) >
① mailList에 change 리스너 하나만 등록하시오. (change 이벤트도 버블링된다.)
② 체크 상태가 바뀔 때마다 checkedCount에 "선택: 2개"를 표시하시오.
③ 모든 메일이 체크되면 checkAll도 체크, 하나라도 해제되면 checkAll도 해제하시오.
④ checkAll을 체크/해제하면 모든 메일 체크박스를 같은 상태로 바꾸시오.
⑤ deleteChecked를 클릭하면 체크된 메일(li)만 삭제하고 개수를 갱신하시오.
힌트) mailList.querySelectorAll("input:checked")


< 문제 10. 더블클릭으로 할 일 수정 >
① editList에 dblclick 리스너 하나만 등록하시오.
② span을 더블클릭하면 span을 숨기고, 같은 li 안에 기존 텍스트가 들어 있는 input을 만들어 포커스하시오.
③ editList에 keydown 리스너 하나만 등록하여 처리하시오.
   - Enter : input 값으로 span의 텍스트를 변경하고 input 삭제, span 다시 보이기
             (빈 값이면 변경하지 않음)
   - Esc   : 변경하지 않고 input 삭제, span 다시 보이기
④ 이미 수정 중인 li를 다시 더블클릭하면 input이 하나 더 생기지 않도록 하시오.
⑤ 한글 조합 중 Enter는 무시하시오.
*/


// < 강사용 정답 >

// < 문제 1 >
const fruitList = document.querySelector("#fruitList");
const fruitResult = document.querySelector("#fruitResult");

fruitList.addEventListener("click", function(event) {
    const li = event.target.closest("li");

    if (li === null) {
        return;
    }

    for (const item of fruitList.children) {
        item.classList.remove("selected");
    }
    li.classList.add("selected");

    fruitResult.textContent = "선택: " + li.textContent;
});


// < 문제 2 >
const colorArea = document.querySelector("#colorArea");
const colorBox = document.querySelector("#colorBox");

colorArea.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (button === null) {
        return;
    }

    colorBox.style.backgroundColor = button.dataset.color;
    console.log("선택한 색상: " + button.dataset.color);
});


// < 문제 3 >
const numPad = document.querySelector("#numPad");
const display = document.querySelector("#display");
let numberText = "";

numPad.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (button === null) {
        return;
    }

    if (button.dataset.key === "clear") {
        numberText = "";
    } else if (button.dataset.key === "back") {
        numberText = numberText.slice(0, -1);
    } else if (numberText.length < 11) {
        numberText += button.textContent;
    }

    display.textContent = numberText === "" ? " " : numberText;
});


// < 문제 4 >
const iconMenu = document.querySelector("#iconMenu");
const iconResult = document.querySelector("#iconResult");

iconMenu.addEventListener("click", function(event) {
    console.log("target: " + event.target.tagName);
    console.log("matches: " + event.target.matches(".menu-btn"));
    console.log("closest: ", event.target.closest(".menu-btn"));

    const button = event.target.closest(".menu-btn");

    if (button === null) {
        return;
    }

    iconResult.textContent = button.dataset.page + " 페이지로 이동";
});

// 아이콘(span)을 클릭하면 event.target은 span이므로 matches(".menu-btn")는 false가 된다.
// closest()는 span에서 위로 올라가며 .menu-btn을 찾기 때문에
// 버튼 안의 어느 부분을 클릭해도 정확한 버튼을 찾을 수 있다.


// < 문제 5 >
const commentInput = document.querySelector("#commentInput");
const commentAdd = document.querySelector("#commentAdd");
const commentList = document.querySelector("#commentList");

commentAdd.addEventListener("click", function() {
    const text = commentInput.value.trim();

    if (text === "") {
        return;
    }

    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");

    span.textContent = text;
    delBtn.type = "button";
    delBtn.className = "del-btn";
    delBtn.textContent = "삭제";

    li.append(span, " ", delBtn);
    commentList.append(li);

    commentInput.value = "";
});

commentList.addEventListener("click", function(event) {
    const delBtn = event.target.closest(".del-btn");

    if (delBtn === null) {
        return;
    }

    if (confirm("댓글을 삭제할까요?")) {
        delBtn.closest("li").remove();
    }
});


// < 문제 6 >
const cartBody = document.querySelector("#cartTable tbody");
const cartTotal = document.querySelector("#cartTotal");

function updateCartTotal() {
    const rows = cartBody.querySelectorAll("tr");

    if (rows.length === 0) {
        cartTotal.textContent = "장바구니가 비었습니다.";
        return;
    }

    let total = 0;

    rows.forEach(function(tr) {
        total += Number(tr.dataset.price) * Number(tr.querySelector(".qty").textContent);
    });

    cartTotal.textContent = "총 금액: " + total.toLocaleString() + "원";
}

cartBody.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (button === null) {
        return;
    }

    const tr = button.closest("tr");
    const qtySpan = tr.querySelector(".qty");
    let qty = Number(qtySpan.textContent);

    if (button.dataset.action === "plus" && qty < 99) {
        qty++;
    } else if (button.dataset.action === "minus" && qty > 1) {
        qty--;
    } else if (button.dataset.action === "remove") {
        tr.remove();
        updateCartTotal();
        return;
    }

    qtySpan.textContent = qty;
    tr.querySelector(".subtotal").textContent = (Number(tr.dataset.price) * qty).toLocaleString();
    updateCartTotal();
});


// < 문제 7 >
const stars = document.querySelector("#stars");
const starResult = document.querySelector("#starResult");
let selectedScore = 0;

function paintStars(score) {
    stars.querySelectorAll("span").forEach(function(star) {
        if (Number(star.dataset.score) <= score) {
            star.classList.add("on");
        } else {
            star.classList.remove("on");
        }
    });
}

stars.addEventListener("click", function(event) {
    const star = event.target.closest("span");

    if (star === null) {
        return;
    }

    selectedScore = Number(star.dataset.score);
    paintStars(selectedScore);
    starResult.textContent = selectedScore + "점을 선택했습니다.";
});

stars.addEventListener("mouseover", function(event) {
    const star = event.target.closest("span");

    if (star !== null) {
        paintStars(Number(star.dataset.score));
    }
});

stars.addEventListener("mouseleave", function() {
    paintStars(selectedScore);
});


// < 문제 8 >
const faqList = document.querySelector("#faqList");
const faqQuestion = document.querySelector("#faqQuestion");
const faqAnswer = document.querySelector("#faqAnswer");
const faqAdd = document.querySelector("#faqAdd");

faqList.addEventListener("click", function(event) {
    const question = event.target.closest(".faq-q");

    if (question === null) {
        return;
    }

    const answer = question.nextElementSibling;
    const isOpen = answer.classList.contains("open");

    // 모두 닫기
    faqList.querySelectorAll(".faq-a").forEach(function(a) {
        a.classList.remove("open");
    });

    // 닫혀 있던 것만 열기 (열려 있던 것을 누르면 닫힌 상태 유지)
    if (!isOpen) {
        answer.classList.add("open");
    }
});

faqAdd.addEventListener("click", function() {
    const q = faqQuestion.value.trim();
    const a = faqAnswer.value.trim();

    if (q === "" || a === "") {
        alert("질문과 답변을 모두 입력하세요.");
        return;
    }

    const item = document.createElement("div");
    const qBtn = document.createElement("button");
    const aText = document.createElement("p");

    item.className = "faq-item";
    qBtn.type = "button";
    qBtn.className = "faq-q";
    qBtn.textContent = "Q. " + q;
    aText.className = "faq-a";
    aText.textContent = "A. " + a;

    item.append(qBtn, aText);
    faqList.append(item);

    faqQuestion.value = "";
    faqAnswer.value = "";
});


// < 문제 9 >
const mailList = document.querySelector("#mailList");
const checkAll = document.querySelector("#checkAll");
const deleteChecked = document.querySelector("#deleteChecked");
const checkedCount = document.querySelector("#checkedCount");

function updateMailState() {
    const total = mailList.querySelectorAll("input").length;
    const checked = mailList.querySelectorAll("input:checked").length;

    checkedCount.textContent = "선택: " + checked + "개";
    checkAll.checked = total > 0 && total === checked;
}

mailList.addEventListener("change", function(event) {
    if (event.target.matches("input[type='checkbox']")) {
        updateMailState();
    }
});

checkAll.addEventListener("change", function() {
    mailList.querySelectorAll("input").forEach(function(box) {
        box.checked = checkAll.checked;
    });

    updateMailState();
});

deleteChecked.addEventListener("click", function() {
    mailList.querySelectorAll("input:checked").forEach(function(box) {
        box.closest("li").remove();
    });

    updateMailState();
});


// < 문제 10 >
const editList = document.querySelector("#editList");

function finishEdit(li, save) {
    const span = li.querySelector("span");
    const input = li.querySelector("input");

    if (save && input.value.trim() !== "") {
        span.textContent = input.value.trim();
    }

    input.remove();
    span.style.display = "";
}

editList.addEventListener("dblclick", function(event) {
    const span = event.target.closest("span");

    if (span === null) {
        return;
    }

    const li = span.closest("li");

    // 이미 수정 중이면 무시
    if (li.querySelector("input") !== null) {
        return;
    }

    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;

    span.style.display = "none";
    li.append(input);
    input.focus();
});

editList.addEventListener("keydown", function(event) {
    if (event.isComposing || !event.target.matches("input")) {
        return;
    }

    const li = event.target.closest("li");

    if (event.key === "Enter") {
        finishEdit(li, true);
    } else if (event.key === "Escape") {
        finishEdit(li, false);
    }
});
