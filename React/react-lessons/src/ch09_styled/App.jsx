import { useState } from "react";
import styled, { createGlobalStyle, css, keyframes, ThemeProvider } from "styled-components";

/*
  ch09. styled-components (CSS-in-JS)

  [순서01] 왜 CSS-in-JS인가? 설치
  [순서02] 기본 문법 - styled.태그`CSS`
  [순서03] props로 스타일 바꾸기 ($transient props)
  [순서04] css 헬퍼로 스타일 묶음 만들기
  [순서05] 스타일 확장 - styled(컴포넌트)
  [순서06] 중첩, 가상 클래스 (&:hover)
  [순서07] keyframes 애니메이션
  [순서08] ThemeProvider (다크 모드), createGlobalStyle


  [순서01] 왜 CSS-in-JS인가?

  일반 CSS 파일의 문제
  - 클래스 이름이 전역 → 다른 컴포넌트의 .button 과 충돌할 수 있다.
  - "이 클래스가 어디서 쓰이는지" 찾기 어렵다. (지워도 되는지 모름)
  - state에 따라 스타일을 바꾸려면 className을 조건으로 붙였다 뗐다 해야 한다.

  styled-components
  - 스타일이 붙은 "컴포넌트"를 만든다. → 클래스 이름은 자동으로 고유하게 만들어진다. (충돌 없음)
  - props로 스타일을 바꿀 수 있다.
  - 컴포넌트를 지우면 스타일도 같이 사라진다.

  설치
    npm install styled-components

  ※ VSCode 확장 "vscode-styled-components" 를 설치하면 CSS 부분에 색과 자동 완성이 생긴다.
*/


/*
  [순서02] 기본 문법

  const 이름 = styled.태그`
    CSS 그대로
  `;

  - 이름은 컴포넌트이므로 대문자로 시작
  - ` ` (백틱, 템플릿 리터럴) 안에 일반 CSS를 쓴다. (camelCase 아님, 세미콜론 필요)
  - 컴포넌트는 함수 "밖"에 만든다. (안에 만들면 렌더링마다 새로 생성되어 느려지고 경고 발생)
*/
const Box = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
  color: royalblue;
`;


/*
  [순서03] props로 스타일 바꾸기

  ${(props) => ...} 안에서 props를 받아 값을 정할 수 있다.

  $ 붙은 props (transient props)
  - <Button $primary> 처럼 이름 앞에 $를 붙이면 스타일 계산에만 쓰이고, 실제 HTML 태그에는 전달되지 않는다.
  - $를 안 붙이면 <button primary="true"> 처럼 HTML에 이상한 속성이 붙고 콘솔에 경고가 나온다.
  → 스타일용 props에는 항상 $를 붙인다.
*/
const Button = styled.button`
  padding: 8px 16px;
  margin-right: 6px;
  border: 1px solid royalblue;
  border-radius: 6px;
  cursor: pointer;

  background-color: ${(props) => (props.$primary ? "royalblue" : "white")};
  color: ${(props) => (props.$primary ? "white" : "royalblue")};

  /* [순서06] & 는 "이 컴포넌트 자신"을 뜻한다. (SCSS와 같은 문법) */
  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    border-color: #ccc;
    background-color: #eee;
    color: #999;
    cursor: not-allowed;
  }
`;


/*
  [순서04] css 헬퍼

  여러 줄의 스타일을 조건에 따라 한꺼번에 넣을 때 css`...` 를 사용한다.
  ${({ $size }) => sizes[$size]}  ← props를 구조 분해해서 받아도 된다.
*/
const sizes = {
  small: css`
    padding: 4px 8px;
    font-size: 12px;
  `,
  medium: css`
    padding: 8px 16px;
    font-size: 14px;
  `,
  large: css`
    padding: 12px 24px;
    font-size: 18px;
  `,
};

const SizeButton = styled(Button)`
  ${({ $size = "medium" }) => sizes[$size]}
`;


/*
  [순서05] 스타일 확장 - styled(기존컴포넌트)

  이미 만든 스타일을 그대로 가져와서 일부만 바꾼다. (위의 SizeButton도 확장)
*/
const DangerButton = styled(Button)`
  border-color: crimson;
  background-color: ${(props) => (props.$primary ? "crimson" : "white")};
  color: ${(props) => (props.$primary ? "white" : "crimson")};
`;


/*
  [순서06] 중첩

  부모 스타일 안에서 자식 태그나 클래스를 선택할 수 있다.
*/
const Card = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background-color: #f7f8fc;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #cdd5f3;
  }

  .name {
    font-weight: bold;
  }

  .job {
    color: gray;
    font-size: 13px;
  }

  &:hover .name {
    color: royalblue;
  }
`;


/*
  [순서07] keyframes 애니메이션

  const 이름 = keyframes` from {...} to {...} `;
  animation: ${이름} 1s ... ;
*/
const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 4px solid #ddd;
  border-top-color: royalblue;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;


/*
  [순서08] ThemeProvider, createGlobalStyle

  ThemeProvider
  - <ThemeProvider theme={객체}> 로 감싸면, 안쪽의 모든 styled 컴포넌트가 props.theme 로 값을 읽을 수 있다.
  - 색, 글꼴 크기 같은 "디자인 규칙"을 한 곳에 모아 둔다. → 다크 모드 전환이 쉬워진다.
  - 원리는 ch10 Context API와 같다. (props 없이 깊은 곳까지 값 전달)

  createGlobalStyle
  - body 같은 전역 스타일을 컴포넌트로 만든다. 화면 어디든 한 번 렌더링하면 적용된다.
*/
const lightTheme = { bg: "#ffffff", text: "#222222", panel: "#f1f3f9", point: "royalblue" };
const darkTheme = { bg: "#1e1f24", text: "#eeeeee", panel: "#2c2e36", point: "#8ea8ff" };

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s;
  }
`;

const ThemePanel = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.panel};

  strong {
    color: ${({ theme }) => theme.point};
  }
`;


export default function App() {
  const [active, setActive] = useState(false);
  const [dark, setDark] = useState(false);

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <h1>ch09. styled-components</h1>

      <Box>
        <Title>[순서02] 기본 문법</Title>
        <p>Box, Title은 styled로 만든 컴포넌트다. 개발자 도구에서 클래스 이름을 확인해 보자.</p>
      </Box>

      <Box>
        <Title>[순서03] props로 스타일 바꾸기</Title>
        <Button>기본</Button>
        <Button $primary>primary</Button>
        <Button $primary={active} onClick={() => setActive(!active)}>
          클릭하면 토글 ({active ? "ON" : "OFF"})
        </Button>
        <Button disabled>disabled</Button>
      </Box>

      <Box>
        <Title>[순서04] css 헬퍼 / [순서05] 확장</Title>
        <SizeButton $size="small">small</SizeButton>
        <SizeButton>medium</SizeButton>
        <SizeButton $size="large" $primary>
          large
        </SizeButton>
        <DangerButton>삭제</DangerButton>
        <DangerButton $primary>정말 삭제</DangerButton>
      </Box>

      <Box>
        <Title>[순서06] 중첩</Title>
        <Card>
          <img alt="" />
          <div>
            <div className="name">홍길동</div>
            <div className="job">프론트엔드 개발자</div>
          </div>
        </Card>
      </Box>

      <Box>
        <Title>[순서07] keyframes</Title>
        <Spinner />
      </Box>

      <Box>
        <Title>[순서08] ThemeProvider</Title>
        <ThemePanel>
          현재 테마 : <strong>{dark ? "다크" : "라이트"}</strong>
        </ThemePanel>
        <p>
          <Button $primary onClick={() => setDark(!dark)}>
            테마 전환
          </Button>
        </p>
      </Box>
    </ThemeProvider>
  );
}
