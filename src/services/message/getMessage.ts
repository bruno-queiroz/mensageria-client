import { getAuthCookie } from "@/utils/getAuthCookie";
import { ServerResponse } from "../types";
import { MessageUser, PrivateMessage } from "./types";

export type GetMessage = { user: MessageUser; messages: PrivateMessage[] };

export const getMessage = async (to: string | undefined) => {
  const authCookie = getAuthCookie();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/message?toUser=${to}`,
    {
      credentials: "include",
      headers: {
        Cookie: authCookie,
        Origin: process.env.NEXT_PUBLIC_DEPLOY_URL!,
      },
      next: {
        tags: ["getMessage"],
      },
      cache: "no-cache",
    }
  );
  const data: ServerResponse<GetMessage> = await response.json();
  data?.data?.messages.reverse();
  return data;
};
