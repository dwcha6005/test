import Link from "next/link";
import { notFound } from "next/navigation";
import LikeButton from "@/components/LikeButton";

// < 문제 2 >
async function getProduct(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}?select=title,price,category,description`);
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  return { title: product ? `${product.title} | ch13 실습` : "상품 없음" };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <p>
        <Link href="/practice/products">← 목록</Link>
      </p>
      <h1>{product.title}</h1>
      <p>분류 : {product.category}</p>
      <p>{product.description}</p>
      <p>가격 : ${product.price}</p>
      {/* < 문제 4 ① > */}
      <LikeButton id={product.id} />
    </main>
  );
}
