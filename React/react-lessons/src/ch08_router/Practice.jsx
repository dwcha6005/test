import { useState } from "react";
import { BrowserRouter, Link, Navigate, NavLink, Outlet, Route, Routes, useNavigate, useParams } from "react-router";

/*
  ch08 실습 - 게시판 + 로그인 보호 페이지

    const posts = [
      { id: 1, title: "React Router 시작", writer: "홍길동", content: "Route로 주소와 화면을 연결합니다." },
      { id: 2, title: "useParams 정리", writer: "김철수", content: "주소의 값은 문자열입니다." },
      { id: 3, title: "중첩 라우트", writer: "이영희", content: "Outlet 자리에 자식이 보입니다." }
    ];

  < 문제 1. 기본 라우팅 > [기초]
  ① "/" 홈, "/board" 게시판 목록, "/login" 로그인 페이지를 만드시오.
  ② 모든 페이지 위에 NavLink 메뉴가 보이도록 Layout + Outlet으로 만드시오. (현재 메뉴는 굵게)

  < 문제 2. 상세 페이지 > [기초]
  ① 게시판 목록의 제목을 누르면 "/board/글번호"로 이동하시오.
  ② 상세 페이지에서 useParams로 글을 찾아 제목, 작성자, 내용을 표시하시오.
  ③ 없는 번호면 "존재하지 않는 글입니다."와 [목록으로] 링크를 표시하시오.

  < 문제 3. 이전 / 다음 글 > [응용]
  ① 상세 페이지에 [이전 글] [다음 글] 버튼을 만들어 useNavigate로 이동하시오.
  ② 첫 글에서는 [이전 글], 마지막 글에서는 [다음 글]을 비활성화하시오.

  < 문제 4. 로그인해야 볼 수 있는 페이지 > [심화]
  ① App에 user state(null 또는 이름)를 두고, 로그인 페이지에서 이름을 입력하면 로그인 처리 후 "/mypage"로 이동하시오.
  ② "/mypage"는 로그인한 경우에만 "OOO님의 마이페이지"를 보여 주고,
     로그인하지 않았으면 <Navigate to="/login" replace /> 로 로그인 페이지로 보내시오.
  ③ 로그인 상태면 메뉴에 [로그아웃] 버튼을 표시하시오.
  ※ user state와 함수를 여러 페이지에 props로 전달해야 해서 불편하다 → ch10 Context API에서 해결
*/

const posts = [
  { id: 1, title: "React Router 시작", writer: "홍길동", content: "Route로 주소와 화면을 연결합니다." },
  { id: 2, title: "useParams 정리", writer: "김철수", content: "주소의 값은 문자열입니다." },
  { id: 3, title: "중첩 라우트", writer: "이영희", content: "Outlet 자리에 자식이 보입니다." },
];

const menuStyle = ({ isActive }) => ({ marginRight: 10, fontWeight: isActive ? "bold" : "normal" });


// < 문제 1, 4 ③ >
function Layout({ user, onLogout }) {
  return (
    <div>
      <nav style={{ borderBottom: "1px solid #ccc", paddingBottom: 8, marginBottom: 12 }}>
        <NavLink to="/" end style={menuStyle}>
          홈
        </NavLink>
        <NavLink to="/board" style={menuStyle}>
          게시판
        </NavLink>
        <NavLink to="/mypage" style={menuStyle}>
          마이페이지
        </NavLink>
        {user ? (
          <button onClick={onLogout}>로그아웃 ({user})</button>
        ) : (
          <NavLink to="/login" style={menuStyle}>
            로그인
          </NavLink>
        )}
      </nav>
      <Outlet />
    </div>
  );
}

function Home() {
  return <h2>홈 - ch08 실습</h2>;
}

// < 문제 1, 2 ① >
function BoardList() {
  return (
    <div>
      <h2>게시판</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/board/${post.id}`}>{post.title}</Link> - {post.writer}
          </li>
        ))}
      </ul>
    </div>
  );
}

// < 문제 2, 3 >
function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const index = posts.findIndex((p) => p.id === Number(id));

  if (index === -1) {
    return (
      <div>
        <h2>존재하지 않는 글입니다.</h2>
        <Link to="/board">목록으로</Link>
      </div>
    );
  }

  const post = posts[index];
  const prev = posts[index - 1];
  const next = posts[index + 1];

  return (
    <div>
      <h2>{post.title}</h2>
      <p>작성자 : {post.writer}</p>
      <p>{post.content}</p>
      <button disabled={!prev} onClick={() => navigate(`/board/${prev.id}`)}>
        이전 글
      </button>
      <button disabled={!next} onClick={() => navigate(`/board/${next.id}`)}>
        다음 글
      </button>
      <Link to="/board">목록으로</Link>
    </div>
  );
}

// < 문제 4 ① >
function Login({ onLogin }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return;
    onLogin(name.trim());
    navigate("/mypage");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>로그인</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
      <button type="submit">로그인</button>
    </form>
  );
}

// < 문제 4 ② >
function MyPage({ user }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <h2>{user}님의 마이페이지</h2>;
}


export default function Practice() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout user={user} onLogout={() => setUser(null)} />}>
          <Route index element={<Home />} />
          <Route path="board" element={<BoardList />} />
          <Route path="board/:id" element={<BoardDetail />} />
          <Route path="login" element={<Login onLogin={setUser} />} />
          <Route path="mypage" element={<MyPage user={user} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
