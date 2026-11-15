/*
  ch13. Next.js (App Router)

  [순서01] Next.js란? 설치와 실행                → 이 파일
  [순서02] 파일 기반 라우팅 (app 폴더)            → 이 파일, app/about/page.js
  [순서03] layout.js                              → app/layout.js
  [순서04] Link로 이동                            → app/layout.js
  [순서05] 서버 컴포넌트에서 데이터 가져오기       → app/posts/page.js
  [순서06] 동적 라우트 [id] 와 notFound           → app/posts/[id]/page.js, app/not-found.js
  [순서07] loading.js                             → app/posts/loading.js
  [순서08] 클라이언트 컴포넌트 ("use client")      → components/Counter.js, app/counter/page.js
  [순서09] Route Handler (API 만들기)              → app/api/hello/route.js


  [순서01] Next.js란?

  React : 화면(UI)을 만드는 "라이브러리" → 라우팅, 데이터 가져오기, 빌드 방법은 직접 골라야 한다.
          (그래서 ch08에서 React Router를 따로 설치했다)
  Next.js : React로 만든 "프레임워크" → 라우팅, 서버 렌더링, 데이터 가져오기, 최적화가 기본 포함

  가장 큰 차이 - 렌더링 위치
  - Vite + React (CSR) : 빈 HTML을 받은 뒤 브라우저에서 JavaScript가 화면을 그린다.
                         → 검색 엔진이 빈 페이지를 볼 수 있고, 첫 화면이 늦다.
  - Next.js (SSR/SSG)   : 서버에서 HTML을 완성해서 보낸다. → 첫 화면이 빠르고 검색 엔진 친화적

  새 프로젝트 만들기 (참고)
    npx create-next-app@latest 프로젝트이름
    (TypeScript No, ESLint Yes, Tailwind No, src/ 폴더 No, App Router Yes 선택 권장)

  이 수업 프로젝트 실행
    cd next-lessons
    npm install
    npm run dev       → http://localhost:3000

  ※ Node.js 20.9 이상 필요


  [순서02] 파일 기반 라우팅

  폴더 이름 = 주소, 그 안의 page.js = 화면
    app/page.js              → /
    app/about/page.js        → /about
    app/posts/page.js        → /posts
    app/posts/[id]/page.js   → /posts/1, /posts/2 ... (동적 라우트)

  → React Router처럼 <Route>를 직접 쓰지 않는다. 폴더를 만들면 주소가 생긴다.
*/
export default function Home() {
  return (
    <main>
      <h1>ch13. Next.js</h1>
      <p>위 메뉴를 눌러 각 페이지를 확인하세요.</p>
      <ul>
        <li>소개 : 가장 단순한 페이지 (app/about/page.js)</li>
        <li>게시글 : 서버에서 데이터를 가져오는 페이지</li>
        <li>카운터 : 클라이언트 컴포넌트 (useState)</li>
        <li>
          API : <a href="/api/hello">/api/hello</a> (Route Handler)
        </li>
      </ul>
    </main>
  );
}
