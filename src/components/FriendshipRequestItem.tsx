import { GetFriendshipRequest } from "@/services/friendship-request/getFriendshipRequest";
import { ReactNode } from "react";

type FriendshipRequestItemProps = GetFriendshipRequest & {
  children: ReactNode;
};

export const FriendshipRequestItem = ({
  image,
  name,
  sentAt,
  children,
}: FriendshipRequestItemProps) => {
  return (
    <div className="flex relative w-full gap-4 items-center bg-blue-100 p-3 rounded-lg">
      <div className="w-[70px] h-[70px]">
        <img
          src={image}
          alt="user image"
          className="rounded-full w-full h-full object-cover bg-blue-400"
        />
      </div>

      <div className="flex flex-col">
        <span className="font-semibold">{name}</span>
        <span className="right-1 bottom-1 text-sm text-gray-600">aaaaa</span>
      </div>

      {children}
    </div>
  );
};
