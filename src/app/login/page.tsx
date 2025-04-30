"use client";

import Link from "next/link";
import { checkUserExists } from "../../lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { resetStates } from "../../lib/utils";
import { User } from "../../lib/models";

const inputStyle = "rounded bg-amber-50 w-full text-black p-0.5 pl-1 pr-1";
const labelStyle = "text-orange-200 pr-4 block mb-1";

export default function Login() {
  const [error, setError] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError([]);
    setIsProcessing(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const loggedUser: User = {
      name: null,
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };

    try {
      const response = await checkUserExists(loggedUser, "login");
      // true - user exists login, false - email/pass incorrect, null - user does not exist

      if (response === null) {
        resetStates(["User does not exist."], setError, setIsProcessing);
        return;
      } else if (response.status === false) {
        resetStates(["Email or password incorrect"], setError, setIsProcessing);
        return;
      } else if (response.status === true) {
        resetStates([], setError, setIsProcessing);
        localStorage.setItem("user", JSON.stringify(response.user));
        router.push("/home");
        return;
      }
    } catch (error) {
      console.log("Error checking user:", error);
      resetStates(
        ["Server error occurred, try again later."],
        setError,
        setIsProcessing
      );
      return;
    }
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center pt-15">
        <h1 className="text-3xl font-semibold text-center text-orange-700 dark:text-orange-700">
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center p-5 pl-10 pr-10 mt-10 bg-orange-950 rounded-lg shadow-md w-full max-w-md"
        >
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
          {error.length > 0 && (
            <>
              <p className="text-red-500 text-sm mb-2">{error}</p>
            </>
          )}
          <p>
            <button
              type="submit"
              className="px-4 py-2 mt-4 text-white bg-orange-700 rounded hover:bg-orange-800"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Login"}
            </button>
            <Link
              href="/signup"
              className={`pl-4 text-blue-400 hover:text-blue-300 ${
                isProcessing ? "pointer-events-none" : ""
              }`}
            >
              Signup
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}
