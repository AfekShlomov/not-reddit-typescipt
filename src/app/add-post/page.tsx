"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { resetStates } from "../../lib/utils";
import { addData } from "../../lib/actions";
import { Post, User } from "../../lib/models";

const inputStyle = " rounded bg-amber-50 w-full text-black p-0.5 pl-1 pr-1";
const labelStyle = "text-orange-200 pr-4 block mb-1";

export default function AddPost() {
  const [error, setError] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser: User = JSON.parse(localStorage.getItem("user")!);
    if (!storedUser) {
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError([]);
    setIsProcessing(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const title = formData.get("title")!.toString();
    const content = formData.get("content")!.toString();
    const author = JSON.parse(localStorage.getItem("user")!).name.toString();
    const newPost = {
      title,
      content,
      author,
    };

    try {
      const result = await addData(newPost as Post, "post");
      if (result.status) {
        resetStates([], setError, setIsProcessing);
        router.push("/home");
      }
    } catch (error) {
      resetStates(
        ["Server error, try again later."],
        setError,
        setIsProcessing
      );
      return;
    }
  };

  return (
    <main className="flex flex-col items-center justify-center pt-20 ">
      <div className="flex flex-col items-center justify-center pb-10">
        <h1 className="text-3xl font-semibold text-center text-orange-700 dark:text-orange-500 ">
          Add a new post
        </h1>
      </div>

      <form className="flex flex-col w-96" onSubmit={handleSubmit}>
        <label htmlFor="title" className={labelStyle}>
          Title:
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className={inputStyle}
          required
        />

        <label htmlFor="content" className={labelStyle}>
          Content:
        </label>
        <textarea
          name="content"
          id="content"
          className={inputStyle}
          required
        ></textarea>
        {error.length > 0 && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
        <div className="flex flex-col items-center justify-center mt-4">
          <button
            type="submit"
            className="w-40 px-4 py-2 mt-4 text-white hover:bg-orange-700 rounded bg-orange-800"
            disabled={isProcessing}
          >
            {isProcessing ? "Adding..." : "Add Post"}
          </button>
          <Link
            className={`pl-4 text-blue-400 hover:text-blue-300 ${
              isProcessing ? "pointer-events-none" : ""
            }`}
            href="/home"
          >
            return to home
          </Link>
        </div>
      </form>
    </main>
  );
}
