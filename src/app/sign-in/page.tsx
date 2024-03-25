"use client";
import { Spinner } from "@/components/Spinner";
import { useSignInWithCredentials } from "@/hooks/useSignInWithCredentials";
import { useSignWithProvider } from "@/hooks/useSignWithProvider";
import { checkIfProviderIsLoading } from "@/utils/checkIfProviderIsLoading";
import Link from "next/link";
import { FaGoogle as GoogleIcon } from "react-icons/fa";
import { SiGithub as GithubIcon } from "react-icons/si";

export default function SignIn() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    signInWithCredentials,
    invalidCredentials,
    isCredentialsLoading,
  } = useSignInWithCredentials();

  const { loggingState, signWithProvider } = useSignWithProvider();

  const isGoogleLoading = checkIfProviderIsLoading(loggingState, "google");
  const isGithubLoading = checkIfProviderIsLoading(loggingState, "github");

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-center mt-8">Sign in</h1>

      <div className="flex gap-2 justify-center">
        <button className="bg-blue-200 p-4 rounded">
          {isGoogleLoading ? <Spinner /> : <GoogleIcon />}
        </button>

        <button
          className="bg-blue-200 p-4 rounded"
          onClick={() => signWithProvider("github")}
        >
          {isGithubLoading ? <Spinner /> : <GithubIcon />}
        </button>
      </div>

      <form
        className="flex flex-col gap-4 w-[70%] mx-auto"
        onSubmit={signInWithCredentials}
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
          {isCredentialsLoading ? <Spinner /> : "sign in"}
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
