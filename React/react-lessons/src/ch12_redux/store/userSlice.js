import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/*
  [순서07] 비동기 처리 - createAsyncThunk

  reducer는 순수 함수라서 fetch를 할 수 없다.
  → createAsyncThunk로 "비동기 작업 + 결과에 따른 action 3개"를 자동으로 만든다.

     dispatch(fetchUsers())
        ├─ 시작       → "users/fetch/pending"
        ├─ 성공       → "users/fetch/fulfilled"  (payload = return 값)
        └─ 실패(throw) → "users/fetch/rejected"   (error.message)

  이 세 action은 slice의 extraReducers에서 처리한다.
  (ch11 실습 문제 3의 FETCH_START / SUCCESS / ERROR 를 자동으로 만들어 주는 것)
*/
export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
});

const userSlice = createSlice({
  name: "users",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
