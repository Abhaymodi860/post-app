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
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(0);
  const postsPerPage = 10;

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
        // setPosts(data.slice(0, 15));
        setPosts(data);
      } catch (error) {
        console.log("Error fetching posts: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [currentPage]);

  //console.log(posts);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Increment the current page
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Decrement the current page
    }
  };

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

        {/* Pagination controls */}
        <div className="flex justify-center mt-6">
          {currentPage > 1 && (
            <button
              onClick={handlePreviousPage}
              className="px-4 py-2 mx-1 bg-blue-500 text-white rounded"
            >
              Previous
            </button>
          )}
          <span className="px-4 py-2 mx-1 bg-gray-200 rounded">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <button
              onClick={handleNextPage}
              className="px-4 py-2 mx-1 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
