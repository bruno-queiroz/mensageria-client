import { ServerResponse, User } from "../types";

interface SignUpUser {
  name: string;
  email: string;
  password: string;
}

export const signUpUser = async (user: SignUpUser) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/sign-up`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    }
  );
  const data: ServerResponse<User> = await response.json();
  return data;
};
