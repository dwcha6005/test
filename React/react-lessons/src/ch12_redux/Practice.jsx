import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

/*
  ch12 실습 - Redux Toolkit 쇼핑몰

  ※ 실습용 store는 수업용(store/index.js)과 섞이지 않도록 이 파일 안에 만든다.
     실제 프로젝트에서는 store/ 폴더에 slice별 파일로 나눈다.

  < 문제 1. 장바구니 slice > [기초]
  ① cartSlice : items 배열
     - addToCart(product) : 같은 상품이면 qty + 1, 없으면 qty 1로 추가
     - removeFromCart(id)
     - changeQty({ id, diff }) : qty가 0 이하가 되면 삭제
     - clearCart()
  ② configureStore에 cart로 등록하시오.

  < 문제 2. 화면 연결 > [기초]
  ① 상품 목록에서 [담기]를 누르면 addToCart를 dispatch 하시오.
  ② 헤더에 🛒 담긴 개수 합계를 useSelector로 표시하시오.
  ③ 장바구니 목록에 -, +, 삭제 버튼과 합계 금액, [비우기] 버튼을 만드시오.

  < 문제 3. 상품 목록을 서버에서 불러오기 > [응용]
  ① productSlice와 createAsyncThunk로 https://dummyjson.com/products?limit=5 를 불러오시오.
     (응답 : { products: [{ id, title, price, ... }] }  ※ price는 달러)
  ② pending / fulfilled / rejected 에 따라 로딩, 목록, 에러를 표시하시오.
  ③ 처음 화면이 열릴 때 자동으로 불러오시오. (useEffect)

  < 문제 4. selector 함수 > [심화]
  ① (state) => ... 를 컴포넌트마다 쓰지 말고 selectCartCount, selectCartTotal 함수로 만들어 재사용하시오.
  ② 합계가 $100 이상이면 "무료 배송", 아니면 "무료 배송까지 $00 남음"을 표시하시오.
*/


// < 문제 1 >
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    changeQty: (state, action) => {
      const { id, diff } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item) return;
      item.qty += diff;
      if (item.qty <= 0) {
        state.items = state.items.filter((i) => i.id !== id);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

const { addToCart, removeFromCart, changeQty, clearCart } = cartSlice.actions;


// < 문제 3 >
const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch("https://dummyjson.com/products?limit=5&select=title,price");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.products;
});

const productSlice = createSlice({
  name: "products",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


const practiceStore = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productSlice.reducer,
  },
});


// < 문제 4 > selector 함수
const selectCartItems = (state) => state.cart.items;
const selectCartCount = (state) => state.cart.items.reduce((sum, i) => sum + i.qty, 0);
const selectCartTotal = (state) => state.cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);

const FREE_SHIPPING = 100;


// < 문제 2 ② >
function Header() {
  const count = useSelector(selectCartCount);
  return (
    <header style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ccc" }}>
      <h2>Redux 마켓</h2>
      <h2>🛒 {count}</h2>
    </header>
  );
}

// < 문제 2 ①, 문제 3 >
function ProductList() {
  const { list, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>상품을 불러오는 중...</p>;
  if (error) return <p style={{ color: "crimson" }}>에러 : {error}</p>;

  return (
    <ul>
      {list.map((p) => (
        <li key={p.id}>
          {p.title} - ${p.price} <button onClick={() => dispatch(addToCart(p))}>담기</button>
        </li>
      ))}
    </ul>
  );
}

// < 문제 2 ③, 문제 4 >
function Cart() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  if (items.length === 0) return <p>장바구니가 비었습니다.</p>;

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => dispatch(changeQty({ id: item.id, diff: -1 }))}>-</button>
            {item.qty}
            <button onClick={() => dispatch(changeQty({ id: item.id, diff: 1 }))}>+</button>
            <button onClick={() => dispatch(removeFromCart(item.id))}>삭제</button>
          </li>
        ))}
      </ul>
      <p>합계 : ${total.toFixed(2)}</p>
      <p>
        {total >= FREE_SHIPPING ? "무료 배송" : `무료 배송까지 $${(FREE_SHIPPING - total).toFixed(2)} 남음`}
      </p>
      <button onClick={() => dispatch(clearCart())}>비우기</button>
    </div>
  );
}


export default function Practice() {
  return (
    <Provider store={practiceStore}>
      <Header />
      <div style={{ display: "flex", gap: 32 }}>
        <section>
          <h3>상품</h3>
          <ProductList />
        </section>
        <section>
          <h3>장바구니</h3>
          <Cart />
        </section>
      </div>
    </Provider>
  );
}
