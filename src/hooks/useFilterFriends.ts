import { MessageUser } from "@/services/message/types";
import { ServerResponse } from "@/services/types";
import { FormEvent, useEffect, useState } from "react";

interface UseFilterFriends {
  isRefetching: boolean;
  isSuccess: boolean;
  friends: ServerResponse<MessageUser[]> | undefined;
}

export const useFilterFriends = ({
  friends,
  isRefetching,
  isSuccess,
}: UseFilterFriends) => {
  const [friendsFiltered, setFriendsFiltered] = useState<
    MessageUser[] | undefined
  >(friends?.data);

  useEffect(() => {
    setFriendsFiltered(friends?.data);
  }, [isSuccess, isRefetching]);

  const filter = (e: FormEvent<HTMLFormElement>, name: string) => {
    e.preventDefault();
    if (!friends) return;
    if (name === "") {
      setFriendsFiltered(friends?.data);
      return;
    }

    const filtered = friends?.data?.filter((user) =>
      user.name.startsWith(name)
    );

    setFriendsFiltered(filtered!);
  };

  return {
    friendsFiltered,
    filter,
  };
};
