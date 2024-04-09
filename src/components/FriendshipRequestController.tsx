"use client";
import { FaCheck as AcceptIcon } from "react-icons/fa6";
import { IoMdClose as RejectIcon } from "react-icons/io";

import { Spinner } from "./Spinner";

import { useAcceptFriendshipRequest } from "@/hooks/useAcceptFriendshipRequest";
import { useRejectFriendshipRequest } from "@/hooks/useRejectFriendshipRequest";

import { getMyId } from "@/utils/getMyId";

export const FriendshipRequestController = ({
  fromUser,
}: {
  fromUser: string;
}) => {
  const {
    handleAcceptFriendshipRequest,
    isPending: isAcceptPending,
    isError: acceptIsError,
  } = useAcceptFriendshipRequest();

  const {
    handleRejectFriendshipRequest,
    isPending: isRejectPending,
    isError: rejectIsError,
  } = useRejectFriendshipRequest();

  return (
    <div className="flex gap-2 ml-auto">
      <button
        onClick={() => handleAcceptFriendshipRequest(fromUser, getMyId)}
        disabled={isRejectPending}
        className="ml-auto bg-blue-200 p-2 text-green-500 rounded"
      >
        {isAcceptPending ? <Spinner wh={16} /> : <AcceptIcon />}
      </button>
      <button
        onClick={() => handleRejectFriendshipRequest(fromUser, getMyId)}
        disabled={isAcceptPending}
        className="ml-auto bg-blue-200 p-2 text-red-500 rounded"
      >
        {isRejectPending ? <Spinner wh={16} /> : <RejectIcon />}
      </button>
    </div>
  );
};
