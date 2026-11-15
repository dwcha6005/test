/*
    utils/logger.js - 모듈은 한 번만 실행된다는 것을 확인하기 위한 파일

    main.js와 cart.js가 모두 이 파일을 import 하지만,
    이 파일은 처음 한 번만 실행되고 logs 배열도 하나만 만들어진다. (공유)
*/

console.log("[logger.js] 실행됨 - 이 메시지는 한 번만 출력된다.");

const logs = [];

export function addLog(message) {
    logs.push(message);
}

export function getLogs() {
    return logs;
}
