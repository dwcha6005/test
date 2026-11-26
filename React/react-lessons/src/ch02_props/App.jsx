import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import UserInfo, { UserInfoBasic } from "./components/UserInfo.jsx";
import Card from "./components/Card.jsx";

/*
  ch02. 컴포넌트와 props

  [순서01] 컴포넌트 파일 분리                 → components/Header.jsx, Footer.jsx
  [순서02] props 전달하기                    → components/UserInfo.jsx (UserInfoBasic)
  [순서03] 구조 분해로 받기 + 기본값          → components/UserInfo.jsx (UserInfo)
  [순서04] 스프레드 연산자로 한꺼번에 전달
  [순서05] 여러 종류의 값 전달 (숫자, boolean, 배열, 함수)
  [순서06] children                          → components/Card.jsx
  [순서07] props는 읽기 전용 (단방향 데이터 흐름)

  [순서01] 정리
  - 컴포넌트가 많아지면 파일로 나눈다. (src/components 폴더)
  - 파일 이름 = 컴포넌트 이름, 대문자로 시작
  - export default 로 내보내고, import 컴포넌트명 from "경로" 로 가져온다.
  - App.jsx는 화면 전체의 "조립" 역할만 한다.
*/


/*
  [순서02] props 전달하기

  - 문자열은 "따옴표", 그 외 값(변수, 숫자, 배열 ...)은 { } 로 전달한다.
  - 같은 컴포넌트에 다른 props를 주면 다른 내용이 표시된다. → 재사용
*/
function Pass() { // [순서02]
  const myName = "홍길동";

  return (
    <section>
      <h2>[순서02] props 전달하기</h2>
      <UserInfoBasic name="차동원" location="부산" />
      <UserInfoBasic name={myName} location="서울" />
    </section>
  );
}


/*
  [순서03] 구조 분해로 받기 + 기본값
  → components/UserInfo.jsx 의 UserInfo 컴포넌트

  두 번째 UserInfo에는 foodList를 보내지 않았다.
  → 기본값 [] 덕분에 오류 없이 "0개"로 표시된다.
*/
function Destruct() { // [순서03]
  return (
    <section>
      <h2>[순서03] 구조 분해 + 기본값</h2>
      <UserInfo name="김철수" location="대구" foodList={["파스타", "떡볶이", "치킨"]} />
      <UserInfo name="이영희" location="광주" />
    </section>
  );
}


/*
  [순서04] 스프레드 연산자로 한꺼번에 전달

  props가 많을 때 객체로 만들어 {...객체} 로 전달할 수 있다.
  <UserInfo {...userData} />  ===  <UserInfo name={userData.name} location={userData.location} ... />
*/
function Spread() { // [순서04]
  const userData = {
    name: "박민수",
    location: "제주",
    foodList: ["고기국수", "흑돼지"],
  };

  return (
    <section>
      <h2>[순서04] 스프레드로 전달</h2>
      <UserInfo {...userData} />
    </section>
  );
}


/*
  [순서05] 여러 종류의 값 전달

  숫자, boolean, 배열, 객체, 함수, JSX 모두 전달할 수 있다.
  - boolean true는 속성 이름만 써도 된다.   <Product soldOut />  ===  soldOut={true}
  - 함수를 전달하면 자식이 부모의 함수를 실행할 수 있다. (ch03, ch05에서 자세히)
*/
function Product({ name, price, soldOut = false, tags = [], onBuy }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <b>{name}</b> - {price.toLocaleString()}원 {soldOut && <span style={{ color: "crimson" }}>(품절)</span>}
      <br />
      태그 : {tags.join(", ")}
      <br />
      <button onClick={onBuy} disabled={soldOut}>
        구매하기
      </button>
    </div>
  );
}

function Types() { // [순서05]
  function handleBuy() {
    alert("부모(Types)의 함수가 실행되었습니다.");
  }

  return (
    <section>
      <h2>[순서05] 여러 종류의 값 전달</h2>
      <Product name="무선 이어폰" price={89000} tags={["음향", "블루투스"]} onBuy={handleBuy} />
      <Product name="기계식 키보드" price={129000} soldOut tags={["입력장치"]} onBuy={handleBuy} />
    </section>
  );
}


/*
  [순서06] children → components/Card.jsx
*/
function Children() { // [순서06]
  return (
    <section>
      <h2>[순서06] children</h2>
      <Card title="공지사항">
        <p>내일은 휴강입니다.</p>
      </Card>
      <Card title="이벤트">
        <ul>
          <li>신규 회원 10% 할인</li>
          <li>리뷰 작성 시 포인트 지급</li>
        </ul>
      </Card>
    </section>
  );
}


/*
  [순서07] props는 읽기 전용 (단방향 데이터 흐름)

  - 자식 컴포넌트는 받은 props를 직접 바꾸면 안 된다.
    props.name = "다른 이름";  (X)
  - 데이터는 항상 부모 → 자식 한 방향으로 흐른다.
  - 자식이 값을 바꾸고 싶으면 부모가 내려준 "함수"를 호출해서 부모에게 요청한다. (ch05)
*/
// function ReadOnly() { // [순서07]
//   return (
//     <section>
//       <h2>[순서07] props는 읽기 전용</h2>
//       <p>부모 → 자식 : props로 값 전달 / 자식 → 부모 : props로 받은 함수 호출</p>
//     </section>
//   );
// }


export default function App() {
  return (
    <div>
      <Header />
      <Pass />
      <Destruct />
      <Spread />
      <Types />
      <Children />
      {/* <ReadOnly /> */}
      <Footer />
    </div>
  );
}
