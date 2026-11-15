import { useState } from "react";

/*
  ch03 실습 - 이벤트와 State

  < 문제 1. 좋아요 버튼 > [기초]
  ① liked(true/false), likeCount(숫자) 두 개의 state를 만드시오. (likeCount 초기값 10)
  ② 버튼을 누르면 liked를 반대로 바꾸고, 좋아요면 +1, 취소면 -1 하시오.
  ③ 버튼 글자는 liked에 따라 "♥ 좋아요 취소" / "♡ 좋아요" 로 표시하시오.

  < 문제 2. 글자 수 제한 입력창 > [기초]
  ① 입력값을 state로 관리하는 제어 컴포넌트를 만드시오.
  ② "n / 20" 형태로 글자 수를 표시하고, 20자를 넘으면 빨간색으로 표시하시오.
  ③ 20자를 넘으면 [등록] 버튼을 비활성화(disabled)하시오.

  < 문제 3. 회원가입 폼 > [응용]
  ① id, password, email을 하나의 객체 state로 관리하시오.
  ② 입력창의 name 속성과 하나의 handleChange 함수로 모든 입력을 처리하시오.
  ③ 제출(onSubmit)하면 페이지 이동을 막고, 비어 있는 항목이 있으면 "모든 항목을 입력하세요."를 표시하시오.
  ④ 모두 입력되면 "hong 님 가입 완료 (hong@test.com)"를 표시하고 폼을 비우시오.

  < 문제 4. 다크 모드 > [응용]
  ① isDark state를 만들고, 버튼으로 전환하시오.
  ② isDark에 따라 section의 배경색 / 글자색을 바꾸시오. (#222 / white)
  ③ 버튼 글자는 "라이트 모드로" / "다크 모드로" 로 바꾸시오.
*/


// < 문제 1 >
function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(10);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <section>
      <h2>문제 1. 좋아요</h2>
      <button onClick={handleLike}>{liked ? "♥ 좋아요 취소" : "♡ 좋아요"}</button> {likeCount}
    </section>
  );
}


// < 문제 2 >
function LimitedInput() {
  const [text, setText] = useState("");
  const isOver = text.length > 20;

  return (
    <section>
      <h2>문제 2. 글자 수 제한</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <span style={{ color: isOver ? "crimson" : "gray" }}> {text.length} / 20 </span>
      <button disabled={isOver}>등록</button>
    </section>
  );
}


// < 문제 3 >
function SignupForm() {
  const initialForm = { id: "", password: "", email: "" };
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.id === "" || form.password === "" || form.email === "") {
      setMessage("모든 항목을 입력하세요.");
      return;
    }

    setMessage(`${form.id} 님 가입 완료 (${form.email})`);
    setForm(initialForm);
  };

  return (
    <section>
      <h2>문제 3. 회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input name="id" value={form.id} onChange={handleChange} placeholder="아이디" />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="비밀번호" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="이메일" />
        <button type="submit">가입</button>
      </form>
      <p>{message}</p>
    </section>
  );
}


// < 문제 4 >
function DarkMode() {
  const [isDark, setIsDark] = useState(false);

  return (
    <section
      style={{
        backgroundColor: isDark ? "#222" : "white",
        color: isDark ? "white" : "black",
      }}
    >
      <h2 style={{ color: "inherit" }}>문제 4. 다크 모드</h2>
      <button onClick={() => setIsDark(!isDark)}>{isDark ? "라이트 모드로" : "다크 모드로"}</button>
    </section>
  );
}


export default function Practice() {
  return (
    <div>
      <h1>ch03 실습 정답</h1>
      <LikeButton />
      <LimitedInput />
      <SignupForm />
      <DarkMode />
    </div>
  );
}
