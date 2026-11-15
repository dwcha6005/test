import "./ch01.css";

/*
  ch01. React 시작과 JSX

  [순서01] 프로젝트 구조와 실행 흐름
  [순서02] 컴포넌트 만들기
  [순서03] JSX 규칙
  [순서04] 표현식 { }
  [순서05] 조건부 렌더링
  [순서06] 스타일 적용
*/


/*
  [순서01] 프로젝트 구조와 실행 흐름

  < 프로젝트 만들기 >
  npm create vite@latest 프로젝트명 -- --template react
  cd 프로젝트명
  npm install
  npm run dev

  < 실행 흐름 >
  1. index.html      : <div id="root"></div> 가 있고, <script type="module" src="/src/main.jsx">를 실행
  2. main.jsx        : createRoot(document.getElementById("root")).render(<App />)
                       → root div 안에 App 컴포넌트를 그린다.
  3. App.jsx         : App() 함수가 return 하는 JSX가 화면에 표시된다.

  → 개발자 도구 Elements 탭에서 <div id="root"> 안에 내용이 들어간 것을 확인한다.

  < 파일 확장자 >
  - JSX 문법을 쓰는 파일은 .jsx 로 만든다. (Vite에서는 .js에 JSX를 쓰면 오류)

  < 예전 방식(Create React App)과 비교 >
  - CRA는 2025년에 공식 지원이 중단되었다. 기존 자료의 public/index.html, index.js, npm start 대신
    Vite에서는 index.html(최상위), main.jsx, npm run dev 를 사용한다.
*/


/*
  [순서02] 컴포넌트 만들기

  컴포넌트 : 화면의 한 부분을 담당하는 함수. JSX를 return 한다.

  규칙
  - 컴포넌트 이름은 반드시 대문자로 시작! (HTML 태그와 구분하기 위함)
    function hello() {}  → <hello /> 는 HTML 태그로 인식 (X)
    function Hello() {}  → <Hello /> 컴포넌트 (O)
  - 화살표 함수로 만들어도 된다. const Hello = () => { return <h3>...</h3>; };
  - 다른 파일에서 사용하려면 export default (ch02에서 파일 분리)
*/
function Hello() {
  return <h3>안녕하세요! 첫 번째 컴포넌트입니다.</h3>;
}

const Welcome = () => {
  return <p>화살표 함수로 만든 컴포넌트입니다.</p>;
};

function Step02() {
  return (
    <section>
      <h2>[순서02] 컴포넌트</h2>
      <Hello />
      <Welcome />
      <Hello />
    </section>
  );
}


/*
  [순서03] JSX 규칙

  JSX : 자바스크립트 안에서 HTML처럼 화면을 작성하는 문법 (JavaScript XML)
        → 실제로는 자바스크립트 코드로 변환되어 실행된다.

  1. 반드시 닫는 태그가 있어야 한다.
     <input> (X)   <input /> (O)   <br /> (O)   <img src="" /> (O)

  2. 반드시 "하나의" 최상위 요소를 return 해야 한다.
     <h1 /><p /> 처럼 두 개를 나란히 return 하면 오류!
     → <div>로 감싸거나, 화면에 흔적을 남기지 않는 Fragment <></> 로 감싼다.

  3. HTML 속성 이름이 다른 것이 있다. (자바스크립트 예약어와 겹치기 때문)
     class   → className
     for     → htmlFor
     onclick → onClick (이벤트는 카멜 표기법, ch03에서 학습)

  4. 주석은 { /* 주석 *\/ } 형태로 작성한다.
*/
function Step03() {
  return (
    // Fragment : 여러 요소를 묶지만 실제 HTML에는 아무 태그도 생기지 않는다.
    <>
      <section>
        <h2>[순서03] JSX 규칙</h2>

        {/* 1. 닫는 태그 */}
        <input placeholder="닫는 태그 필수" />
        <br />

        {/* 3. className, htmlFor */}
        <label htmlFor="agree" className="highlight">
          라벨을 클릭하면 체크박스가 선택된다
        </label>
        <input type="checkbox" id="agree" />
      </section>
    </>
  );
}


/*
  [순서04] 표현식 { }

  JSX 안에서 { } 를 사용하면 자바스크립트 값을 넣을 수 있다.
  - 변수, 계산식, 함수 호출, 삼항 연산자 등 "값이 되는 것"만 가능
  - if문, for문은 { } 안에 쓸 수 없다. (값이 아니라 "문장"이기 때문)

  화면에 표시되는 값
  - 숫자, 문자열 : 그대로 표시
  - true, false, null, undefined : 아무것도 표시되지 않음 → 보여 주려면 String(값)
  - 배열 : 요소를 이어서 표시 (["a","b"] → ab)
  - 객체 : 오류! → obj.name 처럼 속성을 꺼내서 표시해야 함
*/
function Step04() {
  const n1 = 10;
  const n2 = 20;
  const name = "홍길동";
  const isMember = true;
  const user = { id: "hong", age: 25 };
  const fruits = ["사과", "배", "포도"];

  function getGreeting() {
    return "반갑습니다";
  }

  return (
    <section>
      <h2>[순서04] 표현식</h2>
      <p>숫자 : {n1}</p>
      <p>계산 : {n1 + n2}</p>
      <p>문자열 연결 : {name + "님"}</p>
      <p>템플릿 문자열 : {`${name}님 ${getGreeting()}`}</p>

      {/* boolean은 화면에 표시되지 않는다 */}
      <p>boolean 그대로 : [{isMember}]</p>
      <p>boolean 변환 : [{String(isMember)}]</p>

      {/* 객체는 그대로 넣으면 오류 → 속성을 꺼낸다 */}
      {/* <p>{user}</p> */}
      <p>
        객체 속성 : {user.id} / {user.age}세
      </p>

      <p>배열 : {fruits}</p>
      <p>배열 join : {fruits.join(", ")}</p>
    </section>
  );
}


/*
  [순서05] 조건부 렌더링

  1) 삼항 연산자   조건 ? A : B          → 둘 중 하나를 보여줄 때
  2) && 연산자     조건 && A             → 조건이 true일 때만 보여줄 때
  3) if + return   컴포넌트에서 미리 return → 경우가 많거나 아예 다른 화면일 때

  주의! && 앞에 숫자 0이 오면 0이 화면에 그대로 표시된다.
     {count && <p>...</p>}      → count가 0이면 "0"이 보임
     {count > 0 && <p>...</p>}  → 조건을 boolean으로 만들어서 사용
*/
// { score } : 부모가 <Grade score={95} /> 로 넘겨준 값 (props, ch02에서 자세히)
function Grade({ score }) {
  // if문은 { } 안에 못 쓰지만, return 전에 사용하는 것은 가능
  if (score >= 90) {
    return <p>{score}점 : A등급</p>;
  }
  if (score >= 80) {
    return <p>{score}점 : B등급</p>;
  }
  return <p>{score}점 : 재시험 대상</p>;
}

function Step05() {
  const num = 19;
  const isLogin = false;
  const unread = 0;
  const cartCount = 3;

  return (
    <section>
      <h2>[순서05] 조건부 렌더링</h2>

      {/* 1) 삼항 연산자 */}
      <p>
        {num}은(는) {num % 2 === 0 ? "짝수" : "홀수"}입니다.
      </p>
      <p>{isLogin ? "로그아웃" : "로그인"} 버튼</p>

      {/* 2) && */}
      {cartCount > 0 && <p>장바구니에 {cartCount}개 상품이 있습니다.</p>}
      {isLogin && <p>(로그인하지 않았으므로 이 문장은 보이지 않음)</p>}

      {/* && 함정 : 0이 화면에 표시됨 */}
      <p>
        잘못된 예 : [{unread && <span>새 메시지</span>}]
      </p>
      <p>
        올바른 예 : [{unread > 0 && <span>새 메시지</span>}]
      </p>

      {/* 3) if + return (컴포넌트 단위) */}
      <Grade score={95} />
      <Grade score={72} />
    </section>
  );
}


/*
  [순서06] 스타일 적용

  1) 인라인 스타일 : style={{ 속성: 값 }}
     - 바깥 { } 는 표현식, 안쪽 { } 는 자바스크립트 객체
     - CSS 속성은 카멜 표기법 : background-color → backgroundColor
     - 숫자만 쓰면 px로 처리된다. fontSize: 20 → 20px
     - <div style="color: red"> 처럼 문자열로 쓰면 오류! (JSX는 HTML이 아니다)

  2) CSS 파일 : import "./ch01.css"; 후 className 사용 (권장)
     - 스타일이 길어지면 CSS 파일로 분리한다.

  3) 조건에 따라 스타일 바꾸기 : 삼항 연산자 활용
*/
function Step06() {
  const isError = true;
  const boxStyle = {
    backgroundColor: "#e0f2fe",
    padding: 10,
    borderRadius: 8,
  };

  return (
    <section>
      <h2>[순서06] 스타일</h2>

      <p style={{ color: "royalblue", fontWeight: "bold" }}>인라인 스타일</p>
      <div style={boxStyle}>스타일 객체를 변수로 분리</div>

      <p className="highlight">CSS 파일의 className</p>

      <p className={isError ? "error" : "success"}>
        {isError ? "입력값을 확인하세요." : "확인되었습니다."}
      </p>
      <p style={{ color: isError ? "crimson" : "green" }}>인라인 스타일도 조건 가능</p>
    </section>
  );
}


export default function App() {
  return (
    <div>
      <h1>ch01. React 시작과 JSX</h1>
      <p>[순서01]은 주석으로 설명합니다. (프로젝트 구조와 실행 흐름)</p>
      <Step02 />
      <Step03 />
      <Step04 />
      <Step05 />
      <Step06 />
    </div>
  );
}
