import { createContext, useContext, useEffect, useReducer } from "react";

/*
  ch11 실습 - useReducer

  < 문제 1. 신호등 > [기초]
  ① state는 "red" | "yellow" | "green" 중 하나
  ② NEXT action : red → green → yellow → red 순서로 바꾸시오.
  ③ 현재 색의 원을 표시하시오.

  < 문제 2. 회원가입 폼 > [응용]
  ① 폼 state { name, email, agree }를 하나의 reducer로 관리하시오.
     - CHANGE : { type: "CHANGE", name: "email", value: "..." } → 해당 항목 변경
     - RESET  : 초기값으로
  ② agree(체크박스)도 CHANGE 하나로 처리하시오. (힌트 : e.target.type === "checkbox" ? checked : value)
  ③ 이름과 이메일이 있고 약관에 동의해야 [가입] 버튼이 활성화되게 하시오.

  < 문제 3. fetch 상태 관리 > [응용]
  ① { loading, data, error }를 useReducer로 관리하시오.
     - FETCH_START   : loading true, error null
     - FETCH_SUCCESS : loading false, data 저장
     - FETCH_ERROR   : loading false, error 저장
  ② https://jsonplaceholder.typicode.com/users 를 불러와 이름 목록을 표시하시오.
  ③ useState 세 개로 할 때와 비교해서 좋은 점을 주석으로 쓰시오.

  < 문제 4. 장바구니 = useReducer + Context > [심화]
  ① cartReducer : ADD(같은 상품이면 qty+1), REMOVE, CHANGE_QTY(qty 0 이하면 삭제), CLEAR
  ② state는 CartStateContext, dispatch는 CartDispatchContext로 내려 주시오.
  ③ 상품 목록, 장바구니 목록, 합계 컴포넌트가 props 없이 동작하게 하시오.
*/


// < 문제 1 >
const nextLight = { red: "green", green: "yellow", yellow: "red" };

function lightReducer(state, action) {
  if (action.type === "NEXT") return nextLight[state];
  throw new Error(`알 수 없는 action : ${action.type}`);
}

function TrafficLight() {
  const [light, dispatch] = useReducer(lightReducer, "red");
  return (
    <div>
      <div style={{ width: 60, height: 60, borderRadius: "50%", background: light }} />
      <p>현재 : {light}</p>
      <button onClick={() => dispatch({ type: "NEXT" })}>다음 신호</button>
    </div>
  );
}


// < 문제 2 >
const initialForm = { name: "", email: "", agree: false };

function formReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return { ...state, [action.name]: action.value };
    case "RESET":
      return initialForm;
    default:
      throw new Error(`알 수 없는 action : ${action.type}`);
  }
}

function SignupForm() {
  const [form, dispatch] = useReducer(formReducer, initialForm);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    dispatch({ type: "CHANGE", name, value: type === "checkbox" ? checked : value });
  };

  const canSubmit = form.name.trim() !== "" && form.email.trim() !== "" && form.agree;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${form.name}님 가입 완료`);
    dispatch({ type: "RESET" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="이름" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="이메일" />
      <label>
        <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} /> 약관 동의
      </label>
      <button type="submit" disabled={!canSubmit}>
        가입
      </button>
      <button type="button" onClick={() => dispatch({ type: "RESET" })}>
        초기화
      </button>
    </form>
  );
}


// < 문제 3 >
// 좋은 점 : loading, data, error는 항상 "함께" 바뀐다.
//          useState 세 개라면 setLoading(false)를 빠뜨리거나 error를 안 지우는 실수가 생기기 쉽다.
//          reducer에서는 action 하나가 세 값을 한 번에 정해 주므로 어긋난 상태가 생기지 않는다.
const initialFetch = { loading: false, data: [], error: null };

function fetchReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { loading: false, data: action.payload, error: null };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error(`알 수 없는 action : ${action.type}`);
  }
}

function UserLoader() {
  const [{ loading, data, error }, dispatch] = useReducer(fetchReducer, initialFetch);

  useEffect(() => {
    let ignore = false;
    dispatch({ type: "FETCH_START" });

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((users) => {
        if (!ignore) dispatch({ type: "FETCH_SUCCESS", payload: users });
      })
      .catch((err) => {
        if (!ignore) dispatch({ type: "FETCH_ERROR", payload: err.message });
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p style={{ color: "crimson" }}>에러 : {error}</p>;
  return <p>{data.map((u) => u.name).join(", ")}</p>;
}


// < 문제 4 >
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const exists = state.some((item) => item.id === action.product.id);
      if (exists) {
        return state.map((item) => (item.id === action.product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...state, { ...action.product, qty: 1 }];
    }
    case "REMOVE":
      return state.filter((item) => item.id !== action.id);
    case "CHANGE_QTY":
      return state
        .map((item) => (item.id === action.id ? { ...item, qty: item.qty + action.diff } : item))
        .filter((item) => item.qty > 0);
    case "CLEAR":
      return [];
    default:
      throw new Error(`알 수 없는 action : ${action.type}`);
  }
}

const CartStateContext = createContext(null);
const CartDispatchContext = createContext(null);

function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  return (
    <CartStateContext value={items}>
      <CartDispatchContext value={dispatch}>{children}</CartDispatchContext>
    </CartStateContext>
  );
}

const products = [
  { id: 1, name: "텀블러", price: 12000 },
  { id: 2, name: "머그컵", price: 8500 },
  { id: 3, name: "보온병", price: 23000 },
];

function ProductList() {
  const dispatch = useContext(CartDispatchContext);
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} <button onClick={() => dispatch({ type: "ADD", product: p })}>담기</button>
        </li>
      ))}
    </ul>
  );
}

function CartList() {
  const items = useContext(CartStateContext);
  const dispatch = useContext(CartDispatchContext);

  if (items.length === 0) return <p>장바구니가 비었습니다.</p>;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => dispatch({ type: "CHANGE_QTY", id: item.id, diff: -1 })}>-</button>
          {item.qty}
          <button onClick={() => dispatch({ type: "CHANGE_QTY", id: item.id, diff: 1 })}>+</button>
          <button onClick={() => dispatch({ type: "REMOVE", id: item.id })}>삭제</button>
        </li>
      ))}
    </ul>
  );
}

function CartTotal() {
  const items = useContext(CartStateContext);
  const dispatch = useContext(CartDispatchContext);
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <p>
      합계 : {total.toLocaleString()}원 <button onClick={() => dispatch({ type: "CLEAR" })}>비우기</button>
    </p>
  );
}


export default function Practice() {
  return (
    <div>
      <h1>ch11 실습 정답</h1>
      <section>
        <h3>문제 1. 신호등</h3>
        <TrafficLight />
      </section>
      <section>
        <h3>문제 2. 회원가입 폼</h3>
        <SignupForm />
      </section>
      <section>
        <h3>문제 3. fetch 상태 관리</h3>
        <UserLoader />
      </section>
      <section>
        <h3>문제 4. 장바구니</h3>
        <CartProvider>
          <ProductList />
          <CartList />
          <CartTotal />
        </CartProvider>
      </section>
    </div>
  );
}
