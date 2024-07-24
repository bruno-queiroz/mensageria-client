import { GetMessage, getMessage } from "@/services/message/getMessage";
import { PrivateMessage } from "@/services/message/types";
import { ServerResponse } from "@/services/types";
import { MutableRefObject, useEffect, useState } from "react";

export const useInfiniteQuery = (
  to: string,
  previousScrollHeightRef: MutableRefObject<number>
) => {
  const [data, setData] = useState<ServerResponse<GetMessage>[]>([]);

  const fetchNextPage = async () => {
    const scrollableDiv = document.getElementById("scrollable");
    previousScrollHeightRef.current = scrollableDiv!.scrollHeight;

    const newData = await getMessage({
      date: data[data.length - 1].data?.messages[0].sentAt,
      to,
      mode: "default",
    });
    setData([...data, newData].reverse());
  };

  const fetchNewMessages = async () => {
    const newData = await getMessage({
      to,
      mode: "not-seen",
    });

    setData((data) => {
      const dataStringified = JSON.stringify(data);

      const copy = JSON.parse(dataStringified);
      const lastPage = copy[copy.length - 1].data as GetMessage;
      const newMessages = newData.data?.messages as PrivateMessage[];
      lastPage.messages.push(...newMessages);

      return copy;
    });
  };

  useEffect(() => {
    (async () => {
      const newData = await getMessage({
        date: new Date().toISOString(),
        to: to,
        mode: "default",
      });
      setData([newData]);
    })();
  }, []);

  return {
    data,
    fetchNextPage,
    fetchNewMessages,
  };
};
