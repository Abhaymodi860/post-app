/* eslint-disable @next/next/no-async-client-component */
"use client";

import NavBar from "@/app/components/navbar/page";
import { useRouter } from "next/navigation";
import Head from "next/head";

async function getPost(id) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching post: ", error);
    return null;
  }
}

export default async function PostDetail({ params }) {
  const post = await getPost(params.id);

  if (!post) {
    return (
      <div className="container mx-auto py-6 px-6">
        <h1 className="text-2xl font-bold text-red-500">
          Oops! Something went wrong.
        </h1>
        <p>Could not load the post at this time. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} - Blog</title>
        <meta name="description" content={`Post for ${post.title}`} />
        <meta name="keywords" content="blog, next.js, posts, SEO" />
        <meta name="author" content={`${post.userId}`} />
      </Head>
      <div>
        <NavBar />
        <div className="container mx-auto py-6 px-6">
          <h1 className="text-3xl font-bold my-3">{post.title}</h1>
          <p className="mt-4 mb-3">{post.body}</p>
          <p className="text-gray-500">Author: {post.userId}</p>
        </div>
      </div>
    </>
  );
}
