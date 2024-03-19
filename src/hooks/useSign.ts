"use client";
import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoggingState {
  isLoading: boolean;
  provider: LiteralUnion<BuiltInProviderType>;
}

export const useSign = (action: "up" | "in") => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [loggingState, setLoggingState] = useState<LoggingState>({
    isLoading: false,
    provider: "",
  });

  const router = useRouter();

  const submitUser = async (
    provider: LiteralUnion<BuiltInProviderType>,
    e?: React.FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();
    let options = {};

    if (provider === "credentials") {
      options = {
        name: name,
        email: email,
        password: password,
        redirect: false,
        action,
      };
    } else {
      options = {
        callbackUrl: "/chat",
      };
    }

    setLoggingState({ isLoading: true, provider });

    const response = await signIn(provider, options);

    setLoggingState({ isLoading: false, provider });

    if (response?.ok && provider === "credentials") {
      router.push("/chat");
      return;
    }

    if (!response?.ok) setInvalidCredentials(true);
  };

  return {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    submitUser,
    invalidCredentials,
    loggingState,
  };
};
