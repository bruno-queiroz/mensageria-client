import { ServerResponse } from "../types";

interface User {
  id: string;
  name: string;
  image: string;
}

export const getFriends = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/friend`,
    {
      credentials: "include",
    }
  );
  const data: ServerResponse<User[]> = await response.json();
  return data;
};
