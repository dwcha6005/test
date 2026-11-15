/*
  [순서09] Route Handler - 간단한 API 만들기

  app/api/hello/route.js → GET /api/hello
  - 함수 이름이 HTTP 메서드다. (GET, POST, PUT, DELETE)
  - 프런트엔드와 같은 프로젝트에서 서버 API를 만들 수 있다. (13_fetch의 json-server 역할)

  확인 : 브라우저 주소창에 http://localhost:3000/api/hello?name=홍길동
*/
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "손님";

  return Response.json({ message: `안녕하세요, ${name}님`, time: new Date().toISOString() });
}
