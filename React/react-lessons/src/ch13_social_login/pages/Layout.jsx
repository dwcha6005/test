import { NavLink, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import { PROVIDERS } from "../fakeAuthServer.js";

const linkStyle = ({ isActive }) => ({ marginRight: 12, fontWeight: isActive ? "bold" : "normal" });

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #ccc", paddingBottom: 8, marginBottom: 12 }}>
        <NavLink to="/" end style={linkStyle}>
          홈
        </NavLink>
        <NavLink to="/mypage" style={linkStyle}>
          마이페이지
        </NavLink>
        <span style={{ marginLeft: "auto" }}>
          {user ? (
            <>
              {user.name} ({PROVIDERS[user.provider].label}) <button onClick={logout}>로그아웃</button>
            </>
          ) : (
            <NavLink to="/login" style={linkStyle}>
              로그인
            </NavLink>
          )}
        </span>
      </nav>
      <Outlet />
    </div>
  );
}
