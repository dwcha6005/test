/*
< 학생용 실습 문제 >

주제: 온라인 강의 수강 신청서 입력값 검증
출력: console.log() 또는 화면으로 확인

=====================================================================
[기초]
=====================================================================

< 문제 1. 정규표현식 test() >
① 영문 소문자로 시작하고, 영문 소문자/숫자로 이루어진 5~10자 아이디 정규식을 작성하시오.
② 아래 문자열이 규칙에 맞는지 test()로 확인하여 출력하시오.

    "hong123", "1hong", "hong", "hong_123", "abcdefghijk"

출력 예시)
hong123 : true
1hong : false
hong : false
hong_123 : false
abcdefghijk : false


< 문제 2. 이름 검사 (blur) >
① 한글 2~5자 정규식을 작성하시오. 힌트) [가-힣]
② name 입력창에서 포커스가 빠져나갈 때 검사하여 nameMsg에 결과를 표시하시오.
   - 비어 있으면 "이름을 입력하세요."
   - 형식이 틀리면 "한글 2~5자로 입력하세요."
   - 통과하면 "확인되었습니다."


< 문제 3. 나이 검사 - 숫자와 범위 >
① age 입력창에서 포커스가 빠져나갈 때 검사하시오.
② 숫자가 아니면 "숫자로 입력하세요.", 14 미만 또는 100 초과이면 "14~100세만 신청할 수 있습니다."
   힌트) Number(""), isNaN("abc")의 결과를 먼저 콘솔로 확인해 보시오.
③ 소수(15.5)는 허용하지 않으시오. 힌트) Number.isInteger()


< 문제 4. HTML 속성 검증 >
① JavaScript를 작성하지 말고, HTML의 quickForm 입력 요소에 속성만 추가하여 다음 규칙을 적용하시오.
   - 수강생 이름 : 필수
   - 수강 코드   : 필수, 영문 대문자 3자 + 숫자 3자 (pattern)
   - 신청 인원   : 1 ~ 5
② 모든 규칙을 통과했을 때만 실행되는 submit 리스너를 작성하여
   alert("빠른 신청이 완료되었습니다.")를 표시하고 전송은 막으시오.


=====================================================================
[응용]
=====================================================================

< 문제 5. 메시지 표시 함수 + 이메일 검사 >
① showMsg(input, msgElement, isValid, message) 함수를 작성하시오.
   - 메시지를 표시하고, 통과 여부에 따라 input과 msgElement에 ok 또는 error 클래스를 적용
   - isValid를 그대로 반환
② 문제 2, 3도 showMsg()를 사용하도록 바꾸시오.
③ email에서 포커스가 빠져나갈 때 이메일 형식을 검사하시오.


< 문제 6. 비밀번호 조건 체크리스트 >
① password에 입력할 때마다(input) pwRules의 4가지 조건을 각각 검사하시오.
② 통과한 조건의 li는 pass 클래스와 "✔ 8자 이상", 통과하지 못한 조건은 fail 클래스와 "✖ 8자 이상"으로 표시하시오.
   (li의 data-rule 값으로 어떤 조건인지 구분)
③ 통과한 조건 개수에 따라 passwordMsg에 강도를 표시하시오.
   - 0~1개 : "약함" / 2~3개 : "보통" / 4개 : "강함"
④ 4개를 모두 통과해야 사용 가능한 비밀번호로 판단하시오.


< 문제 7. 비밀번호 확인 >
① password2에 입력할 때마다 password와 같은지 검사하시오.
② password를 수정했을 때도 password2가 입력되어 있으면 다시 검사하시오.


=====================================================================
[심화]
=====================================================================

< 문제 8. 휴대폰 번호 자동 하이픈 >
① phone에 입력할 때마다 숫자가 아닌 문자를 모두 제거하시오.  힌트) value.replace(/[^0-9]/g, "")
② 숫자 개수에 따라 하이픈을 자동으로 넣으시오.
   - 3자리 이하 : 010
   - 7자리 이하 : 010-1234
   - 그 이상   : 010-1234-5678
③ 포커스가 빠져나갈 때 /^010-\d{4}-\d{4}$/ 형식인지 검사하시오.


< 문제 9. 제출 시 전체 검사 >
① signupForm이 제출되면 모든 항목을 다시 검사하시오.
② 첫 오류에서 멈추지 말고 모든 오류 메시지를 표시하시오. (&& 연결 금지)
③ 오류가 있으면 첫 번째 오류 입력창으로 포커스를 이동하시오.
④ 모두 통과하면 signupResult에 "홍길동님(25세) 수강 신청이 완료되었습니다."를 표시하시오.


< 문제 10. 남은 항목 실시간 안내 >
① 폼의 값이 바뀔 때마다 readyMsg에 아직 통과하지 못한 항목 수를 표시하시오.
   - 남은 항목이 있으면 "3개 항목을 확인하세요." (회색)
   - 모두 통과하면 "✔ 신청할 수 있습니다." (초록색)
② 단, 이때는 각 입력창의 오류 메시지를 표시하지 않아야 한다.
   (아직 입력하지 않은 칸에 오류가 뜨면 안 됨)
③ 이를 위해 "검사만 하는 함수"와 "메시지를 표시하는 함수"를 분리하시오.
   힌트) const validators = { name: function(v) { return ... }, age: ..., ... };
*/


// < 강사용 정답 >

// < 공통 : 검사 규칙 (문제 10에서 분리) >
// 값만 받아서 true / false만 반환한다. (화면에 아무것도 표시하지 않음)
const validators = {
    name: function(v) {
        return /^[가-힣]{2,5}$/.test(v.trim());
    },
    age: function(v) {
        const age = Number(v);
        return v.trim() !== "" && Number.isInteger(age) && age >= 14 && age <= 100;
    },
    email: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
    },
    password: function(v) {
        return getPasswordScore(v) === 4;
    },
    password2: function(v) {
        return v !== "" && v === document.querySelector("#password").value;
    },
    phone: function(v) {
        return /^010-\d{4}-\d{4}$/.test(v);
    }
};


// < 문제 1 >
const idRegex = /^[a-z][a-z0-9]{4,9}$/;
const testIds = ["hong123", "1hong", "hong", "hong_123", "abcdefghijk"];

testIds.forEach(function(id) {
    console.log(id + " : " + idRegex.test(id));
});


// < 문제 5 > (문제 2, 3에서 사용하므로 먼저 작성)
function showMsg(input, msgElement, isValid, message) {
    msgElement.textContent = message;

    input.classList.remove("ok", "error");
    msgElement.classList.remove("ok", "error");

    const className = isValid ? "ok" : "error";
    input.classList.add(className);
    msgElement.classList.add(className);

    return isValid;
}


// < 문제 2 >
const nameInput = document.querySelector("#name");
const nameMsg = document.querySelector("#nameMsg");

function checkName() {
    const value = nameInput.value.trim();

    if (value === "") {
        return showMsg(nameInput, nameMsg, false, "이름을 입력하세요.");
    }
    if (!validators.name(value)) {
        return showMsg(nameInput, nameMsg, false, "한글 2~5자로 입력하세요.");
    }
    return showMsg(nameInput, nameMsg, true, "확인되었습니다.");
}

nameInput.addEventListener("blur", checkName);


// < 문제 3 >
const ageInput = document.querySelector("#age");
const ageMsg = document.querySelector("#ageMsg");

console.log(Number(""));        // 0  → 빈 값도 숫자 0이 되므로 따로 확인해야 함
console.log(isNaN("abc"));      // true

function checkAge() {
    const value = ageInput.value.trim();
    const age = Number(value);

    if (value === "" || isNaN(value) || !Number.isInteger(age)) {
        return showMsg(ageInput, ageMsg, false, "숫자로 입력하세요.");
    }
    if (!validators.age(value)) {
        return showMsg(ageInput, ageMsg, false, "14~100세만 신청할 수 있습니다.");
    }
    return showMsg(ageInput, ageMsg, true, "확인되었습니다.");
}

ageInput.addEventListener("blur", checkAge);


// < 문제 4 >
/*
    HTML 수정 정답

    <input type="text" id="quickName" required>
    <input type="text" id="quickCode" required pattern="[A-Z]{3}[0-9]{3}">
    <input type="number" id="quickCount" min="1" max="5">

    참고 : pattern 속성은 자동으로 전체 일치(^ ... $)로 검사한다.
*/
document.querySelector("#quickForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("빠른 신청이 완료되었습니다.");
});


// < 문제 5 > 이메일
const emailInput = document.querySelector("#email");
const emailMsg = document.querySelector("#emailMsg");

function checkEmail() {
    if (!validators.email(emailInput.value)) {
        return showMsg(emailInput, emailMsg, false, "이메일 형식이 올바르지 않습니다.");
    }
    return showMsg(emailInput, emailMsg, true, "확인되었습니다.");
}

emailInput.addEventListener("blur", checkEmail);


// < 문제 6 >
const passwordInput = document.querySelector("#password");
const passwordMsg = document.querySelector("#passwordMsg");
const pwRules = document.querySelectorAll("#pwRules li");

const pwRuleTests = {
    length: function(v) { return v.length >= 8; },
    letter: function(v) { return /[a-zA-Z]/.test(v); },
    number: function(v) { return /[0-9]/.test(v); },
    special: function(v) { return /[!@#$%^&*]/.test(v); }
};

// 통과한 조건 개수 반환
function getPasswordScore(value) {
    let score = 0;

    for (const rule in pwRuleTests) {
        if (pwRuleTests[rule](value)) {
            score++;
        }
    }

    return score;
}

function checkPassword() {
    const value = passwordInput.value;

    pwRules.forEach(function(li) {
        const pass = pwRuleTests[li.dataset.rule](value);
        const label = li.textContent.slice(2);   // "✖ " 또는 "✔ " 뒤의 글자

        li.className = pass ? "pass" : "fail";
        li.textContent = (pass ? "✔ " : "✖ ") + label;
    });

    const score = getPasswordScore(value);
    let level;

    if (score <= 1) {
        level = "약함";
    } else if (score <= 3) {
        level = "보통";
    } else {
        level = "강함";
    }

    return showMsg(passwordInput, passwordMsg, score === 4, "보안 강도: " + level);
}


// < 문제 7 >
const password2Input = document.querySelector("#password2");
const password2Msg = document.querySelector("#password2Msg");

function checkPassword2() {
    if (password2Input.value === "") {
        return showMsg(password2Input, password2Msg, false, "비밀번호를 한 번 더 입력하세요.");
    }
    if (!validators.password2(password2Input.value)) {
        return showMsg(password2Input, password2Msg, false, "비밀번호가 일치하지 않습니다.");
    }
    return showMsg(password2Input, password2Msg, true, "일치합니다.");
}

passwordInput.addEventListener("input", function() {
    checkPassword();

    if (password2Input.value !== "") {
        checkPassword2();
    }
});

password2Input.addEventListener("input", checkPassword2);


// < 문제 8 >
const phoneInput = document.querySelector("#phone");
const phoneMsg = document.querySelector("#phoneMsg");

phoneInput.addEventListener("input", function() {
    const numbers = phoneInput.value.replace(/[^0-9]/g, "").slice(0, 11);

    if (numbers.length <= 3) {
        phoneInput.value = numbers;
    } else if (numbers.length <= 7) {
        phoneInput.value = numbers.slice(0, 3) + "-" + numbers.slice(3);
    } else {
        phoneInput.value = numbers.slice(0, 3) + "-" + numbers.slice(3, 7) + "-" + numbers.slice(7);
    }
});

function checkPhone() {
    if (!validators.phone(phoneInput.value)) {
        return showMsg(phoneInput, phoneMsg, false, "010-0000-0000 형식으로 입력하세요.");
    }
    return showMsg(phoneInput, phoneMsg, true, "확인되었습니다.");
}

phoneInput.addEventListener("blur", checkPhone);


// < 문제 9 >
const signupForm = document.querySelector("#signupForm");

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const results = [
        checkName(),
        checkAge(),
        checkEmail(),
        checkPassword(),
        checkPassword2(),
        checkPhone()
    ];

    const signupResult = document.querySelector("#signupResult");

    if (results.includes(false)) {
        signupResult.textContent = "";
        signupForm.querySelector("input.error").focus();
        return;
    }

    signupResult.textContent =
        nameInput.value.trim() + "님(" + Number(ageInput.value) + "세) 수강 신청이 완료되었습니다.";
});


// < 문제 10 >
const readyMsg = document.querySelector("#readyMsg");

function updateReady() {
    let remain = 0;

    for (const id in validators) {
        const value = document.getElementById(id).value;

        if (!validators[id](value)) {
            remain++;
        }
    }

    if (remain === 0) {
        readyMsg.textContent = "✔ 신청할 수 있습니다.";
        readyMsg.style.color = "green";
    } else {
        readyMsg.textContent = remain + "개 항목을 확인하세요.";
        readyMsg.style.color = "gray";
    }
}

signupForm.addEventListener("input", updateReady);
updateReady();

// 검사 규칙(validators)과 메시지 표시(checkXxx)를 분리했기 때문에
// 화면에 오류를 띄우지 않고도 "통과 여부"만 따로 확인할 수 있다.
