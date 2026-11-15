/*
< 학생용 실습 문제 >

주제: 게시판 관리자 화면의 스타일과 클래스 제어
출력: console.log() 또는 화면으로 확인

=====================================================================
[기초]
=====================================================================

< 문제 1. style로 글자 스타일 변경 >
① id가 pageTitle인 요소의 글자 색상을 "navy"로 변경하시오.
② 글자 크기를 "28px"로 변경하시오.
③ 변경한 두 값을 콘솔에 출력하시오.

출력 예시)
color: navy / fontSize: 28px


< 문제 2. camelCase 속성 이름 >
① id가 banner인 요소에 다음 스타일을 지정하시오.
   - background-color : #e0f2fe
   - padding : 16px
   - border-radius : 8px
   - font-weight : bold
② CSS 속성 이름을 JavaScript에서 어떻게 작성해야 하는지 주의하시오.


< 문제 3. 클래스 추가와 확인 >
① id가 noticeBox인 요소에 highlight 클래스를 추가하시오.
② classList.contains()로 highlight 클래스가 있는지 출력하시오.

출력 예시)
highlight 적용 여부: true


< 문제 4. 클래스로 요소 숨기기 >
① id가 adBox인 요소에 hidden 클래스를 추가하여 화면에서 숨기시오.
② style.display를 직접 바꾸지 말고 classList를 사용하시오.


=====================================================================
[응용]
=====================================================================

< 문제 5. 클래스 교체 >
① id가 statusBadge인 요소의 badge-new 클래스를 badge-hot으로 교체하시오.
② 요소의 텍스트를 "HOT"으로 변경하시오.
③ className을 출력하여 결과를 확인하시오.

출력 예시)
className: badge-hot


< 문제 6. style과 getComputedStyle() 비교 >
① pageTitle(문제 1에서 style로 지정)과 subTitle(CSS로만 지정)의
   style.fontSize 값을 각각 출력하시오.
② 두 요소의 getComputedStyle().fontSize 값을 각각 출력하시오.
③ subTitle의 style.fontSize가 빈 문자열인 이유를 주석으로 작성하시오.

출력 예시)
pageTitle - style: 28px / computed: 28px
subTitle  - style:  / computed: 20px


< 문제 7. 목록 항목 상태 전환 >
① taskList의 모든 li를 선택하시오.
② li를 클릭하면 done 클래스를 토글하시오.
③ 처음 실행할 때와 클릭할 때마다 done이 아닌 항목 수를 taskCount에 표시하시오.

화면 예시)
남은 작업: 3개


=====================================================================
[심화]
=====================================================================

< 문제 8. 다크 모드 전환 >
① themeBtn을 클릭하면 dashboard 요소에 dark 클래스를 토글하시오.
② toggle()의 반환값을 이용하여 버튼 문구를 변경하시오.
   - 다크 모드가 적용되면 "라이트 모드"
   - 다크 모드가 해제되면 "다크 모드"
③ 현재 상태를 콘솔에 출력하시오.

출력 예시)
다크 모드: true


< 문제 9. 입력값에 따른 상태 표시 >
① passwordInput에 입력할 때마다(input 이벤트) 실행되는 코드를 작성하시오.
② 입력값이 비어 있으면 error, success 클래스를 모두 제거하고
   pwMessage에 "비밀번호를 입력하세요."를 표시하시오.
③ 8자 미만이면 error 클래스를 적용하고 "8자 이상 입력하세요. (현재 n자)"를 표시하시오.
④ 8자 이상이면 success 클래스를 적용하고 "사용 가능한 비밀번호입니다."를 표시하시오.
⑤ error와 success 클래스가 동시에 적용되지 않도록 하시오.
⑥ pwMessage의 글자 색상은 style.color로 상태에 맞게 변경하시오. (빨강 / 초록 / 검정)


< 문제 10. 탭 메뉴 만들기 >
① tab-btn 버튼을 클릭하면 클릭한 버튼에만 active 클래스를 적용하시오.
② 같은 순서(인덱스)의 tab-panel만 보이고, 나머지 tab-panel에는 hidden 클래스를 적용하시오.
③ forEach()의 index 매개변수를 활용하시오.
④ 선택된 탭 이름을 콘솔에 출력하시오.

출력 예시)
선택된 탭: 자유게시판
*/


// < 강사용 정답 >

// < 문제 1 >
const pageTitle = document.querySelector("#pageTitle");

pageTitle.style.color = "navy";
pageTitle.style.fontSize = "28px";

console.log("color: " + pageTitle.style.color + " / fontSize: " + pageTitle.style.fontSize);


// < 문제 2 >
const banner = document.querySelector("#banner");

banner.style.backgroundColor = "#e0f2fe";
banner.style.padding = "16px";
banner.style.borderRadius = "8px";
banner.style.fontWeight = "bold";


// < 문제 3 >
const noticeBox = document.querySelector("#noticeBox");

noticeBox.classList.add("highlight");

console.log("highlight 적용 여부: " + noticeBox.classList.contains("highlight"));


// < 문제 4 >
const adBox = document.querySelector("#adBox");

adBox.classList.add("hidden");


// < 문제 5 >
const statusBadge = document.querySelector("#statusBadge");

statusBadge.classList.replace("badge-new", "badge-hot");
statusBadge.textContent = "HOT";

console.log("className: " + statusBadge.className);


// < 문제 6 >
const subTitle = document.querySelector("#subTitle");

console.log(
    "pageTitle - style: " + pageTitle.style.fontSize +
    " / computed: " + getComputedStyle(pageTitle).fontSize
);
console.log(
    "subTitle  - style: " + subTitle.style.fontSize +
    " / computed: " + getComputedStyle(subTitle).fontSize
);

// element.style은 인라인 스타일만 읽는다.
// subTitle의 글자 크기는 <style> 태그의 CSS 규칙으로 지정되었으므로
// style.fontSize는 빈 문자열이고, 실제 적용된 값은 getComputedStyle()로 확인해야 한다.


// < 문제 7 >
const taskItems = document.querySelectorAll("#taskList li");
const taskCount = document.querySelector("#taskCount");

function updateTaskCount() {
    let count = 0;

    taskItems.forEach(function(item) {
        if (!item.classList.contains("done")) {
            count++;
        }
    });

    taskCount.textContent = "남은 작업: " + count + "개";
}

taskItems.forEach(function(item) {
    item.addEventListener("click", function() {
        item.classList.toggle("done");
        updateTaskCount();
    });
});

updateTaskCount();


// < 문제 8 >
const dashboard = document.querySelector("#dashboard");
const themeBtn = document.querySelector("#themeBtn");

themeBtn.addEventListener("click", function() {
    const isDark = dashboard.classList.toggle("dark");

    if (isDark) {
        themeBtn.textContent = "라이트 모드";
    } else {
        themeBtn.textContent = "다크 모드";
    }

    console.log("다크 모드: " + isDark);
});


// < 문제 9 >
const passwordInput = document.querySelector("#passwordInput");
const pwMessage = document.querySelector("#pwMessage");

passwordInput.addEventListener("input", function() {
    const password = passwordInput.value;

    passwordInput.classList.remove("error", "success");

    if (password === "") {
        pwMessage.textContent = "비밀번호를 입력하세요.";
        pwMessage.style.color = "black";
    } else if (password.length < 8) {
        passwordInput.classList.add("error");
        pwMessage.textContent = "8자 이상 입력하세요. (현재 " + password.length + "자)";
        pwMessage.style.color = "red";
    } else {
        passwordInput.classList.add("success");
        pwMessage.textContent = "사용 가능한 비밀번호입니다.";
        pwMessage.style.color = "green";
    }
});

// 먼저 두 클래스를 모두 제거한 뒤 필요한 클래스만 추가하면
// error와 success가 동시에 적용되는 상황을 막을 수 있다.


// < 문제 10 >
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach(function(button, index) {
    button.addEventListener("click", function() {
        tabButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        tabPanels.forEach(function(panel) {
            panel.classList.add("hidden");
        });

        button.classList.add("active");
        tabPanels[index].classList.remove("hidden");

        console.log("선택된 탭: " + button.textContent);
    });
});
