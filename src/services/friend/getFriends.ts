import { MessageUser } from "../message/types";
import { ServerResponse } from "../types";

export const getFriends = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/friend`,
    {
      credentials: "include",
    }
  );

  const data: ServerResponse<MessageUser[]> = await response.json();
  return data;
};
