"use client";
import { signUpUser } from "@/services/user/signUp";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { FaGoogle as GoogleIcon } from "react-icons/fa";
import { SiGithub as GithubIcon } from "react-icons/si";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
    };

    await signUpUser(newUser);
  };

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-center mt-8">Sign up</h1>

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
          type="text"
          placeholder="Name"
          onInput={(e) => setName(e.currentTarget.value)}
          value={name}
          className="p-2 bg-gray-200"
        />
        <input
          type="email"
          placeholder="Email"
          onInput={(e) => setEmail(e.currentTarget.value)}
          value={email}
          className="p-2 bg-gray-200"
        />
        <input
          type="password"
          placeholder="Password"
          onInput={(e) => setPassword(e.currentTarget.value)}
          value={password}
          className="p-2 bg-gray-200"
        />

        <button
          type="submit"
          className="bg-blue-200 w-[max-content] mx-auto py-2 px-3 rounded my-2"
        >
          sign up
        </button>

        <span className="text-center">
          Already have an account?{" "}
          <Link href={"/sign-in"} className="text-blue-400">
            sign in
          </Link>
        </span>
      </form>
    </section>
  );
}
