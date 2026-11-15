/*
< 학생용 실습 문제 >

주제: 학원 홈페이지의 window, document 객체 다루기
출력: console.log() 또는 화면(textContent)으로 확인

=====================================================================
[기초]
=====================================================================

< 문제 1. 문서 제목 출력 >
① document 객체를 이용하여 현재 문서의 제목을 콘솔에 출력하시오.

출력 예시)
학원 홈페이지


< 문제 2. URL 비교 >
① document.URL과 window.location.href를 각각 콘솔에 출력하시오.
② 두 값이 같은지 === 연산자로 비교한 결과를 출력하시오.

출력 예시)
file:///D:/Git/JS/09_DOM/01_basic_test.html
file:///D:/Git/JS/09_DOM/01_basic_test.html
true


< 문제 3. 문서 상태 출력 >
① document.readyState 값을 출력하시오.
② 이 파일의 script에는 defer가 지정되어 있다.
   출력된 값이 무엇인지 확인하고, 그 의미를 주석으로 작성하시오.

출력 예시)
interactive


< 문제 4. 요소의 텍스트 읽기 >
① id가 academyName인 요소를 선택하시오.
② 해당 요소의 텍스트를 콘솔에 출력하시오.

출력 예시)
학원명: 코딩 아카데미


=====================================================================
[응용]
=====================================================================

< 문제 5. 요소의 텍스트 변경 >
① id가 notice인 요소의 기존 텍스트를 콘솔에 출력하시오.
② 텍스트를 "오늘은 휴강입니다."로 변경하시오.
③ 변경된 텍스트를 다시 콘솔에 출력하시오.

출력 예시)
변경 전: 오늘은 정상 수업입니다.
변경 후: 오늘은 휴강입니다.


< 문제 6. 전역 변수와 window 객체 >
① var로 academy 변수를 선언하고 "코딩 아카데미"를 저장하시오.
② let으로 city 변수를 선언하고 "부산"을 저장하시오.
③ window.academy와 window.city를 각각 출력하시오.
④ 결과가 다른 이유를 주석으로 작성하시오.

출력 예시)
window.academy: 코딩 아카데미
window.city: undefined


< 문제 7. 버튼으로 문서 제목 변경 >
① HTML의 버튼에는 onclick="changePageTitle()"이 작성되어 있다.
② changePageTitle() 함수를 작성하시오.
③ 함수가 실행되면 document.title을 "수강 신청 페이지"로 변경하시오.
④ id가 titleResult인 요소에 변경된 제목을 표시하시오.
⑤ 브라우저 탭의 제목이 바뀌는지 확인하시오.

화면 예시)
현재 문서 제목: 수강 신청 페이지


=====================================================================
[심화]
=====================================================================

< 문제 8. confirm()으로 수강 신청 >
① applyCourse() 함수를 작성하시오.
② confirm()으로 "JavaScript 과정을 신청하시겠습니까?"를 표시하시오.
③ 확인을 누르면 applyResult에 "수강 신청이 완료되었습니다."를 표시하시오.
④ 취소를 누르면 applyResult에 "수강 신청이 취소되었습니다."를 표시하시오.
⑤ confirm()의 반환값을 콘솔에 출력하시오.

출력 예시)
confirm 결과: true


< 문제 9. setTimeout()으로 지연 실행 >
① startTimer() 함수를 작성하시오.
② 버튼을 누르면 즉시 timerResult에 "3초 후에 메시지가 표시됩니다."를 표시하시오.
③ setTimeout()을 이용해 3초 후 timerResult에 "3초가 지났습니다."를 표시하시오.
④ 3초 후의 시각을 콘솔에 함께 출력하시오. (new Date().toLocaleTimeString())

출력 예시)
3초가 지났습니다. 오후 7:30:15


< 문제 10. DOM 트리 그리기 >
① HTML의 문제 10 영역(#courseBox)의 구조를 DOM 트리로 주석에 작성하시오.
   (공백 텍스트 노드는 생략한다.)
② 다음 질문의 답을 주석으로 작성하시오.
   - ul의 부모 요소는?
   - h3와 형제 관계인 요소를 모두 쓰시오.
   - "React" 텍스트 노드의 부모 요소는?
③ querySelector()로 #courseBox p 요소를 선택하여 텍스트를 출력하시오.

출력 예시)
수강료 문의
*/


// < 강사용 정답 >

// < 문제 1 >
console.log(document.title);


// < 문제 2 >
console.log(document.URL);
console.log(window.location.href);
console.log(document.URL === window.location.href); // true


// < 문제 3 >
console.log(document.readyState); // interactive

// defer 스크립트는 HTML 파싱이 끝난 직후 실행된다.
// 이때 문서는 파싱이 완료되었지만 이미지 등 리소스는 아직 로딩 중일 수 있으므로
// readyState가 "interactive"이다.
// 모든 리소스까지 로딩이 끝나면 "complete"가 된다.


// < 문제 4 >
const academyName = document.querySelector("#academyName");

console.log("학원명: " + academyName.textContent);


// < 문제 5 >
const notice = document.querySelector("#notice");

console.log("변경 전: " + notice.textContent);
notice.textContent = "오늘은 휴강입니다.";
console.log("변경 후: " + notice.textContent);


// < 문제 6 >
var academy = "코딩 아카데미";
let city = "부산";

console.log("window.academy: " + window.academy); // 코딩 아카데미
console.log("window.city: " + window.city);       // undefined

// 전역에서 var로 선언한 변수는 window 객체의 프로퍼티가 된다.
// let, const로 선언한 전역 변수는 window의 프로퍼티가 되지 않는다.


// < 문제 7 >
function changePageTitle() {
    document.title = "수강 신청 페이지";

    const titleResult = document.querySelector("#titleResult");
    titleResult.textContent = "현재 문서 제목: " + document.title;
}


// < 문제 8 >
function applyCourse() {
    const answer = confirm("JavaScript 과정을 신청하시겠습니까?");
    const applyResult = document.querySelector("#applyResult");

    console.log("confirm 결과: " + answer);

    if (answer) {
        applyResult.textContent = "수강 신청이 완료되었습니다.";
    } else {
        applyResult.textContent = "수강 신청이 취소되었습니다.";
    }
}


// < 문제 9 >
function startTimer() {
    const timerResult = document.querySelector("#timerResult");

    timerResult.textContent = "3초 후에 메시지가 표시됩니다.";

    setTimeout(function() {
        timerResult.textContent = "3초가 지났습니다.";
        console.log("3초가 지났습니다. " + new Date().toLocaleTimeString());
    }, 3000);
}


// < 문제 10 >
/*
    div#courseBox
        ├── h3
        │    └── "개설 과정"
        ├── ul
        │    ├── li
        │    │    └── "JavaScript"
        │    └── li
        │         └── "React"
        └── p
             └── "수강료 문의"

    - ul의 부모 요소 : div#courseBox
    - h3와 형제 관계인 요소 : ul, p
    - "React" 텍스트 노드의 부모 요소 : 두 번째 li
*/
const coursePrice = document.querySelector("#courseBox p");

console.log(coursePrice.textContent); // 수강료 문의
