import { GetMessage, getMessage } from "@/services/message/getMessage";
import { ServerResponse } from "@/services/types";
import { MutableRefObject, useEffect, useState } from "react";

export const useInfiniteQuery = (
  to: string,
  previousScrollHeightRef: MutableRefObject<number>
) => {
  const [data, setDate] = useState<ServerResponse<GetMessage>[]>([]);

  const fetchNextPage = async () => {
    const scrollableDiv = document.getElementById("scrollable");
    previousScrollHeightRef.current = scrollableDiv!.scrollHeight;

    const newData = await getMessage({
      date: data[data.length - 1].data?.messages[0].sentAt,
      to,
      mode: "default",
    });
    setDate([...data, newData].reverse());
  };

  const fetchNewMessages = async () => {
    const newData = await getMessage({
      to,
      mode: "not-seen",
    });

    setDate((data) => [...data, newData]);
  };

  useEffect(() => {
    (async () => {
      const newData = await getMessage({
        date: new Date().toISOString(),
        to: to,
        mode: "default",
      });
      setDate([newData]);
    })();
  }, []);

  return {
    data,
    fetchNextPage,
    fetchNewMessages,
  };
};
