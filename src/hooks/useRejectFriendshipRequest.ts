import { revalidateTagByServerAction } from "@/app/actions";
import { rejectFriendshipRequest } from "@/services/friendship-request/rejectFriendshipRequest";
import { FriendshipRequest } from "@/services/friendship-request/types";
import { useMutation } from "@tanstack/react-query";

export const useRejectFriendshipRequest = () => {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: (req: Pick<FriendshipRequest, "toUser" | "fromUser">) =>
      rejectFriendshipRequest(req),
    mutationKey: ["rejectFriendshipRequest"],
    onSuccess: async () =>
      await revalidateTagByServerAction("getFriendshipRequest"),
  });

  const handleRejectFriendshipRequest = async (
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
    handleRejectFriendshipRequest,
    isPending,
    isError,
  };
};
