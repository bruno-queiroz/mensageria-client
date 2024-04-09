import { UserWithFriendshipRequest } from "@/services/types";
import { getMyId } from "@/utils/getMyId";
import { ReactNode } from "react";

type FindFriendItemProps = UserWithFriendshipRequest & {
  SendFriendshipRequest: ReactNode;
  FriendshipRequestController: ReactNode;
};

export const FindFriendItem = ({
  name,
  image,
  toUser,
  SendFriendshipRequest,
  FriendshipRequestController,
}: FindFriendItemProps) => {
  const myId = getMyId();
  return (
    <div className="flex w-full gap-4 items-center bg-blue-100 p-3 rounded-lg">
      <div className="w-[70px] h-[70px]">
        <img
          src={image || ""}
          alt="user image"
          className="rounded-full w-full h-full object-cover bg-blue-400"
        />
      </div>

      <span className="font-semibold">{name}</span>

      {myId === toUser ? FriendshipRequestController : SendFriendshipRequest}
    </div>
  );
};
