import { Link, useSearchParams } from "react-router";
import { products } from "../data.js";

/*
  [순서08] 쿼리 스트링 - useSearchParams

  /products?sort=price     → 가격 낮은 순
  /products?sort=name      → 이름 순

  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("sort")          → "price"
  setSearchParams({ sort: "name" }) → 주소가 /products?sort=name 으로 바뀐다.

  정렬, 검색, 페이지 번호처럼 "새로고침하거나 주소를 공유해도 유지되어야 하는 상태"는
  useState 대신 쿼리 스트링에 저장한다. (13_fetch 01의 쿼리 스트링과 같은 개념)
*/
export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "id";

  const sorted = [...products].sort((a, b) => {
    if (sort === "price") return a.price - b.price;
    if (sort === "name") return a.name.localeCompare(b.name);
    return a.id - b.id;
  });

  return (
    <section>
      <h2>상품 목록</h2>
      <div>
        정렬 :
        <button onClick={() => setSearchParams({})}>기본</button>
        <button onClick={() => setSearchParams({ sort: "price" })}>가격 낮은 순</button>
        <button onClick={() => setSearchParams({ sort: "name" })}>이름 순</button>
        <span style={{ color: "gray" }}> (현재 : {sort})</span>
      </div>
      <ul>
        {sorted.map((p) => (
          <li key={p.id}>
            {/* [순서04] 동적 주소로 이동 */}
            <Link to={`/products/${p.id}`}>{p.name}</Link> - {p.price.toLocaleString()}원
          </li>
        ))}
      </ul>
    </section>
  );
}
