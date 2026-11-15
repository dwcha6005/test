/*
  [순서07] loading.js

  같은 폴더의 page.js가 데이터를 기다리는 동안 자동으로 보여 줄 화면
  - /posts, /posts/1 로 이동할 때 잠깐 보인다. (네트워크가 빠르면 거의 안 보임)
  - 확인 방법 : 개발자 도구 Network 탭 → Slow 4G 로 바꾸고 이동
*/
export default function Loading() {
  return <p>⏳ 불러오는 중...</p>;
}
