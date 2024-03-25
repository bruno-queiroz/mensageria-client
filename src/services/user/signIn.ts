interface SignInUser {
  email: string;
  password: string;
}

export const signInUser = async (user: SignInUser) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/sign-in`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
};
