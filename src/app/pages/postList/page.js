"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NavBar from "@/app/components/navbar/page";
import { useSearchParams } from "next/navigation";
import Head from "next/head";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();
        setPosts(data.slice(0, 15));
      } catch (error) {
        console.log("Error fetching posts: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  //console.log(posts);

  if (loading) {
    return <p>Loading.....</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      <Head>
        <title>Blog Posts</title>
        <meta name="description" content="Blogs posts page" />
        <meta name="keywords" content="blog, next.js, posts, SEO" />
      </Head>
      <NavBar />
      <div className="container mx-auto py-6 px-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.body.slice(0, 100)}...</p>
              <Link href={`/post/${post.id}`} className="text-blue-500">
                Read more
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
