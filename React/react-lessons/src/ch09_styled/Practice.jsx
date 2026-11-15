import { useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";

/*
  ch09 실습 - styled-components

  < 문제 1. 배지 > [기초]
  ① Badge 컴포넌트를 만드시오. (padding 2px 8px, 둥근 모서리, 글자 12px)
  ② $type 이 "new"면 초록, "hot"이면 빨강, "sale"이면 주황, 없으면 회색 배경으로 만드시오.

  < 문제 2. 입력창 > [응용]
  ① Input 컴포넌트를 만들고, focus 되면 테두리를 royalblue로 바꾸시오. (&:focus)
  ② $error 가 true면 테두리를 crimson으로, 아래에 빨간 에러 메시지를 보이시오.
  ③ 아이디가 4글자 미만이면 $error를 true로 전달하시오.

  < 문제 3. 탭 메뉴 > [응용]
  ① ["공지", "자유", "질문"] 탭을 만들고, 선택된 탭은 밑줄과 굵은 글씨로 표시하시오. ($active)
  ② 탭에 따라 아래 내용이 바뀌게 하시오.

  < 문제 4. 토스트 알림 > [심화]
  ① [알림 띄우기] 버튼을 누르면 화면 오른쪽 아래에 "저장되었습니다" 토스트가 나타나시오.
  ② 아래에서 위로 올라오며 나타나는 keyframes 애니메이션을 넣으시오.
  ③ 2초 뒤 자동으로 사라지게 하시오. (setTimeout - 연속 클릭 시 이전 타이머는 취소)
*/


// < 문제 1 >
const badgeColors = { new: "seagreen", hot: "crimson", sale: "darkorange" };

const Badge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  margin-right: 6px;
  border-radius: 10px;
  font-size: 12px;
  color: white;
  background-color: ${({ $type }) => badgeColors[$type] || "gray"};
`;


// < 문제 2 >
const Input = styled.input`
  padding: 8px;
  border: 2px solid #ccc;
  border-radius: 6px;
  outline: none;

  &:focus {
    border-color: royalblue;
  }

  ${({ $error }) =>
    $error &&
    css`
      border-color: crimson;
      &:focus {
        border-color: crimson;
      }
    `}
`;

const ErrorText = styled.p`
  margin: 4px 0 0;
  color: crimson;
  font-size: 13px;
`;


// < 문제 3 >
const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
`;

const Tab = styled.button`
  padding: 8px 16px;
  border: none;
  border-bottom: 3px solid ${({ $active }) => ($active ? "royalblue" : "transparent")};
  background: none;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  cursor: pointer;
`;

const tabContents = {
  공지: "이번 주 금요일은 휴강입니다.",
  자유: "자유롭게 이야기를 나누는 게시판입니다.",
  질문: "궁금한 점을 질문해 주세요.",
};


// < 문제 4 >
const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

const Toast = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  padding: 12px 20px;
  border-radius: 8px;
  background-color: #333;
  color: white;
  animation: ${slideUp} 0.3s ease-out;
`;


export default function Practice() {
  const [userId, setUserId] = useState("");
  const [tab, setTab] = useState("공지");
  const [toast, setToast] = useState(false);
  const timerRef = useRef(null); // 화면에 안 보이는 값 → useRef (ch06 [순서07])

  const hasError = userId.length > 0 && userId.length < 4;

  const showToast = () => {
    clearTimeout(timerRef.current); // 연속 클릭 시 이전 타이머 취소
    setToast(true);
    timerRef.current = setTimeout(() => setToast(false), 2000);
  };

  return (
    <div>
      <h1>ch09 실습 정답</h1>

      <section>
        <h3>문제 1. 배지</h3>
        <Badge $type="new">NEW</Badge>
        <Badge $type="hot">HOT</Badge>
        <Badge $type="sale">SALE</Badge>
        <Badge>기본</Badge>
      </section>

      <section>
        <h3>문제 2. 입력창</h3>
        <Input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="아이디" $error={hasError} />
        {hasError && <ErrorText>아이디는 4글자 이상이어야 합니다.</ErrorText>}
      </section>

      <section>
        <h3>문제 3. 탭 메뉴</h3>
        <TabList>
          {Object.keys(tabContents).map((name) => (
            <Tab key={name} $active={tab === name} onClick={() => setTab(name)}>
              {name}
            </Tab>
          ))}
        </TabList>
        <p>{tabContents[tab]}</p>
      </section>

      <section>
        <h3>문제 4. 토스트</h3>
        <button onClick={showToast}>알림 띄우기</button>
        {toast && <Toast>저장되었습니다</Toast>}
      </section>
    </div>
  );
}
