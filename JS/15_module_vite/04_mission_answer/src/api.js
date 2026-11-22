/*
    api.js - 서버 요청만 담당하는 모듈

    다른 파일은 fetch를 직접 쓰지 않고 이 파일의 함수만 사용한다.
    → 서버 주소가 바뀌어도 이 파일만 고치면 된다.
*/

const BASE_URL = "http://localhost:3000";

// 이 파일 안에서만 쓰는 함수 (export 하지 않음)
async function request(method, path, data) {
    const options = { method: method, headers: {} };

    if (data !== undefined) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    let response;

    try {
        response = await fetch(BASE_URL + path, options);
    } catch (error) {
        throw new Error("서버에 연결할 수 없습니다. (npm run api 실행 확인)");
    }

    if (!response.ok) {
        throw new Error("요청 실패 (" + response.status + ")");
    }

    return response.json();
}

export function getMemos() {
    return request("GET", "/memos");
}

export function createMemo(memo) {
    return request("POST", "/memos", memo);
}

export function updateMemo(id, changes) {
    return request("PATCH", "/memos/" + id, changes);
}

export function deleteMemo(id) {
    return request("DELETE", "/memos/" + id);
}
