/*
< 학생용 실습 문제 >

주제: 게시글 작성 화면에 자주 쓰는 이벤트 적용하기
출력: console.log() 또는 화면으로 확인

=====================================================================
[기초]
=====================================================================

< 문제 1. input - 제목 글자 수 >
① titleInput에 입력할 때마다 titleCount에 "12 / 30" 형식으로 표시하시오.
② 30자를 넘으면 titleCount에 over 클래스를 적용하시오.


< 문제 2. change - 카테고리 선택 >
① categorySelect의 값이 바뀌면 categoryResult에 "선택한 카테고리: 질문"을 표시하시오.
② "카테고리 선택"(값이 "")을 고르면 "카테고리를 선택하세요."를 표시하시오.


< 문제 3. mouseenter / mouseleave >
① thumb에 마우스가 들어오면 thumbGuide를 보이고, 나가면 숨기시오.
② 마우스가 들어오면 thumb의 배경색을 "#bfdbfe"로, 나가면 원래대로("") 되돌리시오.


< 문제 4. focus / blur >
① writer에 포커스가 들어오면 writerGuide에 "2~10자로 입력하세요."를 파란색으로 표시하시오.
② 포커스가 빠져나갈 때 값이 비어 있으면 "작성자를 입력하세요."를 빨간색으로 표시하시오.
③ 값이 있으면 writerGuide를 비우시오.


=====================================================================
[응용]
=====================================================================

< 문제 5. keydown - Enter로 태그 추가 >
① tagInput에서 Enter를 누르면 입력값을 "#태그" 형식의 span(class="tag")으로 tagList에 추가하시오.
② 빈 값, 이미 있는 태그, 5개 초과는 추가하지 말고 tagMsg에 이유를 표시하시오.
   - "태그를 입력하세요." / "이미 추가된 태그입니다." / "태그는 5개까지 추가할 수 있습니다."
③ 추가 후 입력창을 비우시오.
④ 한글 조합 중 Enter 중복 처리를 막으시오. (event.isComposing)


< 문제 6. input - 내용 글자 수 제한 >
① content에 입력할 때마다 contentCount에 "n / 200"을 표시하시오.
② 200자를 넘으면 contentCount에 over 클래스를 적용하고 submitBtn을 비활성화하시오.
③ 200자 이하이면 over 클래스를 제거하고 submitBtn을 다시 활성화하시오.


< 문제 7. change - 체크박스 >
① publicCheck의 체크 상태가 바뀔 때마다 실행되는 코드를 작성하시오.
② 체크를 해제하면(비공개) passwordRow를 보이고 postPassword에 포커스를 주시오.
③ 다시 체크하면 passwordRow를 숨기고 postPassword의 값을 비우시오.


=====================================================================
[심화]
=====================================================================

< 문제 8. input과 change 비교 + 임시 저장 >
① memoInput에 input, change 이벤트를 모두 등록하고 각각의 실행 횟수를 화면에 표시하시오.
② change 이벤트가 발생하면 saveMsg에 "임시 저장됨 (오후 8:15:30)" 형식으로 시각을 표시하시오.
   (new Date().toLocaleTimeString())
③ 두 이벤트의 실행 횟수가 다른 이유를 주석으로 작성하시오.


< 문제 9. scroll - 읽기 진행률 막대와 TOP 버튼 >
① window에 scroll 이벤트를 등록하시오.
② 아래 공식으로 진행률(%)을 계산하여 progressBar의 width에 적용하시오.

    진행률 = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100

③ scrollY가 300보다 크면 topBtn을 보이고, 아니면 숨기시오.
④ topBtn을 클릭하면 맨 위로 부드럽게 이동하시오.


< 문제 10. 키 조합 - Ctrl + Enter로 등록 >
① submitBtn을 클릭하면 submitResult에 "게시글이 등록되었습니다. (n자)"를 표시하는 submitPost() 함수를 만드시오.
② content에서 Ctrl + Enter를 누르면 submitPost()를 실행하시오. (event.ctrlKey)
③ 단, submitBtn이 비활성화 상태(200자 초과)이면 등록하지 마시오.
④ 내용이 비어 있으면 "내용을 입력하세요."를 표시하시오.
*/


// < 강사용 정답 >

// < 문제 1 >
const titleInput = document.querySelector("#titleInput");
const titleCount = document.querySelector("#titleCount");

titleInput.addEventListener("input", function() {
    const length = titleInput.value.length;

    titleCount.textContent = length + " / 30";

    if (length > 30) {
        titleCount.classList.add("over");
    } else {
        titleCount.classList.remove("over");
    }
});


// < 문제 2 >
const categorySelect = document.querySelector("#categorySelect");
const categoryResult = document.querySelector("#categoryResult");

categorySelect.addEventListener("change", function() {
    if (categorySelect.value === "") {
        categoryResult.textContent = "카테고리를 선택하세요.";
    } else {
        categoryResult.textContent = "선택한 카테고리: " + categorySelect.value;
    }
});


// < 문제 3 >
const thumb = document.querySelector("#thumb");
const thumbGuide = document.querySelector("#thumbGuide");

thumb.addEventListener("mouseenter", function() {
    thumbGuide.style.display = "block";
    thumb.style.backgroundColor = "#bfdbfe";
});

thumb.addEventListener("mouseleave", function() {
    thumbGuide.style.display = "none";
    thumb.style.backgroundColor = "";
});


// < 문제 4 >
const writer = document.querySelector("#writer");
const writerGuide = document.querySelector("#writerGuide");

writer.addEventListener("focus", function() {
    writerGuide.textContent = "2~10자로 입력하세요.";
    writerGuide.style.color = "blue";
});

writer.addEventListener("blur", function() {
    if (writer.value.trim() === "") {
        writerGuide.textContent = "작성자를 입력하세요.";
        writerGuide.style.color = "red";
    } else {
        writerGuide.textContent = "";
    }
});


// < 문제 5 >
const tagInput = document.querySelector("#tagInput");
const tagList = document.querySelector("#tagList");
const tagMsg = document.querySelector("#tagMsg");
const tags = [];

tagInput.addEventListener("keydown", function(event) {
    if (event.isComposing || event.key !== "Enter") {
        return;
    }

    const tag = tagInput.value.trim();

    if (tag === "") {
        tagMsg.textContent = "태그를 입력하세요.";
        return;
    }

    if (tags.includes(tag)) {
        tagMsg.textContent = "이미 추가된 태그입니다.";
        return;
    }

    if (tags.length >= 5) {
        tagMsg.textContent = "태그는 5개까지 추가할 수 있습니다.";
        return;
    }

    tags.push(tag);

    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = "#" + tag;
    tagList.append(span);

    tagMsg.textContent = "";
    tagInput.value = "";
});


// < 문제 6 >
const content = document.querySelector("#content");
const contentCount = document.querySelector("#contentCount");
const submitBtn = document.querySelector("#submitBtn");

content.addEventListener("input", function() {
    const length = content.value.length;

    contentCount.textContent = length + " / 200";

    if (length > 200) {
        contentCount.classList.add("over");
        submitBtn.disabled = true;
    } else {
        contentCount.classList.remove("over");
        submitBtn.disabled = false;
    }
});


// < 문제 7 >
const publicCheck = document.querySelector("#publicCheck");
const passwordRow = document.querySelector("#passwordRow");
const postPassword = document.querySelector("#postPassword");

publicCheck.addEventListener("change", function() {
    if (publicCheck.checked) {
        passwordRow.style.display = "none";
        postPassword.value = "";
    } else {
        passwordRow.style.display = "block";
        postPassword.focus();
    }
});


// < 문제 8 >
const memoInput = document.querySelector("#memoInput");
const inputCount = document.querySelector("#inputCount");
const changeCount = document.querySelector("#changeCount");
const saveMsg = document.querySelector("#saveMsg");

let inputNumber = 0;
let changeNumber = 0;

memoInput.addEventListener("input", function() {
    inputNumber++;
    inputCount.textContent = inputNumber;
});

memoInput.addEventListener("change", function() {
    changeNumber++;
    changeCount.textContent = changeNumber;
    saveMsg.textContent = "임시 저장됨 (" + new Date().toLocaleTimeString() + ")";
});

// input은 글자가 바뀔 때마다 실행되고,
// change는 입력을 마치고 포커스가 빠져나갈 때 값이 바뀌었으면 한 번만 실행된다.
// 그래서 서버 저장처럼 무거운 작업은 change에서 처리하는 것이 좋다.


// < 문제 9 >
const progressBar = document.querySelector("#progressBar");
const topBtn = document.querySelector("#topBtn");

window.addEventListener("scroll", function() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = window.scrollY / maxScroll * 100;

    progressBar.style.width = percent + "%";

    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// < 문제 10 >
const submitResult = document.querySelector("#submitResult");

function submitPost() {
    if (submitBtn.disabled) {
        return;
    }

    const length = content.value.trim().length;

    if (length === 0) {
        submitResult.textContent = "내용을 입력하세요.";
        return;
    }

    submitResult.textContent = "게시글이 등록되었습니다. (" + length + "자)";
}

submitBtn.addEventListener("click", submitPost);

content.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === "Enter") {
        submitPost();
    }
});
