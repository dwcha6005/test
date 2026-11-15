"use client";

import { useEffect, useState } from "react";

/*
  < 문제 4 ①, ② >

  주의! 클라이언트 컴포넌트도 "첫 HTML"은 서버에서 한 번 만들어진다.
  서버에는 localStorage가 없으므로 컴포넌트 본문이나 useState(초기값)에서 바로 읽으면
  "localStorage is not defined" 에러가 난다. → 브라우저에서만 실행되는 useEffect 안에서 읽는다.
*/
function readLikes() {
  try {
    const saved = JSON.parse(localStorage.getItem("likes"));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function LikeButton({ id }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(readLikes().includes(id));
  }, [id]);

  const toggle = () => {
    const likes = readLikes();
    const next = liked ? likes.filter((likeId) => likeId !== id) : [...likes, id];
    localStorage.setItem("likes", JSON.stringify(next));
    setLiked(!liked);
  };

  return <button onClick={toggle}>{liked ? "♥ 찜 취소" : "♡ 찜하기"}</button>;
}
