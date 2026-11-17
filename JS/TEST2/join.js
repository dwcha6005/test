/*
 * 회원가입 폼 스크립트 - 시험 정답 코드
 *
 * [코드 구성]
 *  1. 상수       : 글자 수 규칙 등 설정값을 한 곳에 모아 둠
 *  2. 검증 함수  : 값을 받아서 "결과 객체"를 돌려주는 함수 (화면은 건드리지 않음)
 *  3. 서버 요청  : fetch 로 이메일 중복확인 요청
 *  4. 화면 함수  : 메세지 출력, 입력값 모으기
 *  5. 이벤트 연결 : addEventListener 로 각 요소에 이벤트 연결
 */

// =====================================================================
// 1. 상수
// =====================================================================
const ID_MIN = 4;
const ID_MAX = 8;
const PASSWD_MIN = 8;
const PASSWD_MAX = 16;
const PASSWD_BONUS_LENGTH = 12; // 이 길이 이상이면 등급 한 단계 올림
const JUMIN1_LENGTH = 6;
const JUMIN2_LENGTH = 7;
const HOBBY_MAX = 2;

// 이메일 중복확인 요청 주소 (백엔드가 없으므로 회원 목록 파일 data.js 로 대신함)
const EMAIL_CHECK_URL = "data.js";

// 타이핑이 멈춘 뒤 몇 ms 후에 중복확인 요청을 보낼지
const EMAIL_CHECK_DELAY = 300;

// =====================================================================
// 2. 검증 함수
//    결과 객체 : { valid: true/false, type: "success" | "warning" | "error", message: "..." }
// =====================================================================

// 아이디 : 4 ~ 8글자, 영문 소문자 + 숫자만
function validateId(id) {
	if (id.length < ID_MIN || id.length > ID_MAX) {
		return { valid: false, type: "error", message: `${ID_MIN} ~ ${ID_MAX}글자 사이 입력 필수!` };
	}
	if (!/^[a-z0-9]+$/.test(id)) {
		return { valid: false, type: "error", message: "영문 소문자, 숫자만 사용 가능!" };
	}
	return { valid: true, type: "success", message: "사용 가능한 아이디!" };
}

// 비밀번호 강도 : [안전, 보통, 위험, 불가]
// id : 비밀번호에 아이디가 들어 있는지 검사하기 위해 함께 받음
function checkPasswordStrength(passwd, id) {
	// 1) 길이 검사
	if (passwd.length < PASSWD_MIN || passwd.length > PASSWD_MAX) {
		return { valid: false, type: "error", message: `불가 - ${PASSWD_MIN} ~ ${PASSWD_MAX}글자 사이 입력 필수!` };
	}

	// 2) 허용된 문자만 사용했는지 검사
	if (!/^[A-Za-z0-9!@#$%^&*]+$/.test(passwd)) {
		return { valid: false, type: "error", message: "불가 - 영문, 숫자, 특수문자(!@#$%^&*)만 사용 가능!" };
	}

	// 3) 아이디 포함 여부 검사 (대소문자 구분 없이)
	if (id !== "" && passwd.toLowerCase().includes(id.toLowerCase())) {
		return { valid: false, type: "error", message: "불가 - 비밀번호에 아이디를 포함할 수 없음!" };
	}

	// 4) 사용한 문자 종류 개수 세기
	let count = 0;
	if (/[a-z]/.test(passwd)) count++;
	if (/[A-Z]/.test(passwd)) count++;
	if (/[0-9]/.test(passwd)) count++;
	if (/[!@#$%^&*]/.test(passwd)) count++;

	// 5) 12글자 이상이면 한 단계 올림 (최대 4)
	let score = count;
	let bonusText = "";
	if (passwd.length >= PASSWD_BONUS_LENGTH) {
		score++;
		bonusText = ` + ${PASSWD_BONUS_LENGTH}글자 이상`;
	}
	if (score > 4) {
		score = 4;
	}

	// 6) 점수에 따라 등급 결정
	if (score === 4) {
		return { valid: true, type: "success", message: `안전 - ${count}가지 조합${bonusText}` };
	} else if (score === 3) {
		return { valid: true, type: "warning", message: `보통 - ${count}가지 조합${bonusText}` };
	} else if (score === 2) {
		return { valid: true, type: "error", message: `위험 - ${count}가지 조합${bonusText}` };
	} else {
		return { valid: false, type: "error", message: "불가 - 영문 대/소문자, 숫자, 특수문자 중 2가지 이상 조합 필수!" };
	}
}

// 비밀번호 확인
function validatePasswordConfirm(passwd, passwd2) {
	if (passwd2 === "") {
		return { valid: false, type: "error", message: "비밀번호 확인 입력 필수!" };
	}
	if (passwd !== passwd2) {
		return { valid: false, type: "error", message: "비밀번호 다름!" };
	}
	return { valid: true, type: "success", message: "비밀번호 확인 완료!" };
}

// 숫자로만 되어 있고 길이가 맞는지 검사
function isNumberWithLength(value, length) {
	return value.length === length && /^[0-9]+$/.test(value);
}

// 주민번호 앞자리 : 숫자 6자리 + 월(01~12), 일(01~31) 검사
function checkJuminFront(jumin1) {
	if (!isNumberWithLength(jumin1, JUMIN1_LENGTH)) {
		return { valid: false, type: "error", message: "주민번호 앞자리 6자리 입력 필수!" };
	}

	const month = Number(jumin1.substring(2, 4));
	const day = Number(jumin1.substring(4, 6));
	if (month < 1 || month > 12 || day < 1 || day > 31) {
		return { valid: false, type: "error", message: "생년월일 형식이 올바르지 않음!" };
	}
	return { valid: true, type: "success", message: "" };
}

// 주민번호 뒷자리 첫 숫자로 성별 구하기 (1, 3 → 남 / 2, 4 → 여 / 그 외 → null)
function getGenderFromJumin(jumin2) {
	const first = jumin2.charAt(0);
	if (first === "1" || first === "3") {
		return "남";
	}
	if (first === "2" || first === "4") {
		return "여";
	}
	return null;
}

// 주민번호 뒷자리 : 첫 숫자 1 ~ 4, 숫자 7자리
function checkJuminBack(jumin2) {
	if (getGenderFromJumin(jumin2) === null) {
		return { valid: false, type: "error", message: "주민번호 뒷자리 첫 숫자는 1 ~ 4만 가능!" };
	}
	if (!isNumberWithLength(jumin2, JUMIN2_LENGTH)) {
		return { valid: false, type: "warning", message: "주민번호 뒷자리 7자리 입력 필수!" };
	}
	return { valid: true, type: "success", message: "" };
}

// 생년월일 문구 만들기 → "1999년 03월 15일생 (남)"
// 뒷자리 첫 숫자 1, 2 → 1900년대 / 3, 4 → 2000년대
function makeBirthText(jumin1, jumin2) {
	const first = jumin2.charAt(0);
	let year = Number(jumin1.substring(0, 2));
	if (first === "1" || first === "2") {
		year += 1900;
	} else {
		year += 2000;
	}
	const month = jumin1.substring(2, 4);
	const day = jumin1.substring(4, 6);
	return `${year}년 ${month}월 ${day}일생 (${getGenderFromJumin(jumin2)})`;
}

// 휴대폰번호 자동 하이픈 : "01012345678" → "010-1234-5678"
function formatPhone(value) {
	const numbers = value.replace(/[^0-9]/g, "").substring(0, 11); // 숫자만, 최대 11자리

	if (numbers.length <= 3) {
		return numbers;
	}
	if (numbers.length <= 7) {
		return numbers.substring(0, 3) + "-" + numbers.substring(3);
	}
	return numbers.substring(0, 3) + "-" + numbers.substring(3, 7) + "-" + numbers.substring(7);
}

// 휴대폰번호 : 010-0000-0000 형식
function validatePhone(phone) {
	if (!/^010-[0-9]{4}-[0-9]{4}$/.test(phone)) {
		return { valid: false, type: "error", message: "010-0000-0000 형식으로 입력 필수!" };
	}
	return { valid: true, type: "success", message: "올바른 휴대폰 번호!" };
}

// 이메일 형식 검사
function validateEmail(email1, email2) {
	if (email1 === "" || email2 === "") {
		return { valid: false, type: "error", message: "이메일 입력 필수!" };
	}
	if (!/^[a-zA-Z0-9._-]+$/.test(email1)) {
		return { valid: false, type: "error", message: "이메일 아이디 형식이 올바르지 않음!" };
	}
	if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email2)) {
		return { valid: false, type: "error", message: "이메일 도메인 형식이 올바르지 않음!" };
	}
	return { valid: true, type: "warning", message: "이메일 확인 중..." };
}

// 이메일 중복 검사 (대소문자 구분 없이)
function isDuplicateEmail(email, members) {
	return members.some((member) => member.email.toLowerCase() === email.toLowerCase());
}

// 가입 버튼 클릭 시 전체 검사 → 처음 실패한 항목 { focus, message } 반환, 모두 통과 시 null
// checkedEmail : 중복확인을 통과한 이메일
function validateForm(values, checkedEmail) {
	if (values.name.trim() === "") {
		return { focus: "userName", message: "이름 입력 필수!" };
	}
	if (!validateId(values.id).valid) {
		return { focus: "userId", message: "아이디 확인 필수!" };
	}
	if (!checkPasswordStrength(values.passwd, values.id).valid) {
		return { focus: "passwd", message: "비밀번호 확인 필수!" };
	}
	if (!validatePasswordConfirm(values.passwd, values.passwd2).valid) {
		return { focus: "passwd2", message: "비밀번호확인 확인 필수!" };
	}
	if (!checkJuminFront(values.jumin1).valid) {
		return { focus: "jumin1", message: "주민번호 앞자리 확인 필수!" };
	}
	if (!checkJuminBack(values.jumin2).valid) {
		return { focus: "jumin2", message: "주민번호 뒷자리 확인 필수!" };
	}
	if (!validatePhone(values.phone).valid) {
		return { focus: "phone", message: "휴대폰번호 확인 필수!" };
	}
	if (values.postcode === "") {
		return { focus: "btnSearchAddress", message: "주소검색 필수!" };
	}
	if (values.address2.trim() === "") {
		return { focus: "address2", message: "상세주소 입력 필수!" };
	}
	if (!validateEmail(values.email1, values.email2).valid) {
		return { focus: "email1", message: "이메일 확인 필수!" };
	}
	if (`${values.email1}@${values.email2}` !== checkedEmail) {
		return { focus: "email1", message: "사용 가능한 이메일을 입력하세요!" };
	}
	if (values.job === "") {
		return { focus: "job", message: "직업 선택 필수!" };
	}
	if (values.hobby.length === 0) {
		return { focus: "hobby1", message: "취미 최소 한 개 이상 선택 필수!" };
	}
	if (values.motivation.trim() === "") {
		return { focus: "motivation", message: "가입동기 입력 필수!" };
	}
	return null;
}

// =====================================================================
// 3. 서버 요청 함수
// =====================================================================

// 이메일 중복확인 요청 → { duplicate: true / false } 를 돌려주는 Promise
// (실제 백엔드라면 fetch(`/member/checkEmail?email=${encodeURIComponent(email)}`) 로 결과만 받음)
function requestEmailCheck(email) {
	return fetch(EMAIL_CHECK_URL)
		.then((response) => {
			if (!response.ok) {
				throw new Error("이메일 중복확인 요청 실패 : " + response.status);
			}
			return response.json();
		})
		.then((members) => {
			return { duplicate: isDuplicateEmail(email, members) };
		});
}

// =====================================================================
// 4. 화면 함수
// =====================================================================
function showMessage(element, result) {
	element.textContent = result.message;
	element.className = "msg " + result.type;
}

function clearMessage(element) {
	element.textContent = "";
	element.className = "msg";
}

// 이메일 입력값 (앞뒤 공백 제거)
function getEmail1() {
	return email1Input.value.trim();
}
function getEmail2() {
	return email2Input.value.trim();
}

// 폼의 입력값을 하나의 객체로 모으기
function getFormValues() {
	const hobby = [];
	for (const checkbox of hobbyCheckboxes) {
		if (checkbox.checked) {
			hobby.push(checkbox.value);
		}
	}

	return {
		name: document.querySelector("#userName").value,
		id: userIdInput.value.trim(),
		passwd: passwdInput.value,
		passwd2: passwd2Input.value,
		jumin1: jumin1Input.value,
		jumin2: jumin2Input.value,
		phone: phoneInput.value,
		postcode: postcodeInput.value,
		address2: address2Input.value,
		email1: getEmail1(),
		email2: getEmail2(),
		job: document.querySelector("#job").value,
		hobby: hobby,
		motivation: document.querySelector("#motivation").value,
	};
}

// =====================================================================
// 5. 요소 가져오기 + 이벤트 연결
// =====================================================================
const joinForm = document.querySelector("#joinForm");

const userIdInput = document.querySelector("#userId");
const passwdInput = document.querySelector("#passwd");
const passwd2Input = document.querySelector("#passwd2");
const jumin1Input = document.querySelector("#jumin1");
const jumin2Input = document.querySelector("#jumin2");
const phoneInput = document.querySelector("#phone");
const postcodeInput = document.querySelector("#postcode");
const address1Input = document.querySelector("#address1");
const address2Input = document.querySelector("#address2");
const email1Input = document.querySelector("#email1");
const email2Input = document.querySelector("#email2");
const emailDomainSelect = document.querySelector("#emailDomain");
const hobbyCheckboxes = document.querySelectorAll("input[name='hobby']");

const idMessage = document.querySelector("#checkIdResult");
const passwdMessage = document.querySelector("#checkPasswdResult");
const passwd2Message = document.querySelector("#checkPasswd2Result");
const juminMessage = document.querySelector("#checkJuminResult");
const phoneMessage = document.querySelector("#checkPhoneResult");
const emailMessage = document.querySelector("#checkEmailResult");

let checkedEmail = "";   // 중복확인을 통과한 이메일
let lastEmail = "";      // 마지막으로 검사한 이메일
let emailCheckTimer = null;

// ---------------------------------------------------------------------
// 1. 아이디 : keyup 할 때마다 형식 검사
//    아이디가 바뀌면 "비밀번호에 아이디 포함" 여부도 달라지므로 비밀번호도 다시 검사
// ---------------------------------------------------------------------
userIdInput.addEventListener("keyup", () => {
	const id = userIdInput.value.trim();

	if (id === "") {
		clearMessage(idMessage);
	} else {
		showMessage(idMessage, validateId(id));
	}

	if (passwdInput.value !== "") {
		showMessage(passwdMessage, checkPasswordStrength(passwdInput.value, id));
	}
});

// ---------------------------------------------------------------------
// 2. 비밀번호 : 입력할 때마다 강도 검사
// ---------------------------------------------------------------------
passwdInput.addEventListener("input", () => {
	showMessage(passwdMessage, checkPasswordStrength(passwdInput.value, userIdInput.value.trim()));

	if (passwd2Input.value !== "") {
		showMessage(passwd2Message, validatePasswordConfirm(passwdInput.value, passwd2Input.value));
	}
});

// ---------------------------------------------------------------------
// 3. 비밀번호 확인
// ---------------------------------------------------------------------
passwd2Input.addEventListener("input", () => {
	if (passwd2Input.value === "") {
		clearMessage(passwd2Message);
	} else {
		showMessage(passwd2Message, validatePasswordConfirm(passwdInput.value, passwd2Input.value));
	}
});

passwd2Input.addEventListener("blur", () => {
	showMessage(passwd2Message, validatePasswordConfirm(passwdInput.value, passwd2Input.value));
});

// ---------------------------------------------------------------------
// 4. 주민번호 : 생년월일 검사 + 성별 자동 선택
// ---------------------------------------------------------------------
jumin1Input.addEventListener("input", () => {
	jumin1Input.value = jumin1Input.value.replace(/[^0-9]/g, "");

	if (jumin1Input.value.length < JUMIN1_LENGTH) {
		clearMessage(juminMessage);
		return;
	}

	const result = checkJuminFront(jumin1Input.value);
	if (result.valid) {
		clearMessage(juminMessage);
		jumin2Input.focus(); // 생년월일이 올바를 때만 뒷자리로 이동
	} else {
		showMessage(juminMessage, result);
	}
});

jumin2Input.addEventListener("input", () => {
	jumin2Input.value = jumin2Input.value.replace(/[^0-9]/g, "");
	const jumin2 = jumin2Input.value;

	if (jumin2 === "") {
		clearMessage(juminMessage);
		return;
	}

	// 첫 숫자로 성별 자동 선택
	const gender = getGenderFromJumin(jumin2);
	if (gender === null) {
		showMessage(juminMessage, checkJuminBack(jumin2));
		return;
	}
	document.querySelector(`input[name='gender'][value='${gender}']`).checked = true;

	// 7자리 입력 완료 → 생년월일 표시 + 커서 제거
	if (jumin2.length === JUMIN2_LENGTH) {
		const frontResult = checkJuminFront(jumin1Input.value);
		if (frontResult.valid) {
			showMessage(juminMessage, { type: "success", message: makeBirthText(jumin1Input.value, jumin2) });
		} else {
			showMessage(juminMessage, frontResult);
		}
		jumin2Input.blur();
	} else {
		clearMessage(juminMessage);
	}
});

// ---------------------------------------------------------------------
// 5. 휴대폰번호 : 자동 하이픈 + 형식 검사
// ---------------------------------------------------------------------
phoneInput.addEventListener("input", () => {
	phoneInput.value = formatPhone(phoneInput.value);

	if (phoneInput.value.length === 13) {
		showMessage(phoneMessage, validatePhone(phoneInput.value));
	} else {
		clearMessage(phoneMessage);
	}
});

phoneInput.addEventListener("blur", () => {
	if (phoneInput.value !== "") {
		showMessage(phoneMessage, validatePhone(phoneInput.value));
	}
});

// ---------------------------------------------------------------------
// 6. 주소검색 → 카카오(다음) 우편번호 API
// ---------------------------------------------------------------------
document.querySelector("#btnSearchAddress").addEventListener("click", () => {
	if (typeof daum === "undefined") {
		alert("주소검색 서비스를 불러오지 못했습니다. 잠시 후 다시 시도하세요.");
		return;
	}

	new daum.Postcode({
		oncomplete: (data) => {
			postcodeInput.value = data.zonecode;

			let address = data.address;
			if (data.buildingName !== "") {
				address += ` (${data.buildingName})`;
			}
			address1Input.value = address;

			address2Input.focus();
		},
	}).open();
});

// ---------------------------------------------------------------------
// 7. 이메일 : 형식 검사 + 중복확인 (keyup, 도메인 선택 시)
// ---------------------------------------------------------------------
function checkEmailInput() {
	const email1 = getEmail1();
	const email2 = getEmail2();
	const email = `${email1}@${email2}`;

	// 이메일이 바뀌지 않았으면 무시
	if (email === lastEmail) {
		return;
	}
	lastEmail = email;

	// 이메일이 바뀌었으므로 이전 결과와 예약된 요청 취소
	checkedEmail = "";
	clearTimeout(emailCheckTimer);

	// 둘 중 하나라도 비어 있으면 아직 입력 중 → 메세지 지우기
	if (email1 === "" || email2 === "") {
		clearMessage(emailMessage);
		return;
	}

	// 형식이 틀리면 서버에 요청하지 않음
	const formatResult = validateEmail(email1, email2);
	showMessage(emailMessage, formatResult);
	if (!formatResult.valid) {
		return;
	}

	// 타이핑이 멈추고 0.3초 뒤에 요청 (디바운스)
	emailCheckTimer = setTimeout(() => {
		requestEmailCheck(email)
			.then((result) => {
				// 응답을 기다리는 사이에 이메일이 바뀌었으면 무시
				if (email !== `${getEmail1()}@${getEmail2()}`) {
					return;
				}

				if (result.duplicate) {
					showMessage(emailMessage, { type: "error", message: "이미 사용 중인 이메일!" });
				} else {
					showMessage(emailMessage, { type: "success", message: "사용 가능한 이메일!" });
					checkedEmail = email;
				}
			})
			.catch((error) => {
				console.log(error);
				showMessage(emailMessage, { type: "error", message: "이메일 확인에 실패했습니다. 잠시 후 다시 시도하세요." });
			});
	}, EMAIL_CHECK_DELAY);
}

email1Input.addEventListener("keyup", () => {
	checkEmailInput();
});

email2Input.addEventListener("keyup", () => {
	checkEmailInput();
});

emailDomainSelect.addEventListener("change", () => {
	const domain = emailDomainSelect.value;
	email2Input.value = domain;

	if (domain === "") {
		email2Input.readOnly = false;
		email2Input.focus();
	} else {
		email2Input.readOnly = true;
	}

	checkEmailInput(); // 도메인이 바뀌었으므로 다시 검사
});

// ---------------------------------------------------------------------
// 8. 취미 : 최대 2개까지만 선택
// ---------------------------------------------------------------------
for (const checkbox of hobbyCheckboxes) {
	checkbox.addEventListener("change", () => {
		let checkedCount = 0;
		for (const item of hobbyCheckboxes) {
			if (item.checked) {
				checkedCount++;
			}
		}

		if (checkedCount > HOBBY_MAX) {
			alert(`취미는 최대 ${HOBBY_MAX}개까지 선택 가능!`);
			checkbox.checked = false; // 방금 체크한 항목 해제
		}
	});
}

// ---------------------------------------------------------------------
// 9. 가입(submit)
// ---------------------------------------------------------------------
joinForm.addEventListener("submit", (event) => {
	const error = validateForm(getFormValues(), checkedEmail);

	if (error !== null) {
		event.preventDefault();
		alert(error.message);
		document.getElementById(error.focus).focus();
	}
});

// ---------------------------------------------------------------------
// 10. 초기화(reset)
// ---------------------------------------------------------------------
joinForm.addEventListener("reset", () => {
	clearMessage(idMessage);
	clearMessage(passwdMessage);
	clearMessage(passwd2Message);
	clearMessage(juminMessage);
	clearMessage(phoneMessage);
	clearMessage(emailMessage);
	email2Input.readOnly = false;
	checkedEmail = "";
	lastEmail = "";
	clearTimeout(emailCheckTimer);
});

// ---------------------------------------------------------------------
// 11. 돌아가기
// ---------------------------------------------------------------------
document.querySelector("#btnBack").addEventListener("click", () => {
	history.back();
});
