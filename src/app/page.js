"use client";

import { Suspense } from "react";
import PostList from "./pages/postList/page";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<p>Loading posts...</p>}>
        <PostList />
      </Suspense>
    </div>
  );
}
