"use client";
import { useSendFriendshipRequest } from "@/hooks/useSendFriendshipRequest";

import { IoMdPersonAdd as AddFriendIcon } from "react-icons/io";
import { FaClock as ClockIcon } from "react-icons/fa";

import { Spinner } from "./Spinner";

interface SendFriendshipRequestProps {
  id: string;
  isAccept: boolean;
}

export const SendFriendshipRequest = ({
  id,
  isAccept,
}: SendFriendshipRequestProps) => {
  const { isError, isPending, handleFriendshipRequest } =
    useSendFriendshipRequest();

  return (
    <button
      className="ml-auto bg-blue-200 p-2"
      onClick={() => handleFriendshipRequest(id, isAccept)}
    >
      {isAccept === false && <ClockIcon />}

      {isPending && <Spinner wh={16} />}

      {!isPending && isAccept !== false && <AddFriendIcon />}
    </button>
  );
};
