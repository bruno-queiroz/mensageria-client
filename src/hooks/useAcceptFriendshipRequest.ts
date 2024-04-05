import { acceptFriendshipRequest } from "@/services/friendship-request/acceptFriendshipRequest";
import { FriendshipRequest } from "@/services/friendship-request/types";
import { useMutation } from "@tanstack/react-query";
import { revalidateTag } from "next/cache";

export const useAcceptFriendshipRequest = () => {
  const { mutateAsync, isError, isPending } = useMutation({
    mutationFn: (req: Pick<FriendshipRequest, "toUser" | "fromUser">) =>
      acceptFriendshipRequest(req),
    mutationKey: ["acceptFriendshipRequest"],
  });

  const handleAcceptFriendshipRequest = async (friendId: string) => {
    const [_, myId] = document.cookie.split("=");
    const request = {
      fromUser: friendId,
      toUser: myId,
    };
    const response = await mutateAsync(request);
    if (response.isOk) {
      revalidateTag("getFriendshipRequest");
    }
  };

  return {
    handleAcceptFriendshipRequest,
    isPending,
    isError,
  };
};
