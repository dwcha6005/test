/*
    03_DOM_Content_Attribute.js

    < 1. DOM 요소의 내용과 속성 변경

    DOM 요소를 선택한 다음에는 해당 요소의 내용이나 속성을
    읽거나 변경할 수 있다.

    주요 프로퍼티와 메서드

    textContent
    : 요소 내부의 텍스트를 읽거나 변경

    innerHTML
    : 요소 내부의 HTML 내용을 읽거나 변경

    innerText
    : 화면에 표시되는 텍스트를 읽거나 변경

    value
    : input, textarea, select 등의 현재 입력값을 읽거나 변경

    getAttribute()
    : HTML 속성값을 읽음

    setAttribute()
    : HTML 속성값을 변경하거나 새로 추가

    removeAttribute()
    : HTML 속성을 제거

    hasAttribute()
    : HTML 속성의 존재 여부를 확인

    dataset
    : data-* 형식의 사용자 정의 속성을 읽거나 변경

    참고
    : 아래 코드는 하나의 HTML 문서에 연결하여 실습한다.
    : HTML 구조는 먼저 작성하고, JavaScript 파일은 defer로 연결한다.
*/


/*
    < 2. 실습용 HTML 구조

    아래 HTML을 별도의 HTML 파일에 작성한다.

    <h1 id="title">DOM 내용과 속성 변경</h1>

    <section id="profile">
        <h2>회원 정보</h2>
        <p id="name">이름: 홍길동</p>
        <p id="intro">웹 개발을 공부하고 있습니다.</p>
    </section>

    <section id="inputArea">
        <label for="username">이름</label>
        <input type="text" id="username" value="홍길동">

        <label for="message">자기소개</label>
        <textarea id="message">안녕하세요.</textarea>

        <select id="job">
            <option value="student">학생</option>
            <option value="developer">개발자</option>
            <option value="designer">디자이너</option>
        </select>
    </section>

    <section id="product">
        <h2>상품 정보</h2>
        <img id="productImage"
             src="https://picsum.photos/200/120"
             alt="상품 이미지">
        <a id="productLink"
           href="https://example.com"
           target="_blank">상품 상세 보기</a>
    </section>

    <section id="memberCard" data-user-id="1001" data-grade="gold" data-point="3500">
        <h2>회원 카드</h2>
        <p id="memberInfo">회원 정보를 확인하세요.</p>
    </section>

    <section id="dataProducts">
        <h2>상품 선택</h2>
        <button type="button" class="product-btn" data-product-id="P01" data-price="12000">텀블러</button>
        <button type="button" class="product-btn" data-product-id="P02" data-price="8500">머그컵</button>
        <button type="button" class="product-btn" data-product-id="P03" data-price="23000">보온병</button>
        <p id="productInfo">상품을 선택하세요.</p>
    </section>

    <script src="03_content_attr.js" defer></script>
*/


/*
    < 3. textContent

    textContent
    : 요소 내부에 있는 텍스트를 읽거나 변경하는 프로퍼티

    읽기
    요소.textContent

    변경
    요소.textContent = "새로운 텍스트";

    특징
    - 요소 내부의 텍스트를 가져온다.
    - 텍스트를 변경하면 기존 자식 노드가 대체된다.
    - HTML 태그를 문자열로 대입해도 태그로 해석하지 않는다.
    - 화면에 보이지 않는 자손 텍스트도 포함할 수 있다.
*/

// const title = document.querySelector("#title");

// console.log(title.textContent);
// title.textContent = "JavaScript로 변경한 제목";

// 태그 문자열을 넣어도 HTML로 해석되지 않는다.
// title.textContent = "<strong>중요한 제목</strong>";
// 화면에는 <strong>중요한 제목</strong>이라는 문자열이 표시된다.


/*
    < 4. innerHTML

    innerHTML
    : 요소 내부의 HTML 마크업을 문자열로 읽거나 변경하는 프로퍼티

    읽기
    요소.innerHTML

    변경
    요소.innerHTML = "<strong>중요한 내용</strong>";

    특징
    - 내부의 HTML 마크업을 문자열로 읽는다.
    - HTML 문자열을 대입하면 브라우저가 마크업으로 해석한다.
    - 기존 자식 노드가 새 내용으로 대체된다.
    - 문자열을 대입할 때 기존에 연결된 자식 요소와 관련된
      이벤트 처리나 참조에 영향을 줄 수 있다.

    보안 주의
    - 사용자 입력 등 신뢰할 수 없는 데이터를 innerHTML에 넣으면
      XSS 공격에 노출될 수 있다.
    - 일반 텍스트를 출력할 때는 textContent를 우선 고려한다.
*/

// const intro = document.querySelector("#intro");

// console.log(intro.innerHTML);
// intro.innerHTML = "<strong>JavaScript를 공부하고 있습니다.</strong>";

// textContent와 비교
// intro.textContent = "<strong>JavaScript를 공부하고 있습니다.</strong>";
// intro.innerHTML = "<strong>JavaScript를 공부하고 있습니다.</strong>";


/*
    < 5. textContent와 innerHTML 비교

    textContent
    : 텍스트로 처리

    innerHTML
    : HTML 마크업으로 해석

    예시

    요소.textContent = "<b>안녕하세요</b>";

    화면 표시
    <b>안녕하세요</b>

    요소.innerHTML = "<b>안녕하세요</b>";

    화면 표시
    안녕하세요 (굵은 글씨)

    주의
    : innerHTML로 만든 요소는 실제 DOM 요소가 된다.
    : textContent로 넣은 문자열은 텍스트 노드로 처리된다.
*/


/*
    < 6. innerText

    innerText
    : 화면에 렌더링되는 텍스트를 읽거나 변경하는 프로퍼티

    textContent와의 차이
    - textContent는 DOM의 텍스트를 기준으로 한다.
    - innerText는 렌더링된 화면의 텍스트를 기준으로 한다.
    - innerText는 CSS 표시 상태 등에 영향을 받을 수 있다.
    - innerText를 읽는 과정은 렌더링 정보를 확인할 수 있어
      textContent보다 비용이 클 수 있다.

    일반적인 텍스트 읽기나 변경에는 textContent가 적합하다.
*/

// const profile = document.querySelector("#profile");

// console.log(profile.textContent);
// console.log(profile.innerText);

// 참고
// display: none인 요소의 텍스트는
// textContent에는 포함될 수 있지만 innerText에는 일반적으로 포함되지 않는다.


/*
    < 7. value

    value
    : 폼 요소의 현재 값을 읽거나 변경하는 프로퍼티

    주로 사용하는 요소
    - input
    - textarea
    - select

    input의 value는 사용자가 현재 입력한 값을 반영한다.

    HTML의 value 속성은 초기값을 지정하는 데 사용되지만,
    사용자가 입력한 이후에는 현재 value 프로퍼티와
    HTML 속성값이 서로 다를 수 있다.
*/

// const username = document.querySelector("#username");
// const message = document.querySelector("#message");
// const job = document.querySelector("#job");

// console.log(username.value);
// console.log(message.value);
// console.log(job.value);

// username.value = "김철수";
// message.value = "JavaScript를 배우는 중입니다.";
// job.value = "developer";


/*
    < 8. value와 textContent의 차이

    input이나 textarea에 입력된 값을 다룰 때는
    일반적으로 textContent가 아니라 value를 사용한다.

    input: 입력값은 value로 접근
    textarea: 현재 입력값은 value로 접근
    select: 현재 선택된 option의 값은 value로 접근

    예시)
    const input = document.querySelector("#username");
    console.log(input.value);
    input.value = "이영희";

    참고
    : input.value를 변경해도 사용자가 입력하는 상황과 동일한
      input 이벤트가 자동으로 발생하는 것은 아니다.
*/

// const username = document.querySelector("#username");

// console.log(username.value);
// console.log(username.textContent); // 입력값을 읽는 용도로 적절하지 않음


/*
    < 9. getAttribute()

    getAttribute("속성명")
    : HTML 요소에 지정된 속성값을 문자열로 반환한다.
    : 해당 속성이 없으면 null을 반환한다.

    예시
    요소.getAttribute("id")
    요소.getAttribute("class")
    요소.getAttribute("src")
    요소.getAttribute("href")
    요소.getAttribute("value")

    참고
    : getAttribute()는 HTML 속성에 지정된 값을 읽는다.
    : value처럼 현재 상태를 나타내는 프로퍼티와는
      값이 다를 수 있다.
*/

// const username = document.querySelector("#username");
// const productImage = document.querySelector("#productImage");
// const productLink = document.querySelector("#productLink");

// console.log(username.getAttribute("id"));
// console.log(username.getAttribute("value"));

// console.log(productImage.getAttribute("src"));
// console.log(productImage.getAttribute("alt"));

// console.log(productLink.getAttribute("href"));
// console.log(productLink.getAttribute("target"));

// 존재하지 않는 속성
// console.log(username.getAttribute("title")); // null


/*
    < 10. setAttribute()

    setAttribute("속성명", "속성값")
    : 지정한 속성을 추가하거나 기존 속성값을 변경한다.

    예시
    요소.setAttribute("title", "설명");
    요소.setAttribute("class", "highlight");
    요소.setAttribute("href", "https://example.com");

    속성이 이미 존재하면 값을 변경하고,
    존재하지 않으면 새 속성을 추가한다.

    주의
    : class 속성을 setAttribute()로 변경하면
      기존 class 값이 새 값으로 대체된다.
    : 기존 클래스를 유지하면서 추가하려면 classList를 사용한다.
*/

// const title = document.querySelector("#title");

// title.setAttribute("title", "제목에 대한 설명");
// console.log(title.getAttribute("title"));

// title.setAttribute("class", "highlight");

// 기존 클래스가 있다면 덮어써진다.
// title.setAttribute("class", "important");


/*
    < 11. removeAttribute()

    removeAttribute("속성명")
    : 지정한 HTML 속성을 제거한다.

    예시
    요소.removeAttribute("title");
    요소.removeAttribute("disabled");
    요소.removeAttribute("target");

    속성이 없어도 오류가 발생하지 않는다.
*/

// const productLink = document.querySelector("#productLink");

// productLink.removeAttribute("target");
// console.log(productLink.getAttribute("target")); // null


/*
    < 12. hasAttribute()

    hasAttribute("속성명")
    : 지정한 HTML 속성이 존재하는지 확인한다.
    : 존재하면 true, 존재하지 않으면 false를 반환한다.
*/

// const productImage = document.querySelector("#productImage");

// console.log(productImage.hasAttribute("src"));   // true
// console.log(productImage.hasAttribute("alt"));   // true
// console.log(productImage.hasAttribute("title")); // false


/*
    < 13. HTML 속성과 DOM 프로퍼티의 차이

    HTML 속성(attribute)
    : HTML 마크업에 작성된 속성
    : getAttribute(), setAttribute() 등으로 접근

    DOM 프로퍼티(property)
    : DOM 객체가 제공하는 JavaScript 프로퍼티
    : 객체.프로퍼티 형태로 접근

    예시
    <input id="username" value="홍길동">

    input.getAttribute("value")
    : HTML value 속성에 지정된 값

    input.value
    : 현재 입력 요소의 값

    사용자가 입력값을 변경하면 두 값이 달라질 수 있다.

    src, href처럼 프로퍼티가 URL 형태로 정규화되어 반환되는
    속성도 있다. 따라서 프로퍼티 값과 getAttribute() 결과가
    항상 동일한 것은 아니다.
*/

// const username = document.querySelector("#username");

// console.log(username.getAttribute("value"));
// console.log(username.value);

// 사용자가 입력한 값은 value 프로퍼티에 반영된다.
// getAttribute("value")는 일반적으로 초기 HTML 속성값을 나타낸다.


/*
    < 14. Boolean 속성

    HTML에는 속성의 존재 여부 자체가 의미를 갖는
    Boolean 속성이 있다.

    예시
    disabled
    checked
    selected
    readonly
    required
    multiple

    다음 두 HTML은 모두 disabled가 적용된다.

    <button disabled>확인</button>
    <button disabled="disabled">확인</button>

    disabled="false"도 속성이 존재하므로 비활성화된다.
    Boolean 속성은 문자열 "true", "false"로 판단하지 않는다.

    DOM 프로퍼티로 현재 상태를 확인할 수 있다.

    button.disabled
    checkbox.checked

    setAttribute("disabled", "false") 역시
    disabled 속성이 존재하게 하므로 버튼이 비활성화된다.

    속성을 제거하려면 removeAttribute("disabled")를 사용하거나
    button.disabled = false처럼 프로퍼티를 변경할 수 있다.
*/

// const button = document.querySelector("#btn");

// button.setAttribute("disabled", "disabled");
// console.log(button.disabled); // true

// button.removeAttribute("disabled");
// console.log(button.disabled); // false


/*
    < 15. dataset (data-* 속성) >

    data-* 속성
    : HTML 요소에 개발자가 원하는 정보를 저장하기 위한 사용자 정의 속성
    : 화면에는 표시되지 않지만 JavaScript에서 읽고 사용할 수 있다.
    : 이름은 반드시 data-로 시작한다.

    예시
    <section id="memberCard" data-user-id="1001" data-grade="gold" data-point="3500">

    언제 사용하는가?
    - 목록의 각 항목에 상품 번호, 회원 번호 등을 저장할 때
    - 버튼마다 서로 다른 값(가격, 옵션 등)을 연결할 때
    - 이벤트 처리에서 "어떤 항목을 클릭했는지" 구분할 때

    1) dataset으로 읽기

    요소.dataset.이름

    HTML 속성 이름              JavaScript dataset 이름
    ----------------------------------------------------
    data-grade                  dataset.grade
    data-point                  dataset.point
    data-user-id                dataset.userId       (하이픈 → camelCase)
    data-product-id             dataset.productId

    규칙
    - data- 접두사는 빼고 작성한다.
    - 하이픈(-) 뒤의 글자는 대문자로 바꾸고 하이픈은 제거한다.

    2) 값은 항상 문자열이다.

    data-point="3500"
    → dataset.point는 숫자 3500이 아니라 문자열 "3500"이다.
    → 계산에 사용하려면 Number()로 변환한다.

    3) dataset으로 변경, 추가, 삭제하기

    요소.dataset.grade = "vip";      // 값 변경 → data-grade="vip"
    요소.dataset.joinYear = "2026";  // 새로 추가 → data-join-year="2026"
    delete 요소.dataset.point;       // 삭제 → data-point 속성 제거

    4) getAttribute()와 비교

    요소.dataset.userId
    요소.getAttribute("data-user-id")

    두 방법 모두 같은 값을 읽는다.
    dataset이 더 간결하므로 data-* 속성은 dataset을 주로 사용한다.

    5) 존재 여부 확인

    "grade" in 요소.dataset       // true 또는 false
    요소.dataset.없는이름          // undefined

    주의
    : data-* 속성은 HTML에 그대로 보이므로
      비밀번호 등 민감한 정보를 저장하면 안 된다.
*/

// 1) 읽기
// const memberCard = document.querySelector("#memberCard");

// console.log(memberCard.dataset);          // DOMStringMap {userId: '1001', grade: 'gold', point: '3500'}
// console.log(memberCard.dataset.userId);   // 1001
// console.log(memberCard.dataset.grade);    // gold
// console.log(memberCard.dataset.point);    // 3500

// 2) 값은 문자열
// console.log(typeof memberCard.dataset.point);         // string
// console.log(memberCard.dataset.point + 500);          // 3500500 (문자열 연결)
// console.log(Number(memberCard.dataset.point) + 500);  // 4000

// 3) 변경, 추가, 삭제
// memberCard.dataset.grade = "vip";
// memberCard.dataset.joinYear = "2026";
// delete memberCard.dataset.point;

// console.log(memberCard.outerHTML);
// <section id="memberCard" data-user-id="1001" data-grade="vip" data-join-year="2026">...

// 4) getAttribute()와 비교
// console.log(memberCard.getAttribute("data-user-id"));  // 1001
// console.log(memberCard.dataset.userId);                // 1001

// 5) 존재 여부 확인
// console.log("grade" in memberCard.dataset);    // true
// console.log(memberCard.dataset.address);       // undefined

// 6) 화면에 출력하기
// const memberInfo = document.querySelector("#memberInfo");

// memberInfo.textContent =
//     "회원번호: " + memberCard.dataset.userId +
//     " / 등급: " + memberCard.dataset.grade;


/*
    < 15-1. dataset 활용 - 버튼마다 다른 정보 연결하기 >

    같은 모양의 버튼이 여러 개 있을 때
    각 버튼의 data-* 속성에 상품 번호와 가격을 저장해 두면
    클릭한 버튼의 정보를 쉽게 구분할 수 있다.

    <button class="product-btn" data-product-id="P01" data-price="12000">텀블러</button>

    주의
    : 이 예제는 버튼 클릭 이벤트를 사용한다.
      이벤트의 자세한 개념은 다음 장에서 다룬다.
*/

// const productButtons = document.querySelectorAll(".product-btn");
// const productInfo = document.querySelector("#productInfo");

// productButtons.forEach(function(button) {
//     button.addEventListener("click", function() {
//         const productId = button.dataset.productId;
//         const price = Number(button.dataset.price);

//         productInfo.textContent =
//             "상품번호: " + productId +
//             " / 상품명: " + button.textContent +
//             " / 가격: " + price.toLocaleString() + "원";
//     });
// });


/*
    < 16. 실습 예제 - 회원 정보 변경

    실습용 HTML에 다음 요소가 있다고 가정한다.

    <p id="memberName">이름: 홍길동</p>
    <input id="newName" value="김철수">
    <button id="changeName">이름 변경</button>

    목표
    : input에 입력한 값을 읽어 p 요소의 텍스트를 변경한다.

    구현 순서
    1. p 요소 선택
    2. input 요소 선택
    3. 버튼 요소 선택
    4. input의 value 읽기
    5. p의 textContent 변경

    주의
    : 이 예제는 버튼 클릭 이벤트를 사용한다.
      이벤트의 자세한 개념은 다음 장에서 다룬다.
*/

// const memberName = document.querySelector("#memberName");
// const newName = document.querySelector("#newName");
// const changeName = document.querySelector("#changeName");

// changeName.addEventListener("click", function() {
//     memberName.textContent = "이름: " + newName.value;
// });


/*
    < 17. 실습 예제 - 이미지 속성 변경

    실습용 HTML에 다음 요소가 있다고 가정한다.

    <img id="photo" src="image1.jpg" alt="첫 번째 이미지">
    <button id="changePhoto">이미지 변경</button>

    목표
    : 버튼을 클릭하면 이미지의 src와 alt를 변경한다.

    구현 순서
    1. img 요소 선택
    2. 버튼 요소 선택
    3. setAttribute()로 src 변경
    4. setAttribute()로 alt 변경

    주의
    : 실제 실습에서는 접근 가능한 이미지 주소를 사용한다.
*/

// const photo = document.querySelector("#photo");
// const changePhoto = document.querySelector("#changePhoto");

// changePhoto.addEventListener("click", function() {
//     photo.setAttribute("src", "image2.jpg");
//     photo.setAttribute("alt", "두 번째 이미지");
// });


/*
    < 18. 실습 문제

    문제 1.
    id가 title인 요소의 텍스트를
    "DOM 속성 변경 실습"으로 변경하시오.

    문제 2.
    id가 intro인 요소의 내부 HTML을 다음과 같이 변경하시오.
    <strong>JavaScript 학습 중</strong>

    문제 3.
    id가 username인 input 요소의 현재 입력값을 출력하시오.

    문제 4.
    id가 username인 input 요소의 현재 입력값을
    "이영희"로 변경하시오.

    문제 5.
    id가 productImage인 요소의 alt 속성값을 출력하시오.

    문제 6.
    id가 productLink인 요소에 title 속성을 추가하고
    값은 "상품 상세 페이지"로 지정하시오.

    문제 7.
    id가 productLink인 요소의 target 속성을 제거하시오.

    문제 8.
    id가 productImage인 요소에 src 속성이 존재하는지
    hasAttribute()로 확인하시오.

    문제 9.
    id가 intro인 요소에 다음 문자열을 각각 대입했을 때
    결과가 어떻게 다른지 확인하시오.

    intro.textContent = "<em>반갑습니다.</em>";
    intro.innerHTML = "<em>반갑습니다.</em>";

    문제 10.
    input 요소의 value 프로퍼티와
    getAttribute("value")의 차이를 확인하시오.

    문제 11.
    button 요소에 disabled 속성을 추가하고,
    다시 제거하시오.

    문제 12.
    사용자 입력값을 innerHTML로 출력하는 것이
    왜 위험할 수 있는지 설명하시오.
*/


/*
    < 19. 실습 문제 정답
*/

// 문제 1
// document.querySelector("#title").textContent = "DOM 속성 변경 실습";

// 문제 2
// document.querySelector("#intro").innerHTML =
//     "<strong>JavaScript 학습 중</strong>";

// 문제 3
// console.log(document.querySelector("#username").value);

// 문제 4
// document.querySelector("#username").value = "이영희";

// 문제 5
// console.log(document.querySelector("#productImage").getAttribute("alt"));

// 문제 6
// document.querySelector("#productLink").setAttribute("title", "상품 상세 페이지");

// 문제 7
// document.querySelector("#productLink").removeAttribute("target");

// 문제 8
// console.log(
//     document.querySelector("#productImage").hasAttribute("src")
// );

// 문제 9
// const intro = document.querySelector("#intro");

// intro.textContent = "<em>반갑습니다.</em>";
// intro.innerHTML = "<em>반갑습니다.</em>";

// 문제 10
// const input = document.querySelector("#username");

// console.log(input.getAttribute("value"));
// console.log(input.value);

// 문제 11
// const button = document.querySelector("#btn");

// button.setAttribute("disabled", "disabled");
// button.removeAttribute("disabled");

// 문제 12
// 신뢰할 수 없는 문자열이 HTML로 해석되면서
// 의도하지 않은 HTML이나 스크립트 실행을 유발할 수 있기 때문이다.
// 일반 텍스트를 표시할 때는 textContent를 사용하는 것이 안전하다.