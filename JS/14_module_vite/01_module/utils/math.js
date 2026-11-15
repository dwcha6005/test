/*
    utils/math.js - 계산 함수 모음

    파일 맨 아래에서 한꺼번에 export 할 수도 있다.
*/

const TAX_RATE = 0.1;

function sum(numbers) {
    return numbers.reduce(function(total, n) {
        return total + n;
    }, 0);
}

function withTax(price) {
    return Math.round(price * (1 + TAX_RATE));
}

export { TAX_RATE, sum, withTax };
