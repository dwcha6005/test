/*
  [순서02] props 받기 - props 객체로 받기
  [순서03] props 받기 - 구조 분해 할당으로 받기 + 기본값

  props(properties) : 부모 컴포넌트가 자식 컴포넌트에 전달하는 값
  - <UserInfo name="홍길동" location="부산" /> 처럼 HTML 속성 형태로 전달한다.
  - 자식은 하나의 객체로 받는다.  props = { name: "홍길동", location: "부산" }
*/

// [순서02] props 객체로 받기
export function UserInfoBasic(props) {
  console.log("UserInfoBasic props :", props);

  return (
    <p>
      {props.name}은(는) {props.location}에 거주합니다.
    </p>
  );
}

// [순서03] 구조 분해 할당으로 받기 (실무에서 가장 많이 쓰는 형태)
// - 매개변수 자리에서 바로 꺼낸다. 변수명은 props의 key와 같아야 한다. (순서는 상관없음)
// - 전달되지 않을 수 있는 값은 기본값을 지정한다.  foodList = []
//   → 기본값이 없으면 foodList가 undefined라서 foodList.length 에서 오류
export default function UserInfo({ name, location, foodList = [] }) {
  return (
    <div>
      <p>
        {name}은(는) {location}에 거주합니다.
      </p>
      <p>좋아하는 음식 {foodList.length}개 : {foodList.join(", ")}</p>
    </div>
  );
}
