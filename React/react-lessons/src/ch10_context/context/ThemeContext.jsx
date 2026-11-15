import { createContext, useContext, useState } from "react";

/*
  [순서02] Context 만들기 - createContext
  [순서03] 값 공급하기 - Provider
  [순서04] 값 꺼내기 - useContext
  [순서05] Provider 컴포넌트와 커스텀 훅으로 정리하기

  1) const ThemeContext = createContext(기본값);
     - 기본값 : Provider 바깥에서 useContext를 쓰면 받게 되는 값

  2) <ThemeContext value={공유할 값}> ... </ThemeContext>
     - 안쪽의 모든 컴포넌트가 이 값을 꺼낼 수 있다. (중간 컴포넌트를 거치지 않음)
     ※ React 19부터 <ThemeContext.Provider value={...}> 대신 <ThemeContext value={...}> 로 쓸 수 있다.
       예전 자료의 .Provider 도 그대로 동작한다.

  3) const value = useContext(ThemeContext);

  [순서05] 실무 패턴
  - state + Provider를 하나의 컴포넌트(ThemeProvider)로 묶는다.
  - useContext(ThemeContext)를 매번 쓰는 대신 useTheme() 커스텀 훅을 만든다.
    (훅 이름은 반드시 use로 시작해야 한다.)
*/
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  const toggleTheme = () => setDark((prev) => !prev);

  return <ThemeContext value={{ dark, toggleTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme은 ThemeProvider 안에서만 사용할 수 있습니다.");
  }
  return context;
}
