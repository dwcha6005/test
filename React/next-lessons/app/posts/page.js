import Link from "next/link";

/*
  [순서05] 서버 컴포넌트에서 데이터 가져오기

  App Router의 컴포넌트는 기본이 "서버 컴포넌트"다.
  - 서버에서 실행되고, 결과 HTML만 브라우저로 보낸다.
  - 컴포넌트 함수에 async를 붙이고 await fetch()를 바로 쓸 수 있다.
    → ch06에서 배운 useEffect + useState(loading, error) 코드가 필요 없다!
  - console.log는 브라우저가 아니라 "터미널"(npm run dev 창)에 찍힌다.

  주의! 서버 컴포넌트에서는 useState, useEffect, onClick을 쓸 수 없다. → [순서08] 클라이언트 컴포넌트
*/
export const metadata = {
  title: "게시글 | Next.js 수업",
};

export default async function PostsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
  const posts = await res.json();

  console.log("게시글 개수 :", posts.length); // 터미널에서 확인

  return (
    <main>
      <h1>게시글 목록</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/posts/9999">없는 글 (/posts/9999) → 404 확인</Link>
      </p>
    </main>
  );
}
