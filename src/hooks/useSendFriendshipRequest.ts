"use client";

import { sendFriendshipRequest } from "@/services/friendship-request/sendFriendshipRequest";
import { FriendshipRequest } from "@/services/friendship-request/types";
import { useMutation } from "@tanstack/react-query";

export const useSendFriendshipRequest = () => {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: (req: Pick<FriendshipRequest, "toUser" | "fromUser">) =>
      sendFriendshipRequest(req),
    mutationKey: ["sendFriendshipRequest"],
  });

  const handleFriendshipRequest = async (
    friendId: string,
    isAccept: boolean | undefined
  ) => {
    if (isAccept === false) return;
    const [_, userId] = document.cookie.split("=");
    const request = {
      fromUser: friendId,
      toUser: userId,
    };
    mutate(request);
  };

  return {
    isError,
    isPending,
    handleFriendshipRequest,
  };
};
