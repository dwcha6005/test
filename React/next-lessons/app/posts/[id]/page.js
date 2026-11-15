import Link from "next/link";
import { notFound } from "next/navigation";

/*
  [순서06] 동적 라우트 - [id] 폴더

  app/posts/[id]/page.js → /posts/1, /posts/abc ...
  - 대괄호 폴더 이름이 params의 key가 된다. → params.id
  - React Router의 path="/posts/:id" + useParams() 와 같은 역할

  ★ Next.js 15부터 params는 Promise다. 반드시 await 해서 꺼낸다.
     const { id } = await params;
     (예전 자료의 params.id 를 바로 쓰는 코드는 최신 버전에서 동작하지 않는다)
  - 주소에서 온 값이므로 문자열이다. (ch08과 같음)

  notFound() : 호출하면 app/not-found.js 화면을 보여 주고 404 상태 코드를 보낸다.
*/
async function getPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) return null;
  return res.json();
}

// 페이지마다 다른 제목 만들기 (상세 페이지의 SEO)
export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getPost(id);
  return { title: post ? `${post.title} | Next.js 수업` : "글 없음" };
}

export default async function PostDetailPage({ params }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <p>
        <Link href="/posts">← 목록</Link>
      </p>
      <h1>
        {post.id}. {post.title}
      </h1>
      <p>{post.body}</p>
    </main>
  );
}
