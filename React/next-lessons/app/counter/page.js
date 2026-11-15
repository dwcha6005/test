import Counter from "@/components/Counter";

/*
  [순서08] 서버 컴포넌트 안에 클라이언트 컴포넌트 넣기

  - 이 page.js는 서버 컴포넌트 ("use client" 없음)
  - <Counter />만 브라우저에서 동작한다.
  - "@/components/Counter" : @ 는 프로젝트 루트를 가리키는 별칭 (jsconfig.json의 paths 설정)

  시연 : components/Counter.js 의 "use client"를 지우면
        → "You're importing a component that needs useState..." 에러 → 원복
*/
export default function CounterPage() {
  const serverTime = new Date().toLocaleTimeString("ko-KR");

  return (
    <main>
      <h1>클라이언트 컴포넌트</h1>
      <p>이 시간은 서버에서 만들었다 : {serverTime}</p>
      <Counter initial={10} />
    </main>
  );
}
