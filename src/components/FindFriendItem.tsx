import { UserWithFriendshipRequest } from "@/services/types";

export const FindFriendItem = ({
  name,
  image,
  id,
  isAccept,
}: UserWithFriendshipRequest) => {
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
    </div>
  );
};
