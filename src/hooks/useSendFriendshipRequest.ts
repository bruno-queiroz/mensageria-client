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
    isAccept: boolean | undefined,
    getMyId: () => string
  ) => {
    if (isAccept === false) return;
    const request = {
      fromUser: getMyId(),
      toUser: friendId,
    };
    mutate(request);
  };

  return {
    isError,
    isPending,
    handleFriendshipRequest,
  };
};
