import { revalidateTagByServerAction } from "@/app/actions";
import { acceptFriendshipRequest } from "@/services/friendship-request/acceptFriendshipRequest";
import { FriendshipRequest } from "@/services/friendship-request/types";
import { useMutation } from "@tanstack/react-query";

export const useAcceptFriendshipRequest = () => {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: (req: Pick<FriendshipRequest, "toUser" | "fromUser">) =>
      acceptFriendshipRequest(req),
    mutationKey: ["acceptFriendshipRequest"],
    onSuccess: async () =>
      await revalidateTagByServerAction("getFriendshipRequest"),
  });

  const handleAcceptFriendshipRequest = async (
    friendId: string,
    getMyId: () => string
  ) => {
    const request = {
      fromUser: friendId,
      toUser: getMyId(),
    };
    mutate(request);
  };

  return {
    handleAcceptFriendshipRequest,
    isPending,
    isError,
  };
};
