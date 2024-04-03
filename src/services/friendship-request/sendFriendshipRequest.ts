import { ServerResponse, User } from "../types";

export interface SendFriendshipRequest {
  fromUser: string;
  toUser: string;
}

export const sendFriendshipRequest = async (request: SendFriendshipRequest) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/friendship-request`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
      credentials: "include",
    }
  );
  const data: ServerResponse<User[]> = await response.json();

  return data;
};
