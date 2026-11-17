/*
 * 회원가입 폼 스크립트 (정답 코드)
 *
 * [코드 구성]
 *  1. 상수       : 글자 수 규칙 등 설정값을 한 곳에 모아 둠
 *  2. 검증 함수  : 값을 받아서 "결과 객체"를 돌려주는 함수 (화면은 건드리지 않음)
 *  3. 서버 요청  : fetch 로 아이디 중복확인 요청
 *  4. 화면 함수  : 메세지 출력, 입력값 모으기
 *  5. 이벤트 연결 : addEventListener 로 각 요소에 이벤트 연결
 *
 * ※ 검증 함수는 화면(DOM)과 분리되어 있으므로
 *    나중에 React 를 배울 때 그대로 가져다 쓸 수 있음
 */

// =====================================================================
// 1. 상수
// =====================================================================
const ID_MIN = 4;
const ID_MAX = 8;
const PASSWD_MIN = 8;
const PASSWD_MAX = 16;
const JUMIN1_LENGTH = 6;
const JUMIN2_LENGTH = 7;

// 아이디 중복확인 요청 주소
// (지금은 백엔드가 없으므로 회원 목록 파일 data.js 로 대신함)
const ID_CHECK_URL = "data.js";

// 타이핑이 멈춘 뒤 몇 ms 후에 중복확인 요청을 보낼지
const ID_CHECK_DELAY = 300;

// =====================================================================
// 2. 검증 함수
//    모든 검증 함수는 아래 모양의 객체를 반환함
//    {
//      valid   : true(통과) / false(실패),
//      type    : "success"(초록) / "warning"(주황) / "error"(빨강),
//      message : 화면에 보여줄 메세지
//    }
// =====================================================================

// 아이디 길이 검사 (4 ~ 8글자)
function validateIdLength(id) {
	if (id.length < ID_MIN || id.length > ID_MAX) {
		return { valid: false, type: "error", message: `${ID_MIN} ~ ${ID_MAX}글자 사이 입력 필수!` };
	}
	return { valid: true, type: "warning", message: "아이디 확인 중..." };
}

// 아이디 중복 검사 : 회원 목록(users)에 같은 아이디가 있으면 true
// (대소문자 구분 없이 비교하기 위해 둘 다 소문자로 바꿔서 비교)
function isDuplicateId(id, users) {
	return users.some((user) => user.id.toLowerCase() === id.toLowerCase());
}

// 비밀번호 강도 검사 → [안전, 보통, 위험, 불가]
function checkPasswordStrength(passwd) {
	// 1) 길이 검사
	if (passwd.length < PASSWD_MIN || passwd.length > PASSWD_MAX) {
		return { valid: false, type: "error", message: `불가 - ${PASSWD_MIN} ~ ${PASSWD_MAX}글자 사이 입력 필수!` };
	}

	// 2) 허용된 문자(영문, 숫자, !@#$%^&*)만 사용했는지 검사
	const allowedRegex = /^[A-Za-z0-9!@#$%^&*]+$/;
	if (!allowedRegex.test(passwd)) {
		return { valid: false, type: "error", message: "불가 - 영문, 숫자, 특수문자(!@#$%^&*)만 사용 가능!" };
	}

	// 3) 사용한 문자 종류 개수 세기
	let count = 0;
	if (/[a-z]/.test(passwd)) count++;      // 영문 소문자
	if (/[A-Z]/.test(passwd)) count++;      // 영문 대문자
	if (/[0-9]/.test(passwd)) count++;      // 숫자
	if (/[!@#$%^&*]/.test(passwd)) count++; // 특수문자

	// 4) 개수에 따라 등급 결정
	if (count === 4) {
		return { valid: true, type: "success", message: "안전 - 4가지 조합 사용" };
	} else if (count === 3) {
		return { valid: true, type: "warning", message: "보통 - 3가지 조합 사용" };
	} else if (count === 2) {
		return { valid: true, type: "error", message: "위험 - 2가지 조합 사용" };
	} else {
		return { valid: false, type: "error", message: "불가 - 영문 대/소문자, 숫자, 특수문자 중 2가지 이상 조합 필수!" };
	}
}

// 비밀번호 확인 검사
function validatePasswordConfirm(passwd, passwd2) {
	if (passwd2 === "") {
		return { valid: false, type: "error", message: "비밀번호 확인 입력 필수!" };
	}
	if (passwd !== passwd2) {
		return { valid: false, type: "error", message: "비밀번호 다름!" };
	}
	return { valid: true, type: "success", message: "비밀번호 확인 완료!" };
}

// 숫자로만 되어 있고 길이가 맞는지 검사 (주민번호용)
function isNumberWithLength(value, length) {
	return value.length === length && /^[0-9]+$/.test(value);
}

// 가입 버튼 클릭 시 전체 검사
// → 처음 실패한 항목의 { focus: 커서를 옮길 요소 id, message: 알림 메세지 } 반환
// → 모두 통과하면 null 반환
// checkedId : 중복확인을 통과한 아이디
function validateForm(values, checkedId) {
	if (values.name.trim() === "") {
		return { focus: "userName", message: "이름 입력 필수!" };
	}
	if (!validateIdLength(values.id.trim()).valid) {
		return { focus: "userId", message: "아이디 확인 필수!" };
	}
	if (values.id.trim() !== checkedId) {
		return { focus: "userId", message: "사용 가능한 아이디를 입력하세요!" };
	}
	if (!checkPasswordStrength(values.passwd).valid) {
		return { focus: "passwd", message: "비밀번호 확인 필수!" };
	}
	if (!validatePasswordConfirm(values.passwd, values.passwd2).valid) {
		return { focus: "passwd2", message: "비밀번호확인 확인 필수!" };
	}
	if (!isNumberWithLength(values.jumin1, JUMIN1_LENGTH)) {
		return { focus: "jumin1", message: "주민번호 앞자리 6자리 입력 필수!" };
	}
	if (!isNumberWithLength(values.jumin2, JUMIN2_LENGTH)) {
		return { focus: "jumin2", message: "주민번호 뒷자리 7자리 입력 필수!" };
	}
	if (values.postcode === "") {
		return { focus: "btnSearchAddress", message: "주소검색 필수!" };
	}
	if (values.address2.trim() === "") {
		return { focus: "address2", message: "상세주소 입력 필수!" };
	}
	if (values.email1.trim() === "") {
		return { focus: "email1", message: "이메일 입력 필수!" };
	}
	if (values.email2.trim() === "") {
		return { focus: "email2", message: "이메일 도메인 입력 필수!" };
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
	return null; // 모두 통과
}

// =====================================================================
// 3. 서버 요청 함수
// =====================================================================

// 아이디 중복확인 요청 → { duplicate: true / false } 를 돌려주는 Promise
//
// ※ 실제 백엔드가 있다면 회원 목록 전체를 받지 않고, 아이디 하나만 보내서 결과만 받음
//    예) return fetch(`/member/checkId?id=${encodeURIComponent(id)}`)
//                .then((response) => response.json());   // 서버 응답 : { "duplicate": true }
//    지금은 백엔드가 없으므로 data.js 를 받아서 같은 모양의 결과를 만들어 줌
//    → 나중에 백엔드가 생기면 이 함수 하나만 바꾸면 됨
function requestIdCheck(id) {
	return fetch(ID_CHECK_URL)
		.then((response) => {
			if (!response.ok) {
				throw new Error("아이디 중복확인 요청 실패 : " + response.status);
			}
			return response.json(); // JSON 문자열 → 자바스크립트 배열
		})
		.then((users) => {
			return { duplicate: isDuplicateId(id, users) };
		});
}

// =====================================================================
// 4. 화면 함수
// =====================================================================

// 메세지 출력 : 글자 색은 style 로 직접 바꾸지 않고 CSS 클래스만 바꿈
// 예) <div class="msg success">사용 가능한 아이디!</div>
function showMessage(element, result) {
	element.textContent = result.message;
	element.className = "msg " + result.type;
}

// 메세지 지우기
function clearMessage(element) {
	element.textContent = "";
	element.className = "msg";
}

// 폼의 입력값을 하나의 객체로 모으기
function getFormValues() {
	// 체크된 취미만 배열에 담기
	const hobby = [];
	for (const checkbox of hobbyCheckboxes) {
		if (checkbox.checked) {
			hobby.push(checkbox.value);
		}
	}

	return {
		name: document.querySelector("#userName").value,
		id: userIdInput.value,
		passwd: passwdInput.value,
		passwd2: passwd2Input.value,
		jumin1: jumin1Input.value,
		jumin2: jumin2Input.value,
		postcode: postcodeInput.value,
		address2: address2Input.value,
		email1: document.querySelector("#email1").value,
		email2: email2Input.value,
		job: document.querySelector("#job").value,
		hobby: hobby,
		motivation: document.querySelector("#motivation").value,
	};
}

// =====================================================================
// 5. 요소 가져오기 + 이벤트 연결
//    (<script defer> 로 불러오므로 이 코드가 실행될 때는 HTML 이 모두 준비되어 있음)
// =====================================================================
const joinForm = document.querySelector("#joinForm");

const userIdInput = document.querySelector("#userId");
const passwdInput = document.querySelector("#passwd");
const passwd2Input = document.querySelector("#passwd2");
const jumin1Input = document.querySelector("#jumin1");
const jumin2Input = document.querySelector("#jumin2");
const postcodeInput = document.querySelector("#postcode");
const address1Input = document.querySelector("#address1");
const address2Input = document.querySelector("#address2");
const email2Input = document.querySelector("#email2");
const emailDomainSelect = document.querySelector("#emailDomain");
const checkAllCheckbox = document.querySelector("#checkAll");
const hobbyCheckboxes = document.querySelectorAll("input[name='hobby']");

const idMessage = document.querySelector("#checkIdResult");
const passwdMessage = document.querySelector("#checkPasswdResult");
const passwd2Message = document.querySelector("#checkPasswd2Result");

// 중복확인을 통과한 아이디 (React 라면 useState 로 관리)
let checkedId = "";

// 마지막으로 검사한 아이디 (글자가 바뀌지 않는 키는 무시하기 위해 사용)
let lastId = "";

// setTimeout 번호 (타이핑 중에는 이전 예약을 취소하기 위해 사용)
let idCheckTimer = null;

// ---------------------------------------------------------------------
// 1. 아이디 입력란에서 키를 눌렀다 뗄 때마다(keyup) → 길이 검사 + 중복확인
// ---------------------------------------------------------------------
userIdInput.addEventListener("keyup", () => {
	const id = userIdInput.value.trim();

	// 방향키, Shift 처럼 글자가 바뀌지 않는 키는 무시
	if (id === lastId) {
		return;
	}
	lastId = id;

	// 아이디가 바뀌었으므로 이전 확인 결과와 예약된 요청은 취소
	checkedId = "";
	clearTimeout(idCheckTimer);

	// 아무것도 입력하지 않았으면 메세지 지우기
	if (id === "") {
		clearMessage(idMessage);
		return;
	}

	// 길이가 맞지 않으면 서버에 요청하지 않음
	const lengthResult = validateIdLength(id);
	showMessage(idMessage, lengthResult);
	if (!lengthResult.valid) {
		return;
	}

	// 타이핑이 멈추고 0.3초가 지나면 서버에 요청 (디바운스)
	// → 키를 누를 때마다 요청하면 "a", "ad", "adm" ... 처럼 요청이 너무 많아짐
	idCheckTimer = setTimeout(() => {
		requestIdCheck(id)
			.then((result) => {
				// 응답을 기다리는 사이에 아이디가 또 바뀌었다면 이 결과는 버림
				if (id !== userIdInput.value.trim()) {
					return;
				}

				if (result.duplicate) {
					showMessage(idMessage, { type: "error", message: "이미 사용 중인 아이디!" });
				} else {
					showMessage(idMessage, { type: "success", message: "사용 가능한 아이디!" });
					checkedId = id;
				}
			})
			.catch((error) => {
				console.log(error);
				showMessage(idMessage, { type: "error", message: "아이디 확인에 실패했습니다. 잠시 후 다시 시도하세요." });
			});
	}, ID_CHECK_DELAY);
});

// ---------------------------------------------------------------------
// 2. 비밀번호 입력할 때마다 → 강도 검사 [안전 / 보통 / 위험 / 불가]
// ---------------------------------------------------------------------
passwdInput.addEventListener("input", () => {
	showMessage(passwdMessage, checkPasswordStrength(passwdInput.value));

	// 비밀번호를 바꾸면 "비밀번호 확인" 결과도 다시 검사
	if (passwd2Input.value !== "") {
		showMessage(passwd2Message, validatePasswordConfirm(passwdInput.value, passwd2Input.value));
	}
});

// ---------------------------------------------------------------------
// 3. 비밀번호 확인 → 입력할 때마다, 커서가 빠져나갈 때 일치 여부 검사
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
// 4. 주민번호 : 숫자만 남기기 + 자동 커서 이동
// ---------------------------------------------------------------------
jumin1Input.addEventListener("input", () => {
	jumin1Input.value = jumin1Input.value.replace(/[^0-9]/g, ""); // 숫자 외 문자 제거

	if (jumin1Input.value.length === JUMIN1_LENGTH) {
		jumin2Input.focus(); // 뒷자리로 커서 이동
	}
});

jumin2Input.addEventListener("input", () => {
	jumin2Input.value = jumin2Input.value.replace(/[^0-9]/g, "");

	if (jumin2Input.value.length === JUMIN2_LENGTH) {
		jumin2Input.blur(); // 커서 제거
	}
});

// ---------------------------------------------------------------------
// 5. 주소검색 버튼 → 카카오(다음) 우편번호 API
// ---------------------------------------------------------------------
document.querySelector("#btnSearchAddress").addEventListener("click", () => {
	// API 스크립트를 불러오지 못한 경우
	if (typeof daum === "undefined") {
		alert("주소검색 서비스를 불러오지 못했습니다. 잠시 후 다시 시도하세요.");
		return;
	}

	new daum.Postcode({
		// 사용자가 주소를 선택하면 API 가 자동으로 호출하는 함수(콜백 함수)
		oncomplete: (data) => {
			postcodeInput.value = data.zonecode; // 우편번호

			let address = data.address; // 기본주소
			if (data.buildingName !== "") {
				address += ` (${data.buildingName})`; // 건물명이 있으면 뒤에 붙이기
			}
			address1Input.value = address;

			address2Input.focus(); // 상세주소로 커서 이동
		},
	}).open();
});

// ---------------------------------------------------------------------
// 6. 이메일 도메인 선택
// ---------------------------------------------------------------------
emailDomainSelect.addEventListener("change", () => {
	const domain = emailDomainSelect.value;
	email2Input.value = domain;

	if (domain === "") {
		// "직접입력" 선택 → 편집 가능 + 커서 이동
		email2Input.readOnly = false;
		email2Input.focus();
	} else {
		// 도메인 선택 → 읽기전용 (회색 배경은 CSS 가 처리)
		email2Input.readOnly = true;
	}
});

// ---------------------------------------------------------------------
// 7. 취미 전체선택
// ---------------------------------------------------------------------
// 전체선택 클릭 → 취미 모두 체크 / 해제
checkAllCheckbox.addEventListener("change", () => {
	for (const checkbox of hobbyCheckboxes) {
		checkbox.checked = checkAllCheckbox.checked;
	}
});

// 취미를 하나씩 클릭 → 모두 체크되었으면 전체선택도 체크
for (const checkbox of hobbyCheckboxes) {
	checkbox.addEventListener("change", () => {
		let allChecked = true;
		for (const item of hobbyCheckboxes) {
			if (!item.checked) {
				allChecked = false;
			}
		}
		checkAllCheckbox.checked = allChecked;
	});
}

// ---------------------------------------------------------------------
// 8. 가입(submit) → 전체 검사
// ---------------------------------------------------------------------
joinForm.addEventListener("submit", (event) => {
	const error = validateForm(getFormValues(), checkedId);

	if (error !== null) {
		event.preventDefault(); // 제출 취소 (예전 방식의 return false 대신 사용)
		alert(error.message);
		document.getElementById(error.focus).focus();
	}
	// error 가 null 이면 아무것도 하지 않음 → 그대로 제출됨
});

// ---------------------------------------------------------------------
// 9. 초기화(reset)
// ---------------------------------------------------------------------
joinForm.addEventListener("reset", () => {
	clearMessage(idMessage);
	clearMessage(passwdMessage);
	clearMessage(passwd2Message);
	email2Input.readOnly = false;
	checkedId = "";
	lastId = "";
	clearTimeout(idCheckTimer);
});

// ---------------------------------------------------------------------
// 10. 돌아가기 → 이전 페이지
// ---------------------------------------------------------------------
document.querySelector("#btnBack").addEventListener("click", () => {
	history.back();
});
