/*
    utils/format.js - 화면 표시용 함수 모음 (named export)

    export를 붙인 것만 다른 파일에서 import 할 수 있다.
*/

// 함수 앞에 바로 export
export function formatPrice(price) {
    return price.toLocaleString() + "원";
}

export function formatDate(date) {
    return date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
}

// export하지 않은 함수 → 이 파일 안에서만 사용 (외부에서 import 불가)
function pad(number) {
    return String(number).padStart(2, "0");
}

export function formatTime(date) {
    return pad(date.getHours()) + ":" + pad(date.getMinutes());
}
