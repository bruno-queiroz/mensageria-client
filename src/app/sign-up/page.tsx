"use client";
import { Spinner } from "@/components/Spinner";
import { useSignUpWithCredentials } from "@/hooks/useSignUpWithCredentials";
import { useSignWithProvider } from "@/hooks/useSignWithProvider";
import { checkIfProviderIsLoading } from "@/utils/checkIfProviderIsLoading";
import Link from "next/link";
import { FaGoogle as GoogleIcon } from "react-icons/fa";
import { SiGithub as GithubIcon } from "react-icons/si";

export default function SignUp() {
  const {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    signUpWithCredentials,
    isCredentialsLoading,
    invalidCredentials,
  } = useSignUpWithCredentials();

  const { loggingState, signWithProvider } = useSignWithProvider();

  const isGoogleLoading = checkIfProviderIsLoading(loggingState, "google");
  const isGithubLoading = checkIfProviderIsLoading(loggingState, "github");

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-center mt-8">Sign up</h1>

      <div className="flex gap-2 justify-center">
        <button className="bg-blue-200 p-4 rounded">
          {isGoogleLoading ? <Spinner w={16} h={16} /> : <GoogleIcon />}
        </button>

        <button
          className="bg-blue-200 p-4 rounded"
          onClick={() => signWithProvider("github")}
        >
          {isGithubLoading ? <Spinner w={16} h={16} /> : <GithubIcon />}
        </button>
      </div>

      <form
        className="flex flex-col gap-4 w-[70%] mx-auto"
        onSubmit={signUpWithCredentials}
      >
        <input
          type="text"
          placeholder="Name"
          onInput={(e) => setName(e.currentTarget.value)}
          value={name}
          className="p-2 bg-gray-200"
          required
        />
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
          className="bg-blue-200 w-[80px] mx-auto py-2 px-3 rounded my-2"
        >
          {isCredentialsLoading ? <Spinner w={20} h={20} /> : "sign up"}
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
