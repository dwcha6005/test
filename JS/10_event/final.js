window.onload = function() {
	// ---------------------------------
	// 아이디, 패스워드, 패스워드 확인 입력창의 검증 결과값을 저장할 변수 선언
	let checkIdResult = false;
	let checkPasswdResult = false;
	let checkPasswd2Result = false;
	// ---------------------------------
	// 1. ID 중복확인 버튼 클릭 시 새 창(check_id.jsp) 띄우기
	document.querySelector("#btnCheckId").onclick = function() {
		window.open("check_id.jsp", "check_id", "width=300,height=300");
	}
	
	// 2. 아이디 입력란에서 커서가 빠져나갈 때 아이디 길이 체크하기
	document.joinForm.id.onblur = function() {
		let id = document.joinForm.id.value;
		
		if(id.length >= 4 && id.length <= 8) { // 아이디 길이 적합
			document.querySelector("#checkIdResult").innerText = "사용 가능";
			document.querySelector("#checkIdResult").style.color = "GREEN";
			// checkIdResult 변수값을 true(적합) 로 변경
			checkIdResult = true;
		} else { // 부적합
			document.querySelector("#checkIdResult").innerText = "사용 불가능";
			document.querySelector("#checkIdResult").style.color = "RED";
			// checkIdResult 변수값을 false(부적합) 로 변경
			checkIdResult = false;
		}
	}
	
	// 3. 비밀번호 입력란에 키를 누를때마다 비밀번호 길이 체크하기
	document.joinForm.passwd.onkeyup = function() {
		let passwd = document.joinForm.passwd.value;
		
		if(passwd.length >= 8 && passwd.length <= 16) { // 비밀번호 길이 적합
			document.querySelector("#checkPasswdResult").innerText = "사용 가능한 패스워드";
			document.querySelector("#checkPasswdResult").style.color = "GREEN";
			checkPasswdResult = true;
		} else { // 부적합
			document.querySelector("#checkPasswdResult").innerText = "사용 불가능한 패스워드";
			document.querySelector("#checkPasswdResult").style.color = "RED";
			checkPasswdResult = false
		}
		
	} 

	// 4. 비밀번호확인 입력란에 키를 누를때마다 비밀번호와 같은지 체크하기
	document.querySelector("#passwd2").onkeyup = function() {
		console.log("passwd2 keyup");
		let passwd = document.joinForm.passwd.value; // 비밀번호(name 속성으로 접근)
		let passwd2 = document.querySelector("#passwd2").value; // 비밀번호확인(id 선택자로 접근)
		
		if(passwd == passwd2) { // 비밀번호 일치
			document.querySelector("#checkPasswd2Result").innerText = "비밀번호 일치";
			document.querySelector("#checkPasswd2Result").style.color = "GREEN";
			checkPasswd2Result = true;
		} else { // 불일치
			document.querySelector("#checkPasswd2Result").innerText = "비밀번호 불일치";
			document.querySelector("#checkPasswd2Result").style.color = "RED";
			checkPasswd2Result = false;
		}
	}
	
	// 5. 주민번호 숫자 입력할때마다 길이 체크하기
	document.querySelector("#jumin1").onkeyup = function() {
		let jumin1 = document.querySelector("#jumin1").value;
		
		if(jumin1.length == 6) {
			// 주민번호 뒷자리로 커서 이동
			document.querySelector("#jumin2").focus();
		}
	}
	
	document.querySelector("#jumin2").onkeyup = function() {
		let jumin2 = document.querySelector("#jumin2").value;
		
		if(jumin2.length == 7) {
			// 주민번호 뒷자리 입력 항목에서 커서 제거
			document.querySelector("#jumin2").blur();
		}
	}
	
	// 6. 주소검색 버튼 클릭 시 search_address.jsp 페이지를 새 창에 표시하기
//	document.querySelector("#btnSearchAddress").onclick = function() {
//		window.open("search_address.jsp", "search_address", "width=600,height=500");
//	}
	// => 주소검색 버튼 클릭 시 별도의 페이지 대신 다음(카카오) 주소 검색 API 실행하기
	// => final_exam.jsp 파일 하단에 기술
	// --------------------------------------------------------------
	
	// 7. 이메일 도메인 선택 셀렉트 박스 항목 변경 시 
    // 선택된 셀렉트 박스 값을 이메일 두번째 항목(@ 기호 뒤)에 표시하기
    document.querySelector("#emailDomain").onchange = function() {
		document.joinForm.email2.value = document.querySelector("#emailDomain").value;
		// => "직접입력" 항목의 value 속성값이 널스트링이므로 별도로 입력값 지우는 동작 불필요
		
		// 또한, "직접입력" 항목 외의 도메인 선택 시 도메인 입력창을 잠금처리 및 회색으로 변경하고,
   		// "직접입력" 항목 선택 시 도메인 입력창에 커서 요청 및 잠금 해제
   		if(document.querySelector("#emailDomain").value == "") { // 직접입력 선택 시
   			// HTML 텍스트박스 읽기전용 속성의 이름은 readonly 이며,
   			// 이 속성을 자바스크립트에서 제어할 경우 Camel-case 표기법 사용(readOnly 사용)
   			// => 해당 속성값에 true 또는 false 값을 전달하여 제어 가능
   			document.joinForm.email2.readOnly = false; // 읽기전용 해제(= 편집 가능)
			document.joinForm.email2.focus();
			document.joinForm.email2.style.backgroundColor = ""; // 기존 색상으로 되돌림
		} else { // 직접입력 외의 항목 선택 시 
   			document.joinForm.email2.readOnly = true; // 읽기전용 설정(= 편집 불가능)
			document.joinForm.email2.style.backgroundColor = "#CCCCCC99"; // 회색으로 배경색 설정
		}

	}
	
	// 8. 취미의 "전체선택" 체크박스 체크 시 취미 항목 모두 체크, 
   	//    "전체선택" 해제 시 취미 항목 모두 체크 해제하기
   	document.querySelector("#check_all").onclick = function() {
		for(let hobby of document.joinForm.hobby) {
			hobby.checked = document.querySelector("#check_all").checked;
		}
	}
	
	// ======================================================================
	// 10. 가입(submit) 클릭 시 이벤트 처리 => 해당 폼의 submit 이벤트 핸들링
	document.joinForm.onsubmit = function() {
		// submit 이벤트 핸들링 시 submit 동작 취소를 위해서는 false 값을 리턴하고
		// submit 동작을 수행하려면 true 값을 리턴하거나 return 문을 생략해도 된다!
		if(document.joinForm.name.value == "") { // 이름 체크
			alert("이름 입력 필수!");
			document.joinForm.name.focus();
			return false; // 현재 폼의 submit 이벤트 취소
//		} else if(document.joinForm.id.value == "") { // 아이디 체크
//			alert("아이디 입력 필수!");
//			document.joinForm.id.focus();
//			return false; // 현재 폼의 submit 이벤트 취소
		// => 주의! 아이디는 널스트링 외에 입력값 검증 결과까지 확인이 필요함
		} else if(!checkIdResult) { // 아이디 검증 결과가 부적합(false)인지 체크 = checkIdResult 변수 활용
			alert("아이디 확인 필수!");
			document.joinForm.id.focus();
			return false; // 현재 폼의 submit 이벤트 취소
		} else if(!checkPasswdResult) { // 비밀번호 검증 결과가 부적합(false)인지 체크 = checkIdResult 변수 활용
			alert("비밀번호 확인 필수!");
			document.joinForm.passwd.focus();
			return false; // 현재 폼의 submit 이벤트 취소
		} else if(!checkPasswd2Result) { // 비밀번호확인 검증 결과가 부적합(false)인지 체크 = checkIdResult 변수 활용
			alert("비밀번호확인 확인 필수!");
			document.joinForm.passwd2.focus();
			return false; // 현재 폼의 submit 이벤트 취소
		} else if(document.joinForm.jumin1.value == "") { // 주민번호 체크
			alert("주민번호 입력 필수!");
			document.joinForm.jumin1.focus();
			return false; // 현재 폼의 submit 이벤트 취소
		} else if(document.joinForm.jumin2.value == "") { // 주민번호 체크
			alert("주민번호 입력 필수!");
			document.joinForm.jumin2.focus();
			return false; // 현재 폼의 submit 이벤트 취소
//		} else if(document.joinForm.postcode.value == "") { // 우편번호 체크
//			alert("우편번호 입력 필수!");
//			document.joinForm.postcode.focus();
//			return false; // 현재 폼의 submit 이벤트 취소
//		} else if(document.joinForm.address1.value == "") { // 기본주소 체크
//			alert("기본주소 입력 필수!");
//			document.joinForm.address1.focus();
//			return false; // 현재 폼의 submit 이벤트 취소
		} else if(document.joinForm.address2.value == "") { // 상세주소 체크
			alert("상세주소 입력 필수!");
			document.joinForm.address2.focus();
			return false; // 현재 폼의 submit 이벤트 취소
		} else if(document.joinForm.email1.value == "") { // 이메일 체크
			alert("이메일 입력 필수!");
			document.joinForm.email1.focus();
			return false; // 현재 폼의 submit 이벤트 취소
		} else if(document.joinForm.email2.value == "") { // 이메일 체크
			alert("이메일 입력 필수!");
			document.joinForm.email2.focus();
			return false; // 현재 폼의 submit 이벤트 취소
		} else if(document.joinForm.job.value == "") { // 직업 체크
			alert("직업 선택 필수!");
			document.joinForm.job.focus();
			return false; // 현재 폼의 submit 이벤트 취소
		} else if(!document.joinForm.hobby[0].checked && 
					!document.joinForm.hobby[1].checked && 
					!document.joinForm.hobby[2].checked) { // 체크박스 체크(모두 미체크 시)
			alert("취미 최소 한 개 이상 선택 필수!");
			return false; // 현재 폼의 submit 이벤트 취소
		} else if(document.joinForm.motivation.value == "") { // 가입동기 체크
			alert("가입동기 입력 필수!");
			document.joinForm.motivation.focus();
			return false; // 현재 폼의 submit 이벤트 취소
		} 
		
		// submit 이벤트에서 submit 동작 수행을 위해서는 return true 를 수행하거나
		// return 문 자체를 명시하지 않으면 자동으로 submit 동작이 수행된다!
//		return true; // 생략 가능
		
	} // submit 이벤트 끝
	
} // window.onload 끝














