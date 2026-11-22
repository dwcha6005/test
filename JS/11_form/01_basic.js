/*
=====================================================================================
[수업 콘티] 11_form / 01. 폼 값 다루기             권장 60분 (설명 30 + 실습 30)
=====================================================================================
< 준비 >
- 01_basic.html을 열고 F12 → Console 탭.
- 페이지를 열면 콘솔에 섹션 2 ~ 5의 결과가 바로 출력되어 있다. 위에서부터 하나씩 짚어 준다.

< 진행 순서 >
1) 도입 (5분) - 섹션 1
   - 판서 : 폼에서 하는 일 = 값 읽기(01) → 값 검사(02) → 값 저장(12_web_storage)
   - 요소별 읽는 방법 표를 띄운다. 오늘은 이 표 하나가 핵심이다.

2) 폼 선택 (4분) - 섹션 2
   ▶ 콘솔 확인 : true / <input name="customerName"> / 14 (버튼 포함 입력 요소 수)
   ▶ 포인트 : document.폼name.입력name 은 final.js에서 쓰는 방식

3) text, select (4분) - 섹션 3
   ▶ 콘솔 확인 : "이름: 홍길동", "문의 유형: " (빈 값)
   ▶ 포인트 : select.value는 화면 글자("배송")가 아니라 option의 value("delivery")

4) radio (4분) - 섹션 4
   ▶ 콘솔 확인 : "답변 방법: email"
   ▶ 포인트 : 아무것도 체크되지 않으면 querySelector(':checked')는 null → 오류

5) checkbox (5분) - 섹션 5
   ▶ 콘솔 확인 : "동의 여부: false", "관심 서비스: []"
   ▶ 포인트 : 하나는 checked, 여러 개는 체크된 것만 배열로

6) 값 채우기 (3분) - 섹션 6
   ▶ 시연 : [예시 값 채우기] → 모든 입력 요소가 채워짐 (radio는 문자, checkbox는 할인 쿠폰 체크)
   ▶ 활용 : 회원정보 수정 화면, 지난 주문 불러오기

7) submit (3분) - 섹션 7
   ▶ 시연 : [문의 등록] → 아래 결과 영역에 전체 값 출력
            "문의 유형 : 교환/환불" ← value(refund)가 아니라 화면 글자를 출력한 방법 설명

8) FormData (3분) - 섹션 8
   ▶ 콘솔 확인 : get : 김철수 / getAll : ['coupon'] / 객체 : {customerName: ..., services: ...}
   ▶ 포인트 : 체크한 checkbox는 value가 없으면 "on"으로 들어간다 (agree 확인)
              17. Fetch 수업에서 서버로 보낼 때 다시 사용

9) reset (2분) - 섹션 9
   ▶ 시연 : [초기화] → 이름 칸이 빈칸이 아니라 "홍길동"으로 돌아감 (HTML의 value 초기값)
            결과 영역도 처음 문구로 복원

< 예상 질문 / 자주 막히는 곳 >
- checkbox에서 value를 읽고 체크 여부라고 착각 → 체크 여부는 checked
- form.name 처럼 폼 자체 속성과 이름이 겹치는 name은 피한다 (name, action, method 등)

< 실습 연결 : 01_basic_test.html / .js (호텔 예약) >
- 섹션 5까지 : 문제 1 ~ 5
- 섹션 8까지 : 문제 6, 7
- 수업 마지막 : 문제 8 ~ 10 (숙박일 계산, 실시간 요약, reset 직전 실행 주의)
=====================================================================================
*/


/*
    01_basic.js

    < 1. 폼(form)을 JavaScript로 다룬다는 것 >

    회원가입, 로그인, 주문, 문의 ... 사용자에게 값을 입력받는 모든 화면은 폼이다.
    JavaScript에서 폼을 다룰 때 하는 일은 딱 3가지이다.

    1) 값 읽기   : 사용자가 입력하거나 선택한 값을 가져온다.   ← 01
    2) 값 검사   : 올바른 값인지 확인한다.                    ← 02
    3) 값 저장   : 서버로 보내거나 브라우저에 저장한다.         ← 12_web_storage

    입력 요소별로 값을 읽는 방법이 다르다. 이 파일에서는 그 차이만 정확히 익힌다.

    요소                    읽는 방법
    -----------------------------------------------------------------
    input(text), textarea   요소.value
    select                  요소.value              (선택된 option의 value)
    radio                   체크된 요소의 value      (여러 개 중 하나)
    checkbox (하나)         요소.checked            (true / false)
    checkbox (여러 개)      체크된 요소들의 value를 배열로
*/


/*
    < 2. 폼 선택하기 >

    방법 1) id로 선택                   document.querySelector("#inquiryForm")
    방법 2) name으로 선택 (final.js 방식) document.inquiryForm

    폼 안의 입력 요소도 name으로 바로 접근할 수 있다.
    form.customerName   → name="customerName"인 input
    form.elements       → 폼 안의 모든 입력 요소 목록
*/

const form = document.querySelector("#inquiryForm");

console.log(form === document.inquiryForm);   // true (같은 폼)
console.log(form.customerName);               // <input name="customerName">
console.log(form.elements.length);            // 폼 안의 입력 요소 개수


/*
    < 3. text, textarea, select : value >

    가장 기본. 모두 .value로 읽고 .value로 바꾼다.

    select.value는 화면에 보이는 글자("배송")가 아니라 option의 value("delivery")이다.
    화면 글자가 필요하면 select.options[select.selectedIndex].text 를 사용한다.
*/

console.log("이름: " + form.customerName.value);   // 홍길동
console.log("문의 유형: " + form.inquiryType.value); // "" (아직 선택 안 함)


/*
    < 4. radio : 여러 개 중 체크된 하나 >

    같은 name을 가진 radio 중 체크된 것의 value를 읽는다.

    방법 1) form.replyMethod.value                              ← 간단
    방법 2) document.querySelector('input[name="replyMethod"]:checked').value

    주의 : 아무것도 체크되지 않았으면
           방법 1은 ""(빈 문자열), 방법 2는 querySelector 결과가 null → 오류
*/

console.log("답변 방법: " + form.replyMethod.value);   // email


/*
    < 5. checkbox : 하나일 때와 여러 개일 때 >

    하나 (동의 여부)
    : value가 아니라 checked(true/false)를 확인한다.

    여러 개 (관심 서비스)
    : 체크된 것만 골라 value를 배열로 모은다.
    : querySelectorAll('input[name="services"]:checked')
*/

function getCheckedServices() {
    const checked = form.querySelectorAll('input[name="services"]:checked');
    const values = [];

    checked.forEach(function(box) {
        values.push(box.value);
    });

    return values;
}

console.log("동의 여부: " + form.agree.checked);     // false
console.log("관심 서비스:", getCheckedServices());    // []


/*
    < 6. JavaScript로 값 채우기 >

    읽을 때와 같은 프로퍼티에 대입하면 된다.

    input / textarea / select  → .value = 값
    radio                      → form.replyMethod.value = "sms"   (해당 value가 체크됨)
    checkbox                   → .checked = true / false

    실제 예) "예시 값 채우기" 버튼, 수정 페이지에서 기존 정보 불러오기
*/

document.querySelector("#fillBtn").addEventListener("click", function() {
    form.customerName.value = "김철수";
    form.email.value = "kim@email.com";
    form.inquiryType.value = "refund";
    form.replyMethod.value = "sms";
    form.querySelector('input[value="coupon"]').checked = true;
    form.agree.checked = true;
    form.content.value = "교환 신청은 어디서 하나요?";
});


/*
    < 7. submit : 모든 값을 모아서 처리 >

    폼 처리의 기본 흐름

    form.addEventListener("submit", function(event) {
        event.preventDefault();   // 1. 페이지 이동 막기 (실습 / 직접 처리할 때)
        // 2. 값 읽기
        // 3. (02에서) 값 검사
        // 4. 결과 출력 또는 저장
    });
*/

const result = document.querySelector("#result");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const typeSelect = form.inquiryType;
    const typeText = typeSelect.options[typeSelect.selectedIndex].text;
    const services = getCheckedServices();

    result.textContent =
        "이름 : " + form.customerName.value + "\n" +
        "이메일 : " + form.email.value + "\n" +
        "문의 유형 : " + (typeSelect.value === "" ? "선택 안 함" : typeText) + "\n" +
        "답변 방법 : " + form.replyMethod.value + "\n" +
        "관심 서비스 : " + (services.length > 0 ? services.join(", ") : "없음") + "\n" +
        "개인정보 동의 : " + (form.agree.checked ? "동의" : "미동의") + "\n" +
        "문의 내용 : " + form.content.value;
});


/*
    < 8. FormData : 값을 한 번에 모으기 >

    new FormData(폼)
    : 폼 안의 name이 있는 입력 요소 값을 한 번에 모아 준다.
    : 체크되지 않은 checkbox, radio는 포함되지 않는다.

    formData.get("name")      : 값 하나
    formData.getAll("name")   : 같은 name의 값 전부 (checkbox 여러 개)
    Object.fromEntries(formData) : 일반 객체로 변환 (같은 name은 마지막 값만 남음)

    → 나중에 fetch()로 서버에 보낼 때 그대로 사용한다. (17. Fetch 수업)
*/

form.addEventListener("submit", function() {
    const formData = new FormData(form);

    console.log("get :", formData.get("customerName"));
    console.log("getAll :", formData.getAll("services"));
    console.log("객체 :", Object.fromEntries(formData));
});


/*
    < 9. reset : 초기화 >

    <button type="reset">을 누르면 모든 입력값이 HTML에 작성된 "초기값"으로 돌아간다.
    (value="홍길동"이 있으면 빈칸이 아니라 홍길동으로 돌아간다.)

    reset 이벤트는 값이 초기화되기 "직전"에 발생한다.
    결과 영역처럼 폼 바깥의 내용은 직접 지워야 한다.

    JavaScript로 초기화 : form.reset();
*/

form.addEventListener("reset", function() {
    result.textContent = "아직 등록된 문의가 없습니다.";
});
