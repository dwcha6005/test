import { createSlice } from "@reduxjs/toolkit";

/*
  [순서03] createSlice - 기능 하나의 state + reducer + action을 한 번에

  createSlice({
    name: "counter",          ← action type 앞에 붙는 이름 ("counter/increase")
    initialState: ...,        ← 초기값
    reducers: { ... }         ← 상태 변경 함수들. 이름이 곧 action 이름이 된다.
  })

  ★ 불변성 걱정 없이 "직접 수정하는 것처럼" 써도 된다.
    state.value += 1;   ← RTK 안의 Immer 라이브러리가 몰래 복사본을 만들어 새 state로 바꿔 준다.
    (ch11 useReducer에서는 return {...state} 처럼 직접 복사해야 했다.)

  ※ 직접 수정하거나, 새 값을 return 하거나 둘 중 하나만 한다. (둘 다 하면 에러)
*/
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increase: (state) => {
      state.value += 1;
    },
    decrease: (state) => {
      state.value -= 1;
    },
    // [순서05] dispatch(addBy(10)) → action.payload 가 10
    addBy: (state, action) => {
      state.value += action.payload;
    },
    reset: () => ({ value: 0 }), // 새 값을 return 하는 방식
  },
});

// action 생성 함수 : increase() → { type: "counter/increase" }
export const { increase, decrease, addBy, reset } = counterSlice.actions;
// store에 등록할 reducer
export default counterSlice.reducer;
