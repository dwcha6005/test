import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite 설정 파일
// plugins: [react()] → JSX 변환, 저장 시 자동 반영(Fast Refresh) 기능을 켠다.
export default defineConfig({
  plugins: [react()],
});
