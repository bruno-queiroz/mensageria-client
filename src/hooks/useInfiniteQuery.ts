import { GetMessage, getMessage } from "@/services/message/getMessage";
import { PrivateMessage } from "@/services/message/types";
import { ServerResponse } from "@/services/types";
import { createMessageElement } from "@/utils/createMessageElement";
import { useQueryClient } from "@tanstack/react-query";
import { MutableRefObject, useEffect, useState } from "react";

export let data: ServerResponse<GetMessage>[] = [];

export const useInfiniteQuery = (
  to: string,
  previousScrollHeightRef: MutableRefObject<number>
) => {
  const [rerender, setRerender] = useState([]);
  const queryClient = useQueryClient();

  const fetchNextPage = async () => {
    const scrollableDiv = document.getElementById("scrollable");
    previousScrollHeightRef.current = scrollableDiv!.scrollHeight;

    const firstPage = data[0];
    const firstMessage = firstPage.data?.messages[0];

    const newData = await getMessage({
      date: firstMessage?.sentAt,
      to,
      mode: "default",
    });

    if (newData.data?.messages.length === 0) return;

    data = [...data, newData].reverse();
    setRerender([]);
  };

  const updateMessageState = () => {
    const lastPage = data[data.length - 1].data as GetMessage;
    lastPage.messages.forEach((message) => {
      message.isSeen = true;
    });

    queryClient.invalidateQueries({ queryKey: ["getFriend"] });
    setRerender([]);
  };

  const fetchNewMessages = async () => {
    const newData = await getMessage({
      to,
      mode: "not-seen",
    });
    const newMessages = newData.data?.messages as PrivateMessage[];

    const chatContainer = document.getElementById("chat-container");
    if (!chatContainer) return;

    const messageElement = createMessageElement(newMessages[0]);

    chatContainer.appendChild(messageElement);
  };

  useEffect(() => {
    (async () => {
      const newData = await getMessage({
        date: new Date().toISOString(),
        to: to,
        mode: "default",
      });
      data = [newData];
      setRerender([]);
    })();
  }, []);

  return {
    rerender,
    fetchNextPage,
    fetchNewMessages,
    updateMessageState,
  };
};
