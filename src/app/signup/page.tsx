"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addData } from "../../lib/actions";
import { resetStates, authSignup } from "../../lib/utils";
import { User } from "../../lib/models";

const inputStyle = " rounded bg-amber-50 w-full text-black p-0.5 pl-1 pr-1";
const labelStyle = "text-orange-200 pr-4 block mb-1";

export default function SignUp() {
  const [error, setError] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError([]);
    setIsProcessing(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("name")!.toString();
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const newUser: User = {
      name: name,
      email: email,
      password: password,
    };

    const confirmPassword = formData.get("confirmPassword")!.toString();
    let errorArray = authSignup(newUser, confirmPassword);
    if (errorArray.length > 0) {
      setError(errorArray);
      return;
    }

    try {
      const response = await addData(newUser, "user");

      if (response.status === true) {
        resetStates([], setError, setIsProcessing);
        localStorage.setItem("user", JSON.stringify(newUser));
        router.push("/home");
      }
    } catch (error) {
      errorArray.push("Failed to create user.");
      resetStates(errorArray, setError, setIsProcessing);
      return;
    }
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center pt-15">
        <h1 className="text-3xl font-semibold text-center text-orange-700 dark:text-orange-700 ">
          Sign up
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center p-5 pr-14 pl-14 mt-10 bg-orange-950 rounded-lg shadow-md w-full max-w-md"
        >
          <div className="w-full mb-4">
            <label htmlFor="name" className={labelStyle}>
              Username
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className={inputStyle}
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="email" className={labelStyle}>
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className={inputStyle}
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="password" className={labelStyle}>
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              className={inputStyle}
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="confirmPassword" className={labelStyle}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              required
              className={inputStyle}
            />
          </div>
          {error.length > 0 && (
            <>
              {error.map((error: string) => {
                return (
                  <p key={error} className="text-red-500 text-sm mb-2">
                    {error}
                  </p>
                );
              })}
            </>
          )}

          <p>
            <button
              type="submit"
              className="px-4 py-2 mt-4 text-white bg-orange-700 rounded hover:bg-orange-800"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Sign Up"}
            </button>
            <Link
              href="/login"
              className={`pl-4 text-blue-400 hover:text-blue-300 ${
                isProcessing ? "pointer-events-none" : ""
              }`}
            >
              Login
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}
