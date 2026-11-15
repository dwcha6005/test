/*
  ch01 실습 - JSX와 조건부 렌더링

  < 문제 1. 프로필 카드 > [기초]
  아래 변수로 프로필 카드를 만드시오.
    const name = "김철수"; const age = 17; const hobbies = ["축구", "게임", "독서"];
  ① 이름과 나이를 표시하시오.
  ② 나이가 20세 이상이면 "성인", 아니면 "미성년자"를 표시하시오. (삼항 연산자)
  ③ 취미를 "축구 / 게임 / 독서" 형식으로 표시하시오.

  < 문제 2. 장바구니 알림 > [기초]
    const cartCount = 0;
  ① cartCount가 1 이상일 때만 "장바구니에 n개 상품이 있습니다."를 표시하시오. (&&)
  ② cartCount가 0이면 "장바구니가 비었습니다."를 표시하시오.
  ③ {cartCount && ...} 로 작성하면 어떤 문제가 생기는지 주석으로 쓰시오.

  < 문제 3. 성적 등급 컴포넌트 > [응용]
  ① score를 받아 등급을 표시하는 ScoreBadge 컴포넌트를 만드시오.
     90 이상 A / 80 이상 B / 70 이상 C / 그 외 F
  ② if + return 방식으로 작성하시오.
  ③ <ScoreBadge score={95} />, 82, 55 세 개를 화면에 표시하시오.

  < 문제 4. 합격 / 불합격 스타일 > [응용]
  ① passed 값이 true면 초록색 굵은 글씨 "합격", false면 빨간색 "불합격"을 표시하시오.
  ② 인라인 스타일(style={{ }})로 작성하시오.
  ③ 배경색, 글자 크기 20px, 안쪽 여백 8px도 함께 지정하시오.
*/


// < 문제 1 >
function Profile() {
  const name = "김철수";
  const age = 17;
  const hobbies = ["축구", "게임", "독서"];

  return (
    <section>
      <h2>문제 1. 프로필 카드</h2>
      <p>
        이름 : {name} / 나이 : {age}세
      </p>
      <p>{age >= 20 ? "성인" : "미성년자"}</p>
      <p>취미 : {hobbies.join(" / ")}</p>
    </section>
  );
}


// < 문제 2 >
function Cart() {
  const cartCount = 0;

  return (
    <section>
      <h2>문제 2. 장바구니 알림</h2>
      {cartCount > 0 && <p>장바구니에 {cartCount}개 상품이 있습니다.</p>}
      {cartCount === 0 && <p>장바구니가 비었습니다.</p>}
      {/* {cartCount && <p>...</p>} 로 쓰면 cartCount가 0일 때 화면에 "0"이 표시된다. */}
    </section>
  );
}


// < 문제 3 >
function ScoreBadge({ score }) {
  if (score >= 90) {
    return <p>{score}점 : A</p>;
  }
  if (score >= 80) {
    return <p>{score}점 : B</p>;
  }
  if (score >= 70) {
    return <p>{score}점 : C</p>;
  }
  return <p>{score}점 : F</p>;
}

function Scores() {
  return (
    <section>
      <h2>문제 3. 성적 등급</h2>
      <ScoreBadge score={95} />
      <ScoreBadge score={82} />
      <ScoreBadge score={55} />
    </section>
  );
}


// < 문제 4 >
function Result() {
  const passed = true;

  return (
    <section>
      <h2>문제 4. 합격 / 불합격</h2>
      <p
        style={{
          color: passed ? "green" : "crimson",
          fontWeight: passed ? "bold" : "normal",
          backgroundColor: passed ? "#dcfce7" : "#fee2e2",
          fontSize: 20,
          padding: 8,
        }}
      >
        {passed ? "합격" : "불합격"}
      </p>
    </section>
  );
}


export default function Practice() {
  return (
    <div>
      <h1>ch01 실습 정답</h1>
      <Profile />
      <Cart />
      <Scores />
      <Result />
    </div>
  );
}
