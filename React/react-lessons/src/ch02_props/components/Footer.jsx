// [순서01] 컴포넌트 파일 분리
// 주의 : 파일 이름도 대문자로 시작한다. (footer.jsx X → Footer.jsx O)
//        Windows는 대소문자를 구분하지 않지만, 배포 서버(Linux)는 구분하므로 오류가 날 수 있다.
export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #ccc", marginTop: 12, color: "gray" }}>
      <p>© 2026 React 수업</p>
    </footer>
  );
}
