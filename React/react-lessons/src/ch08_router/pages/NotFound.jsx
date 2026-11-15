import { Link, useLocation } from "react-router";

/*
  [순서07] 404 페이지

  <Route path="*" element={<NotFound />} />
  - 위의 어떤 경로와도 맞지 않으면 표시된다. (항상 맨 마지막에)
  - useLocation() : 현재 주소 정보 (pathname, search ...)
*/
export default function NotFound() {
  const location = useLocation();

  return (
    <section>
      <h2>404 - 페이지를 찾을 수 없습니다</h2>
      <p>요청한 주소 : {location.pathname}</p>
      <Link to="/">홈으로</Link>
    </section>
  );
}
