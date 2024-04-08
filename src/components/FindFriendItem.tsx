import { UserWithFriendshipRequest } from "@/services/types";
import { ReactNode } from "react";

type FindFriendItemProps = UserWithFriendshipRequest & { children: ReactNode };

export const FindFriendItem = ({
  name,
  image,
  children,
}: FindFriendItemProps) => {
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
      {children}
    </div>
  );
};
