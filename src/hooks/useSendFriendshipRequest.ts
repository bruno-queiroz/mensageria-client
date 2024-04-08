"use client";

import { sendFriendshipRequest } from "@/services/friendship-request/sendFriendshipRequest";
import { FriendshipRequest } from "@/services/friendship-request/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useSendFriendshipRequest = () => {
  const [wasClicked, setWasClicked] = useState(false);

  const { mutate, isError, isPending } = useMutation({
    mutationFn: (req: Pick<FriendshipRequest, "toUser" | "fromUser">) =>
      sendFriendshipRequest(req),
    mutationKey: ["sendFriendshipRequest"],
    onError: () => setWasClicked(false),
  });

  const handleFriendshipRequest = async (
    friendId: string,
    isAccept: boolean | undefined,
    getMyId: () => string
  ) => {
    if (isAccept === false) return;
    setWasClicked(true);
    const request = {
      fromUser: getMyId(),
      toUser: friendId,
    };
    mutate(request);
  };

  return {
    isError,
    isPending,
    wasClicked,
    handleFriendshipRequest,
  };
};
