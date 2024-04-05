import { ServerResponse } from "../types";
import { FriendshipRequest } from "./types";

export const acceptFriendshipRequest = async (
  request: Pick<FriendshipRequest, "toUser" | "fromUser">
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/friendship-request/accept`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
      credentials: "include",
    }
  );
  const data: ServerResponse<any> = await response.json();

  return data;
};
