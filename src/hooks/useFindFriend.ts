import { findFriend } from "@/services/user/findFriend";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

export const useFindFriend = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync, data: users } = useMutation({
    mutationFn: (query: string) => findFriend(query),
    mutationKey: ["findFriend"],
  });

  const handleFindFriend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query === "") return;

    setIsLoading(true);
    await mutateAsync(query);
    setIsLoading(false);
  };

  return {
    query,
    setQuery,
    handleFindFriend,
    isLoading,
    users,
  };
};
