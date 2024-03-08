import Link from "next/link";
import { FaGoogle as GoogleIcon } from "react-icons/fa";
import { SiGithub as GithubIcon } from "react-icons/si";

export default function SignIn() {
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

      <form className="flex flex-col gap-4 w-[70%] mx-auto">
        <input type="email" placeholder="Email" className="p-2 bg-gray-200" />
        <input
          type="password"
          placeholder="Password"
          className="p-2 bg-gray-200"
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
