import { ServerResponse, UserWithFriendshipRequest } from "../types";

export const findFriend = async (query: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/find-friend?q=${query}`,
    {
      credentials: "include",
    }
  );
  const data: ServerResponse<UserWithFriendshipRequest[]> =
    await response.json();
  return data;
};
