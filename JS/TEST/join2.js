// ===============================================
// functions

// 폼의 입력값을 하나의 객체로 모으기
function getFormValues() {
    // 체크된 취미만 배열에 담기
    const hobby = [];
    hobbies.forEach(function(box) {
        if(box.checked) {
            hobby.push(box.value)
        }
    })

    return {
        name: userName.value,
        id: userId.value,
        passwd: passwd.value,
        passwd2: passwd2.value,
        jumin1: jumin1.value,
        jumin2: jumin2.value,
        postcode: postcode.value,
        address1: address1.value,
        address2: address2.value,
        email1: email1.value,
        email2: email2.value,
        job: job.value,
        hobby: hobby,
        motivation: motivation.value
    }
}


// 가입 버튼 클릭 시 전체 검사
// -> 처음 실패한 항목의
// { focus: 커서 옮길 요소 id, message: 알림 메시지 } 반환
// -> 모두 통과하면 null 반환
function validateForm(values) {
    if (values.name.trim() === "") {
        return { focus: "userName", message: "이름 입력 필수!" }
    }
    if (values.id.trim() === "") {
        return { focus: "userId", message: "아이디 입력 필수!" }
    }
    // ★ 추가 : 중복확인 통과 못 했으면 가입 불가
    if (!idOk) {
        return { focus: "userId", message: "사용 가능한 아이디를 입력하세요!" }
    }
    if (values.passwd.trim() === "") {
        return { focus: "passwd", message: "패스워드 입력 필수!" }
    }
    // ★ 추가
    if (values.passwd !== values.passwd2) {
        return { focus: "passwd2", message: "비밀번호 확인 필수!" }
    }

    if (values.jumin1.length !== 6) {
        return { focus: "jumin1", message: "주민번호 앞 6자리 필수!" }
    }
    if (values.jumin2.length !== 7) {
        return { focus: "jumin2", message: "주민번호 뒤 7자리 필수!" }  // ★ 수정 : jumin1 -> jumin2
    }

    // ★ 추가 : 나머지 항목들 (위와 같은 모양)
    if (values.postcode === "") {
        return { focus: "btnSearchAddress", message: "주소검색 필수!" }
    }
    if (values.address2.trim() === "") {
        return { focus: "address2", message: "상세주소 입력 필수!" }
    }
    if (values.email1.trim() === "") {
        return { focus: "email1", message: "이메일 입력 필수!" }
    }
    if (values.email2.trim() === "") {
        return { focus: "email2", message: "이메일 도메인 입력 필수!" }
    }
    if (values.job === "") {
        return { focus: "job", message: "직업 선택 필수!" }
    }
    if (values.hobby.length === 0) {
        return { focus: "hobby1", message: "취미 1개 이상 선택 필수!" }
    }
    if (values.motivation.trim() === "") {
        return { focus: "motivation", message: "가입동기 입력 필수!" }
    }

    return null; // ★ 추가 : 모두 통과
}

function passwdConfirm() {
    // ★ 추가 : 확인란이 비어 있으면 메시지 지우기
    if (passwd2.value === "") {
        checkPw2Result.textContent = ""
        checkPw2Result.className = "msg"
        return;
    }

    if (passwd.value === passwd2.value) {
        // 비밀번호 확인 완료!
        checkPw2Result.textContent = "비밀번호 확인 완료!"
        checkPw2Result.className = "msg success"
    } else {
        // 비밀번호 다름!
        checkPw2Result.textContent = "비밀번호 다름!"
        checkPw2Result.className = "msg error"
    }
}

// ===============================================
// 요소 가져오기 + 이벤트 연결
const joinForm = document.querySelector("#joinForm");

const userName = document.querySelector("#userName");
const userId = document.querySelector("#userId");
const passwd = document.querySelector("#passwd");
const passwd2 = document.querySelector("#passwd2");
const jumin1 = document.querySelector("#jumin1");
const jumin2 = document.querySelector("#jumin2");
const postcode = document.querySelector("#postcode");
const address1 = document.querySelector("#address1");
const address2 = document.querySelector("#address2");
const email1 = document.querySelector("#email1");
const email2 = document.querySelector("#email2");
const emailDomain = document.querySelector("#emailDomain");
const job = document.querySelector("#job");
// 성별은 안들고옴
const checkAll = document.querySelector("#checkAll")
const hobbies = document.querySelectorAll("input[name='hobby']")
const motivation = document.querySelector("#motivation");

// 아이디 중복체크 표시
const checkIdResult = document.querySelector("#checkIdResult")
const checkPwResult = document.querySelector("#checkPasswdResult")
const checkPw2Result = document.querySelector("#checkPasswd2Result")

// ★ 추가 : 중복확인 통과 여부
let idOk = false;

userId.addEventListener("keyup", function() {
    const id = userId.value.trim();
    idOk = false;  // ★ 추가 : 아이디가 바뀌면 다시 확인해야 함

    // ★ 수정 : 길이 검사를 fetch 전에 먼저 (길이 틀리면 요청 안 보냄)
    if (!(id.length >= 4 && id.length <= 8)) {
        checkIdResult.textContent = "4 ~ 8글자 사이 입력 필수!"
        checkIdResult.className = "msg error"
        return;
    }

    fetch("02_data.js")
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("아이디 중복확인 요청 실패: " + resp.status)
            }
            return resp.json(); // JSON 문자열 -> 자바스크립트 배열
        })
        .then((users) => {
            if(users.some(user => user.id === id)) {
                checkIdResult.textContent = "이미 사용 중인 아이디 입니다!"
                checkIdResult.className = "msg error"
            } else {
                checkIdResult.textContent = "사용 가능한 아이디!"
                checkIdResult.className = "msg success"
                idOk = true;  // ★ 추가
            }
        })
})

passwd.addEventListener("input", function() {
    // 길이 검사(8 ~ 16 자리 체크)
    if (passwd.value.length < 8 || passwd.value.length > 16) {
        checkPwResult.textContent = "8 ~ 16자리 입력 필수!"
        checkPwResult.className = "msg error"
        return;
    }

    // 허용된 문자(영문, 숫자, !@#$%)만 사용했는지 검사
    const allowedRegex = /^[A-Za-z0-9!@#$%]+$/;
    if (!allowedRegex.test(passwd.value)) {
        checkPwResult.textContent =
            "영문, 숫자, 특수문자(!@#$%)만 사용 가능!"
        checkPwResult.className = "msg error"
        return;
    }

    // 사용한 문자 종류 개수 세기
    let count = 0;
    if (/[A-Z]/.test(passwd.value)) count++;
    if (/[a-z]/.test(passwd.value)) count++;
    if (/[0-9]/.test(passwd.value)) count++;
    if (/[!@#$%]/.test(passwd.value)) count++;

    if (count == 4) {
        checkPwResult.textContent = "안전 - 4가지 조합 사용"
        checkPwResult.className = "msg success"
    } else if (count == 3) {
        checkPwResult.textContent = "보통 - 3가지 조합 사용"
        checkPwResult.className = "msg warning"
    } else if (count == 2) {
        checkPwResult.textContent = "위험 - 2가지 조합 사용"
        checkPwResult.className = "msg error"
    } else {
        checkPwResult.textContent =
            "불가 - 영문 대/소문자, 숫자, 특수문자 중 2가지 이상 조합!"
        checkPwResult.className = "msg error"
    }

    passwdConfirm();
})

passwd2.addEventListener("input", passwdConfirm)

// ★ 추가 : 주민번호 숫자만 + 6자리 입력하면 뒷자리로 이동
jumin1.addEventListener("input", function() {
    jumin1.value = jumin1.value.replace(/[^0-9]/g, "")
    if (jumin1.value.length === 6) {
        jumin2.focus();
    }
})

jumin2.addEventListener("input", function() {
    jumin2.value = jumin2.value.replace(/[^0-9]/g, "")
})

// 주소검색 버튼 -> 카카오(다음) 우편번호 API
document.querySelector("#btnSearchAddress")
        .addEventListener("click", () => {
            // ★ 수정 : debugger 대신 실제 코드
            new daum.Postcode({
                // 주소를 선택하면 실행되는 함수
                oncomplete: function(data) {
                    postcode.value = data.zonecode;  // 우편번호
                    address1.value = data.address;   // 기본주소
                    address2.focus();                // 상세주소로 커서 이동
                }
            }).open();
})

// ★ 추가 : 이메일 도메인 선택
emailDomain.addEventListener("change", function() {
    email2.value = emailDomain.value;

    if (emailDomain.value === "") {
        email2.readOnly = false;  // 직접입력
        email2.focus();
    } else {
        email2.readOnly = true;
    }
})

// ★ 추가 : 취미 전체선택
checkAll.addEventListener("change", function() {
    hobbies.forEach(function(box) {
        box.checked = checkAll.checked;
    })
})

hobbies.forEach(function(box){
    box.addEventListener("change", function(e){
        // 하나라도 체크 해제 시 전체선택 해제
        // if (!box.checked) {
        //     // checkAll.click();
        //     checkAll.checked = false;
        // }

        // 모두 선택했을때 자동 전체선택
        checkAll.checked = [...hobbies].every(b => b.checked);
    })
})


// ===============================================
// 가입(submit) -> 전체 검사
joinForm.addEventListener("submit", function(e) {
    const error = validateForm(getFormValues());

    // ★ 수정 : 에러가 있을 때만 제출 막기
    //   (preventDefault 후 requestSubmit() 을 부르면 submit 이 무한 반복됨)
    if (error != null) {
        e.preventDefault();
        alert(error.message);
        document.getElementById(error.focus).focus();
    }
    // error가 null이면 아무것도 안 함 -> 그대로 제출
})