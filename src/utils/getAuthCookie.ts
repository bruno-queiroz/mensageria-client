import { cookies } from "next/headers";

export const getAuthCookie = () => {
  const authCookie = cookies().get("next-auth.session-token");
  return `${authCookie?.name}=${authCookie?.value}`;
};
