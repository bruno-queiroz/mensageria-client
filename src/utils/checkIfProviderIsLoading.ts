import { LoggingState } from "@/hooks/useSignWithProvider";
import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion } from "next-auth/react";

export const checkIfProviderIsLoading = (
  loggingState: LoggingState,
  provider: LiteralUnion<BuiltInProviderType>
) => {
  return loggingState.isLoading && loggingState.provider === provider;
};
