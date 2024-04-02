import { User } from "@/services/types";
import { IoMdPersonAdd as AddFriendIcon } from "react-icons/io";

export const FindFriendItem = ({ name, image }: User) => {
  return (
    <div className="flex w-full gap-4 items-center bg-blue-100 p-3 rounded">
      <div className="w-[70px] h-[70px]">
        <img
          src={image}
          alt="user image"
          className="rounded-full object-cover"
        />
      </div>

      <span className="font-semibold">{name}</span>

      <button className="ml-auto bg-blue-200 p-2">
        <AddFriendIcon />
      </button>
    </div>
  );
};
