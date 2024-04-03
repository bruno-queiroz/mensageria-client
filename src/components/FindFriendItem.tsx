"use client";
import { UserWithFriendshipRequest } from "@/services/types";
import { Spinner } from "./Spinner";
import { useSendFriendshipRequest } from "@/hooks/useSendFriendshipRequest";

import { IoMdPersonAdd as AddFriendIcon } from "react-icons/io";
import { FaClock as ClockIcon } from "react-icons/fa";

export const FindFriendItem = ({
  name,
  image,
  id,
  isAccept,
}: UserWithFriendshipRequest) => {
  const { isError, isPending, handleFriendshipRequest } =
    useSendFriendshipRequest();

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

      <button
        className="ml-auto bg-blue-200 p-2"
        onClick={() => handleFriendshipRequest(id, isAccept)}
      >
        {isAccept === false && <ClockIcon />}

        {isPending && <Spinner wh={16} />}

        {!isPending && isAccept !== false && <AddFriendIcon />}
      </button>
    </div>
  );
};
