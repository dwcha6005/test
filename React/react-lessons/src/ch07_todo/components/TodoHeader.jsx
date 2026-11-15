// [순서02] 화면 구성 - 헤더 : 오늘 날짜와 남은 할 일 개수를 props로 받아 표시
export default function TodoHeader({ remain }) {
  return (
    <header className="todo-header">
      <h3>오늘은 📅</h3>
      <h1>{new Date().toLocaleDateString("ko-KR", { dateStyle: "full" })}</h1>
      <p>남은 할 일 : {remain}개</p>
    </header>
  );
}
