import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

/*
  ch08. React Router

  [순서01] SPA와 라우팅, 설치
  [순서02] BrowserRouter, Routes, Route
  [순서03] Link와 NavLink                       → pages/Home.jsx, pages/Layout.jsx
  [순서04] 동적 라우트와 useParams               → pages/ProductDetail.jsx
  [순서05] useNavigate - 코드로 이동하기         → pages/ProductDetail.jsx
  [순서06] 중첩 라우트와 Outlet (공통 레이아웃)   → pages/Layout.jsx
  [순서07] 404 페이지                            → pages/NotFound.jsx
  [순서08] 쿼리 스트링 - useSearchParams         → pages/Products.jsx


  [순서01] SPA와 라우팅

  SPA (Single Page Application)
  - HTML 파일은 index.html 하나뿐이다.
  - 주소가 바뀌면 서버에서 새 페이지를 받지 않고, JavaScript가 화면만 바꾼다. (빠르고 깜빡임 없음)

  라우팅 : "주소(URL)에 따라 어떤 컴포넌트를 보여 줄지" 정하는 것
  → React 자체에는 라우팅 기능이 없어서 React Router 라이브러리를 사용한다.

  설치
    npm install react-router

  ※ 이름 정리 : 예전(v6까지)에는 react-router-dom 패키지를 설치했다.
     v7부터는 react-router 하나로 합쳐졌고, react-router-dom은 예전 코드 호환용으로만 남아 있다.
     인터넷의 예전 자료에서 import ... from "react-router-dom" 을 보면 "react-router"로 바꿔 읽으면 된다.


  [순서02] BrowserRouter, Routes, Route

  <BrowserRouter>                       ← 앱 전체를 한 번 감싼다. (주소 변화를 감지)
    <Routes>                            ← Route 목록. 현재 주소와 맞는 Route 하나를 고른다.
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>


  [순서06] 중첩 라우트

  <Route element={<Layout />}>          ← 부모 : 공통 레이아웃 (path 없이 감싸기만)
    <Route index element={<Home />} />   ← index : 부모 주소("/") 그대로일 때
    <Route path="about" ... />           ← 자식 path는 "/" 없이 써도 된다.
  </Route>

  → Layout 안의 <Outlet /> 자리에 자식 페이지가 표시된다.
*/

export default function App() {
  return (
    <BrowserRouter>
      <h1 style={{ fontSize: 20 }}>ch08. React Router</h1>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
