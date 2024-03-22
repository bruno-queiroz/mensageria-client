import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpUser } from "@/services/user/signUp";

export const useSignUpWithCredentials = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [isCredentialsLoading, setIsCredentialsLoading] = useState(false);

  const router = useRouter();

  const signUpWithCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };

    setIsCredentialsLoading(true);
    const response = await signUpUser(newUser);
    setIsCredentialsLoading(false);

    if (response.isOk) {
      return router.push("/chat");
    }

    setInvalidCredentials(true);
  };

  return {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    signUpWithCredentials,
    invalidCredentials,
    isCredentialsLoading,
  };
};
