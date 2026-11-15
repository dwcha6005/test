import Link from "next/link";
import "./globals.css";

/*
  [순서03] layout.js - 모든 페이지를 감싸는 공통 틀

  - app/layout.js 는 반드시 있어야 하는 "루트 레이아웃"이다. <html>, <body>를 여기서 만든다.
  - children 자리에 각 page.js 내용이 들어간다. (ch08 React Router의 Layout + <Outlet />과 같은 역할)
  - 페이지를 이동해도 layout은 다시 만들어지지 않는다. (메뉴 state 유지)

  metadata : <head>의 <title>, <meta description>을 만든다. (검색 엔진 최적화, SEO)
*/
export const metadata = {
  title: "Next.js 수업",
  description: "ch13. Next.js App Router 기초",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <nav>
          {/* [순서04] Link : React Router의 Link와 같다. (href 사용) */}
          <Link href="/">홈</Link>
          <Link href="/about">소개</Link>
          <Link href="/posts">게시글</Link>
          <Link href="/counter">카운터</Link>
          <Link href="/practice">실습</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
