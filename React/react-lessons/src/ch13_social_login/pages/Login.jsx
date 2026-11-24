import { useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import { PROVIDERS } from "../fakeAuthServer.js";
import { STORAGE_TYPES } from "../tokenStorage.js";

/*
  [순서05] 로그인 페이지

  실제 서비스 : 버튼을 누르면 카카오 등의 사이트(https://kauth.kakao.com/...)로 "페이지 전체가 이동"한다.
  이 예제    : 같은 앱 안의 /oauth/kakao 페이지가 카카오 사이트 역할을 한다.
*/
export default function Login() {
  const { user, startLogin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [storageType, setStorageType] = useState("local");

  // 이미 로그인했으면 로그인 페이지를 보여 줄 필요가 없다
  if (user) {
    return <Navigate to="/mypage" replace />;
  }

  const handleLogin = (provider) => {
    const url = startLogin(provider, storageType);
    navigate(url);
  };

  return (
    <section>
      <h2>로그인</h2>
      {searchParams.get("error") && <p style={{ color: "crimson" }}>{searchParams.get("error")}</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 260 }}>
        {Object.entries(PROVIDERS).map(([key, info]) => (
          <button
            key={key}
            onClick={() => handleLogin(key)}
            style={{ padding: 10, background: info.color, color: info.textColor, border: "1px solid #ddd", borderRadius: 6 }}
          >
            {info.label}로 로그인
          </button>
        ))}
      </div>

      <fieldset style={{ marginTop: 16, width: 320 }}>
        <legend>토큰 저장 위치 [순서03]</legend>
        {Object.entries(STORAGE_TYPES).map(([key, label]) => (
          <label key={key} style={{ display: "block" }}>
            <input type="radio" name="storage" value={key} checked={storageType === key} onChange={() => setStorageType(key)} />{" "}
            {label}
          </label>
        ))}
      </fieldset>
    </section>
  );
}
