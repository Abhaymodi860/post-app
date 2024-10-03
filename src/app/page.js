"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NavBar from "./components/navbar/page";
import { useSearchParams } from "next/navigation";
import Head from "next/head";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const postsPerPage = 10;

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const totalPosts = res.headers.get("x-total-count");
        setTotalPages(Math.ceil(totalPosts / postsPerPage));

        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log("Error fetching posts: ", err);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [page]);

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
        <title>Blog Posts - Page {page}</title>
        <meta name="description" content={`Blogs posts page ${page}`} />
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

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          {/* Previous Page Button */}
          {page > 1 && (
            <Link href={`/?page=${page - 1}`}>
              <a className="px-4 py-2 mx-1 bg-blue-500 text-white rounded">
                Previous
              </a>
            </Link>
          )}

          {/* Page Number Display */}
          <span className="px-4 py-2 mx-1 bg-green-500 rounded">
            Page {page} of {totalPages + 1}
          </span>

          {/* Next Page Button */}
          {page < totalPages && (
            <Link href={`/?page=${page + 1}`}>
              <a className="px-4 py-2 mx-1 bg-blue-500 text-white rounded">
                Next
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
