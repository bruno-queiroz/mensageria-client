"use client";
import { PrivateMessage } from "@/services/message/types";
import { getMyId } from "@/utils/getMyId";
import { format } from "date-fns";

import { FaCheck as SentIcon } from "react-icons/fa";
import { FaCheckDouble as SeenIcon } from "react-icons/fa6";

const Test = ({ isSeen }: { isSeen: boolean }) => {
  if (isSeen) {
    return <SeenIcon className="text-blue-500" />;
  }

  return <SentIcon />;
};

export default function Message({
  message,
  fromUser,
  isSeen,
  sentAt,
  toUser,
}: PrivateMessage) {
  const isMyMessage = fromUser === getMyId();
  return (
    <div
      className={`flex gap-2 bg-gray-200 rounded relative p-2 pr-[60px] h-[40px] w-[max-content] ${
        isMyMessage ? "ml-auto" : ""
      }`}
    >
      <span className="my-auto">{message}</span>
      <div className="flex justify-content gap-1 mt-auto absolute right-1 bottom-1">
        <span className="text-xs">{format(sentAt, "H:mm")}</span>
        {isMyMessage && (
          <span className="text-xs">
            <Test isSeen={isSeen} />
          </span>
        )}
      </div>
    </div>
  );
}
