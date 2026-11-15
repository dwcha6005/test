// [순서01] 컴포넌트 파일 분리
// 파일 하나에 컴포넌트 하나. 파일 이름과 컴포넌트 이름을 같게, 대문자로 시작한다.
function Header() {
  return (
    <header style={{ borderBottom: "2px solid #334", marginBottom: 12 }}>
      <h1>ch02. 컴포넌트와 props</h1>
    </header>
  );
}

// 다른 파일에서 import 할 수 있도록 내보내기 (14_module_vite 01에서 배운 default export)
export default Header;
