// [순서03] Viewer : 값을 "보여 주기만" 하는 컴포넌트 (state 없음)
// 부모(App)가 가진 count를 props로 받는다.
const Viewer = ({ count }) => {
  return (
    <div>
      <div>현재 카운트 :</div>
      <h1>{count}</h1>
    </div>
  );
};

export default Viewer;
