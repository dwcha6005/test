import { useState } from "react";

/*
  ch04 실습 - 장바구니

    const PRODUCTS = [
      { id: 1, name: "텀블러", price: 12000 },
      { id: 2, name: "머그컵", price: 8500 },
      { id: 3, name: "보온병", price: 23000 },
      { id: 4, name: "컵받침", price: 3000 }
    ];

  < 문제 1. 상품 목록 > [기초]
  ① PRODUCTS를 map으로 "텀블러 - 12,000원 [담기]" 형태의 목록으로 표시하시오. (key 필수)

  < 문제 2. 가격 필터 > [기초]
  ① "1만 원 이상만 보기" 체크박스를 만들고, 체크하면 가격이 10000 이상인 상품만 표시하시오.

  < 문제 3. 장바구니 담기 / 삭제 > [응용]
  ① cart state를 만드시오. 항목 형태 : { id, name, price, qty }
  ② [담기]를 누르면 장바구니에 qty 1로 추가하시오.
     이미 담긴 상품이면 추가하지 말고 qty를 1 늘리시오. (map)
  ③ 장바구니 항목의 [삭제]를 누르면 제거하시오. (filter)

  < 문제 4. 수량 변경 > [응용]
  ① 장바구니 항목에 [-] [+] 버튼을 만들어 qty를 바꾸시오.
  ② qty가 1일 때 [-]를 누르면 항목을 삭제하시오.
  ③ 모든 state 변경은 함수형 업데이트 setCart((prev) => ...)로 작성하시오.

  < 문제 5. 합계 > [심화]
  ① 총 수량과 총 금액을 reduce로 계산하여 표시하시오.
  ② 장바구니가 비었으면 "장바구니가 비었습니다."를 표시하시오.
  ③ [비우기] 버튼으로 장바구니를 비우시오.
*/

const PRODUCTS = [
  { id: 1, name: "텀블러", price: 12000 },
  { id: 2, name: "머그컵", price: 8500 },
  { id: 3, name: "보온병", price: 23000 },
  { id: 4, name: "컵받침", price: 3000 },
];

export default function Practice() {
  const [onlyExpensive, setOnlyExpensive] = useState(false);
  const [cart, setCart] = useState([]);

  // < 문제 2 >
  const shownProducts = onlyExpensive ? PRODUCTS.filter((p) => p.price >= 10000) : PRODUCTS;

  // < 문제 3 ② >
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // < 문제 3 ③ >
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // < 문제 4 >
  const changeQty = (id, diff) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + diff } : item))
        .filter((item) => item.qty > 0)
    );
  };

  // < 문제 5 >
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <h1>ch04 실습 정답 - 장바구니</h1>

      <section>
        <h2>문제 1, 2. 상품 목록</h2>
        <label>
          <input type="checkbox" checked={onlyExpensive} onChange={(e) => setOnlyExpensive(e.target.checked)} /> 1만 원
          이상만 보기
        </label>
        <ul>
          {shownProducts.map((p) => (
            <li key={p.id}>
              {p.name} - {p.price.toLocaleString()}원 <button onClick={() => addToCart(p)}>담기</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>문제 3 ~ 5. 장바구니</h2>
        {cart.length === 0 ? (
          <p>장바구니가 비었습니다.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} {item.price.toLocaleString()}원 x{" "}
                <button onClick={() => changeQty(item.id, -1)}>-</button>
                {item.qty}
                <button onClick={() => changeQty(item.id, 1)}>+</button>{" "}
                <button onClick={() => removeFromCart(item.id)}>삭제</button>
              </li>
            ))}
          </ul>
        )}
        <p>
          총 {totalQty}개 / {totalPrice.toLocaleString()}원
        </p>
        <button onClick={() => setCart([])}>비우기</button>
      </section>
    </div>
  );
}
