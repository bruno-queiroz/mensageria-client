import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInUser } from "@/services/user/signIn";

export const useSignInWithCredentials = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [isCredentialsLoading, setIsCredentialsLoading] = useState(false);

  const router = useRouter();

  const signInWithCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    setIsCredentialsLoading(true);
    const response = await signInUser(user);
    setIsCredentialsLoading(false);

    if (response.isOk) {
      return router.push("/chat");
    }

    setInvalidCredentials(true);
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    signInWithCredentials,
    invalidCredentials,
    isCredentialsLoading,
  };
};
