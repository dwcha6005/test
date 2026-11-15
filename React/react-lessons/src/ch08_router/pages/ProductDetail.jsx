import { useNavigate, useParams } from "react-router";
import { products } from "../data.js";

/*
  [순서04] 동적 라우트 - useParams
  [순서05] 코드로 이동하기 - useNavigate

  <Route path="/products/:id" element={<ProductDetail />} />
  - :id 부분에 어떤 값이 와도 이 페이지가 표시된다. (/products/1, /products/3 ...)
  - useParams()로 주소의 값을 꺼낸다. → { id: "3" }
  - 주의 : 주소에서 꺼낸 값은 항상 "문자열"이다. 숫자 id와 비교하려면 Number()

  const navigate = useNavigate();
  navigate("/products")   → 해당 주소로 이동
  navigate(-1)            → 뒤로 가기 (브라우저 뒤로 버튼과 같음)
  → 버튼 클릭, 로그인 성공, 글 저장 후처럼 "코드에서" 이동할 때 사용한다.
*/
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <section>
        <h2>상품을 찾을 수 없습니다. (id : {id})</h2>
        <button onClick={() => navigate("/products")}>목록으로</button>
      </section>
    );
  }

  const handleBuy = () => {
    alert(`${product.name} 구매 완료!`);
    navigate("/", { replace: true }); // replace : 뒤로 가기로 이 페이지에 돌아오지 않게
  };

  return (
    <section>
      <h2>{product.name}</h2>
      <p>분류 : {product.category}</p>
      <p>{product.desc}</p>
      <p>가격 : {product.price.toLocaleString()}원</p>
      <button onClick={() => navigate(-1)}>뒤로</button>
      <button onClick={handleBuy}>구매하기</button>
    </section>
  );
}
