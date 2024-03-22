"use client";
import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion, signIn } from "next-auth/react";
import { useState } from "react";

export interface LoggingState {
  isLoading: boolean;
  provider: LiteralUnion<BuiltInProviderType>;
}

export const useSignWithProvider = () => {
  const [loggingState, setLoggingState] = useState<LoggingState>({
    isLoading: false,
    provider: "",
  });

  const signWithProvider = async (
    provider: LiteralUnion<BuiltInProviderType>
  ) => {
    setLoggingState({ isLoading: true, provider });
    await signIn(provider, { callbackUrl: "/chat" });
    setLoggingState({ isLoading: false, provider });
  };

  return {
    signWithProvider,
    loggingState,
  };
};
