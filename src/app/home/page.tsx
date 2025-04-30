"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchAllData } from "../../lib/actions";
import Link from "next/link";
import AllPosts from "../../components/AllPosts";
import { Post, User } from "@/lib/models";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [postsArray, setPostsArray] = useState<Post[]>([]);

  useEffect(() => {
    const storedUser = (localStorage.getItem("user"));

    if (!storedUser) {
      router.push("/login");
    }
     
    setUser(JSON.parse(storedUser!) as User);
  }, [setUser, router]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await fetchAllData("post") as Post[];
        setPostsArray(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, [fetchAllData, setPostsArray]);

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  }

  console.log("posts:", postsArray);

  return (
    <>
      <header className="w-full relative bg-amber-900 h-20 flex items-center">
        <button
          onClick={handleLogout}
          className="absolute left-5 flex items-center z-10"
        >
          <img src="/11209998.png" className="w-5 m-2" alt="Logout Icon" />
          <Link href="/" className="text-xl font-medium">
            Logout
          </Link>
        </button>

        <h1 className="absolute inset-x-0 text-4xl text-white font-semibold text-center">
          Not-Reddit
        </h1>

        <div className="absolute right-5 flex items-center">
          <Link
            href="/add-post"
            className="w-26 mr-4 rounded bg-amber-700 hover:bg-amber-800 px-3 py-1"
          >
            + Add Post
          </Link>
          <h1 className="text-xl font-medium">{user?.name || "Guest"}</h1>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center pt-5">
        <AllPosts posts={postsArray} />
      </main>
    </>
  );
}
