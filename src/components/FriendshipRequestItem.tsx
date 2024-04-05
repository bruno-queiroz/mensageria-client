"use client";
import { GetFriendshipRequest } from "@/services/friendship-request/getFriendshipRequest";
import { FaCheck as AcceptIcon } from "react-icons/fa6";
import { IoMdClose as RejectIcon } from "react-icons/io";
import { Spinner } from "./Spinner";
import { useAcceptFriendshipRequest } from "@/hooks/useAcceptFriendshipRequest";

export const FriendshipRequestItem = ({
  fromUser,
  image,
  name,
  sentAt,
}: GetFriendshipRequest) => {
  const {
    handleAcceptFriendshipRequest,
    isPending: acceptIsPending,
    isError,
  } = useAcceptFriendshipRequest();
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
      <div className="flex gap-2 ml-auto">
        <button
          onClick={() => handleAcceptFriendshipRequest(fromUser)}
          className="ml-auto bg-blue-200 p-2 text-green-500 rounded"
        >
          {acceptIsPending ? <Spinner wh={16} /> : <AcceptIcon />}
        </button>
        <button
          disabled={acceptIsPending}
          className="ml-auto bg-blue-200 p-2 text-red-500 rounded"
        >
          {false ? <Spinner wh={16} /> : <RejectIcon />}
        </button>
      </div>
    </div>
  );
};