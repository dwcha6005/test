import { NavLink, Outlet } from "react-router";

/*
  [순서03] Link와 NavLink
  [순서06] 중첩 라우트와 Outlet

  Layout : 모든 페이지에 공통으로 보이는 틀 (메뉴, 푸터)
  - <Outlet /> 자리에 현재 주소에 맞는 "자식 페이지"가 표시된다.

  NavLink : Link와 같지만, 현재 주소와 일치하면 active 상태가 된다.
  - style이나 className에 함수를 넣으면 { isActive }를 받을 수 있다.
  - end : "/" 처럼 다른 주소의 시작 부분과 겹치는 링크에 붙인다. (정확히 "/"일 때만 active)
*/
const linkStyle = ({ isActive }) => ({
  marginRight: 12,
  fontWeight: isActive ? "bold" : "normal",
  color: isActive ? "crimson" : "royalblue",
});

export default function Layout() {
  return (
    <div>
      <nav style={{ padding: "10px 0", borderBottom: "1px solid #ccc", marginBottom: 12 }}>
        <NavLink to="/" end style={linkStyle}>
          홈
        </NavLink>
        <NavLink to="/about" style={linkStyle}>
          소개
        </NavLink>
        <NavLink to="/products" style={linkStyle}>
          상품
        </NavLink>
      </nav>

      {/* 자식 라우트의 페이지가 여기에 표시된다 */}
      <Outlet />

      <footer style={{ marginTop: 20, color: "gray" }}>© DOM 마켓</footer>
    </div>
  );
}
