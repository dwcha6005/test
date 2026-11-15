/*
< 학생용 실습 문제 >

주제: 온라인 주문서에서 기본 동작 막기 (preventDefault)
출력: console.log() 또는 화면으로 확인
※ 실습 파일에는 서버(jsp)가 없으므로, 검사를 통과한 경우에도 전송은 막고 결과만 표시한다.

=====================================================================
[기초]
=====================================================================

< 문제 1. 링크 이동 막기 >
① termsLink를 클릭하면 terms.html로 이동하지 않도록 막으시오.
② 대신 termsBox를 보이고, 다시 클릭하면 숨기시오.


< 문제 2. 폼 전송 막기 >
① searchForm에 submit 이벤트를 등록하시오. (버튼의 click이 아님)
② 검색어가 비어 있으면 전송을 막고 searchMsg에 "검색어를 입력하세요."를 표시하시오.
③ 검색어가 있으면 searchMsg에 "'이어폰' 검색 결과" 를 표시하시오. (전송은 막는다.)


< 문제 3. 우클릭 막기 >
① contextArea에서 우클릭(contextmenu)하면 브라우저 메뉴가 나오지 않게 하시오.
② contextMsg에 "복사가 금지된 콘텐츠입니다."를 표시하시오.


< 문제 4. 조건에 따라 이동 막기 >
① outLink를 클릭하면 confirm("외부 사이트로 이동할까요?")을 표시하시오.
② 취소를 누르면 이동을 막고, 확인을 누르면 그대로 이동하게 하시오.


=====================================================================
[응용]
=====================================================================

< 문제 5. 주문서 검사 >
① orderForm이 전송될 때 받는 사람, 연락처, 주소가 비어 있는지 순서대로 검사하시오.
② 비어 있는 항목이 있으면 전송을 막고, orderMsg에 "받는 사람을 입력하세요." 처럼 표시한 뒤
   그 입력창에 포커스를 주시오.
③ 연락처는 숫자만 10~11자리여야 한다. 아니면 "연락처는 숫자 10~11자리입니다."
   힌트) isNaN(값) 이 true이면 숫자가 아님
④ 모두 통과하면 orderMsg에 "주문이 접수되었습니다."를 표시하시오. (전송은 막는다.)


< 문제 6. 숫자만 입력 >
① qtyInput에서 숫자 키(0~9)만 입력되도록 keydown에서 막으시오.
② Backspace, Delete, ArrowLeft, ArrowRight, Tab 키는 허용하시오.
③ 막힌 키는 콘솔에 "입력 불가: a" 형식으로 출력하시오.


< 문제 7. return false 방식 >
① document.couponForm.onsubmit 프로퍼티로 이벤트를 등록하시오.
② 쿠폰 코드(document.couponForm.couponCode)가 6자리가 아니면
   alert("쿠폰 코드는 6자리입니다.") 후 return false로 전송을 취소하시오.
③ 6자리이면 alert("쿠폰이 적용되었습니다.") 후 return false로 전송을 취소하시오.
④ addEventListener()에서 return false를 사용하면 어떻게 되는지 주석으로 작성하시오.


=====================================================================
[심화]
=====================================================================

< 문제 8. 회원가입 폼 - 모든 오류를 한 번에 표시 >
① joinForm이 전송될 때 다음을 모두 검사하시오.
   - 아이디 : 4~8자                   → idError    "아이디는 4~8자입니다."
   - 비밀번호 : 8자 이상               → pwError    "비밀번호는 8자 이상입니다."
   - 비밀번호 확인 : 비밀번호와 일치    → pw2Error   "비밀번호가 일치하지 않습니다."
   - 약관 동의 : 체크                  → agreeError "약관에 동의해야 합니다."
② 첫 번째 오류에서 멈추지 말고, 모든 항목의 오류 메시지를 동시에 표시하시오.
   (통과한 항목의 메시지는 비우시오.)
③ 오류가 하나라도 있으면 전송을 막고, "첫 번째로 오류가 난 입력창"에 포커스를 주시오.
④ 모두 통과하면 joinResult에 "가입을 환영합니다!"를 표시하시오. (전송은 막는다.)


< 문제 9. 체크박스 체크 막기 >
① age14 체크박스를 클릭할 때 birthYear의 값으로 나이를 계산하시오. (올해 - 출생 연도)
② 출생 연도가 비어 있으면 체크를 막고 alert("출생 연도를 먼저 입력하세요.")
③ 만 14세 미만이면 체크를 막고 alert("만 14세 이상만 가입할 수 있습니다.")
   (계산을 단순하게 하기 위해 올해 - 출생 연도 < 14 로 판단한다.)
④ 이미 체크된 상태에서 해제하는 것은 막지 않는다.
힌트) 체크박스의 click 이벤트에서 preventDefault()를 하면 체크 상태가 바뀌지 않는다.
     올해 : new Date().getFullYear()


< 문제 10. Enter 전송, Shift + Enter 줄바꿈 (메신저 입력창) >
① chatText에서 Enter만 누르면 줄바꿈을 막고 메시지를 전송하시오.
② Shift + Enter를 누르면 기본 동작(줄바꿈)이 그대로 일어나게 하시오.
③ 전송은 chatForm의 submit 이벤트에서 처리하시오. (전송 버튼 클릭과 같은 코드 사용)
   힌트) Enter 키에서 chatForm.requestSubmit() 을 호출하면 submit 이벤트가 발생한다.
④ submit에서는 페이지 이동을 막고, 내용이 있으면 chatList에 li로 추가한 뒤 입력창을 비우시오.
⑤ 한글 조합 중 Enter는 무시하시오.
*/


// < 강사용 정답 >

// < 문제 1 >
const termsLink = document.querySelector("#termsLink");
const termsBox = document.querySelector("#termsBox");

termsLink.addEventListener("click", function(event) {
    event.preventDefault();

    if (termsBox.style.display === "block") {
        termsBox.style.display = "none";
    } else {
        termsBox.style.display = "block";
    }
});


// < 문제 2 >
const searchForm = document.querySelector("#searchForm");
const searchKeyword = document.querySelector("#searchKeyword");
const searchMsg = document.querySelector("#searchMsg");

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const keyword = searchKeyword.value.trim();

    if (keyword === "") {
        searchMsg.textContent = "검색어를 입력하세요.";
        return;
    }

    searchMsg.textContent = "'" + keyword + "' 검색 결과";
});


// < 문제 3 >
const contextArea = document.querySelector("#contextArea");

contextArea.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    document.querySelector("#contextMsg").textContent = "복사가 금지된 콘텐츠입니다.";
});


// < 문제 4 >
const outLink = document.querySelector("#outLink");

outLink.addEventListener("click", function(event) {
    if (!confirm("외부 사이트로 이동할까요?")) {
        event.preventDefault();
    }
});


// < 문제 5 >
const orderForm = document.querySelector("#orderForm");
const receiver = document.querySelector("#receiver");
const contact = document.querySelector("#contact");
const address = document.querySelector("#address");
const orderMsg = document.querySelector("#orderMsg");

orderForm.addEventListener("submit", function(event) {
    event.preventDefault();   // 실습용 : 서버가 없으므로 항상 전송을 막는다.

    if (receiver.value.trim() === "") {
        orderMsg.textContent = "받는 사람을 입력하세요.";
        receiver.focus();
        return;
    }

    const phone = contact.value.trim();

    if (phone === "") {
        orderMsg.textContent = "연락처를 입력하세요.";
        contact.focus();
        return;
    }

    if (isNaN(phone) || phone.length < 10 || phone.length > 11) {
        orderMsg.textContent = "연락처는 숫자 10~11자리입니다.";
        contact.focus();
        return;
    }

    if (address.value.trim() === "") {
        orderMsg.textContent = "주소를 입력하세요.";
        address.focus();
        return;
    }

    orderMsg.textContent = "주문이 접수되었습니다.";
});


// < 문제 6 >
const qtyInput = document.querySelector("#qtyInput");
const allowKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

qtyInput.addEventListener("keydown", function(event) {
    const isNumber = event.key.length === 1 && event.key >= "0" && event.key <= "9";

    if (!isNumber && !allowKeys.includes(event.key)) {
        event.preventDefault();
        console.log("입력 불가: " + event.key);
    }
});


// < 문제 7 >
document.couponForm.onsubmit = function() {
    const code = document.couponForm.couponCode.value.trim();

    if (code.length !== 6) {
        alert("쿠폰 코드는 6자리입니다.");
        document.couponForm.couponCode.focus();
        return false;
    }

    alert("쿠폰이 적용되었습니다.");
    return false;
};

// addEventListener()의 리스너에서 return false를 해도 전송이 취소되지 않는다.
// addEventListener()를 사용할 때는 event.preventDefault()를 호출해야 한다.


// < 문제 8 >
const joinForm = document.querySelector("#joinForm");
const joinId = document.querySelector("#joinId");
const joinPw = document.querySelector("#joinPw");
const joinPw2 = document.querySelector("#joinPw2");
const joinAgree = document.querySelector("#joinAgree");

joinForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let firstError = null;   // 첫 번째로 오류가 난 입력창

    // 아이디
    if (joinId.value.length < 4 || joinId.value.length > 8) {
        document.querySelector("#idError").textContent = "아이디는 4~8자입니다.";
        firstError = firstError || joinId;
    } else {
        document.querySelector("#idError").textContent = "";
    }

    // 비밀번호
    if (joinPw.value.length < 8) {
        document.querySelector("#pwError").textContent = "비밀번호는 8자 이상입니다.";
        firstError = firstError || joinPw;
    } else {
        document.querySelector("#pwError").textContent = "";
    }

    // 비밀번호 확인
    if (joinPw2.value === "" || joinPw.value !== joinPw2.value) {
        document.querySelector("#pw2Error").textContent = "비밀번호가 일치하지 않습니다.";
        firstError = firstError || joinPw2;
    } else {
        document.querySelector("#pw2Error").textContent = "";
    }

    // 약관 동의
    if (!joinAgree.checked) {
        document.querySelector("#agreeError").textContent = "약관에 동의해야 합니다.";
        firstError = firstError || joinAgree;
    } else {
        document.querySelector("#agreeError").textContent = "";
    }

    if (firstError !== null) {
        firstError.focus();
        document.querySelector("#joinResult").textContent = "";
        return;
    }

    document.querySelector("#joinResult").textContent = "가입을 환영합니다!";
});

// firstError = firstError || joinId;
// → firstError가 null이면 joinId를 저장하고, 이미 값이 있으면 그대로 유지한다.


// < 문제 9 >
const birthYear = document.querySelector("#birthYear");
const age14 = document.querySelector("#age14");

age14.addEventListener("click", function(event) {
    // 체크 해제는 허용 (click 시점에 checked는 이미 바뀐 값)
    if (!age14.checked) {
        return;
    }

    if (birthYear.value.trim() === "") {
        event.preventDefault();
        alert("출생 연도를 먼저 입력하세요.");
        return;
    }

    const age = new Date().getFullYear() - Number(birthYear.value);

    if (age < 14) {
        event.preventDefault();
        alert("만 14세 이상만 가입할 수 있습니다.");
    }
});


// < 문제 10 >
const chatForm = document.querySelector("#chatForm");
const chatText = document.querySelector("#chatText");
const chatList = document.querySelector("#chatList");

chatText.addEventListener("keydown", function(event) {
    if (event.isComposing) {
        return;
    }

    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();      // 줄바꿈 막기
        chatForm.requestSubmit();    // submit 이벤트 발생
    }
});

chatForm.addEventListener("submit", function(event) {
    event.preventDefault();          // 페이지 이동 막기

    const message = chatText.value.trim();

    if (message === "") {
        return;
    }

    const li = document.createElement("li");
    li.textContent = message;
    chatList.append(li);

    chatText.value = "";
});
