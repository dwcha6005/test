/*
=====================================================================================
[수업 콘티] 11_form / 02. 입력값 검증              권장 90분 (설명 50 + 실습 40)
=====================================================================================
< 준비 >
- 02_validation.html을 열고 F12 → Console 탭.
- 10_event의 04(preventDefault), 03(blur, input)을 이미 배운 상태에서 진행한다.

< 진행 순서 >
1) 도입 (5분) - 섹션 1
   - 판서 : 방법 2가지(HTML 속성 / JS) × 시점 2가지(입력 중 / 제출 시)
   - "브라우저 검증은 끌 수 있다 → 실제 서비스는 서버에서도 검증" 한 줄 언급

2) HTML 기본 검증 (8분) - 섹션 2
   ▶ 시연 : 위쪽 폼에서 빈 상태로 [HTML 검증 테스트] → 브라우저 말풍선 "이 입력란을 작성하세요."
            칸을 하나씩 채우며 minlength, email, min/max, pattern 말풍선을 차례로 확인
            모두 통과 → alert "HTML 검증을 모두 통과했습니다."
   ▶ 포인트 : 간단하지만 메시지 모양을 바꾸기 어렵다 → 아래 폼은 novalidate + JS

3) 정규표현식 (12분) - 섹션 3
   ▶ 콘솔 확인 : true / false / true / false / true / false (6줄)
   ▶ 진행 : 표의 기호를 하나씩 설명하고, regex 객체의 4개 패턴을 같이 읽어 본다.
            콘솔에서 regex.userId.test("abc") 처럼 직접 몇 개 더 입력해 보게 한다.
   ▶ 포인트 : 정규식은 외우는 것이 아니라 "검증용 패턴을 읽고 복사해서 쓰는 것"

4) 메시지 함수 + 검사 함수 (8분) - 섹션 4, 5
   - showResult()가 왜 필요한지 → 반복 코드 제거
   - 검사 함수는 "검사 + 메시지 + true/false 반환" 세 가지를 한다는 점 강조

5) 입력 중 검사 (8분) - 섹션 6
   ▶ 시연 : 아이디에 "Ab" 입력 후 Tab → 빨간 테두리 + 메시지 / "hong123" → 초록
            비밀번호를 입력하는 동안 실시간으로 메시지 변화
            비밀번호 확인을 일치시킨 뒤 비밀번호를 수정 → 확인 칸도 바로 "일치하지 않습니다"
   ▶ 포인트 : blur(다 입력하고 검사)와 input(입력하는 동안 검사)을 상황에 맞게 선택

6) 제출 시 검사 (7분) - 섹션 7
   ▶ 시연 : 빈 상태로 [가입하기] → 6개 메시지가 한 번에 표시 + 첫 칸(아이디)에 커서
            모두 올바르게 입력 → "hong123님, 가입을 환영합니다!"
            (예 : hong123 / abcd1234 / abcd1234 / hong@naver.com / 010-1234-5678 / 동의)
   ▶ 포인트 : && 로 연결하면 첫 오류에서 멈춰 나머지 메시지가 안 나온다 → 배열 + includes(false)

7) 정리 (2분) - 섹션 8

< 예상 질문 / 자주 막히는 곳 >
- 정규식에 ^ $ 를 빼먹어서 "abc!!!hong123" 같은 값도 통과되는 실수
- 비밀번호를 바꿨을 때 비밀번호 확인을 다시 검사하지 않는 실수
- 10_event/final.js(회원가입)와 비교해 보게 하면 좋다 : 같은 기능을 함수로 정리한 버전

< 실습 연결 : 02_validation_test.html / .js (수강 신청서) >
- 섹션 3까지 : 문제 1 ~ 4 (문제 4는 HTML 속성만 수정)
- 섹션 6까지 : 문제 5 ~ 8
- 수업 마지막 : 문제 9, 10 (검사 함수와 메시지 함수 분리)
- readme의 "회원가입 유효성 검사 시험문제"는 이 실습 파일을 바탕으로 만들 수 있다.
=====================================================================================
*/


/*
    02_validation.js

    < 1. 입력값 검증(Validation)이란? >

    사용자가 입력한 값이 "규칙에 맞는지" 확인하는 것
    예) 아이디는 4~12자, 이메일은 @가 있어야 함, 비밀번호 확인은 비밀번호와 같아야 함

    검증하는 방법 2가지
    1) HTML 속성 검증   : required, minlength 등 속성만 작성 (간단, 메시지 모양 변경 어려움)
    2) JavaScript 검증  : 규칙과 메시지를 직접 작성 (실무에서 주로 사용)

    검증하는 시점 2가지
    1) 입력 중 (input / blur) : 바로바로 안내 → 사용자가 편함
    2) 제출 시 (submit)       : 최종 확인 → 반드시 필요 (입력 중 검사를 건너뛸 수 있으므로)

    참고 : 브라우저 검증은 사용자가 끌 수 있으므로, 실제 서비스에서는 서버에서도 다시 검증한다.
*/


/*
    < 2. HTML 기본 검증 속성 >

    속성                      의미                       예시
    ---------------------------------------------------------------------------
    required                  필수 입력                  <input required>
    minlength / maxlength     글자 수 최소 / 최대         minlength="4" maxlength="8"
    type="email"              이메일 형식                 a@b.com
    type="number" + min/max   숫자 범위                   min="14" max="100"
    pattern                   정규표현식 패턴             pattern="[0-9]{5}"

    - 조건에 맞지 않으면 제출 버튼을 눌러도 submit 이벤트가 발생하지 않고 말풍선이 뜬다.
    - <form novalidate> : HTML 검증을 끄고 JavaScript로만 검증할 때 사용 (아래 joinForm)
*/

document.querySelector("#htmlForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("HTML 검증을 모두 통과했습니다.");
});


/*
    < 3. 정규표현식(RegExp) 기초 - 검증에 필요한 만큼만 >

    정규표현식 : 문자열의 "형식"을 검사하는 패턴
    작성 : /패턴/          사용 : /패턴/.test(문자열)  → true / false

    기호        의미                           예
    ----------------------------------------------------------------
    ^  $        시작 / 끝 (전체가 일치해야 함)   /^abc$/
    [a-z]       a ~ z 중 한 글자               [a-z0-9] : 소문자 또는 숫자
    [0-9]       숫자 한 글자 (\d 와 같음)
    {4,12}      앞의 것이 4 ~ 12번             [a-z0-9]{4,12}
    {3}         정확히 3번                     [0-9]{3}
    +           1번 이상
    \.          점(.) 문자 그대로
    (?=.*[a-z]) 소문자가 "어딘가에 하나 이상" 포함 (비밀번호 조합 검사)

    자주 쓰는 패턴 (복사해서 사용)
*/

const regex = {
    userId:   /^[a-z0-9]{4,12}$/,                        // 영문 소문자, 숫자 4~12자
    password: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,         // 영문 + 숫자 포함 8자 이상
    email:    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,               // 아이디@도메인.주소
    phone:    /^010-[0-9]{4}-[0-9]{4}$/                   // 010-1234-5678
};

console.log(regex.userId.test("hong123"));          // true
console.log(regex.userId.test("Hong"));             // false (대문자)
console.log(regex.password.test("abcd1234"));       // true
console.log(regex.password.test("abcdefgh"));       // false (숫자 없음)
console.log(regex.email.test("hong@naver.com"));    // true
console.log(regex.phone.test("01012345678"));       // false (하이픈 없음)


/*
    < 4. 메시지 표시 함수 만들기 >

    검사할 항목이 많으면 "메시지 표시 코드"가 계속 반복된다.
    → 함수 하나로 만들어 재사용한다.

    showResult(입력요소, 메시지요소, 통과여부, 메시지)
*/

function showResult(input, msgElement, isValid, message) {
    msgElement.textContent = message;

    input.classList.remove("ok", "error");
    msgElement.classList.remove("ok", "error");

    if (isValid) {
        input.classList.add("ok");
        msgElement.classList.add("ok");
    } else {
        input.classList.add("error");
        msgElement.classList.add("error");
    }

    return isValid;
}


/*
    < 5. 항목별 검사 함수 >

    항목마다 "검사 + 메시지 표시"를 하는 함수를 만들고, 결과(true/false)를 반환한다.
    이렇게 만들어 두면 입력 중에도, 제출할 때도 같은 함수를 그대로 쓸 수 있다.
*/

const joinForm = document.querySelector("#joinForm");
const userId = document.querySelector("#userId");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const agree = document.querySelector("#agree");

function checkUserId() {
    const msg = document.querySelector("#userIdMsg");
    const value = userId.value.trim();

    if (value === "") {
        return showResult(userId, msg, false, "아이디를 입력하세요.");
    }
    if (!regex.userId.test(value)) {
        return showResult(userId, msg, false, "영문 소문자, 숫자 4~12자로 입력하세요.");
    }
    return showResult(userId, msg, true, "사용 가능한 아이디입니다.");
}

function checkPassword() {
    const msg = document.querySelector("#passwordMsg");

    if (!regex.password.test(password.value)) {
        return showResult(password, msg, false, "영문과 숫자를 포함해 8자 이상 입력하세요.");
    }
    return showResult(password, msg, true, "안전한 비밀번호입니다.");
}

function checkPassword2() {
    const msg = document.querySelector("#password2Msg");

    if (password2.value === "") {
        return showResult(password2, msg, false, "비밀번호를 한 번 더 입력하세요.");
    }
    if (password.value !== password2.value) {
        return showResult(password2, msg, false, "비밀번호가 일치하지 않습니다.");
    }
    return showResult(password2, msg, true, "비밀번호가 일치합니다.");
}

function checkEmail() {
    const msg = document.querySelector("#emailMsg");

    if (!regex.email.test(email.value.trim())) {
        return showResult(email, msg, false, "이메일 형식이 올바르지 않습니다.");
    }
    return showResult(email, msg, true, "");
}

function checkPhone() {
    const msg = document.querySelector("#phoneMsg");

    if (!regex.phone.test(phone.value.trim())) {
        return showResult(phone, msg, false, "010-0000-0000 형식으로 입력하세요.");
    }
    return showResult(phone, msg, true, "");
}

function checkAgree() {
    const msg = document.querySelector("#agreeMsg");

    if (!agree.checked) {
        return showResult(agree, msg, false, "약관에 동의해야 가입할 수 있습니다.");
    }
    return showResult(agree, msg, true, "");
}


/*
    < 6. 입력 중 검사 - 언제 어떤 이벤트를 쓸까? >

    blur  : 입력을 마치고 나갈 때 검사 (아이디, 이메일, 휴대폰)
            → 한 글자 칠 때마다 빨간 오류가 뜨면 사용자가 불편하다.
    input : 입력할 때마다 검사 (비밀번호 조건, 비밀번호 일치 여부)
            → 조건을 맞춰 가는 과정을 바로 보여 주는 것이 편하다.
    change: 체크박스

    주의 : 비밀번호를 바꾸면 "비밀번호 확인" 결과도 달라지므로
           password의 input에서 checkPassword2()도 함께 실행한다.
*/

userId.addEventListener("blur", checkUserId);
email.addEventListener("blur", checkEmail);
phone.addEventListener("blur", checkPhone);
agree.addEventListener("change", checkAgree);

password.addEventListener("input", function() {
    checkPassword();

    if (password2.value !== "") {
        checkPassword2();
    }
});

password2.addEventListener("input", checkPassword2);


/*
    < 7. 제출 시 최종 검사 >

    모든 검사 함수를 실행하고, 하나라도 false이면 제출을 막는다.

    주의 : if (checkUserId() && checkPassword() && ...) 처럼 && 로 연결하면
           앞에서 false가 나오는 순간 뒤의 함수는 실행되지 않아 메시지가 표시되지 않는다.
           → 결과를 배열에 모두 담은 뒤 확인한다.
*/

joinForm.addEventListener("submit", function(event) {
    event.preventDefault();   // 실습용 : 서버가 없으므로 항상 막는다.

    const results = [
        checkUserId(),
        checkPassword(),
        checkPassword2(),
        checkEmail(),
        checkPhone(),
        checkAgree()
    ];

    const joinResult = document.querySelector("#joinResult");

    if (results.includes(false)) {
        joinResult.textContent = "입력 내용을 다시 확인하세요.";

        // 첫 번째 오류 입력창으로 이동
        const firstError = joinForm.querySelector("input.error");
        firstError.focus();
        return;
    }

    joinResult.textContent = userId.value + "님, 가입을 환영합니다!";
    // 실제 서비스 : 여기서 joinForm.submit() 또는 fetch()로 서버에 전송
});


/*
    < 8. 정리 >

    1) 간단한 필수 입력, 글자 수 → HTML 속성(required, minlength)으로도 충분
    2) 원하는 메시지, 복잡한 규칙 → <form novalidate> + JavaScript 검증
    3) 항목별 검사 함수(true/false 반환)를 만들어 두고
       - 입력 중(blur / input)에 호출
       - 제출 시(submit)에 모두 다시 호출
    4) 형식 검사는 정규표현식 + test()
*/
