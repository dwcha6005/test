/*
    cart.js - 장바구니 기능 (default export)

    default export : 파일 하나에 하나만. 그 파일의 "대표"를 내보낸다.
    import 하는 쪽에서 원하는 이름을 붙일 수 있다.
*/

import { sum } from "./utils/math.js";
import { addLog } from "./utils/logger.js";

export default function createCart() {
    let items = [];

    return {
        add: function(name, price) {
            items.push({ name: name, price: price });
            addLog("cart.js : " + name + " 추가");
        },
        clear: function() {
            items = [];
            addLog("cart.js : 비우기");
        },
        getItems: function() {
            return items;
        },
        getTotal: function() {
            return sum(items.map(function(item) {
                return item.price;
            }));
        }
    };
}
