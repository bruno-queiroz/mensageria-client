import { ServerResponse } from "../types";

export interface GetFriendshipRequest {
  name: string;
  image: string;
  fromUser: string;
  sentAt: Date;
}

export const getFriendshipRequest = async (authCookie: string | undefined) => {
  if (!authCookie) return null;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/friendship-request`,
    {
      credentials: "include",
      headers: {
        Cookie: authCookie,
        Origin: process.env.NEXT_PUBLIC_DEPLOY_URL!,
      },
      next: {
        tags: ["getFriendshipRequest"],
      },
      cache: "no-cache",
    }
  );
  const data: ServerResponse<GetFriendshipRequest[]> = await response.json();
  return data;
};
