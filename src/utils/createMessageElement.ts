import { PrivateMessage } from "@/services/message/types";
import { getMyId } from "./getMyId";

export const createMessageElement = ({ message, fromUser }: PrivateMessage) => {
  const isMyMessage = fromUser === getMyId();
  const messageContainer = document.createElement("div");
  messageContainer.className =
    "flex gap-2 bg-gray-200 rounded relative p-2 pr-[60px] h-[40px] w-[max-content]";

  const messageContent = document.createElement("span");
  messageContent.className = "my-auto";
  messageContent.textContent = message;

  messageContainer.append(messageContent);

  return messageContainer;
};
