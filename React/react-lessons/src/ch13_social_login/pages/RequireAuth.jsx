import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

/*
  [순서08] 로그인해야 볼 수 있는 페이지 감싸기 (ch08 실습 문제 4 복습)

  <RequireAuth><MyPage /></RequireAuth>

  checking 중에 바로 /login으로 보내면, 새로고침할 때마다 로그인 페이지로 튕긴다.
  → 저장된 토큰 확인이 끝날 때까지 기다린다.
*/
export default function RequireAuth({ children }) {
  const { user, checking } = useAuth();

  if (checking) return <p>로그인 상태 확인 중...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
