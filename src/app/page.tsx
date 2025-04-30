'use client';

import Link from "next/link";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between pt-20 ">
      <div className="flex flex-col items-center justify-center pb-15">
        <h1 className="text-3xl font-semibold text-center text-orange-700 dark:text-orange-500 ">
          Welcome to <p className="text-5xl text-orange-800 ">Not-Reddit!</p>
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex m-1.5 bg-amber-900 hover:bg-amber-700 rounded pt-1.5 pb-2 pr-6 pl-6">
          <Link href="/login" className="flex text-xl text rounded-lg">
            login
          </Link>
        </div>

        <p>
          Don't have an account? {" "}
          <Link href="/signup" className="text-blue-400 hover:text-blue-300">Sign up</Link>
        </p>
      </div>
    </main>
  );
}
