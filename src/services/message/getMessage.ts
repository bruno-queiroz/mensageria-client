import { socket } from "@/app/layout";
import { ServerResponse } from "../types";
import { MessageUser, PrivateMessage } from "./types";

export type GetMessage = {
  user: MessageUser;
  messages: PrivateMessage[];
  isRowModified: boolean;
};

export interface GetMessageParams {
  date: string | undefined;
  to: string;
  mode: string;
}

export const getMessage = async ({ date, mode, to }: GetMessageParams) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/message?toUser=${to}&date=${date}&mode=${mode}`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  const data: ServerResponse<GetMessage> = await response.json();
  if (data?.isOk) {
    if (data.data?.isRowModified) {
      socket?.emit("private-message-seen", {
        to: data?.data?.user.id,
      });
    }
  }
  data?.data?.messages.reverse();
  return data;
};
