"use client";
import { useSendFriendshipRequest } from "@/hooks/useSendFriendshipRequest";

import { IoMdPersonAdd as AddFriendIcon } from "react-icons/io";
import { FaClock as ClockIcon } from "react-icons/fa";

import { Spinner } from "./Spinner";
import { useState } from "react";
import { getMyId } from "@/utils/getMyId";

interface SendFriendshipRequestProps {
  id: string;
  isAccept: boolean | undefined;
}

export const SendFriendshipRequest = ({
  id,
  isAccept,
}: SendFriendshipRequestProps) => {
  const { isPending, wasClicked, handleFriendshipRequest } =
    useSendFriendshipRequest();

  return (
    <button
      className="ml-auto bg-blue-200 p-2"
      onClick={() => handleFriendshipRequest(id, isAccept, getMyId)}
    >
      {isAccept === false && <ClockIcon />}

      {wasClicked && !isPending && <ClockIcon />}

      {isPending && <Spinner wh={16} />}

      {!isPending && isAccept !== false && !wasClicked && <AddFriendIcon />}
    </button>
  );
};
