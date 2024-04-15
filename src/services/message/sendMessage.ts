import { ServerResponse } from "../types";

interface SendMessageDto {
  toUser: string;
  message: string;
}

export const sendMessage = async (message: SendMessageDto) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/message`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
      credentials: "include",
    }
  );
  const data: ServerResponse<any> = await response.json();

  return data;
};
