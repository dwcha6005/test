/*
  [순서06] children

  컴포넌트 태그 "사이"에 넣은 내용은 props.children 으로 전달된다.

  <Card title="공지사항">
      <p>여기 내용이 children</p>
  </Card>

  → 겉모양(틀)은 같고 안의 내용만 다른 컴포넌트를 만들 때 사용한다. (카드, 모달, 레이아웃 등)
*/
export default function Card({ title, children }) {
  return (
    <div
      style={{
        border: "1px solid #999",
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
      }}
    >
      <h3 style={{ margin: "0 0 6px" }}>{title}</h3>
      {children}
    </div>
  );
}
