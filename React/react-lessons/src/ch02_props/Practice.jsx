/*
  ch02 실습 - 컴포넌트와 props

  < 문제 1. 상품 카드 (ProductCard) >
  ① name, price를 props로 받는 ProductCard 컴포넌트를 만드시오.
  ② 가격은 toLocaleString()으로 "89,000원"처럼 표시하시오.
  ③ App에서 ProductCard 3개를 서로 다른 값으로 표시하시오.

  < 문제 2. 기본값 >
  ① ProductCard에 badge props를 추가하시오.
  ② badge가 전달되면 상품명 옆에 [badge] 형태로 표시하고, 전달되지 않으면 아무것도 표시하지 마시오.
  ③ discount props(기본값 0)를 추가하여, 0보다 크면 "n% 할인가 : 00,000원"을 추가로 표시하시오.

  < 문제 3. children - 알림 상자 (Alert) >
  ① type("info" | "warning" | "error")과 children을 받는 Alert 컴포넌트를 만드시오.
  ② type에 따라 배경색을 다르게 하시오. info : #e0f2fe / warning : #fef3c7 / error : #fee2e2
  ③ type이 전달되지 않으면 "info"로 표시하시오.

  < 문제 4. 객체 배열 + 스프레드 >
    const products = [
      { name: "텀블러", price: 12000, badge: "BEST" },
      { name: "머그컵", price: 8500, discount: 10 },
      { name: "보온병", price: 23000, badge: "NEW", discount: 20 }
    ];
  ① 배열의 각 객체를 스프레드 연산자로 ProductCard에 전달하여 3개를 표시하시오.
     (아직 map을 배우지 않았으므로 products[0], products[1], products[2]를 사용한다. map은 ch04)
*/


// < 문제 1, 2 >
function ProductCard({ name, price, badge, discount = 0 }) {
  const salePrice = Math.round(price * (1 - discount / 100));

  return (
    <div style={{ border: "1px solid #ccc", padding: 8, marginBottom: 6 }}>
      <b>{name}</b> {badge && <span>[{badge}]</span>}
      <p style={{ margin: 0 }}>{price.toLocaleString()}원</p>
      {discount > 0 && (
        <p style={{ margin: 0, color: "crimson" }}>
          {discount}% 할인가 : {salePrice.toLocaleString()}원
        </p>
      )}
    </div>
  );
}


// < 문제 3 >
function Alert({ type = "info", children }) {
  const colors = {
    info: "#e0f2fe",
    warning: "#fef3c7",
    error: "#fee2e2",
  };

  return <div style={{ backgroundColor: colors[type], padding: 10, marginBottom: 6 }}>{children}</div>;
}


export default function Practice() {
  // < 문제 4 >
  const products = [
    { name: "텀블러", price: 12000, badge: "BEST" },
    { name: "머그컵", price: 8500, discount: 10 },
    { name: "보온병", price: 23000, badge: "NEW", discount: 20 },
  ];

  return (
    <div>
      <h1>ch02 실습 정답</h1>

      <section>
        <h2>문제 1, 2</h2>
        <ProductCard name="무선 이어폰" price={89000} badge="HOT" />
        <ProductCard name="게이밍 마우스" price={59000} discount={15} />
        <ProductCard name="모니터 받침대" price={35000} />
      </section>

      <section>
        <h2>문제 3</h2>
        <Alert>기본 알림 (type 없음 → info)</Alert>
        <Alert type="warning">비밀번호 변경 기간이 지났습니다.</Alert>
        <Alert type="error">
          <b>오류 :</b> 서버에 연결할 수 없습니다.
        </Alert>
      </section>

      <section>
        <h2>문제 4</h2>
        <ProductCard {...products[0]} />
        <ProductCard {...products[1]} />
        <ProductCard {...products[2]} />
      </section>
    </div>
  );
}
