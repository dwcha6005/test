// [순서03] Controller : 버튼만 가진 컴포넌트 (state 없음)
// 값을 바꾸고 싶으면 부모가 내려준 함수(onClickButton)를 호출해서 "부모에게 요청"한다.
const BUTTONS = [-1, -10, -100, 100, 10, 1];

const Controller = ({ onClickButton }) => {
  return (
    <div>
      {BUTTONS.map((value) => (
        // key 필수 (기존 자료에서 빠져 있던 부분)
        // 양수는 + 기호를 붙여 표시 (실습 이미지와 동일하게)
        <button key={value} onClick={() => onClickButton(value)}>
          {value > 0 ? `+${value}` : value}
        </button>
      ))}
    </div>
  );
};

export default Controller;
