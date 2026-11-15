/*
< 학생용 실습 문제 >

주제: 회원 프로필 관리 화면의 내용과 속성 변경
출력: console.log() 또는 화면(textContent)으로 확인

=====================================================================
[기초]
=====================================================================

< 문제 1. 텍스트 읽기와 변경 >
① id가 profileName인 요소의 텍스트를 출력하시오.
② 텍스트를 "이름: 김철수"로 변경하시오.

출력 예시)
변경 전: 이름: 홍길동
변경 후: 이름: 김철수


< 문제 2. 입력값 읽기 >
① id가 nameInput인 input 요소의 현재 입력값을 출력하시오.
② id가 gradeSelect인 select 요소의 현재 선택값을 출력하시오.

출력 예시)
입력된 이름: 홍길동
선택된 등급: 일반


< 문제 3. 속성 읽기와 확인 >
① id가 profileImg인 요소의 alt 속성값을 출력하시오.
② 같은 요소에 title 속성이 있는지 hasAttribute()로 확인하여 출력하시오.

출력 예시)
alt: 회원 프로필 사진
title 속성 존재: false


< 문제 4. dataset 읽기 >
① id가 memberCard인 요소를 선택하시오.
② dataset을 이용하여 회원번호(data-member-id)와 등급(data-grade)을 출력하시오.

출력 예시)
회원번호: 2001
등급: silver


=====================================================================
[응용]
=====================================================================

< 문제 5. innerHTML과 textContent 비교 >
① 아래 문자열을 introHtml 요소에는 innerHTML로,
   introText 요소에는 textContent로 각각 대입하시오.

   "<strong>프론트엔드</strong> 개발자를 꿈꿉니다."

② 화면에 표시되는 결과를 비교하고, 차이를 주석으로 작성하시오.
③ 두 요소의 innerHTML 값을 각각 출력하시오.

출력 예시)
introHtml: <strong>프론트엔드</strong> 개발자를 꿈꿉니다.
introText: &lt;strong&gt;프론트엔드&lt;/strong&gt; 개발자를 꿈꿉니다.


< 문제 6. 링크 속성 변경 >
① id가 homepage인 링크의 href를 "https://developer.mozilla.org/ko/"로 변경하시오.
② target 속성을 "_blank"로 추가하시오.
③ 링크 텍스트를 "MDN 바로가기"로 변경하시오.
④ getAttribute()로 href와 target 값을 출력하시오.

출력 예시)
href: https://developer.mozilla.org/ko/
target: _blank


< 문제 7. dataset 값 계산과 변경 >
① memberCard의 data-point 값에 500을 더해 다시 data-point에 저장하시오.
   (dataset 값은 문자열이므로 주의)
② data-grade 값을 "gold"로 변경하시오.
③ data-updated 속성을 새로 추가하고 값은 "2026-11-12"로 지정하시오.
④ memberCardInfo 요소에 변경된 정보를 표시하시오.
⑤ memberCard의 dataset 전체를 출력하시오.

화면 예시)
회원번호: 2001 / 등급: gold / 포인트: 2000

출력 예시)
DOMStringMap {memberId: '2001', grade: 'gold', point: '2000', updated: '2026-11-12'}


=====================================================================
[심화]
=====================================================================

< 문제 8. 입력값을 프로필에 반영 >
① applyBtn 버튼을 클릭하면 nameInput의 입력값과 gradeSelect의 선택값을 읽으시오.
② 이름 앞뒤 공백은 제거하시오. (trim())
③ 이름이 비어 있으면 applyMessage에 "이름을 입력하세요."를 표시하고 종료하시오.
④ 이름이 있으면 profileName에 "이름: OOO (등급: OO)"을 표시하시오.
⑤ applyMessage에 "프로필이 반영되었습니다."를 표시하시오.
⑥ nameInput의 value 프로퍼티와 getAttribute("value")를 함께 출력하여
   두 값이 언제 달라지는지 확인하시오.

화면 예시)
이름: 이영희 (등급: 골드)
프로필이 반영되었습니다.

출력 예시)
value 프로퍼티: 이영희 / value 속성: 홍길동


< 문제 9. Boolean 속성 제어 >
① agreeCheck 체크박스의 상태가 바뀌면(change 이벤트) 실행되는 코드를 작성하시오.
② 체크되어 있으면 saveBtn의 disabled를 해제하고,
   agreeMessage에 "저장할 수 있습니다."를 표시하시오.
③ 체크가 해제되면 saveBtn을 다시 비활성화하고,
   agreeMessage에 "약관에 동의해야 저장할 수 있습니다."를 표시하시오.
④ 상태가 바뀔 때마다 아래 두 값을 출력하시오.
   - saveBtn.disabled
   - saveBtn.hasAttribute("disabled")
⑤ setAttribute("disabled", "false")로는 버튼이 활성화되지 않는 이유를 주석으로 작성하시오.

출력 예시)
disabled 프로퍼티: false / disabled 속성 존재: false


< 문제 10. dataset으로 쿠폰 할인 계산 >
① coupon-btn 버튼을 클릭하면 클릭한 버튼의 쿠폰 코드와 할인율을 dataset으로 읽으시오.
② originPrice 요소의 data-price 값을 읽어 할인 금액과 최종 금액을 계산하시오.
③ couponResult에 결과를 표시하시오. (금액은 toLocaleString()으로 콤마 표시)
④ 선택한 버튼의 data-applied 속성을 "true"로 지정하고,
   나머지 버튼에서는 data-applied 속성을 삭제하시오.

화면 예시)
쿠폰 GOLD20 적용 (20% 할인) → 할인 금액: 10,000원 / 결제 금액: 40,000원
*/


// < 강사용 정답 >

// < 문제 1 >
const profileName = document.querySelector("#profileName");

console.log("변경 전: " + profileName.textContent);
profileName.textContent = "이름: 김철수";
console.log("변경 후: " + profileName.textContent);


// < 문제 2 >
const nameInput = document.querySelector("#nameInput");
const gradeSelect = document.querySelector("#gradeSelect");

console.log("입력된 이름: " + nameInput.value);
console.log("선택된 등급: " + gradeSelect.value);


// < 문제 3 >
const profileImg = document.querySelector("#profileImg");

console.log("alt: " + profileImg.getAttribute("alt"));
console.log("title 속성 존재: " + profileImg.hasAttribute("title"));


// < 문제 4 >
const memberCard = document.querySelector("#memberCard");

console.log("회원번호: " + memberCard.dataset.memberId);
console.log("등급: " + memberCard.dataset.grade);


// < 문제 5 >
const introHtml = document.querySelector("#introHtml");
const introText = document.querySelector("#introText");
const introString = "<strong>프론트엔드</strong> 개발자를 꿈꿉니다.";

introHtml.innerHTML = introString;
introText.textContent = introString;

console.log("introHtml: " + introHtml.innerHTML);
console.log("introText: " + introText.innerHTML);

// innerHTML은 문자열을 HTML로 해석하므로 "프론트엔드"가 굵게 표시된다.
// textContent는 문자열을 그대로 텍스트로 넣으므로 <strong> 태그가 글자로 보인다.
// 그래서 introText의 innerHTML을 확인하면 <, >가 &lt;, &gt;로 바뀌어 있다.


// < 문제 6 >
const homepage = document.querySelector("#homepage");

homepage.setAttribute("href", "https://developer.mozilla.org/ko/");
homepage.setAttribute("target", "_blank");
homepage.textContent = "MDN 바로가기";

console.log("href: " + homepage.getAttribute("href"));
console.log("target: " + homepage.getAttribute("target"));


// < 문제 7 >
const memberCardInfo = document.querySelector("#memberCardInfo");

memberCard.dataset.point = Number(memberCard.dataset.point) + 500;
memberCard.dataset.grade = "gold";
memberCard.dataset.updated = "2026-11-12";

memberCardInfo.textContent =
    "회원번호: " + memberCard.dataset.memberId +
    " / 등급: " + memberCard.dataset.grade +
    " / 포인트: " + memberCard.dataset.point;

console.log(memberCard.dataset);

// Number()로 변환하지 않으면 "1500" + 500 → "1500500" 이 된다.


// < 문제 8 >
const applyBtn = document.querySelector("#applyBtn");
const applyMessage = document.querySelector("#applyMessage");

applyBtn.addEventListener("click", function() {
    const name = nameInput.value.trim();
    const grade = gradeSelect.value;

    if (name === "") {
        applyMessage.textContent = "이름을 입력하세요.";
        return;
    }

    profileName.textContent = "이름: " + name + " (등급: " + grade + ")";
    applyMessage.textContent = "프로필이 반영되었습니다.";

    console.log(
        "value 프로퍼티: " + nameInput.value +
        " / value 속성: " + nameInput.getAttribute("value")
    );

    // 사용자가 입력을 바꾸면 value 프로퍼티는 현재 입력값으로 바뀌지만
    // getAttribute("value")는 HTML에 작성된 초기값(홍길동)을 유지한다.
});


// < 문제 9 >
const agreeCheck = document.querySelector("#agreeCheck");
const saveBtn = document.querySelector("#saveBtn");
const agreeMessage = document.querySelector("#agreeMessage");

agreeCheck.addEventListener("change", function() {
    if (agreeCheck.checked) {
        saveBtn.disabled = false;
        agreeMessage.textContent = "저장할 수 있습니다.";
    } else {
        saveBtn.disabled = true;
        agreeMessage.textContent = "약관에 동의해야 저장할 수 있습니다.";
    }

    console.log(
        "disabled 프로퍼티: " + saveBtn.disabled +
        " / disabled 속성 존재: " + saveBtn.hasAttribute("disabled")
    );
});

// disabled는 Boolean 속성이므로 값이 아니라 "속성의 존재 여부"로 판단한다.
// setAttribute("disabled", "false")를 실행해도 disabled 속성이 존재하게 되므로
// 버튼은 계속 비활성화 상태이다.
// 활성화하려면 removeAttribute("disabled") 또는 disabled = false를 사용한다.


// < 문제 10 >
const originPrice = document.querySelector("#originPrice");
const couponButtons = document.querySelectorAll(".coupon-btn");
const couponResult = document.querySelector("#couponResult");

couponButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const code = button.dataset.couponCode;
        const discount = Number(button.dataset.discount);
        const price = Number(originPrice.dataset.price);

        const discountPrice = price * discount / 100;
        const finalPrice = price - discountPrice;

        couponResult.textContent =
            "쿠폰 " + code + " 적용 (" + discount + "% 할인) → " +
            "할인 금액: " + discountPrice.toLocaleString() + "원 / " +
            "결제 금액: " + finalPrice.toLocaleString() + "원";

        // 모든 버튼에서 data-applied 삭제 후, 선택한 버튼에만 지정
        couponButtons.forEach(function(btn) {
            delete btn.dataset.applied;
        });

        button.dataset.applied = "true";

        console.log(button.outerHTML);
    });
});
