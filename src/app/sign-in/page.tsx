"use client";

import { signInUser } from "@/services/user/signIn";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { FaGoogle as GoogleIcon } from "react-icons/fa";
import { SiGithub as GithubIcon } from "react-icons/si";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    await signInUser(user);
  };

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-center mt-8">Sign in</h1>

      <div className="flex gap-2 justify-center">
        <button className="bg-blue-200 p-4 rounded">
          <GoogleIcon />
        </button>

        <button className="bg-blue-200 p-4 rounded">
          <GithubIcon />
        </button>
      </div>

      <form
        className="flex flex-col gap-4 w-[70%] mx-auto"
        onSubmit={submitUser}
      >
        <input
          type="email"
          placeholder="Email"
          onInput={(e) => setEmail(e.currentTarget.value)}
          value={email}
          className="p-2 bg-gray-200"
          required
        />
        <input
          type="password"
          placeholder="Password"
          onInput={(e) => setPassword(e.currentTarget.value)}
          value={password}
          className="p-2 bg-gray-200"
          required
        />

        <button
          type="submit"
          className="bg-blue-200 w-[max-content] mx-auto py-2 px-3 rounded my-2"
        >
          sign in
        </button>

        <span className="text-center">
          Don't have an account?{" "}
          <Link href={"/sign-up"} className="text-blue-400">
            sign up
          </Link>
        </span>
      </form>
    </section>
  );
}
