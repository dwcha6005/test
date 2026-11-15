import { createContext, useContext, useState } from "react";

/*
  ch10 실습 - Context API

  < 문제 1. 언어 설정 > [기초]
  ① LanguageContext를 만들고 "ko" / "en"을 공유하시오.
  ② Header에 [한국어] [English] 버튼을, Greeting에 "안녕하세요" / "Hello"를 표시하시오.
  ③ Header와 Greeting은 props를 하나도 받지 않아야 한다.

  < 문제 2. 로그인 Context > [응용]
  ① AuthContext에 user(null 또는 { name }), login(name), logout()을 넣으시오.
  ② AuthProvider 컴포넌트와 useAuth() 커스텀 훅으로 정리하시오.
  ③ LoginBox : 로그인 전에는 이름 입력 + [로그인], 로그인 후에는 "OOO님 환영합니다" + [로그아웃]
  ④ Provider 밖에서 useAuth()를 쓰면 에러를 던지게 하시오.

  < 문제 3. 장바구니 Context > [심화]
  ① CartContext에 items와 addItem(product), removeItem(id)를 넣으시오.
  ② ProductList(상품 목록 + [담기]), CartBadge(🛒 3), CartList(담긴 목록 + [빼기])를 만드시오.
  ③ 같은 상품을 다시 담으면 qty를 1 늘리시오. (ch04 실습 복습)
  ④ 세 컴포넌트가 서로 떨어져 있어도(형제, 다른 깊이) 같은 장바구니를 보는 것을 확인하시오.
*/


// < 문제 1 >
const LanguageContext = createContext("ko");

function Header() {
  const { lang, setLang } = useContext(LanguageContext);
  return (
    <div>
      <button disabled={lang === "ko"} onClick={() => setLang("ko")}>
        한국어
      </button>
      <button disabled={lang === "en"} onClick={() => setLang("en")}>
        English
      </button>
    </div>
  );
}

function Greeting() {
  const { lang } = useContext(LanguageContext);
  return <p>{lang === "ko" ? "안녕하세요" : "Hello"}</p>;
}

function LanguageDemo() {
  const [lang, setLang] = useState("ko");
  return (
    <LanguageContext value={{ lang, setLang }}>
      <Header />
      <Greeting />
    </LanguageContext>
  );
}


// < 문제 2 >
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (name) => setUser({ name });
  const logout = () => setUser(null);
  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth는 AuthProvider 안에서 사용하세요.");
  return context;
}

function LoginBox() {
  const { user, login, logout } = useAuth();
  const [name, setName] = useState("");

  if (user) {
    return (
      <p>
        {user.name}님 환영합니다 <button onClick={logout}>로그아웃</button>
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (name.trim()) login(name.trim());
      }}
    >
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
      <button type="submit">로그인</button>
    </form>
  );
}


// < 문제 3 >
const CartContext = createContext(null);

function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((item) => item.id !== id));

  return <CartContext value={{ items, addItem, removeItem }}>{children}</CartContext>;
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart는 CartProvider 안에서 사용하세요.");
  return context;
}

const products = [
  { id: 1, name: "텀블러", price: 12000 },
  { id: 2, name: "머그컵", price: 8500 },
  { id: 3, name: "보온병", price: 23000 },
];

function ProductList() {
  const { addItem } = useCart();
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} {p.price.toLocaleString()}원 <button onClick={() => addItem(p)}>담기</button>
        </li>
      ))}
    </ul>
  );
}

function CartBadge() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.qty, 0);
  return <strong>🛒 {count}</strong>;
}

function CartList() {
  const { items, removeItem } = useCart();
  if (items.length === 0) return <p>장바구니가 비었습니다.</p>;

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} x {item.qty} <button onClick={() => removeItem(item.id)}>빼기</button>
          </li>
        ))}
      </ul>
      <p>합계 : {total.toLocaleString()}원</p>
    </div>
  );
}

// 일부러 깊이를 다르게 둔다
function Shop() {
  return (
    <div style={{ display: "flex", gap: 24 }}>
      <div>
        <h4>상품</h4>
        <ProductList />
      </div>
      <aside>
        <h4>
          장바구니 <CartBadge />
        </h4>
        <CartList />
      </aside>
    </div>
  );
}


export default function Practice() {
  return (
    <div>
      <h1>ch10 실습 정답</h1>

      <section>
        <h3>문제 1. 언어 설정</h3>
        <LanguageDemo />
      </section>

      <section>
        <h3>문제 2. 로그인 Context</h3>
        <AuthProvider>
          <LoginBox />
        </AuthProvider>
      </section>

      <section>
        <h3>문제 3. 장바구니 Context</h3>
        <CartProvider>
          <Shop />
        </CartProvider>
      </section>
    </div>
  );
}
