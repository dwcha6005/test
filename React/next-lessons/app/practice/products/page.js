import ProductSearch from "@/components/ProductSearch";

// < 문제 1, 3 ① >
export const metadata = {
  title: "상품 목록 | ch13 실습",
};

export default async function ProductsPage() {
  const res = await fetch("https://dummyjson.com/products?limit=12&select=title,price,category");
  const data = await res.json();

  return (
    <main>
      <h1>상품 목록</h1>
      {/* 서버에서 가져온 데이터를 클라이언트 컴포넌트에 props로 넘긴다 */}
      <ProductSearch products={data.products} />
    </main>
  );
}
