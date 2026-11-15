/*
  [순서02] app/about/page.js → /about

  - 파일 안의 export default 컴포넌트가 그 주소의 화면이다.
  - 페이지마다 metadata를 따로 지정할 수 있다. (브라우저 탭 제목 확인)
*/
export const metadata = {
  title: "소개 | Next.js 수업",
};

export default function AboutPage() {
  return (
    <main>
      <h1>소개</h1>
      <p>app/about 폴더를 만들고 page.js를 넣었더니 /about 주소가 생겼다.</p>
    </main>
  );
}
